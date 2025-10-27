document.addEventListener('DOMContentLoaded', () => {

    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');
    const loginButton = document.getElementById('login-button');

    loginForm.addEventListener('submit', async (e) => {
        // Evitamos que el formulario se envíe de la forma tradicional
        e.preventDefault();

        // Ocultamos errores previos
        errorMessage.classList.add('hidden');
        loginButton.textContent = 'Verificando...';
        loginButton.disabled = true;

        // 1. Obtenemos los datos del formulario
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // 2. Creamos el cuerpo de la petición
        // Spring Security (con formLogin) espera los datos
        // en formato 'application/x-www-form-urlencoded'
        const formData = new URLSearchParams();
        formData.append('username', username);
        formData.append('password', password);

        try {
            // 3. Enviamos la petición al endpoint de login de Spring Security
            // Por defecto, Spring Security crea el endpoint '/login' y espera un POST
            const response = await fetch('/login', {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            // 4. Analizamos la respuesta
            if (response.ok) {
                // Si el login es exitoso (Spring Security no redirige automáticamente en AJAX)
                // Redirigimos al panel principal
                console.log('Login exitoso!');
                window.location.href = '/index.html'; // O simplemente '/'
            } else {
                // Si falla (ej. 401 Unauthorized)
                console.log('Login fallido.');
                errorMessage.classList.remove('hidden');
            }

        } catch (error) {
            console.error('Error de red:', error);
            errorMessage.textContent = 'Error de red. Intenta de nuevo.';
            errorMessage.classList.remove('hidden');
        } finally {
            // Reactivamos el botón
            loginButton.textContent = 'Entrar';
            loginButton.disabled = false;
        }
    });
});