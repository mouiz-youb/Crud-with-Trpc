"use client"

import React from 'react'
import imageCart from "@/images/imageCart.svg"
import { FaStar } from "react-icons/fa";
import { IoLinkOutline } from "react-icons/io5";
import Link from 'next/link';
import { api } from '@/trpc/react';
import {toast ,Toaster} from "react-hot-toast"
import { useRouter } from 'next/navigation';

interface ProductProps {
    id: number
    name:String
    price: number
}

const  Product:React.FC<ProductProps>=({
    id,
    name,
    price
})=> {
    const updateProduct = api.product.update.useMutation()
    const deleteProduct = api.product.delete.useMutation()
    const router=useRouter()
      const utils = api.useUtils()
    
    // hendle update btn click
    const handleUpdate = ()=>{
        router.push(`/update-product/${id}`) 
    }


    // Handle delete button click
    const handleDelete = () => {
        // Show a confirmation toast
        toast(
          (t) => (
            <div className="flex flex-col items-center gap-3 p-4">
              <p>Are you sure you want to delete this product?</p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    deleteProduct.mutate(
                      { id },
                      {
                        onSuccess: () => {
                          // ✅ Invalidate and refetch the product list after deletion
                          utils.product.getAll.invalidate();
      
                          toast.success("Product deleted successfully!");
                        },
                        onError: (error) => {
                          toast.error(`Error deleting product: ${error.message}`);
                        },
                      }
                    );
                    toast.dismiss(t.id); // Dismiss the toast after confirmation
                  }}
                  className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => toast.dismiss(t.id)} // Dismiss the toast
                  className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          ),
          {
            duration: Infinity, // Keep the toast open until the user interacts
          }
        );
      };
      
  return (
    <div  className='flex justify-center items-center gap-5 shadow-xl  flex-col rounded-xl  '>
        <img src={imageCart.src} alt=""  className='w-full '/>
        <div className='flex justify-center items-center flex-col gap-3 '>
            <div className=' flex  justify-between items-center gap-2 flex-col '>
                <div className='flex  justify-start items-center w-full  gap-2 '>
                    <h2 className='text-xl font-bold text-gray-800'>Product Name : {name} </h2>
                </div>
                <div className='flex  justify-center items-center  gap-2 '>
                    <FaStar className='text-yellow-500' />
                    <FaStar className='text-yellow-500' />
                    <FaStar className='text-yellow-500' />
                    <FaStar className='text-yellow-500' />
                    <FaStar className='text-yellow-500' />
                </div>
            </div>
            <div className='flex justify-center items-center '>
                <p></p>
            </div>
            <div className=' flex  justify-between items-center flex-col  gap-2 '>
                <div className='flex  justify-center items-center  gap-2 '>
                    <p>Product Price  : {price } </p>
                </div>
                <div className='flex  justify-center items-center  gap-2 '>
                    <Link href="/" className='cursor-pointer flex justify-center items-center gap-2'>visited Link <IoLinkOutline/></Link>
                </div>
            </div>
            <div className='flex  justify-center items-center p-5 gap-5'>
                <button onClick={handleUpdate} className='flex justify-center items-center p-2 rounded-xl shadow-xl text-white bg-blue-500 hover:text-blue-500 hover:bg-white'>update the Product</button>
                <button onClick={handleDelete} className='flex justify-center items-center p-2 rounded-xl shadow-xl text-white bg-red-500 hover:text-red-500 hover:bg-white'>delete the product</button>
            </div>
        </div>
    </div>
  )
}

export default Product