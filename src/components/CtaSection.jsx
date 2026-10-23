import React from 'react';
import { useApp } from '../context/AppContext';
import { Phone, ArrowUpRight } from 'lucide-react';

export default function CtaSection() {
  const { lang, setIsQuoteModalOpen } = useApp();
  const isAr = lang === 'ar';

  return (
    <section className="py-16 sm:py-20 bg-[#EFF5ED] dark:bg-[#0B2310] border-t border-[#091D0D]/10 dark:border-[#EFF5ED]/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 bg-[#091D0D] text-[#EFF5ED] p-8 sm:p-12 lg:p-16 rounded-3xl shadow-xl relative overflow-hidden">
          {/* Subtle Glow */}
          <div className="absolute top-0 end-0 w-80 h-80 bg-[#9DCB5B]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 start-0 w-80 h-80 bg-[#F4AF35]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Text */}
          <div className="relative z-10 space-y-3 max-w-2xl">
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
              {isAr
                ? 'هل أنت مستعد لدمج «مصادر» في سلسلة التوريد الخاصة بك؟'
                : 'Ready to bring Masader into your supply chain?'}
            </h2>
            <p className="text-sm sm:text-base text-[#EFF5ED]/75 font-normal leading-relaxed">
              {isAr
                ? 'تواصل معنا لمناقشة الكميات التعاقدية، طلب العينات، أو شراكات جمع وتوريد الزيوت.'
                : 'Talk to us about offtake volumes, samples, or feedstock partnerships.'}
            </p>
          </div>

          {/* Actions */}
          <div className="relative z-10 flex flex-wrap items-center gap-4 shrink-0">
            <a
              href="tel:+20347011465"
              dir="ltr"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-mono text-xs font-semibold text-[#EFF5ED] border border-[#EFF5ED]/20 hover:border-[#F4AF35] hover:text-[#F4AF35] transition-colors"
            >
              <Phone className="w-4 h-4 text-[#F4AF35]" />
              <span>+2 03 4701 1465</span>
            </a>

            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-xs uppercase tracking-wider text-[#091D0D] bg-[#F4AF35] hover:bg-[#D9921A] shadow-md transition-all active:scale-95"
            >
              <span>{isAr ? 'طلب عرض أسعار' : 'Request a Quotation'}</span>
              <ArrowUpRight className="w-4 h-4 rtl:rotate-90" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
