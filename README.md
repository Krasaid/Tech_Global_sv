🚀 Sistema de Gestión de Empleados - TecnoGlobal S.A.

Proyecto Full-Stack desarrollado como parte del Laboratorio #3, que implementa un sistema web para administrar la información del personal de la empresa ficticia TecnoGlobal S.A.

El sistema permite gestionar empleados y visualizar estadísticas clave de la nómina mediante una interfaz moderna y dinámica.

✨ Funcionalidades Principales

🔐 Login seguro con Spring Security.

👥 Gestión completa de empleados (CRUD): crear, editar y eliminar registros.

📊 Dashboard interactivo:

Totales de empleados activos e inactivos.

Salario y antigüedad promedio.

Gráfico de distribución por puesto (Chart.js).

🔎 Filtros dinámicos: búsqueda por puesto y estado.

🧩 Datos de prueba automáticos: 30 empleados generados con JavaFaker.

💻 Interfaz moderna: Tailwind CSS + Fetch API (sin recargar página).

🛠️ Tecnologías

Backend:

Java 21

Spring Boot 3.3.0 (Web, Data JPA, Security)

H2 Database (en memoria)

JavaFaker

Frontend:

HTML5

Tailwind CSS

JavaScript (ES6+)

Fetch API

Chart.js

⚙️ Ejecución del Proyecto

Clona el repositorio.

Abre el proyecto en IntelliJ IDEA o VSCode (con extensión Java).

Asegúrate de actualizar las dependencias de Maven.

Ejecuta EmpleadosApiApplication.java.

Accede a la app en http://localhost:8080.

🔑 Credenciales

Login:

Usuario: admin@tecnoglobal.com

Contraseña: 1234

Consola H2:

URL: http://localhost:8080/h2-console

JDBC URL: jdbc:h2:mem:testdb

Usuario: sa

Contraseña: (vacía)
