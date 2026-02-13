"use client";
import { videos } from "@/lib/lookups";
import React from "react";
import { VideoFilter } from "../ui/video-filter";
import { VideoSection } from "../ui/video-section";

export const VideosView = () => {
  const [linkId, setLinkId] = React.useState<string | null>(null);
  const videosList = videos;

  return (
    <div className="flex flex-col p-4 gap-y-4">
      <VideoFilter videos={videosList} onChange={setLinkId} value={linkId} />
      <VideoSection linkId={linkId} />
    </div>
  );
};
