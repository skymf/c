"use client";
import { useAuthContext } from "@/Firebase/context/AuthContext";
import Hey from "@/components/B";
import Graphs from "../../components/Graphs";
import Dash from "@/components/dash";
import NoteDashboard from "@/components/notes/NoteDashboard";
import { useRouter } from "next/navigation";
import React from "react";

export default function Notes() {
  const { user } = useAuthContext();
  const router = useRouter();

  React.useEffect(() => {
    if (user == null) router.push("/");
  }, [user]);

  return (
    <section className="relative mt-24 gap-12 px-12">
      <div>
        <Hey />
        {/* graphs displayed */}
        <Graphs />

        <Dash />

        {/* <NoteTaking /> */}
        <NoteDashboard />
      </div>
    </section>
  );
}
