"use client";
import { Card, LineChart } from "@tremor/react";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useSessionID } from "../components/sessionID";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

export default function Dash() {
  const { sessionID } = useSessionID();
  const [noteTitle, setNoteTitle] = useState<string>("");
  const [graphData, setGraphData] = useState<any[]>([]);

  const fetchDataFromFirebase = async (
    filename: string,
    setData: React.Dispatch<React.SetStateAction<any[]>>,
  ) => {
    try {
      const storageRef = ref(getStorage());
      const fileRef = ref(storageRef, filename);
      const url = await getDownloadURL(fileRef);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`failed to fetch file: ${filename}`);
      }
      const data = await response.json();
      setData(data);
    } catch (error: any) {
      console.error("Error fetching graph data:", error);
      toast.error("error fetching graph data, check the console for details.");
    }
  };

  useEffect(() => {
    const fetchLatestGraphs = async () => {
      try {
        if (sessionID) {
          const filename = `Organic.csv_${sessionID}_graph.json`;
          const lineChartData = await fetchDataFromFirebase(
            filename,
            setGraphData,
          );

          const noteTitle = await fetchNoteTitle(sessionID);
          setNoteTitle(noteTitle);
        } else {
          // add function so it will display error when uploaded
        }
      } catch (error) {
        console.error("Error fetching latest graphs:", error);
        toast.error("Error fetching latest graphs");
      }
    };

    fetchLatestGraphs();
  }, [sessionID]);

  // Function to fetch note title associated with the sessionID
  const fetchNoteTitle = async (sessionID: string) => {
    // Implement logic to fetch note title associated with the sessionID
    // This can be done by making an API request to fetch the note title using the sessionID
    // idk how to adjust it
    return "Sample note title";
  };

  return (
    <section className="mb-12 mt-12 flex flex-col">
      <Toaster />
      <div className="flex flex-row"></div>
      <Card>
        <h1 className="text-2xl font-semibold">{noteTitle}</h1>
        <div className="flex flex-col gap-3">
          <p>
            This is a template graph. The actual uploaded graph should be
            displayed with the specific note and added sessionID.
          </p>
          {graphData.length > 0 && (
            <LineChart
              className="mt-6"
              data={graphData}
              index="Video position (%)"
              categories={["Absolute audience retention (%)"]}
              yAxisWidth={25}
              showAnimation={true}
              animationDuration={1750}
            />
          )}
        </div>
      </Card>
    </section>
  );
}
