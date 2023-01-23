import React from 'react'

export const NavBar = () => {
  return (
    <div className='navbar navbar-light bg-light mb-4 px-4'>
      <span className='navbar-brand'>
        <i className="fa-solid fa-calendar-days"></i>
        &nbsp;
        Calendar App
      </span>

      <button className='btn btn-outline-danger'>
      <i className="fa-solid fa-right-from-bracket"></i>
      &nbsp;
      Salir
      </button>
    </div>
  )
}
