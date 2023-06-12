import React from 'react'
import { calendarEvent } from '../../interfaces'

interface Props {
  event: calendarEvent
}

export const CalendarEventBox = ({ event }: Props) => {
    
  return (
    <>
      <strong>{ event.title } - </strong>
    </>
  )
}
