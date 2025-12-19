package net.javaguides.ems_backend.service.impl;
import lombok.AllArgsConstructor;
import net.javaguides.ems_backend.dto.EmployeeDto;
import net.javaguides.ems_backend.entity.DepartmentEntity;
import net.javaguides.ems_backend.entity.EmployeeEntity;
import net.javaguides.ems_backend.exception.ResourceNotFoundException;
import net.javaguides.ems_backend.mapper.EmployeeMapper;
import net.javaguides.ems_backend.repository.DepartmentRepository;
import net.javaguides.ems_backend.repository.EmployeeRepository;
import net.javaguides.ems_backend.service.EmployeeService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {
    private EmployeeRepository employeeRepository;
    private DepartmentRepository departmentRepository;

    // Create Employee implementation
    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        // Convert DTO to entity
        EmployeeEntity employee = EmployeeMapper.mapToEmployee(employeeDto);
        DepartmentEntity department = departmentRepository.findById(employeeDto.getDepartmentId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Department does not exist with ID: " + employeeDto.getDepartmentId()));
        employee.setDepartment(department);
        EmployeeEntity savedEmployee = employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    // Get Employee by ID implementation
    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
        EmployeeEntity employee =  getEmployeeEntity(employeeId);
        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    // Get all Employees implementation
    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<EmployeeEntity> employees = employeeRepository.findByDeletedFalse();
        return employees.stream()
                .map(EmployeeMapper::mapToEmployeeDto)
                .collect(Collectors.toList());
    }

    // Update Employee implementation
    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee) {
        EmployeeEntity employee = getEmployeeEntity(employeeId);
        employee.setFirstName(updatedEmployee.getFirstName());
        employee.setLastName(updatedEmployee.getLastName());
        employee.setEmail(updatedEmployee.getEmail());
        DepartmentEntity department = departmentRepository.findById(updatedEmployee.getDepartmentId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Department does not exist with ID: " + updatedEmployee.getDepartmentId()));
        employee.setDepartment(department);
        EmployeeEntity updatedEmployeeObj = employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(updatedEmployeeObj);
    }

    // Delete Employee implementation (soft delete)
    @Override
    public void deleteEmployee(Long employeeId) {
        EmployeeEntity employee = getEmployeeEntity(employeeId);
        employee.setDeleted(true);
        employeeRepository.save(employee);
    }

    // Private method to get Employee entity by ID
    private EmployeeEntity getEmployeeEntity(Long employeeId) {
        EmployeeEntity employee = employeeRepository.findById(employeeId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Employee does not exist with ID: " + employeeId));

        // Check that employee is not soft-deleted
        if (employee.isDeleted()) {
            throw new RuntimeException("Operation failed: no active employee with ID: " + employeeId);
        }
        return employee;
    }
}