import React from 'react'

function page() {
  return (
    <div className='flex  justify-center items-center flex-col gap-5 w-screen'>
        <div className='flex justify-center items-center  gap-4 w-full'>
            <input type="checkbox" name="b" id="todo-one" title="Complete the implementation of Cloudinary" className='text-xl cursor-pointer'/>
            <label htmlFor="todo-one" className='text-xl text-blue-500 cursor-pointer'>complete the implementation of cloudinary </label>
        </div>
        <div className='flex justify-center items-center  gap-4 w-full'>
            <input type="checkbox" name="b" id="todo-two" title="Complete the implementation of Cloudinary" className='text-xl cursor-pointer'/>
            <label htmlFor="todo-two" className='text-xl text-blue-500 cursor-pointer'>n9ra analyse  </label>
        </div>
        <div className='flex justify-center items-center  gap-4 w-full'>
            <input type="checkbox" name="b" id="todo-three" title="Complete the implementation of Cloudinary" className='text-xl cursor-pointer'/>
            <label htmlFor="todo-three" className='text-xl text-blue-500 cursor-pointer'>new project :send email function</label>
        </div>
    </div>
  )
}

export default page