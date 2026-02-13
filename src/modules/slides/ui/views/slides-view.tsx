"use client";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";
import { SlidesSectionView } from "../components/slides-section-view";
import { BoxesFilter } from "../components/boxes-filter";
import { CubesFilter } from "../components/cubes-filter";
import { useState } from "react";

export const SlidesView = () => {
  const [box, setBox] = useState<string | null>(null);
  const [cube, setCube] = useState<string | null>(null);

  const handleBoxChange = (newBox: string | null) => {
    setBox(newBox);
    setCube(null); 
  };

  return (
    <div className="flex flex-col p-4 gap-y-4">
      <div className="flex flex-col md:flex-row items-start justify-start gap-4">
        <BoxesFilter value={box}  onChange={handleBoxChange} />
        <CubesFilter box={box} cube={cube} onChange={setCube} />
      </div>
      {box && cube ? <SlidesSectionView box={box ?? ""} cube={cube ?? ""} /> : null}
    </div>
  );
};

export const SlidesViewLoading = () => {
  return (
    <LoadingState
      title="Loading Slides"
      description="This may take a few seconds"
    />
  );
};

export const SlidesViewError = () => {
  return (
    <ErrorState
      title="Error loading slides"
      description="Something went wrong."
    />
  );
};
