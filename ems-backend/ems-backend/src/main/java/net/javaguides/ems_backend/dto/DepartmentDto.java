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
public class DepartmentDto {
    private Long id;
    @NotBlank(message = "Department name is required")
    private String departmentName;
    @NotBlank(message = "Department description is required")
    private String departmentDescription;
}
