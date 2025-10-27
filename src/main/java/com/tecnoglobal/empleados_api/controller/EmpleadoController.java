package com.tecnoglobal.empleados_api.controller;

import com.tecnoglobal.empleados_api.model.Empleado;
import com.tecnoglobal.empleados_api.service.EmpleadoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/empleados") // URL base
@CrossOrigin(origins = "*") // Permite peticiones desde cualquier frontend (¡ajustar en producción!)+
public class EmpleadoController {
    @Autowired
    private EmpleadoService empleadoService;

    // --- Endpoints para FR 1 ---

    @PostMapping
    public Empleado createEmpleado(@Valid @RequestBody Empleado empleado) { // [cite: 18]
        return empleadoService.saveEmpleado(empleado);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Empleado> getEmpleadoById(@PathVariable Long id) {
        return empleadoService.getEmpleadoById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Empleado> updateEmpleado(@PathVariable Long id, @Valid @RequestBody Empleado empleadoDetails) { //
        try {
            return ResponseEntity.ok(empleadoService.updateEmpleado(id, empleadoDetails));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmpleado(@PathVariable Long id) { //
        empleadoService.deleteEmpleado(id);
        return ResponseEntity.noContent().build();
    }

    // --- Endpoints para FR 2 (Filtros) ---
    // Combinamos la búsqueda general con los filtros [cite: 24, 25, 26]
    @GetMapping
    public List<Empleado> getAllEmpleados(
            @RequestParam(required = false) String puesto,
            @RequestParam(required = false) String estado) {

        if (puesto != null) {
            return empleadoService.getEmpleadosByPuesto(puesto);
        }
        if (estado != null) {
            return empleadoService.getEmpleadosByEstado(estado);
        }
        // ... añadir lógica para filtros de salario ...

        return empleadoService.getAllEmpleados(); // Si no hay filtros
    }


    // --- Endpoint para FR 3 (Estadísticas) ---
    @GetMapping("/stats")
    public Map<String, Object> getEstadisticas() {
        return empleadoService.getEstadisticas(); // [cite: 28, 29, 30, 31, 32]
    }


}
