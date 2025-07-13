"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Sparkle = {
  width: number;
  height: number;
  left: number;
  top: number;
  animationDelay: number;
};

export default function Home() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    setSparkles(
      Array.from({ length: 16 }).map(() => ({
        width: 10 + Math.random() * 10,
        height: 10 + Math.random() * 10,
        left: Math.random() * 100,
        top: Math.random() * 100,
        animationDelay: Math.random() * 4,
      }))
    );
  }, []);

  return (
    <div className=" min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10 animate-gradient bg-gradient-to-br from-blue-400 via-yellow-200 to-blue-100 opacity-90" />
      {/* Floating sparkles */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {sparkles.map((s, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/70 blur-[2px] animate-sparkle"
            style={{
              width: `${s.width}px`,
              height: `${s.height}px`,
              left: `${s.left}%`,
              top: `${s.top}%`,
              animationDelay: `${s.animationDelay}s`,
            }}
          />
        ))}
      </div>
      {/* Walmart logo and title */}
      <div className="mb-8 mt-8 flex flex-col items-center animate-fadein">
        <Image src="/trophies/trophy.png" alt="Walmart Logo" width={90} height={90} className="drop-shadow-2xl animate-trophy-glow" />
        <h1 className="text-4xl font-extrabold text-blue-700 mt-4 text-center drop-shadow animate-fadein2">Welcome to WalStore Feedback Portal</h1>
        <p className="text-lg text-gray-700 mt-2 text-center animate-fadein3">Share your experience and earn WalCoins!</p>
      </div>
      {/* Scan barcode option */}
      <div className="flex flex-col items-center bg-white/90 p-8 rounded-3xl shadow-2xl max-w-md w-full mb-8 border-4 border-blue-100 backdrop-blur-xl animate-fadein2">
        <div className="mb-4 flex flex-col items-center">
          <span className="inline-block bg-yellow-400 text-white font-bold px-4 py-2 rounded-full text-lg shadow-lg items-center gap-2">
            <svg className="w-6 h-6 inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7V5a2 2 0 012-2h2m10 0h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2m-10 0H5a2 2 0 01-2-2v-2" /><path strokeLinecap="round" strokeLinejoin="round" d="M7 12h10M7 16h10M7 8h10" /></svg>
            Scan Your Product Barcode
          </span>
          <div className="mt-7">
            <Image src="/barcode.png" alt="Barcode" width={80} height={80} className="mt-4 drop-shadow-xl animate-bounce-slow" />
          </div>
        </div>
        {/* Simulated scan button (redirects to review page) */}
        <Link href="/review">
          <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-2xl text-xl shadow-lg transition transform hover:scale-105 animate-fadein3 flex items-center gap-2">
            {/* <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m4 0h-1v4h-1m-4 0h-1v-4h-1" /></svg> */}
            Scan Now
          </button>
        </Link>
        <p className="text-gray-500 mt-7 font-bold text-md animate-fadein4">(Prototype: Click to simulate scanning)</p>
      </div>
      {/* Or sign in directly */}
      <div className="flex flex-col items-center animate-fadein3 mb-5">
        <span className="text-gray-600 mb-2">Already have an account?</span>
        <Link href="/signin">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-6 rounded-2xl shadow-lg transition flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 00-8 0v2M12 11a4 4 0 100-8 4 4 0 000 8z" /></svg>
            Sign In
          </button>
        </Link>
      </div>
      {/* Footer navigation for demo */}
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
