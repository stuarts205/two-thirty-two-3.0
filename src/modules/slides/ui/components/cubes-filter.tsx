"use client";
import CommandSelect from "@/components/command-select";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

interface CubesFilterProps {
  box?: string | null;
  cube?: string | null;
  onChange: (cube: string | null) => void;
}

export const CubesFilter = ({ box, cube, onChange }: CubesFilterProps) => {
  const trpc = useTRPC();
  const { data: cubes } = useQuery(
    trpc.slides.getManyCubes.queryOptions({ box: box || "" }),
  );

  return (
    <CommandSelect
      options={(cubes ?? []).map((cube) => ({
        id: cube.name,
        value: cube.name,
        children: <div className="flex items-center gap-x-2">{cube.name}</div>,
      }))}
      onSelect={(value) => onChange(value || null)}
      value={cube ?? ""}
      placeHolder="Cube..."
      className="h-9 w-full md:w-48"
    />
  );
};
