import React from 'react';
import {
  Terminal, LayoutDashboard, GitFork, Compass, BookOpen, MessageSquareCode
} from 'lucide-react';

export default function Navbar({ currentStep, setStep, activeTab, setActiveTab, isLoggedIn }) {
  const steps = [
    { num: 1,  label: 'Target Profile Selection' },
    { num: 2,  label: 'Application Stack Baseline' },
    { num: 3,  label: 'AI & Ops Baseline' },
    { num: 4,  label: 'Claim Tree Payload' },
    { num: 5,  label: 'Initial Skill Tree' },
    { num: 6,  label: 'MCQ Assessment' },
    { num: 7,  label: 'Assessed Skill Tree' },
    { num: 8,  label: 'Personalized Roadmap' },
    { num: 9,  label: 'Recommended Courses' },
    { num: 10, label: 'Learning Progress' },
    { num: 11, label: 'AI Tech Interview' },
    { num: 12, label: 'Interview Evaluation' },
    { num: 13, label: 'Final Tree Update' },
    { num: 14, label: 'Future Skill Path' },
    { num: 15, label: 'Central Dashboard' }
  ];

  /* Hide the dev bar entirely on the end-user dashboard (step 15) */
  const showDevBar = currentStep !== 15;

  return (
    <header style={{
      background: 'var(--bg-card)',
      borderBottom: '1px solid var(--border-light)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: 'var(--shadow-sm)'
    }}>
      {/* ── Dev prototype navigation bar (hidden on dashboard) ── */}
      {showDevBar && (
        <div style={{
          background: 'var(--bg-subtle)',
          borderBottom: '1px solid var(--border-light)',
          padding: '0.4rem 1.5rem',
          fontSize: '0.8125rem',
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between',
          color: 'var(--text-secondary)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
            <span style={{
              background: 'var(--text-primary)',
              color: '#FFF',
              padding: '0.15rem 0.5rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.75rem'
            }}>
              STEP {currentStep} OF 15
            </span>
            <span style={{ color: 'var(--text-primary)' }}>
              {steps.find(s => s.num === currentStep)?.label}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 500 }}>Jump to step:</label>
            <select
              value={currentStep}
              onChange={(e) => setStep(Number(e.target.value))}
              style={{
                padding: '0.25rem 0.6rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-strong)',
                background: 'var(--bg-card)',
                fontSize: '0.75rem',
                color: 'var(--text-primary)',
                fontWeight: 500,
                cursor: 'pointer'
              }}
            >
              {steps.map(s => (
                <option key={s.num} value={s.num}>
                  Step {s.num}: {s.label}
                </option>
              ))}
            </select>

            <div style={{ display: 'flex', gap: '0.25rem' }}>
              <button
                disabled={currentStep === 1}
                onClick={() => setStep(Math.max(1, currentStep - 1))}
                className="btn-ghost"
                style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
              >
                ← Prev
              </button>
              <button
                disabled={currentStep === 15}
                onClick={() => setStep(Math.min(15, currentStep + 1))}
                className="btn-ghost"
                style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Main app navbar ── */}
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 1.5rem',
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        gap: '1rem'
      }}>
        {/* Brand */}
        <div
          onClick={() => setStep(15)}
          style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer', flexShrink: 0 }}
        >
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--text-primary)',
            color: 'var(--bg-card)',
            display: 'flex',
            alignItems: 'center',
            justify: 'center'
          }}>
            <Terminal size={17} strokeWidth={2.3} />
          </div>
          <div>
            <div style={{
              fontWeight: 700,
              fontSize: '0.9375rem',
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
              lineHeight: 1.15
            }}>
              INTERVIEW AGENT
            </div>
            <div style={{
              fontSize: '0.6875rem',
              color: 'var(--text-muted)',
              fontWeight: 500,
              lineHeight: 1.1
            }}>
              Build the interviewer, not the interview.
            </div>
          </div>
        </div>

        {/* Center nav tabs — only when logged in */}
        {isLoggedIn && (
          <nav style={{
            display: 'flex',
            gap: '0.125rem',
            background: 'var(--bg-subtle)',
            padding: '0.2rem',
            borderRadius: 'var(--radius-md)',
            flexShrink: 0
          }}>
            {[
              { id: 'dashboard', label: 'Dashboard',    icon: LayoutDashboard,    stepTarget: 15 },
              { id: 'tree',      label: 'Skill Tree',   icon: GitFork,            stepTarget: 5  },
              { id: 'roadmap',   label: 'Roadmap',      icon: Compass,            stepTarget: 8  },
              { id: 'courses',   label: 'Courses',      icon: BookOpen,           stepTarget: 9  },
              { id: 'interview', label: 'AI Interview', icon: MessageSquareCode,  stepTarget: 11 },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id || currentStep === item.stepTarget;
              return (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setStep(item.stepTarget); }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '8px',
                    fontSize: '0.8125rem',
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                    background: isActive ? 'var(--bg-card)' : 'transparent',
                    boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                    transition: 'all 0.15s ease',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <Icon size={14} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        )}

        {/* User profile pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.3rem 0.65rem',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-light)',
            background: 'var(--bg-card)',
            fontSize: '0.8125rem',
            fontWeight: 500,
            cursor: 'pointer'
          }}>
            <div style={{
              width: '22px',
              height: '22px',
              borderRadius: '50%',
              background: 'var(--bg-subtle)',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              fontSize: '0.6875rem',
              fontWeight: 700,
              border: '1px solid var(--border-light)'
            }}>
              A
            </div>
            <span style={{ color: 'var(--text-primary)' }}>Alex</span>
          </div>
        </div>
      </div>
    </header>
  );
}
