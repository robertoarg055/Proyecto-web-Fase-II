import { collection, query, where, getDocs, doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js';
import { db } from './firebase.js';
import { checkAuth } from './auth.js';

document.addEventListener('DOMContentLoaded', async () => {
    if (!checkAuth() || localStorage.getItem('userRole') !== 'teacher') {
        return;
    }

    const coursesList = document.querySelector('.Cursos.activos ul');
    const teacherId = localStorage.getItem('userId');

    async function loadTeacherCourses() {
        const coursesQuery = query(
            collection(db, 'courses'),
            where('teacherId', '==', teacherId)
        );

        const coursesSnapshot = await getDocs(coursesQuery);
        const coursesHTML = coursesSnapshot.docs.map(doc => `
      <li>
        <div class="course-item" data-id="${doc.id}">
          <h3>${doc.data().name}</h3>
          <p>${doc.data().schedule}</p>
          <button onclick="viewStudents('${doc.id}')" class="btn-view-students">
            View Students
          </button>
        </div>
      </li>
    `).join('');

        coursesList.innerHTML = coursesHTML;
    }

    window.viewStudents = async (courseId) => {
        const courseDoc = await getDoc(doc(db, 'courses', courseId));
        const courseData = courseDoc.data();

        if (courseData.students.length > 0) {
            const studentsQuery = query(
                collection(db, 'users'),
                where('id', 'in', courseData.students)
            );

            const studentsSnapshot = await getDocs(studentsQuery);
            const studentsList = studentsSnapshot.docs.map(doc => `
        <div class="student-item">
          <h4>${doc.data().name}</h4>
          <p>${doc.data().email}</p>
        </div>
      `).join('');

            document.getElementById('studentsList').innerHTML = studentsList;
        } else {
            document.getElementById('studentsList').innerHTML = '<p>No students enrolled</p>';
        }
    };

    await loadTeacherCourses();
});