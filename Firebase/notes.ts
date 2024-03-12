import {
  getFirestore,
  doc,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import firebaseApp from "./config";

const db = getFirestore(firebaseApp);

export const getNotes = async () => {
  const notesCollection = collection(db, "notes");
  const snapshot = await getDocs(notesCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const addNote = async (note: any, sessionID: string) => {
  await addDoc(collection(db, "notes"), { ...note, sessionID });
};

export const updateNote = async (note: any) => {
  const { id, ...noteData } = note;
  await updateDoc(doc(db, "notes", id), noteData);
};

export const deleteNote = async (noteId: string) => {
  await deleteDoc(doc(db, "notes", noteId));
};
