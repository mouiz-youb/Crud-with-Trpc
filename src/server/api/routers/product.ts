// server/api/routers/product.ts
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { uploadImage } from "@/utils/cloudinary";

export const productRouter = createTRPCRouter({
  // Create a new product
  createProduct: publicProcedure
    .input(
      z.object({
        name: z.string().min(3, "Title is required"),
        price: z.number().min(0, "Price must be a positive number"),
        image: z.string().optional(), // Image field
      })
    )
    .mutation(async ({ input, ctx }) => {
     

      // Create a new product
      return ctx.db.product.create({
        data: {
          name: input.name,
          price: input.price,
          image: input.image, // Use the uploaded image URL
        },
      });
    }),

  // Get all products
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.product.findMany();
  }),

  // Get a single product by ID
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.product.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  // Update a product
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().min(3, "Title is required"),
        price: z.number().min(0, "Price must be a positive number"),
        image: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
     
      return ctx.db.product.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          price: input.price,
          image: input.image, // Use the uploaded image URL
        },
      });
    }),

  // Delete a product
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.product.delete({
        where: {
          id: input.id,
        },
      });
    }),
});