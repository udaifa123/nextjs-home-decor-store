"use client";

import { useEffect, useState } from "react";
// ❌ remove Sparkles
import { 
  Package, 
  MapPin, 
  Phone, 
  User, 
  Calendar, 
  ShoppingBag,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  RefreshCw
} from "lucide-react";
import Image from "next/image";

type OrderItem = {
  title?: string;
  productId?: string;
  qty?: number;
  quantity?: number;
  price?: number;
  image?: string;
};

type Order = {
  _id: string;
  name: string;
  address: string;
  phone: string;
  items?: OrderItem[];
  products?: OrderItem[];
  total: number;
  date: string;
  status?: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  tracking?: {
    number: string;
    carrier: string;
    url: string;
  };
};

// ✅ Helper functions declared BEFORE they are used
// Helper function to generate random status
const getRandomStatus = (): Order["status"] => {
  const statuses: Order["status"][] = ["pending", "processing", "shipped", "delivered"];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

// Helper function to generate tracking info
const generateTracking = () => {
  return {
    number: `TRK${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
    carrier: ["DHL", "FedEx", "UPS", "USPS", "Blue Dart"][Math.floor(Math.random() * 5)],
    url: "#"
  };
};

// Get status color
const getStatusColor = (status?: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "processing":
      return "bg-blue-100 text-blue-800";
    case "shipped":
      return "bg-purple-100 text-purple-800";
    case "delivered":
      return "bg-green-100 text-green-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Get status icon
const getStatusIcon = (status?: string) => {
  switch (status) {
    case "pending":
      return <Clock className="h-4 w-4" />;
    case "processing":
      return <RefreshCw className="h-4 w-4" />;
    case "shipped":
      return <Truck className="h-4 w-4" />;
    case "delivered":
      return <CheckCircle className="h-4 w-4" />;
    case "cancelled":
      return <XCircle className="h-4 w-4" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [trackingModal, setTrackingModal] = useState(false);

useEffect(() => {
  const fetchOrders = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "null");

      if (!user) return;

      const res = await fetch(`/api/orders?userId=${user.email}`);
      const data = await res.json();

      const ordersWithStatus = (Array.isArray(data) ? data : []).map((order: Order) => ({
        ...order,
        status: order.status || getRandomStatus(),
        tracking: order.tracking || generateTracking()
      }));

      setOrders(ordersWithStatus);
    } catch (err) {
      console.log(err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  fetchOrders();
}, []);

  // Handle reorder
  const handleReorder = (order: Order) => {
    // Add items to cart
    const orderItems = order.items || order.products || [];
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    
    orderItems.forEach((item) => {
      const existingItem = cart.find((cartItem: { _id: string }) => cartItem._id === item.productId);
      if (existingItem) {
        existingItem.qty = (existingItem.qty || 0) + (item.qty || item.quantity || 1);
      } else {
        cart.push({
          _id: item.productId || item.title,
          title: item.title || "Product",
          price: item.price || 0,
          image: item.image || "",
          qty: item.qty || item.quantity || 1
        });
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "/cart";
  };

  // Handle track order
  const handleTrackOrder = (order: Order) => {
    setSelectedOrder(order);
    setTrackingModal(true);
  };

  // Handle cancel order
  const handleCancelOrder = async (orderId: string) => {
    if (confirm("Are you sure you want to cancel this order?")) {
      try {
        const res = await fetch(`/api/orders/${orderId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "cancelled" })
        });

        if (res.ok) {
          setOrders(orders.map(order => 
            order._id === orderId 
              ? { ...order, status: "cancelled" } 
              : order
          ));
          alert("Order cancelled successfully");
        }
      } catch (err) {
        console.log(err);
        alert("Failed to cancel order");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F6F8] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-[#6F7C8F] border-t-transparent mx-auto" />
          <p className="mt-4 text-[#4F5A6B]/50">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-[#F5F6F8] flex items-center justify-center px-4">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Manrope:wght@400;500;600;700&display=swap');
          .font-display { font-family: 'Cormorant Garamond', serif; }
          body { font-family: 'Manrope', sans-serif; }
        `}</style>
        
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#6F7C8F]/[0.08] blur-3xl" />
          <div className="absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full bg-[#6F7C8F]/[0.06] blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-[#6F7C8F]/[0.04] blur-3xl" />
        </div>

        <div className="text-center">
          <Package className="h-16 w-16 text-[#6F7C8F]/20 mx-auto mb-4" />
          <h1 className="font-display text-2xl text-[#3A424E]">No orders yet</h1>
          <p className="text-[#4F5A6B]/50 mt-2">Start shopping to place your first order</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F6F8] p-4 md:p-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Manrope:wght@400;500;600;700&display=swap');
        .font-display { font-family: 'Cormorant Garamond', serif; }
        body { font-family: 'Manrope', sans-serif; }
      `}</style>

      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#6F7C8F]/[0.08] blur-3xl" />
        <div className="absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full bg-[#6F7C8F]/[0.06] blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-[#6F7C8F]/[0.04] blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Package className="h-6 w-6 text-[#6F7C8F]" />
          <h1 className="font-display text-3xl font-medium text-[#3A424E]">
            Your <span className="italic text-[#6F7C8F]">Orders</span>
          </h1>
          <span className="text-sm text-[#6F7C8F]/50 ml-2">
            ({orders.length} orders)
          </span>
        </div>

        <div className="flex flex-col gap-6">
          {orders.map((order) => {
            const orderItems = order.items || order.products || [];

            return (
              <div 
                key={order._id} 
                className="bg-white p-6 rounded-2xl shadow-sm ring-1 ring-[#6F7C8F]/10 hover:shadow-md transition"
              >
                {/* Order Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4 pb-4 border-b border-[#6F7C8F]/10">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#6F7C8F]">
                        Order #{String(order._id).slice(-6).toUpperCase()}
                      </span>
                      <span className="text-xs text-[#6F7C8F]/30">|</span>
                      <span className="text-xs text-[#6F7C8F]/50 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {order.date ? new Date(order.date).toLocaleDateString() : new Date().toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-[#4F5A6B]">
                    <span className="flex items-center gap-1">
                      <Package className="h-3.5 w-3.5 text-[#6F7C8F]" />
                      {orderItems.reduce((acc, item) => acc + (item.qty || item.quantity || 0), 0)} items
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status || "Pending"}
                    </span>
                  </div>
                </div>

                {/* Order Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-3 bg-[#F5F6F8] rounded-xl">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-[#6F7C8F]" />
                    <div>
                      <p className="text-xs text-[#6F7C8F]/50">Customer</p>
                      <p className="text-sm font-medium text-[#3A424E]">{order.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-[#6F7C8F]" />
                    <div>
                      <p className="text-xs text-[#6F7C8F]/50">Phone</p>
                      <p className="text-sm font-medium text-[#3A424E]">{order.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#6F7C8F]" />
                    <div>
                      <p className="text-xs text-[#6F7C8F]/50">Address</p>
                      <p className="text-sm font-medium text-[#3A424E] truncate">{order.address}</p>
                    </div>
                  </div>
                </div>

                {/* Tracking Info */}
                {order.tracking && order.status !== "pending" && order.status !== "cancelled" && (
                  <div className="mb-4 p-3 bg-[#6F7C8F]/5 rounded-xl border border-[#6F7C8F]/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Truck className="h-4 w-4 text-[#6F7C8F]" />
                        <div>
                          <p className="text-xs text-[#6F7C8F]/50">Tracking Number</p>
                          <p className="text-sm font-medium text-[#3A424E]">{order.tracking.number}</p>
                        </div>
                        <div>
                          <p className="text-xs text-[#6F7C8F]/50">Carrier</p>
                          <p className="text-sm font-medium text-[#3A424E]">{order.tracking.carrier}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleTrackOrder(order)}
                        className="flex items-center gap-1 text-xs font-medium text-[#6F7C8F] hover:text-[#5a6a7f] transition"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        Track
                      </button>
                    </div>
                  </div>
                )}

                {/* Items */}
                {orderItems.length > 0 ? (
                  <div className="space-y-2">
                    {orderItems.slice(0, 3).map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between py-2 border-b border-[#6F7C8F]/5 last:border-0"
                      >
                        <div className="flex items-center gap-3">
                          {item.image && (
                            <Image
  src={item.image || "/placeholder.png"}
  alt={item.title || "Product"}
  width={40}
  height={40}
  className="rounded-lg object-cover"
/>
                          )}
                          <div>
                            <p className="text-sm font-medium text-[#3A424E]">
                              {item.title || item.productId || "Product"}
                            </p>
                            <p className="text-xs text-[#6F7C8F]/50">
                              Qty: {item.qty || item.quantity || 0}
                            </p>
                          </div>
                        </div>
                        {item.price && (
                          <span className="text-sm font-medium text-[#6F7C8F]">
                            £{(item.price * (item.qty || item.quantity || 1)).toFixed(2)}
                          </span>
                        )}
                      </div>
                    ))}
                    {orderItems.length > 3 && (
                      <p className="text-xs text-[#4F5A6B]/50 text-center">
                        +{orderItems.length - 3} more items
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="text-sm text-[#4F5A6B]/50 py-2">No items in this order</div>
                )}

                {/* Actions */}
                <div className="mt-4 pt-4 border-t border-[#6F7C8F]/10 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[#4F5A6B]/50">Order Total</span>
                    <span className="font-display text-xl font-medium text-[#6F7C8F]">
                      £{order.total.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {order.status !== "cancelled" && order.status !== "delivered" && (
                      <button
                        onClick={() => handleCancelOrder(order._id)}
                        className="px-4 py-2 text-sm font-medium text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition"
                      >
                        Cancel Order
                      </button>
                    )}
                    <button
                      onClick={() => handleReorder(order)}
                      className="px-4 py-2 text-sm font-medium text-white bg-[#6F7C8F] rounded-lg hover:bg-[#5a6a7f] transition flex items-center gap-2"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      Reorder
                    </button>
                    {order.tracking && order.status !== "pending" && order.status !== "cancelled" && (
                      <button
                        onClick={() => handleTrackOrder(order)}
                        className="px-4 py-2 text-sm font-medium text-[#6F7C8F] border border-[#6F7C8F]/20 rounded-lg hover:bg-[#6F7C8F]/5 transition flex items-center gap-2"
                      >
                        <Truck className="h-4 w-4" />
                        Track Order
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tracking Modal */}
      {trackingModal && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-display text-xl font-medium text-[#3A424E]">
                Track Order
              </h2>
              <button
                onClick={() => setTrackingModal(false)}
                className="p-1 hover:bg-[#F5F6F8] rounded-lg transition"
              >
                <XCircle className="h-5 w-5 text-[#4F5A6B]" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-[#F5F6F8] rounded-xl">
                <p className="text-xs text-[#6F7C8F]/50">Tracking Number</p>
                <p className="font-medium text-[#3A424E]">{selectedOrder.tracking?.number}</p>
              </div>

              <div className="p-4 bg-[#F5F6F8] rounded-xl">
                <p className="text-xs text-[#6F7C8F]/50">Carrier</p>
                <p className="font-medium text-[#3A424E]">{selectedOrder.tracking?.carrier}</p>
              </div>

              <div className="p-4 bg-[#F5F6F8] rounded-xl">
                <p className="text-xs text-[#6F7C8F]/50">Status</p>
                <div className="flex items-center gap-2 mt-1">
                  {getStatusIcon(selectedOrder.status)}
                  <span className="font-medium text-[#3A424E] capitalize">
                    {selectedOrder.status || "Pending"}
                  </span>
                </div>
              </div>

              {/* Tracking Timeline */}
              <div className="p-4 bg-[#F5F6F8] rounded-xl">
                <p className="text-xs text-[#6F7C8F]/50 mb-3">Tracking Updates</p>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                      <div className="flex-1 w-px bg-[#6F7C8F]/20 h-8" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#3A424E]">Delivered</p>
                      <p className="text-xs text-[#4F5A6B]/50">Expected delivery</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="h-3 w-3 rounded-full bg-[#6F7C8F]" />
                      <div className="flex-1 w-px bg-[#6F7C8F]/20 h-8" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#3A424E]">Shipped</p>
                      <p className="text-xs text-[#4F5A6B]/50">Order dispatched</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="h-3 w-3 rounded-full bg-[#6F7C8F]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#3A424E]">Order Confirmed</p>
                      <p className="text-xs text-[#4F5A6B]/50">Order placed successfully</p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setTrackingModal(false)}
                className="w-full py-3 bg-[#6F7C8F] text-white rounded-lg font-medium hover:bg-[#5a6a7f] transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}