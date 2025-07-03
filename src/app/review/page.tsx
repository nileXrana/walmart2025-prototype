'use client'
import React, { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';

// Dummy product data
const product = {
  name: 'Walmart Milk 1L',
  barcode: '1234567890',
  image: 'https://via.placeholder.com/120',
};

export default function ReviewPage() {
  const { user, addWalCoins } = useUser();
  const router = useRouter();
  const [stars, setStars] = useState(0);
  const [review, setReview] = useState('');
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [referred, setReferred] = useState(false);

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold text-blue-700 mb-4 text-center">Review Your Purchase</h1>
        {/* Product info */}
        <div className="flex items-center mb-6">
          <img src={product.image} alt={product.name} className="w-20 h-20 rounded mr-4" />
          <div>
            <div className="font-semibold text-lg">{product.name}</div>
            <div className="text-gray-500 text-sm">Barcode: {product.barcode}</div>
          </div>
        </div>
        {/* Star rating */}
        <div className="flex items-center mb-4">
          {[1,2,3,4,5].map((star) => (
            <button
              key={star}
              onClick={() => setStars(star)}
              className={star <= stars ? 'text-yellow-400 text-3xl' : 'text-gray-300 text-3xl'}
              aria-label={`Rate ${star} stars`}
            >★</button>
          ))}
        </div>
        {/* Written review */}
        <textarea
          className="w-full border border-gray-300 rounded p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={3}
          placeholder="Write your review..."
          value={review}
          onChange={e => setReview(e.target.value)}
        />
        {/* Store feedback */}
        <textarea
          className="w-full border border-gray-300 rounded p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={2}
          placeholder="Feedback for your store visit..."
          value={feedback}
          onChange={e => setFeedback(e.target.value)}
        />
        {/* Submit review button */}
        <button
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded mb-2 transition"
          onClick={handleSubmit}
          disabled={submitted}
        >
          {submitted ? 'Review Submitted!' : 'Submit Review (+50 WalCoins)'}
        </button>
        {/* Refer product */}
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 transition"
          onClick={handleRefer}
          disabled={referred}
        >
          {referred ? 'Referred!' : 'Refer to a Friend (+20 WalCoins)'}
        </button>
        {/* Info message */}
        {(submitted || referred) && (
          <div className="text-center mt-4 text-green-600 font-bold">
            {submitted && 'Thank you for your review! '}
            {referred && 'Thank you for referring!'}
          </div>
        )}
      </div>
    </div>
  );
} 