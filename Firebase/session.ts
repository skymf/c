// import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
// import firebaseApp from "./config";

// const db = getFirestore(firebaseApp);

// export const getSessionID = async () => {
//   const sessionCollection = collection(db, "sessions");
//   const snapshot = await getDocs(sessionCollection);
//   return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
// };

// export const addSession = async (session: any) => {
//   await addDoc(collection(db, "sessions"), { ...session });
// };
// no need for this file anymore
