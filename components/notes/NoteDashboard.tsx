"use client";
import { useEffect, useState } from "react";
import { getNotes, addNote, updateNote, deleteNote } from "@/Firebase/notes";
import NoteForm from "./NoteForm";
import NoteCard from "./NoteCard";

interface Note {
  id: string;
  title: string;
  content: string;
  sessionId: string;
}

const NoteDashboard: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [sessionID, setSessionID] = useState<string>("");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const notesData = await getNotes();
      const formattedNotes: Note[] = notesData.map((note: any) => ({
        id: note.id,
        title: note.title,
        content: note.content,
        sessionId: note.sessionId,
      }));
      setNotes(formattedNotes);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleAddNote = async (newNote: {
    title: string;
    content: string;
    sessionId: string;
  }) => {
    try {
      await addNote(newNote);
      fetchNotes();
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      await deleteNote(noteId);
      setNotes(notes.filter((note) => note.id !== noteId));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleEditNote = async (editedNote: Note) => {
    try {
      await updateNote(editedNote);
      setNotes(
        notes.map((note) => (note.id === editedNote.id ? editedNote : note)),
      );
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };
  //
  return (
    <div className="mt-12 flex flex-col">
      <h1 className="text-2xl font-bold">Note Dashboard</h1>
      <NoteForm onAddNote={handleAddNote} sessionId={sessionID} />
      {/* noteform need sessionId prop */}
      <div className="">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onDelete={handleDeleteNote}
            onEdit={handleEditNote}
            sessionId={sessionID}
          />
        ))}
      </div>
    </div>
  );
};

export default NoteDashboard;
// import { useEffect, useState } from "react";
// import { getNotes, addNote, updateNote, deleteNote } from "@/Firebase/notes";
// import NoteForm from "./NoteForm";
// import NoteCard from "./NoteCard";
// import { useSessionID } from "../sessionID"; // Import the useSessionID hook

// interface Note {
//   id: string;
//   title: string;
//   content: string;
//   sessionId: string;
// }

// const NoteDashboard: React.FC = () => {
//   const { sessionID } = useSessionID(); // Retrieve sessionID from useSessionID hook
//   const [notes, setNotes] = useState<Note[]>([]);

//   useEffect(() => {
//     if (sessionID) {
//       fetchNotes();
//     }
//   }, [sessionID]); // Refetch notes whenever sessionID changes

//   const fetchNotes = async () => {
//     try {
//       const notesData = await getNotes(sessionID); // Pass sessionID to getNotes function
//       const formattedNotes: Note[] = notesData.map((note: any) => ({
//         id: note.id,
//         title: note.title,
//         content: note.content,
//         sessionId: note.sessionId,
//       }));
//       setNotes(formattedNotes);
//     } catch (error) {
//       console.error("Error fetching notes:", error);
//       // Handle error as needed
//     }
//   };

//   const handleAddNote = async (newNote: { title: string; content: string }) => {
//     try {
//       await addNote({ ...newNote, sessionId: sessionID,  }); // Include sessionID in the newNote object
//       fetchNotes(); // Fetch updated notes after adding a new note
//     } catch (error) {
//       console.error("Error adding note:", error);
//       // Handle error as needed
//     }
//   };

//   const handleDeleteNote = async (noteId: string) => {
//     try {
//       await deleteNote(noteId);
//       setNotes(notes.filter((note) => note.id !== noteId));
//     } catch (error) {
//       console.error("Error deleting note:", error);
//       // Handle error as needed
//     }
//   };

//   const handleEditNote = async (editedNote: Note) => {
//     try {
//       await updateNote({ ...editedNote, sessionId: sessionID }); // Include sessionID in the editedNote object
//       setNotes(
//         notes.map((note) =>
//           note.id === editedNote.id
//             ? { ...editedNote, sessionId: note.sessionId }
//             : note,
//         ),
//       );
//     } catch (error) {
//       console.error("Error updating note:", error);
//       // Handle error as needed
//     }
//   };

//   return (
//     <div className="mt-12 flex flex-col">
//       <h1 className="text-2xl font-bold">Note Dashboard</h1>
//       {sessionID && <NoteForm onAddNote={handleAddNote} />}
//       {/* NoteForm does not require sessionId prop */}
//       <div className="">
//         {notes.map((note) => (
//           <NoteCard
//             key={note.id}
//             note={note}
//             onDelete={handleDeleteNote}
//             onEdit={handleEditNote}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default NoteDashboard;
