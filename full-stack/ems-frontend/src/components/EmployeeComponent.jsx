import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService'
import { listDepartments } from '../services/DepartmentService'
import {useNavigate, useParams} from 'react-router-dom'

const EmployeeComponent = () => {

  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    email: '',
    departmentId: '',
  });
  
  const [departments, setDepartments]  =useState([])
  const [errors, setErrors] =  useState({});
  const navigator = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    listDepartments()
      .then(depResponse => {
        setDepartments(depResponse.data);
      }).catch(console.error);

    if (id) {
      getEmployee(id).then(empResponse => {
        setEmployee(empResponse.data);
      }).catch(console.error);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee(prev => ({ ...prev, [name]: value }));

    if (errors[name]) setErrors(prev => ({ ...prev, [name]: ''}));
  }

  const validateForm = () => {
    const newErrors = {};

    if (!employee.firstName.trim()) newErrors.firstName = "First name is required";
    if (!employee.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!employee.email.trim()) newErrors.email = "Email is required";
    if (!employee.departmentId || employee.departmentId === "Select department") {
      newErrors.departmentId = "Department is required";
    };

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  function saveOrUpdateEmployee(e) {
    e.preventDefault();

    if (!validateForm()) return;

    const action = id ? updateEmployee(id, employee) : createEmployee(employee);

    action.then(() => {
      navigator('/employees');
    }).catch(console.error);
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='card col-md-6 offset-md-3 shadow'>
          <h2 className='text-center mt-3'>{id ? 'Update' : 'Add'} Employee</h2>
          <div className='card-body'>
            <form>
              {/* Input logic */}
              {['firstName', 'lastName', 'email'].map((field) => (
                <div className='form-group mb-2' key={field}>
                  <label className='form-label text-capitalize'>
                    {field.replace(/([A-Z])/g, ' $1')}:
                  </label>
                  <input 
                      type='text' 
                      name={field} 
                      value={employee[field]} 
                      className={`form-control ${ errors[field] ? 'is-invalid': ''}`}
                      onChange={handleChange}
                  />
                {errors[field] && <div className='invalid-feedback'>{errors[field]}</div>}
                </div>
              ))}
              <div className='form-group mb-3'>
                <label className='form-label'>Department:</label>
                <select 
                  className={`form-control ${ errors.departmentId ? 'is-invalid': ''}`}
                  placeholder='Enter employee email' 
                  name='departmentId' 
                  value={employee.departmentId} 
                  onChange={handleChange}
                >
                  <option value="Select Department">Select Department</option>
                  {departments.map( department =>
                      <option key={department.id} value={department.id}> {department.departmentName} </option>
                      )}
                </select>
                {errors.departmentId && <div className='invalid-feedback'>{errors.departmentId}</div>}
              </div>
              <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button>
              <button className='btn btn-danger ms-2' 
                      type='button'
                      onClick={() => navigator('/employees')}>Cancel</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeComponent