import { httpsCallable } from "firebase/functions";
import { functions } from "./firebase";

const generateUploadUrl = httpsCallable(functions, "generateUploadUrl");
const getVideosFunction = httpsCallable(functions, "getVideos");

export interface Video {
  id?: string;
  uid?: string;
  filename?: string;
  status?: "processing" | "processed";
  title?: string;
  description?: string;
  date?: Date;
}

export const uploadVideo = async (file: File) => {
  const response: any = await generateUploadUrl({
    fileExtension: file.name.split(".").pop(),
  });

  await fetch(response?.data?.url, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });

  return;
};

export const getVideos = async () => {
  const response = await getVideosFunction();

  return response.data as Video[];
};
