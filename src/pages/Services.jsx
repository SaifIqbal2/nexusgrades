import React from 'react';
import { Code, BookOpen, Cpu, Shield, FileText, PenTool, Database, Layout, Smartphone, Zap, FileCheck, BookMarked } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Services() {
  const whatsappNumber = "923393301238"; // WhatsApp number
  const whatsappMessage = "Hello! I'm interested in your services. Can you help me?";

  const handleWhatsApp = (service) => {
    const message = `Hi! I'm interested in your ${service} service. Can you help me?`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const categories = [
    { title: "Computer Science", icon: Code, color: "bg-blue-100 text-blue-700", items: ["Algorithm Design", "Data Structures", "Java, Python, C++", "Machine Learning Intro"] },
    { title: "Software Engineering", icon: Layout, color: "bg-purple-100 text-purple-700", items: ["Web Development (React, Node)", "Software Architecture", "Mobile App Dev", "System Design"] },
    { title: "Cyber Security", icon: Shield, color: "bg-red-100 text-red-700", items: ["Penetration Testing Details", "Cryptography", "Network Security", "Risk Assessment"] },
    { title: "Information Technology", icon: Database, color: "bg-green-100 text-green-700", items: ["Database Management (SQL)", "Cloud Computing (AWS/Azure)", "Networking", "IT Project Management"] }
  ];

  const services = [
    { title: "Web Development", icon: Layout, description: "Complete web applications using React, Node.js, and modern frameworks. From frontend to backend." },
    { title: "Assignment Solutions", icon: FileCheck, description: "Expert help with programming assignments, lab work, and coding tasks with detailed explanations." },
    { title: "Thesis Writing", icon: BookMarked, description: "Research paper writing, thesis compilation, literature review, and technical documentation support." },
    { title: "SaaS Projects", icon: Zap, description: "Build scalable Software-as-a-Service platforms with modern tech stack and best practices." },
    { title: "Android Development", icon: Smartphone, description: "Native Android apps with Java/Kotlin, Firebase integration, and Google Play deployment." },
    { title: "Project Management", icon: FileText, description: "End-to-end semester projects with documentation, deployment, and presentation support." }
  ];

  return (
    <div className="bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Our Services</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">Specialized support tailored exclusively for tech, IT, and engineering students in Australia.</p>
        </div>

        {/* Main Services with WhatsApp Buttons */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-10">Services We Provide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-blue-300 transition flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-blue-700" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{service.title}</h3>
                </div>
                <p className="text-slate-600 mb-6 flex-grow">{service.description}</p>
                <button 
                  onClick={() => handleWhatsApp(service.title)}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-1.557.821-2.816 2.088-3.645 3.711-1.598 3.099-.165 6.984 3.148 8.653 1.154.608 2.576.997 4.104 1.528l.554 1.266c.226.569.56 1.6 2.368 1.957h.134c.908 0 1.435-.489 1.694-1.158.315-.808.74-2.33.998-3.059.779-.197 1.592-.471 2.368-.996 1.236-.834 2.261-2.006 2.861-3.387 1.598-3.099.165-6.984-3.148-8.653-1.154-.608-2.576-.997-4.104-1.528l-.554-1.266c-.226-.569-.56-1.6-2.368-1.957h-.134c-.908 0-1.435.489-1.694 1.158-.315.808-.74 2.33-.998 3.059z"/>
                  </svg>
                  Contact on WhatsApp
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Service Types */}
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-10">Additional Support</h2>
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
                <h3 className="text-xl font-bold text-slate-900 mb-4">{cat.title}</h3>
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
