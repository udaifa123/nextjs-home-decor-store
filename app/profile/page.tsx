"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { User, LogOut, ChevronRight, Mail, Phone, Package, Heart, Settings, Sparkles, Camera, X } from "lucide-react";
import Image from "next/image";

type UserType = {
  name: string;
  email: string;
  phone: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ✅ FIX 1: USER STATE - Load directly in useState (NO useEffect)
  const [user] = useState<UserType | null>(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });

  // ✅ FIX 2: AVATAR - Load directly in useState (NO useEffect)
  const [avatar, setAvatar] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("user_avatar");
    }
    return null;
  });

  const [isHovering, setIsHovering] = useState(false);

  // ✅ FIX 3: COUNTS - Load directly (NO useEffect)
  const email = user?.email || "";

  const wishlistCount = (() => {
    if (typeof window !== "undefined" && email) {
      const data = localStorage.getItem(`wishlist_${email}`);
      return data ? JSON.parse(data).length : 0;
    }
    return 0;
  })();

  const ordersCount = (() => {
    if (typeof window !== "undefined" && email) {
      const data = localStorage.getItem(`orders_${email}`);
      return data ? JSON.parse(data).length : 0;
    }
    return 0;
  })();

  // ✅ FIX 4: REDIRECT - This is OK (no setState inside)
  useEffect(() => {
    if (user === null) {
      router.push("/user-login");
    }
  }, [user, router]);

  // ✅ LOGOUT - Keeps avatar in localStorage
  const handleLogout = () => {
    document.cookie = "isUser=; path=/; max-age=0";
    router.push("/");
  };

  // ✅ HANDLE AVATAR UPLOAD
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const avatarUrl = event.target?.result as string;
      setAvatar(avatarUrl);
      localStorage.setItem("user_avatar", avatarUrl);
    };
    reader.readAsDataURL(file);
  };

  // ✅ REMOVE AVATAR
  const removeAvatar = () => {
    if (confirm('Remove your profile photo?')) {
      setAvatar(null);
      localStorage.removeItem("user_avatar");
    }
  };

  // ✅ TRIGGER FILE INPUT
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // ✅ Loading state while checking user
  if (user === undefined) {
    return (
      <div className="min-h-screen bg-[#F5F6F8] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-[#6F7C8F] border-t-transparent mx-auto" />
          <p className="mt-4 text-[#4F5A6B]/50">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
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

      <div className="max-w-4xl mx-auto">
        {/* HEADER */}
        <div className="flex items-center gap-3 mb-8">
          <User className="h-6 w-6 text-[#6F7C8F]" />
          <h1 className="font-display text-3xl font-medium text-[#3A424E]">
            My <span className="italic text-[#6F7C8F]">Profile</span>
          </h1>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* LEFT - Profile Card */}
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-sm ring-1 ring-[#6F7C8F]/10 text-center">
              {/* Avatar with Upload */}
              <div 
                className="relative inline-block mx-auto mb-3"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="absolute inset-0 bg-[#6F7C8F]/10 rounded-full blur-xl scale-150" />
                
                {/* Avatar Image */}
                <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-[#6F7C8F]/10 ring-1 ring-[#6F7C8F]/20 mx-auto overflow-hidden">
                  {avatar ? (
                   <Image
  src={avatar}
  alt={user.name}
  width={112}
  height={112}
/>
                  ) : (
                    <span className="font-display text-4xl font-medium text-[#6F7C8F]">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>

                {/* Camera Overlay - appears on hover */}
                {isHovering && (
                  <div 
                    className="absolute inset-0 flex flex-col items-center justify-center rounded-full bg-black/50 cursor-pointer transition"
                    onClick={triggerFileInput}
                  >
                    <Camera className="h-8 w-8 text-white mb-1" />
                    <span className="text-white text-xs font-medium">Change Photo</span>
                  </div>
                )}

                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
              </div>

              {/* Edit Avatar Buttons */}
              <div className="flex items-center justify-center gap-3 mb-3">
                <button
                  onClick={triggerFileInput}
                  className="text-xs text-[#6F7C8F] hover:text-[#5a6a7f] transition font-medium flex items-center gap-1"
                >
                  <Camera className="h-3.5 w-3.5" />
                  Change Photo
                </button>
                {avatar && (
                  <>
                    <span className="text-[#6F7C8F]/20">|</span>
                    <button
                      onClick={removeAvatar}
                      className="text-xs text-red-500 hover:text-red-600 transition font-medium flex items-center gap-1"
                    >
                      <X className="h-3.5 w-3.5" />
                      Remove
                    </button>
                  </>
                )}
              </div>

              <h2 className="font-display text-xl font-medium text-[#3A424E]">
                {user.name}
              </h2>
              <p className="text-sm text-[#4F5A6B]/50 mt-1">{user.email}</p>

              {/* COUNTS */}
              <div className="mt-4 pt-4 border-t border-[#6F7C8F]/10">
                <div className="flex items-center justify-center gap-6">
                  <div className="text-center">
                    <p className="font-display text-2xl font-medium text-[#6F7C8F]">
                      {ordersCount}
                    </p>
                    <p className="text-xs text-[#4F5A6B]/50">Orders</p>
                  </div>
                  <div className="w-px h-10 bg-[#6F7C8F]/10" />
                  <div className="text-center">
                    <p className="font-display text-2xl font-medium text-[#6F7C8F]">
                      {wishlistCount}
                    </p>
                    <p className="text-xs text-[#4F5A6B]/50">Wishlist</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="mt-6 w-full flex items-center justify-center gap-2 bg-red-50 text-red-500 py-2.5 rounded-lg font-medium hover:bg-red-100 transition"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>

          {/* RIGHT - Details & Actions */}
          <div className="md:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white p-6 rounded-2xl shadow-sm ring-1 ring-[#6F7C8F]/10">
              <h3 className="font-display text-lg font-medium text-[#3A424E] mb-4">
                Personal Information
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F5F6F8]">
                  <User className="h-5 w-5 text-[#6F7C8F] mt-0.5" />
                  <div>
                    <p className="text-xs text-[#6F7C8F]/50">Full Name</p>
                    <p className="font-medium text-[#3A424E]">{user.name}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F5F6F8]">
                  <Mail className="h-5 w-5 text-[#6F7C8F] mt-0.5" />
                  <div>
                    <p className="text-xs text-[#6F7C8F]/50">Email Address</p>
                    <p className="font-medium text-[#3A424E]">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F5F6F8]">
                  <Phone className="h-5 w-5 text-[#6F7C8F] mt-0.5" />
                  <div>
                    <p className="text-xs text-[#6F7C8F]/50">Phone Number</p>
                    <p className="font-medium text-[#3A424E]">{user.phone || "Not provided"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 gap-3">
              <div
                onClick={() => router.push("/orders")}
                className="group bg-white p-4 rounded-2xl shadow-sm ring-1 ring-[#6F7C8F]/10 hover:shadow-md transition cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-[#6F7C8F]/10 group-hover:bg-[#6F7C8F]/20 transition">
                    <Package className="h-5 w-5 text-[#6F7C8F]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#3A424E] text-sm">My Orders</p>
                    <p className="text-xs text-[#4F5A6B]/50">View order history</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-[#4F5A6B]/30 group-hover:text-[#6F7C8F] transition" />
              </div>

              <div
                onClick={() => router.push("/wishlist")}
                className="group bg-white p-4 rounded-2xl shadow-sm ring-1 ring-[#6F7C8F]/10 hover:shadow-md transition cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-[#6F7C8F]/10 group-hover:bg-[#6F7C8F]/20 transition">
                    <Heart className="h-5 w-5 text-[#6F7C8F]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#3A424E] text-sm">Wishlist</p>
                    <p className="text-xs text-[#4F5A6B]/50">View saved items</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-[#4F5A6B]/30 group-hover:text-[#6F7C8F] transition" />
              </div>

              <div
                onClick={() => router.push("/settings")}
                className="group bg-white p-4 rounded-2xl shadow-sm ring-1 ring-[#6F7C8F]/10 hover:shadow-md transition cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-[#6F7C8F]/10 group-hover:bg-[#6F7C8F]/20 transition">
                    <Settings className="h-5 w-5 text-[#6F7C8F]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#3A424E] text-sm">Account Settings</p>
                    <p className="text-xs text-[#4F5A6B]/50">Manage your account</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-[#4F5A6B]/30 group-hover:text-[#6F7C8F] transition" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-2 text-xs text-[#6F7C8F]/30">
            <Sparkles className="h-3 w-3" />
            <span>NOVALIE</span>
            <Sparkles className="h-3 w-3" />
          </div>
        </div>
      </div>
    </div>
  );
}