import { useSelector, useDispatch } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from '../store';
import { calendarEvent } from '../interfaces/CalendarEvent';


export const useCalendarStore = () => {

  const dispatch = useDispatch()

  const { events, activeEvent } = useSelector((state: any) => state.calendar)

  const setActiveEvent = (calendarEvent: calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent))
  }

  const startSavingEvent = async (calendarEvent: calendarEvent) => {
    if (!calendarEvent._id) {
      dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }))
    }
    else {
      dispatch(onUpdateEvent({ ...calendarEvent }))
    }
  }

  const startDeletingEvent = async ( calendarEvent: calendarEvent ) => {
    dispatch(onDeleteEvent({ ...calendarEvent }))
  }



  return {
    events,
    setActiveEvent,
    activeEvent,
    startSavingEvent,
    startDeletingEvent
  }
}