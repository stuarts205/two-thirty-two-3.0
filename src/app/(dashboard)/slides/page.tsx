import { SlidesView, SlidesViewError, SlidesViewLoading } from "@/modules/slides/ui/views/slides-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";

const Page = async () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.slides.getManyBoxes.queryOptions()
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<SlidesViewLoading />}>
        <ErrorBoundary fallback={<SlidesViewError />}>
          <SlidesView />
        </ErrorBoundary>        
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
