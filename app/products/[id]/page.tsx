"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditProduct() {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  // ✅ FETCH SINGLE PRODUCT
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();

      setTitle(data.title);
      setPrice(data.price);
      setImage(data.image);
    };

    if (id) fetchProduct();
  }, [id]);

  // ✅ UPDATE PRODUCT
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        price: Number(price),
        image,
      }),
    });

    if (res.ok) {
      alert("Updated ✅");
      router.push("/admin/products");
    } else {
      alert("Error ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#6F7C8F]">
      <form
        onSubmit={handleUpdate}
        className="bg-white/10 p-8 rounded-xl w-96"
      >
        <h1 className="text-white text-xl mb-4">Edit Product</h1>

        <input
          className="w-full mb-3 p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />

        <input
          className="w-full mb-3 p-2 rounded"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
        />

        <input
          className="w-full mb-3 p-2 rounded"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image URL"
        />

        <button className="w-full bg-blue-500 py-2 rounded text-white">
          Update Product
        </button>
      </form>
    </div>
  );
}