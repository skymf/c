"use client";
import React, { useEffect, useState } from "react";
import { getDownloadURL, ref, getStorage } from "firebase/storage";
import { Card } from "@tremor/react";
import axios from "axios";
// import { sessionID } from "../Graphs";

interface Note {
  id: string;
  title: string;
  content: string;
  sessionId: string;
}

interface NoteCardProps {
  note: Note;
  sessionId: string;
  onDelete: (noteId: string) => void;
  onEdit: (editedNote: Note) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({
  note,
  sessionId,
  onDelete,
  onEdit,
}) => {
  const [graphUrl, setGraphUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchGraphUrl(sessionId);
  }, [sessionId]);

  const fetchGraphUrl = async (sessionId: string) => {
    try {
      const storage = getStorage();
      const storageRef = ref(storage, `graphs/${sessionId}.json`);
      const url = await getDownloadURL(storageRef);
      setGraphUrl(url);
    } catch (error) {
      console.error("Error fetching graph URL:", error);
    }
  };

  const saveNoteWithSessionID = async (note: Note) => {
    try {
      await axios.post("http://127.0.0.1:5000/api/save-note", {
        ...note,
        sessionId: note.sessionId,
      });
    } catch (error) {
      console.error("Error saving note with session ID:", error);
    }
  };

  return (
    <div className="mb-20 mt-10 flex flex-col">
      <Card>
        <h3 className="text-xl font-semibold">{note.title}</h3>
        <p className="text-md font-medium">{note.content}</p>
        <p>
          Link to graph:{" "}
          <a href={"/graphs"} className="hover:underline">
            View Graph
          </a>
        </p>
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
// import React, { useEffect, useState } from "react";
// import { getDownloadURL, ref, getStorage } from "firebase/storage";
// import { Card } from "@tremor/react";
// import axios from "axios";
// import { useSessionID } from "../sessionID"; // Import the useSessionID hook

// interface Note {
//   id: string;
//   title: string;
//   content: string;
// }

// interface NoteCardProps {
//   note: Note;
//   onDelete: (noteId: string) => void;
//   onEdit: (editedNote: Note) => void;
// }

// const NoteCard: React.FC<NoteCardProps> = ({ note, onDelete, onEdit }) => {
//   const { sessionID } = useSessionID(); // Retrieve sessionID from the useSessionID hook
//   const [graphUrl, setGraphUrl] = useState<string | null>(null);

//   useEffect(() => {
//     // Fetch the graph URL when the component mounts
//     fetchGraphUrl(sessionID); // Use sessionID from the useSessionID hook
//   }, [sessionID]);

//   const fetchGraphUrl = async (sessionId: string) => {
//     try {
//       const storage = getStorage(); // Initialize Firebase Storage
//       const storageRef = ref(storage, `graphs/${sessionId}.json`); // Adjust the path based on your Firebase Storage structure
//       const url = await getDownloadURL(storageRef);
//       setGraphUrl(url);
//     } catch (error) {
//       console.error("Error fetching graph URL:", error);
//     }
//   };

//   const saveNoteWithSessionID = async (note: Note) => {
//     try {
//       // Save the note along with the session ID
//       await axios.post("http://127.0.0.1:5000/api/save-note", {
//         ...note,
//         sessionId: sessionID,
//       });
//     } catch (error) {
//       console.error("Error saving note with session ID:", error);
//     }
//   };

//   return (
//     <div className="mb-10 mt-12 flex flex-col">
//       <Card>
//         <h3 className="text-xl font-semibold">{note.title}</h3>
//         <p className="text-md font-medium">{note.content}</p>
//         <p>
//           Link to graph:{" "}
//           <a href={"/graphs"} className="hover:underline">
//             View Graph
//           </a>
//         </p>
//         <div className="flex flex-row gap-3">
//           <button
//             type="submit"
//             className="group mt-3 flex h-8 w-full max-w-xs items-center rounded-full border border-[#F3F1EB] px-3 text-sm text-[#F3F1EB] outline-none transition hover:scale-110 hover:bg-[#F3F1EB] hover:text-[#2A2A2B] focus:scale-110 active:scale-105 sm:h-10 sm:max-w-max sm:text-base"
//             onClick={() => onEdit(note)}
//           >
//             edit
//           </button>

//           <button
//             type="submit"
//             className="group mt-3 flex h-8 w-full max-w-xs items-center rounded-full border border-[#F3F1EB] px-3 text-sm text-[#F3F1EB] outline-none transition hover:scale-110 hover:bg-[#F3F1EB] hover:text-[#2A2A2B] focus:scale-110 active:scale-105 sm:h-10 sm:max-w-max sm:text-base"
//             onClick={() => onDelete(note.id)}
//           >
//             delete
//           </button>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default NoteCard;
