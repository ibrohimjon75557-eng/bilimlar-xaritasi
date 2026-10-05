/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CosmicBackground } from './components/CosmicBackground';
import { LoginView } from './components/LoginView';
import { DashboardView, DashboardSection } from './components/DashboardView';
import { TestSessionView } from './components/TestSessionView';
import {
  SPACE_TESTS,
  INITIAL_STUDENTS,
  INITIAL_RESULTS,
  SpaceTest,
  StudentRecord,
  TestAttemptResult,
} from './data/spaceAcademyData';

type ActiveRoute = 'login' | 'dashboard' | 'test';

export default function App() {
  const [route, setRoute] = useState<ActiveRoute>('login');
  const [currentUser, setCurrentUser] = useState<{
    fullName: string;
    phone: string;
  }>({
    fullName: 'Sardorbek Alimov',
    phone: '+998 90 123 45 67',
  });

  const [dashboardSection, setDashboardSection] =
    useState<DashboardSection>('overview');
  const [activeTest, setActiveTest] = useState<SpaceTest>(SPACE_TESTS[0]);
  const [previewOutcome, setPreviewOutcome] = useState<'pass' | 'fail' | null>(
    null
  );

  const [students, setStudents] = useState<StudentRecord[]>(INITIAL_STUDENTS);
  const [results, setResults] = useState<TestAttemptResult[]>(INITIAL_RESULTS);
  const [reducedMotionOverride, setReducedMotionOverride] = useState(false);

  const handleLoginSuccess = (user: { fullName: string; phone: string }) => {
    setCurrentUser(user);
    setRoute('dashboard');
  };

  const handleStartTest = (
    test: SpaceTest,
    outcomePreview: 'pass' | 'fail' | null = null
  ) => {
    setActiveTest(test);
    setPreviewOutcome(outcomePreview);
    setRoute('test');
  };

  const handleCompleteTest = (newResult: TestAttemptResult) => {
    setResults((prev) => [newResult, ...prev]);

    // Update student record or add if new
    setStudents((prev) => {
      const existingIndex = prev.findIndex(
        (s) => s.fullName.toLowerCase() === newResult.studentName.toLowerCase()
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        const target = updated[existingIndex];
        const newCount = target.completedTests + 1;
        const newAvg = Math.round(
          (target.averageScore * target.completedTests +
            newResult.scorePercent) /
            newCount
        );
        updated[existingIndex] = {
          ...target,
          completedTests: newCount,
          averageScore: newAvg,
          totalPoints: target.totalPoints + newResult.correctCount * 25,
          lastActive: 'Hozirgina',
        };
        return updated;
      }
      return prev;
    });
  };

  const handleAddStudent = (newStudent: StudentRecord) => {
    setStudents((prev) => [newStudent, ...prev]);
  };

  return (
    <div className="relative min-h-screen w-full text-slate-100 selection:bg-cyan-500/30">
      {/* Persistent 100vw x 100vh Cosmic Background with adaptive mode & responsive particle density */}
      <CosmicBackground
        mode={route}
        reducedMotionOverride={reducedMotionOverride}
      />

      {/* Quick View Switcher Pill in Bottom-Right for Instant Inspection Across Sections 40, 41, 42, 43 */}
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-1 p-1.5 rounded-xl bg-slate-950/85 backdrop-blur-xl border border-cyan-400/25 shadow-[0_8px_30px_rgba(0,0,0,0.65)] text-xs">
        <button
          type="button"
          onClick={() => setRoute('login')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
            route === 'login'
              ? 'bg-cyan-400 text-slate-950 font-semibold'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          1. Login
        </button>
        <button
          type="button"
          onClick={() => setRoute('dashboard')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
            route === 'dashboard'
              ? 'bg-cyan-400 text-slate-950 font-semibold'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          2. Dashboard
        </button>
        <button
          type="button"
          onClick={() => handleStartTest(SPACE_TESTS[0], null)}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
            route === 'test' && previewOutcome === null
              ? 'bg-cyan-400 text-slate-950 font-semibold'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          3. Test
        </button>
        <button
          type="button"
          onClick={() => handleStartTest(SPACE_TESTS[0], 'pass')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
            route === 'test' && previewOutcome === 'pass'
              ? 'bg-cyan-400 text-slate-950 font-semibold'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          4. Natija 🚀
        </button>
      </div>

      {/* Main Route Views */}
      {route === 'login' && (
        <LoginView onLoginSuccess={handleLoginSuccess} />
      )}

      {route === 'dashboard' && (
        <DashboardView
          currentUser={currentUser}
          tests={SPACE_TESTS}
          students={students}
          results={results}
          activeSection={dashboardSection}
          onSelectSection={setDashboardSection}
          onStartTest={handleStartTest}
          onAddStudent={handleAddStudent}
          onLogout={() => setRoute('login')}
          reducedMotionOverride={reducedMotionOverride}
          onToggleReducedMotion={() =>
            setReducedMotionOverride((prev) => !prev)
          }
        />
      )}

      {route === 'test' && (
        <TestSessionView
          test={activeTest}
          studentName={currentUser.fullName}
          onExitToDashboard={() => {
            setPreviewOutcome(null);
            setRoute('dashboard');
          }}
          onCompleteTest={handleCompleteTest}
          initialResultPreview={previewOutcome}
        />
      )}
    </div>
  );
}
