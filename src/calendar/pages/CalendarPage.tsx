import { CalendarEventBox, CalendarModal, FabAddEvent, NavBar } from "../"

import { Calendar, View, Views } from 'react-big-calendar'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import './CalendarPage.css'
import { getMessagesES, localizer } from "../../helpers"
import { calendarEvent } from "../../interfaces/CalendarEvent"
import { useEffect, useState } from "react"
import { useUiStore } from "../../hooks"
import { useCalendarStore } from "../../hooks/useCalendarStore"
import { getEvents } from "../../services/events.services"
import { useSelector } from "react-redux"

export const CalendarPage = () => {

  //VARIABLES
  const { openDateModal } = useUiStore()
  const { events, setActiveEvent, setAllEvents } = useCalendarStore()
  const { userInformation } = useSelector((state: any) => state.user)

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')

  //FUNCTIONS
  /**
   * [eventstyleGetter]
   * @returns {Record<string, string>}
   */
  const eventStyleGetter = (): Record<string, Record<string, string>> => {
    const style = {
      backgroundColor: '#347cf7',
      borderRadius: '0px',
    }
    Views
    return {
      style
    }
  }

  /**
   * [onDoubleClick]
   * @returns {void}
   */
  const onDoubleClick = () => {
    openDateModal()
  }

  /**
   * [onSelect]
   * @param {calendarEvent} event 
   * @returns {void}
   */
  const onSelect = (event: calendarEvent): void => {
    setActiveEvent(event)
  }

  /**
   * [onViewChange]
   * @param {string} event 
   * @returns {void}
   */
  const onViewChange = (event: string): void => {
    localStorage.setItem('lastView', event)
  }

  /**
   * [initializeEvents]
   * @returns {Promise<void>}
   */
  const initializeEvents = async (): Promise<void> => {
    
    const data = await getEvents(userInformation.user.id)
    
    const formattedEvents = data.map((date: any) => ({
      ...date,
      start: new Date(date.start),
      end: new Date(date.end)
    }));    
    setAllEvents(formattedEvents)
  }

  useEffect(() => {
    initializeEvents()
        
  }, [])
  
  //TEMPLATE
  return (
    <div>
      <NavBar />

      <Calendar
        culture='es'
        messages={ getMessagesES() }
        localizer={localizer}
        defaultView={ lastView as View }
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)',padding: '1rem' }}
        eventPropGetter={ eventStyleGetter}
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChange }
        components={{
          event: CalendarEventBox
        }}
      />

      <CalendarModal />

      <FabAddEvent />
    </div>
  )
}