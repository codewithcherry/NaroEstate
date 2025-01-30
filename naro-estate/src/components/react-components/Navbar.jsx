'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import * as Avatar from '@radix-ui/react-avatar'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from '../ui/dropdown-menu'
import { LogOut, User, Settings, House ,Search} from "lucide-react"
import { useRouter } from 'next/navigation'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const { isLoggedIn, signout } = useAuth();

  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const getPathName = (path) => {
    if (path === '/') return 'Home';
    return path
      .replace('/', '')
      .replace('-', ' ')
      .replace(/^./, str => str.toUpperCase());
  };

  return (
    <div className="bg-slate-200">
      <div className="flex items-center justify-between px-6 py-4 max-w-screen-xl mx-auto">
        {/* Logo */}
        <div className="flex items-center hover:cursor-pointer" onClick={() => router.push('/')}>
          <span className="text-slate-500 text-2xl font-semibold">Naro</span>
          <span className="text-2xl text-slate-400 font-semibold">Estate</span>
        </div>

        {/* Search Bar (Desktop) */}
        <div className="hidden sm:block">
          <form>
            <div className="relative">
              <input
                type="text"
                placeholder="Search places..."
                className="px-4 py-2 rounded-lg w-96 focus:ring-2 focus:ring-slate-500 focus:outline-none"
              />
              <Button
                type="submit"
                className="absolute right-0 top-0 bottom-0 px-4 py-2 bg-white hover:bg-slate-50 rounded-r-lg"
              >
                <Search className="w-4 h-4 text-primary"/>
              </Button>
            </div>
          </form>
        </div>

        {/* Navbar Links & Avatar */}
        <div className="hidden sm:flex items-center space-x-6">
          {['/', '/listings', '/about', '/contact-us'].map((path, index) => (
            <Link
              key={index}
              href={path}
              className="relative text-slate-600 hover:text-slate-900 transition-colors duration-300 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-slate-900 before:transition-all before:duration-300 hover:before:w-full"
            >
              {getPathName(path)}
            </Link>
          ))}
          
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar.Root className="relative inline-block w-10 h-10 rounded-full overflow-hidden hover:cursor-pointer">
                  <Avatar.Image
                    className="object-cover w-full h-full"
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="User Avatar"
                  />
                  <Avatar.Fallback className="flex items-center justify-center bg-gray-300 text-white font-bold">
                    UN
                  </Avatar.Fallback>
                </Avatar.Root>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/profile')}>
                  <User className="w-4 h-4 mr-2" /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/listings')}>
                  <House className="w-4 h-4 mr-2" /> My Listings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/settings')}>
                  <Settings className="w-4 h-4 mr-2" /> Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signout}>
                  <LogOut className="w-4 h-4 mr-2" onClick={()=>signout()}/> Signout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login" className="text-slate-600 hover:text-slate-900 transition duration-200" onClick={()=>router.push('/login')}> 
              Sign in
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="sm:hidden">
          <Button variant="ghost" aria-label="Open mobile menu" onClick={toggleMobileMenu}>
            ☰
          </Button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isMobileMenuOpen && (
        <div className="sm:hidden px-6 py-2 max-w-screen-xl mx-auto">
          <form>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search places..."
                className="px-4 py-2 rounded-lg w-full focus:ring-2 focus:ring-slate-500 focus:outline-none"
              />
              <Button
                type="submit"
                className="absolute right-0 top-0 bottom-0 px-4 py-2 bg-white hover:bg-slate-50 rounded-r-lg"
              >
                <Search className="w-4 h-4 text-primary"/>
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Mobile Menu Items */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-slate-200 px-6 py-4 max-w-screen-xl mx-auto">
          <div className="flex flex-col space-y-4">
            {isLoggedIn
              ? [
                  '/home',
                  '/listings',
                  '/settings',
                  '/profile',
                  '/my listings',
                  '/about',
                  '/contact-us',
                ].map((path, index) => (
                  <Link
                    key={index}
                    href={path}
                    className="text-slate-600 hover:text-slate-900 transition duration-200"
                  >
                    {getPathName(path)}
                  </Link>
                ))
              : [
                  '/home',
                  '/listings',
                  '/settings',
                  '/about',
                  '/contact-us',
                ].map((path, index) => (
                  <Link
                    key={index}
                    href={path}
                    className="text-slate-600 hover:text-slate-900 transition duration-200"
                  >
                    {getPathName(path)}
                  </Link>
                ))}
          </div>
          <div className="flex flex-col space-y-4 mt-4">
            {isLoggedIn ? (
              <Button variant="outline" className="text-slate-600 hover:bg-slate-100" onClick={()=>signout()}>
                Signout
              </Button>
            ) : (
              <Link href="/login">
                <Button variant="outline" className="text-slate-600 hover:bg-slate-100" onClick={()=>router.push('/login')}>
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
