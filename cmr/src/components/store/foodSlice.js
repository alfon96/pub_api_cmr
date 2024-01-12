import { createSlice, current } from "@reduxjs/toolkit";
import { getEmptyFoodField } from "../models/food";

const newTicket = (ticketTitle, ticketValue, oldValue) => ({
  [ticketTitle]: [oldValue, ticketValue],
  index: 1,
});

const updateTicketValue = (ticket, ticketTitle, newValue) => {
  if (!ticket || !ticket[ticketTitle]) return;
  const ticketValues = ticket[ticketTitle];
  if (ticketValues.at(-1) !== newValue) {
    ticketValues.push(newValue);
    ticket.index = ticketValues.length - 1;
  }
};

const getTicket = (ticketTitle, masterTicket) =>
  masterTicket.find((item) => item?.hasOwnProperty(ticketTitle));

const foodSlice = createSlice({
  name: "food",
  initialState: {
    menu: {},
    masterTicket: [],
    editedMap: {},

    masterTicketIndex: 0,
  },
  reducers: {
    setMenu: (state, action) => {
      state.menu = action.payload;
    },

    reorderItems: (state, action) => {
      const { result, sectionId } = action.payload;

      console.log(current(state.menu));
      const sectionIndex = state.menu.findIndex(
        (item) => item.id === sectionId
      );

      const sectionItems = state.menu[sectionIndex]["values"];
      const newItems = [...sectionItems];
      const [reorderedItem] = newItems.splice(result.source.index, 1);
      newItems.splice(result.destination.index, 0, reorderedItem);

      state.menu[sectionIndex]["values"] = newItems;
    },

    updateMasterTicket: (state, action) => {
      const { pathKey, fieldName, newValue } = action.payload;
      const ticketTitle = `${pathKey}?-?${fieldName}`;
      let foundTicket = getTicket(ticketTitle, state.masterTicket);

      const oldValue = getOlderValue(
        foundTicket,
        ticketTitle,
        state,
        pathKey,
        fieldName
      );

      if (JSON.stringify(oldValue) === JSON.stringify(newValue) || !newValue)
        return;

      foundTicket = cancelNotUpToDateHistory(
        foundTicket,
        ticketTitle,
        state,
        newValue
      );

      foundTicket
        ? updateTicketValue(foundTicket, ticketTitle, newValue)
        : state.masterTicket.push(newTicket(ticketTitle, newValue, oldValue));

      state.masterTicketIndex = state.masterTicket.length - 1;

      console.log(current(state.masterTicket));
    },

    updateTicketHistory: (state, action) => {
      const { undo, redo } = action.payload;
      if (state.masterTicket.length === 0) return;

      let { masterTicketIndex } = state;
      const direction = undo ? -1 : redo ? 1 : 0;

      for (
        let i = masterTicketIndex;
        i >= 0 && i < state.masterTicket.length;
        i += direction
      ) {
        const ticket = state.masterTicket[i];
        const ticketTitle = Object.keys(ticket)[0];
        const newTicketItemIndex = ticket.index + direction;

        if (
          newTicketItemIndex >= 0 &&
          newTicketItemIndex < ticket[ticketTitle].length
        ) {
          ticket.index = newTicketItemIndex;
          state.editedMap[ticketTitle] =
            ticket[ticketTitle][newTicketItemIndex];
          state.masterTicketIndex = i;

          break;
        }
      }
    },
  },
});

export const {
  setMenu,
  reorderItems,
  updateMasterTicket,
  updateTicketHistory,
} = foodSlice.actions;
export default foodSlice.reducer;

function getOlderValue(foundTicket, ticketTitle, state, pathKey, fieldName) {
  return (
    foundTicket?.[ticketTitle]?.[foundTicket.index] ||
    findValueInMenu(pathKey, state.menu, fieldName) ||
    getEmptyFoodField(fieldName)
  );
}

function cancelNotUpToDateHistory(foundTicket, ticketTitle, state, newValue) {
  const titlePreviousTicket = state.masterTicket[state.masterTicketIndex]
    ? Object.keys(state.masterTicket[state.masterTicketIndex])[0]
    : null;

  if (
    titlePreviousTicket &&
    state.masterTicket.length > 0 &&
    state.masterTicket[state.masterTicketIndex].index === 0 &&
    state.masterTicket[state.masterTicketIndex][titlePreviousTicket].length > 0
  ) {
    state.masterTicket.splice(state.masterTicketIndex);
    return (foundTicket = getTicket(ticketTitle, state.masterTicket));
  } else if (
    foundTicket?.[ticketTitle]?.length > 0 &&
    foundTicket.index < foundTicket?.[ticketTitle]?.length - 1
  ) {
    foundTicket?.[ticketTitle].splice(
      foundTicket?.[ticketTitle]?.[foundTicket.index] + 1
    );
    state.editedMap[ticketTitle] = newValue;
  }

  return foundTicket;
}

const findValueInMenu = (id, menu, fieldName) => {
  const item = id
    ? id.length <= 1
      ? menu[id[0]]
      : menu[id[0]].child[id[1]]
    : null;

  if (item) {
    const value = current(item);
    return value[fieldName];
  }
  return null;
};
