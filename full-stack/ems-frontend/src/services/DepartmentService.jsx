import axios from 'axios';

const REST_API_BASE_DEP_URL = 'http://localhost:8080/api/departments';

export const listDepartments = () => axios.get(REST_API_BASE_DEP_URL);

export const createDepartment = (department) => axios.post(REST_API_BASE_DEP_URL, department);

export const getDepartment = (departmentId) => axios.get(REST_API_BASE_DEP_URL + '/' + departmentId);

export const updateDepartment = (departmentId, department) => axios.put(REST_API_BASE_DEP_URL + '/' +departmentId, department)

export const deleteDepartment = (departmentId) => axios.delete(REST_API_BASE_DEP_URL + '/' + departmentId)

export const restoreDepartment = (departmentId, department) => axios.put(`${REST_API_BASE_DEP_URL}/${departmentId}`,{...department, deleted: false})