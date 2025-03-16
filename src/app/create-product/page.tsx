"use client"
import React ,{useState} from 'react'

function page() {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
  return (
    <div className='flex justify-center items-center w-screen h-screen flex-col gap-5 '>
        <p className='flex justify-center items-center text-3xl capitalize '> create product </p>
        <form action="" className='flex justify-evenly items-center flex-col gap-5 w-1/2 h-1/2 md:w-1/3   rounded-xl shadow-2xl p-5'>
            <input onChange={(e)=>setName(e.target.value)} className='p-3 w-full text-center rounded-xl shadow-xl ' type="text" placeholder='Enter The Name Of The Product ' />
            <input onChange={(e)=>setPrice(e.target.value)} className='p-3 w-full text-center rounded-xl shadow-xl ' type='number' step="0.01" placeholder='Enter The Price  Of The Product ' />
            <button type='submit' className='p-3 w-full text-center rounded-xl shadow-xl text-white bg-black cursor-pointer hover:bg-gray-400 hover:text-black transition-all'>Create New Product</button>
        </form>
    </div>
  )
}

export default page