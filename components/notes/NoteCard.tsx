import React, { useEffect, useState } from "react";
import { getDownloadURL, ref, getStorage } from "firebase/storage";
import { Card, LineChart } from "@tremor/react";
import { initializeApp } from "firebase/app";
import { Timestamp } from "firebase/firestore";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import axios from "axios";
import Link from "next/link";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

interface Note {
  id: string;
  title: string;
  content: string;
  sessionId: string;
  timestamp: number;
}

interface NoteCardProps {
  note: Note;
  onDelete: (noteId: string) => void;
  onEdit: (editedNote: Note) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onDelete, onEdit }) => {
  const [graphUrl, setGraphUrl] = useState<string | null>(null);
  const [sessionID, setSessionID] = useState<string | null>(null);

  useEffect(() => {
    fetchSessionIds();
  }, []);

  useEffect(() => {
    if (note.sessionId) {
      fetchGraphUrl(note.sessionId);
    }
  }, [note.sessionId]);

  const fetchSessionIds = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "sessions"));
      const sessionIds = querySnapshot.docs.map((doc) => doc.data().sessionID);
      console.log("Session IDs:", sessionIds);
      if (sessionIds.length > 0) {
        setSessionID(sessionIds[0]);
      }
    } catch (error) {
      console.error("Error fetching session IDs:", error);
    }
  };

  const fetchGraphUrl = async (sessionId: string) => {
    try {
      if (!sessionId) return;
      const storage = getStorage();
      const storageRef = ref(storage, `graphs/Organic.csv_${sessionID}.json`);
      const url = await getDownloadURL(storageRef);
      setGraphUrl(url);
    } catch (error) {
      console.error("Error fetching graph URL:", error);
    }
  };

  return (
    <div className="mb-20 mt-10 flex flex-col">
      <Card>
        <h3 className="text-xl font-semibold">{note.title}</h3>
        <p className="text-md font-medium">{note.content}</p>
        <p>
          Link to graph:{" "}
          <Link href="" className="hover:underline">
            View Graph
          </Link>
        </p>
        <p>
          Added:{" "}
          {note.timestamp
            ? new Date(note.timestamp).toLocaleString()
            : Date.now()}
        </p>
        <p>Session ID: {sessionID || "No session ID available"}</p>
        <div className="flex flex-row gap-3">
          <button
            type="submit"
            className="group mt-3 flex h-8 w-full max-w-xs items-center rounded-full border border-[#F3F1EB] px-3 text-sm text-[#F3F1EB] outline-none transition hover:scale-110 hover:bg-[#F3F1EB] hover:text-[#2A2A2B] focus:scale-110 active:scale-105 sm:h-10 sm:max-w-max sm:text-base"
            onClick={() => onEdit(note)}
          >
            edit
          </button>

          <button
            type="submit"
            className="group mt-3 flex h-8 w-full max-w-xs items-center rounded-full border border-[#F3F1EB] px-3 text-sm text-[#F3F1EB] outline-none transition hover:scale-110 hover:bg-[#F3F1EB] hover:text-[#2A2A2B] focus:scale-110 active:scale-105 sm:h-10 sm:max-w-max sm:text-base"
            onClick={() => onDelete(note.id)}
          >
            delete
          </button>
        </div>
      </Card>
    </div>
  );
};

export default NoteCard;
