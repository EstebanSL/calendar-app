import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvent = {
  _id: new Date().getTime(),
  title: 'Test event',
  notes: 'This is a test event',
  start: new Date(),
  end: addHours( new Date(), 2),
  user: {
    name: 'Gandhi',
    id: 1
  }
}

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [tempEvent],
        activeEvent: null
    },
    reducers: {
        onSetActiveEvent: (state, {payload}) => {
          state.activeEvent = payload
        },
        onAddNewEvent: (state, {payload}) => {
          state.events.push(payload)
          state.activeEvent = null
        },
        onUpdateEvent: (state, {payload}) => {
          state.events = state.events.map(event => {

            if (event._id === payload._id) {
              return payload
            }
            return event
          })
        },
        onDeleteEvent: (state, {payload}) => {
          state.events = state.events.filter(event => event._id !== payload._id)
        }
    }
});


export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions;