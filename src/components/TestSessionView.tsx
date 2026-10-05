import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  XCircle,
  RotateCcw,
  LayoutDashboard,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Award,
  HelpCircle,
} from 'lucide-react';
import { SpaceTest, TestAttemptResult } from '../data/spaceAcademyData';

interface TestSessionViewProps {
  test: SpaceTest;
  studentName: string;
  onExitToDashboard: () => void;
  onCompleteTest: (result: TestAttemptResult) => void;
  /** Optional quick preview trigger for testing Passed vs Retry celebration states */
  initialResultPreview?: 'pass' | 'fail' | null;
}

export const TestSessionView: React.FC<TestSessionViewProps> = ({
  test,
  studentName,
  onExitToDashboard,
  onCompleteTest,
  initialResultPreview = null,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, 'A' | 'B' | 'C' | 'D'>
  >({});
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showExplanations, setShowExplanations] = useState(false);

  // Allow instant preview of Pass or Retry celebration if requested
  useEffect(() => {
    if (initialResultPreview === 'pass') {
      const allCorrect: Record<string, 'A' | 'B' | 'C' | 'D'> = {};
      test.questions.forEach((q) => {
        allCorrect[q.id] = q.correctKey;
      });
      setSelectedAnswers(allCorrect);
      setIsFinished(true);
    } else if (initialResultPreview === 'fail') {
      const mostlyWrong: Record<string, 'A' | 'B' | 'C' | 'D'> = {};
      test.questions.forEach((q, idx) => {
        if (idx === 0) {
          mostlyWrong[q.id] = q.correctKey;
        } else {
          mostlyWrong[q.id] = q.correctKey === 'A' ? 'C' : 'A';
        }
      });
      setSelectedAnswers(mostlyWrong);
      setIsFinished(true);
    }
  }, [initialResultPreview, test.questions]);

  useEffect(() => {
    if (isFinished) return;
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isFinished]);

  const currentQuestion = test.questions[currentIndex];
  const totalQuestions = test.questions.length;
  const answeredCount = Object.keys(selectedAnswers).length;

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
  };

  const handleSelectOption = (key: 'A' | 'B' | 'C' | 'D') => {
    if (isFinished) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: key,
    }));
  };

  const finalizeTest = (customAnswers?: Record<string, 'A' | 'B' | 'C' | 'D'>) => {
    const answersToEvaluate = customAnswers || selectedAnswers;
    let correct = 0;
    test.questions.forEach((q) => {
      if (answersToEvaluate[q.id] === q.correctKey) {
        correct += 1;
      }
    });
    const scorePercent = Math.round((correct / totalQuestions) * 100);
    const passed = scorePercent >= test.passingScorePercent;

    const resultObj: TestAttemptResult = {
      id: `attempt-${Date.now()}`,
      testId: test.id,
      testTitle: test.title,
      subject: test.subject,
      studentName,
      scorePercent,
      correctCount: correct,
      totalQuestions,
      passed,
      completedAt: 'Hozirgina',
      durationSeconds: Math.max(elapsedSeconds, 42),
    };

    setIsFinished(true);
    onCompleteTest(resultObj);
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setCurrentIndex(0);
    setElapsedSeconds(0);
    setIsFinished(false);
    setShowExplanations(false);
  };

  // Compute current score for finished screen
  const correctCount = test.questions.reduce(
    (acc, q) => acc + (selectedAnswers[q.id] === q.correctKey ? 1 : 0),
    0
  );
  const scorePercent = Math.round((correctCount / totalQuestions) * 100);
  const passed = scorePercent >= test.passingScorePercent;

  return (
    <div className="relative z-10 min-h-screen w-full flex flex-col px-4 py-6 sm:px-8">
      {/* Top Bar in Test Mode */}
      <header className="w-full max-w-4xl mx-auto flex items-center justify-between pb-6 border-b border-slate-800/80">
        <button
          type="button"
          onClick={onExitToDashboard}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer whitespace-nowrap"
        >
          <ArrowLeft className="w-4 h-4 text-cyan-400" />
          <span>Dashboardga qaytish</span>
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-300">
          <span>{test.subject}</span>
          <span aria-hidden="true">·</span>
          <span>O‘tish bali: {test.passingScorePercent}%</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/80 text-xs font-mono tabular-nums text-cyan-300">
            <Clock className="w-3.5 h-3.5" />
            <span>{formatTime(elapsedSeconds)}</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-3xl mx-auto flex flex-col justify-center py-8">
        {!isFinished ? (
          <div>
            {/* Progress & Module Title Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span>{test.title}</span>
                <span className="font-mono tabular-nums text-cyan-300">
                  Savol {currentIndex + 1} / {totalQuestions}
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-violet-500 transition-transform duration-300 origin-left"
                  style={{
                    transform: `scaleX(${(currentIndex + 1) / totalQuestions})`,
                  }}
                />
              </div>
            </div>

            {/* Savol Card: Shaffof dark glass, backdrop blur, yumshoq border, yuqori readability (Section 42) */}
            <div className="rounded-2xl bg-slate-950/75 backdrop-blur-xl border border-cyan-300/20 p-6 sm:p-8 shadow-[0_8px_36px_rgba(0,0,0,0.65)]">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                <span>
                  Savol #{currentIndex + 1} · {test.difficulty} daraja
                </span>
                <span className="font-mono tabular-nums">
                  Javob belgilandi: {answeredCount}/{totalQuestions}
                </span>
              </div>

              <h2 className="font-display text-xl sm:text-2xl font-semibold text-white leading-snug mb-6">
                {currentQuestion.questionText}
              </h2>

              {/* Variantlar A, B, C, D with hover soft glow, smooth scale, border animation & mobile touch feedback */}
              <div className="space-y-3.5">
                {currentQuestion.options.map((option) => {
                  const isSelected =
                    selectedAnswers[currentQuestion.id] === option.key;

                  return (
                    <button
                      key={option.key}
                      type="button"
                      onClick={() => handleSelectOption(option.key)}
                      className={`w-full text-left p-4 sm:px-5 sm:py-4 rounded-xl border transition-all duration-150 flex items-center justify-between gap-4 cursor-pointer select-none transform hover:scale-[1.01] active:scale-[0.98] ${
                        isSelected
                          ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-[0_0_24px_rgba(56,189,248,0.28)]'
                          : 'bg-slate-900/65 border-slate-800/90 text-slate-200 hover:border-cyan-400/50 hover:bg-slate-900/90 hover:shadow-[0_0_18px_rgba(56,189,248,0.14)]'
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <span
                          className={`w-8 h-8 rounded-lg font-mono text-sm font-semibold flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-cyan-400 text-slate-950 shadow-[0_0_12px_rgba(56,189,248,0.5)]'
                              : 'bg-slate-800/90 text-cyan-300 border border-slate-700'
                          }`}
                        >
                          {option.key})
                        </span>
                        <span className="text-sm sm:text-base leading-relaxed">
                          {option.text}
                        </span>
                      </div>

                      <div className="shrink-0">
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                            isSelected
                              ? 'border-cyan-300 bg-cyan-400 text-slate-950'
                              : 'border-slate-600'
                          }`}
                        >
                          {isSelected && (
                            <div className="w-2 h-2 rounded-full bg-slate-950" />
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Footer Inside Question Card */}
              <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-medium bg-slate-900 border border-slate-700/80 text-slate-300 hover:text-white hover:border-slate-600 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer whitespace-nowrap"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Oldingi savol</span>
                </button>

                {/* Question Step Indicators */}
                <div className="flex items-center gap-1.5">
                  {test.questions.map((q, idx) => {
                    const isAnswered = Boolean(selectedAnswers[q.id]);
                    const isCurrent = idx === currentIndex;
                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => setCurrentIndex(idx)}
                        aria-label={`Savol ${idx + 1}`}
                        className={`w-7 h-7 rounded-lg font-mono text-xs transition-all cursor-pointer ${
                          isCurrent
                            ? 'bg-cyan-400 text-slate-950 font-semibold shadow-[0_0_12px_rgba(56,189,248,0.4)]'
                            : isAnswered
                            ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/40'
                            : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>

                {currentIndex < totalQuestions - 1 ? (
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentIndex((i) =>
                        Math.min(totalQuestions - 1, i + 1)
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-medium bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-colors shadow-[0_0_18px_rgba(56,189,248,0.3)] cursor-pointer whitespace-nowrap"
                  >
                    <span>Keyingi savol</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => finalizeTest()}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-300 to-sky-400 text-slate-950 hover:from-cyan-200 hover:to-sky-300 transition-all shadow-[0_0_22px_rgba(56,189,248,0.4)] cursor-pointer whitespace-nowrap"
                  >
                    <span>Testni yakunlash</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* ==================================================
             43. TEST TUGAGANDA — Kosmik Celebration / Motivational Card
             ================================================== */
          <div className="relative rounded-2xl bg-slate-950/80 backdrop-blur-xl border border-cyan-300/25 p-6 sm:p-10 text-center shadow-2xl overflow-hidden">
            {/* Soft Ambient Celebration Glow */}
            <div
              className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-64 rounded-full pointer-events-none blur-3xl opacity-45"
              style={{
                background: passed
                  ? 'radial-gradient(circle, rgba(56, 189, 248, 0.45) 0%, rgba(16, 185, 129, 0.25) 60%, transparent 100%)'
                  : 'radial-gradient(circle, rgba(139, 92, 246, 0.35) 0%, rgba(56, 189, 248, 0.2) 60%, transparent 100%)',
              }}
              aria-hidden="true"
            />

            {passed ? (
              /* AGAR O‘QUVCHI O‘TSA: ✨ yulduzchalar, 🚀 kichik raketa animatsiyasi, 🌟 glow effect, 🎉 success animation */
              <div className="relative z-10">
                <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-cyan-500/15 border border-cyan-400/40 shadow-[0_0_35px_rgba(56,189,248,0.35)] mb-5 animate-rocket-launch">
                  <span className="text-4xl select-none" role="img" aria-label="Raketa">
                    🚀
                  </span>
                  <span
                    className="absolute -top-2 -right-2 text-xl select-none animate-pulse"
                    aria-hidden="true"
                  >
                    ✨
                  </span>
                  <span
                    className="absolute -bottom-1 -left-2 text-lg select-none animate-pulse"
                    aria-hidden="true"
                  >
                    🌟
                  </span>
                  <span
                    className="absolute top-1 -left-4 text-base select-none"
                    aria-hidden="true"
                  >
                    🎉
                  </span>
                </div>

                <h2 className="font-display text-2xl sm:text-4xl font-bold text-white mb-2">
                  Tabriklaymiz! 🚀
                </h2>
                <p className="text-base sm:text-lg font-medium text-cyan-300 mb-6">
                  Ajoyib natija!
                </p>
              </div>
            ) : (
              /* AGAR O‘TMASA: yumshoq va motivatsion animation. "Yana bir bor urinib ko‘ring! 💪" */
              <div className="relative z-10">
                <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-violet-500/15 border border-violet-400/35 shadow-[0_0_28px_rgba(139,92,246,0.25)] mb-5">
                  <span className="text-3xl select-none" role="img" aria-label="Motivatsiya">
                    🪐
                  </span>
                  <span
                    className="absolute -top-1 -right-2 text-lg select-none"
                    aria-hidden="true"
                  >
                    ✨
                  </span>
                </div>

                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
                  Yana bir bor urinib ko‘ring! 💪
                </h2>
                <p className="text-sm sm:text-base text-slate-300 max-w-md mx-auto mb-6">
                  Har bir sinov — yangi tajriba. Savollar tahlilini ko‘rib chiqib,
                  bilimingizni yanada mustahkamlang!
                </p>
              </div>
            )}

            {/* Quantitative Result Breakdown */}
            <div className="relative z-10 grid grid-cols-3 gap-4 max-w-lg mx-auto py-5 px-4 rounded-xl bg-slate-900/75 border border-slate-800 mb-6">
              <div>
                <div className="text-xs text-slate-400 mb-1">Natija foizi</div>
                <div
                  className={`font-mono text-2xl font-bold tabular-nums ${
                    passed ? 'text-cyan-300' : 'text-violet-300'
                  }`}
                >
                  {scorePercent}%
                </div>
              </div>
              <div className="border-x border-slate-800 px-2">
                <div className="text-xs text-slate-400 mb-1">To‘g‘ri javob</div>
                <div className="font-mono text-2xl font-bold text-white tabular-nums">
                  {correctCount} / {totalQuestions}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">Holat</div>
                <div className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold mt-1">
                  {passed ? (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <Award className="w-4 h-4" /> Muvaffaqiyatli
                    </span>
                  ) : (
                    <span className="text-amber-300 flex items-center gap-1">
                      <Sparkles className="w-4 h-4" /> Qayta urinish
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Action Controls */}
            <div className="relative z-10 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleRetry}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-medium bg-slate-900 border border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer whitespace-nowrap"
              >
                <RotateCcw className="w-4 h-4 text-cyan-400" />
                <span>Qayta topshirish</span>
              </button>

              <button
                type="button"
                onClick={() => setShowExplanations((prev) => !prev)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-medium bg-slate-900 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-950/50 transition-colors cursor-pointer whitespace-nowrap"
              >
                <HelpCircle className="w-4 h-4" />
                <span>
                  {showExplanations
                    ? 'Tahlilni yashirish'
                    : 'Javoblar tahlilini ko‘rish'}
                </span>
              </button>

              <button
                type="button"
                onClick={onExitToDashboard}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-cyan-300 to-sky-400 text-slate-950 hover:from-cyan-200 hover:to-sky-300 transition-all shadow-[0_0_24px_rgba(56,189,248,0.35)] cursor-pointer whitespace-nowrap"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Bosh sahifaga qaytish</span>
              </button>
            </div>

            {/* Switch celebration state preview helper for quick inspection */}
            <div className="relative z-10 mt-6 pt-4 border-t border-slate-800/70 flex items-center justify-center gap-4 text-xs text-slate-400">
              <span>Simulyatsiya holati:</span>
              <button
                type="button"
                onClick={() => {
                  const allRight: Record<string, 'A' | 'B' | 'C' | 'D'> = {};
                  test.questions.forEach((q) => (allRight[q.id] = q.correctKey));
                  setSelectedAnswers(allRight);
                }}
                className={`underline hover:text-cyan-300 cursor-pointer ${
                  passed ? 'text-cyan-300 font-medium' : ''
                }`}
              >
                O‘tgan holat (Tabriklaymiz! 🚀)
              </button>
              <span aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => {
                  const mostlyWrong: Record<string, 'A' | 'B' | 'C' | 'D'> = {};
                  test.questions.forEach(
                    (q) =>
                      (mostlyWrong[q.id] = q.correctKey === 'A' ? 'B' : 'A')
                  );
                  setSelectedAnswers(mostlyWrong);
                }}
                className={`underline hover:text-violet-300 cursor-pointer ${
                  !passed ? 'text-violet-300 font-medium' : ''
                }`}
              >
                O‘tmagan holat (Motivatsion 💪)
              </button>
            </div>

            {/* Detailed Question & Explanation Review */}
            {showExplanations && (
              <div className="relative z-10 mt-6 pt-6 border-t border-slate-800 text-left space-y-4">
                <h3 className="font-display text-base font-semibold text-white">
                  Savollar va ilmiy izohlar
                </h3>
                {test.questions.map((q, index) => {
                  const userChoice = selectedAnswers[q.id];
                  const isCorrect = userChoice === q.correctKey;
                  return (
                    <div
                      key={q.id}
                      className="p-4 rounded-xl bg-slate-900/70 border border-slate-800"
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <p className="text-sm font-medium text-white">
                          {index + 1}. {q.questionText}
                        </p>
                        {isCorrect ? (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-400 shrink-0">
                            <CheckCircle2 className="w-4 h-4" /> To‘g‘ri
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-rose-400 shrink-0">
                            <XCircle className="w-4 h-4" /> Xato
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-300 mb-1.5">
                        Sizning javobingiz:{' '}
                        <span className="font-mono text-white">
                          {userChoice || 'Belgilanmagan'}
                        </span>{' '}
                        · To‘g‘ri javob:{' '}
                        <span className="font-mono text-cyan-300">
                          {q.correctKey}
                        </span>
                      </p>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {q.explanation}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};
