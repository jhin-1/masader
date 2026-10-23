import React from 'react';
import { useApp } from '../context/AppContext';
import { RefreshCw, Factory, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function WhatWeDoSection() {
  const { lang, setIsQuoteModalOpen } = useApp();
  const isAr = lang === 'ar';

  const steps = [
    {
      num: '01',
      tag: isAr ? 'الخطوة الأولى' : 'STEP 01',
      title: isAr ? 'التجميع والتوريد الموثق' : 'Collect',
      subtitle: isAr ? 'شبكة وطنية لتجميع زيوت الطهي' : 'Traceable Feedstock Sourcing',
      desc: isAr
        ? 'شبكة متنامية في كافة محافظات مصر تجمع زيوت الطهي المستعملة والزيوت المتبقية ضمن سلسلة تتبع رقمية موثقة من النقطة الأولى.'
        : 'A growing national network collecting used cooking oil and residual fatty acids, establishing batch-level custody from the very first drop.',
      icon: RefreshCw,
      badge: isAr ? 'تتبع كامل 100%' : '100% Traceable',
    },
    {
      num: '02',
      tag: isAr ? 'الخطوة الثانية' : 'STEP 02',
      title: isAr ? 'التصنيع والتكرير المغلق' : 'Process',
      subtitle: isAr ? 'طاقة 12,000 طن متري سنوياً' : 'Closed-Loop Biofuel Refining',
      desc: isAr
        ? 'تقنية معالجة وتكرير مغلقة لاستخلاص وقود الديزل الحيوي النقي واستعادة الجلسرين والميثانول بأعلى درجات الكفاءة التشغيلية.'
        : 'Closed-loop transesterification, methanol distillation recovery, and continuous in-house quality control producing EN 14214-spec biofuel.',
      icon: Factory,
      badge: isAr ? 'طاقة 12,000 طن' : '12,000 MTPA',
    },
    {
      num: '03',
      tag: isAr ? 'الخطوة الثالثة' : 'STEP 03',
      title: isAr ? 'الاعتماد والتصدير الدولي' : 'Certify & Export',
      subtitle: isAr ? 'مطابقة للمواصفات الأوروبية' : 'ISCC EU Audited & Export-Ready',
      desc: isAr
        ? 'توثيق كل شحنة بشهادات ISCC EU معتمدة تثبت خفض الانبعاثات بنسبة 85-95% للتصدير إلى أسواق أوروبا وإفريقيا تسليم الإسكندرية.'
        : 'ISCC EU audited chain of custody, greenhouse gas savings verified against EU directives, and shipped Ex-Works Alexandria to EU and African buyers.',
      icon: ShieldCheck,
      badge: isAr ? 'خفض انبعاثات 85-95%' : '85-95% GHG Savings',
    },
  ];

  return (
    <section id="governed-steps" className="py-20 lg:py-28 bg-[#EFF5ED] dark:bg-[#0B2412] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <span className="font-mono text-xs font-semibold uppercase tracking-eyebrow text-[#D9921A] dark:text-[#F4AF35]">
            {isAr ? 'نظام الدورة المغلقة' : 'CLOSED-LOOP METHODOLOGY'}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#091D0D] dark:text-white leading-tight">
            {isAr
              ? 'من الزيوت المستهلكة إلى وقود معتمد، في ثلاث مراحل محكومة'
              : 'From spent oil to certified fuel, in three governed steps'}
          </h2>
          <p className="text-base text-[#839085] dark:text-[#EFF5ED]/75 leading-relaxed font-normal">
            {isAr
              ? 'سلسلة إمداد وتصنيع رقمية كاملة تربط التجميع المحلي في مصر بالمعايير القياسية العالمية للاقتصاد الدائري.'
              : 'A fully traceable, closed-loop industrial process turning waste streams into high-value clean energy.'}
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="group relative p-8 sm:p-9 rounded-3xl bg-white dark:bg-[#10301A] border border-[#091D0D]/10 dark:border-[#EFF5ED]/10 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-6">
                  {/* Top Bar with Number and Badge */}
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-2xl font-black text-[#9DCB5B] dark:text-[#9DCB5B]">
                      {step.num}
                    </span>
                    <span className="px-3 py-1 rounded-full font-mono text-[11px] font-semibold uppercase tracking-wider bg-[#EFF5ED] dark:bg-white/10 text-[#091D0D] dark:text-[#EFF5ED]">
                      {step.badge}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-2xl bg-[#9DCB5B]/20 text-[#091D0D] dark:text-[#9DCB5B] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title & Desc */}
                  <div className="space-y-2">
                    <h3 className="font-display text-xl font-bold text-[#091D0D] dark:text-white">
                      {step.title}
                    </h3>
                    <div className="font-mono text-xs font-semibold text-[#D9921A] dark:text-[#F4AF35]">
                      {step.subtitle}
                    </div>
                    <p className="text-sm text-[#091D0D]/75 dark:text-[#EFF5ED]/70 leading-relaxed pt-2 font-normal">
                      {step.desc}
                    </p>
                  </div>
                </div>

                {/* Bottom line accent */}
                <div className="pt-6 mt-6 border-t border-[#091D0D]/5 dark:border-[#EFF5ED]/10 flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#091D0D]/60 dark:text-[#EFF5ED]/60">
                    {step.tag}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-[#9DCB5B]" />
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA banner under steps */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#9DCB5B]/20 dark:bg-[#10301A]/60 border border-[#9DCB5B]/30 flex flex-wrap justify-between items-center gap-4">
          <div className="space-y-1">
            <h4 className="font-bold text-base text-[#091D0D] dark:text-white">
              {isAr ? 'هل تمتلك زيوت طهي مستعملة أو تبحث عن توريد معتمد؟' : 'Have feedstock to supply or need certified biodiesel?'}
            </h4>
            <p className="text-xs sm:text-sm text-[#091D0D]/75 dark:text-[#EFF5ED]/70">
              {isAr ? 'نقدم عقود توريد طويلة الأجل وتسهيلات لوجستية متكاملة.' : 'We provide long-term offtake contracts and integrated logistic solutions.'}
            </p>
          </div>
          <button
            onClick={() => setIsQuoteModalOpen(true)}
            className="px-5 py-2.5 rounded-xl font-semibold text-xs uppercase tracking-wider text-[#091D0D] bg-[#F4AF35] hover:bg-[#D9921A] transition shadow-sm"
          >
            {isAr ? 'تواصل مع فريق التوريد' : 'Partner With Us'}
          </button>
        </div>
      </div>
    </section>
  );
}
