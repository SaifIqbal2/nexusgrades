import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? "text-violet-600 font-bold" : "text-slate-600 hover:text-violet-600";

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-100 sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 z-50">
          <img src="/logo1.png" alt="NexusGrades Logo" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
          <span className="text-xl md:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-violet-700 to-fuchsia-600 text-transparent bg-clip-text">
            NexusGrades
          </span>
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8 font-medium">
          <Link to="/" className={`transition ${isActive('/')}`}>Home</Link>
          <Link to="/services" className={`transition ${isActive('/services')}`}>Services</Link>
          <Link to="/about" className={`transition ${isActive('/about')}`}>About Us</Link>
          <Link to="/contact" className={`transition ${isActive('/contact')}`}>Contact</Link>
        </div>
        
        {/* Desktop CTA */}
        <Link to="/contact" className="bg-slate-900 text-white px-6 py-2.5 rounded-full font-medium hover:bg-violet-600 hover:shadow-lg hover:shadow-violet-200 transition-all hidden md:block z-50">
          Get Free Quote ✨
        </Link>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-slate-600 hover:text-violet-600 focus:outline-none z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-100 shadow-xl flex flex-col items-center py-6 space-y-6 z-40 animate-fade-in-up">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className={`text-xl ${isActive('/')}`}>Home</Link>
          <Link to="/services" onClick={() => setIsMenuOpen(false)} className={`text-xl ${isActive('/services')}`}>Services</Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)} className={`text-xl ${isActive('/about')}`}>About Us</Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)} className={`text-xl ${isActive('/contact')}`}>Contact</Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="mt-4 bg-violet-600 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-violet-200">
            Get Free Quote ✨
          </Link>
        </div>
      )}
    </nav>
  );
}
