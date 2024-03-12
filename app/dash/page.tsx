"use client";
import { Card } from "@tremor/react";
import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useSessionID } from "../../components/sessionID";
import NavBar from "@/components/navbar";
import Image from "next/image";

export default function Dash() {
  const user = null;
  const { sessionID } = useSessionID();
  const [noteTitle, setNoteTitle] = useState<string>("");
  const [graphData, setGraphData] = useState<any[]>([]);

  // Function to fetch data from Firebase database
  // based on time stamps
  // note title and graph data (template only)
  return (
    <section className="mb-28 mt-20 px-12">
      <Toaster />
      <NavBar />
      <div className="mt-8 grid w-auto gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-8 md:pr-12 lg:grid-rows-4">
        <Card className="mb-12">
          <h1 className="text-2xl font-semibold">{noteTitle}</h1>
          <div className="mb-12 flex flex-col gap-3">
            <p>this is a template graph, full note displayed later</p>
          </div>
        </Card>

        <Card className="mb-12">
          <h3 className="text-2xl font-semibold">hey hey</h3>
          <Image src="/hi.jpg" height="150" width="150" alt="img" />
        </Card>

        <Card className="mb-12">
          <h3 className="text-2xl font-semibold">hey hey</h3>
          <Image src="/hi.jpg" height="150" width="150" alt="img" />
        </Card>
      </div>
    </section>
  );
}
