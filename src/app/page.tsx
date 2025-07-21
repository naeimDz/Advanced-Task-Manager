// app/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { 
  Brain, Network, Globe, Lock, Search, Plus, Link, 
  Code, Palette, Zap, Users, Eye, ChevronDown, 
  Star, ArrowRight, CheckCircle, Github, ExternalLink,
  Sparkles, Target, Layers, Monitor, Smartphone, Database
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [currentTech, setCurrentTech] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentTech((prev) => (prev + 1) % technologies.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "ربط الأفكار الذكي",
      description: "نظام [[Wiki-links]] متطور لربط الملاحظات تلقائياً",
      demo: "[[فلسفة التعلم]] → [[نظرية الشبكات]] → [[الخرائط الذهنية]]",
      color: "from-purple-500 to-blue-500"
    },
    {
      icon: <Network className="w-8 h-8" />,
      title: "خريطة المعرفة المرئية",
      description: "تصور شبكة أفكارك بطريقة تفاعلية جميلة",
      demo: "تصور ثلاثي الأبعاد للروابط بين 1000+ ملاحظة",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "مشاركة انتقائية",
      description: "اختر ما تريد مشاركته مع العالم، واحتفظ بخصوصية باقي أفكارك",
      demo: "🔒 خاص: 847 ملاحظة | 🌍 عام: 23 ملاحظة",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "بحث فوري ذكي",
      description: "ابحث في المحتوى، الوسوم، والروابط بسرعة البرق",
      demo: "البحث عن 'فلسفة' → 12 نتيجة في 0.03 ثانية",
      color: "from-blue-500 to-indigo-500"
    }
  ];

  const technologies = [
    { name: "React", icon: "⚛️", description: "مكتبة UI حديثة" },
    { name: "TypeScript", icon: "📘", description: "JavaScript مع الأنواع" },
    { name: "Tailwind CSS", icon: "🎨", description: "CSS framework سريع" },
    { name: "Node.js", icon: "🟢", description: "Backend قوي" },
    { name: "MongoDB", icon: "🍃", description: "قاعدة بيانات مرنة" },
    { name: "WebSocket", icon: "⚡", description: "تحديثات فورية" }
  ];

  const skills = [
    "Frontend Development",
    "UI/UX Design",
    "Database Design",
    "Real-time Systems",
    "API Development",
    "Responsive Design",
    "Performance Optimization",
    "Modern JavaScript/TS"
  ];

  const stats = [
    { number: "10K+", label: "ملاحظات محفوظة", icon: <Database className="w-5 h-5" /> },
    { number: "99.9%", label: "وقت التشغيل", icon: <Zap className="w-5 h-5" /> },
    { number: "500+", label: "مستخدم نشط", icon: <Users className="w-5 h-5" /> },
    { number: "<100ms", label: "سرعة البحث", icon: <Search className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      
      {/* Hero Section with Animated Background */}
      <div className="relative min-h-screen flex items-center justify-center">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-teal-900/20"></div>
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-purple-400/20 to-blue-400/20 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${Math.random() * 3 + 2}s`
              }}
            />
          ))}
        </div>

        <div className={`relative z-10 text-center max-w-6xl mx-auto px-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Main Logo */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl shadow-2xl mb-6 animate-bounce">
              <Brain className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-teal-400 bg-clip-text text-transparent mb-4">
              Digital Knowledge Garden
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 mb-2">حديقة معرفية تفاعلية</p>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
              منصة ثورية لتنظيم ومشاركة المعرفة بطريقة تفاعلية ذكية. 
              <span className="text-purple-400"> ربط الأفكار</span> • 
              <span className="text-blue-400"> خرائط مرئية</span> • 
              <span className="text-teal-400"> مشاركة انتقائية</span>
            </p>
          </div>

          {/* Tech Stack Carousel */}
          <div className="mb-12">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <p className="text-sm text-gray-400 mb-4">Built with Modern Technologies</p>
              <div className="flex items-center justify-center space-x-8">
                {technologies.map((tech, index) => (
                  <div
                    key={tech.name}
                    className={`transition-all duration-500 ${
                      currentTech === index 
                        ? 'scale-110 text-white' 
                        : 'scale-90 text-gray-500'
                    }`}
                  >
                    <div className="text-3xl mb-2">{tech.icon}</div>
                    <div className="text-sm font-semibold">{tech.name}</div>
                    <div className="text-xs text-gray-400">{tech.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center gap-3">
              <Sparkles className="w-5 h-5 group-hover:animate-spin" />
              تجربة المنصة
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border border-gray-600 hover:border-purple-400 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:bg-gray-800/50 flex items-center gap-3">
              <Github className="w-5 h-5" />
              View Source Code
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="flex items-center justify-center mb-2 text-purple-400">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <ChevronDown className="w-8 h-8 text-gray-400 animate-bounce" />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              ميزات متطورة
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              كل ما تحتاجه لبناء حديقة معرفية ناجحة ومنظمة
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Feature Cards */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    activeFeature === index
                      ? 'border-purple-500 bg-purple-900/20 shadow-2xl scale-105'
                      : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
                  }`}
                  onMouseEnter={() => setActiveFeature(index)}
                >
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white">{feature.title}</h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">{feature.description}</p>
                  <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                    <code className="text-sm text-green-400 font-mono">{feature.demo}</code>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Demo */}
            <div className="relative">
              <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-sm text-gray-400">Live Demo</div>
                </div>
                
                <div className="space-y-4">
                  {/* Demo Note Cards */}
                  <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-lg p-4 border border-purple-500/30">
                    <div className="flex items-center gap-3 mb-2">
                      <Brain className="w-5 h-5 text-purple-400" />
                      <span className="font-semibold">فلسفة التعلم التفاعلي</span>
                      <Globe className="w-4 h-4 text-green-400" />
                    </div>
                    <p className="text-sm text-gray-300 mb-2">
                      التعلم الحقيقي يحدث عندما نربط الأفكار...
                    </p>
                    <div className="flex gap-2">
                      <span className="bg-purple-600/30 text-purple-300 px-2 py-1 rounded-full text-xs">#فلسفة</span>
                      <span className="bg-blue-600/30 text-blue-300 px-2 py-1 rounded-full text-xs">#تعلم</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center py-4">
                    <div className="flex items-center gap-2 text-gray-400">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                      <div className="w-8 h-px bg-gradient-to-r from-purple-500 to-transparent"></div>
                      <Link className="w-4 h-4" />
                      <div className="w-8 h-px bg-gradient-to-r from-transparent to-blue-500"></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-900/50 to-teal-900/50 rounded-lg p-4 border border-blue-500/30">
                    <div className="flex items-center gap-3 mb-2">
                      <Network className="w-5 h-5 text-blue-400" />
                      <span className="font-semibold">نظرية الشبكات</span>
                      <Lock className="w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-300 mb-2">
                      الدماغ يعمل كشبكة معقدة من الروابط...
                    </p>
                    <div className="flex gap-2">
                      <span className="bg-blue-600/30 text-blue-300 px-2 py-1 rounded-full text-xs">#شبكات</span>
                      <span className="bg-teal-600/30 text-teal-300 px-2 py-1 rounded-full text-xs">#دماغ</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Showcase */}
      <section className="py-20 px-6 bg-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
              Technical Skills Demonstrated
            </h2>
            <p className="text-xl text-gray-400">
              This project showcases modern web development expertise
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <div
                key={skill}
                className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-purple-500 transition-all duration-300 hover:scale-105"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mb-4 group-hover:animate-pulse">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{skill}</h3>
                <p className="text-sm text-gray-400">Demonstrated through advanced implementation</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Flow */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              System Architecture
            </h2>
            <p className="text-xl text-gray-400">Scalable, modern, and efficient</p>
          </div>

          <div className="relative">
            {/* Architecture Diagram */}
            <div className="grid md:grid-cols-3 gap-8 items-center">
              
              {/* Frontend */}
              <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-2xl p-8 border border-blue-500/30">
                <div className="text-center mb-6">
                  <Monitor className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white">Frontend</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-300">React + TypeScript</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-gray-300">Tailwind CSS</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                    <span className="text-gray-300">Responsive Design</span>
                  </div>
                </div>
              </div>

              {/* API Layer */}
              <div className="bg-gradient-to-br from-green-900/30 to-teal-900/30 rounded-2xl p-8 border border-green-500/30">
                <div className="text-center mb-6">
                  <Layers className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white">API Layer</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">RESTful API</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                    <span className="text-gray-300">Real-time Updates</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span className="text-gray-300">Authentication</span>
                  </div>
                </div>
              </div>

              {/* Backend */}
              <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 rounded-2xl p-8 border border-orange-500/30">
                <div className="text-center mb-6">
                  <Database className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white">Backend</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span className="text-gray-300">Node.js + Express</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span className="text-gray-300">MongoDB</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-gray-300">Redis Cache</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Flow Arrows */}
            <div className="hidden md:block absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2">
                <ArrowRight className="w-8 h-8 text-purple-400 animate-pulse" />
              </div>
              <div className="absolute top-1/2 right-1/4 transform -translate-y-1/2">
                <ArrowRight className="w-8 h-8 text-purple-400 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-teal-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Star className="w-16 h-16 text-yellow-400 mx-auto mb-6 animate-bounce" />
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Ready to Explore?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              This is just a showcase of modern web development skills. 
              <br />Built with passion for clean code and beautiful UX.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center gap-4">
              <Brain className="w-6 h-6 group-hover:animate-spin" />
              Start Your Knowledge Garden
              <ExternalLink className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
            
            <button className="border-2 border-gray-600 hover:border-purple-400 px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 hover:bg-purple-900/20 flex items-center gap-4">
              <Github className="w-6 h-6" />
              View on GitHub
            </button>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800">
            <p className="text-gray-500 text-sm">
              💻 Built with React, TypeScript, Tailwind CSS • 🚀 Optimized for Performance • 🎨 Designed for UX
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;