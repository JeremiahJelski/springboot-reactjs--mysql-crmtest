package net.javaguides.ems_backend.dto;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDto {
    private Long id;
    @NotBlank(message = "Employee first name is required")
    private String firstName;
    @NotBlank(message = "Employee last name is required")
    private String lastName;
    @NotBlank(message = "Employee email is required")
    private String email;
    private Long departmentId;
}
