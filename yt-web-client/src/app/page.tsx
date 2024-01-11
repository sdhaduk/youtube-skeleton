import { getVideos } from "@/utils/functions";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  const videos = await getVideos();

  return (
    <div>
      {videos.map((video) => (
        <Link href={`/watch?v=${video.filename}`} key={video.filename}>
          <Image
            src={"/thumbnail.png"}
            alt="video"
            width={120}
            height={80}
            className="m-2.5"
          />
        </Link>
      ))}
    </div>
  );
}
