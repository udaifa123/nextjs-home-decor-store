"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Trash2, Pencil, PackageX } from "lucide-react";
import Image from "next/image";

type Product = {
  _id: string;
  title: string;
  price: number;
  image: string;
};

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

 

  // ✅ DELETE
  const deleteProduct = async (id: string) => {
    try {
      await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

 useEffect(() => {
  const loadProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();

      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  loadProducts();
}, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#6F7C8F] flex items-center justify-center">
        <p className="text-sm text-white/50">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#6F7C8F] p-6">
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

      <div className="container relative mx-auto max-w-4xl">
        <div className="mb-8">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
            Admin
          </span>
          <h1 className="mt-2 font-display text-3xl font-medium tracking-tight text-white">
            Manage <span className="italic text-white/90">Products</span>
          </h1>
          <p className="mt-1 text-sm text-white/60">
            {products.length} products in catalog
          </p>
        </div>

        {products.length === 0 ? (
          <div className="flex flex-col items-center rounded-2xl bg-white/10 py-16 ring-1 ring-white/20">
            <PackageX className="h-8 w-8 text-white/30" />
            <p className="mt-3 text-sm text-white/50">No products found</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {products.map((p) => (
              <div
                key={p._id}
                className="flex items-center justify-between gap-4 rounded-2xl bg-white/10 p-4 ring-1 ring-white/20 backdrop-blur-sm transition hover:bg-white/20"
              >
                <div className="flex items-center gap-4 flex-1">
                 <Image
  src={p.image}
  alt={p.title}
  width={64}
  height={64}
  className="h-16 w-16 rounded-xl object-cover ring-1 ring-white/20"
/>
                  <div>
                    <h3 className="font-display text-[16px] font-medium text-white">
                      {p.title}
                    </h3>
                    <p className="mt-0.5 text-sm font-light text-white/80">
                      £{p.price}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  {/* ✏️ EDIT */}
                  <Link href={`/admin/products/${p._id}`}>
                    <button className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white/70 transition hover:border-white/40 hover:bg-white/20 hover:text-white">
                      <Pencil className="h-3.5 w-3.5" />
                      Edit
                    </button>
                  </Link>

                  {/* 🗑 DELETE */}
                  <button
                    onClick={() => deleteProduct(p._id)}
                    className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white/70 transition hover:border-white/40 hover:bg-white/20 hover:text-white"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}