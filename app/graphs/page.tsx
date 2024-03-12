"use client";
import { BarChart, Card, LineChart } from "@tremor/react";
import axios from "axios";
import "firebase/storage"; // Import Firebase Storage SDK
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const YouTubeEmbed: React.FC<{ videoUrl: string }> = ({ videoUrl }) => {
  const [embedCode, setEmbedCode] = useState<string | null>(null);

  useEffect(() => {
    const videoId = extractVideoId(videoUrl);
    if (videoId) {
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      setEmbedCode(
        `<iframe width="560" height="315" src="${embedUrl}" frameborder="0" allowfullscreen></iframe>`,
      );
    }
  }, [videoUrl]);

  const extractVideoId = (url: string) => {
    if (!url) return null;
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    );
    return match ? match[1] : null;
  };

  return (
    <div
      dangerouslySetInnerHTML={{ __html: embedCode || "Invalid YouTube URL" }}
    />
  );
};

const CombinedGraphComponent: React.FC = () => {
  const [lineChartData, setLineChartData] = useState<any[]>([]);
  const [barChartData, setBarChartData] = useState<any[]>([]);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [isUploaded, setIsUploaded] = useState<boolean>(false);
  const [sessionID, setSessionID] = useState<string | null>(null); // Define sessionID state variable

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
        throw new Error(`Failed to fetch file: ${filename}`);
      }
      const data = await response.json();
      setData(data);
    } catch (error: any) {
      console.error("Error fetching graph data:", error);
      toast.error(
        "Error fetching graph data. Please check the console for details.",
      );
    }
  };

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      const videoUrl = prompt("Enter YouTube video URL:");
      if (!videoUrl) return;

      setVideoUrl(videoUrl);

      if (file) {
        const formData = new FormData();
        formData.append("zipFile", file);
        formData.append("videoUrl", videoUrl);
        const response = await axios.post(
          "http://127.0.0.1:5000/api/python",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );

        const { session_id: sessionID } = response.data;
        setSessionID(sessionID);
        setIsUploaded(true);
        toast.success(
          "file uploaded and converted. graphs are shown in a bit.",
        );
      }
    } catch (error) {
      console.error("Error during file upload and conversion:", error);
      toast.error(
        "error yay, check the console.log (probably file upload and reading error), make sure to have the correct files!",
      );
    }
  };

  useEffect(() => {
    if (isUploaded && sessionID) {
      setTimeout(async () => {
        await Promise.all([
          fetchDataFromFirebase(
            `Organic.csv_${sessionID}_graph.json`,
            setLineChartData,
          ),
          fetchDataFromFirebase(
            `Detailed activity.csv_${sessionID}_graph.json`,
            setBarChartData,
          ),
        ]);
      }, 0); // add delay if needed
    }
  }, [isUploaded, sessionID]);
  return (
    <div className="flex flex-col gap-8">
      <label className="group flex h-10 w-full max-w-xs items-center rounded-full border border-[#F3F1EB] px-3 text-sm text-[#F3F1EB] outline-none transition hover:scale-110 hover:bg-[#F3F1EB] hover:text-[#2A2A2B] focus:scale-110 active:scale-105 sm:h-12 sm:max-w-max sm:text-base">
        <span>Upload your .zip folder</span>
        <input
          type="file"
          accept=".zip"
          name="zipFile"
          onChange={handleFileUpload}
          className="hidden"
        />
      </label>

      <Toaster />

      {videoUrl && <YouTubeEmbed videoUrl={videoUrl} />}

      {lineChartData.length > 0 && (
        <div className="gap-8">
          <h1 className="text-5xl">Hi</h1>
          <Card>
            <h1 className="text-2xl font-semibold">
              Your uploaded .zip file graph
            </h1>
            <LineChart
              className="mt-6"
              data={lineChartData}
              index="Video position (%)"
              categories={["Absolute audience retention (%)"]}
              yAxisWidth={100}
              showAnimation={true}
              animationDuration={1750}
            />
          </Card>
        </div>
      )}

      {lineChartData.length === 0 && (
        <Card>
          <p>Line Chart: Hey! Upload your .zip files to plot your graph.</p>
        </Card>
      )}

      {barChartData.length > 0 && (
        <div className="flex flex-col gap-8">
          <h1 className="text-5xl">Bar Chart</h1>
          <Card>
            <h1 className="text-lg font-medium">
              Your uploaded .zip file graph
            </h1>
            <BarChart
              className="mt-6"
              data={barChartData}
              index="Video position (%)"
              categories={["Absolute Audience Retention (%)"]}
              colors={["violet"]}
              yAxisWidth={100}
              showAnimation={true}
              animationDuration={2250}
            />
          </Card>
        </div>
      )}

      {barChartData.length === 0 && (
        <Card>
          <p>Bar Chart: Hey! Upload your .zip files to plot your graph.</p>
        </Card>
      )}
    </div>
  );
};

export default CombinedGraphComponent;
