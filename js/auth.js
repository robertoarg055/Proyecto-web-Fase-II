// auth.js
import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js';
import { doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js';
import { auth, db } from './firebase.js';

export async function handleLogin(email, password, role) {
    // Validación básica
    if (!email || !password) {
        console.error('Email o contraseña vacíos');
        return { error: 'Por favor ingrese email y contraseña' };
    }

    // Log de intento de login
    console.log('Intentando login con:', { email, role });

    try {
        // Intento de autenticación
        console.log('Iniciando autenticación...');
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('Usuario autenticado:', userCredential.user.uid);

        // Obtener documento del usuario
        console.log('Buscando documento de usuario...');
        const userDoc = await getDoc(doc(db, 'usuarios', userCredential.user.uid));

        if (!userDoc.exists()) {
            console.error('Documento de usuario no encontrado');
            return { error: 'Usuario no encontrado en la base de datos' };
        }

        const userData = userDoc.data();
        console.log('Datos de usuario:', userData);

        if (userData.role !== role) {
            console.error('Rol incorrecto:', { esperado: role, actual: userData.role });
            return { error: 'Tipo de usuario incorrecto' };
        }

        // Guardar datos en localStorage
        localStorage.setItem('userRole', userData.role);
        localStorage.setItem('userId', userCredential.user.uid);

        // Redirección basada en rol
        const pages = {
            'student': '../html/estudiante.html',
            'teacher': '../html/profesor.html',
            'admin': '../html/admin_cursos.html'
        };

        if (pages[role]) {
            window.location.href = pages[role];
        }

        return { success: true };

    } catch (error) {
        // Log detallado del error
        console.error('Error completo:', error);
        console.error('Código de error:', error.code);
        console.error('Mensaje de error:', error.message);

        const errorMessages = {
            'auth/invalid-email': 'El formato del email no es válido',
            'auth/user-disabled': 'Esta cuenta ha sido deshabilitada',
            'auth/user-not-found': 'No existe una cuenta con este email',
            'auth/wrong-password': 'Contraseña incorrecta',
            'auth/invalid-login-credentials': 'Credenciales inválidas',
            'auth/missing-password': 'Por favor ingrese la contraseña',
            'auth/too-many-requests': 'Demasiados intentos fallidos. Intente más tarde',
        };

        return {
            error: errorMessages[error.code] || 'Error de autenticación: ' + error.message
        };
    }
}
