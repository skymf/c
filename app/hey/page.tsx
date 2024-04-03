"use client";
import { useAuthContext } from "@/Firebase/context/AuthContext";
import Hey from "@/components/B";
import Graphs from "../../components/Graphs";
import NoteDashboard from "@/components/notes/NoteDashboard";
import { useRouter } from "next/navigation";
import React from "react";
import NavBar from "@/components/navbar";

export default function Notes() {
  const { user } = useAuthContext();
  const router = useRouter();

  React.useEffect(() => {
    if (user == null) router.push("/");
  }, [user]);

  return (
    <section className="gap-12 px-12 ">
      <div>
        <NavBar />
        <Hey />
        {/* graphs displayed */}
        <Graphs />

        {/* <NoteTaking /> */}
        <NoteDashboard />
      </div>
    </section>
  );
}
