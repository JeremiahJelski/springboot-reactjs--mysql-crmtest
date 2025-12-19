import React from 'react'
import { NavLink } from 'react-router-dom'

const HeaderComponent = ({ onSearch }) => {

  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
          {/* Brand/Logo */}
          <a className="navbar-brand" href="#">Employee Management System</a>

          {/* Toggle button for mobile */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            {/* Links - Left Side */}
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className='nav-link' to='/employees'>Employees</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className='nav-link' to='/departments'>Departments</NavLink>
              </li>
            </ul>

            {/* Search Bar - Pushed to the Right using ms-auto */}
            <form className="d-flex ms-auto align-items-center">
              <div className="input-group">
                <input type="search" 
                    className="form-control" 
                    placeholder="Search..." 
                    aria-label="Search"
                    onChange={(e) => onSearch(e.target.value)}
                />
              </div>
            </form>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default HeaderComponent