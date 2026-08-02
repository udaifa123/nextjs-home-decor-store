async function getCount(url: string) {
  try {
    const res = await fetch(url, {
      cache: "no-store",
    });

    if (!res.ok) return 0;

    const data = await res.json();

    if (Array.isArray(data)) return data.length;
    if (Array.isArray(data.orders)) return data.orders.length;

    return 0;
  } catch {
    return 0;
  }
}



export default async function AdminDashboard() {

  const totalProducts = await getCount(
    "http://localhost:3000/api/products"
  );


  const totalOrders = await getCount(
    "http://localhost:3000/api/orders"
  );


  const totalUsers = await getCount(
    "http://localhost:3000/api/users"
  );



  return (
    <div className="min-h-screen bg-[#6F7C8F] p-5 text-white">


      <h1 className="font-display text-3xl font-medium mb-6">
        Admin Dashboard
      </h1>



      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">


        {/* PRODUCTS */}

        <div className="bg-white/10 p-4 rounded-2xl ring-1 ring-white/20">

          <h2 className="text-sm text-white/70">
            Total Products
          </h2>

          <p className="text-3xl mt-1">
            {totalProducts}
          </p>

        </div>




        {/* ORDERS */}

        <div className="bg-white/10 p-4 rounded-2xl ring-1 ring-white/20">

          <h2 className="text-sm text-white/70">
            Total Orders
          </h2>

          <p className="text-3xl mt-1">
            {totalOrders}
          </p>

        </div>




        {/* USERS */}

        <div className="bg-white/10 p-4 rounded-2xl ring-1 ring-white/20">

          <h2 className="text-sm text-white/70">
            Users
          </h2>

          <p className="text-3xl mt-1">
            {totalUsers}
          </p>

        </div>


      </div>

    </div>
  );
}