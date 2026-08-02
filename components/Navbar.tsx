"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Home,
  Package,
  ShoppingCart,
  ClipboardList,
  LogIn,
  UserPlus,
  LogOut,
  User,
  Heart,
  Menu,
  X,
} from "lucide-react";

export default function Navbar() {
  const [isUser, setIsUser] = useState(false);
  const [checked, setChecked] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

useEffect(() => {
  const checkUser = () => {
    const user = localStorage.getItem("user");
    setIsUser(!!user);

    const storedAvatar = localStorage.getItem("user_avatar");
    setAvatar(storedAvatar);

    setChecked(true);
  };

  checkUser();

  // 👇 ADD THIS LINE (important)
  window.addEventListener("userChanged", checkUser);

  return () => window.removeEventListener("userChanged", checkUser);
}, []);

  if (!checked) return null;
const handleLogout = () => {
  localStorage.removeItem("user");   // ✅ remove user

  // ✅ trigger navbar update
  window.dispatchEvent(new Event("userChanged"));

  setIsUser(false);
  setAvatar(null);

  window.location.href = "/";
};

  // Navigation links
  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/products", label: "Products", icon: Package },
    { href: "/cart", label: "Cart", icon: ShoppingCart },
  ];

  const userLinks = [
    { href: "/orders", label: "Orders", icon: ClipboardList },
    { href: "/wishlist", label: "Wishlist", icon: Heart },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-[#6F7C8F]/15 bg-white/95 backdrop-blur-md px-4 md:px-8 shadow-sm">
      <div className="flex h-20 md:h-24 items-center justify-between max-w-7xl mx-auto">

        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/logo3.png"
            alt="NOVALIE"
            width={200}
            height={80}
            className="w-[300px] md:w-[450px] h-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {/* Main links */}
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#4F5A6B] hover:text-[#6F7C8F] rounded-lg hover:bg-[#6F7C8F]/10 transition"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}

          {/* User-specific links */}
          {isUser && (
            <>
              {userLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#4F5A6B] hover:text-[#6F7C8F] rounded-lg hover:bg-[#6F7C8F]/10 transition"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              ))}
            </>
          )}

          <div className="w-px h-6 bg-[#6F7C8F]/20 mx-2" />

          {/* Auth Section */}
          {!isUser ? (
            <>
              <Link
                href="/user-login"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#4F5A6B] hover:text-[#6F7C8F] rounded-lg hover:bg-[#6F7C8F]/10 transition"
              >
                <LogIn className="h-4 w-4" />
                Login
              </Link>

              <Link
                href="/register"
                className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-[#6F7C8F] rounded-lg hover:bg-[#5a6a7f] transition shadow-sm"
              >
                <UserPlus className="h-4 w-4" />
                Register
              </Link>
            </>
          ) : (
            <>
              {/* Profile with Avatar */}
              <Link
                href="/profile"
                className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-[#6F7C8F]/10 transition group"
              >
                {avatar ? (
                  <img
                    src={avatar}
                    alt="Profile"
                    className="h-8 w-8 rounded-full object-cover ring-2 ring-[#6F7C8F]/30 group-hover:ring-[#6F7C8F]/50 transition"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-[#6F7C8F]/10 flex items-center justify-center ring-2 ring-[#6F7C8F]/20 group-hover:ring-[#6F7C8F]/40 transition">
                    <User className="h-4 w-4 text-[#6F7C8F]" />
                  </div>
                )}
                <span className="text-sm font-medium text-[#4F5A6B] group-hover:text-[#6F7C8F] transition">
                  Profile
                </span>
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg transition"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg hover:bg-[#6F7C8F]/10 transition"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-[#4F5A6B]" />
          ) : (
            <Menu className="h-6 w-6 text-[#4F5A6B]" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#6F7C8F]/10 bg-white py-4 px-4 shadow-lg">
          <div className="flex flex-col gap-2">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#4F5A6B] hover:text-[#6F7C8F] rounded-lg hover:bg-[#6F7C8F]/10 transition"
              >
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            ))}

            {isUser && (
              <>
                {userLinks.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#4F5A6B] hover:text-[#6F7C8F] rounded-lg hover:bg-[#6F7C8F]/10 transition"
                  >
                    <Icon className="h-5 w-5" />
                    {label}
                  </Link>
                ))}
              </>
            )}

            <div className="border-t border-[#6F7C8F]/10 my-2" />

            {!isUser ? (
              <>
                <Link
                  href="/user-login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#4F5A6B] hover:text-[#6F7C8F] rounded-lg hover:bg-[#6F7C8F]/10 transition"
                >
                  <LogIn className="h-5 w-5" />
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-white bg-[#6F7C8F] rounded-lg hover:bg-[#5a6a7f] transition"
                >
                  <UserPlus className="h-5 w-5" />
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#4F5A6B] hover:text-[#6F7C8F] rounded-lg hover:bg-[#6F7C8F]/10 transition"
                >
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="Profile"
                      className="h-6 w-6 rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg transition"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}