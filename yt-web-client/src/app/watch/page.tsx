"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

type Props = {};

const Page = (props: Props) => {
  const searchParams = useSearchParams();
  const videoSrc = searchParams.get("v");
  const videoPrefix =
    "https://storage.googleapis.com/sagar-yt-skeleton-processed-videos/";

  return (
    <div>
      <h1>Watch Page</h1>
      <video controls src={videoPrefix + videoSrc} />
    </div>
  );
};

export default Page;
