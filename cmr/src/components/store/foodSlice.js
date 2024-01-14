import { createSlice, current } from "@reduxjs/toolkit";
import { getEmptyFoodField } from "../models/food";

const newTicket = (ticketValue, oldValue) => {
  // Creating New Ticket: a new ticket for the editng will be created that has the following shape:

  //    {
  //      index:1,
  //      values:[oldValue,newValue],
  //    }

  // values: the array containing all the history of edited values
  // index: the index of the current displayed value.

  return {
    values: [oldValue, ticketValue],
    index: 1,
  };
};

const updateTicketsValues = (ticket, newValue) => {
  // This works for both master and history tickets
  if (ticket.index < ticket.values.length - 1) {
    ticket.values.splice(ticket.index + 1);
  }

  if (ticket.values[ticket.values.length - 1] !== newValue) {
    ticket.values.push(newValue);
  }

  ticket.index = ticket.values.length - 1;
};

const foodSlice = createSlice({
  name: "food",
  initialState: {
    menu: {},
    editedMap: {},

    masterTicket: {},
    historyTickets: { values: [], index: 0 },
  },
  reducers: {
    setMenu: (state, action) => {
      state.menu = action.payload;
    },

    updateMasterTicket: (state, action) => {
      // Get the info on the element to modify:
      // - pathKey: array containing allthe keys needed to reach the value
      // - fieldName: name of the target field where the value to edit is stored
      // - newValue:  the new value to substitute
      const { pathKey, fieldName, newValue } = action.payload;

      // If there's no newValue don't procede
      if (!newValue) return;

      // There are 3 scenarios when it comes to update the master ticket,
      // First thing to do is to check if a previous modification was done
      // To know that we need to look for a ticket with the ticketTitle:
      // ticketTitle: the specific element id, concatenate pathKey with the fieldName
      const ticketTitle = `${pathKey},${fieldName}`;

      // In order to not create useless tickets, we need to check if the oldvalue is the same as the newValue.
      // using the getOlderValue we get both the older value as well as some tcket info if it exists
      const { oldValue, foundTicket } = getOlderValue(
        ticketTitle,
        state,
        pathKey,
        fieldName
      );

      if (JSON.stringify(oldValue) === JSON.stringify(newValue)) return;

      // If we were using undo and we got back to a previous value in the ticket history
      // and now we are inserting a new value, it means we have to delete all the values that were
      // saved after the current index before inserting the new value, otherwise we will have contrasting
      // history.

      // const foundTicket = cancelNotUpToDateHistory(
      //   oldTicket,
      //   ticketTitle,
      //   state,
      //   newValue
      // );

      // Updating Master Ticket
      foundTicket
        ? updateTicketsValues(foundTicket, newValue)
        : (state.masterTicket[ticketTitle] = newTicket(newValue, oldValue));

      // Updating History Ticket
      updateTicketsValues(state.historyTickets, ticketTitle);

      console.log(current(state.masterTicket));
    },

    updateTicketHistory: (state, action) => {
      const { undo, redo } = action.payload;
      if (state.masterTicket.length === 0) return;

      const direction = undo ? -1 : 1;
      let historyTicketIndex = state.historyTickets.index;

      while (
        historyTicketIndex >= 0 &&
        historyTicketIndex < state.historyTickets.values.length
      ) {
        const pathKey = state.historyTickets.values[historyTicketIndex];
        let currentTicket = state.masterTicket[pathKey];

        if (
          (currentTicket.index === 0 && undo) ||
          (currentTicket.index === currentTicket.values.length - 1 && redo)
        ) {
          historyTicketIndex += direction;
        } else {
          currentTicket.index += direction;

          state.editedMap = {
            [pathKey]: currentTicket.values[currentTicket.index],
          };

          state.historyTickets.index = historyTicketIndex;
          return;
        }
      }
      state.editedMap = {};
    },
  },
});

export const { setMenu, updateMasterTicket, updateTicketHistory } =
  foodSlice.actions;
export default foodSlice.reducer;

function getOlderValue(ticketTitle, state, pathKey, fieldName) {
  // To get the oldValue, we need to look for :
  // - An older ticket with the same key
  // - Else the initial data fetched by an API stored in menu
  // - Or eventually we need use a fallback value for the specific field we're looking for

  let foundTicket = state.masterTicket[ticketTitle] ?? null;
  let oldValue;
  let currentTicketIndex;

  if (foundTicket) {
    // Old ticket found
    currentTicketIndex = state.masterTicket[ticketTitle].index;
    oldValue = foundTicket["values"][currentTicketIndex];
  } else {
    // Search in inital data in state.menu
    oldValue = findValueInMenu(pathKey, state.menu, fieldName) ?? null;
  }

  // If still old value can't be found use fallback values
  if (!oldValue) oldValue = getEmptyFoodField(fieldName);

  return {
    oldValue: oldValue,
    foundTicket: foundTicket,
    currentTicektIndex: currentTicketIndex,
  };
}

const findValueInMenu = (ids, menu, fieldName) => {
  if (!ids) return;
  let index = 0;
  let element = current(menu);
  element = element[ids[0]];

  while (index < ids.length) {
    if (element.hasOwnProperty("child")) {
      element = element["child"];

      if (fieldName === "child") return element;
    } else {
      element = element[ids[index]];
    }
    index++;
  }

  const result = element ? element[fieldName] : null;

  return result;
};
