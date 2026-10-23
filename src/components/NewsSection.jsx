import React from 'react';
import { useApp } from '../context/AppContext';
import { Calendar, ArrowRight, Clock, Tag } from 'lucide-react';

export default function NewsSection() {
  const { lang } = useApp();
  const isAr = lang === 'ar';

  const articles = [
    {
      img: '/assets/news-1.jpg',
      category: isAr ? 'الأسواق والتصدير' : 'Global Markets',
      readTime: isAr ? '3 دقائق قراءة' : '3 min read',
      date: isAr ? '10 أكتوبر 2026' : 'October 10, 2026',
      title: isAr
        ? 'استهلاك الديزل الحيوي المخلوط يتجاوز 4.3 مليون كيلولتر عالمياً'
        : 'Blended Biodiesel Consumption Exceeds 4.3M Kilolitres Globally',
      desc: isAr
        ? 'تسارع قياسي في الطلب على وقود UCOME المشتق من زيوت الطهي المستعملة مع توجه أساطيل النقل البحري والبري نحو خفض الانبعاثات وتحقيق الحياد الكربوني.'
        : 'Record surge in global demand for waste-derived UCOME biofuel as commercial marine and overland transport fleets accelerate decarbonization roadmaps.',
    },
    {
      img: '/assets/news-2.jpg',
      category: isAr ? 'التكنولوجيا والعمليات' : 'Refining Tech',
      readTime: isAr ? '4 دقائق قراءة' : '4 min read',
      date: isAr ? '10 أبريل 2026' : 'April 10, 2026',
      title: isAr
        ? 'قمة تقنيات الوقود الحيوي تركز على التقطير المغلق واسترجاع المشتقات'
        : 'Biofuel Summit Highlights High-Yield Closed-Loop Distillation',
      desc: isAr
        ? 'خبراء الصناعة يستعرضون أحدث تقنيات التقطير الفراغي واستعادة الميثانول بنسبة 99.8%، مع إنتاج جلسرين تقني عالي النقاوة وتقليل الفواقد لأدنى مستوى.'
        : 'Industry leaders explore advanced vacuum distillation and 99.8% closed-loop methanol recovery, producing high-purity technical glycerine with near-zero waste.',
    },
    {
      img: '/assets/news-3.jpg',
      category: isAr ? 'الاستدامة والاعتماد' : 'ISCC Standards',
      readTime: isAr ? '5 دقائق قراءة' : '5 min read',
      date: isAr ? '24 مارس 2026' : 'March 24, 2026',
      title: isAr
        ? 'معايير أوروبية مشددة لتوثيق توازن الكتلة وخفض غازات الاحتباس'
        : 'ISCC EU Enforces Stricter Mass-Balance & GHG Reduction Baselines',
      desc: isAr
        ? 'التشريعات الدولية تلزم الموردين بسلسلة تتبع رقمية كاملة من نقطة التجميع الأولى، مع إثبات وفورات انبعاثات تفوق 85% لكل شحنة متجهة للأسواق الأوروبية.'
        : 'Updated international mandates require verified batch-level custody from the collection point, confirming verified greenhouse gas savings over 85–95%.',
    },
  ];

  return (
    <section id="news" className="py-20 lg:py-28 bg-[#EFF5ED] dark:bg-[#0B2412] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 sm:mb-16">
          <div className="max-w-2xl space-y-3">
            <span className="font-mono text-xs font-semibold uppercase tracking-eyebrow text-[#D9921A] dark:text-[#F4AF35]">
              {isAr ? 'آخر المستجدات' : 'UPDATES & INSIGHTS'}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#091D0D] dark:text-white leading-tight">
              {isAr
                ? 'أحدث الأخبار من «مصادر» وحركة السوق'
                : 'Latest news from Masader and the market'}
            </h2>
            <p className="text-sm sm:text-base text-[#839085] dark:text-[#EFF5ED]/70 leading-relaxed font-normal">
              {isAr
                ? 'متابعة دورية لتحركات أسواق الطاقة المتجددة، تقنيات التكرير النظيف، وتطورات تشريعات الوقود الحيوي عالمياً.'
                : 'Continuous insights into renewable fuel trading, circular refining technologies, and global sustainability policy.'}
            </p>
          </div>

          <a
            href="#news"
            className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#091D0D] dark:text-[#EFF5ED] hover:text-[#D9921A] dark:hover:text-[#F4AF35] transition-colors shrink-0"
          >
            <span>{isAr ? 'عرض جميع الأخبار' : 'Read All Articles'}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </a>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {articles.map((item, idx) => (
            <article
              key={idx}
              className="rounded-3xl overflow-hidden bg-white dark:bg-[#10301A] border border-[#091D0D]/10 dark:border-[#EFF5ED]/10 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col group"
            >
              {/* Image Container - Full bleed edge-to-edge, optimal aspect ratio */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#091D0D]/5 dark:bg-black/30">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Subtle dark gradient overlay for depth and badge contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-black/20 opacity-70 group-hover:opacity-50 transition-opacity duration-300" />

                {/* Floating Category Badge */}
                <div className="absolute top-3.5 start-3.5 z-10">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full font-mono text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-white bg-black/50 backdrop-blur-md border border-white/20 shadow-sm">
                    <Tag className="w-3 h-3 text-[#F4AF35]" />
                    <span>{item.category}</span>
                  </span>
                </div>

                {/* Reading Time Pill */}
                <div className="absolute bottom-3 end-3 z-10">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[10px] text-white/90 bg-black/60 backdrop-blur-md border border-white/10">
                    <Clock className="w-3 h-3 text-[#9DCB5B]" />
                    <span>{item.readTime}</span>
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 font-mono text-xs text-[#839085] dark:text-[#EFF5ED]/60">
                    <Calendar className="w-3.5 h-3.5 text-[#588435] dark:text-[#9DCB5B]" />
                    <span>{item.date}</span>
                  </div>

                  <h3 className="font-display text-lg sm:text-xl font-bold text-[#091D0D] dark:text-white group-hover:text-[#D9921A] dark:group-hover:text-[#F4AF35] transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#091D0D]/75 dark:text-[#EFF5ED]/70 leading-relaxed font-normal line-clamp-3">
                    {item.desc}
                  </p>
                </div>

                {/* Card Footer Link */}
                <div className="pt-4 border-t border-[#091D0D]/5 dark:border-[#EFF5ED]/10 flex items-center justify-between font-mono text-xs font-semibold text-[#D9921A] dark:text-[#F4AF35]">
                  <span className="inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                    <span>{isAr ? 'اقرأ المقال بالكامل' : 'Read Full Article'}</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </span>
                  <span className="text-[10px] text-[#091D0D]/40 dark:text-[#EFF5ED]/40 uppercase tracking-wider font-mono">
                    {isAr ? 'مصادر' : 'MASADER'}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
