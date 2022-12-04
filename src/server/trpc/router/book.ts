import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const bookRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.book.findMany();
  }),
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        author: z.string(),
        isbn: z.string().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.book.create({
        data: {
          ...input,
        },
      });
    }),
});
