"use client"; // Ensure this is at the top of the file with no space

import { useEffect } from "react";
import Product from "../_components/Product";
import { api } from "@/trpc/react";

const Page: React.FC = () => {
  const { data: products, error } = api.product.getAll.useQuery();

  if (error) return <div>Error: {error.message}</div>;


  useEffect(()=>{
    if (products) {
        console.log(`products fetched : ${products}`)
    }
  } ,[products])
  return (
    <div className="flex w-screen flex-col flex-wrap items-center justify-center gap-9 overflow-x-hidden p-5 md:flex-row">
      {products && products.length > 0 ? (
        products.map((product ) => (
            <div key={product.id}>
                <Product  name={product.name} price={product.price} />
            </div>
        ))
      ) : (
        <div>No products found</div>
      )}
    </div>
  );
};

export default Page;