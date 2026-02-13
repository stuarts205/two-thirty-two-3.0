import { slidesRouter } from '@/modules/slides/server/procedures';
import { createTRPCRouter } from '../init';

export const appRouter = createTRPCRouter({
  slides: slidesRouter,
});

export type AppRouter = typeof appRouter;