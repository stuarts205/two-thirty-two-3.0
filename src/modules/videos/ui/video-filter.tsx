import CommandSelect from "@/components/command-select";
import { videos } from "@/lib/lookups";
import React from "react";

interface VideoFilterProps {
  videos: typeof videos;
  onChange: (value: string | null) => void;
  value: string | null;
}

export const VideoFilter = ({ videos, onChange, value }: VideoFilterProps) => {
  return (
    <>
      <CommandSelect
        options={(videos ?? []).map((video) => ({
          id: video.linkId,
          value: video.linkId,
          children: (
            <div className="flex items-center gap-x-2">{video.name}</div>
          ),
        }))}
        onSelect={(value) => onChange(value || null)}
        value={value ?? ""}
        placeHolder="Videos..."
        className="h-9 w-full md:max-w-lg"
      />
    </>
  );
};
