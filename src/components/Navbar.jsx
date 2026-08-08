import React from 'react';
import { 
  Terminal, ChevronRight, CheckCircle2, List, ShieldCheck, 
  LayoutDashboard, GitFork, Compass, BookOpen, MessageSquareCode, User
} from 'lucide-react';

export default function Navbar({ currentStep, setStep, activeTab, setActiveTab, isLoggedIn }) {
  const steps = [
    { num: 1, label: 'Login & Welcome' },
    { num: 2, label: 'Track Selection' },
    { num: 3, label: 'Frontend Skills' },
    { num: 4, label: 'Backend Skills' },
    { num: 5, label: 'Initial Skill Tree' },
    { num: 6, label: 'MCQ Assessment' },
    { num: 7, label: 'Assessed Skill Tree' },
    { num: 8, label: 'Personalized Roadmap' },
    { num: 9, label: 'Recommended Courses' },
    { num: 10, label: 'Learning Progress' },
    { num: 11, label: 'AI Tech Interview' },
    { num: 12, label: 'Interview Evaluation' },
    { num: 13, label: 'Final Tree Update' },
    { num: 14, label: 'Future Skill Path' },
    { num: 15, label: 'Central Dashboard' }
  ];

  return (
    <header style={{
      background: 'var(--bg-card)',
      borderBottom: '1px solid var(--border-light)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: 'var(--shadow-sm)'
    }}>
      {/* Top Banner: Stage Jump Bar for seamless prototype navigation */}
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
            FLOW STEP {currentStep} OF 15
          </span>
          <span style={{ color: 'var(--text-primary)' }}>{steps.find(s => s.num === currentStep)?.label}</span>
        </div>

        {/* Quick Step Selector Dropdown & Prev/Next Buttons */}
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

      {/* Main App Navbar */}
      <div style={{
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '0.85rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between'
      }}>
        {/* Brand Logo & Tagline */}
        <div 
          onClick={() => setStep(15)}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
        >
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--text-primary)',
            color: 'var(--bg-card)',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <Terminal size={20} strokeWidth={2.2} />
          </div>
          <div>
            <div style={{
              fontWeight: 700,
              fontSize: '1.05rem',
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
              lineHeight: 1.1
            }}>
              INTERVIEW AGENT
            </div>
            <div style={{
              fontSize: '0.725rem',
              color: 'var(--text-muted)',
              fontWeight: 500
            }}>
              Build the interviewer, not the interview.
            </div>
          </div>
        </div>

        {/* Primary Platform Tabs (Active when step >= 5 or logged in) */}
        {isLoggedIn && (
          <nav style={{ display: 'flex', gap: '0.25rem', background: 'var(--bg-subtle)', padding: '0.25rem', borderRadius: 'var(--radius-md)' }}>
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, stepTarget: 15 },
              { id: 'tree', label: 'Skill Tree', icon: GitFork, stepTarget: 5 },
              { id: 'roadmap', label: 'Roadmap', icon: Compass, stepTarget: 8 },
              { id: 'courses', label: 'Courses', icon: BookOpen, stepTarget: 9 },
              { id: 'interview', label: 'AI Interview', icon: MessageSquareCode, stepTarget: 11 },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id || (currentStep === item.stepTarget);
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setStep(item.stepTarget);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.45rem 0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.8125rem',
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                    background: isActive ? 'var(--bg-card)' : 'transparent',
                    boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Icon size={15} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        )}

        {/* User Profile Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 0.75rem',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-light)',
            background: 'var(--bg-card)',
            fontSize: '0.8125rem',
            fontWeight: 500
          }}>
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: 'var(--accent-warm-light)',
              color: 'var(--accent-warm)',
              border: '1px solid var(--accent-warm-border)',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              fontSize: '0.7rem',
              fontWeight: 700
            }}>
              A
            </div>
            <span>Alex Morgan</span>
            <span className="badge badge-strong" style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem' }}>PRO</span>
          </div>
        </div>
      </div>
    </header>
  );
}
