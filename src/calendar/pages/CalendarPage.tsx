import { CalendarEventBox, CalendarModal, FabAddEvent, NavBar } from "../"

import { Calendar, View, Views } from 'react-big-calendar'
import { addHours } from "date-fns"

import 'react-big-calendar/lib/css/react-big-calendar.css'
import './CalendarPage.css'
import { getMessagesES, localizer } from "../../helpers"
import { calendarEvent } from "../../interfaces/CalendarEvent"
import { useState } from "react"
import { useUiStore } from "../../hooks"
import { useCalendarStore } from "../../hooks/useCalendarStore"

export const CalendarPage = () => {

  const { openDateModal } = useUiStore()
  const { events, setActiveEvent } = useCalendarStore()

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')

  const eventStyleGetter = ( event: calendarEvent, start: Date, end: Date , isSelected: boolean ) => {

    const style = {
      backgroundColor: '#347cf7',
      borderRadius: '0px',
    }

    Views

    return {
      style
    }
  }

  const onDoubleClick = () => {
    openDateModal()
  }

  const onSelect = (event: calendarEvent) => {
    setActiveEvent(event)
  }

  const onViewChange = (event: string) => {
    console.log(event)
    localStorage.setItem('lastView', event)
  }

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