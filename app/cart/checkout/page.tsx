"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ShoppingBag, 
  MapPin, 
  User, 
  Phone, 
  CreditCard,
  ArrowLeft,
  CheckCircle
} from "lucide-react";


type CartItem = {
  _id: string;
  title: string;
  price: number;
  image: string;
  qty: number;
};

export default function CheckoutPage() {
  const router = useRouter();

const [cart] = useState<CartItem[]>(() => {
  if (typeof window === "undefined") return [];

  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (!user) return [];

  return JSON.parse(localStorage.getItem(`cart_${user.email}`) || "[]");
});
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

const total = cart.reduce(
  (acc: number, item: CartItem) => acc + item.price * item.qty,
  0
);
  // ✅ FIX: move condition here
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#F5F6F8] flex items-center justify-center px-4">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Manrope:wght@400;500;600;700&display=swap');
          .font-display { font-family: 'Cormorant Garamond', serif; }
          body { font-family: 'Manrope', sans-serif; }
        `}</style>
        <div className="text-center">
          <ShoppingBag className="h-16 w-16 text-[#6F7C8F]/20 mx-auto mb-4" />
          <h1 className="font-display text-2xl text-[#3A424E]">Your cart is empty</h1>
          <p className="text-[#4F5A6B]/50 mt-2">Add some items to checkout</p>
          <button 
            onClick={() => router.push("/products")}
            className="mt-4 px-6 py-2 bg-[#6F7C8F] text-white rounded-full hover:bg-[#5a6a7f] transition"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }
const handleOrder = async () => {
  if (!name || !address || !phone) {
    alert("Please fill all details ❌");
    return;
  }


  const user = JSON.parse(localStorage.getItem("user") || "null");


  if (!user) {
    alert("Please login first ❌");
    return;
  }


  const newOrder = {
    userId: user.email,   // 👈 ADD THIS

    name,
    address,
    phone,
    items: cart,
    total,
    date: new Date().toLocaleString(),
  };


  await fetch("/api/orders", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(newOrder),
  });


  localStorage.removeItem(`cart_${user.email}`);


  router.push("/cart/success");
};

  return (
    <div className="min-h-screen bg-[#F5F6F8] p-4 md:p-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Manrope:wght@400;500;600;700&display=swap');
        .font-display { font-family: 'Cormorant Garamond', serif; }
        body { font-family: 'Manrope', sans-serif; }
      `}</style>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button 
            onClick={() => router.push("/cart")}
            className="flex items-center gap-2 text-[#6F7C8F] hover:text-[#5a6a7f] transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back to Cart</span>
          </button>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <CreditCard className="h-6 w-6 text-[#6F7C8F]" />
          <h1 className="font-display text-3xl font-medium text-[#3A424E]">
            Checkout
          </h1>
          <span className="text-sm text-[#6F7C8F]/50 ml-2">
            ({cart.length} items)
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* LEFT - Shipping Details */}
          <div className="bg-white p-6 rounded-2xl ring-1 ring-[#6F7C8F]/10 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="h-5 w-5 text-[#6F7C8F]" />
              <h2 className="font-display text-xl font-medium text-[#3A424E]">
                Shipping <span className="italic text-[#6F7C8F]">Details</span>
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[#4F5A6B] flex items-center gap-2">
                  <User className="h-4 w-4 text-[#6F7C8F]" />
                  Full Name
                </label>
                <input
                  placeholder="John Doe"
                  className="mt-1 w-full rounded-lg border border-[#6F7C8F]/15 px-4 py-2.5 text-sm text-[#3A424E] placeholder:text-[#6F7C8F]/30 outline-none focus:border-[#6F7C8F] focus:ring-2 focus:ring-[#6F7C8F]/20 transition"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-[#4F5A6B] flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#6F7C8F]" />
                  Delivery Address
                </label>
                <input
                  placeholder="123 Main St, City, Country"
                  className="mt-1 w-full rounded-lg border border-[#6F7C8F]/15 px-4 py-2.5 text-sm text-[#3A424E] placeholder:text-[#6F7C8F]/30 outline-none focus:border-[#6F7C8F] focus:ring-2 focus:ring-[#6F7C8F]/20 transition"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-[#4F5A6B] flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[#6F7C8F]" />
                  Phone Number
                </label>
                <input
                  placeholder="+1 234 567 890"
                  className="mt-1 w-full rounded-lg border border-[#6F7C8F]/15 px-4 py-2.5 text-sm text-[#3A424E] placeholder:text-[#6F7C8F]/30 outline-none focus:border-[#6F7C8F] focus:ring-2 focus:ring-[#6F7C8F]/20 transition"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* RIGHT - Order Summary */}
          <div className="bg-white p-6 rounded-2xl ring-1 ring-[#6F7C8F]/10 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <ShoppingBag className="h-5 w-5 text-[#6F7C8F]" />
              <h2 className="font-display text-xl font-medium text-[#3A424E]">
                Order <span className="italic text-[#6F7C8F]">Summary</span>
              </h2>
            </div>

            <div className="space-y-3 max-h-64 overflow-auto pr-2">
              {cart.map((item) => (
                <div key={item._id} className="flex items-center gap-3 py-2 border-b border-[#6F7C8F]/5">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 object-cover rounded-lg ring-1 ring-[#6F7C8F]/10"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#3A424E]">{item.title}</p>
                    <p className="text-xs text-[#6F7C8F]/50">Qty: {item.qty}</p>
                  </div>
                  <span className="text-sm font-medium text-[#6F7C8F]">
                    £{(item.price * item.qty).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <hr className="my-4 border-[#6F7C8F]/10" />

            <div className="space-y-2">
              <div className="flex justify-between text-sm text-[#4F5A6B]">
                <span>Subtotal</span>
                <span>£{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-[#4F5A6B]">
                <span>Shipping</span>
                <span className="text-[#6F7C8F]">Free</span>
              </div>
              <div className="flex justify-between text-sm text-[#4F5A6B]">
                <span>Tax</span>
                <span>£{(total * 0.1).toFixed(2)}</span>
              </div>
              <hr className="my-2 border-[#6F7C8F]/10" />
              <div className="flex justify-between items-center">
                <span className="font-display text-lg font-medium text-[#3A424E]">Total</span>
                <span className="font-display text-2xl font-medium text-[#6F7C8F]">
                  £{(total * 1.1).toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={handleOrder}
              className="mt-6 w-full bg-[#6F7C8F] text-white py-3 rounded-full font-medium hover:bg-[#5a6a7f] transition shadow-lg shadow-[#6F7C8F]/20 flex items-center justify-center gap-2"
            >
              <CheckCircle className="h-4 w-4" />
              Place Order
            </button>

            <p className="text-xs text-[#6F7C8F]/40 text-center mt-3">
              By placing an order, you agree to our Terms & Conditions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}