package net.javaguides.ems_backend.mapper;
import net.javaguides.ems_backend.dto.EmployeeDto;
import net.javaguides.ems_backend.entity.EmployeeEntity;

// Mapper class to convert between Employee entity and EmployeeDto
public class EmployeeMapper {
    public static EmployeeDto mapToEmployeeDto(EmployeeEntity employee) {
        if (employee == null) {
            return null;
        }
        return new EmployeeDto(
            employee.getId(),
            employee.getFirstName(),
            employee.getLastName(),
            employee.getEmail(),
            // Handle potential null department
            employee.getDepartment() != null ? employee.getDepartment().getId() : null
        );
    }

    // Map EmployeeDto to Employee entity
    public static EmployeeEntity mapToEmployee(EmployeeDto employeeDto) {
        if (employeeDto == null) {
            return null;
        }
        EmployeeEntity employee = new EmployeeEntity();
        employee.setId(employeeDto.getId());
        employee.setFirstName(employeeDto.getFirstName());
        employee.setLastName(employeeDto.getLastName());
        employee.setEmail(employeeDto.getEmail());
        return employee;
    }
}
