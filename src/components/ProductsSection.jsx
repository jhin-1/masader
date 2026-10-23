import React from 'react';
import { useApp } from '../context/AppContext';
import { Droplet, FlaskConical, Layers, ArrowUpRight } from 'lucide-react';

export default function ProductsSection() {
  const { lang, setIsQuoteModalOpen } = useApp();
  const isAr = lang === 'ar';

  const products = [
    {
      title: isAr ? 'وقود الديزل الحيوي — PURE & PUREMAX' : 'Biodiesel — PURE & PUREMAX',
      grade: 'EN 14214 / ISCC EU',
      desc: isAr
        ? 'مُصنّع بدقة طبقاً للمواصفة القياسية الأوروبية EN 14214، ويتميز بخواص تدفق متميزة في درجات الحرارة المنخفضة وخفض كربوني يصل إلى 95%.'
        : 'Engineered to EN 14214 specifications with superior cold-filter plugging point (CFPP) profiles for Northern European winter climates.',
      specs: [
        isAr ? 'كثافة طاقة عالية واحتراق نظيف' : 'High energy density & clean combustion',
        isAr ? 'مطابق لمواصفات الاتحاد الأوروبي' : '100% EU RED II compliant',
        isAr ? 'تسليم فوري بميناء الإسكندرية' : 'Ex-Works / FOB Alexandria export terms',
      ],
      icon: Droplet,
      img: '/assets/web/barrel-584.png',
    },
    {
      title: isAr ? 'الجلسرين التقني المسترجع' : 'Crude & Technical Glycerine',
      grade: 'Tech Grade 80–85%',
      desc: isAr
        ? 'يُستخلص بنقاوة عالية عبر أبراج التقطير واستعادة الميثانول، وهو مخصص للصناعات الكيماوية والدهانات والراتنجات الصناعية.'
        : 'Recovered with high purity through vacuum distillation and closed-loop methanol rectification, tailored for industrial oleochemical synthesis.',
      specs: [
        isAr ? 'نقاوة تتراوح بين 80-85%' : '80–85% technical concentration',
        isAr ? 'خالٍ من الملوثات والشوائب' : 'De-salted and stripped of volatile residues',
        isAr ? 'تعبئة صهاريج وبراميل' : 'Supplied in bulk isotanks and flexibags',
      ],
      icon: FlaskConical,
      img: '/assets/web/cylinder-286.png',
    },
    {
      title: isAr ? 'مشتقات الأحماض الدهنية والـ Soap-Stock' : 'Soap-Stock & Fatty-Acid Derivatives',
      grade: 'Acid Oil / Residuals',
      desc: isAr
        ? 'استرجاع متكامل للكسور الدهنية العضوية المتبقية لتعظيم قيمة كل مرحلة من مراحل الدورة وإعادة توظيفها في التطبيقات البيئية والصناعية.'
        : 'Specialized organic fatty-acid fractions recovered from pre-treatment stages, utilized for bio-lubricants, soaps, and bio-industrial inputs.',
      specs: [
        isAr ? 'استرجاع كامل لكافة المشتقات' : 'Zero-waste circular stream recovery',
        isAr ? 'عالية المحتوى من المادة الدهنية' : 'High total fatty matter (TFM) content',
        isAr ? 'توريد مرن حسب المتطلبات' : 'Available for immediate export delivery',
      ],
      icon: Layers,
      img: '/assets/web/beaker-275.png',
    },
  ];

  return (
    <section id="products" className="py-20 lg:py-28 bg-[#F4F8F1] dark:bg-[#07190D] text-[#091D0D] dark:text-[#EFF5ED] transition-colors duration-300 relative overflow-hidden">
      {/* Background Subtle Pattern */}
      <div className="absolute top-0 end-0 w-[600px] h-[600px] bg-[#9DCB5B]/10 dark:bg-[#9DCB5B]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <span className="font-mono text-xs font-semibold uppercase tracking-eyebrow text-[#D9921A] dark:text-[#F4AF35]">
            {isAr ? 'منتجات معتمدة ومطابقة للمواصفات' : 'SPECIFICATION-BACKED, EXPORT READY'}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#091D0D] dark:text-white leading-tight">
            {isAr
              ? 'منتجات وقود ومواد كيماوية للاقتصاد الدائري'
              : 'Products engineered for compliance and high energy yield'}
          </h2>
          <p className="text-base text-[#839085] dark:text-[#EFF5ED]/70 leading-relaxed font-normal">
            {isAr
              ? 'نوفر منتجات الديزل الحيوي والجلسرين والمشتقات بدرجات نقاوة فائقة تخضع لفحوصات مخبرية دقيقة لكل دفعة.'
              : 'Every batch is backed by laboratory COA testing, mass-balance certificates, and strict quality assurance.'}
          </p>
        </div>

        {/* 3 Product Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {products.map((prod, idx) => {
            const Icon = prod.icon;
            return (
              <div
                key={idx}
                className="group rounded-3xl bg-white dark:bg-[#10301A]/80 border border-[#091D0D]/10 dark:border-[#EFF5ED]/10 p-8 flex flex-col justify-between hover:border-[#9DCB5B]/50 hover:-translate-y-1.5 transition-all duration-300 shadow-sm hover:shadow-xl"
              >
                <div className="space-y-6">
                  {/* Image & Header */}
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-2xl bg-[#9DCB5B]/20 text-[#091D0D] dark:text-[#9DCB5B] flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded-full font-mono text-[11px] font-semibold text-[#D9921A] dark:text-[#F4AF35] bg-[#F4AF35]/15 border border-[#F4AF35]/20">
                      {prod.grade}
                    </span>
                  </div>

                  {/* Visual Preview */}
                  <div className="h-44 flex items-center justify-center relative py-2">
                    <img
                      src={prod.img}
                      alt={prod.title}
                      className="max-h-40 w-auto object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-md"
                    />
                  </div>

                  {/* Title & Desc */}
                  <div className="space-y-2">
                    <h3 className="font-display text-xl font-bold text-[#091D0D] dark:text-white">
                      {prod.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#091D0D]/75 dark:text-[#EFF5ED]/70 leading-relaxed font-normal">
                      {prod.desc}
                    </p>
                  </div>

                  {/* Specs list */}
                  <div className="pt-2 border-t border-[#091D0D]/10 dark:border-[#EFF5ED]/10 space-y-2">
                    {prod.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2 text-xs text-[#091D0D]/80 dark:text-[#EFF5ED]/80 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#9DCB5B]" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <div className="pt-6 mt-6 border-t border-[#091D0D]/10 dark:border-[#EFF5ED]/10">
                  <button
                    onClick={() => setIsQuoteModalOpen(true)}
                    className="w-full py-2.5 rounded-xl font-mono text-xs font-semibold uppercase tracking-wider text-[#091D0D] dark:text-[#EFF5ED] bg-black/5 dark:bg-white/5 hover:bg-[#F4AF35] hover:text-[#091D0D] dark:hover:bg-[#F4AF35] dark:hover:text-[#091D0D] border border-[#091D0D]/15 dark:border-[#EFF5ED]/20 hover:border-[#F4AF35] transition-all flex items-center justify-center gap-2"
                  >
                    <span>{isAr ? 'طلب المواصفات والتسعير' : 'Request Specifications'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 rtl:rotate-90" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
