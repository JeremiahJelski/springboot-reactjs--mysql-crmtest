package net.javaguides.ems_backend.repository;
import net.javaguides.ems_backend.entity.EmployeeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


// This interface provides CRUD operations for Employee entities
// No need to annotate @Repository because JpaRepository already includes it
public interface EmployeeRepository extends JpaRepository<EmployeeEntity, Long> {
    List<EmployeeEntity> findByDeletedFalse();
}
