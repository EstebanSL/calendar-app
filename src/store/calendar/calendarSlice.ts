import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    events: [],
    activeEvent: null,
  },
  reducers: {
    onSetEvents: (state, { payload }) => {
      state.events = payload;
    },
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    onAddNewEvent: (state: any, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state: any, { payload }) => {
      state.events = state.events.map((event: any) => {
        if (event.id === payload.id) {
          return payload;
        }
        return event;
      });
    },
    onDeleteEvent: (state, { payload }) => {
      state.events = state.events.filter(
        (event: any) => event.id !== payload.id
      );
    },
  },
});

export const {
  onSetActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
  onSetEvents,
} = calendarSlice.actions;
