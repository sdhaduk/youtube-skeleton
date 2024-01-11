import { getVideos } from "@/utils/functions";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  const videos = await getVideos();

  return (
    <div>
      {videos.map((video) => (
        <Link href={`/watch?v=${video.filename}`} key={video.id}>
          <Image
            src={"/thumbnail.png"}
            alt="video"
            width={240}
            height={160}
            className="m-2.5"
          />
        </Link>
      ))}
    </div>
  );
}

export const revalidate = 30;