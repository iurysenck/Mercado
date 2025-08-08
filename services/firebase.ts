
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
import { GroceryItem } from "../types";

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let alertHandler: ((message: string) => void) | null = null;

export const registerAlertHandler = (handler: (message: string) => void) => {
    alertHandler = handler;
};


// The check for validity is now simply whether the key properties are present.
const isConfigValid = firebaseConfig.apiKey && firebaseConfig.projectId;

export function getDb(): Firestore | null {
    if (db) {
        return db;
    }
    if (!isConfigValid) {
        const message = "A funcionalidade online não está disponível. Por favor, configure suas credenciais do Firebase em firebaseConfig.ts para publicar listas.";
        if (alertHandler) {
            alertHandler(message);
        } else {
            // Fallback for cases where handler is not yet registered
            alert(message);
        }
        return null;
    }
    
    // Initialize lazily only when first needed
    if (!app) {
        app = initializeApp(firebaseConfig);
        db = getFirestore(app);
    }
    
    return db;
}

export async function getListItems(listId: string): Promise<GroceryItem[]> {
    const db = getDb();
    if (!db) throw new Error("Firebase não configurado.");
    const itemsCollectionRef = collection(db, 'lists', listId, 'items');
    const snapshot = await getDocs(itemsCollectionRef);
    return snapshot.docs.map(docSnap => ({ ...docSnap.data(), id: docSnap.id } as GroceryItem));
}

export async function deleteListAndItems(listId: string) {
    const db = getDb();
    if (!db) throw new Error("Firebase não configurado.");

    const listRef = doc(db, 'lists', listId);
    const itemsCollectionRef = collection(db, 'lists', listId, 'items');
    
    const batch = writeBatch(db);
    
    // Get all items to delete them
    const itemsSnapshot = await getDocs(itemsCollectionRef);
    itemsSnapshot.forEach(itemDoc => {
        batch.delete(itemDoc.ref);
    });

    // Delete the main list doc
    batch.delete(listRef);

    await batch.commit();
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
