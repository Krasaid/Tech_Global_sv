# 🚀 Sistema de Gestión de Empleados - TecnoGlobal S.A.

[cite_start]Proyecto Full-Stack desarrollado como parte del **Laboratorio #3**. [cite_start]Implementa un sistema web para administrar la información de los empleados de la empresa ficticia TecnoGlobal S.A.  [cite_start]El sistema permite gestionar el personal y visualizar estadísticas clave de la nómina de forma dinámica. [cite: 11]

## ✨ Características Principales

* **Seguridad:** Login de usuarios implementado con **Spring Security**.
* **Gestión de Empleados (CRUD):**
    * [cite_start]Registrar nuevos empleados. [cite: 18]
    * [cite_start]Editar la información completa de empleados existentes. [cite: 21]
    * [cite_start]Eliminar empleados (con confirmación). [cite: 21]
* [cite_start]**Dashboard de Estadísticas:** 
    * [cite_start]Tarjetas con el total de empleados, [cite: 28] [cite_start]activos e inactivos. [cite: 30]
    * [cite_start]Cálculo del salario promedio  [cite_start]y antigüedad promedio (solo de personal activo). 
    * [cite_start]Gráfico de dona (Chart.js) que muestra la distribución de empleados por puesto. [cite: 29, 33]
* [cite_start]**Filtros Dinámicos:** Búsqueda y filtrado de la tabla de empleados por puesto y estado. [cite: 24, 25]
* **Datos de Prueba:** Generación automática de 30 empleados *fake* (con JavaFaker) al iniciar la aplicación para pruebas.
* [cite_start]**Interfaz Moderna:** Frontend responsive diseñado con **Tailwind CSS**  [cite_start]que se actualiza sin recargar la página (Fetch API). 

---

## 🛠️ Tecnologías Utilizadas

### Backend
* **Java 21**
* **Spring Boot 3.3.0**
    * Spring Web (API REST)
    * Spring Data JPA (Repositorios)
    * Spring Security (Login)
* **H2 Database** (Base de datos en memoria)
* **JavaFaker** (Para la carga de datos de prueba)

### Frontend
* **HTML5**
* [cite_start]**Tailwind CSS** 
* **JavaScript (ES6+)**
* [cite_start]**Fetch API** (Consumo de la API) 
* [cite_start]**Chart.js** (Gráficos del dashboard) 

---

## 🏃‍♂️ Cómo Ejecutar el Proyecto

1.  Clonar este repositorio.
2.  Abrir el proyecto en tu IDE (IntelliJ IDEA o VSCode con la extensión de Java).
3.  Asegurarte de que el IDE **recargue las dependencias de Maven** (para descargar Spring, Faker, etc.).
4.  Ejecutar la clase principal `EmpleadosApiApplication.java`.
5.  El servidor se iniciará en `http://localhost:8080`.

### Acceso a la Aplicación

* **URL de Login:** `http://localhost:8080/login.html`
* **Usuario:** `admin@tecnoglobal.com`
* **Contraseña:** `1234`

### Acceso a la Base de Datos (H2)

* **URL de la Consola H2:** `http://localhost:8080/h2-console`
* **JDBC URL:** `jdbc:h2:mem:testdb`
* **User Name:** `sa`
* **Password:** (dejar en blanco)
