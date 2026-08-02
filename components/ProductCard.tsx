import WishlistButton from "./WishlistButton";

type Product = {
  _id: string;
  title: string;
  price: number;
  image: string;
};


export default function ProductCard({
  product,
}: {
  product: Product;
}) {

  return (
    <div className="border rounded-xl p-4">

      <img
        src={product.image}
        alt={product.title}
        className="h-48 w-full object-cover"
      />

      <h2 className="font-semibold">
        {product.title}
      </h2>

      <p>
        ₹{product.price}
      </p>


      <WishlistButton product={product}/>

    </div>
  );
}