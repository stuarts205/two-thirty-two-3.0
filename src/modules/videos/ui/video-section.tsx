import { getVideoByLinkId } from "@/lib/lookups";
import YouTube from "react-youtube";

interface VideoSectionProps {
  linkId: string | null;
}

export const VideoSection = ({ linkId }: VideoSectionProps) => {
  const video = getVideoByLinkId(linkId);
  return (
    <div className="h-full flex flex-col md:px-24">
      <h1 className="text-2xl font-bold px-4 py-4">{video?.name}</h1>
      <div className="p-5">
        <YouTube
          videoId={video?.linkId}
          opts={{ width: "100%", height: "600px" }}
        />
      </div>
    </div>
  );
};
