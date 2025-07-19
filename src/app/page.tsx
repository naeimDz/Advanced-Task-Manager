// app/page.tsx
'use client';

import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const subtitleText = 'حديقة معرفية تفاعلية - حيث تنمو الأفكار وتزدهر';



  useEffect(() => {
    const timer = setTimeout(() => setShowSubtitle(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  // scroll fade-in observer
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => (e.isIntersecting ? e.target.classList.add('visible') : null));
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="font-sans overflow-x-hidden">
      {/* Hero */}
      <section className="relative flex items-center justify-center h-screen bg-gradient-to-br from-indigo-500 to-purple-700 overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 z-0" />
        <div className="relative z-10 text-center text-white max-w-xl p-8">
          <h1 className="text-5xl font-bold mb-4 drop-shadow-lg animate-slideDown">🌱 Digital Knowledge Garden</h1>
          <p className={`text-xl mb-8 opacity-90 ${showSubtitle ? 'animate-slideUp' : 'opacity-0'}`}>
            { showSubtitle ? subtitleText : '' }
          </p>
          <a href="#demo" className="inline-block bg-gradient-to-r from-red-500 to-yellow-400 text-white py-3 px-6 rounded-full font-semibold text-lg transition transform hover:-translate-y-1 hover:shadow-lg animate-pulse">
            🚀 استكشف المنصة
          </a>
        </div>
        {/** floating particles */}
        {[0,1,2,3].map(i => (
          <div
            key={i}
            className="particle absolute w-1 h-1 bg-white bg-opacity-60 rounded-full animate-float"
            style={{ top: `${20 + i*20}%`, left: `${10 + i*20}%`, animationDelay: `${i}s` }}
          />
        ))}
      </section>

      {/* Features */}
      <section className="features fade-in py-20 bg-gradient-to-b from-gray-100 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-4xl mb-12 bg-gradient-to-r from-indigo-500 to-purple-700 bg-clip-text text-transparent">
            ✨ المميزات الرئيسية
          </h2>
          <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-3">
            {[
              ['🔗', 'روابط ذكية تفاعلية', 'Zettelkasten وروابط ثنائية الاتجاه'],
              ['🔒', 'خصوصية متقدمة', 'ملاحظات خاصة وعامة بشكل متحكم به'],
              ['🧠', 'خريطة ذهنية تلقائية', 'تصوير بصري ذكي لمجموع أفكارك'],
              ['🏷️', 'نظام وسوم ذكي', 'وسوم ديناميكية وتصنيف متقدم'],
              ['⚡', 'بحث فوري', 'Autocomplete وتسليط ضوء على النتائج'],
              ['📊', 'تحليلات معرفية', 'تقارير بصرية لفهم تطور المعرفة']
            ].map(([icon, title, desc], idx) => (
              <div key={idx} className="feature-card bg-white p-6 rounded-2xl shadow-sm border border-indigo-100 hover:shadow-lg hover:-translate-y-2 transition relative overflow-hidden">
                <div className="text-indigo-500 text-4xl mb-4">{icon}</div>
                <h3 className="text-2xl mb-2 text-gray-800">{title}</h3>
                <p className="text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flow */}
      <section className="flow fade-in py-20 bg-gradient-to-br from-pink-300 to-red-500 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-4xl mb-12">🔄 مسار تطوير المشروع</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {['التحليل والتصميم', 'التطوير الأساسي', 'نظام الروابط', 'البحث والتصفية', 'التصور والتحليل', 'التحسين والنشر'].map((step, i) => (
              <div key={i} className="flow-step text-center relative">
                <div className="step-number inline-block w-14 h-14 bg-white bg-opacity-20 rounded-full leading-14 text-2xl font-bold mb-4 backdrop-filter backdrop-blur-sm">{i+1}</div>
                <h3 className="text-xl">{step}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo */}
      <section id="demo" className="demo fade-in py-20 bg-gray-100 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl mb-8">🎥 شاهد المنصة في العمل</h2>
          <div onClick={() => alert('🚀 سيتم فتح التطبيق الفعلي هنا!')} className="demo-placeholder mx-auto max-w-2xl h-96 bg-gradient-to-br from-indigo-500 to-purple-700 rounded-xl relative flex items-center justify-center text-white text-4xl cursor-pointer overflow-hidden shadow-lg">
            🎬
          </div>
          <div className="grid gap-8 mt-8 md:grid-cols-2 lg:grid-cols-4">
            {['⚡ سريع ومتجاوب','🔐 آمن ومحمي','🌍 متاح في كل مكان','🎯 سهل الاستخدام'].map((txt,i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-lg">
                <div className="text-3xl mb-4">{txt.split(' ')[0]}</div>
                <h3 className="text-xl">{txt.split(' ')[1]}</h3>
                <p className="text-gray-600">{txt.split(' ')[2] || ''}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer bg-gray-900 text-white py-12 text-center">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl mb-4">🌱 Digital Knowledge Garden</h3>
          <p>حيث تنمو الأفكار وتزدهر المعرفة</p>
          <div className="flex justify-center my-6 space-x-4 text-2xl">
            <a href="#">📧</a><a href="#">🐙</a><a href="#">💼</a><a href="#">🐦</a>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-700 text-gray-400 text-sm">
            <p>© 2025 مشروع تطوير لاستعراض المهارات التقنية.</p>
            <p>React • Tailwind • Three.js • Graph Theory</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
