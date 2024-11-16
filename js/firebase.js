

import { auth, db } from './firebase.js';
import { signInWithEmailAndPassword } from './auth.js';
import { doc, getDoc } from './firebase/firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyCXE5rtFVsDQAIBQm9gMSblMt6X5wAHjGo",
    authDomain: "academia-de-idiomas-8ddd7.firebaseapp.com",
    projectId: "academia-de-idiomas-8ddd7",
    storageBucket: "academia-de-idiomas-8ddd7.firebasestorage.app",
    messagingSenderId: "147164586893",
    appId: "1:147164586893:web:b46e71a7629b795775d3c4",
    measurementId: "G-ZXR2Y4CLMN"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);