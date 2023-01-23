import { CalendarEventBox, CalendarModal, NavBar } from "../"

import { Calendar } from 'react-big-calendar'
import { addHours } from "date-fns"

import 'react-big-calendar/lib/css/react-big-calendar.css'
import './CalendarPage.css'
import { getMessagesES, localizer } from "../../helpers"
import { calendarEvent } from "../../interfaces/CalendarEvent"
import { useState } from "react"

const events = [{
  title: 'Test event',
  notes: 'This is a test event',
  start: new Date(),
  end: addHours( new Date(), 2),
  user: {
    name: 'Gandhi',
    id: 1
  }
}]

export const CalendarPage = () => {

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')

  const eventStyleGetter = ( event: calendarEvent, start: Date, end: Date , isSelected: boolean ) => {

    const style = {
      backgroundColor: '#347cf7',
      borderRadius: '0px',
    }

    return {
      style
    }
  }

  const onDoubleClick = (event) => {
    console.log('double', event)
  }

  const onSelect = (event) => {
    console.log('select', event)
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
        messages={getMessagesES()}
        localizer={localizer}
        defaultView={ lastView }
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
    </div>
  )
}