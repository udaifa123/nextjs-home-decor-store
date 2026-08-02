"use client";

import { Heart } from "lucide-react";
import { useState } from "react";

type Product = {
  _id: string;
  title: string;
  price: number;
  image: string;
};

export default function WishlistButton({
  product,
}: {
  product: Product;
}) {

  const [liked, setLiked] = useState(false);


  const addWishlist = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const key = `wishlist_${user.email}`;

  const wishlist = JSON.parse(localStorage.getItem(key) || "[]");

  const exists = wishlist.find(
    (item: Product) => item._id === product._id
  );

  let updated;

  if (exists) {
    updated = wishlist.filter(
      (item: Product) => item._id !== product._id
    );
    setLiked(false);
  } else {
    updated = [...wishlist, product];
    setLiked(true);
  }

  localStorage.setItem(key, JSON.stringify(updated));
};


  return (
    <button
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    addWishlist();
  }}
  className="absolute right-4 top-4 z-10 bg-white rounded-full p-2 shadow"
>
  <Heart
    className={`h-5 w-5 ${
      liked
        ? "fill-red-500 text-red-500"
        : "text-[#6F7C8F]"
    }`}
  />
</button>
  );
}