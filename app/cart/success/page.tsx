"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, Package, ShoppingBag, ArrowRight, Sparkles } from "lucide-react";

// Generate confetti data outside component (pure function)
const generateConfetti = () => {
  const colors = [
    '#6F7C8F', '#d4af7a', '#e8edf2', '#a8b5c5', 
    '#3A424E', '#5a6a7f', '#c9a16e', '#b8956a',
    '#8a6e4b', '#4a5a6f', '#f0e6d3', '#2d3340'
  ];
  
  return Array.from({ length: 60 }, (_, i) => {
    const size = Math.random() * 8 + 4;
    return {
      id: i,
      left: Math.random() * 100,
      size: size,
      height: size * (Math.random() * 1.5 + 0.8),
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 1.5,
      duration: Math.random() * 2.5 + 1.5,
      rotation: Math.random() * 360,
      shape: Math.random() > 0.5 ? '50%' : '2px',
      animationType: Math.random() > 0.5 ? 'confetti-fall-left' : 
                     Math.random() > 0.3 ? 'confetti-fall-right' : 'confetti-fall',
    };
  });
};

export default function OrderSuccessPage() {
  const router = useRouter();
  const [seconds, setSeconds] = useState(5);
  const [confetti] = useState(() => generateConfetti());

  // ✅ countdown only
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // ✅ navigate separately
  useEffect(() => {
    if (seconds <= 0) {
      router.push("/orders");
    }
  }, [seconds, router]);

  return (
    <div className="min-h-screen bg-[#F5F6F8] flex items-center justify-center px-4 relative overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Manrope:wght@400;500;600;700&display=swap');
        .font-display { font-family: 'Cormorant Garamond', serif; }
        body { font-family: 'Manrope', sans-serif; }
        
        @keyframes confetti-fall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
        @keyframes confetti-fall-left {
          0% { transform: translateY(-10vh) rotate(0deg) translateX(0); opacity: 1; }
          100% { transform: translateY(110vh) rotate(-720deg) translateX(-80px); opacity: 0; }
        }
        @keyframes confetti-fall-right {
          0% { transform: translateY(-10vh) rotate(0deg) translateX(0); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg) translateX(80px); opacity: 0; }
        }
        @keyframes pop-in {
          0% { transform: scale(0.8); opacity: 0; }
          70% { transform: scale(1.02); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes float-up {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes pulse-glow {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 0.8; }
        }
        
        .confetti-piece {
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 2px;
          animation-fill-mode: forwards;
          pointer-events: none;
        }
        .pop-in {
          animation: pop-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .float-up {
          animation: float-up 0.6s ease-out forwards;
          opacity: 0;
        }
        .pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>

      {/* Ambient glows */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#6F7C8F]/[0.08] blur-3xl" />
        <div className="absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full bg-[#6F7C8F]/[0.06] blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-[#6F7C8F]/[0.04] blur-3xl" />
      </div>

      {/* 🎉 Confetti Effect */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {confetti.map((piece) => (
          <div
            key={piece.id}
            className="confetti-piece"
            style={{
              left: `${piece.left}%`,
              top: '-10vh',
              width: `${piece.size}px`,
              height: `${piece.height}px`,
              backgroundColor: piece.color,
              borderRadius: piece.shape,
              transform: `rotate(${piece.rotation}deg)`,
              animationName: piece.animationType,
              animationDuration: `${piece.duration}s`,
              animationDelay: `${piece.delay}s`,
              opacity: 0,
            }}
          />
        ))}
      </div>

      {/* Main Card with Pop-in Animation */}
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg ring-1 ring-[#6F7C8F]/10 max-w-md w-full text-center relative z-10 pop-in">
        
        {/* Success Icon */}
        <div className="relative inline-block mx-auto mb-6 float-up">
          <div className="absolute inset-0 bg-[#6F7C8F]/10 rounded-full blur-xl scale-150 pulse-glow" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[#6F7C8F]/10 ring-1 ring-[#6F7C8F]/20 mx-auto">
            <CheckCircle className="h-10 w-10 text-[#6F7C8F]" />
          </div>
        </div>

        <h1 className="font-display text-3xl font-medium text-[#3A424E] mb-2 float-up" style={{ animationDelay: '0.1s' }}>
          Order <span className="italic text-[#6F7C8F]">Placed!</span>
        </h1>

        <p className="text-[#4F5A6B]/60 text-sm mb-2 float-up" style={{ animationDelay: '0.15s' }}>
          Your order has been placed successfully.
        </p>

        {/* Confirmation chip */}
        <div className="flex items-center justify-center gap-2 text-sm text-[#6F7C8F] bg-[#6F7C8F]/5 rounded-full px-4 py-2 mx-auto w-fit mb-6 float-up" style={{ animationDelay: '0.2s' }}>
          <Package className="h-4 w-4" />
          <span>Order confirmation sent</span>
        </div>

        <p className="text-sm text-[#6F7C8F]/40 mb-6 float-up" style={{ animationDelay: '0.25s' }}>
          Redirecting in <span className="font-medium text-[#6F7C8F]">{seconds}</span> seconds...
        </p>

        <div className="flex flex-col gap-3 float-up" style={{ animationDelay: '0.3s' }}>
          <Link href="/orders">
            <button className="w-full bg-[#6F7C8F] text-white py-3 rounded-full font-medium hover:bg-[#5a6a7f] transition shadow-lg shadow-[#6F7C8F]/20 flex items-center justify-center gap-2">
              <Package className="h-4 w-4" />
              View Orders
            </button>
          </Link>

          <Link href="/products">
            <button className="w-full border-2 border-[#6F7C8F]/20 text-[#4F5A6B] py-3 rounded-full font-medium hover:bg-[#6F7C8F]/5 transition flex items-center justify-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              Continue Shopping
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-6 border-t border-[#6F7C8F]/10 float-up" style={{ animationDelay: '0.35s' }}>
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