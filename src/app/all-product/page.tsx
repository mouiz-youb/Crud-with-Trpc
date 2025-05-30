"use client"; // Ensure this is at the top of the file with no space

import { useEffect } from "react";
import Product from '../_components/Product';
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
const Page: React.FC = () => {
    const router = useRouter();
  const { data: products, error } = api.product.getAll.useQuery();

  if (error) return <div>Error: {error.message}</div>;


  useEffect(()=>{
    if (products) {
        console.log(`products fetched : ${products}`)
    }
  } ,[products])

   const hendlePush =()=>{
    router.push("/create-product")
  }
  return (
   <div className="flex w-screen flex-col items-center justify-center gap-5 p-5 ">
      <div className="flex w-full items-center justify-between p-2 flex-row ">
        <p className="flex items-center justify-center text-3xl capitalize">
        All Products
        </p>
        <button onClick={hendlePush}  className="flex justify-center items-center rounded-2xl bg-slate-600 text-xl p-2  text-white hover:text-slate-600 hover:bg-slate-300 hover:shadow-2xl ">Go to create product </button>
      </div>
     
     <div className="flex w-screen flex-col flex-wrap items-center justify-center gap-9 overflow-x-hidden p-5 md:flex-row">
      {products && products.length > 0 ? (
        products.map((product ) => (
            <div key={product.id}>
                <Product id={product.id}  name={product.name} price={product.price} image={product.imageUrl ?? undefined}/>
            </div>
        ))
      ) : (
        <div>No products found</div>
      )}
    </div>
   </div>
  );
};

export default Page;