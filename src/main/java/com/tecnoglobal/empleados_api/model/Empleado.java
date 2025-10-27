package com.tecnoglobal.empleados_api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;
import java.time.LocalDate;

@Data // Lombok: genera getters, setters, toString, etc.
@Entity // Le dice a JPA que esta clase es una tabla
@Table(name = "Empleado") // Nombre de la tabla en la BD
public class Empleado {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_empleado; // [cite: 14]

    @NotBlank // Validación (FR 1.3)
    private String nombre; // [cite: 14]

    @NotBlank
    private String apellido; // [cite: 14]

    @NotBlank
    @Column(unique = true) // El DUI debe ser único
    private String dui; // [cite: 14]

    private String telefono; // [cite: 14]

    @Email // Validación
    @NotBlank
    private String correo; // [cite: 14]

    private String direccion; // [cite: 14]

    @NotNull
    private LocalDate fecha_contratacion; // [cite: 14]

    @NotBlank
    private String puesto; // [cite: 14]

    @NotNull
    @PositiveOrZero // El salario no puede ser negativo
    private Double salario; // [cite: 14]

    @NotBlank
    private String estado; // "Activo" o "Inactivo" [cite: 14, 25]
}
