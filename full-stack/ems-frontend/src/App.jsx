import './App.css'
import EmployeeComponent from './components/EmployeeComponent'
import DepartmentComponent from './components/DepartmentComponent'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListDepartmentComponent from './components/ListDepartmentComponent'
import ListEmployeeComponent from './components/ListEmployeeComponent'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { useState } from 'react'

function App() {

  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <BrowserRouter>
        <HeaderComponent onSearch={setSearchTerm}/>
          <Routes>
            {/* http://localhost:3000 */}
            <Route path='/' element={<ListEmployeeComponent searchTerm={searchTerm} />}></Route>
            {/* http://localhost:3000/employees */}
            <Route path='/employees' element={<ListEmployeeComponent searchTerm={searchTerm} />}></Route>
            {/* http://localhost:3000/add-employee */}
            <Route path='/add-employee' element={<EmployeeComponent />}></Route>
            {/* http://localhost:3000/edit-employee/1 */}
            <Route path='/edit-employee/:id' element = {<EmployeeComponent />}></Route>
            {/* http://localhost:3000/departments */}
            <Route path='/departments' element={<ListDepartmentComponent searchTerm={searchTerm} />}></Route>
            {/* http://localhost:3000/add-departments */}
            <Route path='/add-department' element={<DepartmentComponent />}></Route>
            {/* http://localhost:3000/edit-departments/1 */}
            <Route path='/edit-department/:id' element = {<DepartmentComponent />}></Route>
          </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  )
}

export default App
