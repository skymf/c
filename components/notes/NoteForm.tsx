import { useState, useEffect } from "react";
import { TextInput, Textarea } from "@tremor/react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

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

interface NoteFormProps {
  onAddNote: (newNote: {
    title: string;
    content: string;
    sessionId: string;
  }) => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ onAddNote }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    fetchSessionIds(30000);
  }, []);

  const fetchSessionIds = async (delayMs: number) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
      const querySnapshot = await getDocs(collection(db, "sessions"));
      const sessionIds = querySnapshot.docs.map((doc) => {
        return {
          sessionID: doc.data().sessionID,
          uploadedAt: doc.data().uploadedAt.toDate(),
        };
      });

      sessionIds.sort((a, b) => b.uploadedAt - a.uploadedAt);

      const latestSessionID =
        sessionIds.length > 0 ? sessionIds[0].sessionID : null;

      console.log("Latest session ID:", latestSessionID);

      if (latestSessionID) {
        setSessionId(latestSessionID);
      }
    } catch (error) {
      console.error("Error fetching session IDs:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onAddNote({
      title,
      content,
      sessionId: sessionId || "",
    });
    setTitle("");
    setContent("");
  };

  return (
    <div className="mt-12 max-w-md">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          <TextInput
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
          />

          <Textarea
            placeholder="Enter note content"
            id="notebox"
            rows={2}
            className=""
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />
        </div>
        <button
          type="submit"
          className="group mt-3 flex h-10 w-full max-w-xs items-center rounded-full border border-[#F3F1EB] px-3 text-sm text-[#F3F1EB] outline-none transition hover:scale-110 hover:bg-[#F3F1EB] hover:text-[#2A2A2B] focus:scale-110 active:scale-105 sm:h-12 sm:max-w-max sm:text-base"
        >
          submit
        </button>
      </form>
    </div>
  );
};

export default NoteForm;
