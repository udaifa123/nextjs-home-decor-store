"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Heart, 
  Trash2, 
  ShoppingBag, 
  Sparkles,
  X
} from "lucide-react";

type Product = {
  _id: string;
  title: string;
  price: number;
  image: string;
};

export default function WishlistPage() {
const [wishlist, setWishlist] = useState<Product[]>(() => {
  if (typeof window === "undefined") return [];

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const key = `wishlist_${user.email}`;

  return JSON.parse(localStorage.getItem(key) || "[]");
});

  const removeWishlist = (id: string) => {
    const updated = wishlist.filter((item) => item._id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const clearWishlist = () => {
    if (wishlist.length === 0) return;
    if (confirm("Are you sure you want to clear your wishlist?")) {
      setWishlist([]);
      localStorage.setItem("wishlist", "[]");
    }
  };

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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <Heart className="h-6 w-6 text-[#6F7C8F] fill-[#6F7C8F]" />
            <h1 className="font-display text-3xl font-medium text-[#3A424E]">
              My <span className="italic text-[#6F7C8F]">Wishlist</span>
            </h1>
            <span className="text-sm text-[#6F7C8F]/50 ml-2">
              ({wishlist.length} items)
            </span>
          </div>

          {wishlist.length > 0 && (
            <div className="flex gap-3">
              <button
                onClick={clearWishlist}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-500 hover:text-red-600 transition rounded-lg hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
                Clear All
              </button>
            </div>
          )}
        </div>

        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl ring-1 ring-[#6F7C8F]/10">
            <Heart className="h-16 w-16 text-[#6F7C8F]/20 mb-4" />
            <p className="text-[#4F5A6B]/50 text-lg">Your wishlist is empty</p>
            <p className="text-sm text-[#4F5A6B]/30 mt-1">Start adding items you love</p>
            <Link href="/products">
              <button className="mt-6 px-6 py-2.5 bg-[#6F7C8F] text-white rounded-full hover:bg-[#5a6a7f] transition shadow-lg shadow-[#6F7C8F]/20 flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                Browse Products
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <div
                key={product._id}
                className="group bg-white rounded-2xl overflow-hidden ring-1 ring-[#6F7C8F]/10 shadow-sm hover:shadow-lg transition duration-300"
              >
                {/* Image */}
                <div className="relative overflow-hidden aspect-square">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
                  
                  {/* Remove button overlay */}
                  <button
                    onClick={() => removeWishlist(product._id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white shadow-md transition hover:scale-110"
                    aria-label="Remove from wishlist"
                  >
                    <X className="h-4 w-4 text-[#6F7C8F]" />
                  </button>
                </div>

                {/* Details */}
                <div className="p-4">
                  <h3 className="font-display text-[16px] font-medium text-[#3A424E] line-clamp-1">
                    {product.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-[#6F7C8F]">
                    £{product.price.toFixed(2)}
                  </p>

                  <div className="mt-4 flex gap-2">
                    <Link href={`/products/${product._id}`} className="flex-1">
                      <button className="w-full px-4 py-2 text-sm font-medium text-[#6F7C8F] border-2 border-[#6F7C8F]/20 rounded-full hover:bg-[#6F7C8F] hover:text-white transition">
                        View Details
                      </button>
                    </Link>
                    <button
                      onClick={() => removeWishlist(product._id)}
                      className="px-4 py-2 text-sm font-medium text-red-500 border-2 border-red-200 rounded-full hover:bg-red-50 transition"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
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