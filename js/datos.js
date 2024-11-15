import { db } from "./firebaseConfig.js";
import { collection, addDoc } from "firebase/firestore";

// Función para agregar usuarios
async function seedUsers() {
    const users = [
        { email: "admin@example.com", role: "admin", name: "Juan Pérez" },
        { email: "profesor1@example.com", role: "profesor", name: "Ana García" },
        { email: "profesor2@example.com", role: "profesor", name: "Luis Martínez" },
        { email: "alumno1@example.com", role: "alumno", name: "Carlos López" },
        { email: "alumno2@example.com", role: "alumno", name: "María Fernández" }
    ];

    for (const user of users) {
        await addDoc(collection(db, "users"), user);
        console.log(`Usuario ${user.name} agregado.`);
    }
}

// Función para agregar grupos con precios fijos
async function seedGroups() {
    const groups = [
        { name: "Plan Básico", language: "Inglés", schedule: "Lunes y Miércoles 6:00 PM - 8:00 PM", price: 120 },
        { name: "Plan Intensivo", language: "Inglés", schedule: "Martes y Jueves 7:00 PM - 9:00 PM", price: 150 },
        { name: "Plan Intensivo Plus", language: "Inglés", schedule: "Viernes 5:00 PM - 9:00 PM", price: 180 },
        { name: "Plan Básico", language: "Francés", schedule: "Lunes y Miércoles 6:00 PM - 8:00 PM", price: 110 },
        { name: "Plan Intensivo", language: "Francés", schedule: "Martes y Jueves 7:00 PM - 9:00 PM", price: 140 },
        { name: "Plan Básico", language: "Italiano", schedule: "Lunes y Miércoles 6:00 PM - 8:00 PM", price: 100 },
        { name: "Plan Intensivo", language: "Italiano", schedule: "Martes y Jueves 7:00 PM - 9:00 PM", price: 130 },
        { name: "Plan Básico", language: "Portugués", schedule: "Lunes y Miércoles 6:00 PM - 8:00 PM", price: 115 },
        { name: "Plan Intensivo", language: "Portugués", schedule: "Martes y Jueves 7:00 PM - 9:00 PM", price: 170 }
    ];

    for (const group of groups) {
        await addDoc(collection(db, "groups"), group);
        console.log(`Grupo ${group.name} (${group.language}) agregado con precio $${group.price}.`);
    }
}

// Ejecutar funciones de carga
async function main() {
    try {
        console.log("Iniciando carga de datos...");
        await seedUsers();
        await seedGroups();
        console.log("Datos cargados exitosamente.");
    } catch (error) {
        console.error("Error al cargar datos:", error);
    }
}

main();
