
import { initializeApp, FirebaseApp } from "@firebase/app";
import { 
    getFirestore, 
    collection, 
    doc, 
    onSnapshot, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    getDocs, 
    writeBatch,
    Firestore
} from "@firebase/firestore";
import { firebaseConfig } from "../firebaseConfig";

let app: FirebaseApp | null = null;
let db: Firestore | null = null;

// The check for validity is now simply whether the key properties are present.
const isConfigValid = firebaseConfig.apiKey && firebaseConfig.projectId;

export function getDb(): Firestore | null {
    if (db) {
        return db;
    }
    if (!isConfigValid) {
        alert("A funcionalidade online não está disponível. Por favor, configure suas credenciais do Firebase em firebaseConfig.ts para publicar listas.");
        return null;
    }
    
    // Initialize lazily only when first needed
    if (!app) {
        app = initializeApp(firebaseConfig);
        db = getFirestore(app);
    }
    
    return db;
}

export { 
    collection,
    doc,
    onSnapshot,
    addDoc,
    updateDoc,
    deleteDoc,
    getDocs,
    writeBatch,
};
