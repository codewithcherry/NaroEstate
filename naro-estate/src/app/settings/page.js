import React from 'react';
import { Construction } from 'lucide-react'; // Import a Lucide icon

const Page = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Construction className="w-16 h-16 text-gray-600 mx-auto animate-bounce" /> {/* Lucide icon */}
        <h1 className="mt-4 text-3xl font-bold text-gray-900">Settings Page is Coming Soon</h1>
        <p className="mt-2 text-gray-600">We're working on something awesome! Stay tuned.</p>
      </div>
    </div>
  );
};

export default Page;