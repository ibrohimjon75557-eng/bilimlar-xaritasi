import React, { useState } from 'react';
import {
  Play,
  Search,
  LogOut,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  UserPlus,
  TrendingUp,
  Award,
  Sliders,
} from 'lucide-react';
import {
  SpaceTest,
  StudentRecord,
  TestAttemptResult,
} from '../data/spaceAcademyData';

export type DashboardSection =
  | 'overview'
  | 'tests'
  | 'students'
  | 'results'
  | 'statistics';

interface DashboardViewProps {
  currentUser: { fullName: string; phone: string };
  tests: SpaceTest[];
  students: StudentRecord[];
  results: TestAttemptResult[];
  activeSection: DashboardSection;
  onSelectSection: (section: DashboardSection) => void;
  onStartTest: (test: SpaceTest, previewOutcome?: 'pass' | 'fail' | null) => void;
  onAddStudent: (newStudent: StudentRecord) => void;
  onLogout: () => void;
  reducedMotionOverride: boolean;
  onToggleReducedMotion: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  currentUser,
  tests,
  students,
  results,
  activeSection,
  onSelectSection,
  onStartTest,
  onAddStudent,
  onLogout,
  reducedMotionOverride,
  onToggleReducedMotion,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('Barchasi');
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentPhone, setNewStudentPhone] = useState('');
  const [showAddStudentForm, setShowAddStudentForm] = useState(false);

  // Interactive Orbital Velocity Calculator State (Educational Simulation Widget)
  const [orbitAltitudeKm, setOrbitAltitudeKm] = useState(400); // ISS default ~400 km

  // Calculate real orbital velocity v = sqrt(GM / (R_earth + h))
  // GM_earth = 3.986e5 km^3/s^2, R_earth = 6371 km
  const earthRadiusKm = 6371;
  const gmEarth = 398600.4418;
  const orbitalRadiusKm = earthRadiusKm + orbitAltitudeKm;
  const orbitalVelocityKms = Math.sqrt(gmEarth / orbitalRadiusKm).toFixed(2);
  const orbitalPeriodMinutes = Math.round(
    ((2 * Math.PI * orbitalRadiusKm) /
      Math.sqrt(gmEarth / orbitalRadiusKm)) /
      60
  );

  // Compute aggregate statistics
  const totalCompletedAttempts = results.length;
  const passedAttempts = results.filter((r) => r.passed).length;
  const passRatePercent =
    totalCompletedAttempts > 0
      ? Math.round((passedAttempts / totalCompletedAttempts) * 100)
      : 0;
  const avgScoreAll =
    totalCompletedAttempts > 0
      ? Math.round(
          results.reduce((sum, r) => sum + r.scorePercent, 0) /
            totalCompletedAttempts
        )
      : 86;

  const filteredTests = tests.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDiff =
      difficultyFilter === 'Barchasi' || t.difficulty === difficultyFilter;
    return matchesSearch && matchesDiff;
  });

  const filteredStudents = students.filter(
    (s) =>
      s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.academyRank.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim()) return;
    const created: StudentRecord = {
      id: `st-${Date.now()}`,
      fullName: newStudentName.trim(),
      phone: newStudentPhone.trim() || '+998 90 000 00 00',
      academyRank: 'Yangi Kadet',
      completedTests: 1,
      averageScore: 85,
      totalPoints: 250,
      lastActive: 'Hozirgina',
    };
    onAddStudent(created);
    setNewStudentName('');
    setNewStudentPhone('');
    setShowAddStudentForm(false);
  };

  const navItems: {
    id: DashboardSection;
    label: string;
    emoji: string;
    count?: string;
  }[] = [
    { id: 'overview', label: 'Kosmik Markaz', emoji: '🌌' },
    {
      id: 'tests',
      label: 'Testlar',
      emoji: '📚',
      count: `${tests.length}`,
    },
    {
      id: 'students',
      label: 'O‘quvchilar',
      emoji: '👨‍🎓',
      count: `${students.length}`,
    },
    {
      id: 'results',
      label: 'Natijalar',
      emoji: '🏆',
      count: `${results.length}`,
    },
    {
      id: 'statistics',
      label: 'Statistika',
      emoji: '📊',
      count: `${avgScoreAll}%`,
    },
  ];

  // The 4 main cosmic dashboard cards specified in Section 41
  const mainCosmicCards = [
    {
      id: 'tests' as DashboardSection,
      title: '📚 Testlar',
      metric: `${tests.length} ta modul`,
      subtitle: 'Astrofizika · Matematika · Kosmologiya',
      actionLabel: 'Testlarni ochish',
    },
    {
      id: 'students' as DashboardSection,
      title: '👨‍🎓 O‘quvchilar',
      metric: `${students.length} nafar`,
      subtitle: 'Faol kadetlar va akademiya reytingi',
      actionLabel: 'Ro‘yxatni ko‘rish',
    },
    {
      id: 'results' as DashboardSection,
      title: '🏆 Natijalar',
      metric: `${results.length} ta urinish`,
      subtitle: `Muvaffaqiyat ko‘rsatkichi: ${passRatePercent}%`,
      actionLabel: 'Natijalar jurnali',
    },
    {
      id: 'statistics' as DashboardSection,
      title: '📊 Statistika',
      metric: `${avgScoreAll}% o‘rtacha`,
      subtitle: 'Fanlar kesimida o‘zlashtirish tahlili',
      actionLabel: 'Tahlilni ko‘rish',
    },
  ];

  return (
    <div className="relative z-10 min-h-screen w-full flex flex-col lg:flex-row">
      {/* ==================================================
          41. SIDEBAR: Yarim shaffof glass effect, kosmik gradient, yumshoq glow, hoverda yengil animatsiya
          ================================================== */}
      <aside
        className="w-full lg:w-68 shrink-0 border-b lg:border-b-0 lg:border-r border-cyan-300/15 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6"
        style={{
          background:
            'linear-gradient(180deg, rgba(15, 23, 42, 0.72) 0%, rgba(7, 11, 25, 0.84) 100%)',
          boxShadow: '0 0 40px rgba(8, 145, 178, 0.08)',
        }}
      >
        <div>
          {/* Brand Header */}
          <div className="flex items-center justify-between lg:block mb-6">
            <a
              href="#dashboard"
              onClick={(e) => {
                e.preventDefault();
                onSelectSection('overview');
              }}
              className="font-display text-xl font-bold tracking-tight text-white block"
            >
              🚀 SPACE ACADEMY
            </a>
            <p className="hidden lg:block text-xs text-slate-400 mt-1">
              Future Space Academy · Ta’lim tizimi
            </p>

            {/* Mobile Quick Logout */}
            <button
              type="button"
              onClick={onLogout}
              className="lg:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-slate-300 bg-slate-900/80 border border-slate-700/80 hover:text-white cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Chiqish</span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectSection(item.id)}
                  className={`group flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0 lg:w-full transform lg:hover:translate-x-1 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-violet-500/15 text-white border border-cyan-400/40 shadow-[0_0_20px_rgba(56,189,248,0.18)]'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/60 border border-transparent hover:border-cyan-400/20'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="text-base select-none">{item.emoji}</span>
                    <span>{item.label}</span>
                  </span>
                  {item.count && (
                    <span
                      className={`font-mono text-xs tabular-nums ${
                        isActive ? 'text-cyan-300' : 'text-slate-400'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Cadet Profile & Performance Controls */}
        <div className="hidden lg:block pt-6 border-t border-slate-800/80 space-y-4">
          <div className="p-3.5 rounded-xl bg-slate-900/65 border border-slate-800/90">
            <div className="text-xs text-cyan-300 font-medium mb-0.5">
              Faol o‘quvchi
            </div>
            <div className="text-sm font-semibold text-white truncate">
              {currentUser.fullName}
            </div>
            <div className="text-xs font-mono text-slate-400 mt-0.5 tabular-nums">
              {currentUser.phone}
            </div>
          </div>

          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={onToggleReducedMotion}
              className="flex-1 px-3 py-2 rounded-lg text-xs font-medium bg-slate-900/70 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer whitespace-nowrap"
              title="prefers-reduced-motion: animatsiyalarni kamaytirish"
            >
              {reducedMotionOverride ? 'Animatsiya: Sokini' : 'Animatsiya: Faol'}
            </button>

            <button
              type="button"
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-slate-900/70 border border-slate-800 text-slate-300 hover:text-rose-300 hover:border-rose-500/30 transition-colors cursor-pointer whitespace-nowrap"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Chiqish</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ==================================================
          MAIN WORKSPACE VIEWPORT
          ================================================== */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar Contract: Zone 1 Context Title, Zone 2 Quick Links, Zone 3 Primary Action */}
        <header className="w-full px-6 py-4 border-b border-slate-800/80 bg-slate-950/40 backdrop-blur-md flex items-center justify-between gap-4">
          <a
            href="#section"
            onClick={(e) => e.preventDefault()}
            className="font-display text-lg font-bold tracking-tight text-white truncate"
          >
            Future Space Academy
          </a>

          <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-slate-300">
            <button
              type="button"
              onClick={() => onSelectSection('tests')}
              className="hover:text-cyan-300 transition-colors cursor-pointer whitespace-nowrap"
            >
              📚 Testlar
            </button>
            <button
              type="button"
              onClick={() => onSelectSection('students')}
              className="hover:text-cyan-300 transition-colors cursor-pointer whitespace-nowrap"
            >
              👨‍🎓 O‘quvchilar
            </button>
            <button
              type="button"
              onClick={() => onSelectSection('results')}
              className="hover:text-cyan-300 transition-colors cursor-pointer whitespace-nowrap"
            >
              🏆 Natijalar
            </button>
            <button
              type="button"
              onClick={() => onSelectSection('statistics')}
              className="hover:text-cyan-300 transition-colors cursor-pointer whitespace-nowrap"
            >
              📊 Statistika
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onStartTest(tests[0])}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-cyan-300 to-sky-400 text-slate-950 hover:from-cyan-200 hover:to-sky-300 transition-all shadow-[0_0_18px_rgba(56,189,248,0.3)] cursor-pointer whitespace-nowrap"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Testni boshlash</span>
            </button>
          </div>
        </header>

        {/* Main Scrollable Content */}
        <main className="flex-1 p-6 sm:p-8 max-w-6xl w-full mx-auto space-y-8">
          {/* ==================================================
              41. DASHBOARD KARTALARI (📚 Testlar, 👨‍🎓 O‘quvchilar, 🏆 Natijalar, 📊 Statistika)
              Har bir card: glassmorphism, backdrop blur, yengil border, subtle glow, hover animation
              ================================================== */}
          <section aria-label="Asosiy kosmik bo‘limlar">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-5">
              <div>
                <p className="text-xs font-medium text-cyan-300 mb-1">
                  Xush kelibsiz, {currentUser.fullName} · Kosmik o‘quv paneli
                </p>
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">
                  Kosmik Akademiya Boshqaruv Markazi
                </h1>
              </div>

              {/* Search Input */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Test yoki o‘quvchi izlash..."
                  className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-900/75 backdrop-blur-md border border-slate-700/80 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {mainCosmicCards.map((card) => {
                const isSelected = activeSection === card.id;
                return (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() => onSelectSection(card.id)}
                    className={`text-left rounded-2xl p-5 backdrop-blur-xl transition-all duration-150 transform hover:-translate-y-1 cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900/80 border border-cyan-400/50 shadow-[0_0_28px_rgba(56,189,248,0.22)]'
                        : 'bg-slate-950/60 border border-cyan-300/15 hover:border-cyan-400/35 shadow-[0_0_20px_rgba(56,189,248,0.08)] hover:shadow-[0_0_26px_rgba(56,189,248,0.18)]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="font-display text-base font-bold text-white">
                        {card.title}
                      </span>
                      <span className="font-mono text-xs font-semibold text-cyan-300 tabular-nums">
                        {card.metric}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      {card.subtitle}
                    </p>
                    <div className="text-xs font-medium text-cyan-300 flex items-center justify-between pt-3 border-t border-slate-800/80">
                      <span>{card.actionLabel}</span>
                      <span aria-hidden="true">→</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* ==================================================
              SECTION 1: 📚 TESTLAR (Active in 'overview' and 'tests')
              ================================================== */}
          {(activeSection === 'overview' || activeSection === 'tests') && (
            <section className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <div>
                  <h2 className="font-display text-xl font-bold text-white">
                    📚 Kosmik Sinov Modullari va Testlar
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Bilimingizni sinash uchun modulni tanlang. Test sahifasi sokin
                    kosmik muhitda ochiladi.
                  </p>
                </div>

                {/* Interactive Filter Controls */}
                <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900/80 border border-slate-800 self-start">
                  {['Barchasi', 'Boshlang‘ich', 'O‘rta', 'Murakkab'].map(
                    (level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setDifficultyFilter(level)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                          difficultyFilter === level
                            ? 'bg-cyan-400 text-slate-950 font-semibold'
                            : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        {level}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredTests.map((testItem) => (
                  <div
                    key={testItem.id}
                    className="rounded-2xl bg-slate-950/65 backdrop-blur-xl border border-cyan-300/15 hover:border-cyan-400/35 p-6 transition-all duration-150 shadow-[0_0_24px_rgba(15,23,42,0.5)] hover:shadow-[0_0_28px_rgba(56,189,248,0.15)] flex flex-col justify-between"
                  >
                    <div>
                      {/* Unboxed clean metadata with middot separators */}
                      <div className="flex flex-wrap items-center gap-2 text-xs text-cyan-300 mb-2">
                        <span>{testItem.subject}</span>
                        <span aria-hidden="true">·</span>
                        <span>{testItem.difficulty} daraja</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums">
                          {testItem.questions.length} ta savol
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums">
                          {testItem.durationMinutes} daqiqa
                        </span>
                      </div>

                      <h3 className="font-display text-lg font-bold text-white mb-2">
                        {testItem.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                        {testItem.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                      <div className="text-xs text-slate-400 font-mono tabular-nums">
                        O‘tish ko‘rsatkichi: {testItem.passingScorePercent}%
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onStartTest(testItem)}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-all shadow-[0_0_16px_rgba(56,189,248,0.28)] cursor-pointer whitespace-nowrap"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Testni boshlash</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Celebration Preview Bar (Section 43 verification convenience) */}
              <div className="rounded-2xl bg-slate-950/60 backdrop-blur-xl border border-violet-400/20 p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-medium text-violet-300 mb-0.5">
                    Kosmik Celebration Animatsiyalarini Tezkor Ko‘rish
                  </div>
                  <p className="text-xs text-slate-300">
                    Test tugagandagi muvaffaqiyat (🚀 Tabriklaymiz!) yoki
                    motivatsion qayta urinish (💪) ekranini bir tugma bilan sinab
                    ko‘ring:
                  </p>
                </div>
                <div className="flex items-center gap-2.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => onStartTest(tests[0], 'pass')}
                    className="px-3.5 py-2 rounded-xl text-xs font-medium bg-emerald-500/15 border border-emerald-400/35 text-emerald-200 hover:bg-emerald-500/25 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    🚀 O‘tgan holatni ko‘rish
                  </button>
                  <button
                    type="button"
                    onClick={() => onStartTest(tests[0], 'fail')}
                    className="px-3.5 py-2 rounded-xl text-xs font-medium bg-violet-500/15 border border-violet-400/35 text-violet-200 hover:bg-violet-500/25 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    💪 Motivatsion holatni ko‘rish
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* ==================================================
              SECTION 2: 👨‍🎓 O‘QUVCHILAR (Active in 'overview' and 'students')
              ================================================== */}
          {(activeSection === 'overview' || activeSection === 'students') && (
            <section className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="font-display text-xl font-bold text-white">
                    👨‍🎓 Space Academy O‘quvchilari Reytingi
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Eng yuqori ball to‘plagan kadetlar va ularning o‘rtacha
                    ko‘rsatkichlari
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAddStudentForm((prev) => !prev)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium bg-slate-900/80 border border-cyan-400/30 text-cyan-300 hover:bg-cyan-950/50 transition-colors cursor-pointer whitespace-nowrap self-start"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>
                    {showAddStudentForm
                      ? 'Formani yopish'
                      : 'Yangi o‘quvchi qo‘shish'}
                  </span>
                </button>
              </div>

              {showAddStudentForm && (
                <form
                  onSubmit={handleCreateStudent}
                  className="rounded-2xl bg-slate-950/75 backdrop-blur-xl border border-cyan-400/30 p-5 flex flex-col sm:flex-row items-end gap-4"
                >
                  <div className="w-full sm:flex-1">
                    <label className="block text-xs text-slate-300 mb-1.5">
                      O‘quvchi ism-sharifi
                    </label>
                    <input
                      type="text"
                      value={newStudentName}
                      onChange={(e) => setNewStudentName(e.target.value)}
                      placeholder="Masalan: Ulug‘bek Mirzayev"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                      required
                    />
                  </div>
                  <div className="w-full sm:w-56">
                    <label className="block text-xs text-slate-300 mb-1.5">
                      Telefon raqami
                    </label>
                    <input
                      type="text"
                      value={newStudentPhone}
                      onChange={(e) => setNewStudentPhone(e.target.value)}
                      placeholder="+998 90 123 45 67"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Qo‘shish
                  </button>
                </form>
              )}

              <div className="rounded-2xl bg-slate-950/65 backdrop-blur-xl border border-cyan-300/15 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800/90 text-xs text-slate-400">
                        <th className="py-3.5 px-5 font-medium">#</th>
                        <th className="py-3.5 px-5 font-medium">
                          O‘quvchi F.I.Sh.
                        </th>
                        <th className="py-3.5 px-5 font-medium">
                          Akademik daraja
                        </th>
                        <th className="py-3.5 px-5 font-medium text-right">
                          Topshirilgan test
                        </th>
                        <th className="py-3.5 px-5 font-medium text-right">
                          O‘rtacha natija
                        </th>
                        <th className="py-3.5 px-5 font-medium text-right">
                          Kosmik ball
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-sm">
                      {filteredStudents.map((st, idx) => (
                        <tr
                          key={st.id}
                          className="hover:bg-slate-900/50 transition-colors"
                        >
                          <td className="py-3.5 px-5 font-mono text-xs text-slate-400 tabular-nums">
                            {String(idx + 1).padStart(2, '0')}
                          </td>
                          <td className="py-3.5 px-5">
                            <div className="font-medium text-white">
                              {st.fullName}
                            </div>
                            <div className="text-xs font-mono text-slate-400 tabular-nums">
                              {st.phone} · {st.lastActive}
                            </div>
                          </td>
                          <td className="py-3.5 px-5 text-xs text-cyan-300">
                            {st.academyRank}
                          </td>
                          <td className="py-3.5 px-5 text-right font-mono text-xs text-slate-200 tabular-nums">
                            {st.completedTests} ta
                          </td>
                          <td className="py-3.5 px-5 text-right font-mono text-xs font-semibold text-emerald-300 tabular-nums">
                            {st.averageScore}%
                          </td>
                          <td className="py-3.5 px-5 text-right font-mono text-xs font-semibold text-cyan-300 tabular-nums">
                            {st.totalPoints} XP
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

          {/* ==================================================
              SECTION 3: 🏆 NATIJALAR (Active in 'overview' and 'results')
              ================================================== */}
          {(activeSection === 'overview' || activeSection === 'results') && (
            <section className="space-y-4">
              <div>
                <h2 className="font-display text-xl font-bold text-white">
                  🏆 So‘nggi Test Natijalari
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Topshirilgan sinovlar qaydnomasi va muvaffaqiyat holati
                </p>
              </div>

              <div className="rounded-2xl bg-slate-950/65 backdrop-blur-xl border border-cyan-300/15 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800/90 text-xs text-slate-400">
                        <th className="py-3.5 px-5 font-medium">Test moduli</th>
                        <th className="py-3.5 px-5 font-medium">O‘quvchi</th>
                        <th className="py-3.5 px-5 font-medium text-right">
                          To‘g‘ri javob
                        </th>
                        <th className="py-3.5 px-5 font-medium text-right">
                          Ko‘rsatkich
                        </th>
                        <th className="py-3.5 px-5 font-medium">Holat</th>
                        <th className="py-3.5 px-5 font-medium text-right">
                          Vaqt
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-sm">
                      {results.map((res) => (
                        <tr
                          key={res.id}
                          className="hover:bg-slate-900/50 transition-colors"
                        >
                          <td className="py-3.5 px-5">
                            <div className="font-medium text-white">
                              {res.testTitle}
                            </div>
                            <div className="text-xs text-slate-400">
                              {res.subject} · {res.completedAt}
                            </div>
                          </td>
                          <td className="py-3.5 px-5 text-slate-200 text-xs sm:text-sm">
                            {res.studentName}
                          </td>
                          <td className="py-3.5 px-5 text-right font-mono text-xs text-slate-200 tabular-nums">
                            {res.correctCount} / {res.totalQuestions}
                          </td>
                          <td className="py-3.5 px-5 text-right font-mono text-xs font-bold text-cyan-300 tabular-nums">
                            {res.scorePercent}%
                          </td>
                          <td className="py-3.5 px-5 text-xs">
                            {res.passed ? (
                              <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
                                <CheckCircle2 className="w-4 h-4" />
                                <span>O‘tdi</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 text-amber-300 font-medium">
                                <XCircle className="w-4 h-4" />
                                <span>Qayta urinish</span>
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-5 text-right font-mono text-xs text-slate-400 tabular-nums">
                            <span className="inline-flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {res.durationSeconds} s
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

          {/* ==================================================
              SECTION 4: 📊 STATISTIKA VA INTERAKTIV ORBITAL SIMULYATOR
              ================================================== */}
          {(activeSection === 'overview' || activeSection === 'statistics') && (
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left 7 Cols: Subject Mastery Breakdown */}
              <div className="lg:col-span-7 rounded-2xl bg-slate-950/65 backdrop-blur-xl border border-cyan-300/15 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div>
                      <h2 className="font-display text-xl font-bold text-white">
                        📊 Fanlar Bo‘yicha O‘zlashtirish Statistikasi
                      </h2>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Akademiya o‘quvchilarining yo‘nalishlar kesimidagi real
                        natijalari
                      </p>
                    </div>
                    <TrendingUp className="w-5 h-5 text-cyan-400 shrink-0" />
                  </div>

                  <div className="space-y-4 mt-4">
                    {[
                      {
                        subject: 'Astrofizika va Quyosh tizimi',
                        percent: 92,
                        attempts: 48,
                        color: 'from-cyan-400 to-sky-500',
                      },
                      {
                        subject: 'Orbital Mexanika va Matematika',
                        percent: 85,
                        attempts: 39,
                        color: 'from-sky-400 to-indigo-500',
                      },
                      {
                        subject: 'Chuqur Kosmos va Kosmologiya',
                        percent: 78,
                        attempts: 31,
                        color: 'from-violet-400 to-purple-500',
                      },
                      {
                        subject: 'Kosmik Robototexnika va AI',
                        percent: 88,
                        attempts: 44,
                        color: 'from-emerald-400 to-cyan-500',
                      },
                    ].map((stat) => (
                      <div key={stat.subject}>
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="font-medium text-slate-200">
                            {stat.subject}
                          </span>
                          <span className="font-mono text-cyan-300 tabular-nums">
                            {stat.percent}% · {stat.attempts} ta sinov
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${stat.color}`}
                            style={{ width: `${stat.percent}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
                  <span className="inline-flex items-center gap-1.5 text-cyan-300">
                    <Award className="w-4 h-4" />
                    O‘rtacha muvaffaqiyat: {passRatePercent}%
                  </span>
                  <span className="font-mono tabular-nums">
                    Jami faol modullar: {tests.length} ta
                  </span>
                </div>
              </div>

              {/* Right 5 Cols: Interactive Orbital Velocity Calculator (Educational Sandbox) */}
              <div className="lg:col-span-5 rounded-2xl bg-slate-950/65 backdrop-blur-xl border border-cyan-300/15 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-medium text-cyan-300 flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5" />
                      Interaktiv Kosmik Laboratoriya
                    </span>
                    <span className="font-mono text-xs text-slate-400">
                      Kepler / Orbital Formula
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-white mb-2">
                    Sun’iy Yo‘ldosh Tezligi Simulyatori
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    Yer sirtidan balandlikni o‘zgartirib, sun’iy yo‘ldoshning
                    barqaror orbita tezligi va aylanish davrini hisoblang.
                  </p>

                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 mb-4">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <label
                        htmlFor="altitude-slider"
                        className="text-slate-300 font-medium"
                      >
                        Orbita balandligi (h):
                      </label>
                      <span className="font-mono font-bold text-cyan-300 tabular-nums">
                        {orbitAltitudeKm} km
                      </span>
                    </div>
                    <input
                      id="altitude-slider"
                      type="range"
                      min={200}
                      max={35786}
                      step={100}
                      value={orbitAltitudeKm}
                      onChange={(e) =>
                        setOrbitAltitudeKm(Number(e.target.value))
                      }
                      className="w-full accent-cyan-400 cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-1 tabular-nums">
                      <span>200 km (XKS/LEO)</span>
                      <span>20,200 km (GPS)</span>
                      <span>35,786 km (GEO)</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/90">
                    <div className="text-xs text-slate-400 mb-1">
                      Orbital tezlik (v)
                    </div>
                    <div className="font-mono text-lg font-bold text-cyan-300 tabular-nums">
                      {orbitalVelocityKms} km/s
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/90">
                    <div className="text-xs text-slate-400 mb-1">
                      Aylanish davri (T)
                    </div>
                    <div className="font-mono text-lg font-bold text-white tabular-nums">
                      {orbitalPeriodMinutes} daq
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};
