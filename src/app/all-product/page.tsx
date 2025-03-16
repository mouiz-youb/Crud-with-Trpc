import React from 'react'
import Product from '../_components/Product'
function page() {
  return (
    <div className='flex justify-center items-center flex-col gap-9 flex-wrap w-screen md:flex-row  overflow-x-hidden p-5 '>
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
    </div>
  )
}

export default page