'use client';

import { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorPage = ({ error, reset }) => {
  useEffect(() => {
    console.error("Error fetching listings:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6">
      <div className="bg-white shadow-lg max-w-2xl rounded-2xl p-8  text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4 animate-bounce" />
        <h1 className="text-2xl font-bold text-gray-800">Oops! Something went wrong</h1>
        <p className="text-gray-600 mt-2">{error?.message || "Failed to load listings."}</p>
        
        <button
          onClick={() => reset()} 
          className="mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg shadow-md transition duration-300"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
