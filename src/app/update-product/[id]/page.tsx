"use client";

import React, { useEffect, useState  ,use} from "react";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";


function Page({ params }: { params: Promise<{ id: string }> }){
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [file, setFile] = useState<File |null >(null)
  const router = useRouter();
  const {id}= use(params)
    const utils = api.useUtils()

//   Fetch the product details using the Id from the url
const {data:product} = api.product.getById.useQuery({
    id:parseInt(id)
})


// Pre-fill the form with the product details
useEffect(()=>{
    if(product){
        setName(product.name)
        setPrice(product.price.toString())
    }
},[product])
  

//   Handle form submission
const updateProduct = api.product.update.useMutation({
    onSuccess: () => {
        setSuccess(true);
        setError(null),
        setName("")
        setPrice("")
        setFile(null)
        utils.product.getAll.invalidate()
        toast.success(`The product updated successfully`)
        router.push("/all-product");
    },
    onError: (error) => {
        setError(error.message);
        toast.error(error.message)
        setSuccess(false)
    }
})

// the handle Submit function 
const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if(!file) return toast.error(`No file selected`)
      try {
        // upload the file
        const data = new FormData();
        data.append("file", file);
  
        const uploadResponse = await axios.post("/api/upload", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        
        if (!uploadResponse.data.success) {
          return toast.error("File upload failed");
        }
        // Get the upload file URL
        const fileUrl = uploadResponse.data.fileUrl
        // Get the upload file url form cloudianry 
         const fileUrlCloudInary = uploadResponse.data.fileUrlCloudInary
         console.log(`file from cloudianry ${fileUrlCloudInary}`)
        // Create the product
        updateProduct.mutate({
          id: parseInt(id),
          name,
          price: parseFloat(price),
          imageUrl: fileUrl,
        })
        toast.success(`The product created successfully `)
      } catch (error) {
        console.log(error)
        toast.error(String(error))
      }
}

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-5">
      <p className="flex items-center justify-center text-3xl capitalize">
        Update Product
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex h-1/2 w-1/2 flex-col items-center justify-evenly gap-5 rounded-xl p-5 shadow-2xl md:w-1/3"
      >
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl p-3 text-center shadow-xl"
          type="text"
          placeholder="Enter The Name Of The Product"
        />
        <input
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full rounded-xl p-3 text-center shadow-xl"
          type="number"
          step="0.5"
          placeholder="Enter The Price Of The Product"
        />
        <input 
        type="file"
        placeholder="jdjksa"
        onChange={(e) => setFile(e.target.files?.[0]||null)} 
        className="w-full rounded-xl p-3 text-center shadow-xl" />
        <button
          type="submit"
          className="w-full cursor-pointer rounded-xl bg-black p-3 text-center text-white shadow-xl transition-all hover:bg-gray-400 hover:text-black"
        >
          Update Product
        </button>

        {/* Display error message */}
        {error && (
          <p className="text-center text-red-500">Error: {error}</p>
        )}

        {/* Display success message */}
        {success && (
          <p className="text-center text-green-500">
            Product updated successfully!
          </p>
        )}
      </form>
      {file && <img src={URL.createObjectURL(file)} alt="Product Image"  className="w-[200px]"/>}
    </div>
  );
}

export default Page;