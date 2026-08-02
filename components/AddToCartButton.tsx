"use client";

type Product = {
  _id: string;
  title: string;
  price: number;
  image: string;
};

type CartItem = Product & {
  qty: number;
};

export default function AddToCartButton({ product }: { product: Product }) {
  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();

    // ✅ get current user
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user) {
      alert("Login first");
      return;
    }

    const key = `cart_${user.email}`;

    const existing: CartItem[] = JSON.parse(
      localStorage.getItem(key) || "[]"
    );

    const already = existing.find(
      (item) => item._id === product._id
    );

    if (already) {
      already.qty += 1;
    } else {
      existing.push({ ...product, qty: 1 });
    }

    localStorage.setItem(key, JSON.stringify(existing));

    alert("Added to cart 🛒");
  };

  return (
    <button
      onClick={handleAdd}
      className="mt-4 w-full rounded-full border border-[#6F7C8F]/25 bg-white py-2.5 text-xs font-medium tracking-wide text-[#3A424E] hover:bg-[#6F7C8F] hover:text-white"
    >
      Add to Cart
    </button>
  );
}