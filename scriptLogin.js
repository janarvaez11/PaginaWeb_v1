// Función para registrar un usuario
async function registerUser(email, password) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password
    });

    if (error) {
        alert('Error en el registro: ' + error.message);
    } else {
        alert('Registro exitoso. Revisa tu correo para verificar tu cuenta.');
    }
}

// Función para iniciar sesión
async function loginUser(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        alert('Error en el inicio de sesión: ' + error.message);
    } else {
        showDashboard();
    }
}

// Mostrar el dashboard después de autenticación
function showDashboard() {
    document.getElementById('auth-container').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
}

// Cerrar sesión
async function logoutUser() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        alert('Error al cerrar sesión: ' + error.message);
    } else {
        document.getElementById('auth-container').style.display = 'block';
        document.getElementById('dashboard').style.display = 'none';
    }
}

// Manejar eventos del formulario
document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    await registerUser(email, password);
});

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    await loginUser(email, password);
});

document.getElementById('logout-btn').addEventListener('click', async () => {
    await logoutUser();
});
