"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Sparkles, LogOut } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const linkStyle = (path: string) =>
    `block px-3 py-2 rounded-lg transition ${
      pathname === path
        ? "bg-white/20 text-white font-medium" 
        : "text-white/70 hover:bg-white/10 hover:text-white"
    }`;

  const handleLogout = () => {
    document.cookie = "isAdmin=; path=/; max-age=0";
    router.push("/login");
  };

  return (
    <aside className="w-64 bg-[#5a6a7f]/50 p-5 space-y-2 backdrop-blur-sm border-r border-white/10 flex flex-col min-h-screen text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Manrope:wght@400;500;600;700&display=swap');
        .font-display { font-family: 'Cormorant Garamond', serif; }
      `}</style>

      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="h-5 w-5 text-white" />
        <h1 className="font-display text-xl font-semibold text-white">Admin</h1>
      </div>

      <nav className="flex-1 space-y-1">
        <Link href="/admin" className={linkStyle("/admin")}>
          Dashboard
        </Link>

        <Link href="/admin/add-product" className={linkStyle("/admin/add-product")}>
          Add Product
        </Link>

        <Link href="/admin/products" className={linkStyle("/admin/products")}>
          Manage Products
        </Link>
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition w-full mt-4"
      >
        <LogOut className="h-4 w-4" />
        <span>Logout</span>
      </button>
    </aside>
  );
}