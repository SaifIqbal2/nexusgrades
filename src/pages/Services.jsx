import React from 'react';
import { Code, BookOpen, Cpu, Shield, FileText, PenTool, Database, Layout } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Services() {
  const categories = [
    { title: "Computer Science", icon: Code, color: "bg-blue-100 text-blue-700", items: ["Algorithm Design", "Data Structures", "Java, Python, C++", "Machine Learning Intro"] },
    { title: "Software Engineering", icon: Layout, color: "bg-purple-100 text-purple-700", items: ["Web Development (React, Node)", "Software Architecture", "Mobile App Dev", "System Design"] },
    { title: "Cyber Security", icon: Shield, color: "bg-red-100 text-red-700", items: ["Penetration Testing Details", "Cryptography", "Network Security", "Risk Assessment"] },
    { title: "Information Technology", icon: Database, color: "bg-green-100 text-green-700", items: ["Database Management (SQL)", "Cloud Computing (AWS/Azure)", "Networking", "IT Project Management"] }
  ];

  return (
    <div className="bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Our Services</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">Specialized support tailored exclusively for tech, IT, and engineering students in Australia.</p>
        </div>

        {/* Service Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
            <FileText className="w-10 h-10 text-blue-600 mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Assignments & Coding Tasks</h3>
            <p className="text-slate-600">From short weekly coding labs to comprehensive programming assignments. We ensure clean, commented, and efficient code that meets all rubric requirements.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
            <Cpu className="w-10 h-10 text-indigo-600 mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Semester Projects</h3>
            <p className="text-slate-600">End-to-end development of web, mobile, or hardware projects. Includes comprehensive documentation, system diagrams, and setup instructions.</p>
          </div>
        </div>

        {/* Domains */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-10">Subject Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm hover:border-blue-300 transition">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${cat.color}`}>
                  <cat.icon className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-4">{cat.title}</h4>
                <ul className="space-y-2">
                  {cat.items.map((item, i) => (
                    <li key={i} className="text-slate-600 text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
