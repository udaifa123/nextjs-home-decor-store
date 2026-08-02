"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";

export default function AddProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("/api/products", {
      method: "POST",
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
      alert("Product Added ✅");
      setTitle("");
      setPrice("");
      setImage("");
    } else {
      alert("Error ❌");
    }
  };

  return (
    <div className="min-h-screen bg-[#6F7C8F] flex items-center justify-center px-4">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Manrope:wght@400;500;600;700&display=swap');
        .font-display { font-family: 'Cormorant Garamond', serif; }
        body { font-family: 'Manrope', sans-serif; }
      `}</style>

      {/* Ambient glows */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#5a6a7f]/30 blur-3xl" />
        <div className="absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full bg-[#4a5a6f]/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-[#3a4a5f]/15 blur-3xl" />
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-3xl bg-white/10 p-8 ring-1 ring-white/20 backdrop-blur-sm shadow-2xl shadow-black/30"
      >
        <div className="flex justify-center mb-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/30">
            <Sparkles className="h-5 w-5 text-white" />
          </span>
        </div>

        <h1 className="text-2xl font-light text-white text-center">
          Add <span className="font-serif italic text-white/90">Product</span>
        </h1>
        <p className="text-sm text-white/60 text-center mb-6">
          Fill in the details below
        </p>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-white/70">Product Title</label>
            <input
              placeholder="e.g. Velvet Sofa"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-white focus:ring-2 focus:ring-white/30"
            />
          </div>

          <div>
            <label className="text-sm text-white/70">Price (£)</label>
            <input
              placeholder="0.00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-white focus:ring-2 focus:ring-white/30"
            />
          </div>

          <div>
            <label className="text-sm text-white/70">Image URL</label>
            <input
              placeholder="https://..."
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="mt-1 w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-white focus:ring-2 focus:ring-white/30"
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-white py-3 text-sm font-medium tracking-wide text-[#6F7C8F] transition hover:bg-white/90"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}