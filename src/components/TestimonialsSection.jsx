import React from 'react';
import { useApp } from '../context/AppContext';
import { Quote, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';

export default function TestimonialsSection() {
  const { lang } = useApp();
  const isAr = lang === 'ar';

  return (
    <section id="sustainability" className="py-20 lg:py-28 bg-[#F4F8F1] dark:bg-[#07190D] text-[#091D0D] dark:text-[#EFF5ED] transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14 sm:mb-16 space-y-3">
          <span className="font-mono text-xs font-semibold uppercase tracking-eyebrow text-[#D9921A] dark:text-[#F4AF35]">
            {isAr ? 'الاستدامة والاعتماد الدولي' : 'SUSTAINABILITY & AUDIT COMPLIANCE'}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#091D0D] dark:text-white leading-tight">
            {isAr
              ? 'شهادة ISCC EU ومنهجية موثقة لخفض الانبعاثات'
              : 'See the ISCC EU certificate and our GHG methodology'}
          </h2>
          <p className="text-sm sm:text-base text-[#839085] dark:text-[#EFF5ED]/70 leading-relaxed font-normal">
            {isAr
              ? 'كل شحنة تخرج من مصادر موثقة بشهادة استدامة رقمية تثبت خفض انبعاثات الكربون بنسبة تفوق 85%.'
              : 'Every batch leaving Masader is accompanied by sustainability declaration documentation proving over 85–95% GHG savings.'}
          </p>
        </div>

        {/* 2-Column Card with Testimonial & Harbor Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden bg-white dark:bg-[#10301A]/90 border border-[#091D0D]/10 dark:border-[#EFF5ED]/10 shadow-xl group">
          {/* Left Column: Testimonial & Stats (6 cols) */}
          <div className="lg:col-span-6 p-8 sm:p-12 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-[#9DCB5B]/20 text-[#091D0D] dark:text-[#9DCB5B] flex items-center justify-center shadow-inner">
                <Quote className="w-6 h-6 fill-current" />
              </div>

              <blockquote className="font-display text-xl sm:text-2xl font-semibold text-[#091D0D] dark:text-white leading-snug">
                {isAr
                  ? '«فريق العمل متعاون وودود للغاية ومحترف! ساهمت حلولهم في رفع كفاءة سلاسل الإمداد لدينا بشكل ملحوظ وضمان تدفق لوجستي سلس لشحنات الوقود المعتمدة.»'
                  : '"The staff is exceptionally responsive and professional! These solutions have significantly improved our supply chain efficiency, ensuring seamless logistics for export-grade certified fuel."'}
              </blockquote>

              {/* Person Profile / Avatar */}
              <div className="flex items-center gap-4 pt-2">
                <div className="relative shrink-0">
                  <img
                    src="/assets/avatar-omar.png"
                    alt="Omar Mohamed"
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover object-top ring-2 ring-[#F4AF35] shadow-md shadow-[#F4AF35]/25"
                  />
                  <span className="absolute bottom-0 end-0 w-4 h-4 bg-[#588435] dark:bg-[#9DCB5B] rounded-full border-2 border-white dark:border-[#10301A] flex items-center justify-center">
                    <CheckCircle2 className="w-3 h-3 text-white dark:text-[#091D0D]" />
                  </span>
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-display text-base font-bold text-[#091D0D] dark:text-white">
                      {isAr ? 'عمر محمد' : 'Omar Mohamed'}
                    </h4>
                    <span className="font-mono text-[10px] text-[#588435] dark:text-[#9DCB5B] font-bold uppercase tracking-wider bg-[#9DCB5B]/15 px-2 py-0.5 rounded-full border border-[#9DCB5B]/30">
                      {isAr ? 'شريك توريد معتمد' : 'Verified Partner'}
                    </span>
                  </div>
                  <p className="font-mono text-xs text-[#D9921A] dark:text-[#F4AF35] font-medium">
                    {isAr ? 'مدير سلاسل الإمداد واللوجستيات' : 'Supply Chain & Logistics Director'}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Metrics Checklist */}
            <div className="pt-6 border-t border-[#091D0D]/10 dark:border-[#EFF5ED]/10 grid grid-cols-2 gap-4">
              <div className="space-y-1 p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-[#091D0D]/5 dark:border-white/5">
                <div className="flex items-center gap-1.5 font-mono text-xl sm:text-2xl font-black text-[#588435] dark:text-[#9DCB5B]">
                  <ShieldCheck className="w-5 h-5 text-[#588435] dark:text-[#9DCB5B] shrink-0" />
                  <span>85–95%</span>
                </div>
                <div className="text-xs text-[#091D0D]/70 dark:text-[#EFF5ED]/70 font-medium">
                  {isAr ? 'وفورات كربونية موثقة' : 'Verified GHG Savings'}
                </div>
              </div>

              <div className="space-y-1 p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-[#091D0D]/5 dark:border-white/5">
                <div className="flex items-center gap-1.5 font-mono text-xl sm:text-2xl font-black text-[#D9921A] dark:text-[#F4AF35]">
                  <CheckCircle2 className="w-5 h-5 text-[#D9921A] dark:text-[#F4AF35] shrink-0" />
                  <span>100%</span>
                </div>
                <div className="text-xs text-[#091D0D]/70 dark:text-[#EFF5ED]/70 font-medium">
                  {isAr ? 'تتبع توازن الكتلة' : 'Mass-Balance Traced'}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Tanker at Harbor Sunset (6 cols) */}
          <div className="lg:col-span-6 min-h-[380px] lg:min-h-full relative overflow-hidden bg-[#091D0D]">
            <img
              src="/assets/truck-clean.png"
              alt="Masader clean logistics tanker truck at port terminal"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />

            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

            {/* Floating Terminal Location Chip */}
            <div className="absolute bottom-4 start-4 end-4 sm:end-auto z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-black/60 backdrop-blur-md border border-white/20 text-white shadow-lg">
                <MapPin className="w-3.5 h-3.5 text-[#F4AF35]" />
                <span className="font-mono text-xs font-semibold tracking-wide">
                  {isAr ? 'محطة ميناء الإسكندرية — تصدير مباشر' : 'Alexandria Port Terminal — Direct Export'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
