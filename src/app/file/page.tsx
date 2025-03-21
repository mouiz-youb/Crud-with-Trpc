"use client"
import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

function page() {
  const [file ,setFile] = useState<File>()
  const [previewUrl, setPreviewUrl] = useState<string |null>(null)
  const handleFileUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    // Check if file exists
    if (!file) return console.error("No file selected");
  
    try {
      const data = new FormData();
      data.append("file", file); // ✅ Correctly append file
  
      const response = await axios.post("/api/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data", // ✅ Set correct Content-Type
        },
      });

      if(response.data.fileUrl){
        setPreviewUrl(response.data.fileUrl)
      }
      console.log("Upload success:", response.data);
      toast.success(`the file upload successfully`)
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error(` Error when the file upload `)
    }
  };
  
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
    {previewUrl && (
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-lg font-bold">Uploaded File Preview:</h2>
          <img src={previewUrl} alt="Uploaded file" className="w-1/3 shadow-lg rounded-lg" />
        </div>
      )}
    </div>
  )
}

export default page