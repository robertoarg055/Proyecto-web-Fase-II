import { db } from "./firebaseConfig.js"; // Asegúrate de tener la configuración de Firebase
import { collection, addDoc, getDocs, query, where, doc, updateDoc } from "firebase/firestore";

// Función para registrar idiomas y niveles
async function registerLanguage(name, levels) {
    const language = { name, levels };
    await addDoc(collection(db, "languages"), language);
    console.log(`Idioma ${name} registrado con niveles: ${levels.join(", ")}`);
}

// Función para registrar grupos
async function registerGroup(name, language, schedule, price, professorId) {
    const group = { name, language, schedule, price, professorId };
    await addDoc(collection(db, "groups"), group);
    console.log(`Grupo ${name} registrado con precio $${price} y profesor ID: ${professorId}.`);
}

// Función para inscribir alumnos en un grupo
async function enrollStudentInGroup(studentId, groupId) {
    const groupRef = doc(db, "groups", groupId);
    await addDoc(collection(groupRef, "enrolledStudents"), { studentId });
    console.log(`Alumno ID: ${studentId} inscrito en el grupo ID: ${groupId}.`);
}

// Función para que un profesor vea la lista de alumnos inscritos en sus grupos
async function getStudentsInProfessorGroups(professorId) {
    const groupsQuery = query(collection(db, "groups"), where("professorId", "==", professorId));
    const groupDocs = await getDocs(groupsQuery);

    for (const groupDoc of groupDocs.docs) {
        const groupId = groupDoc.id;
        const studentsRef = collection(groupDoc.ref, "enrolledStudents");
        const studentDocs = await getDocs(studentsRef);

        console.log(`Grupo: ${groupDoc.data().name}`);
        studentDocs.forEach(studentDoc => {
            console.log(`Alumno ID: ${studentDoc.data().studentId}`);
        });
    }
}

// Ejemplo de uso
async function main() {
    try {
        console.log("Registrando idiomas...");
        await registerLanguage("Inglés", ["Básico", "Intermedio", "Avanzado"]);
        await registerLanguage("Francés", ["Básico", "Intermedio", "Avanzado"]);

        console.log("Registrando grupos...");
        await registerGroup("Plan Básico", "Inglés", "Lunes y Miércoles 6:00 PM - 8:00 PM", 120, "professorId1"); // Reemplaza con un ID real de profesor

        console.log("Inscribiendo alumnos...");
        await enrollStudentInGroup("studentId1", "groupId1"); // Reemplaza con IDs reales de alumno y grupo

        console.log("Listando alumnos en grupos del profesor...");
        await getStudentsInProfessorGroups("professorId1"); // Reemplaza con un ID real de profesor
    } catch (error) {
        console.error("Error:", error);
    }
}

main();