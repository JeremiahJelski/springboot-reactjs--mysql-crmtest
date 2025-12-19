package net.javaguides.ems_backend.repository;
import net.javaguides.ems_backend.entity.DepartmentEntity;
import net.javaguides.ems_backend.entity.EmployeeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DepartmentRepository extends JpaRepository<DepartmentEntity, Long> {
    List<DepartmentEntity> findByDeletedFalse();
}
