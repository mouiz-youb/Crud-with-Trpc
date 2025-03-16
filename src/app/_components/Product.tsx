"use client"

import React from 'react'
import imageCart from "@/images/imageCart.svg"
import { FaStar } from "react-icons/fa";
import { IoLinkOutline } from "react-icons/io5";
import Link from 'next/link';

interface ProductProps {
    name:String
    price: number
}

const  Product:React.FC<ProductProps>=({
    name,
    price
})=> {
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
        </div>
    </div>
  )
}

export default Product