import { db } from './firebase.js';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { checkAuth } from './auth.js';

document.addEventListener('DOMContentLoaded', async () => {
    if (!checkAuth() || localStorage.getItem('userRole') !== 'admin') {
        return;
    }

    const courseForm = document.getElementById('formulario');
    const coursesContainer = document.querySelector('.Cursos.activos');

    async function loadCourses() {
        const coursesSnapshot = await getDocs(collection(db, 'courses'));
        const coursesHTML = coursesSnapshot.docs.map(doc => `
      <div class="course-item" data-id="${doc.id}">
        <h3>${doc.data().name}</h3>
        <p>${doc.data().language} - ${doc.data().level}</p>
        <p>${doc.data().schedule}</p>
        <div class="course-actions">
          <button onclick="handleEdit('${doc.id}')" class="btn-edit">Edit</button>
          <button onclick="handleDelete('${doc.id}')" class="btn-delete">Delete</button>
        </div>
      </div>
    `).join('');

        coursesContainer.innerHTML = coursesHTML;
    }

    courseForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(courseForm);
        const courseData = {
            name: formData.get('nombreCurso'),
            language: formData.get('idioma'),
            level: formData.get('nivel'),
            schedule: formData.get('duracion'),
            students: []
        };

        try {
            await addDoc(collection(db, 'courses'), courseData);
            courseForm.reset();
            await loadCourses();
        } catch (error) {
            console.error('Error creating course:', error);
        }
    });

    window.handleEdit = async (courseId) => {
        const courseDoc = await getDoc(doc(db, 'courses', courseId));
        const courseData = courseDoc.data();

        document.getElementById('nombreCurso').value = courseData.name;
        document.getElementById('idioma').value = courseData.language;
        document.getElementById('nivel').value = courseData.level;
        document.getElementById('duracion').value = courseData.schedule;

        courseForm.dataset.editing = courseId;
    };

    window.handleDelete = async (courseId) => {
        if (confirm('Are you sure you want to delete this course?')) {
            try {
                await deleteDoc(doc(db, 'courses', courseId));
                await loadCourses();
            } catch (error) {
                console.error('Error deleting course:', error);
            }
        }
    };

    await loadCourses();
});