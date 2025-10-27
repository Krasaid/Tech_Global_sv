package com.tecnoglobal.empleados_api.config; // O tu paquete de config

import com.github.javafaker.Faker;
import com.tecnoglobal.empleados_api.model.Empleado;
import com.tecnoglobal.empleados_api.repository.EmpleadoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Locale;
import java.util.concurrent.TimeUnit;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initDatabase(EmpleadoRepository repository) {
        return args -> {
            // Usamos Faker en español
            Faker faker = new Faker(new Locale("es-SV"));

            // Lista de puestos y estados
            String[] puestos = {"Gerente", "Técnico", "Asistente", "Analista", "Desarrollador"};
            String[] estados = {"Activo", "Activo", "Activo", "Inactivo"}; // Más chance de ser 'Activo'

            // Creamos 30 empleados
            for (int i = 0; i < 30; i++) {
                Empleado emp = new Empleado();

                emp.setNombre(faker.name().firstName());
                emp.setApellido(faker.name().lastName());

                // Usamos un DUI falso único
                emp.setDui(String.format("%08d-%d", faker.number().randomNumber(8, true), i % 10));
                emp.setTelefono(faker.phoneNumber().cellPhone());

                // --- ¡CORREGIDO! ---
                // Usamos el generador de email de Faker, que es 100% seguro y válido
                emp.setCorreo(faker.internet().emailAddress());

                emp.setDireccion(faker.address().streetAddress());

                // Fecha de contratación de los últimos 5 años
                LocalDate fechaContratacion = faker.date().past(5 * 365, TimeUnit.DAYS)
                        .toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
                emp.setFecha_contratacion(fechaContratacion);

                emp.setPuesto(faker.options().nextElement(puestos));
                emp.setSalario(faker.number().randomDouble(2, 800, 4500));
                emp.setEstado(faker.options().nextElement(estados));

                // Guardamos el empleado en la BD
                repository.save(emp);
            }

            System.out.println("--- ¡Se cargaron " + repository.count() + " empleados de prueba! ---");
        };
    }
}