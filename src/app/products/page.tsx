"use client";
import React, { useEffect, useState } from 'react';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import Image from "next/image";

// Dummy products and reviews
const products = [
  {
    name: 'Walmart Milk 1L',
    reviews: [
      { user: 'Alice', stars: 5, text: 'Great quality milk!' },
      { user: 'Bob', stars: 4, text: 'Good value for money.' },
    ],
  },
  {
    name: 'Walmart Bread',
    reviews: [
      { user: 'Charlie', stars: 3, text: 'Average taste.' },
      { user: 'Dana', stars: 5, text: 'Fresh and soft!' },
    ],
  },
  {
    name: 'Walmart Eggs 12 Pack',
    reviews: [
      { user: 'Eve', stars: 5, text: 'Eggs are always fresh.' },
      { user: 'Frank', stars: 4, text: 'Good size and quality.' },
    ],
  },
  {
    name: 'Walmart Butter 500g',
    reviews: [
      { user: 'Grace', stars: 5, text: 'Creamy and delicious.' },
      { user: 'Heidi', stars: 4, text: 'Melts perfectly on toast.' },
    ],
  },
  {
    name: 'Walmart Orange Juice',
    reviews: [
      { user: 'Ivan', stars: 4, text: 'Refreshing and tangy.' },
      { user: 'Judy', stars: 5, text: 'Best juice for breakfast.' },
    ],
  },
  {
    name: 'Walmart Rice 5kg',
    reviews: [
      { user: 'Karl', stars: 5, text: 'Cooks perfectly every time.' },
      { user: 'Liam', stars: 4, text: 'Great value for bulk.' },
    ],
  },
  {
    name: 'Walmart Pasta 1kg',
    reviews: [
      { user: 'Mallory', stars: 4, text: 'Tastes great with sauce.' },
      { user: 'Nina', stars: 5, text: 'Kids love it!' },
    ],
  },
  {
    name: 'Walmart Cheese Slices',
    reviews: [
      { user: 'Oscar', stars: 5, text: 'Perfect for sandwiches.' },
      { user: 'Peggy', stars: 4, text: 'Good flavor and texture.' },
    ],
  },
  {
    name: 'Walmart Apples 1kg',
    reviews: [
      { user: 'Quinn', stars: 5, text: 'Crisp and sweet.' },
      { user: 'Rita', stars: 4, text: 'Always fresh.' },
    ],
  },
  {
    name: 'Walmart Chicken Breast',
    reviews: [
      { user: 'Sam', stars: 5, text: 'Juicy and tender.' },
      { user: 'Tina', stars: 4, text: 'Great for grilling.' },
    ],
  },
  {
    name: 'Walmart Yogurt 6 Pack',
    reviews: [
      { user: 'Uma', stars: 5, text: 'Kids love the flavors.' },
      { user: 'Vince', stars: 4, text: 'Good snack option.' },
    ],
  },
  {
    name: 'Walmart Peanut Butter',
    reviews: [
      { user: 'Wendy', stars: 5, text: 'Smooth and tasty.' },
      { user: 'Xander', stars: 4, text: 'Great for breakfast.' },
    ],
  },
  {
    name: 'Walmart Coffee 200g',
    reviews: [
      { user: 'Yara', stars: 5, text: 'Rich aroma and flavor.' },
      { user: 'Zane', stars: 4, text: 'Good morning boost.' },
    ],
  },
];

export default function ProductsPage() {
  const { user } = useUser();
  const router = useRouter();

  // Sparkle state for hydration-safe rendering
  const [sparkles, setSparkles] = useState<{width:number;height:number;left:number;top:number;animationDelay:number;}[]>([]);
  useEffect(() => {
    const newSparkles = Array.from({ length: 14 }).map(() => ({
      width: 8 + Math.random() * 12,
      height: 8 + Math.random() * 12,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 4,
    }));
    setSparkles(newSparkles);
  }, []);

  // Redirect to sign in if not signed in
  useEffect(() => {
    if (!user) router.replace('/signin');
  }, [user, router]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-400 via-yellow-200 to-blue-100 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10 animate-gradient bg-gradient-to-br from-blue-400 via-yellow-200 to-blue-100 opacity-90" />
      {/* Floating sparkles */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {sparkles.map((sparkle, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/70 blur-[2px] animate-sparkle"
            style={{
              width: `${sparkle.width}px`,
              height: `${sparkle.height}px`,
              left: `${sparkle.left}%`,
              top: `${sparkle.top}%`,
              animationDelay: `${sparkle.animationDelay}s`,
            }}
          />
        ))}
      </div>
      <h1 className="text-3xl font-extrabold text-blue-700 mb-6 drop-shadow animate-fadein text-center mt-8">Product Reviews</h1>
      {/* List of products */}
      <div className="w-full flex-1 px-2 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8">
          {products.map((product, idx) => (
            <div
              key={idx}
              className="group bg-gradient-to-br from-yellow-100 via-blue-50 to-blue-200 p-4 rounded-3xl shadow-xl border-4 border-blue-200 hover:border-yellow-400 transition-transform transform hover:scale-105 hover:shadow-2xl relative animate-fadein3 flex flex-col items-center justify-start aspect-square overflow-hidden"
              style={{ minHeight: 0, minWidth: 0 }}
            >
              <div className="relative mb-2">
                <Image src="/trophies/trophy.png" alt="Product" width={64} height={64} className="drop-shadow-2xl scale-110 animate-trophy-glow group-hover:scale-125 transition-transform" />
                <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-white text-xs font-bold bg-gradient-to-r from-blue-400 to-yellow-400 shadow-lg border-2 border-white/60 ">Featured</span>
              </div>
              <div className="mt-3 font-bold text-base text-blue-800 mb-1 drop-shadow text-center w-full truncate" title={product.name}>{product.name}</div>
              {/* Reviews for each product */}
              <ul className="w-full flex-1 text-left flex flex-col gap-1 mt-1 overflow-y-auto">
                {product.reviews.map((review, ridx) => (
                  <li key={ridx} className="flex items-center gap-1 bg-white/80 rounded-xl px-2 py-1 shadow-inner border border-blue-100 text-xs break-words">
                    <span className="text-yellow-400">{'★'.repeat(review.stars)}</span>
                    <span className="text-blue-700 font-semibold" title={review.user}>{review.user}:</span>
                    <span className="text-gray-700 break-words">{review.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      {/* Custom CSS for animations */}
      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease-in-out infinite;
        }
        @keyframes sparkle {
          0% { opacity: 0.7; transform: scale(1) translateY(0); }
          50% { opacity: 1; transform: scale(1.3) translateY(-10px); }
          100% { opacity: 0.7; transform: scale(1) translateY(0); }
        }
        .animate-sparkle {
          animation: sparkle 3.5s infinite;
        }
        @keyframes trophy-glow {
          0%, 100% { filter: drop-shadow(0 0 16px #ffe066) brightness(1.1); }
          50% { filter: drop-shadow(0 0 32px #ffe066) brightness(1.3); }
        }
        .animate-trophy-glow {
          animation: trophy-glow 2.5s infinite;
        }
        @keyframes fadein {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadein { animation: fadein 0.8s 0.1s both; }
        .animate-fadein2 { animation: fadein 1.2s 0.3s both; }
        .animate-fadein3 { animation: fadein 1.5s 0.5s both; }
        .animate-fadein4 { animation: fadein 1.8s 0.7s both; }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-18px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2.2s infinite;
        }
      `}</style>
    </div>
  );
} 