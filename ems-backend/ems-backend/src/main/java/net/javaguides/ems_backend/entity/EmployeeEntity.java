package net.javaguides.ems_backend.entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.SQLRestriction;

// Employee entity representing the employees table in the database
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "employees")
@SQLRestriction("deleted = 0")
public class EmployeeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    // Explicitly specifying column names so they are not named the same as the class fields
    @Column(name="first_name")
    private String firstName;
    @Column(name="last_name")
    private String lastName;
    @Column(name="email", nullable = false, unique = true)
    private String email;
    // Many-to-one relationship with DepartmentEntity
    // DepartmentEntity is the owning side of the relationship
    @JoinColumn(name="department_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private DepartmentEntity department;
    private boolean deleted = false;
}
