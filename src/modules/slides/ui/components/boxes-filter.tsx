import React, { useState } from "react";
import CommandSelect from "@/components/command-select";
import {
  CircleXIcon,
  CircleCheckIcon,
  ClockArrowUpIcon,
  VideoIcon,
  LoaderIcon,
} from "lucide-react";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { useBoxFilters } from "../../hooks/use-box-filters";

interface BoxesFilterProps {
  value?: string | null;
  onChange: (value: string | null) => void;
}

export const BoxesFilter = ({ value, onChange }: BoxesFilterProps) => {
  const [filters, setFilters] = useBoxFilters();

  const trpc = useTRPC();
  const { data: boxes } = useQuery(trpc.slides.getManyBoxes.queryOptions());

  return (
    <>
      <CommandSelect
        options={(boxes ?? []).map((box) => ({
          id: box.url,
          value: box.url,
          children: <div className="flex items-center gap-x-2">{box.url}</div>,
        }))}
        onSelect={(value) => onChange(value || null)}
        value={value ?? ""}
        placeHolder="Boxes..."
        className="h-9 w-full md:w-48"
      />
    </>
  );
};
