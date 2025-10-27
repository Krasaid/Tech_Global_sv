-- Ponemos los INSERT en data.sql (Spring Boot lo ejecuta solo)
-- OJO: No incluimos el id_empleado, porque es autoincremental

INSERT INTO empleado (nombre, apellido, dui, telefono, correo, direccion, fecha_contratacion, puesto, salario, estado)
VALUES ('Ana', 'García', '11111111-1', '7777-1111', 'ana.garcia@tecnoglobal.com', 'San Salvador', '2022-01-15', 'Gerente', 3500.00, 'Activo');

INSERT INTO empleado (nombre, apellido, dui, telefono, correo, direccion, fecha_contratacion, puesto, salario, estado)
VALUES ('Carlos', 'Martínez', '22222222-2', '7777-2222', 'carlos.martinez@tecnoglobal.com', 'Santa Ana', '2021-03-10', 'Técnico', 1200.00, 'Activo');

INSERT INTO empleado (nombre, apellido, dui, telefono, correo, direccion, fecha_contratacion, puesto, salario, estado)
VALUES ('Lucía', 'Hernández', '33333333-3', '7777-3333', 'lucia.hernandez@tecnoglobal.com', 'San Miguel', '2023-05-20', 'Técnico', 1100.00, 'Activo');

INSERT INTO empleado (nombre, apellido, dui, telefono, correo, direccion, fecha_contratacion, puesto, salario, estado)
VALUES ('David', 'López', '44444444-4', '7777-4444', 'david.lopez@tecnoglobal.com', 'Santa Tecla', '2020-11-01', 'Analista', 1800.00, 'Activo');

INSERT INTO empleado (nombre, apellido, dui, telefono, correo, direccion, fecha_contratacion, puesto, salario, estado)
VALUES ('Sofía', 'Pérez', '55555555-5', '7777-5555', 'sofia.perez@tecnoglobal.com', 'Sonsonate', '2022-08-30', 'Asistente', 800.00, 'Activo');

INSERT INTO empleado (nombre, apellido, dui, telefono, correo, direccion, fecha_contratacion, puesto, salario, estado)
VALUES ('Javier', 'Rivas', '66666666-6', '7777-6666', 'javier.rivas@tecnoglobal.com', 'La Libertad', '2019-06-15', 'Gerente', 3200.00, 'Inactivo');