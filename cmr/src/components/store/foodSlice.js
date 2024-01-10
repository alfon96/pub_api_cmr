import { createSlice, current } from "@reduxjs/toolkit";

const newTicket = (ticketTitle, ticketValue, oldValue = null) => {
  const ticket = {
    [ticketTitle]: oldValue ? [oldValue, ticketValue] : [ticketValue],
    index: oldValue ? 1 : 0,
  };
  return ticket;
};

const updateTicketValue = (ticket, ticketTitle, newValue) => {
  if (
    ticket &&
    ticket[ticketTitle] &&
    ticket[ticketTitle][ticket[ticketTitle].length - 1] !== newValue
  ) {
    ticket[ticketTitle].push(newValue);
    ticket.index = ticket[ticketTitle].length - 1;
  }
};

const updateTicketIndex = (ticket, ticketTitle, increment) => {
  if (ticket && ticket[ticketTitle]) {
    const newIndex = ticket.index + increment;
    if (newIndex >= 0 && newIndex < ticket[ticketTitle].length) {
      ticket.index = newIndex;
    }
  }
};

const getTicket = (ticketTitle, masterTicket) => {
  return masterTicket.find((item) => item && item.hasOwnProperty(ticketTitle));
};

const foodSlice = createSlice({
  name: "food",
  initialState: {
    menu: {},
    masterTicket: [],
  },
  reducers: {
    setMenu: (state, action) => {
      state.menu = action.payload;
    },

    updateMasterTicket: (state, action) => {
      const { sectionName, elementId, fieldName, newValue, undo, redo } =
        action.payload;
      const ticketTitle = `${sectionName}?-?${fieldName}?-?${elementId}`;
      let ticket = getTicket(ticketTitle, state.masterTicket);
      console.log(current(state));
      if (ticket) {
        if (undo && ticket.index > 0) {
          updateTicketIndex(ticket, ticketTitle, -1);
        } else if (redo && ticket.index < ticket[ticketTitle].length - 1) {
          updateTicketIndex(ticket, ticketTitle, 1);
        } else {
          updateTicketValue(ticket, ticketTitle, newValue);
        }
      } else {
        const oldValue = state.menu[sectionName]?.find(
          (item) => item.id === elementId
        )?.[fieldName];
        const newTicketItem = newTicket(
          ticketTitle,
          newValue,
          oldValue != newValue ? oldValue : null
        );
        state.masterTicket.push(newTicketItem);
      }
    },
  },
});

export const { setMenu, updateMasterTicket } = foodSlice.actions;
export default foodSlice.reducer;
