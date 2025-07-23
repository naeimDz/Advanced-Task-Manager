"use client"
import React, { useState, useEffect } from 'react';
import { Brain, Search, Link2, Globe, BookOpen, Users, Zap, Lock, ArrowRight, Github, Play,Network, FlaskConical, Share2, Edit } from 'lucide-react';
import Link from 'next/link';

const DigitalKnowledgeGardenLanding = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <Link2 className="w-8 h-8" />,
      title: "ربط الأفكار الذكي",
      description: "نظام [[Wiki-links]] متطور لربط الملاحظات تلقائياً",
      demo: "[[فكرة جديدة]] ترتبط مع [[مفهوم قديم]]"
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "البحث المتطور",
      description: "بحث فوري وذكي عبر المحتوى والوسوم مع دعم الأخطاء الإملائية",
      demo: "البحث عن 'ذكاء اصطناعي' يجد 'الذكاء الإصطناعي  → 12 نتيجة في 0.03 ثاني'"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "مشاركة انتقائية",
      description: "اختر ما تريد مشاركته مع العالم، واحتفظ بخصوصية باقي أفكارك",
      demo: "🔒 خاص: 847 ملاحظة | 🌍 عام: 23 ملاحظة",
    },
    {
    icon: <Share2 className="w-8 h-8" />,
    title: "مشاركة فورية برابط مخصص",
    description: "احصل على رابط فريد لكل ملاحظة عامة لمشاركتها مع أي شخص",
    demo: "notes.app/share/abc123 → مشاركة مباشرة"
  },
    {
      icon: <FlaskConical className="w-8 h-8" />,
      title: "البحث التجريبي",
      description: "ميزة SmartNoteFinder للاستكشاف المتقدم والربط التلقائي",
      demo: "اكتشاف الملاحظات ذات الصلة تلقائياً"
    }
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl animate-bounce delay-500"></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className={`text-center max-w-6xl mx-auto transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 p-6 rounded-3xl shadow-2xl">
              <Brain className="w-16 h-16 text-white" />
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-200 bg-clip-text text-transparent">
            Digital Knowledge Garden
          </h1>
          
          <p className="text-2xl md:text-3xl text-cyan-200/90 mb-4 font-light">
            حديقة معرفية تفاعلية
          </p>
          
          <p className="text-lg md:text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              منصة ثورية لتنظيم ومشاركة المعرفة بطريقة تفاعلية ذكية. 
              <span className="text-purple-400"> ربط الأفكار</span> • 
              <span className="text-blue-400"> خرائط مرئية</span> • 
              <span className="text-teal-400"> مشاركة انتقائية</span>
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
            <Link href={"/login"}>
              <button className="group bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 text-lg font-semibold border border-white/20">
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                جرب المشروع
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link href={"https://github.com/naeimDz/shared-notes"} >
            <button className="group bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-2xl hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-3 text-lg font-semibold border border-white/20">
              <Github className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              الكود المصدري
            </button>
            </Link>
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
                      <Link2 className="w-4 h-4" />
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
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-200 to-purple-200 bg-clip-text text-transparent">
              المميزات الرئيسية
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              تقنيات متقدمة تجعل من إدارة المعرفة تجربة سلسة وممتعة
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {features.map((feature, idx) => (
              <div 
                key={idx}
                className={`group bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-500 cursor-pointer transform hover:scale-105 ${activeFeature === idx ? 'ring-2 ring-cyan-400' : ''}`}
                onMouseEnter={() => setActiveFeature(idx)}
              >
                <div className="flex items-start gap-6">
                  <div className="bg-gradient-to-r from-cyan-500 to-purple-600 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-cyan-200 mb-3 group-hover:text-cyan-100 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-slate-300 mb-4 leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-600/30 font-mono text-sm text-emerald-300">
                      {feature.demo}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

     {/* Public Gallery Feature */}
      <section className="py-20 px-4 bg-gradient-to-br from-amber-900/20 to-orange-900/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">
              📖 The Open Notebook
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              دفتر الأفكار المفتوح - معرض أنيق للملاحظات العامة
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Description */}
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-xl border border-amber-500/30 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-3 rounded-xl">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-amber-200">تجربة قراءة فريدة</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2"></div>
                    <div>
                      <span className="font-semibold text-amber-200">تصميم كلاسيكي:</span>
                      <span className="text-slate-300 ml-2">يحاكي شكل المفكرة التقليدية مع صفحات منفصلة</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                    <div>
                      <span className="font-semibold text-orange-200">تنقل سهل:</span>
                      <span className="text-slate-300 ml-2">أرقام صفحات وأزرار تنقل أنيقة</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                    <div>
                      <span className="font-semibold text-yellow-200">فلترة ذكية:</span>
                      <span className="text-slate-300 ml-2">البحث والتصفية حسب الوسوم</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2"></div>
                    <div>
                      <span className="font-semibold text-amber-200">مشاركة مرنة:</span>
                      <span className="text-slate-300 ml-2">رابط مباشر للوصول السريع للمعرض</span>
                    </div>
                  </div>
                </div>
              </div>
{/** 
              <div className="bg-gradient-to-r from-amber-900/30 to-orange-900/30 backdrop-blur-sm rounded-xl p-6 border border-amber-500/20">
                <div className="flex items-center gap-3 mb-3">
                  <Globe className="w-5 h-5 text-amber-400" />
                  <span className="font-semibold text-amber-200">رابط المعرض العام</span>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3 font-mono text-sm text-emerald-300">
                  https://knowledge-garden.com/public-notes
                </div>
              </div>
*/}
            </div>
            {/* Visual Demo */}
            <div className="relative">
              <div className="bg-amber-50 rounded-2xl p-8 shadow-2xl border-4 border-amber-200 transform rotate-1">
                {/* Notebook Header */}
                <div className="text-center mb-6">
                  <div className="flex justify-center mb-3">
                    <div className="bg-amber-800 p-2 rounded-full">
                      <BookOpen className="w-6 h-6 text-amber-100" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-amber-900 mb-1">The Open Notebook</h3>
                  <p className="text-amber-700 text-sm">دفتر الأفكار المفتوح</p>
                </div>

                {/* Tags */}
                <div className="mb-4">
                  <p className="text-amber-800 text-sm mb-2">المواضيع:</p>
                  <div className="flex flex-wrap gap-2">
                    {["فكر", "تجريد", "حياة", "فلسفة", "second brain"].map((tag, idx) => (
                      <span key={idx} className="bg-amber-200 text-amber-800 px-2 py-1 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Sample Notes */}
                <div className="space-y-4 mb-6">
                  <div className="bg-white/70 rounded-lg p-4 border-r-4 border-amber-500">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-amber-900">هل القيمة قد "التطور" ولا "الأثر"؟</h4>
                      <span className="text-xs text-amber-700">July 20, 2025</span>
                    </div>
                    <p className="text-amber-800 text-sm">في الحوار، الناس ما يحاول يضع شيء بعين...</p>
                  </div>

                  <div className="bg-white/70 rounded-lg p-4 border-r-4 border-orange-500">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-amber-900">تحكيم أساسية في بناء Second Brain</h4>
                      <span className="text-xs text-amber-700">July 20, 2025</span>
                    </div>
                    <p className="text-amber-800 text-sm">الفرق بين connect و create و capture في...</p>
                  </div>
                </div>

                {/* Pagination */}
                <div className="flex justify-center">
                  <div className="flex items-center gap-2">
                    <button className="w-8 h-8 bg-amber-800 text-white rounded-full text-sm">1</button>
                    <button className="w-8 h-8 bg-amber-200 text-amber-800 rounded-full text-sm">2</button>
                    <span className="text-amber-700">...</span>
                    <button className="w-8 h-8 bg-amber-200 text-amber-800 rounded-full text-sm">4</button>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-3 -right-3 w-6 h-6 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-3 -left-3 w-4 h-4 bg-gradient-to-r from-orange-400 to-red-500 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      </section>


      {/* Technology Stack */}
      <section className="py-20 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-200 to-purple-200 bg-clip-text text-transparent">
              🛠️ التقنيات المستخدمة
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              مبني بأحدث التقنيات لضمان الأداء والموثوقية
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Frontend */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-xl">
                  <div className="w-6 h-6 bg-white/30 rounded"></div>
                </div>
                <h3 className="text-2xl font-bold text-cyan-200">🧩 Frontend</h3>
              </div>
              <div className="space-y-3">
                {["Next.js 14+", "React 18+", "TypeScript", "Tailwind CSS", "Lucide React"].map((tech, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-slate-300">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="font-medium">{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Backend */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-3 rounded-xl">
                  <div className="w-6 h-6 bg-white/30 rounded"></div>
                </div>
                <h3 className="text-2xl font-bold text-orange-200">🔐 Backend</h3>
              </div>
              <div className="space-y-3">
                {["Firebase Auth", "Firestore", "Real-time Updates", "Security Rules"].map((tech, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-slate-300">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span className="font-medium">{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-xl">
                  <div className="w-6 h-6 bg-white/30 rounded"></div>
                </div>
                <h3 className="text-2xl font-bold text-emerald-200">⚙️ الأداء</h3>
              </div>
              <div className="space-y-3">
                {["Custom Hooks", "React Context", "Optimistic Updates", "Error Boundaries"].map((tech, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-slate-300">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span className="font-medium">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Plans */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-200 to-purple-200 bg-clip-text text-transparent">
              🚀 الخطط المستقبلية
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              ميزات قادمة لتحسين التجربة أكثر
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Next Version */}
            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-blue-200">الإصدار القادم</h3>
              </div>
              <div className="space-y-4">
                {[
                  { title: "محرر نصوص متقدم", desc: "دعم Markdown وتنسيق غني" },
                  { title: "خرائط ذهنية تفاعلية", desc: "عرض بصري للروابط" },
                  { title: "التعاون الجماعي", desc: "مشاركة وتحرير مع فرق العمل" },
                  { title: "أتمتة الوسوم", desc: "اقتراح وسوم تلقائية بالذكاء الاصطناعي" }
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 group">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 group-hover:scale-150 transition-transform"></div>
                    <div>
                      <span className="font-semibold text-blue-200">{feature.title}:</span>
                      <span className="text-slate-300 ml-2">{feature.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Advanced Features */}
            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-3 rounded-xl">
                  <FlaskConical className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-purple-200">ميزات متقدمة</h3>
              </div>
              <div className="space-y-4">
                {[
                  { title: "تصدير/استيراد", desc: "دعم تنسيقات متعددة (JSON, Markdown)" },
                  { title: "نسخ احتياطية تلقائية", desc: "حماية البيانات" },
                  { title: "تحليلات متقدمة", desc: "إحصائيات عميقة للاستخدام" },
                  { title: "واجهة برمجة التطبيقات", desc: "دمج مع تطبيقات أخرى" }
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 group">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 group-hover:scale-150 transition-transform"></div>
                    <div>
                      <span className="font-semibold text-purple-200">{feature.title}:</span>
                      <span className="text-slate-300 ml-2">{feature.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mt-12 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-4">
                <span className="text-slate-300">التقدم في التطوير</span>
                <span className="text-cyan-400 font-bold">46%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-3">
                <div className="bg-gradient-to-r from-cyan-500 to-purple-600 h-3 rounded-full transition-all duration-1000" style={{ width: '46%' }}></div>
              </div>
              <p className="text-sm text-slate-400 mt-3">
                المزيد من الميزات قيد التطوير !
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-200 to-purple-200 bg-clip-text text-transparent">
            من يمكنه الاستفادة؟
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <BookOpen className="w-8 h-8" />, title: "الطلاب", desc: "ربط المفاهيم الدراسية وتنظيم المعرفة", color: "from-blue-500 to-cyan-500" },
              { icon: <Users className="w-8 h-8" />, title: "المحترفون", desc: "إدارة المعرفة المؤسسية والمشاريع", color: "from-emerald-500 to-teal-500" },
              { icon: <Zap className="w-8 h-8" />, title: "المبدعون", desc: "تطوير الأفكار وربط الإلهامات", color: "from-purple-500 to-indigo-500" },
              {icon: <Share2 className="w-8 h-8" />, title: "المعلمون",desc: "مشاركة المحتوى التعليمي برابط مباشر مع الطلاب",color: "from-orange-500 to-red-500"},
              { icon: <Network className="w-8 h-8" />, title: "الباحثون", desc: "تتبع النظريات وبناء شبكة معرفية", color: "from-pink-500 to-rose-500" }
            ].map((useCase, idx) => (
              <div key={idx} className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 text-center">
                <div className={`bg-gradient-to-r ${useCase.color} p-4 rounded-2xl mb-4 inline-block group-hover:scale-110 transition-transform`}>
                  {useCase.icon}
                </div>
                <h3 className="text-xl font-bold text-cyan-200 mb-3">{useCase.title}</h3>
                <p className="text-slate-300 text-sm">{useCase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* // قسم "كيف تعمل المشاركة"*/}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            شارك معرفتك مع العالم
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                <Edit className="w-8 h-8 text-white" />
              </div>
              <h3>اكتب ملاحظتك</h3>
              <p>اكتب أفكارك واجعلها "عامة"</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-600 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                <Link2 className="w-8 h-8 text-white" />
              </div>
              <h3>احصل على الرابط</h3>
              <p>رابط فريد يتم إنشاؤه تلقائياً</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-600 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3>شارك مع الآخرين</h3>
              <p>أرسل الرابط لأي شخص للاطلاع</p>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-cyan-900/30 via-purple-900/30 to-indigo-900/30 backdrop-blur-xl border border-white/20 rounded-3xl p-12 shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-200 to-purple-200 bg-clip-text text-transparent">
              ابدأ رحلة المعرفة
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              حوّل طريقة تفكيرك وتنظيم معرفتك. ابني حديقتك المعرفية اليوم واكتشف كيف تنمو الأفكار وتتطور.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href={"/login"}>
              <button className="group bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white px-10 py-5 rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 text-lg font-semibold border border-white/20">
                <Brain className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                ابدأ الآن مجاناً
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              </Link>
              <Link href={"https://github.com/naeimDz/shared-notes"} >
                <button className="group bg-white/10 backdrop-blur-sm text-white px-10 py-5 rounded-2xl hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-3 text-lg font-semibold border border-white/20">
                  <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  View on GitHub
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      
      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10 bg-black/20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 p-3 rounded-2xl">
              <Brain className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-200 to-purple-200 bg-clip-text text-transparent">
            Digital Knowledge Garden
          </h3>
          <p className="text-slate-400 mb-6">
              💻 Built with Nextjs, TypeScript, Tailwind CSS • 🚀 Optimized for Performance • 🎨 Designed for UX
          </p>

          <div className="flex justify-center gap-6">
            <Link href={"https://github.com/naeimDz/shared-notes"} >
              <button className="text-slate-400 hover:text-cyan-400 transition-colors">GitHub</button>
            </Link>
            <button className="text-slate-400 hover:text-cyan-400 transition-colors">Linkedin</button>
            <button className="text-slate-400 hover:text-cyan-400 transition-colors">Demo</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DigitalKnowledgeGardenLanding;