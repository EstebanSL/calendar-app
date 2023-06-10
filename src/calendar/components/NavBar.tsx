import React from 'react';
import { useUserStore } from '../../hooks/useUserStore';

export const NavBar = () => {
  const { clearUserInformation } = useUserStore();

  const logOut = () => {
    clearUserInformation();
  };

  return (
    <div className="navbar navbar-light bg-light mb-4 px-4">
      <span className="navbar-brand">
        <i className="fa-solid fa-calendar-days"></i>
        &nbsp; Calendar App
      </span>

      <button className="btn btn-outline-danger" onClick={() => logOut()}>
        <i className="fa-solid fa-right-from-bracket"></i>
        &nbsp; Salir
      </button>
    </div>
  );
};
