"use client";

import { useEffect, useState } from "react";
import { Sparkles, Search, SlidersHorizontal, Package } from "lucide-react";
import AddToCartButton from "@/components/AddToCartButton";
import WishlistButton from "@/components/WishlistButton";
import Image from "next/image";

type Product = {
  _id: string;
  title: string;
  price: number;
  image: string;
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Compute filtered + sorted data (NO setState)
  const filtered = products
    .filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      return 0;
    });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F6F8] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-[#6F7C8F] border-t-transparent mx-auto" />
          <p className="mt-4 text-[#4F5A6B]/50">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F6F8] p-4 md:p-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Manrope:wght@400;500;600;700&display=swap');
        .font-display { font-family: 'Cormorant Garamond', serif; }
        body { font-family: 'Manrope', sans-serif; }
      `}</style>

      {/* Ambient glows */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#6F7C8F]/[0.08] blur-3xl" />
        <div className="absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full bg-[#6F7C8F]/[0.06] blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-[#6F7C8F]/[0.04] blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Package className="h-6 w-6 text-[#6F7C8F]" />
          <h1 className="font-display text-3xl font-medium text-[#3A424E]">
            Our <span className="italic text-[#6F7C8F]">Collection</span>
          </h1>
          <span className="text-sm text-[#6F7C8F]/50 ml-2">
            ({filtered.length} products)
          </span>
        </div>

        {/* 🔍 FILTER UI */}
        <div className="bg-white p-4 rounded-2xl ring-1 ring-[#6F7C8F]/10 shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6F7C8F]/40" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#6F7C8F]/15 bg-[#F5F6F8] text-[#3A424E] placeholder:text-[#6F7C8F]/30 outline-none focus:border-[#6F7C8F] focus:ring-2 focus:ring-[#6F7C8F]/20 transition"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="relative sm:w-48">
              <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6F7C8F]/40" />
              <select
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#6F7C8F]/15 bg-[#F5F6F8] text-[#3A424E] outline-none focus:border-[#6F7C8F] focus:ring-2 focus:ring-[#6F7C8F]/20 transition appearance-none cursor-pointer"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="">Sort by</option>
                <option value="low">Price: Low → High</option>
                <option value="high">Price: High → Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* PRODUCTS */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl ring-1 ring-[#6F7C8F]/10">
            <Sparkles className="h-16 w-16 text-[#6F7C8F]/20 mb-4" />
            <p className="text-[#4F5A6B]/50 text-lg">No products found</p>
            <p className="text-sm text-[#4F5A6B]/30 mt-1">Try adjusting your search</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <div
                key={p._id}
                className="group bg-white rounded-2xl overflow-hidden ring-1 ring-[#6F7C8F]/10 shadow-sm hover:shadow-lg transition duration-300"
              >
                <div className="relative overflow-hidden aspect-square">
                <Image
  src={p.image}
  alt={p.title}
  fill
  className="object-cover transition duration-500 group-hover:scale-105"
/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
                  <div className="absolute top-3 right-3">
                    <WishlistButton product={p} />
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-display text-[16px] font-medium text-[#3A424E] line-clamp-1">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-[#6F7C8F]">
                    £{p.price.toFixed(2)}
                  </p>

                  <div className="mt-4">
                    <AddToCartButton product={p} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}