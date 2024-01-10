import { getFunctions, httpsCallable } from "firebase/functions";

const functions = getFunctions();

const generateUploadUrl = httpsCallable(functions, "generateUploadUrl");

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
