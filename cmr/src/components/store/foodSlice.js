import { createSlice } from "@reduxjs/toolkit";

const newTicket = (ticketTitle, ticketValue, oldValue) => ({
  [ticketTitle]: [oldValue ?? ticketValue].concat(
    oldValue ? [ticketValue] : []
  ),
  index: oldValue ? 1 : 0,
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
    updateMasterTicket: (state, action) => {
      const { sectionName, elementId, fieldName, newValue } = action.payload;
      const ticketTitle = `${sectionName}?-?${elementId}?-?${fieldName}`;
      const foundTicket = getTicket(ticketTitle, state.masterTicket);

      const oldValue = foundTicket
        ? foundTicket[ticketTitle]?.[foundTicket.index]
        : state.menu[sectionName]?.find((item) => item.id === elementId)?.[
            fieldName
          ];

      if (JSON.stringify(oldValue) === JSON.stringify(newValue)) return;

      foundTicket
        ? updateTicketValue(foundTicket, ticketTitle, newValue)
        : state.masterTicket.push(newTicket(ticketTitle, newValue, oldValue));

      state.masterTicketIndex = state.masterTicket.length - 1;
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

export const { setMenu, updateMasterTicket, updateTicketHistory } =
  foodSlice.actions;
export default foodSlice.reducer;
