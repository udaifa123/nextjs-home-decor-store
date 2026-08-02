"use client";

import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#6F7C8F] text-white mt-10">
      
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
        
        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-semibold mb-3">NOVALIE</h2>
          <p className="text-sm text-white/70">
            Elegant home decor crafted to bring comfort, beauty, and style to your living space.
          </p>
        </div>

        {/* LINKS */}
        <div>
          <h3 className="text-lg font-medium mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li><Link href="/products" className="hover:text-white">Products</Link></li>
            <li><Link href="/cart" className="hover:text-white">Cart</Link></li>
            <li><Link href="/orders" className="hover:text-white">Orders</Link></li>
            <li><Link href="/profile" className="hover:text-white">Profile</Link></li>
          </ul>
        </div>

        {/* SOCIAL */}
        <div>
          <h3 className="text-lg font-medium mb-3">Follow Us</h3>
          <div className="flex gap-4 text-lg">
  <FaFacebook className="cursor-pointer hover:text-white/70" />
  <FaInstagram className="cursor-pointer hover:text-white/70" />
  <FaTwitter className="cursor-pointer hover:text-white/70" />
</div>

          <p className="text-sm text-white/70 mt-4">
            Email: support@novalie.com
          </p>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-white/20 text-center text-sm py-4 text-white/70">
        © {new Date().getFullYear()} NOVALIE. All rights reserved.
      </div>
    </footer>
  );
}