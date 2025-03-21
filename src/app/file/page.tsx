"use client"
import axios from 'axios'
import React, { useState } from 'react'

function page() {
  const [file ,setFile] = useState<File>()
  const handleFileUpload =async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    // check the file
    if(!file) return 
    try {
      const data = new FormData()
      data.set("file",file)
      const response = await axios.post("/api/upload",{
        file:file
      })
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='flex justify-center items-center w-screen p-10 h-screen flex-col gap-5 '>
      <form 
      onSubmit={handleFileUpload}
      className='w-3/4 h-3/5 flex justify-center items-center flex-col gap-5 shadow-xl rounded-xl  p-3'>
      <input type="file"
          name="File"
          id="File"
          placeholder='Enter Your File'
          className='flex justify-center items-center p-3 shadow-2xl rounded-xl '
          onChange={(e)=>setFile(e.target.files?.[0])} />
          <button 
            type="submit"
            className="w-full cursor-pointer rounded-xl bg-black p-3 text-center text-white shadow-xl transition-all hover:bg-gray-400 hover:text-black">
            Upload
          </button>
    </form>
    {file && <img src={URL.createObjectURL(file)} alt="Uploaded file"  className='flex justify-center items-center flex-col w-1/3'/>}
    </div>
  )
}

export default page