"use client"

import React from 'react'
import imageCart from "@/images/imageCart.svg"
import { FaStar } from "react-icons/fa";

function Product() {
  return (
    <div className='flex justify-center items-center gap-5 border-2  flex-col '>
        <img src={imageCart} alt=""  className='w-full h-[100px] '/>
        <div className='flex justify-center items-center flex-col gap-3 '>
            <div className=' flex  justify-between items-center  gap-2 '>
                <div className='flex  justify-center items-center flex-col gap-2 '>
                    The name of product is :
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
            <div className=' flex  justify-between items-center  gap-2 '>
                <div className='flex  justify-center items-center flex-col gap-2 '>
                    <p>The  Price of product  is :</p>
                </div>
                <div className='flex  justify-center items-center  gap-2 '></div>
            </div>
        </div>
    </div>
  )
}

export default Product