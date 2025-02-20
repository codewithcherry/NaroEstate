'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

export default function Error({ error, reset }) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6 bg-background rounded-lg shadow-md">
      <AlertTriangle className="w-12 h-12 animate-bounce text-red-600" />
      <p className="mt-4 text-lg font-semibold text-red-600">Oops! Something went wrong.</p>
      <p className="text-center text-gray-700 mt-2">{error?.message || 'An unexpected error occurred.'}</p>
      <div className="mt-6 flex space-x-4">
        <button 
          onClick={reset} 
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
          <RefreshCw className="w-5 h-5 mr-2" /> Try Again
        </button>
        <button 
          onClick={() => router.push('/')} 
          className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700">
          <Home className="w-5 h-5 mr-2" /> Go to Home
        </button>
      </div>
    </div>
  );
}
