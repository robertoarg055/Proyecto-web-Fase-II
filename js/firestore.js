// firestore.js
import { db } from './firebase.js'; // Asegúrate de que esta ruta sea correcta
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

/**
 * Agrega un nuevo documento a una colección.
 * @param {string} collectionName - Nombre de la colección.
 * @param {Object} data - Datos del documento a agregar.
 * @returns {Promise<string>} - ID del documento creado.
 */
export async function addDocument(collectionName, data) {
    try {
        const docRef = await addDoc(collection(db, collectionName), data);
        console.log('Document written with ID: ', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('Error adding document: ', error);
        throw error;
    }
}

/**
 * Obtiene todos los documentos de una colección.
 * @param {string} collectionName - Nombre de la colección.
 * @returns {Promise<Array>} - Array de documentos.
 */
export async function getDocuments(collectionName) {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

/**
 * Actualiza un documento en una colección.
 * @param {string} collectionName - Nombre de la colección.
 * @param {string} docId - ID del documento a actualizar.
 * @param {Object} data - Nuevos datos del documento.
 */
export async function updateDocument(collectionName, docId, data) {
    const docRef = doc(db, collectionName, docId);
    try {
        await updateDoc(docRef, data);
        console.log('Document updated with ID: ', docId);
    } catch (error) {
        console.error('Error updating document: ', error);
        throw error;
    }
}

/**
 * Elimina un documento de una colección.
 * @param {string} collectionName - Nombre de la colección.
 * @param {string} docId - ID del documento a eliminar.
 */
export async function deleteDocument(collectionName, docId) {
    const docRef = doc(db, collectionName, docId);
    try {
        await deleteDoc(docRef);
        console.log('Document deleted with ID: ', docId);
    } catch (error) {
        console.error('Error deleting document: ', error);
        throw error;
    }
}
