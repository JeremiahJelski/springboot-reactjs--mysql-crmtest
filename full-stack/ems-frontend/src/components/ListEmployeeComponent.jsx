import React, {useEffect, useState} from 'react'
import { createEmployee,deleteEmployee, listEmployees } from '../services/EmployeeService'
import {useNavigate} from 'react-router-dom'
import { listDepartments } from '../services/DepartmentService'

const ListEmployeeComponent = ({ searchTerm }) => {
    
    const [employees, setEmployees] = useState([])
    const navigator = useNavigate();
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [lastDeletedEmployee, setLastDeletedEmployee] = useState(null);
    const [departments, setDepartments] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'firstName', direction: 'asc' });

    function getAllDepartments() {
        listDepartments().then((response) => {
            setDepartments(response.data);
        }).catch(error => {
            console.error(error);
        })
    }
    
    function getAllEmployees() {
        listEmployees().then((response) => {
            setEmployees(response.data);
        }).catch(e => {
            console.error(e);
        })
    }

    const getDeptName = (id) => {
        const dept = departments.find(d => d.id === id);
        return dept ? dept.departmentName : 'N/A';
    }

    const filteredEmployees = employees.filter(emp => {
        const search = searchTerm?.toLowerCase() || '';
        const deptName = getDeptName(emp.departmentId);

        return (
            emp.firstName.toLowerCase().includes(search) ||
            emp.lastName.toLowerCase().includes(search) ||
            emp.email.toLowerCase().includes(search) ||
            deptName.toLowerCase().includes(search) ||
            String(emp.id).includes(search)
        );
    });

    useEffect(() => {
        getAllEmployees();
        getAllDepartments();
    }, [])

    const undoDelete = () => {
        if (lastDeletedEmployee) {
            createEmployee(lastDeletedEmployee).then(() => {
                getAllEmployees();
                setShowToast(false);
                setLastDeletedEmployee(null);
            }).catch(error => console.error(error));
        }
    };

    function addNewEmployee() {
        navigator('/add-employee')
    }

    function updateEmployee(employee) {
        navigator(`/edit-employee/${employee.id}`)
    }

    const confirmDelete = (employee) => {
        setSelectedEmployee(employee);
    };

    const handleFinalDelete = () => {
        if (selectedEmployee) {
            const employeeToRestore = { ...selectedEmployee };
            const name = `${selectedEmployee.firstName} ${selectedEmployee.lastName}`;
            
            deleteEmployee(selectedEmployee.id).then(() => {
                
                setLastDeletedEmployee(employeeToRestore); 
                getAllEmployees();
                setSelectedEmployee(null); 

                setToastMessage(`${name} was deleted`);
                setShowToast(true);
                setTimeout(() => setShowToast(false), 5000);
            }).catch(error => console.error(error));
        }
    };

    // Sorting icons
    const getSortIcon = (column) => {
    if (sortConfig.key !== column) {
        return 'bi-chevron-expand text-muted'; 
    }
    return sortConfig.direction === 'asc' ? 'bi-chevron-up text-primary' : 'bi-chevron-down text-primary';
    };

    // Sorting entries asc or desc order on clicking table headers
    const requestSort = (key) => {
        let direction = 'asc';

        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({key, direction});
    };

    // Apply sorting to your existing filtered list
    const sortedEmployees = [...filteredEmployees].sort((a, b) => {
        // Handle Department Name specifically since it's a lookup
        let valA = a[sortConfig.key];
        let valB = b[sortConfig.key];
        // Sort departments
        if (sortConfig.key === 'departmentId') {
            valA = getDeptName(a.departmentId);
            valB = getDeptName(b.departmentId);
        }
        // Swaps
        if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
    });

    // Build text file and url in browser and export
    const exportToCSV = () =>{
        if (filteredEmployees.length === 0) return;

        // Choose which data to allow to download
        const columnMapping = {
            id: "ID",
            firstName: "First Name",
            lastName: "Last Name",
            email: "EMail",
            departmentId: "Department"
        };

        const keys = Object.keys(columnMapping);
        // Build csv string
        const headerRow = keys.map(key => columnMapping[key]).join(",");

        const dataRows = filteredEmployees.map(emp => {
            return keys.map(key => {
                let value = emp[key];
                if (key === 'departmentId') {
                    value = getDeptName(emp.departmentId);
                }
                const cleanValue = String(value?? "").replace(/"/g, '""');
                return `"${cleanValue}"`;
            }).join(",");
        });

        const csvContent = [headerRow, ...dataRows].join("\n");
        //Download logic ()
        const blob = new Blob([csvContent], {type: "text/csv;charset=utf-8;"});
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        const date = new Date().toISOString().split('T')[0];
        link.setAttribute("href", url);
        link.setAttribute("download", `Employee_List_${date}.csv`);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        // Clean up memory
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

  return (
    <div className='container'>
        <h2 className='text-center'>Employees List</h2>
        {/* Flex container to push buttons to opposite sides */}
        <div className="d-flex justify-content-between align-items-center mb-3">
            <button className="btn btn-primary" onClick={addNewEmployee}>
                <i className="bi bi-person-plus-fill me-2"></i>Add Employee
            </button>
            <button className="btn btn-success" onClick={exportToCSV}>
                <i className="bi bi-file-earmark-spreadsheet me-2"></i>Export CSV
            </button>
            
        </div>
        <table className="table table-stripped table-bordered">
            <thead>     
                <tr>
                    <th onClick={() => requestSort('id')} style={{cursor: 'pointer'}}>
                        <div className="d-flex justify-content-between align-items-center">
                            ID
                            <i className={`bi ${getSortIcon('id')}`}></i>
                        </div>   
                    </th>
                    <th onClick={() => requestSort('firstName')} style={{ cursor: 'pointer' }}>
                        <div className="d-flex justify-content-between align-items-center">
                            First Name
                            <i className={`bi ${getSortIcon('firstName')}`}></i>
                        </div>
                    </th>
                    <th onClick={() => requestSort('lastName')} style={{cursor: 'pointer'}}>
                        <div className="d-flex justify-content-between align-items-center">
                            Last Name
                            <i className={`bi ${getSortIcon('lastName')}`}></i>
                        </div>
                    </th>
                    <th onClick={() => requestSort('email')} style={{cursor: 'pointer'}}>
                        <div className="d-flex justify-content-between align-items-center">
                            Email
                            <i className={`bi ${getSortIcon('email')}`}></i>
                        </div>
                    </th>
                    <th onClick={() => requestSort('departmentId')} style={{cursor: 'pointer'}}>
                        <div className="d-flex justify-content-between align-items-center">
                            Department
                            <i className={`bi ${getSortIcon('departmentId')}`}></i>
                        </div>
                    </th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                { sortedEmployees.map(employee => 
                    <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td>
                        <td>{employee.email}</td>
                        <td>{getDeptName(employee.departmentId)}</td>
                        <td>
                            <button className='btn btn-info' 
                                    onClick={() => updateEmployee(employee)}>Update</button>
                            <button className='btn btn-danger' 
                                    style={{marginLeft: '10px'}}
                                    onClick={() => confirmDelete(employee)}>Delete</button>
                        </td>
                    </tr>)
                }
            </tbody>
        </table>
        {/* Bootstrap Delete Modal */}
        <div className={`modal fade ${selectedEmployee ? 'show d-block' : ''}`} 
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} 
            tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Confirm Delete</h5>
                        <button type="button" className="btn-close" onClick={() => setSelectedEmployee(null)}></button>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to delete <b>{selectedEmployee?.firstName} {selectedEmployee?.lastName}</b>?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" 
                                className="btn btn-secondary" 
                                onClick={() => setSelectedEmployee(null)}
                                >Cancel</button>
                        <button type="button" 
                                className="btn btn-danger" 
                                onClick={handleFinalDelete}
                                >Yes, Delete</button>
                    </div>
                </div>
            </div>
        </div>
        {/* Success Toast */}
        {showToast && (
            <div className="position-fixed bottom-0 start-0 p-3 toast-fade show" style={{ zIndex: 9999 }}>
                <div className="toast show align-items-center text-white bg-dark border-0 p-3 shadow-lg" role="alert">
                    <div className="d-flex align-items-center">
                        <div className="toast-body">
                            {toastMessage}
                        </div>
                        
                        {/* Unod button */}
                        <button 
                            className="btn btn-warning btn-sm mx-3" 
                            onClick={undoDelete} 
                            style={{ fontWeight: 'bold' }}
                        >
                            UNDO
                        </button>

                        <button 
                            type="button" 
                            className="btn-close btn-close-white ms-auto" 
                            onClick={() => setShowToast(false)}
                        ></button>
                    </div>
                </div>
            </div>
        )}
    </div>
  )
}

export default ListEmployeeComponent