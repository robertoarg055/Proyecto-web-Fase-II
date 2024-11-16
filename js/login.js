import { handleLogin } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginForms = {
        estudiantes: document.getElementById('login-estudiantes'),
        maestros: document.getElementById('login-maestros'),
        admin: document.getElementById('login-admin')
    };

    window.showLogin = (type) => {
        Object.values(loginForms).forEach(form => form.classList.add('hidden'));
        loginForms[type].classList.remove('hidden');

        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[onclick="showLogin('${type}')"]`).classList.add('active');
    };

    Object.entries(loginForms).forEach(([type, form]) => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = form.querySelector('[name="username"]').value;
            const password = form.querySelector('[name="password"]').value;
            const role = type === 'estudiantes' ? 'student' : type === 'maestros' ? 'teacher' : 'admin';

            const error = await handleLogin(email, password, role);
            if (error) {
                alert(error);
            }
        });
    });
});