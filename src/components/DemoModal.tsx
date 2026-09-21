import React, { useState } from 'react';
import { X, CheckCircle2, Calendar, Sparkles, Building2, Phone, User } from 'lucide-react';
import { Language } from '../content/copy';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export default function DemoModal({ isOpen, onClose, lang }: DemoModalProps) {
  const [businessType, setBusinessType] = useState('gym');
  const [businessName, setBusinessName] = useState('');
  const [city, setCity] = useState('Algiers');
  const [phone, setPhone] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const isRTL = lang === 'ar';

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="relative w-full max-w-lg bg-[#12141a] border border-stone-800 rounded-xl shadow-2xl p-6 sm:p-8 text-stone-200 overflow-hidden">
        {/* Subtle terracotta background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#b85438]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-100 hover:bg-stone-800/60 rounded-lg transition cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#c85a3a] mb-2 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {lang === 'ar'
                  ? 'عرض توضيحي موجز لمدة 15 دقيقة'
                  : lang === 'fr'
                  ? 'Démonstration ciblée de 15 minutes'
                  : 'Concise 15-Minute Screen Walkthrough'}
              </span>
            </div>

            <h3 className="text-2xl font-serif font-light text-stone-100 mb-2">
              {lang === 'ar'
                ? 'شاهد أتريوم مهيأً تماماً لنشاطك التجاري'
                : lang === 'fr'
                ? 'Voyez Atrium configuré pour votre établissement'
                : 'See Atrium configured for your specific business'}
            </h3>

            <p className="text-xs text-stone-400 mb-6 leading-relaxed">
              {lang === 'ar'
                ? 'سنعرض لك كيف يستبدل أتريوم فوضى دفاتر الورق ورسائل الواتساب على أرض الواقع.'
                : lang === 'fr'
                ? 'Nous vous montrerons comment Atrium remplace les carnets et les discussions WhatsApp sur le terrain.'
                : 'No generic slide deck. We will show you the exact daily workflow for your gym, salon, or restaurant.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-stone-400 mb-1.5">
                  {lang === 'ar' ? 'نوع النشاط التجاري' : lang === 'fr' ? 'Secteur d’activité' : 'Business Vertical'}
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {[
                    { id: 'gym', label: lang === 'ar' ? 'قاعة رياضة' : lang === 'fr' ? 'Salle de sport' : 'Gym' },
                    { id: 'salon', label: lang === 'ar' ? 'صالون حلاقة' : lang === 'fr' ? 'Salon / Spa' : 'Salon / Spa' },
                    { id: 'restaurant', label: lang === 'ar' ? 'مطعم / كافيه' : lang === 'fr' ? 'Restaurant' : 'Restaurant' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setBusinessType(item.id)}
                      className={`p-2.5 rounded-lg border text-center transition cursor-pointer font-medium ${
                        businessType === item.id
                          ? 'bg-[#b85438]/20 border-[#b85438] text-white shadow-sm'
                          : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-stone-400 mb-1">
                    {lang === 'ar' ? 'اسم صاحب العمل' : lang === 'fr' ? 'Votre nom' : 'Your Name'}
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-500 absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="text"
                      required
                      placeholder={lang === 'ar' ? 'مثال: كريم ب.' : 'e.g. Karim B.'}
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-stone-900/80 border border-stone-800 rounded-lg text-stone-100 placeholder-stone-600 focus:outline-hidden focus:border-[#b85438]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-stone-400 mb-1">
                    {lang === 'ar' ? 'اسم المحل / المؤسسة' : lang === 'fr' ? 'Nom de l’établissement' : 'Business Name'}
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-stone-500 absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="text"
                      required
                      placeholder={lang === 'ar' ? 'مثال: أطلس جيم' : 'e.g. Atlas Gym Club'}
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-stone-900/80 border border-stone-800 rounded-lg text-stone-100 placeholder-stone-600 focus:outline-hidden focus:border-[#b85438]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-stone-400 mb-1">
                    {lang === 'ar' ? 'المدينة' : lang === 'fr' ? 'Ville' : 'City / Location'}
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-900/80 border border-stone-800 rounded-lg text-stone-200 focus:outline-hidden focus:border-[#b85438]"
                  >
                    <option value="Algiers">Algiers (الجزائر العاصمة)</option>
                    <option value="Oran">Oran (وهران)</option>
                    <option value="Constantine">Constantine (قسنطينة)</option>
                    <option value="Sétif">Sétif (سطيف)</option>
                    <option value="Blida">Blida (البليدة)</option>
                    <option value="Annaba">Annaba (عنابة)</option>
                    <option value="Other">Other MENA Region</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-stone-400 mb-1">
                    {lang === 'ar' ? 'رقم الهاتف / واتساب' : lang === 'fr' ? 'Téléphone / WhatsApp' : 'Phone / WhatsApp'}
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-stone-500 absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="tel"
                      required
                      placeholder="0550 00 00 00"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-stone-900/80 border border-stone-800 rounded-lg text-stone-100 placeholder-stone-600 focus:outline-hidden focus:border-[#b85438]"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-lg bg-[#b85438] hover:bg-[#a24830] text-white font-medium text-xs tracking-wider uppercase transition shadow-lg shadow-[#b85438]/20 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>
                    {lang === 'ar'
                      ? 'تأكيد موعد العرض التوضيحي'
                      : lang === 'fr'
                      ? 'Confirmer le Rendez-vous'
                      : 'Confirm Demo Walkthrough'}
                  </span>
                </button>
              </div>

              <p className="text-[11px] text-stone-500 text-center">
                {lang === 'ar'
                  ? 'بدون بطاقة دفع، لا التزام طويل الأجل. سنتواصل معك لتحديد الوقت الأنسب لك.'
                  : lang === 'fr'
                  ? 'Sans carte bancaire, sans engagement. Nous vous contacterons par WhatsApp.'
                  : 'Zero card required. We will message you on WhatsApp to coordinate your preferred time.'}
              </p>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <h4 className="text-xl font-serif text-stone-100 font-light">
              {lang === 'ar' ? 'تم استلام طلبك بنجاح' : lang === 'fr' ? 'Demande bien reçue !' : 'Demo Request Confirmed'}
            </h4>

            <p className="text-xs text-stone-400 max-w-sm mx-auto leading-relaxed">
              {lang === 'ar'
                ? `شكراً ${ownerName || 'لك'}. سيتواصل معك أحد مهندسي ستوا ستوديو عبر واتساب على الرقم (${phone}) لتنسيق العرض التوضيحي المخصص لـ ${businessName || 'مشروعك'}.`
                : lang === 'fr'
                ? `Merci ${ownerName || ''}. Un ingénieur Stoa Studio va vous contacter via WhatsApp au (${phone}) pour coordonner la démonstration personnalisée pour ${businessName || 'votre établissement'}.`
                : `Thank you ${ownerName || ''}. A Stoa Studio engineer will message you directly on WhatsApp at (${phone}) to coordinate the walkthrough for ${businessName || 'your business'}.`}
            </p>

            <div className="pt-4">
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-6 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-mono transition cursor-pointer"
              >
                {lang === 'ar' ? 'إغلاق' : lang === 'fr' ? 'Fermer' : 'Close Window'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
