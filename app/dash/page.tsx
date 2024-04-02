"use client";
import { Card } from "@tremor/react";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useSessionID } from "../../components/sessionID";
import NavBar from "@/components/navbar";
import Image from "next/image";
import NoteCard from "@/components/notes/NoteCard";
import { getNotes } from "@/Firebase/notes";

export default function Dash() {
  const user = null;
  const { sessionID } = useSessionID();
  const [noteTitle, setNoteTitle] = useState<string>("");
  const [graphData, setGraphData] = useState<any[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  interface Note {
    id: string;
    title: string;
    content: string;
    sessionId: string;
  }

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
      console.error("error fetching notes:", error);
    }
  };
  //
  // Function to fetch data from Firebase database
  // based on time stamps.
  // note title and graph data (template only)
  return (
    <section className="mb-28 px-12 ">
      <NavBar />
      <Toaster />
      <div className="mt-8 grid gap-3 px-12 sm:grid-cols-2 md:grid-cols-3 md:gap-8 md:pr-12 lg:grid-rows-4">
        <Card className="">
          <h1 className="text-2xl font-semibold">{noteTitle}</h1>
          <div className="flex flex-col gap-3">
            <p>
              this is a template graph, full notes are being displayed later
            </p>
          </div>
        </Card>

        <Card className="">
          <h3 className="text-2xl font-semibold">hey hey</h3>
          <Image src="/hi.jpg" height="150" width="150" alt="img" />
        </Card>

        <Card className="">
          <h3 className="text-2xl font-semibold">hey hey</h3>
          <Image src="/hi.jpg" height="150" width="150" alt="img" />
        </Card>

        <Card className="">
          <h3 className="text-2xl font-semibold">hey hey</h3>
          <Image src="/hi.jpg" height="150" width="150" alt="img" />
        </Card>

        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onDelete={fetchNotes}
            onEdit={fetchNotes}
            timestamp={1234}
          />
        ))}
      </div>
    </section>
  );
}
