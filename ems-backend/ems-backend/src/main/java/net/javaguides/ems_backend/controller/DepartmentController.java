package net.javaguides.ems_backend.controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import net.javaguides.ems_backend.dto.DepartmentDto;
import net.javaguides.ems_backend.service.DepartmentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/departments")
public class DepartmentController {

      private DepartmentService departmentService;

      // Build Add Department REST API
      @PostMapping
      public ResponseEntity<DepartmentDto> createDepartment(@Valid @RequestBody DepartmentDto departmentDto) {
          DepartmentDto createdDepartment = departmentService.createDepartment(departmentDto);
          return new ResponseEntity<>(createdDepartment, HttpStatus.CREATED);
      }

      // Build Get Department by ID REST API
      @GetMapping("/{id}")
      public ResponseEntity<DepartmentDto> getDepartmentById(@PathVariable("id") Long departmentId) {
          DepartmentDto departmentDto = departmentService.getDepartmentById(departmentId);
          return ResponseEntity.ok(departmentDto);
      }

      // Build Get All Departments REST API
      @GetMapping
      public ResponseEntity<List<DepartmentDto>> getAllDepartments() {
          List<DepartmentDto> departments = departmentService.getAllDepartments();
          return ResponseEntity.ok(departments);
      }

      // Build Update Department REST API
      @PutMapping("/{id}")
      public ResponseEntity<DepartmentDto> updateDepartment(@PathVariable("id") Long departmentId,
                                                            @Valid @RequestBody DepartmentDto departmentDto) {
          DepartmentDto updatedDepartment = departmentService.updateDepartment(departmentId, departmentDto);
          return ResponseEntity.ok(updatedDepartment);
      }

      // Build Delete Department REST API
      @DeleteMapping("/{id}")
      public ResponseEntity<String> deleteDepartment(@PathVariable("id") Long departmentId) {
          departmentService.deleteDepartment(departmentId);
          return ResponseEntity.ok("Department with ID #" + departmentId + " was deleted successfully!");
      }
}
