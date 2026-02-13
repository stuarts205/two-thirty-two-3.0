"use client";
import { useTRPC } from "@/trpc/client";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/plugins/counter.css";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ImagePlusIcon, MoreVerticalIcon } from "lucide-react";
import { toast } from "sonner";
import SaveSlideInfoModal from "./slide-info-modal";

interface SlidesSectionViewProps {
  box?: string | null;
  cube?: string | null;
}

export const SlidesSectionView = ({ box, cube }: SlidesSectionViewProps) => {
  const trpc = useTRPC();
  const { data: slides } = useSuspenseQuery(
    trpc.slides.getManySlides.queryOptions({
      box: box || "",
      cube: cube || "",
    }),
  );

  const [imageSizes, setImageSizes] = useState<
    { width: number; height: number }[]
  >([]);
  const [slideData, setSlideData] = useState({ image: "", index: 0 });
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [slideInfoModalOpen, setSlideInfoModalOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<string | null>(null);

  const openModal = (image: string) => {
    setImageUrl(image);
    create.mutate({ image });
  };

  const create = useMutation(
    trpc.slides.create.mutationOptions({
      onSuccess: () => {
        toast.success("Slide information created successfully!");
        setSlideInfoModalOpen(true);
      },
    }),
  );

  useEffect(() => {
    setImageSizes([]);
    setSlideData({ image: "", index: 0 });
    setOpen(false);

    if (!slides || slides.length === 0) return;

    const loadImages = async () => {
      const sizes = await Promise.all(
        slides.map(
          (slide) =>
            new Promise<{ width: number; height: number }>((resolve) => {
              const img = new Image();
              img.src = slide.url;
              img.onload = () =>
                resolve({ width: img.naturalWidth, height: img.naturalHeight });
            }),
        ),
      );
      setImageSizes(sizes);
    };

    loadImages();
  }, [box, cube, slides]);

  const getScaledStyle = (w: number, h: number) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const maxDisplaySize = Math.min(vw, vh) * 0.5;
    const scale = maxDisplaySize / Math.max(w, h);

    return { width: w * scale, height: h * scale };
  };

  const viewImage = (image: string, index: number) => {
    setSlideData({ image, index });
    setOpen(true);
  };

  if (!slides || slides.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <div className="text-sm text-muted-foreground">
          No slides found for the selected box and cube.
        </div>
      </div>
    );
  }

  return (
    <>
      <SaveSlideInfoModal
        open={slideInfoModalOpen}
        onOpenChange={setSlideInfoModalOpen}
        image={imageUrl}
      />
      <div className="flex flex-col w-full">
        {imageSizes.length === slides.length && (
          <Lightbox
            plugins={[Counter, Slideshow]}
            counter={{ container: { style: { top: 0, bottom: "unset" } } }}
            index={
              slideData.image
                ? slides.findIndex((s) => s.url === slideData.image)
                : 0
            }
            open={open}
            close={() => setOpen(false)}
            slides={slides.map((slide, index) => ({
              src: slide.url,
              alt: `Image ${index + 1}`,
              width: imageSizes[index].width,
              height: imageSizes[index].height,
              style: getScaledStyle(
                imageSizes[index].width,
                imageSizes[index].height,
              ),
            }))}
          />
        )}

        <div className="p-5">
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 2, 750: 4, 900: 5 }}
          >
            <Masonry>
              {slides.map((slide, index) => (
                <div key={index} className="p-0.5 relative group">
                  <img
                    src={slide.url}
                    alt={`Image ${index + 1}`}
                    className="rounded-xl overflow-hidden cursor-pointer group-hover:opacity-75"
                    style={{ display: "block", width: "100%" }}
                    onClick={() => viewImage(slide.url, index)}
                  />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        type="button"
                        size="icon"
                        className="bg-black/50 hover:bg-black/50 absolute top-1 right-1 rounded-full opacity-70 md:opacity-0 transition-opacity  
                              group-hover:opacity-100 duration-300 size-7"
                      >
                        <MoreVerticalIcon className="text-white" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" side="right">
                      <DropdownMenuItem onClick={() => openModal(slide.url)}>
                        <ImagePlusIcon className="size-4 mr-1" />
                        Add/Update info
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      </div>
    </>
  );
};
