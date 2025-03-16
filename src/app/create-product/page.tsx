"use client";

import React, { useState } from "react";
import { api } from "@/trpc/react";

function Page() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const createProduct = api.product.createProduct.useMutation({
    onSuccess: () => {
      console.log(name, price);
      setSuccess(true);
      setError(null);
      setName("");
      setPrice("");
    },
    onError: (error) => {
      setError(error.message);
      setSuccess(false);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Call the mutation
    createProduct.mutate({
      name,
      price: parseFloat(price),
    });
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-5">
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
    </div>
  );
}

export default Page;