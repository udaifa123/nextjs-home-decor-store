"use client";

import { useState } from "react";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";
import Image from "next/image";

type CartItem = {
  _id: string;
  title: string;
  price: number;
  image: string;
  qty: number;
};

export default function CartPage() {
  // ✅ FIX: initialize directly
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
const user = JSON.parse(localStorage.getItem("user") || "null");
if (!user) return [];

return JSON.parse(localStorage.getItem(`cart_${user.email}`) || "[]");
  });

  // ✅ Remove item
  const removeItem = (id: string) => {
    const updated = cart.filter((item) => item._id !== id);
    setCart(updated);
const user = JSON.parse(localStorage.getItem("user") || "null");
const key = `cart_${user.email}`;
localStorage.setItem(key, JSON.stringify(updated));
  };

  // ✅ Change quantity
  const changeQty = (id: string, type: "inc" | "dec") => {
    const updated = cart.map((item) => {
      if (item._id === id) {
        if (type === "inc") item.qty += 1;
        if (type === "dec" && item.qty > 1) item.qty -= 1;
      }
      return item;
    });

    setCart([...updated]);
const user = JSON.parse(localStorage.getItem("user") || "null");
const key = `cart_${user.email}`;
localStorage.setItem(key, JSON.stringify(updated));
  };

  // ✅ Total
  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="min-h-screen bg-[#F5F6F8] p-4 md:p-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Manrope:wght@400;500;600;700&display=swap');
        .font-display { font-family: 'Cormorant Garamond', serif; }
        body { font-family: 'Manrope', sans-serif; }
      `}</style>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link 
            href="/products" 
            className="flex items-center gap-2 text-[#6F7C8F] hover:text-[#5a6a7f] transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Continue Shopping</span>
          </Link>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <ShoppingBag className="h-6 w-6 text-[#6F7C8F]" />
          <h1 className="font-display text-3xl font-medium text-[#3A424E]">
            Your <span className="italic text-[#6F7C8F]">Cart</span>
          </h1>
          <span className="text-sm text-[#6F7C8F]/50 ml-2">
            ({cart.length} items)
          </span>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl ring-1 ring-[#6F7C8F]/10">
            <ShoppingBag className="h-16 w-16 text-[#6F7C8F]/20 mb-4" />
            <p className="text-[#4F5A6B]/50 text-lg">Your cart is empty</p>
            <Link href="/products">
              <button className="mt-4 px-6 py-2 bg-[#6F7C8F] text-white rounded-full hover:bg-[#5a6a7f] transition">
                Start Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white p-4 rounded-2xl ring-1 ring-[#6F7C8F]/10 shadow-sm hover:shadow-md transition"
              >
                {/* Left - Product Info */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <Image
  src={item.image}
  alt={item.title}
  width={80}
  height={80}
  className="w-20 h-20 object-cover rounded-xl"
/>

                  <div>
                    <h3 className="font-display text-[16px] font-medium text-[#3A424E]">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#6F7C8F] font-medium">
                      £{item.price.toFixed(2)}
                    </p>
                    <p className="text-xs text-[#6F7C8F]/50 mt-0.5">
                      Subtotal: £{(item.price * item.qty).toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Right - Controls */}
                <div className="flex items-center gap-3 mt-4 sm:mt-0 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="flex items-center gap-1 bg-[#F5F6F8] rounded-full p-1">
                    <button
                      onClick={() => changeQty(item._id, "dec")}
                      className="p-1.5 rounded-full hover:bg-white transition disabled:opacity-50"
                      disabled={item.qty <= 1}
                    >
                      <Minus className="h-3.5 w-3.5 text-[#4F5A6B]" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium text-[#3A424E]">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => changeQty(item._id, "inc")}
                      className="p-1.5 rounded-full hover:bg-white transition"
                    >
                      <Plus className="h-3.5 w-3.5 text-[#4F5A6B]" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item._id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-red-500 hover:text-red-600 transition rounded-full hover:bg-red-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Remove</span>
                  </button>
                </div>
              </div>
            ))}

            {/* Summary */}
            <div className="mt-8 bg-white p-6 rounded-2xl ring-1 ring-[#6F7C8F]/10 shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <p className="text-sm text-[#4F5A6B]/50">Total</p>
                  <h2 className="font-display text-3xl font-medium text-[#3A424E]">
                    £{total.toFixed(2)}
                  </h2>
                </div>

                <Link href="/cart/checkout" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto px-8 py-3 bg-[#6F7C8F] text-white rounded-full font-medium hover:bg-[#5a6a7f] transition shadow-lg shadow-[#6F7C8F]/20">
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}