import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Clock, Award, Star, Zap, Tag, FileSignature, CheckCircle2, FileText, MessageSquarePlus, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [reviews, setReviews] = useState([
    { name: "Sarah J.", uni: "University of Sydney", review: "Got my CS assignment done in 24 hours. The code was perfectly commented and got a High Distinction. Super affordable too! ✨", rating: 5 },
    { name: "David M.", uni: "RMIT", review: "Struggled with my Cyber Sec project entirely. NexusGrades literally saved my semester. 100% AI-free reporting 🚀", rating: 5 },
    { name: "Emily K.", uni: "UNSW", review: "Fastest delivery ever! Sent my SQL database task on a Friday night, had it back Saturday morning. Will def use again. 🔥", rating: 5 }
  ]);

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', uni: '', review: '' });

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if(newReview.name && newReview.review) {
      setReviews([{ ...newReview, rating: 5 }, ...reviews]);
      setNewReview({ name: '', uni: '', review: '' });
      setShowReviewForm(false);
    }
  };

  return (
    <div className="bg-white selection:bg-violet-200 selection:text-violet-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-violet-50 via-white to-fuchsia-50 py-20 lg:py-28 overflow-visible lg:overflow-hidden">
        {/* Abstract background blobs for Gen Z vibe */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-violet-200/50 blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-fuchsia-200/50 blur-3xl opacity-50"></div>

        {/* Floating Interactive Elements (Hidden on mobile) */}
        <div className="hidden lg:flex absolute top-32 left-8 xl:left-16 items-center gap-3 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl shadow-violet-200/40 border border-white/50 animate-bounce" style={{ animationDuration: '4s' }}>
          <div className="bg-emerald-100 p-2 rounded-full">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <p className="font-bold text-slate-800 text-sm">Python Task Done</p>
            <p className="text-xs text-slate-500">Just now from RMIT</p>
          </div>
        </div>

        <div className="hidden lg:flex absolute top-48 right-8 xl:right-16 items-center gap-3 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl shadow-fuchsia-200/40 border border-white/50 animate-bounce" style={{ animationDuration: '5s', animationDelay: '1s' }}>
          <div className="bg-fuchsia-100 p-2 rounded-full">
            <ShieldCheck className="w-6 h-6 text-fuchsia-600" />
          </div>
          <div>
            <p className="font-bold text-slate-800 text-sm">Turnitin Safe</p>
            <p className="text-xs text-slate-500">Zero AI Detected 🤖⛔</p>
          </div>
        </div>

        <div className="hidden lg:flex absolute bottom-40 left-10 xl:left-24 items-center gap-3 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl shadow-blue-200/40 border border-white/50 animate-bounce" style={{ animationDuration: '4.5s', animationDelay: '0.5s' }}>
          <div className="bg-blue-100 p-2 rounded-full">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="font-bold text-slate-800 text-sm">Java Assignment</p>
            <p className="text-xs text-slate-500">Submitted 5 mins ago</p>
          </div>
        </div>

        <div className="hidden lg:flex absolute bottom-32 right-12 xl:right-32 items-center gap-3 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl shadow-orange-200/40 border border-white/50 animate-bounce" style={{ animationDuration: '5.5s', animationDelay: '1.5s' }}>
          <div className="bg-orange-100 p-2 rounded-full">
            <Award className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <p className="font-bold text-slate-800 text-sm">Cyber Sec Report</p>
            <p className="text-xs text-slate-500">HD Grade Secured 🎯</p>
          </div>
        </div>

        <div className="hidden lg:flex absolute top-72 left-4 xl:left-12 items-center gap-3 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl shadow-cyan-200/40 border border-white/50 animate-bounce" style={{ animationDuration: '6s', animationDelay: '2s' }}>
          <div className="bg-cyan-100 p-2 rounded-full">
            <Zap className="w-6 h-6 text-cyan-600" />
          </div>
          <div>
            <p className="font-bold text-slate-800 text-sm">Database Task</p>
            <p className="text-xs text-slate-500">Completed in 12hrs ⚡</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center mt-10 md:mt-0">
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur text-violet-800 font-semibold px-4 md:px-5 py-2 rounded-full text-xs md:text-sm mb-8 border border-violet-100 shadow-sm animate-fade-in-up">
            <span className="text-lg md:text-xl">🔥</span> Trending among Aussie Students
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
            Ace Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-500">IT & CS Tasks.</span> <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-500">Protect Your Peace.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl leading-relaxed mx-auto font-medium">
            Professional, <strong className="text-slate-900 font-bold bg-fuchsia-100 px-2 flex-inline rounded">100% Plagiarism & AI-free</strong> assistance for Computer Science, IT, and Cyber Security. Upload brief, get code.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full justify-center px-4">
            <Link to="/contact" className="w-full sm:w-auto bg-violet-600 text-white px-6 md:px-8 py-4 rounded-full font-bold text-base md:text-lg hover:bg-violet-700 hover:-translate-y-1 transition-all duration-300 shadow-xl shadow-violet-200 flex items-center justify-center gap-2 group">
              Get an Instant Quote <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
            </Link>
            <Link to="/services" className="w-full sm:w-auto bg-white/80 backdrop-blur-sm text-slate-700 border-2 border-slate-200 px-6 md:px-8 py-4 rounded-full font-bold text-base md:text-lg hover:border-violet-300 hover:-translate-y-1 transition-all duration-300 shadow-sm flex items-center justify-center">
              Explore Services
            </Link>
          </div>

          {/* Mobile simplified badges (visible only on small screens) */}
          <div className="lg:hidden flex flex-col items-center gap-4 w-full max-w-md mx-auto mt-4 px-4">
            <div className="w-full bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-md border border-white/60 flex items-center gap-3">
              <div className="bg-emerald-100 p-2 rounded-full">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-slate-800">Python Task Done</p>
                <p className="text-xs text-slate-500">Just now from RMIT</p>
              </div>
            </div>
            <div className="w-full bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-md border border-white/60 flex items-center gap-3">
              <div className="bg-fuchsia-100 p-2 rounded-full">
                <ShieldCheck className="w-5 h-5 text-fuchsia-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-slate-800">Turnitin Safe</p>
                <p className="text-xs text-slate-500">Zero AI Detected</p>
              </div>
            </div>
          </div>

          {/* Tech Stack Pills - Above the fold to quickly show what we do */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 max-w-5xl mx-auto px-1 animate-fade-in-up md:animate-none">
            <span className="px-4 md:px-6 py-2 md:py-3 bg-blue-50/90 backdrop-blur text-blue-700 rounded-full text-sm md:text-lg font-bold border border-blue-200 flex items-center gap-1 shadow-sm hover:scale-105 transition-transform cursor-default">🐍 Python</span>
            <span className="px-4 md:px-6 py-2 md:py-3 bg-red-50/90 backdrop-blur text-red-700 rounded-full text-sm md:text-lg font-bold border border-red-200 flex items-center gap-1 shadow-sm hover:scale-105 transition-transform cursor-default">☕ Java</span>
            <span className="px-4 md:px-6 py-2 md:py-3 bg-yellow-50/90 backdrop-blur text-yellow-700 rounded-full text-sm md:text-lg font-bold border border-yellow-200 flex items-center gap-1 shadow-sm hover:scale-105 transition-transform cursor-default">⚡ JS / Web</span>
            <span className="px-4 md:px-6 py-2 md:py-3 bg-emerald-50/90 backdrop-blur text-emerald-700 rounded-full text-sm md:text-lg font-bold border border-emerald-200 flex items-center gap-1 shadow-sm hover:scale-105 transition-transform cursor-default">🗄️ SQL / DBs</span>
            <span className="px-4 md:px-6 py-2 md:py-3 bg-zinc-800/90 backdrop-blur text-slate-100 rounded-full text-sm md:text-lg font-bold border border-zinc-700 flex items-center gap-1 shadow-sm hover:scale-105 transition-transform cursor-default">🛡️ Cyber Sec</span>
            <span className="px-4 md:px-6 py-2 md:py-3 bg-cyan-50/90 backdrop-blur text-cyan-700 rounded-full text-sm md:text-lg font-bold border border-cyan-200 flex items-center gap-1 shadow-sm hover:scale-105 transition-transform cursor-default">⚛️ React Dev</span>
            <span className="px-4 md:px-6 py-2 md:py-3 bg-orange-50/90 backdrop-blur text-orange-700 rounded-full text-sm md:text-lg font-bold border border-orange-200 flex items-center gap-1 shadow-sm hover:scale-105 transition-transform cursor-default">⚙️ C / C++</span>
          </div>

          {/* Turnitin Free Report Badge */}
          <div className="mb-14 w-full flex justify-center animate-fade-in-up px-4">
            <div className="inline-flex flex-col md:flex-row items-center text-center gap-2 md:gap-3 bg-gradient-to-r from-emerald-100 to-teal-50 text-emerald-900 font-extrabold px-6 py-3 md:py-4 rounded-3xl md:rounded-full border-2 border-emerald-300 shadow-lg text-sm md:text-lg hover:-translate-y-1 transition-transform">
              <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
              Free Turnitin reports provided with every project! ✨
            </div>
          </div>

          {/* Trust Avatars */}
          <div className="flex flex-col items-center justify-center gap-3 mb-14">
            <div className="flex -space-x-4">
              <img width="48" height="48" className="w-12 h-12 rounded-full border-2 border-white shadow-md object-cover" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Student from USYD" />
              <img width="48" height="48" className="w-12 h-12 rounded-full border-2 border-white shadow-md object-cover" src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Student from RMIT" />
              <img width="48" height="48" className="w-12 h-12 rounded-full border-2 border-white shadow-md object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Student from UNSW" />
              <img width="48" height="48" className="w-12 h-12 rounded-full border-2 border-white shadow-md object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Verified NexusGrades student" />
              <div className="w-12 h-12 rounded-full border-2 border-white shadow-md bg-violet-100 flex items-center justify-center text-violet-700 font-bold text-sm">500+</div>
            </div>
            <div className="flex items-center gap-2 text-slate-600 font-medium bg-white/50 px-4 py-1.5 rounded-full border border-slate-100">
              <div className="flex text-amber-400" aria-label="5 out of 5 stars">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
              <span className="text-sm">Trusted by <span className="text-slate-900 font-bold">500+</span> students from USYD, RMIT & UNSW</span>
            </div>
          </div>

          {/* Quick Stats Bar - Floating Style */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl bg-white/80 backdrop-blur-lg p-6 rounded-3xl shadow-2xl shadow-violet-100/50 border border-white">
            <div className="flex items-center gap-4 justify-center md:justify-start px-4 border-b md:border-b-0 md:border-r border-slate-100 pb-4 md:pb-0">
              <div className="bg-emerald-100 p-3 rounded-2xl"><Tag className="w-6 h-6 text-emerald-600" /></div>
              <div className="text-left">
                <p className="font-bold text-slate-900 text-lg">Student Budgets</p>
                <p className="text-sm text-slate-500">Starting from $20 AUD</p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center md:justify-start px-4 border-b md:border-b-0 md:border-r border-slate-100 pb-4 md:pb-0">
              <div className="bg-orange-100 p-3 rounded-2xl"><Zap className="w-6 h-6 text-orange-600" /></div>
              <div className="text-left">
                <p className="font-bold text-slate-900 text-lg">Lightning Fast</p>
                <p className="text-sm text-slate-500">12-hour rush deadlines</p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center md:justify-start px-4">
              <div className="bg-fuchsia-100 p-3 rounded-2xl"><FileSignature className="w-6 h-6 text-fuchsia-600" /></div>
              <div className="text-left">
                <p className="font-bold text-slate-900 text-lg">100% Original</p>
                <p className="text-sm text-slate-500">Zero AI. Zero Plagiarism.</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* How it Works - Cards Layout */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-sm font-bold text-violet-600 tracking-wider uppercase mb-3">Keep It Simple</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-slate-900 mb-16">3 Steps to Higher Grades</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1️⃣", title: "Drop Your Task", desc: "Upload your rubric and deadline through our secure form." },
              { step: "2️⃣", title: "Get a Student Price", desc: "Instant review by our experts and a quote tailored for student budgets." },
              { step: "3️⃣", title: "Chill & Submit", desc: "Get your perfect, originality-guaranteed code and report right on time." }
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-50 hover:bg-violet-50 p-8 rounded-3xl transition-colors duration-300 group">
                <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform">{item.step}</div>
                <h4 className="text-2xl font-bold text-slate-900 mb-3">{item.title}</h4>
                <p className="text-slate-600 text-lg">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proven Results Feedback UI Section */}
      <section className="py-24 bg-indigo-950 px-4">
        <div className="max-w-7xl mx-auto bg-indigo-900/50 rounded-[3rem] p-8 md:p-16 border border-indigo-800 shadow-2xl overflow-hidden relative">
          {/* Decorative glow */}
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-[100px] pointer-events-none transform -translate-y-1/2"></div>
          
          <div className="lg:flex lg:items-center lg:gap-16 relative z-10">
            <div className="lg:w-1/2 mb-12 lg:mb-0 text-white">
              <div className="inline-flex items-center gap-2 bg-indigo-800/80 backdrop-blur text-fuchsia-300 font-semibold px-4 py-1.5 rounded-full text-sm mb-6 border border-indigo-700">
                ⭐ Verified High Distinctions
              </div>
              <h3 className="text-4xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-200">
                We Let the Grades Talk.
              </h3>
              <p className="text-xl text-indigo-100 mb-8 leading-relaxed font-light">
                No cap—our solutions are built to impress. Real feedback from university tutors proves we hit the rubric requirements accurately every single time.
              </p>
              <Link to="/contact" className="inline-block bg-white text-indigo-950 px-8 py-4 rounded-full font-bold text-lg hover:bg-fuchsia-500 hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-lg">
                Secure Your Grades Now 🚀
              </Link>
            </div>
            
            {/* Real Screenshot Proof */}
            <div className="lg:w-1/2">
              <div className="bg-slate-900 rounded-2xl p-3 shadow-2xl shadow-indigo-900/50 border border-indigo-700 transform rotate-2 hover:rotate-0 transition-transform duration-500 group">
                <div className="absolute top-0 right-0 -m-3 bg-fuchsia-500 text-white font-bold text-xs px-3 py-1 rounded-full z-20 shadow-lg transform rotate-12">
                  Canvas Feedback
                </div>
                <img 
                  src="/image.png" 
                  alt="Canvas grade feedback showing 100 percent achieved on NexusGrades submission"
                  width="500"
                  height="400"
                  className="w-full h-auto rounded-xl relative z-10 opacity-90 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust guarantees Card View */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">Why Students Love Us</h2>
            <p className="text-xl text-slate-600 mt-4 max-w-2xl mx-auto">Skip the generic agencies. We're tech specialists built for modern university demands.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-violet-50 p-10 rounded-3xl border border-violet-100 hover:shadow-xl transition-shadow duration-300">
              <ShieldCheck className="w-12 h-12 text-violet-600 mb-6" />
              <h4 className="text-2xl font-bold mb-3 text-slate-900">100% Plagiarism & AI Free</h4>
              <p className="text-slate-600 text-lg leading-relaxed">Turnitin AI-detection is brutal nowadays. We write custom code and reports from scratch. AI-checker safe reports available upon request.</p>
            </div>
            <div className="bg-fuchsia-50 p-10 rounded-3xl border border-fuchsia-100 hover:shadow-xl transition-shadow duration-300">
              <Clock className="w-12 h-12 text-fuchsia-600 mb-6" />
              <h4 className="text-2xl font-bold mb-3 text-slate-900">Lightning Fast Turnaround</h4>
              <p className="text-slate-600 text-lg leading-relaxed">Procrastinated until the last minute? Don't panic. Our timezone alignment lets us rescue 12-hour and 24-hour emergencies easily.</p>
            </div>
            <div className="bg-emerald-50 p-10 rounded-3xl border border-emerald-100 hover:shadow-xl transition-shadow duration-300">
              <Award className="w-12 h-12 text-emerald-600 mb-6" />
              <h4 className="text-2xl font-bold mb-3 text-slate-900">HD / Distinction Quality</h4>
              <p className="text-slate-600 text-lg leading-relaxed">We read the rubric item by item. Comments in code, diagrams, references—everything formatted precisely to get you top marks.</p>
            </div>
            <div className="bg-orange-50 p-10 rounded-3xl border border-orange-100 hover:shadow-xl transition-shadow duration-300">
              <CheckCircle2 className="w-12 h-12 text-orange-600 mb-6" />
              <h4 className="text-2xl font-bold mb-3 text-slate-900">Unlimited Free Tweaks</h4>
              <p className="text-slate-600 text-lg leading-relaxed">Got feedback from the tutor? Need a variable name changed? We adjust things for free to ensure your total satisfaction.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Vibe Check: Passed ✅</h2>
              <p className="text-slate-600 text-xl">See what other uni students are saying about us.</p>
            </div>
            <div className="flex gap-1 text-2xl">⭐⭐⭐⭐⭐ 4.9/5</div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {reviews.map((r, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-200 to-fuchsia-200 flex items-center justify-center text-violet-800 font-bold text-xl uppercase">
                      {r.name[0]}
                    </div>
                    <div className="flex gap-1">
                      {[...Array(r.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                    </div>
                  </div>
                  <p className="text-slate-700 mb-8 text-lg font-medium">"{r.review}"</p>
                </div>
                <div>
                  <p className="font-bold text-slate-900">{r.name}</p>
                  <p className="text-sm font-medium text-violet-600">{r.uni || 'Student'}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Review System */}
          <div className="max-w-2xl mx-auto flex flex-col items-center">
            {!showReviewForm ? (
              <button 
                onClick={() => setShowReviewForm(true)}
                className="bg-white border-2 border-violet-200 text-violet-700 font-bold px-8 py-4 rounded-full hover:border-violet-600 hover:bg-violet-50 transition-all flex items-center gap-2 shadow-sm"
              >
                <MessageSquarePlus className="w-5 h-5" />
                Drop Your Own Review
              </button>
            ) : (
              <form onSubmit={handleReviewSubmit} className="bg-white w-full p-8 rounded-3xl shadow-xl border border-violet-100 animate-fade-in-up">
                <h4 className="text-2xl font-bold text-slate-900 mb-6">Share your experience 🚀</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">First Name / Initial</label>
                    <input required type="text" value={newReview.name} onChange={(e) => setNewReview({...newReview, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20 outline-none bg-slate-50" placeholder="e.g. John D." />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">University (Optional)</label>
                    <input type="text" value={newReview.uni} onChange={(e) => setNewReview({...newReview, uni: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20 outline-none bg-slate-50" placeholder="e.g. Monash" />
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Your Review</label>
                  <textarea required rows="3" value={newReview.review} onChange={(e) => setNewReview({...newReview, review: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20 outline-none bg-slate-50 resize-none" placeholder="Did we hit that HD? Let us know..."></textarea>
                </div>
                <div className="flex gap-3">
                  <button type="submit" className="flex-1 bg-violet-600 text-white font-bold py-3 rounded-xl hover:bg-violet-700 transition flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" /> Post Review
                  </button>
                  <button type="button" onClick={() => setShowReviewForm(false)} className="px-6 bg-slate-100 text-slate-600 font-bold py-3 rounded-xl hover:bg-slate-200 transition">
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Modern CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto rounded-[3rem] bg-gradient-to-br from-violet-600 to-indigo-800 p-10 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6">Ready to stop stressing?</h2>
            <p className="text-violet-200 text-xl mb-10 max-w-2xl font-light">Join thousands of students grabbing High Distinctions. Authentic code, zero AI, starting at just $20 AUD.</p>
            <Link to="/contact" className="bg-white text-violet-900 px-10 py-5 rounded-full font-bold text-xl hover:bg-slate-100 hover:scale-105 transition-all duration-300 shadow-xl shadow-indigo-900/50">
              Let's Do This 🎯
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
