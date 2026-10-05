import React, { useState } from 'react';
import { Send, Phone, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

interface LoginViewProps {
  onLoginSuccess: (user: { fullName: string; phone: string }) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
  const [phoneDigits, setPhoneDigits] = useState('90 123 45 67');
  const [fullName, setFullName] = useState('Sardorbek Alimov');
  const [step, setStep] = useState<'phone' | 'telegram_otp'>('phone');
  const [otpCode, setOtpCode] = useState('4829');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatUzbekPhone = (raw: string) => {
    const digits = raw.replace(/\D/g, '').slice(0, 9);
    const parts: string[] = [];
    if (digits.length > 0) parts.push(digits.slice(0, 2));
    if (digits.length > 2) parts.push(digits.slice(2, 5));
    if (digits.length > 5) parts.push(digits.slice(5, 7));
    if (digits.length > 7) parts.push(digits.slice(7, 9));
    return parts.join(' ');
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg('');
    setPhoneDigits(formatUzbekPhone(e.target.value));
  };

  const handleRequestTelegram = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanDigits = phoneDigits.replace(/\D/g, '');
    if (cleanDigits.length < 9) {
      setErrorMsg('Iltimos, 9 xonali telefon raqamingizni to‘liq kiriting.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('telegram_otp');
    }, 350);
  };

  const handleVerifyTelegram = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.trim().length < 4) {
      setErrorMsg('Tasdiqlash kodini kiriting (masalan: 4829).');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess({
        fullName: fullName.trim() || 'Kadet O‘quvchi',
        phone: `+998 ${phoneDigits}`,
      });
    }, 300);
  };

  return (
    <div className="relative z-10 min-h-screen w-full flex flex-col justify-between px-4 py-6 sm:px-8">
      {/* Top Bar Contract: Zone 1 Brand, Zone 2 Context, Zone 3 Demo Quick Enter */}
      <header className="w-full max-w-6xl mx-auto flex items-center justify-between py-2">
        <a
          href="#top"
          onClick={(e) => e.preventDefault()}
          className="font-display text-lg sm:text-xl font-bold tracking-tight text-white"
        >
          SPACE ACADEMY
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
          <span>Astrofizika</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Orbital Matematika</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Kosmologiya</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Muhandislik</span>
        </nav>

        <button
          type="button"
          onClick={() =>
            onLoginSuccess({
              fullName: 'Sardorbek Alimov',
              phone: '+998 90 123 45 67',
            })
          }
          className="px-4 py-2 text-xs font-medium text-cyan-200 bg-cyan-500/10 border border-cyan-400/25 rounded-lg hover:bg-cyan-500/20 transition-colors whitespace-nowrap cursor-pointer"
        >
          Demo kirish
        </button>
      </header>

      {/* Center Glassmorphism Login Card (Section 40) */}
      <main className="flex-1 flex items-center justify-center my-8">
        <div className="w-full max-w-md relative">
          {/* Soft Cosmic Glow Behind Card */}
          <div
            className="absolute -inset-1 rounded-3xl opacity-50 blur-2xl pointer-events-none"
            style={{
              background:
                'linear-gradient(135deg, rgba(56, 189, 248, 0.28) 0%, rgba(124, 58, 237, 0.25) 100%)',
            }}
            aria-hidden="true"
          />

          <div className="relative rounded-2xl bg-slate-950/65 backdrop-blur-xl border border-cyan-300/20 p-6 sm:p-8 shadow-2xl">
            <div className="text-center mb-6">
              <p className="text-xs font-medium text-cyan-300 tracking-wide mb-2">
                Future Space Academy · Ta’lim portali
              </p>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
                Xush kelibsiz! 🚀
              </h1>
              <p className="text-sm sm:text-base text-slate-300">
                Bilimingizni sinab ko‘ring
              </p>
            </div>

            {step === 'phone' ? (
              <form onSubmit={handleRequestTelegram} className="space-y-4">
                <div>
                  <label
                    htmlFor="student-name"
                    className="block text-xs font-medium text-slate-300 mb-1.5"
                  >
                    Ism va familiyangiz
                  </label>
                  <input
                    id="student-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Masalan: Sardorbek Alimov"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone-input"
                    className="block text-xs font-medium text-slate-300 mb-1.5"
                  >
                    Telefon raqami
                  </label>
                  <div className="relative flex items-center">
                    <span className="inline-flex items-center gap-1.5 pl-3.5 pr-2.5 py-3 rounded-l-xl bg-slate-900 border border-r-0 border-slate-700/80 text-slate-300 text-sm font-mono select-none">
                      <Phone className="w-3.5 h-3.5 text-cyan-400" />
                      +998
                    </span>
                    <input
                      id="phone-input"
                      type="tel"
                      inputMode="numeric"
                      value={phoneDigits}
                      onChange={handlePhoneChange}
                      placeholder="90 123 45 67"
                      className="w-full px-3.5 py-3 rounded-r-xl bg-slate-900/80 border border-slate-700/80 text-white placeholder-slate-500 text-sm font-mono tabular-nums focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                      required
                    />
                  </div>
                </div>

                {errorMsg && (
                  <p className="text-xs text-rose-400 bg-rose-950/50 border border-rose-500/30 rounded-lg px-3 py-2">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-5 rounded-xl font-medium text-sm text-slate-950 bg-gradient-to-r from-cyan-300 via-sky-400 to-cyan-300 hover:from-cyan-200 hover:to-sky-300 active:scale-[0.99] transition-all shadow-[0_0_25px_rgba(56,189,248,0.35)] flex items-center justify-center gap-2.5 cursor-pointer whitespace-nowrap"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {isSubmitting
                      ? 'Bog‘lanmoqda...'
                      : 'Telegram orqali tasdiqlash'}
                  </span>
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyTelegram} className="space-y-4">
                <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-400/25 text-xs text-cyan-100 leading-relaxed">
                  <div className="flex items-center gap-2 font-medium text-cyan-300 mb-1">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>Telegram bot kodi yuborildi</span>
                  </div>
                  <span>
                    <strong>+998 {phoneDigits}</strong> raqamiga biriktirilgan
                    @SpaceAcademyUzBot orqali kelgan 4 xonali kodni tasdiqlang.
                  </span>
                </div>

                <div>
                  <label
                    htmlFor="otp-input"
                    className="block text-xs font-medium text-slate-300 mb-1.5"
                  >
                    Tasdiqlash kodi
                  </label>
                  <input
                    id="otp-input"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => {
                      setErrorMsg('');
                      setOtpCode(e.target.value.replace(/\D/g, ''));
                    }}
                    placeholder="4829"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-cyan-400/40 text-center text-lg font-mono tracking-[0.35em] text-white focus:outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  />
                </div>

                {errorMsg && (
                  <p className="text-xs text-rose-400 bg-rose-950/50 border border-rose-500/30 rounded-lg px-3 py-2">
                    {errorMsg}
                  </p>
                )}

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setStep('phone')}
                    className="px-4 py-3 rounded-xl text-xs font-medium text-slate-300 bg-slate-900/70 border border-slate-700 hover:bg-slate-800 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Orqaga
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3 px-5 rounded-xl font-medium text-sm text-slate-950 bg-gradient-to-r from-cyan-300 to-sky-400 hover:from-cyan-200 hover:to-sky-300 transition-all shadow-[0_0_25px_rgba(56,189,248,0.35)] flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                  >
                    <span>Akademiyaga kirish</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            <div className="mt-6 pt-5 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>4 ta kosmik modul</span>
              <span aria-hidden="true">·</span>
              <span>20+ interaktiv savollar</span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1 text-cyan-300">
                <Sparkles className="w-3 h-3" /> 60 FPS
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Quiet Footer */}
      <footer className="w-full max-w-6xl mx-auto text-center text-xs text-slate-400 py-2">
        <span>Space Academy · Zamonaviy kosmik ta’lim va sinov platformasi</span>
      </footer>
    </div>
  );
};
