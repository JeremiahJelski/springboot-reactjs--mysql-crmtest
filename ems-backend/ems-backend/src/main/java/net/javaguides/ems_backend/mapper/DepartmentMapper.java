package net.javaguides.ems_backend.mapper;
import net.javaguides.ems_backend.entity.DepartmentEntity;
import net.javaguides.ems_backend.dto.DepartmentDto;

public class DepartmentMapper {
    // Convert Department entity to DepartmentDto
    public static DepartmentDto mapToDepartmentDto(DepartmentEntity department) {
        if (department == null) {
            return null;
        }
        return new DepartmentDto(
            department.getId(),
            department.getDepartmentName(),
            department.getDepartmentDescription()
        );
    }

    // Convert DepartmentDto to Department entity
    public static DepartmentEntity mapToDepartment(DepartmentDto departmentDto) {
        if (departmentDto == null) {
            return null;
        }
        return new DepartmentEntity(
                departmentDto.getId(),
                departmentDto.getDepartmentName(),
                departmentDto.getDepartmentDescription(),
                false
        );
    }
}
