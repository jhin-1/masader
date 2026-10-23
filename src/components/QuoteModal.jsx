import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Send, CheckCircle, Sparkles, Building2, User, Mail, Phone, Scale } from 'lucide-react';

export default function QuoteModal() {
  const { isQuoteModalOpen, setIsQuoteModalOpen, t, lang } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    product: 'B100 Biodiesel (PURE Grade)',
    quantity: '',
    notes: '',
  });

  const isAr = lang === 'ar';

  if (!isQuoteModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
  };

  const handleClose = () => {
    setIsQuoteModalOpen(false);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        product: 'B100 Biodiesel (PURE Grade)',
        quantity: '',
        notes: '',
      });
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#0C2217] border border-[#091D0D]/10 dark:border-[#EFF5ED]/10 shadow-2xl p-6 sm:p-8 text-[#091D0D] dark:text-[#EFF5ED]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          aria-label="Close modal"
          className="absolute top-5 end-5 p-2 rounded-full bg-black/5 dark:bg-white/10 text-[#091D0D] dark:text-[#EFF5ED] hover:bg-black/10 dark:hover:bg-white/20 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#9DCB5B]/20 text-[#588435] dark:text-[#9DCB5B] flex items-center justify-center">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="font-display text-2xl font-bold text-[#091D0D] dark:text-white">
              {t.modal.successTitle}
            </h3>
            <p className="text-sm text-[#091D0D]/70 dark:text-[#EFF5ED]/80 max-w-md mx-auto leading-relaxed">
              {t.modal.successDesc}
            </p>
            <div className="pt-4">
              <button
                onClick={handleClose}
                className="px-6 py-2.5 rounded-xl font-bold text-sm text-[#091D0D] bg-[#F4AF35] hover:bg-[#D9921A] transition shadow"
              >
                {t.modal.closeBtn}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Header */}
            <div className="space-y-1.5 pe-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-xs font-semibold text-[#D9921A] dark:text-[#F4AF35] bg-[#F4AF35]/15 border border-[#F4AF35]/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ISCC EU Certified Supply</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-[#091D0D] dark:text-white">
                {t.modal.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#091D0D]/70 dark:text-[#EFF5ED]/70">
                {t.modal.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#091D0D] dark:text-[#EFF5ED] flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#D9921A]" />
                  <span>{t.modal.nameLabel}</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t.modal.namePlaceholder}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#091D0D]/15 dark:border-[#EFF5ED]/15 bg-black/5 dark:bg-[#10301A] text-[#091D0D] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F4AF35]"
                />
              </div>

              {/* Company */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#091D0D] dark:text-[#EFF5ED] flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#D9921A]" />
                  <span>{t.modal.companyLabel}</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder={t.modal.companyPlaceholder}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#091D0D]/15 dark:border-[#EFF5ED]/15 bg-black/5 dark:bg-[#10301A] text-[#091D0D] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F4AF35]"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#091D0D] dark:text-[#EFF5ED] flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#D9921A]" />
                  <span>{t.modal.emailLabel}</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={t.modal.emailPlaceholder}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#091D0D]/15 dark:border-[#EFF5ED]/15 bg-black/5 dark:bg-[#10301A] text-[#091D0D] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F4AF35]"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#091D0D] dark:text-[#EFF5ED] flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#D9921A]" />
                  <span>{t.modal.phoneLabel}</span>
                </label>
                <input
                  type="tel"
                  required
                  dir="ltr"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder={t.modal.phonePlaceholder}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#091D0D]/15 dark:border-[#EFF5ED]/15 bg-black/5 dark:bg-[#10301A] text-[#091D0D] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F4AF35]"
                />
              </div>
            </div>

            {/* Product & Quantity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#091D0D] dark:text-[#EFF5ED]">
                  {t.modal.productLabel}
                </label>
                <select
                  value={formData.product}
                  onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#091D0D]/15 dark:border-[#EFF5ED]/15 bg-black/5 dark:bg-[#10301A] text-[#091D0D] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F4AF35]"
                >
                  <option value="B100 Biodiesel (PURE)">{t.modal.prodOpt1}</option>
                  <option value="B100 Biodiesel (PUREMAX)">{t.modal.prodOpt2}</option>
                  <option value="Technical Glycerine">{t.modal.prodOpt3}</option>
                  <option value="UCO Feedstock Partnership">{t.modal.prodOpt4}</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#091D0D] dark:text-[#EFF5ED] flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-[#D9921A]" />
                  <span>{t.modal.qtyLabel}</span>
                </label>
                <input
                  type="text"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  placeholder={t.modal.qtyPlaceholder}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#091D0D]/15 dark:border-[#EFF5ED]/15 bg-black/5 dark:bg-[#10301A] text-[#091D0D] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F4AF35]"
                />
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#091D0D] dark:text-[#EFF5ED]">
                {t.modal.notesLabel}
              </label>
              <textarea
                rows="2"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder={t.modal.notesPlaceholder}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#091D0D]/15 dark:border-[#EFF5ED]/15 bg-black/5 dark:bg-[#10301A] text-[#091D0D] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F4AF35] resize-none"
              ></textarea>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-[#091D0D] bg-[#F4AF35] hover:bg-[#D9921A] shadow-md flex items-center justify-center gap-2 active:scale-95 transition"
              >
                {loading ? (
                  <span>{t.modal.sending}</span>
                ) : (
                  <>
                    <span>{t.modal.submitBtn}</span>
                    <Send className="w-4 h-4 rtl:rotate-180" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
