import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Cpu, RefreshCw, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function CapacitySection() {
  const { lang, setIsQuoteModalOpen } = useApp();
  const isAr = lang === 'ar';

  // Interactive 3D tilt tracking
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const pillars = [
    {
      title: isAr ? 'النزاهة والشفافية الكاملة' : 'Integrity',
      desc: isAr
        ? 'سلسلة توريد مدققة بالكامل ومطابقة لاشتراطات ISCC EU الأوروبية، مع توثيق مستقل لكل شحنة وصولاً إلى مصدر الزيوت والمواد الأولية.'
        : 'ISCC EU audited chain of custody with greenhouse gas savings verified against strict European directives and complete mass-balance documentation.',
      icon: Shield,
    },
    {
      title: isAr ? 'الريادة الهندسية والتكنولوجية' : 'Technology Edge',
      desc: isAr
        ? 'هندسة عمليات متقدمة وخطوط معالجة وتكرير مغلقة تضمن استخلاص أعلى عائد طاقة وأقصى نقاوة للوقود الحيوي والجلسرين بأقل فواقد ممكنة.'
        : 'In-house process engineering that keeps finding new ways to turn waste streams into certified product — operating with high yields and minimal energy consumption.',
      icon: Cpu,
    },
    {
      title: isAr ? 'المرونة والتنوع التشغيلي' : 'Diversity & Agility',
      desc: isAr
        ? 'قدرة مرنة على تلبية احتياجات العملاء ومصانع الخلط الأوروبية والإفريقية بدرجات متعددة (PURE و PUREMAX) وشروط تسليم مرنة تناسب سلاسل التوريد الدولية.'
        : 'Agile refining capable of processing diverse waste oil streams into bespoke specifications, supported by seamless logistics from our Alexandria facility.',
      icon: RefreshCw,
    },
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-[#EFF5ED] dark:bg-[#0B2412] transition-colors overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Animated Oil Drop Hex Showcase (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
                transition: isHovered ? 'transform 0.15s ease-out' : 'transform 0.7s ease-out',
              }}
              className="relative w-full max-w-sm sm:max-w-md lg:max-w-none aspect-square flex items-center justify-center p-4 sm:p-6 select-none"
            >
              {/* Outer Decorative Glow Backplate */}
              <div className="absolute inset-4 rounded-3xl bg-gradient-to-br from-[#9DCB5B]/15 via-transparent to-[#F4AF35]/15 dark:from-[#9DCB5B]/10 dark:to-[#F4AF35]/10 border border-[#9DCB5B]/20 dark:border-[#9DCB5B]/15 backdrop-blur-sm -rotate-1 transition-transform duration-700 group-hover:rotate-0" />

              {/* Ambient Pulsing Glow Orbs */}
              <div className="absolute w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-[#F4AF35]/25 dark:bg-[#F4AF35]/20 animate-oil-aura pointer-events-none" />
              <div className="absolute w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-[#9DCB5B]/20 dark:bg-[#9DCB5B]/10 blur-3xl pointer-events-none" />

              {/* Concentric Expanding Ripple Waves */}
              <div className="absolute w-48 h-48 sm:w-56 sm:h-56 rounded-full border border-[#F4AF35]/40 animate-ripple-pulse pointer-events-none" />
              <div className="absolute w-48 h-48 sm:w-56 sm:h-56 rounded-full border border-[#9DCB5B]/40 animate-ripple-pulse-delayed pointer-events-none" />

              {/* Circular Economy Orbital SVG Rings */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 500 500"
                fill="none"
              >
                {/* Outer Clockwise Dashed Orbital Ring */}
                <g className="animate-spin-orbit origin-center">
                  <circle
                    cx="250"
                    cy="250"
                    r="215"
                    stroke="#9DCB5B"
                    strokeWidth="1.5"
                    strokeDasharray="6 14"
                    strokeOpacity="0.4"
                  />
                  {/* Orbital Green Energy Node */}
                  <circle cx="250" cy="35" r="4.5" fill="#9DCB5B" />
                  <circle cx="250" cy="35" r="8" fill="#9DCB5B" fillOpacity="0.3" />
                </g>

                {/* Inner Counter-Clockwise Golden Orbital Ring */}
                <g className="animate-spin-orbit-reverse origin-center">
                  <circle
                    cx="250"
                    cy="250"
                    r="175"
                    stroke="#F4AF35"
                    strokeWidth="1.5"
                    strokeDasharray="4 18"
                    strokeOpacity="0.5"
                  />
                  {/* Orbital Golden Droplet Node */}
                  <circle cx="250" cy="75" r="5" fill="#F4AF35" />
                  <circle cx="250" cy="75" r="10" fill="#F4AF35" fillOpacity="0.35" />
                </g>

                {/* Concentric Subtle Reference Circles */}
                <circle
                  cx="250"
                  cy="250"
                  r="238"
                  stroke="#091D0D"
                  strokeWidth="1"
                  strokeOpacity="0.06"
                  className="dark:stroke-white dark:stroke-opacity-5"
                />
              </svg>

              {/* Rising Bio-Bubbles Simulation */}
              <div className="absolute bottom-16 start-14 w-3 h-3 rounded-full bg-[#F4AF35]/60 animate-bubble-1 blur-[0.5px] pointer-events-none" />
              <div className="absolute bottom-20 end-16 w-2.5 h-2.5 rounded-full bg-[#9DCB5B]/70 animate-bubble-2 blur-[0.5px] pointer-events-none" />
              <div className="absolute bottom-12 start-1/3 w-3.5 h-3.5 rounded-full bg-[#F4AF35]/50 animate-bubble-3 blur-[0.5px] pointer-events-none" />

              {/* Main Oil Drop & Hexagonal Closed Loop Graphic */}
              <div className="relative z-10 w-60 h-60 sm:w-72 sm:h-72 lg:w-80 lg:h-80 flex items-center justify-center animate-oil-float">
                {/* Image with Drop Shadow & Responsive Hover */}
                <div className="relative overflow-hidden rounded-3xl p-2 transition-transform duration-500 hover:scale-105">
                  <img
                    src="/assets/oil-drop-hex.png"
                    alt="Masader Closed-Loop Biofuel Refining Emblem"
                    className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(9,29,13,0.18)] dark:drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] drop-shadow-[0_0_35px_rgba(244,175,53,0.35)]"
                  />
                  {/* Liquid Light Sweep Gleam */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                    <div className="w-[200%] h-16 bg-gradient-to-r from-transparent via-white/35 dark:via-white/20 to-transparent -rotate-45 animate-liquid-gleam" />
                  </div>
                </div>
              </div>

              {/* Floating Badge 1: Top-Start - ISCC EU Certification */}
              <div className="absolute top-4 sm:top-6 -start-2 sm:-start-6 z-20 animate-oil-float [animation-delay:-2s]">
                <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white/90 dark:bg-[#10301A]/90 border border-[#9DCB5B]/40 shadow-lg shadow-[#091D0D]/5 dark:shadow-black/20 backdrop-blur-md">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#9DCB5B] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#588435] dark:bg-[#9DCB5B]" />
                  </span>
                  <div className="text-start">
                    <div className="font-mono text-[10px] sm:text-[11px] font-bold text-[#091D0D] dark:text-white uppercase tracking-wider flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-[#588435] dark:text-[#9DCB5B]" />
                      <span>{isAr ? 'اعتماد أوروبي ISCC EU' : 'ISCC EU Certified'}</span>
                    </div>
                    <div className="text-[10px] text-[#091D0D]/60 dark:text-[#EFF5ED]/60 font-medium">
                      {isAr ? 'خفض انبعاثات حتى 95%' : 'Up to 95% GHG Savings'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge 2: Bottom-End - Refining Capacity & Spec */}
              <div className="absolute bottom-4 sm:bottom-6 -end-2 sm:-end-6 z-20 animate-oil-float [animation-delay:-4s]">
                <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white/90 dark:bg-[#10301A]/90 border border-[#F4AF35]/40 shadow-lg shadow-[#091D0D]/5 dark:shadow-black/20 backdrop-blur-md">
                  <div className="w-7 h-7 rounded-xl bg-[#F4AF35]/20 text-[#D9921A] dark:text-[#F4AF35] flex items-center justify-center shrink-0">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-start">
                    <div className="font-mono text-[10px] sm:text-[11px] font-bold text-[#091D0D] dark:text-white uppercase tracking-wider">
                      {isAr ? '12,000 طن سنوياً' : '12,000 MTPA'}
                    </div>
                    <div className="text-[10px] text-[#091D0D]/60 dark:text-[#EFF5ED]/60 font-medium">
                      {isAr ? 'ديزل حيوي قياسي EN 14214' : 'EN 14214 Spec Biofuel'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Content & 3 Pillars (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <span className="font-mono text-xs font-semibold uppercase tracking-eyebrow text-[#D9921A] dark:text-[#F4AF35]">
                {isAr ? 'نموذج عمل صُمم لغايات واضحة' : 'A MODEL BUILT FOR ONE PURPOSE'}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#091D0D] dark:text-white leading-tight">
                {isAr
                  ? 'طاقة معتمدة تتجاوز 12,000 طن سنوياً'
                  : 'Over 12,000 MTPA of certified circular refining'}
              </h2>
              <p className="text-base text-[#839085] dark:text-[#EFF5ED]/75 leading-relaxed font-normal">
                {isAr
                  ? 'تثبت «مصادر» قدرة الصناعة الوطنية على قيادة إنتاج الوقود الحيوي المطابق للاشتراطات البيئية والتصديرية العالمية.'
                  : 'Proving that Egypt can lead in industrial-scale, certified circular-economy fuel production with unmatched consistency and traceability.'}
              </p>
            </div>

            {/* 3 Pillars */}
            <div className="space-y-4 pt-2">
              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-white dark:bg-[#10301A] border border-[#091D0D]/10 dark:border-[#EFF5ED]/10 shadow-sm flex items-start gap-4 hover:border-[#9DCB5B]/50 transition-colors"
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#9DCB5B]/20 text-[#091D0D] dark:text-[#9DCB5B] flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-display text-lg font-bold text-[#091D0D] dark:text-white">
                        {pillar.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#091D0D]/75 dark:text-[#EFF5ED]/70 leading-relaxed font-normal">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-xs uppercase tracking-wider text-[#091D0D] bg-[#F4AF35] hover:bg-[#D9921A] shadow-md transition"
              >
                <span>{isAr ? 'طلب شهادات الاعتماد والوفورات' : 'View Certification Methodology'}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
