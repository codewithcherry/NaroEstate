// 'use client';

// import React, { useState } from 'react';
// import { useSearchParams } from 'next/navigation';
// import Link from 'next/link';

// const Page = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [message, setMessage] = useState();
//   const searchParams = useSearchParams(); // Access query parameters

//   const handleVerify = async () => {
//     setIsLoading(true);
//     setMessage('');

//     try {
//       // Extract query parameters
//       const token = searchParams.get('token');
//       const userId = searchParams.get('userId');

//       if (!token || !userId) {
//         throw new Error('Invalid query parameters. Verification cannot proceed.');
//       }

//       // Perform the POST request
//       const response = await fetch('/api/user/verify-email', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ token, userId }),
//       });

//       if (!response.ok) {
//         throw new Error('Verification failed. Please try again.');
//       }

//       const data = await response.json();
//       setMessage('Verification successful! Thank you.');
//     } catch (error) {
//       setMessage(error.message || 'Something went wrong.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <main className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
//       <div className="p-6 bg-card text-card-foreground rounded shadow-md text-center">
//         <h1 className="text-2xl font-bold mb-4">Hello User!</h1>
//         <p className="mb-6">Please verify your account by clicking the button below.</p>
//         {!message?<button
//           onClick={handleVerify}
//           className="px-4 py-2 bg-primary text-primary-foreground font-semibold rounded hover:bg-accent hover:text-accent-foreground disabled:bg-muted disabled:text-muted-foreground"
//           disabled={isLoading}
//         >
//           {isLoading ? 'Verifying...' : 'Verify'}
//         </button>:
//         <Link 
//          className='px-4 py-2 bg-primary mt-4 text-primary-foreground font-semibold rounded hover:bg-accent hover:text-accent-foreground disabled:bg-muted disabled:text-muted-foreground'
//          href={'/login'}>Login to your Acount</Link>}
//         {message && <div>
//          <p className="mt-4 text-sm">{message}</p>
//          </div>}
//       </div>
//     </main>
//   );
// };

// export default Page;
