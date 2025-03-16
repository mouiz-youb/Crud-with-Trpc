import {z} from "zod" //for the validaiton
import { createTRPCRouter ,publicProcedure } from "../trpc"

// THE PRODUCT ROUTER 
export const productRouter = createTRPCRouter({
    // create a new product 
    createProduct:publicProcedure
    // the next line  include input that contains the validation for the input fields using zod
    .input(z.object({
        name:z.string().min(1,"Title is required"),
        price :z.number().min(0, "Price must be a positive number")
    }))
    // the next line 
    .mutation(async ({input ,ctx})=>{
        // create a new product
       return ctx.db.product.create({
        data:{
            name:input.name,
            price:input.price
        }
       })
    })
})