import { useState } from "react";
import { TextInput, Textarea } from "@tremor/react";
// import sessionID from "../../components/Graphs"; // Import sessionID from Graphs.tsx

interface NoteFormProps {
  onAddNote: (newNote: {
    title: string;
    content: string;
    sessionId: string;
  }) => void;
  sessionId: string;
}

const NoteForm: React.FC<NoteFormProps> = ({ onAddNote, sessionId }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onAddNote({
      title,
      content,
      sessionId,
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
// import { useState } from "react";
// import { TextInput, Textarea } from "@tremor/react";
// import { useSessionID } from "../sessionID"; // Import the useSessionID hook

// interface NoteFormProps {
//   onAddNote: (newNote: {
//     title: string;
//     content: string;
//     sessionId: string;
//   }) => void;
// }

// const NoteForm: React.FC<NoteFormProps> = ({ onAddNote }) => {
//   const { sessionID } = useSessionID(); // Retrieve sessionID from useSessionID hook
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!title.trim() || !content.trim()) return;
//     onAddNote({
//       title,
//       content,
//       sessionId: sessionID, // Pass sessionId to the onAddNote function
//     });
//     setTitle("");
//     setContent("");
//   };

//   return (
//     <div className="mt-12 max-w-md">
//       <form onSubmit={handleSubmit}>
//         <div className="flex flex-col gap-3">
//           <TextInput
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="Enter title"
//           />

//           <Textarea
//             placeholder="Enter note content"
//             id="notebox"
//             rows={2}
//             className=""
//             onChange={(e) => setContent(e.target.value)}
//             value={content}
//           />
//         </div>
//         <button
//           type="submit"
//           className="group mt-3 flex h-10 w-full max-w-xs items-center rounded-full border border-[#F3F1EB] px-3 text-sm text-[#F3F1EB] outline-none transition hover:scale-110 hover:bg-[#F3F1EB] hover:text-[#2A2A2B] focus:scale-110 active:scale-105 sm:h-12 sm:max-w-max sm:text-base"
//         >
//           submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default NoteForm;
