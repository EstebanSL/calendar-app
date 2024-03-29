import { addHours } from 'date-fns'
import React from 'react'
import { useCalendarStore, useUiStore } from '../../hooks'
import { useSelector } from 'react-redux'

export const FabAddEvent = () => {

  //VARIABLES
  const { openDateModal } = useUiStore()
  const { setActiveEvent } = useCalendarStore()
  const { userInformation } = useSelector((state: any) => state.user)
  
  //FUNCTIONS

  /**
   * [handleClickNew]
   * @returns {void}
   */
  const handleClickNew = (): void => {
    setActiveEvent({
      title: '',
      notes: '',
      start: new Date(),
      end: addHours( new Date(), 2),
      user: userInformation.user.id
    })
    openDateModal()
  }

  //TEMPLATE
  return (
    <button className='btn btn-primary fab fab-add z-3' type='button' onClick={ handleClickNew }>
      <i className="fa-solid fa-plus"></i>
    </button>
  )
}
