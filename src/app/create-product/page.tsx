"use client";

import React, { useState } from "react";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { uploadImage } from "@/utils/cloudinary";

function Page() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const utils = api.useUtils()
  const [imageUrl, setImageUrl] = useState<string|null>(null)
  const [selectedFile, setSelectedFile] = useState<File|null>(null)
  const createProduct = api.product.createProduct.useMutation({
    onSuccess: () => {
      console.log(name, price);
      setSuccess(true);
      setError(null);
      setName("");
      setPrice(""); 
      setImageUrl(null)
      utils.product.getAll.invalidate()
      toast.success(`The product created successfully`)
      router.push("/all-product");
    },
    onError: (error) => {
      setError(error.message);
      toast.error(error.message)
      setSuccess(false);
    },
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
          // Call the mutation with the image URL
          if(!selectedFile) return toast.error(`Please select file`)
          const formData = new FormData()
        formData.append("image",selectedFile)
        const response = await fetch("/api/upload",{
          method: "POST",
          body: formData
        })
        const data = await response.json()
        if(data.imageUrl){
          setImageUrl(data.imageUrl)
          toast.success(`the image upload successfully`)
        }else{
          toast.error(`the image upload failed`)
        }
        };
        // createProduct.mutate({
        //   name,
        //   price: parseFloat(price),
        //   // image: imageUrl,
        // });
  const handleFileChange =(event: React.ChangeEvent<HTMLInputElement>)=>{
    const file = event.target.files?.[0]
    if(file) setSelectedFile(file)
  }
  return (
    <div className="flex w-screen flex-col items-center justify-center gap-5 p-10">
      <p className="flex items-center justify-center text-3xl capitalize">
        Create Product
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
          step="0.01"
          placeholder="Enter The Price Of The Product"
        />
       <input
          type="file"
          accept="image/*"
          placeholder="Enter The Image Of The Product"
          // onChange={(e) => setImageUrl(e.target.files?.[0] || null)} // Update the state with the File file
          className="w-full rounded-xl p-3 text-center shadow-xl"
        />
        <button
        //   disabled={createProduct.isLoading} // Fixed: Use `isLoading` (uppercase L)
          type="submit"
          className="w-full cursor-pointer rounded-xl bg-black p-3 text-center text-white shadow-xl transition-all hover:bg-gray-400 hover:text-black"
        >
          Create New Product
        </button>

        {/* Display error message */}
        {error && (
          <p className="text-center text-red-500">Error: {error}</p>
        )}

        {/* Display success message */}
        {success && (
          <p className="text-center text-green-500">
            Product created successfully!
          </p>
        )}
      </form>
      {imageUrl && <img src={imageUrl} alt="Product Image" className="w-[200px]" />}
    </div>
  );
}

export default Page;