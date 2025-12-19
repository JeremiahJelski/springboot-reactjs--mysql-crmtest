import React, { useState, useEffect } from 'react'

const FooterComponent = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  // Synch with state changes
  useEffect(() => {
    const themeValue = isDarkMode ? 'dark' : 'light';
        document.documentElement.setAttribute('data-bs-theme', themeValue);
        localStorage.setItem('theme', themeValue);
  }, [isDarkMode]);

  // Toggle light and dark theme
  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

return (
    <footer className='footer d-flex justify-content-center align-items-center px-4'>
        <span className="me-auto">All right reserved 2025 EMS Software Solutions</span>
        
        {/* Theme Toggle Button */}
        <div className="form-check form-switch mb-0">
          <input 
            className="form-control form-check-input" 
            type="checkbox" 
            role="switch" 
            id="themeSwitch" 
            checked={isDarkMode}
            onChange={toggleTheme}
            style={{ cursor: 'pointer' }}
          />
          <label className="form-check-label ms-2" htmlFor="themeSwitch">
            {isDarkMode ? <i className="bi bi-moon-stars-fill"></i> : <i className="bi bi-sun-fill text-warning"></i>}
          </label>
        </div>
    </footer>
  )
}

export default FooterComponent