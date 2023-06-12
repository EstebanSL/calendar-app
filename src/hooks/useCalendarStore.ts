import { useSelector, useDispatch } from 'react-redux';
import {
  onAddNewEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onSetEvents,
  onUpdateEvent,
} from '../store';
import { calendarEvent } from '../interfaces/CalendarEvent';
import {
  deleteEvent,
  saveNewEvents,
  updateEvent,
} from '../services/events.services';

export const useCalendarStore = () => {
  //VARIABLES
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state: any) => state.calendar);

  //EVENTS
  const setActiveEvent = (calendarEvent: calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent: calendarEvent) => {
    try {
      await saveNewEvents(calendarEvent);
      dispatch(onAddNewEvent({ ...calendarEvent }));
    } catch {
      return;
    }
  };

  const startUpdatingEvent = async (calendarEvent: calendarEvent) => {
    try {
      await updateEvent(calendarEvent);
      dispatch(onUpdateEvent({ ...calendarEvent }));
    } catch {
      return;
    }
  };

  const startDeletingEvent = async (calendarEvent: calendarEvent) => {
    try {
      await deleteEvent(calendarEvent);
      dispatch(onDeleteEvent({ ...calendarEvent }));
    } catch {
      return;
    }
  };

  const setAllEvents = async (calendarEvents: calendarEvent[]) => {
    dispatch(onSetEvents(calendarEvents));
  };

  return {
    events,
    setActiveEvent,
    activeEvent,
    startSavingEvent,
    startDeletingEvent,
    setAllEvents,
    startUpdatingEvent,
  };
};
