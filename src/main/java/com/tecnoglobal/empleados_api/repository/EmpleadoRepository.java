package com.tecnoglobal.empleados_api.repository; // Asegúrate que tu package sea el correcto

import com.tecnoglobal.empleados_api.model.Empleado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface EmpleadoRepository extends JpaRepository<Empleado, Long>, JpaSpecificationExecutor<Empleado> {

    // --- Para Filtros (FR 2) ---
    List<Empleado> findByPuesto(String puesto);
    List<Empleado> findByEstado(String estado);
    List<Empleado> findBySalarioGreaterThan(Double salario);
    List<Empleado> findBySalarioLessThan(Double salario);

    // --- Para Estadísticas (FR 3) ---

    @Query("SELECT COUNT(e) FROM Empleado e WHERE e.estado = ?1")
    long countByEstado(String estado);

    // ¡Refactorizado! Se añaden alias para evitar el error de llave NULL en JSON
    @Query("SELECT e.puesto as puesto, COUNT(e) as count FROM Empleado e GROUP BY e.puesto")
    List<Map<String, Object>> countByPuesto();

    @Query("SELECT AVG(e.salario) FROM Empleado e")
    Double getAverageSalario(); // Promedio de TODOS (ya no lo usamos)

    // ¡NUEVO! Promedio de salario solo para empleados ACTIVOS
    @Query("SELECT AVG(e.salario) FROM Empleado e WHERE e.estado = 'Activo'")
    Double getAverageSalarioActivos();
}