import React, { useEffect, useState } from 'react'
import { createDepartment, deleteDepartment, listDepartments } from '../services/DepartmentService'
import {useNavigate} from 'react-router-dom'

const ListDepartmentComponent = ({ searchTerm }) => {

    const [departments, setDepartments] = useState([])
    const navigator = useNavigate();
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [lastDeletedDepartment, setLastDeletedDepartment] = useState(null);


    function getAllDepartments() {
            listDepartments().then((response) => {
                setDepartments(response.data);
            }).catch(e => {
                console.error(e);
            })
        }

    useEffect(() => {
            getAllDepartments();
    }, [])

    const filteredDepartments = departments.filter(dep => {
        const search = searchTerm?.toLowerCase() || '';
        return (
            dep.departmentName.toLowerCase().includes(search) ||
            dep.departmentDescription.toLowerCase().includes(search) ||
            String(dep.id).includes(search)
        );
    });
    
    const undoDelete = () => {
        if (lastDeletedDepartment) {
            // Using your existing createDepartment service to "restore" them
            createDepartment(lastDeletedDepartment).then(() => {
                getAllDepartments();
                setShowToast(false);
                setLastDeletedDepartment(null);
            }).catch(error => console.error(error));
        }
    };

    function addNewDepartment() {
        navigator('/add-department')
    }

    function updateDepartment(department) {
        navigator(`/edit-department/${department.id}`)
    }

    const confirmDelete = (department) => {
        setSelectedDepartment(department);
    };

    const handleFinalDelete = () => {
            if (selectedDepartment) {
                const DepartmentToRestore = { ...selectedDepartment };
                const name = `${selectedDepartment.departmentName}`;
                
                deleteDepartment(selectedDepartment.id).then(() => {
                    setLastDeletedDepartment(DepartmentToRestore); 
                    getAllDepartments();
                    setSelectedDepartment(null); 
    
                    setToastMessage(`${name} was deleted`);
                    setShowToast(true);
                    setTimeout(() => setShowToast(false), 5000);
                }).catch(error => console.error(error));
            }
        };

        const exportToCSV = () =>{
        if (filteredDepartments.length === 0) return;

        // Choose which data to allow to download
        const columnMapping = {
            id: "ID",
            departmentName: "First Name",
            departmentDescription: "Last Name"
        };

        const keys = Object.keys(columnMapping);
        // Build csv string
        const headerRow = keys.map(key => columnMapping[key]).join(",");

        const dataRows = filteredDepartments.map(dep => {
            return keys.map(key => {
                let value = dep[key];
                
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
        link.setAttribute("download", `Department_List_${date}.csv`);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        // Clean up memory
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

  return (
    <div className='container'>
        <h2 className='text-center'>Departments List</h2>
        {/* Flex container to push buttons to opposite sides */}
        <div className="d-flex justify-content-between align-items-center mb-3">
            <button className="btn btn-primary" onClick={addNewDepartment}>
                <i className="bi bi-person-plus-fill me-2"></i>Add Department
            </button>
            <button className="btn btn-success" onClick={exportToCSV}>
                <i className="bi bi-file-earmark-spreadsheet me-2"></i>Export CSV
            </button>
        </div>
        <table className="table table-stripped table-bordered">
            <thead>     
                <tr>
                    <th>Department ID</th>
                    <th>Department Name</th>
                    <th>Department Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                { filteredDepartments.map(department => 
                    <tr key={department.id}>
                        <td>{department.id}</td>
                        <td>{department.departmentName}</td>
                        <td>{department.departmentDescription}</td>
                        <td>
                            <button className='btn btn-info' 
                                    onClick={() => updateDepartment(department)}>Update</button>
                            <button className='btn btn-danger' 
                                    style={{marginLeft: '10px'}}
                                    onClick={() => confirmDelete(department)}>Delete</button>
                        </td>
                    </tr>)
                }
            </tbody>
        </table>
        {/* Bootstrap Delete Modal */}
        <div className={`modal fade ${selectedDepartment ? 'show d-block' : ''}`} 
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} 
            tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Confirm Delete</h5>
                        <button type="button" className="btn-close" onClick={() => setSelectedDepartment(null)}></button>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to delete <b>{selectedDepartment?.departmentName}</b>?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" 
                                className="btn btn-secondary" 
                                onClick={() => setSelectedDepartment(null)}
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
                        
                        {/* Undo button */}
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

export default ListDepartmentComponent