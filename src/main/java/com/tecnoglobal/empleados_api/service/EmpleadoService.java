package com.tecnoglobal.empleados_api.service; // Asegúrate que tu package sea el correcto

import com.tecnoglobal.empleados_api.model.Empleado;
import com.tecnoglobal.empleados_api.repository.EmpleadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class EmpleadoService {

    @Autowired
    private EmpleadoRepository empleadoRepository;

    // --- FR 1: Gestión de Empleados ---
    public List<Empleado> getAllEmpleados() {
        return empleadoRepository.findAll();
    }

    public Optional<Empleado> getEmpleadoById(Long id) {
        return empleadoRepository.findById(id);
    }

    public Empleado saveEmpleado(Empleado empleado) {
        // Aquí se disparan las validaciones (@NotBlank, etc.)
        return empleadoRepository.save(empleado);
    }

    public Empleado updateEmpleado(Long id, Empleado empleadoDetails) {
        // 1. Busca al empleado que ya existe en la BD
        Empleado empleado = empleadoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Empleado no encontrado con id: " + id));

        // 2. Actualiza CADA CAMPO con los datos que vienen del formulario
        empleado.setNombre(empleadoDetails.getNombre());
        empleado.setApellido(empleadoDetails.getApellido());
        empleado.setDui(empleadoDetails.getDui());
        empleado.setTelefono(empleadoDetails.getTelefono());
        empleado.setCorreo(empleadoDetails.getCorreo());
        empleado.setDireccion(empleadoDetails.getDireccion());
        empleado.setFecha_contratacion(empleadoDetails.getFecha_contratacion());
        empleado.setPuesto(empleadoDetails.getPuesto());
        empleado.setSalario(empleadoDetails.getSalario());
        empleado.setEstado(empleadoDetails.getEstado());

        // 3. Guarda el objeto 'empleado' actualizado en la BD
        return empleadoRepository.save(empleado);
    }

    public void deleteEmpleado(Long id) {
        empleadoRepository.deleteById(id);
    }

    // --- FR 2: Filtros de Búsqueda ---
    public List<Empleado> getEmpleadosByPuesto(String puesto) {
        return empleadoRepository.findByPuesto(puesto);
    }
    public List<Empleado> getEmpleadosByEstado(String estado) {
        return empleadoRepository.findByEstado(estado);
    }

    public List<Empleado> getEmpleadosConSalarioMayorA(Double salario) {
        return empleadoRepository.findBySalarioGreaterThan(salario);
    }

    public List<Empleado> getEmpleadosConSalarioMenorA(Double salario) {
        return empleadoRepository.findBySalarioLessThan(salario);
    }


    // --- FR 3: Visualización de Estadísticas ---
    public Map<String, Object> getEstadisticas() {
        Map<String, Object> stats = new HashMap<>();

        // Total empleados (sigue contando a todos)
        stats.put("totalEmpleados", empleadoRepository.count());

        // Empleados por estado
        stats.put("totalActivos", empleadoRepository.countByEstado("Activo"));
        stats.put("totalInactivos", empleadoRepository.countByEstado("Inactivo"));

        // Empleados por puesto
        stats.put("empleadosPorPuesto", empleadoRepository.countByPuesto());

        // --- ¡CAMBIO AQUÍ! ---
        // Promedio salarios (solo activos)
        stats.put("promedioSalario", empleadoRepository.getAverageSalarioActivos());

        // --- ¡CAMBIO AQUÍ! ---
        // Antigüedad promedio (solo activos)
        List<Empleado> empleadosActivos = empleadoRepository.findByEstado("Activo"); // 1. Buscamos solo activos

        if (empleadosActivos.isEmpty()) {
            stats.put("antiguedadPromedioMeses", 0.0);
        } else {
            double totalAntiguedadEnMeses = 0;
            for (Empleado e : empleadosActivos) { // 2. Iteramos solo sobre activos
                if (e.getFecha_contratacion() != null) {
                    totalAntiguedadEnMeses += ChronoUnit.MONTHS.between(e.getFecha_contratacion(), LocalDate.now());
                }
            }
            stats.put("antiguedadPromedioMeses", totalAntiguedadEnMeses / empleadosActivos.size()); // 3. Dividimos entre el total de activos
        }

        return stats;
    }
}