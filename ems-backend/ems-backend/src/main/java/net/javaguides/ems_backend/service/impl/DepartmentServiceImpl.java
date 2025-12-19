package net.javaguides.ems_backend.service.impl;
import lombok.AllArgsConstructor;
import net.javaguides.ems_backend.dto.DepartmentDto;
import net.javaguides.ems_backend.entity.DepartmentEntity;
import net.javaguides.ems_backend.exception.ResourceNotFoundException;
import net.javaguides.ems_backend.mapper.DepartmentMapper;
import net.javaguides.ems_backend.service.DepartmentService;
import org.springframework.stereotype.Service;
import net.javaguides.ems_backend.repository.DepartmentRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class DepartmentServiceImpl implements DepartmentService {
    private DepartmentRepository departmentRepository;

    // Create Department implementation
    @Override
    public DepartmentDto createDepartment(DepartmentDto departmentDto) {
        // Convert DTO to entity
        DepartmentEntity department = DepartmentMapper.mapToDepartment(departmentDto);
        DepartmentEntity savedDepartment = departmentRepository.save(department);
        return DepartmentMapper.mapToDepartmentDto(savedDepartment);
    }

    // Get Department by ID implementation
    @Override
    public DepartmentDto getDepartmentById(Long departmentId) {
        DepartmentEntity department = getDepartmentEntity(departmentId);
        return DepartmentMapper.mapToDepartmentDto(department);
    }

    // Get all Departments implementation
    @Override
    public List<DepartmentDto> getAllDepartments() {
        List<DepartmentEntity> departments = departmentRepository.findByDeletedFalse();
        return departments.stream()
                .map(DepartmentMapper::mapToDepartmentDto)
                .collect(Collectors.toList());
    }

    // Update Department implementation
    @Override
    public DepartmentDto updateDepartment(Long departmentId, DepartmentDto updatedDepartment) {
        DepartmentEntity department = getDepartmentEntity(departmentId);
        department.setDepartmentName(updatedDepartment.getDepartmentName());
        department.setDepartmentDescription(updatedDepartment.getDepartmentDescription());
        DepartmentEntity updatedDepartmentObj = departmentRepository.save(department);
        return DepartmentMapper.mapToDepartmentDto(updatedDepartmentObj);
    }

    // Delete Department implementation (soft delete)
    @Override
    public void deleteDepartment(Long departmentId) {
        DepartmentEntity department = getDepartmentEntity(departmentId);
        department.setDeleted(true);
        departmentRepository.save(department);
    }

    // Private method to get Department entity by ID
    private DepartmentEntity getDepartmentEntity(Long departmentId) {
        return departmentRepository.findById(departmentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Department not found with ID: " + departmentId));
    }
}
