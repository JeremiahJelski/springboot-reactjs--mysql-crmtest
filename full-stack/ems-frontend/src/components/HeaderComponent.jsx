import React from 'react'
import { NavLink } from 'react-router-dom'

const HeaderComponent = ({ onSearch, searchTerm }) => {

  return (
    <div>
     <header className="sticky-top">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-secondary shadow-sm py-3">
        <div className="container-fluid px-4">
          {/* Brand/Logo */}
          <NavLink className="navbar-brand fw-bold fs-4 d-flex align-items-center" to="/employees">
            <i className="bi bi-people-fill me-2 text-primary"></i>
            <span className="tracking-tight">EMS<span className="text-primary">PRO</span></span>
          </NavLink>

          {/* Toggle button for mobile */}
          <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
             <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-4">
              <li className="nav-item">
                <NavLink 
                  className={({ isActive }) => `nav-link ${isActive ? 'active fw-bold text-primary border-bottom border-primary' : ''}`} 
                  to='/employees'
                >
                  Employees
                </NavLink>
              </li>
              <li className="nav-item ms-lg-2">
                <NavLink 
                  className={({ isActive }) => `nav-link ${isActive ? 'active fw-bold text-primary border-bottom border-primary' : ''}`} 
                  to='/departments'
                >
                  Departments
                </NavLink>
              </li>
            </ul>

            {/* Search Bar with Icons */}
            <div className="ms-auto d-flex align-items-center mt-3 mt-lg-0">
              <div className="input-group" style={{ width: '280px' }}>
                <span className="input-group-text bg-primary border-primary text-white">
                  <i className="bi bi-search"></i>
                </span>
                <input 
                    type="search" 
                    className="form-control bg-white text-dark border-secondary" 
                    placeholder="Quick search..." 
                    aria-label="Search"
                    value={searchTerm}
                    onChange={(e) => onSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  </div>
  )
}

export default HeaderComponent