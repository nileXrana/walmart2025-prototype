"use client";
import React, { useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';

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
];

export default function ProductsPage() {
  const { user } = useUser();
  const router = useRouter();

  // Redirect to sign in if not signed in
  useEffect(() => {
    if (!user) router.replace('/signin');
  }, [user, router]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-blue-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">Product Reviews</h1>
        {/* List of products */}
        {products.map((product, idx) => (
          <div key={idx} className="mb-8">
            <div className="font-semibold text-lg mb-2">{product.name}</div>
            {/* Reviews for each product */}
            <ul className="pl-4">
              {product.reviews.map((review, ridx) => (
                <li key={ridx} className="mb-1 flex items-center">
                  <span className="text-yellow-400 mr-2">{'★'.repeat(review.stars)}</span>
                  <span className="text-gray-700 mr-2">{review.user}:</span>
                  <span className="text-gray-600">{review.text}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
} 