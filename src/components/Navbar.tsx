import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const getActiveClasses = useCallback(
    (path) => location.pathname === path ? 'text-violet-600 font-bold' : 'text-slate-600 hover:text-violet-600',
    [location.pathname]
  );

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);
    };

    checkUser();

    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => sub?.subscription?.unsubscribe();
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const handleLogout = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsMenuOpen(false);
    navigate('/');
  }, [navigate]);

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-100 sticky top-0 z-50 transition-all" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 z-50" aria-label="NexusGrades home">
          <img src="/logo1.png" alt="NexusGrades logo" width="48" height="48" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
          <span className="text-xl md:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-violet-700 to-fuchsia-600 text-transparent bg-clip-text">
            NexusGrades
          </span>
        </Link>

        <div className="hidden md:flex space-x-8 font-medium">
          <Link to="/" className={`transition-[color] duration-100 ${getActiveClasses('/')}`}>Home</Link>
          <Link to="/services" className={`transition-[color] duration-100 ${getActiveClasses('/services')}`}>Services</Link>
          <Link to="/about" className={`transition-[color] duration-100 ${getActiveClasses('/about')}`}>About Us</Link>
          <Link to="/blog" className={`transition-[color] duration-100 ${getActiveClasses('/blog')}`}>Blog</Link>
          <Link to="/contact" className={`transition-[color] duration-100 ${getActiveClasses('/contact')}`}>Contact</Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm text-slate-600">{user.email}</span>
              <button onClick={handleLogout} className="text-slate-700 hover:text-violet-600 font-medium px-4 py-2 rounded-full border border-transparent hover:border-violet-100 transition-[background-color,color,transform] duration-100" aria-label="Sign out">Logout</button>
            </>
          ) : (
            <Link to="/auth" className="text-slate-700 hover:text-violet-600 font-medium px-4 py-2 rounded-full border border-transparent hover:border-violet-100 transition-[background-color,color,transform] duration-100" aria-label="Sign in">Login</Link>
          )}
          <Link to="/contact" className="bg-slate-900 text-white px-6 py-2.5 rounded-full font-medium hover:bg-violet-600 hover:shadow-lg hover:shadow-violet-200 transition-[background-color,color,transform] duration-100 hidden md:inline-flex z-50">
            Get Free Quote ✨
          </Link>
        </div>

        <button
          className="md:hidden p-2 text-slate-600 hover:text-violet-600 focus:outline-none z-50 transition-[color] duration-100"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
        >
          {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {isMenuOpen && (
        <div
          id="mobile-nav"
          className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-100 shadow-xl flex flex-col items-center py-6 space-y-4 z-40 animate-fade-in-up"
          role="navigation"
          aria-label="Mobile navigation"
          style={{ willChange: 'transform' }}
        >
          <Link to="/" onClick={closeMenu} className={`w-full text-center px-6 py-3 text-xl transition-[color] duration-100 ${getActiveClasses('/')}`}>Home</Link>
          <Link to="/services" onClick={closeMenu} className={`w-full text-center px-6 py-3 text-xl transition-[color] duration-100 ${getActiveClasses('/services')}`}>Services</Link>
          <Link to="/about" onClick={closeMenu} className={`w-full text-center px-6 py-3 text-xl transition-[color] duration-100 ${getActiveClasses('/about')}`}>About Us</Link>
          <Link to="/blog" onClick={closeMenu} className={`w-full text-center px-6 py-3 text-xl transition-[color] duration-100 ${getActiveClasses('/blog')}`}>Blog</Link>
          <Link to="/contact" onClick={closeMenu} className={`w-full text-center px-6 py-3 text-xl transition-[color] duration-100 ${getActiveClasses('/contact')}`}>Contact</Link>
          {user ? (
            <>
              <div className="w-full text-center px-6 py-3 text-sm text-slate-600">{user.email}</div>
              <button onClick={handleLogout} className="w-full text-center px-6 py-3 text-xl transition-[color] duration-100">Logout</button>
            </>
          ) : (
            <Link to="/auth" onClick={closeMenu} className="w-full text-center px-6 py-3 text-xl transition-[color] duration-100">Login</Link>
          )}
          <Link to="/contact" onClick={closeMenu} className="w-full mt-2 bg-violet-600 text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-violet-200 text-center transition-[background-color,transform] duration-100">
            Get Free Quote ✨
          </Link>
        </div>
      )}
    </nav>
  );
}
