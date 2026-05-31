import React from 'react';
import { Users, CheckCircle } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-center lg:gap-16">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">About NexusGrades</h1>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Founded with the vision to bridge the gap between complex university curriculums and student success, <strong>NexusGrades</strong> has become a trusted name across Australia.
            </p>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              We know how demanding Computer Science, IT, Engineering, and Cyber Security degrees can be. That's why we assembled a specialized team of tech graduates and industry professionals to provide unparalleled academic support.
            </p>
            
            <div className="space-y-4">
              {[
                "Strictly focused on Tech & Engineering domains",
                "Based out of Australia for time-zone alignment",
                "Committed to Academic Integrity and Originality",
                "Confidential and secure service"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 relative shadow-sm">
              <div className="absolute top-0 right-0 -mr-4 -mt-4 bg-blue-100 p-4 rounded-full">
                <Users className="w-8 h-8 text-blue-700" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Our Core Values</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">1. Quality First</h3>
                  <p className="text-slate-600 mt-1">We write elegant, scalable code and thorough documentation.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">2. Empathy</h3>
                  <p className="text-slate-600 mt-1">We understand student stress and tight budgets. We aim to be supportive, responsive, and fair.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">3. Integrity</h3>
                  <p className="text-slate-600 mt-1">Providing unique custom solutions while guiding students to actually understand the concepts.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
