import {z} from "zod" //for the validaiton
import { createTRPCRouter ,publicProcedure } from "../trpc"
import { Input } from "postcss"

// THE PRODUCT ROUTER 
export const productRouter = createTRPCRouter({
    // create a new product 
    createProduct:publicProcedure
    // the next line  include input that contains the validation for the input fields using zod
    .input(z.object({
        name:z.string().min(3 ,"Title is required"),
        price :z.number().min(0, "Price must be a positive number"),
        image :z.string().optional() //add image field
    }))
    // the next line 
    .mutation(async ({input ,ctx})=>{
        // create a new product
       return ctx.db.product.create({
        data:{
            name:input.name,
            price:input.price,
            image:input.image
        }
       })
    }),
    // get all products
    getAll :publicProcedure.query(async ({ctx})=>{
        return ctx.db.product.findMany()
    }),
    // get a single product 
    getById :publicProcedure
    .input( z.object({ id:z.number() }))
    .query(async ({input ,ctx})=>{
        return ctx.db.product.findUnique({
            where:{
                id:input.id
            }
        })
    }),
    // update the product 
    update :publicProcedure
    .input(z.object({
        id:z.number(),
        name:z.string().min(3 ,"Title is required"),
        price :z.number().min(0, "Price must be a positive number"),
        image: z.string().optional(),
    }))
    .mutation(async({input,ctx})=>{
        return ctx.db.product.update({
            where:{
                id:input.id
            },
            data:{
                name:input.name,
                price:input.price,
                image :input.image
            }
        })
    }),
    // delete the product 
    delete:publicProcedure
    .input(z.object({ id:z.number() }))
    .mutation(async({input,ctx})=>{
        return ctx.db.product.delete({
            where:{
                id:input.id
            }
        })
    })
})