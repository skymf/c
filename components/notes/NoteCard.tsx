import React, { useEffect, useState } from "react";
import { getDownloadURL, ref, getStorage } from "firebase/storage";
import { Card, Dialog, DialogPanel, LineChart } from "@tremor/react";
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

interface Note {
  id: string;
  title: string;
  content: string;
  sessionId: string;
}

interface NoteCardProps {
  note: Note;
  onDelete: (noteId: string) => void;
  onEdit: (editedNote: Note) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onDelete, onEdit }) => {
  const [graphUrl, setGraphUrl] = useState<any[]>([]);
  const [sessionID, setSessionID] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    fetchSessionIds();
    fetchTime();
    // fetchGraphUrl(note.sessionId);
  }, []);

  useEffect(() => {
    if (note.sessionId) {
      fetchGraphUrl(note.sessionId);
    }
  }, [note.sessionId]);

  const fetchSessionIds = async () => {
    try {
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
        setSessionID(latestSessionID);
      }
    } catch (error) {
      console.error("Error fetching session IDs:", error);
    }
  };

  const fetchTime = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "sessions"));
      const timestamps = querySnapshot.docs.map((doc) => {
        return {
          time: doc.data().uploadedAt.toDate(),
          uploadedAt: doc.data().uploadedAt.toDate(),
        };
      });

      timestamps.sort((a, b) => b.uploadedAt - a.uploadedAt);

      const latestTime = timestamps.length > 0 ? timestamps[0].time : null;

      console.log("Latest uploaded time:", latestTime);

      if (latestTime) {
        setTime(latestTime.toLocaleString());
      }
    } catch (error) {
      console.error("Error fetching uploaded times:", error);
    }
  };

  const fetchGraphUrl = async (sessionId: string) => {
    try {
      if (!sessionId) return;
      const storage = getStorage();
      const storageRef = ref(storage, `Organic.csv_${sessionID}_graph.json`);
      const url = await getDownloadURL(storageRef);
      setGraphUrl([url]);
    } catch (error) {
      console.error("Error fetching graph URL:", error);
      setGraphUrl([]);
    }
  };

  return (
    <div className="mb-20 mt-20 flex flex-col gap-3">
      <Card>
        <div className="flex flex-row justify-between">
          <h3 className="text-xl font-semibold">{note.title}</h3>
          <p className="text-sm text-tremor-content">
            Last updated: {time || "No time available"}
            {/* Added: <LocalTime date={note.timestamp} /> */}
          </p>
        </div>
        <p className="text-md mt-5 font-medium">{note.content}</p>
        <p className="mt-3 text-xs text-tremor-content">
          Session ID:{" "}
          {`this session id is ${sessionID}` || "No session ID available"}
        </p>

        <div className="flex flex-row gap-3">
          <button
            className="group mt-3 flex h-8 w-full max-w-xs items-center rounded-full border border-[#F3F1EB] px-3 text-sm text-[#F3F1EB] outline-none transition hover:scale-110 hover:bg-[#F3F1EB] hover:text-[#2A2A2B] focus:scale-110 active:scale-105 sm:h-10 sm:max-w-max sm:text-base"
            onClick={() => setIsOpen(true)}
          >
            show the current graph
          </button>
          <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            static={true}
            className="z-[100]"
          >
            <DialogPanel className="max-w-sm">
              <div className="flex flex-col px-6">
                <h3 className="text-lg font-semibold text-white">
                  {" "}
                  hey, check the current graph{" "}
                </h3>

                <LineChart
                  className="mt-6"
                  data={graphUrl}
                  index="Video position (%)"
                  categories={["Absolute audience retention (%)"]}
                  yAxisWidth={100}
                  showAnimation={true}
                  animationDuration={1750}
                />
              </div>
              <button
                className="group mt-3 flex h-8 w-full max-w-xs items-center rounded-full border border-[#F3F1EB] px-3 text-sm text-[#F3F1EB] outline-none transition hover:scale-110 hover:bg-[#F3F1EB] hover:text-[#2A2A2B] focus:scale-110 active:scale-105 sm:h-10 sm:max-w-max sm:text-base"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </DialogPanel>
          </Dialog>

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
