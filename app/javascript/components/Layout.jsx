import React from "react";
import { Link, Outlet } from "react-router-dom";

export default () => {
  return <div>
    <div className="container mt-3" style={{marginBottom: "80px"}}>
      <Outlet />
    </div>
    <nav className="navbar fixed-bottom bg-body-tertiary">
      <div className="container-fluid justify-content-around">
        <Link className='fs-1 btn btn-outline-secondary border-0' to="/"><i className="bi bi-search"></i></Link>
        <Link className='fs-1 btn btn-outline-secondary border-0' to="/items"><i className="bi bi-list"></i></Link>
        <Link className='fs-1 btn btn-outline-secondary border-0' to="/profile" title='Profile'><i className="bi bi-person"></i></Link>
      </div>
    </nav>
  </div>
}