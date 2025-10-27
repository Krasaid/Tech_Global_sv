// Esperamos a que todo el HTML esté cargado
document.addEventListener('DOMContentLoaded', () => {

    // --- Referencias a elementos del DOM ---

    // Estadísticas
    const totalEmpleadosEl = document.getElementById('total-empleados');
    const totalActivosEl = document.getElementById('total-activos');
    const totalInactivosEl = document.getElementById('total-inactivos');
    const salarioPromedioEl = document.getElementById('salario-promedio');
    const antiguedadPromedioEl = document.getElementById('antiguedad-promedio');

    // Gráfico
    const ctx = document.getElementById('grafico-puestos').getContext('2d');
    let graficoPuestos; // Variable para guardar la instancia del gráfico

    // Formulario
    const formNuevoEmpleado = document.getElementById('form-nuevo-empleado');
    const formTituloEl = document.getElementById('form-titulo');
    const formMensajeEl = document.getElementById('form-mensaje');
    const btnGuardarEmpleado = document.getElementById('btn-guardar-empleado');
    const inputIdEditando = document.getElementById('id-empleado-editando');

    // Filtros
    const filtroNombreEl = document.getElementById('filtro-nombre');
    const filtroPuestoEl = document.getElementById('filtro-puesto');
    const filtroEstadoEl = document.getElementById('filtro-estado');
    const filtroSalarioMayorEl = document.getElementById('filtro-salario-mayor');

    // Tabla
    const tablaEmpleadosBody = document.getElementById('tabla-empleados');

    // --- URL de la API (Asegúrate que coincida con tu backend) ---
    const API_URL = '/api/empleados';

    // --- Función para cargar y mostrar Estadísticas (FR 3) ---
    async function cargarEstadisticas() {
        try {
            const response = await fetch(`${API_URL}/stats`);
            if (!response.ok) throw new Error('Error al cargar estadísticas');
            const stats = await response.json();

            // Actualizamos las tarjetas
            totalEmpleadosEl.textContent = stats.totalEmpleados || 0;
            totalActivosEl.textContent = stats.totalActivos || 0;
            totalInactivosEl.textContent = stats.totalInactivos || 0;
            salarioPromedioEl.textContent = stats.promedioSalario ? `$${stats.promedioSalario.toFixed(2)}` : '$0.00';
            antiguedadPromedioEl.textContent = stats.antiguedadPromedioMeses ? stats.antiguedadPromedioMeses.toFixed(1) : 0;

            // Renderizamos el gráfico (ajusta 'item.puesto' y 'item.count' si tu API devuelve otra cosa)
            renderizarGrafico(stats.empleadosPorPuesto || []);

        } catch (error) {
            console.error(error);
            mostrarMensaje('No se pudieron cargar las estadísticas.', 'error');
        }
    }

    // --- Función para renderizar el Gráfico (FR 3.3) ---
    function renderizarGrafico(data) {
        // Asumiendo que el API devuelve [{puesto: 'Gerente', COUNT(e): 2}, ...]
        // Mapeamos a los nombres que usa Chart.js
        const labels = data.map(item => item.puesto);
        const counts = data.map(item => item.count || item['COUNT(e)']); // Maneja ambos nombres comunes

        // Si ya existe un gráfico, lo destruimos
        if (graficoPuestos) {
            graficoPuestos.destroy();
        }

        // Creamos el gráfico
        graficoPuestos = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Empleados por Puesto',
                    data: counts,
                    backgroundColor: [
                        '#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#6366F1',
                    ],
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                }
            }
        });
    }

    // --- Función para cargar y mostrar Empleados (FR 1 y 2) ---
    async function cargarEmpleados() {

        // Construimos los parámetros de la URL dinámicamente
        const params = new URLSearchParams();
        if (filtroNombreEl.value) params.append('nombre', filtroNombreEl.value); // Asumiendo que el backend soporta 'nombre'
        if (filtroPuestoEl.value) params.append('puesto', filtroPuestoEl.value);
        if (filtroEstadoEl.value) params.append('estado', filtroEstadoEl.value);
        if (filtroSalarioMayorEl.value) params.append('salarioMayorA', filtroSalarioMayorEl.value); // Asumiendo 'salarioMayorA'

        try {
            const response = await fetch(`${API_URL}?${params.toString()}`);
            if (!response.ok) throw new Error('Error al cargar empleados');
            const empleados = await response.json();

            renderizarTabla(empleados);

        } catch (error) {
            console.error(error);
            tablaEmpleadosBody.innerHTML = `<tr><td colspan="7" class="p-8 text-center text-red-500">Error al cargar los datos.</td></tr>`;
        }
    }

    // --- Función para "pintar" la tabla ---
    function renderizarTabla(empleados) {
        tablaEmpleadosBody.innerHTML = ''; // Limpiamos la tabla

        if (empleados.length === 0) {
            tablaEmpleadosBody.innerHTML = `<tr><td colspan="7" class="p-8 text-center text-gray-500">No se encontraron empleados.</td></tr>`;
            return;
        }

        // Creamos una fila por cada empleado
        empleados.forEach(emp => {
            const tr = document.createElement('tr');
            tr.className = 'hover:bg-gray-50';

            // Formateamos la fecha (YYYY-MM-DD -> DD/MM/YYYY)
            const fechaFormateada = emp.fecha_contratacion ? new Date(emp.fecha_contratacion + 'T00:00:00').toLocaleDateString() : 'N/A';

            tr.innerHTML = `
                <td class="p-4 whitespace-nowrap">
                    <div class="font-medium text-gray-900">${emp.nombre} ${emp.apellido}</div>
                    <div class="text-sm text-gray-500">${emp.dui}</div>
                </td>
                <td class="p-4 whitespace-nowrap text-sm text-gray-700">${emp.puesto}</td>
                <td class="p-4 whitespace-nowrap text-sm text-gray-700">${emp.correo}</td>
                <td class="p-4 whitespace-nowrap text-sm text-gray-700">$${emp.salario.toFixed(2)}</td>
                <td class="p-4 whitespace-nowrap">
                    <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${emp.estado === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                        ${emp.estado}
                    </span>
                </td>
                <td class="p-4 whitespace-nowrap text-sm text-gray-700">${fechaFormateada}</td>
                <td class="p-4 whitespace-nowrap text-sm font-medium">
                    <button 
                        class="text-indigo-600 hover:text-indigo-900 mr-3 btn-editar" 
                        data-id="${emp.id_empleado}">
                        Editar
                    </button>
                    <button 
                        class="text-red-600 hover:text-red-900 btn-eliminar" 
                        data-id="${emp.id_empleado}">
                        Eliminar
                    </button>
                </td>
            `;
            tablaEmpleadosBody.appendChild(tr);
        });
    }

    // --- Event Listener para el formulario (CREAR y ACTUALIZAR) ---
    formNuevoEmpleado.addEventListener('submit', async (e) => {
        e.preventDefault();

        btnGuardarEmpleado.disabled = true;
        btnGuardarEmpleado.textContent = 'Guardando...';
        formMensajeEl.classList.add('hidden');

        // 1. Vemos si estamos editando o creando
        const idEditando = inputIdEditando.value;

        // 2. Recolectamos los datos del formulario
        const empleadoData = {
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            dui: document.getElementById('dui').value,
            correo: document.getElementById('correo').value,
            telefono: document.getElementById('telefono').value,
            direccion: document.getElementById('direccion').value,
            puesto: document.getElementById('puesto').value,
            salario: parseFloat(document.getElementById('salario').value),
            fecha_contratacion: document.getElementById('fecha_contratacion').value,
            estado: document.getElementById('estado').value
        };

        // 3. Definimos el método y la URL dinámicamente
        let method = 'POST';
        let url = API_URL;

        if (idEditando) {
            method = 'PUT';
            url = `${API_URL}/${idEditando}`; // Ej: /api/empleados/5
        }

        try {
            // 4. Enviamos la petición POST o PUT a la API
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(empleadoData)
            });

            if (response.ok) {
                // ¡Éxito!
                mostrarMensaje(idEditando ? 'Empleado actualizado exitosamente.' : 'Empleado registrado exitosamente.', 'exito');
                resetearFormulario();

                // 5. ¡ACTUALIZAMOS TODO!
                await cargarEstadisticas();
                await cargarEmpleados();

            } else {
                const errorData = await response.json();
                const mensajeError = errorData.message || (errorData.errors ? errorData.errors.map(e => e.defaultMessage).join(', ') : 'No se pudo guardar.');
                mostrarMensaje(`Error: ${mensajeError}`, 'error');
            }

        } catch (error) {
            console.error('Error al guardar empleado:', error);
            mostrarMensaje('Error de red. Intenta de nuevo.', 'error');
        } finally {
            btnGuardarEmpleado.disabled = false;
        }
    });

    // --- Listener para los botones de la TABLA (Editar y Eliminar) ---
    tablaEmpleadosBody.addEventListener('click', async (e) => {

        // --- Lógica para ELIMINAR ---
        if (e.target.classList.contains('btn-eliminar')) {
            const id = e.target.dataset.id;

            if (!confirm(`¿Estás seguro de que quieres eliminar al empleado ID ${id}?`)) {
                return;
            }

            try {
                const response = await fetch(`${API_URL}/${id}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    mostrarMensaje('Empleado eliminado exitosamente.', 'exito');
                    await cargarEstadisticas();
                    await cargarEmpleados();
                } else {
                    mostrarMensaje('Error al eliminar el empleado.', 'error');
                }
            } catch (error) {
                console.error('Error de red al eliminar:', error);
                mostrarMensaje('Error de red. Intenta de nuevo.', 'error');
            }
        }

        // --- Lógica para EDITAR ---
        if (e.target.classList.contains('btn-editar')) {
            const id = e.target.dataset.id;

            try {
                // 1. Buscamos los datos del empleado por su ID
                const response = await fetch(`${API_URL}/${id}`);
                if (!response.ok) throw new Error('Empleado no encontrado');

                const empleado = await response.json();

                // 2. Llenamos el formulario de arriba con sus datos
                inputIdEditando.value = empleado.id_empleado;
                document.getElementById('nombre').value = empleado.nombre;
                document.getElementById('apellido').value = empleado.apellido;
                document.getElementById('dui').value = empleado.dui;
                document.getElementById('correo').value = empleado.correo;
                document.getElementById('telefono').value = empleado.telefono || '';
                document.getElementById('direccion').value = empleado.direccion || '';
                document.getElementById('puesto').value = empleado.puesto;
                document.getElementById('salario').value = empleado.salario;
                document.getElementById('fecha_contratacion').value = empleado.fecha_contratacion; // El backend debe dar YYYY-MM-DD
                document.getElementById('estado').value = empleado.estado;

                // 3. Cambiamos el texto del botón/título y hacemos scroll
                btnGuardarEmpleado.textContent = 'Actualizar Empleado';
                formTituloEl.textContent = 'Editando Empleado';
                formNuevoEmpleado.scrollIntoView({ behavior: 'smooth', block: 'start' });

            } catch (error) {
                console.error('Error al cargar datos para editar:', error);
                mostrarMensaje('Error al cargar los datos del empleado.', 'error');
            }
        }
    });

    // --- Event Listeners para Filtros ---
    filtroNombreEl.addEventListener('input', cargarEmpleados);
    filtroPuestoEl.addEventListener('change', cargarEmpleados);
    filtroEstadoEl.addEventListener('change', cargarEmpleados);
    filtroSalarioMayorEl.addEventListener('input', cargarEmpleados);

    // --- Funciones Utilitarias ---
    function mostrarMensaje(mensaje, tipo) {
        formMensajeEl.textContent = mensaje;
        if (tipo === 'exito') {
            formMensajeEl.className = 'p-3 text-sm rounded-lg mb-4 bg-green-100 text-green-700';
        } else {
            formMensajeEl.className = 'p-3 text-sm rounded-lg mb-4 bg-red-100 text-red-700';
        }
        formMensajeEl.classList.remove('hidden');
    }

    function resetearFormulario() {
        formNuevoEmpleado.reset();
        inputIdEditando.value = '';
        btnGuardarEmpleado.textContent = 'Guardar Empleado';
        formTituloEl.textContent = 'Registrar Nuevo Empleado';
    }

    // --- Carga inicial de datos ---
    cargarEstadisticas();
    cargarEmpleados();

});