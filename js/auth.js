import { auth, db } from './firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export async function handleLogin(email, password, role) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
        const userData = userDoc.data();

        if (userData?.role !== role) {
            throw new Error('Invalid role for this user');
        }

        localStorage.setItem('userRole', userData.role);
        localStorage.setItem('userId', userCredential.user.uid);

        switch (role) {
            case 'admin':
                window.location.href = '/html/admin_dashboard.html';
                break;
            case 'teacher':
                window.location.href = '/html/teacher_dashboard.html';
                break;
            case 'student':
                window.location.href = '/html/student_dashboard.html';
                break;
        }
    } catch (error) {
        return 'Invalid credentials or role';
    }
}

export function checkAuth() {
    const userRole = localStorage.getItem('userRole');
    const userId = localStorage.getItem('userId');

    if (!userRole || !userId) {
        window.location.href = '../html/login.html';
        return false;
    }
    return true;
}

export function logout() {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    window.location.href = '../html/login.html';
}