import React from 'react'
import Product from '../_components/Product'
function page() {
  return (
    <div className='flex justify-center items-center flex-col gap-3 flex-wrap w-screen md:flex-row '>
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
    </div>
  )
}

export default page