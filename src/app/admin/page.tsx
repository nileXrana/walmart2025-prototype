"use client";
import React, { useEffect, useMemo } from 'react';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceDot,
  LabelList,
} from 'recharts';

// Generate dummy data for 55 products with sales
const products = Array.from({ length: 55 }).map((_, i) => ({
  name: `Product ${i + 1}`,
  good: Math.floor(Math.random() * 100),
  bad: Math.floor(Math.random() * 50),
  sales: Math.floor(Math.random() * 1000) + 100, // 100-1099
}));

export default function AdminPage() {
  const { user } = useUser();
  const router = useRouter();

  // Find highest and lowest selling products
  const { max, min } = useMemo(() => {
    let max = products[0], min = products[0];
    for (const p of products) {
      if (p.sales > max.sales) max = p;
      if (p.sales < min.sales) min = p;
    }
    return { max, min };
  }, []);

  // Redirect to sign in if not signed in
  useEffect(() => {
    if (!user) router.replace('/signin');
  }, [user, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10 animate-gradient bg-gradient-to-br from-blue-400 via-yellow-200 to-blue-100 opacity-90" />
      {/* Floating sparkles */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/60 blur-[2px] animate-sparkle"
            style={{
              width: `${10 + Math.random() * 10}px`,
              height: `${10 + Math.random() * 10}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
      <div className="bg-white/90 p-8 rounded-3xl shadow-2xl w-full max-w-5xl text-center z-10 relative border-4 border-blue-100 backdrop-blur-xl">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-8 drop-shadow animate-fadein">Admin Dashboard</h1>
        <div className="flex flex-col gap-10 items-center animate-fadein2">
          {/* 3D/Modern Area + Line Chart */}
          <div className="w-full flex flex-col items-center">
            <h2 className="font-semibold text-xl mb-4 text-blue-800">Product Sales & Reviews (Good vs Bad)</h2>
            <div className="relative w-full h-[420px] bg-gradient-to-br from-blue-100 via-yellow-50 to-blue-50 rounded-2xl shadow-xl border-2 border-blue-200 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={products} margin={{ top: 30, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="goodColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#34d399" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#6ee7b7" stopOpacity={0.2}/>
                    </linearGradient>
                    <linearGradient id="badColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f87171" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#fca5a5" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#c7d2fe" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} interval={0} tick={{ fontSize: 10, fill: '#1e3a8a' }} />
                  <YAxis tick={{ fontSize: 12, fill: '#1e3a8a' }} />
                  <Tooltip contentStyle={{ borderRadius: 12, background: '#fff', boxShadow: '0 4px 24px #0002' }} />
                  <Legend verticalAlign="top" height={36} iconType="circle"/>
                  <Area type="monotone" dataKey="good" stroke="#22c55e" fillOpacity={1} fill="url(#goodColor)" strokeWidth={3} activeDot={{ r: 7 }} name="Good Reviews" />
                  <Area type="monotone" dataKey="bad" stroke="#ef4444" fillOpacity={1} fill="url(#badColor)" strokeWidth={3} activeDot={{ r: 7 }} name="Bad Reviews" />
                  <Line type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={3} dot={false} name="Sales" />
                  {/* Highlight max/min sales */}
                  <ReferenceDot x={max.name} y={max.sales} r={10} fill="#facc15" stroke="#2563eb" strokeWidth={3} label={{ position: 'top', value: 'Top Seller', fill: '#facc15', fontWeight: 700, fontSize: 12 }} />
                  <ReferenceDot x={min.name} y={min.sales} r={10} fill="#f87171" stroke="#2563eb" strokeWidth={3} label={{ position: 'bottom', value: 'Lowest Seller', fill: '#f87171', fontWeight: 700, fontSize: 12 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6 text-sm text-gray-600">X-axis: Products (scroll to see all). Y-axis: Count. Blue line = Sales, Green = Good Reviews, Red = Bad Reviews. Top/Lowest seller highlighted.</div>
          </div>
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
        @keyframes fadein {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadein { animation: fadein 0.8s 0.1s both; }
        .animate-fadein2 { animation: fadein 1.2s 0.3s both; }
      `}</style>
    </div>
  );
} 