import { db } from 'firebase.js';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { checkAuth } from 'auth.js';

document.addEventListener('DOMContentLoaded', async () => {
    if (!checkAuth() || localStorage.getItem('userRole') !== 'student') {
        return;
    }

    const coursesList = document.querySelector('.Cursos.activos ul');
    const studentId = localStorage.getItem('userId');

    async function loadEnrolledCourses() {
        const coursesQuery = query(
            collection(db, 'courses'),
            where('students', 'array-contains', studentId)
        );

        const coursesSnapshot = await getDocs(coursesQuery);
        const coursesHTML = coursesSnapshot.docs.map(doc => `
      <li>
        <div class="course-item">
          <h3>${doc.data().name}</h3>
          <p>${doc.data().language} - ${doc.data().level}</p>
          <p>${doc.data().schedule}</p>
        </div>
      </li>
    `).join('');

        coursesList.innerHTML = coursesHTML;
    }

    await loadEnrolledCourses();
});