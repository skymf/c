"use client";
import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import toast, { Toaster } from "react-hot-toast";
import { app as firebaseApp } from "../Firebase/config";
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
} from "firebase/firestore";

const db = getFirestore(firebaseApp);

export const useSessionID = () => {
  const [sessionID, setSessionID] = useState<string | null>(null);
  const [isUploaded, setIsUploaded] = useState<boolean>(false);

  const handleFileUpload = async (file: File, videoUrl: string) => {
    try {
      const loadingToast = toast.loading("Uploading file...");

      const formData = new FormData();
      formData.append("zipFile", file);
      formData.append("videoUrl", videoUrl);
      const response: AxiosResponse<{ session_id: string }> = await axios.post(
        "http://127.0.0.1:5000/api/python",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      const { session_id: newSessionID } = response.data;
      setSessionID(newSessionID);
      setIsUploaded(true);

      toast.dismiss(loadingToast);

      toast.success("file uploaded successfully.");

      const sessionsCollection = collection(db, "sessions");
      await addDoc(sessionsCollection, {
        sessionID: newSessionID,
        videoUrl,
        uploadedAt: Timestamp.now(),
        filename: file.name,
      });
    } catch (error: any) {
      console.error(
        "error during file uploading to firebase // reading // converting // fetching:",
        error.response?.data ?? error.message,
      );
      toast.error(
        "error during uploading file / read / firebase / convert / upload",
      );
    }
  };

  return { sessionID, isUploaded, handleFileUpload };
};

// old code cba to remove it, will remove it later
// "use client";
// import { useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { app as firebaseApp } from "../Firebase/config";
// import {
//   getFirestore,
//   collection,
//   addDoc,
//   Timestamp,
// } from "firebase/firestore";

// const db = getFirestore(firebaseApp);

// export const useSessionID = () => {
//   const [sessionID, setSessionID] = useState<string | null>(null);
//   const [isUploaded, setIsUploaded] = useState<boolean>(false);

//   const handleFileUpload = async (file: File, videoUrl: string) => {
//     try {
//       const formData = new FormData();
//       formData.append("zipFile", file);
//       formData.append("videoUrl", videoUrl);
//       const response = await axios.post(
//         "http://127.0.0.1:5000/api/python",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         },
//       );

//       const { session_id: newSessionID } = response.data;
//       setSessionID(newSessionID);
//       setIsUploaded(true);
//       toast.success("file uploaded, it will be shown in a bit.");

//       const sessionsCollection = collection(db, "sessions");
//       await addDoc(sessionsCollection, {
//         sessionID: newSessionID,
//         videoUrl,
//         uploadedAt: Timestamp.now(),
//         filename: file.name,
//       });
//     } catch (error) {
//       console.error(
//         "error during file uploading to firebase // reading // converting // fetching:",
//         error,
//       );
//       toast.error(
//         "error during uploading file / read / firebase / convert / upload",
//       );
//     }
//   };

//   return { sessionID, isUploaded, handleFileUpload };
// };
