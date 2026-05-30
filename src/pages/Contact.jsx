import React from 'react';
import { Mail, MessageCircle } from 'lucide-react';

export default function Contact() {
  return (
    <div className="bg-slate-50 py-24 selection:bg-violet-200 selection:text-violet-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">Drop us a line 🚀</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">Upload your requirements and we'll get back to you with a free quote within hours. Or just DM us on WhatsApp!</p>
        </div>

        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl shadow-slate-200 overflow-hidden flex flex-col md:flex-row border border-slate-100">

          {/* Left Panel */}
          <div className="bg-gradient-to-br from-violet-600 to-indigo-800 text-white p-10 md:w-1/3 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-fuchsia-500/20 rounded-full blur-2xl font-light"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-8">Contact Info</h3>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-2xl">
                    <MessageCircle className="w-6 h-6 text-fuchsia-300" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">WhatsApp (Fastest)</h4>
                    <a href="https://wa.me/923393301238" target="_blank" rel="noreferrer" className="text-indigo-100 hover:text-white mt-1 block transition-colors">
                      +92 339 330 1238
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-2xl">
                    <Mail className="w-6 h-6 text-fuchsia-300" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">Email Us</h4>
                    <a href="mailto:nexusgrades@gmail.com" className="text-indigo-100 hover:text-white mt-1 block transition-colors">
                      nexusgrades@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 relative z-10">
               <p className="text-sm text-indigo-200">We usually reply within 5 mins on WhatsApp!</p>
            </div>
          </div>

          {/* Right Panel / Form */}
          <div className="p-10 md:w-2/3">
            <h3 className="text-2xl font-bold text-slate-900 mb-8">Send us your task details</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
                  <input type="text" className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-4 focus:ring-violet-600/20 focus:border-violet-600 outline-none transition bg-slate-50" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                  <input type="email" className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-4 focus:ring-violet-600/20 focus:border-violet-600 outline-none transition bg-slate-50" placeholder="john@student.edu.au" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Subject / Domain</label>
                  <select className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-4 focus:ring-violet-600/20 focus:border-violet-600 outline-none transition bg-slate-50">
                    <option>Computer Science</option>
                    <option>Information Technology</option>
                    <option>Software Engineering</option>
                    <option>Cyber Security</option>
                    <option>Other technical subject</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Deadline</label>
                  <input type="date" className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-4 focus:ring-violet-600/20 focus:border-violet-600 outline-none transition bg-slate-50" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Task Description</label>
                <textarea rows="4" className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-4 focus:ring-violet-600/20 focus:border-violet-600 outline-none transition resize-none bg-slate-50" placeholder="Provide details about your assignment, or paste a drive link..."></textarea>
              </div>

              <div className="pt-4">
                <button type="button" className="w-full bg-violet-600 text-white font-bold py-4 rounded-xl hover:bg-violet-700 hover:-translate-y-1 transition-all duration-300 shadow-xl shadow-violet-200">
                  Submit Request for Quote ✨
                </button>
                <div className="mt-4 text-center">
                   <p className="text-slate-500 font-medium uppercase text-sm">OR</p>
                </div>
                <a href="https://wa.me/923393301238" target="_blank" rel="noreferrer" className="mt-4 w-full bg-[#25D366] text-white font-bold py-4 rounded-xl hover:bg-[#20bd5a] hover:-translate-y-1 transition-all duration-300 shadow-xl shadow-green-200 flex items-center justify-center gap-2">
                   Message us on WhatsApp 💬
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
