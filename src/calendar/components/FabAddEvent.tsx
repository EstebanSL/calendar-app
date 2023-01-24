import { addHours } from 'date-fns'
import React from 'react'
import { useCalendarStore, useUiStore } from '../../hooks'

export const FabAddEvent = () => {

  const { openDateModal } = useUiStore()
  const { setActiveEvent } = useCalendarStore()

  const handleClickNew = () => {
    setActiveEvent({
      title: '',
      notes: '',
      start: new Date(),
      end: addHours( new Date(), 2),
      user: {
        name: 'Gandhi',
        id: 1
      }
    })
    openDateModal()
  }

  return (
    <button className='btn btn-primary fab fab-add' type='button' onClick={ handleClickNew }>
      <i className="fa-solid fa-plus"></i>
    </button>
  )
}
