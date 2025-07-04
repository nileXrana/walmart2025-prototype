'use client'
import React, { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import Image from "next/image";

// Dummy product data
const product = {
  name: 'Walmart Milk 1L',
  barcode: '1234567890',
};

export default function ReviewPage() {
  const { user, addWalCoins } = useUser();
  const router = useRouter();
  const [stars, setStars] = useState(0);
  const [review, setReview] = useState('');
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [referred, setReferred] = useState(false);

  // Sparkle state for hydration-safe rendering
  const [sparkles, setSparkles] = useState<{width:number;height:number;left:number;top:number;animationDelay:number;}[]>([]);
  useEffect(() => {
    const newSparkles = Array.from({ length: 16 }).map(() => ({
      width: 10 + Math.random() * 14,
      height: 10 + Math.random() * 14,
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

  // Handle review submission
  const handleSubmit = () => {
    if (stars === 0 || !review) return;
    addWalCoins(50); // Earn 50 WalCoins for review
    setSubmitted(true);
  };

  // Handle refer to friend
  const handleRefer = () => {
    addWalCoins(20); // Earn 20 WalCoins for referring
    setReferred(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
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
      <div className="bg-white/90 p-8 rounded-3xl shadow-2xl w-full max-w-lg text-center z-10 relative border-4 border-blue-100 backdrop-blur-xl animate-fadein">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-4 drop-shadow animate-fadein2">Review Your Purchase</h1>
        {/* Product info */}
        <div className="flex items-center justify-center mb-6 animate-fadein3">
          <div className="relative mr-4">
            <Image src={'/milk.png'} alt={product.name} width={90} height={90} className="w-24 h-24 rounded-2xl drop-shadow-2xl border-4 border-yellow-300 bg-white animate-trophy-glow" unoptimized />
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-white text-xs font-bold bg-gradient-to-r from-blue-400 to-yellow-400 shadow-lg border-2 border-white/60">Product</span>
          </div>
          <div className="text-left">
            <div className="font-bold text-lg text-blue-800 drop-shadow mb-1">{product.name}</div>
            <div className="text-gray-500 text-sm">Barcode: {product.barcode}</div>
          </div>
        </div>
        {/* Star rating */}
        <div className="flex items-center justify-center mb-4 animate-fadein4">
          {[1,2,3,4,5].map((star) => (
            <button
              key={star}
              onClick={() => setStars(star)}
              className={star <= stars ? 'text-yellow-400 cursor-pointer text-4xl drop-shadow-lg transition' : 'text-gray-300 cursor-pointer text-4xl transition'}
              aria-label={`Rate ${star} stars`}
            >★</button>
          ))}
        </div>
        {/* Written review */}
        <textarea
          className="w-full border-2 border-blue-200 rounded-2xl p-4 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner bg-white/80 resize-none animate-fadein4 text-black"
          rows={3}
          placeholder="Write your review..."
          value={review}
          onChange={e => setReview(e.target.value)}
        />
        {/* Store feedback */}
        <textarea
          className="text-black w-full border-2 border-blue-200 rounded-2xl p-4 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner bg-white/80 resize-none animate-fadein4"
          rows={2}
          placeholder="Feedback for your store visit..."
          value={feedback}
          onChange={e => setFeedback(e.target.value)}
        />
        {/* Info message */}
        {(submitted || referred) && (
          <div className="mb-4 p-3 rounded-xl bg-green-100 text-green-800 text-lg font-bold shadow animate-fadein4">
            {submitted && 'Thank you for your review! '}
            {referred && 'Thank you for referring!'}
          </div>
        )}
        {/* Submit review button */}
        <button
          className="cursor-pointer w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold py-3 px-4 rounded-2xl mb-2 shadow-lg transition animate-fadein4 border-2 border-yellow-300 hover:scale-105"
          onClick={handleSubmit}
          disabled={submitted}
        >
          {submitted ? 'Review Submitted!' : 'Submit Review (+50 WalCoins)'}
        </button>
        {/* Refer product */}
        <button
          className="cursor-pointer w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-bold py-3 px-4 rounded-2xl mb-2 shadow-lg transition animate-fadein4 border-2 border-blue-300 hover:scale-105"
          onClick={handleRefer}
          disabled={referred}
        >
          {referred ? 'Referred!' : 'Refer to a Friend (+20 WalCoins)'}
        </button>
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