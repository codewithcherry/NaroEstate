'use client'
import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import * as Avatar from '@radix-ui/react-avatar';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '../ui/dropdown-menu';
import { LogOut, User, Settings, House, Search, Menu, X ,BellIcon, CalendarDays, Users} from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';


// Constants for paths and labels
const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/listings', label: 'Listings' },
  { path: '/about', label: 'About' },
  { path: '/contact-us', label: 'Contact Us' },
];

const LOGGED_IN_LINKS = [
  {path: '/notifications', label: 'Notifications', icon: <BellIcon className="w-4 h-4 mr-2" />},
  { path: '/my-listings', label: 'My Listings', icon: <House className="w-4 h-4 mr-2" /> },
  { path: '/profile', label: 'Profile', icon: <User className="w-4 h-4 mr-2" /> },
  {path: '/my-bookings',label:'My Bookings', icon: <CalendarDays className='w-4 h-4 mr-2' />},
  {path: '/my-guests', label: "My Guests",icon : <Users className='w-4 h-4 mr-2'/>},
  { path: '/settings', label: 'Settings', icon: <Settings className="w-4 h-4 mr-2" /> },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [signoutLoading, setSignoutLoading] = useState(false);
  const [userData, setUserData] = useState({ username: '', imageUrl: '' });
  const router = useRouter();
  const pathname = usePathname(); // Get current path
  const { isLoggedIn, signout } = useAuth();
  const { toast } = useToast();

  // Fetch user data from localStorage on component mount
  useEffect(() => {
    if (isLoggedIn) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      setUserData({
        username: user.username || 'User',
        imageUrl: user.imageUrl || '',
      });
    }
  }, [isLoggedIn]);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Redirect to the listings page with the search query as a URL parameter
      router.push(`/listings?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSignout = async (e) => {
    e.preventDefault();
    try {
      await signout();
    } catch (error) {
      toast({
        title: error.response.data?.type || 'Error',
        description: error.response.data?.message || 'An error occurred',
      });
    } finally {
      setSignoutLoading(false);
    }
  };

  return (
    <div className="bg-slate-200 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 max-w-screen-xl mx-auto">
        {/* Logo */}
        <div
          className="flex items-center hover:cursor-pointer"
          onClick={() => router.push('/')}
        >
          <span className="text-slate-500 text-2xl font-semibold">Naro</span>
          <span className="text-2xl text-slate-400 font-semibold">Estate</span>
        </div>

        {/* Search Bar (Desktop) */}
        <div className="hidden sm:block max-w-lg w-full mx-8">
          <form onSubmit={handleSearchSubmit} className="w-full">
            <div className="relative">
              <input
                type="text"
                placeholder="Search places..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="px-4 py-2 pr-10 rounded-lg w-full focus:ring-2 focus:ring-slate-500 focus:outline-none"
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 px-3 flex items-center text-slate-500 hover:text-slate-700"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex items-center space-x-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`text-slate-600 hover:text-slate-900 transition-colors duration-300 relative before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-slate-900 before:transition-all before:duration-300 hover:before:w-full ${
                pathname === link.path ? 'before:w-full' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}

          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center space-x-2 hover:cursor-pointer">
                    <Avatar.Root className="relative inline-block w-10 h-10 rounded-full overflow-hidden">
                      <Avatar.Image
                        className="object-cover w-full h-full"
                        src={userData.imageUrl}
                        alt="User Avatar"
                      />
                      <Avatar.Fallback className="flex items-center justify-center bg-gray-300 text-white font-bold">
                        {userData.username.charAt(0).toUpperCase()}
                      </Avatar.Fallback>
                    </Avatar.Root>
                    <span className="text-slate-600">{userData.username}</span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {LOGGED_IN_LINKS.map((link) => (
                    <DropdownMenuItem key={link.path} onClick={() =>{ 
                      setIsMobileMenuOpen(false)
                      router.push(link.path)
                      }}>
                      {link.icon}
                      {link.label}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    {signoutLoading ? (
                      <span className="animate-pulse">Signing out...</span>
                    ) : (
                      'Sign out'
                    )}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-slate-600 hover:text-slate-900 transition duration-200"
            >
              Sign in
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="sm:hidden">
          <Button
            variant="ghost"
            aria-label="Toggle mobile menu"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-slate-200 px-6 py-4">
          <form onSubmit={handleSearchSubmit} className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search places..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="px-4 py-2 pr-10 rounded-lg w-full focus:ring-2 focus:ring-slate-500 focus:outline-none"
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 px-3 flex items-center text-slate-500 hover:text-slate-700"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>

          <div className="flex flex-col space-y-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-slate-600 hover:text-slate-900 transition duration-200 relative before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-slate-900 before:transition-all before:duration-300 hover:before:w-full ${
                  pathname === link.path ? 'before:w-full' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Logged-in User Links */}
            {isLoggedIn &&
              LOGGED_IN_LINKS.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`text-slate-600 hover:text-slate-900 transition duration-200 relative before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-slate-900 before:transition-all before:duration-300 hover:before:w-full ${
                    pathname === link.path ? 'before:w-full' : ''
                  }`}
                >
                  {link.label}
                </Link>
              ))}
          </div>

          <div className="mt-4">
            {isLoggedIn ? (
              <Button
                variant="outline"
                className="w-full text-slate-600 hover:bg-slate-100"
                onClick={handleSignout}
              >
                {signoutLoading ? 'Signing out...' : 'Sign out'}
              </Button>
            ) : (
              <Link href="/login" className="block">
                <Button variant="outline" className="w-full text-slate-600 hover:bg-slate-100">
                  Sign in
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