// Importar las funciones necesarias desde Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase (usa tus valores reales)
const firebaseConfig = {
  apiKey: "AIzaSyCXE5rtFVsDQAIBQm9gMSblMt6X5wAHjGo",
  authDomain: "academia-de-idiomas-8ddd7.firebaseapp.com",
  projectId: "academia-de-idiomas-8ddd7",
  storageBucket: "academia-de-idiomas-8ddd7.firebasestorage.app",
  messagingSenderId: "147164586893",
  appId: "1:147164586893:web:b46e71a7629b795775d3c4",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Exportar Firestore para usarlo en otros archivos
export { db };
