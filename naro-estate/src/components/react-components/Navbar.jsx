'use client'
import React, { useState, useEffect } from 'react'
import { Button } from '../ui/button'
import * as Avatar from '@radix-ui/react-avatar'
import Link from 'next/link'

const Navbar = () => {
  // State for toggling the mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // State to track if the component is rendered on the client side
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // Set state to true once the component has mounted on the client side
    setIsClient(true)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prevState => !prevState)
  }

  if (!isClient) {
    return null // Prevent rendering until after hydration
  }

  return (
    <div className='bg-slate-200'>
      <div className='flex items-center justify-between px-4 py-2'>
        {/* Logo */}
        <div className='flex items-center space-x-1'>
          <span className='text-slate-500 text-2xl font-semibold'>Naro</span>
          <span className='text-2xl text-slate-400'>Estate</span>
        </div>

        {/* Search Bar (Desktop) */}
        <div className='hidden sm:block'>
          <form action="">
            <div className='relative'>
              <input
                type="text"
                placeholder='Search places...'
                className='px-4 py-2 rounded-lg w-96 focus:ring-2 focus:ring-slate-500 focus:outline-none'
              />
              <Button
                type="submit"
                className='absolute right-0 top-0 bottom-0 px-4 py-2 bg-white hover:bg-slate-50 rounded-r-lg border-l border-slate-200 focus:ring-2 focus:ring-slate-500'
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                    stroke="#a39999"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
            </div>
          </form>
        </div>

        {/* Navbar Links & Avatar */}
        <div className='flex items-center justify-center space-x-6 hidden sm:flex'>
          <Link href={'/'} className='text-slate-600 hover:text-slate-900 transition duration-200'>Home</Link>
          <Link href={'/about'} className='text-slate-600 hover:text-slate-900 transition duration-200'>About</Link>

          {/* SignIn Button */}
          <Button variant="outline" className='text-slate-600 hover:bg-slate-100'>
            SignIn
          </Button>

          {/* User Avatar */}
          <div>
            <Avatar.Root className="relative inline-block w-10 h-10 rounded-full overflow-hidden">
              <Avatar.Image 
                className="object-cover w-full h-full" 
                src="https://randomuser.me/api/portraits/men/32.jpg" 
                alt="User Avatar" 
              />
              <Avatar.Fallback className="flex items-center justify-center bg-gray-300 text-white font-bold">
                UN
              </Avatar.Fallback>
            </Avatar.Root>
          </div>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className='sm:hidden'>
          <Button variant="ghost" aria-label="Open mobile menu" onClick={toggleMobileMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>
      </div>

      {/* Mobile Menu Items */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-slate-200 px-4 py-2">
          <div className="flex flex-col space-y-4">
            <Link href={'/'} className='text-slate-600 hover:text-slate-900 transition duration-200'>Home</Link>
            <Link href={'/about'} className='text-slate-600 hover:text-slate-900 transition duration-200'>About</Link>
            
            {/* SignIn Button */}
            <Button variant="outline" className='text-slate-600 hover:bg-slate-100'>
              SignIn
            </Button>

            {/* Search Bar in Mobile */}
            <form action="">
              <div className='relative'>
                <input
                  type="text"
                  placeholder='Search places...'
                  className='px-4 py-2 rounded-lg w-full focus:ring-2 focus:ring-slate-500 focus:outline-none'
                />
                <Button
                  type="submit"
                  className='absolute right-0 top-0 bottom-0 px-4 py-2 bg-white hover:bg-slate-50 rounded-r-lg border-l border-slate-200 focus:ring-2 focus:ring-slate-500'
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                      stroke="#a39999"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
