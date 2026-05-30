import React from 'react';
import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-indigo-950 text-indigo-200 py-20 border-t border-indigo-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-4">
            <div className="flex items-center gap-3 text-white mb-6">
              <img src="/logo1.png" alt="NexusGrades Logo" className="w-12 h-12 object-contain" />
              <span className="text-2xl font-bold tracking-tight">NexusGrades</span>
            </div>
            <p className="text-indigo-200/80 mb-8 leading-relaxed pr-4">
              We help you survive uni. Zero AI, 100% human-crafted solutions. Your grades, safely handled.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3"><Mail className="w-5 h-5 text-blue-500"/> <span>nexusgrades@gmail.com</span></div>
            </div>
          </div>

          {/* Sitemap */}
          <div className="col-span-1 md:col-span-2 mt-4 md:mt-0">
            <h3 className="text-white font-bold text-lg mb-6">Sitemap</h3>
            <ul className="space-y-4">
              <li><Link to="/" className="hover:text-fuchsia-400 transition-colors">Home</Link></li>
              <li><Link to="/services" className="hover:text-fuchsia-400 transition-colors">Services</Link></li>
              <li><Link to="/about" className="hover:text-fuchsia-400 transition-colors">The Team</Link></li>
              <li><Link to="/contact" className="hover:text-fuchsia-400 transition-colors">Get Started</Link></li>
            </ul>
          </div>

          {/* Socials */}
          <div className="col-span-1 md:col-span-3 mt-4 md:mt-0">
            <h3 className="text-white font-bold text-lg mb-6">Hit Us Up</h3>
            <ul className="space-y-4">
              <li><a href="https://wa.me/923393301238" target="_blank" rel="noreferrer" className="hover:text-fuchsia-400 transition-colors flex items-center gap-2">💬 WhatsApp</a></li>
              <li><a href="https://www.youtube.com/@nexusgrades" target="_blank" rel="noreferrer" className="hover:text-fuchsia-400 transition-colors flex items-center gap-2">▶️ YouTube</a></li>
              <li><a href="https://discord.gg/zmTJaQGe" target="_blank" rel="noreferrer" className="hover:text-fuchsia-400 transition-colors flex items-center gap-2">👾 Discord</a></li>
              <li><a href="https://www.instagram.com/nexusgrades/" target="_blank" rel="noreferrer" className="hover:text-fuchsia-400 transition-colors flex items-center gap-2">📸 Instagram</a></li>
              <li><a href="https://www.tiktok.com/@nexusgrades" target="_blank" rel="noreferrer" className="hover:text-fuchsia-400 transition-colors flex items-center gap-2">🎵 TikTok</a></li>
              <li><a href="https://x.com/nexusgrades" target="_blank" rel="noreferrer" className="hover:text-fuchsia-400 transition-colors flex items-center gap-2">✖️ Twitter / X</a></li>
              <li><a href="https://www.facebook.com/profile.php?id=61590382086529" target="_blank" rel="noreferrer" className="hover:text-fuchsia-400 transition-colors flex items-center gap-2">📘 Facebook</a></li>
              <li><a href="https://www.reddit.com/user/Double_Tradition_467/" target="_blank" rel="noreferrer" className="hover:text-fuchsia-400 transition-colors flex items-center gap-2">🤖 Reddit</a></li>
            </ul>
          </div>

          {/* Specialities */}
          <div className="col-span-1 md:col-span-3 mt-4 md:mt-0">
            <h3 className="text-white font-bold text-lg mb-6">We Write Code For:</h3>
            <ul className="space-y-4">
              <li><span className="hover:text-fuchsia-400 transition-colors cursor-pointer">Python & Java</span></li>
              <li><span className="hover:text-fuchsia-400 transition-colors cursor-pointer">Cyber Sec Reports</span></li>
              <li><span className="hover:text-fuchsia-400 transition-colors cursor-pointer">React / Node.js</span></li>
              <li><span className="hover:text-fuchsia-400 transition-colors cursor-pointer">SQL Databases</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-indigo-900/50 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-indigo-300/60 text-sm">
            © {new Date().getFullYear()} NexusGrades. Stay ahead of the curve.
          </div>
          <div className="flex gap-3">
            <span className="text-xs bg-indigo-900 text-fuchsia-300 font-medium px-4 py-2 rounded-full border border-indigo-800">100% Confidential 🔒</span>
            <span className="text-xs bg-indigo-900 text-emerald-300 font-medium px-4 py-2 rounded-full border border-indigo-800">No AI Guarantee ✨</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
