Este es un proyecto Full-Stack (Laboratorio #3) que implementa un panel de control para la administración de empleados de la empresa TecnoGlobal S.A. El sistema permite gestionar el personal (CRUD) y visualizar estadísticas clave como el total de empleados, promedio de salarios y antigüedad, todo protegido por un login.





El backend está construido con Java y Spring Boot, exponiendo una API REST con Spring Web, Spring Data JPA y Spring Security. La base de datos es H2 (en memoria) y se puebla al inicio con 30 usuarios de prueba generados por JavaFaker.

El frontend es una Single Page Application (SPA) construida con HTML, Tailwind CSS y JavaScript puro (ES6+), que consume la API de forma asíncrona (Fetch) y renderiza gráficos de estadísticas con Chart.js.
