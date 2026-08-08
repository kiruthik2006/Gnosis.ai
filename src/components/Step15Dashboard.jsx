import React from 'react';
import { 
  LayoutDashboard, GitFork, Compass, BookOpen, MessageSquareCode, 
  User, CheckCircle2, ArrowRight, Sparkles, Trophy, PlayCircle, Clock, Award, ShieldCheck
} from 'lucide-react';

export default function Step15Dashboard({ onNavigateStep }) {
  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem 1.5rem 5rem 1.5rem'
    }} className="animate-fade-in">

      {/* Header Banner */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        flexWrap: 'wrap',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div>
          <span className="badge badge-strong" style={{ marginBottom: '0.4rem' }}>
            OVERVIEW DASHBOARD
          </span>
          <h1 style={{
            fontSize: '2.25rem',
            fontWeight: 800,
            color: 'var(--text-primary)',
            letterSpacing: '-0.03em'
          }}>
            Welcome back, Alex
          </h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
            Track your skills, complete course prerequisites, and practice AI mock interviews.
          </p>
        </div>

        {/* Recommended Next Step Widget */}
        <div style={{
          background: 'var(--accent-warm-light)',
          border: '1px solid var(--accent-warm-border)',
          padding: '1rem 1.25rem',
          borderRadius: 'var(--radius-lg)',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'var(--accent-warm)',
            color: '#FFF',
            display: 'flex',
            alignItems: 'center',
            justify: 'center'
          }}>
            <Sparkles size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent-warm)', textTransform: 'uppercase' }}>
              RECOMMENDED NEXT STEP
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>
              "Complete Advanced JavaScript"
            </div>
          </div>
          <button
            onClick={() => onNavigateStep(8)}
            className="btn-primary"
            style={{ padding: '0.5rem 1rem', fontSize: '0.8125rem' }}
          >
            <span>Resume</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* 5 Key Metric Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        {/* Metric 1 */}
        <div className="saas-card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            OVERALL PROGRESS
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.2rem 0' }}>
            68%
          </div>
          <div style={{ height: '4px', background: 'var(--bg-subtle)', borderRadius: '99px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '68%', background: 'var(--accent-warm)' }} />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="saas-card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            CURRENT LEVEL
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.4rem 0' }}>
            Intermediate
          </div>
          <span className="badge badge-strong" style={{ fontSize: '0.65rem' }}>FRONTEND → BACKEND</span>
        </div>

        {/* Metric 3 */}
        <div className="saas-card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            SKILLS COMPLETED
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.2rem 0' }}>
            7 / 12
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--status-strong)', fontWeight: 600 }}>✓ HTML, CSS, Async JS</span>
        </div>

        {/* Metric 4 */}
        <div className="saas-card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            COURSES COMPLETED
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.2rem 0' }}>
            4 / 6
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>2 modules remaining</span>
        </div>

        {/* Metric 5 */}
        <div className="saas-card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            INTERVIEW READINESS
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.2rem 0' }}>
            72%
          </div>
          <span className="badge badge-strong" style={{ fontSize: '0.65rem', background: '#F0F7F2', color: '#2E6F40' }}>READY FOR MOCK</span>
        </div>
      </div>

      {/* Main Grid: Core Hub Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '1.5rem',
        marginBottom: '3rem'
      }}>
        {/* Hub Card 1: Skill Tree */}
        <div className="saas-card" style={{
          padding: '1.75rem',
          display: 'flex',
          flexDirection: 'column',
          justify: 'space-between',
          borderRadius: 'var(--radius-lg)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-subtle)',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justify: 'center'
              }}>
                <GitFork size={22} />
              </div>
              <span className="badge badge-strong">7 STRONG NODES</span>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
              Interactive Skill Tree
            </h3>

            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '1.25rem' }}>
              Explore node dependencies, assess weaknesses, and unlock locked future technologies.
            </p>
          </div>

          <button
            onClick={() => onNavigateStep(5)}
            className="btn-secondary"
            style={{ width: '100%', padding: '0.75rem' }}
          >
            <span>View Skill Tree</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Hub Card 2: Roadmap */}
        <div className="saas-card" style={{
          padding: '1.75rem',
          display: 'flex',
          flexDirection: 'column',
          justify: 'space-between',
          borderRadius: 'var(--radius-lg)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-subtle)',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justify: 'center'
              }}>
                <Compass size={22} />
              </div>
              <span className="badge badge-moderate">IN PROGRESS</span>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
              Current Roadmap
            </h3>

            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '1.25rem' }}>
              Step 2 of 6: Advanced JavaScript & Asynchronous Event Loop mechanics.
            </p>
          </div>

          <button
            onClick={() => onNavigateStep(8)}
            className="btn-primary"
            style={{ width: '100%', padding: '0.75rem' }}
          >
            <span>Continue Learning</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Hub Card 3: AI Interview Simulator */}
        <div className="saas-card" style={{
          padding: '1.75rem',
          display: 'flex',
          flexDirection: 'column',
          justify: 'space-between',
          borderRadius: 'var(--radius-lg)',
          border: '2px solid var(--text-primary)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--text-primary)',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justify: 'center'
              }}>
                <MessageSquareCode size={22} />
              </div>
              <span className="badge badge-strong" style={{ background: '#F0F7F2', color: '#2E6F40' }}>UNLOCKED & READY</span>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
              AI Technical Interview
            </h3>

            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '1.25rem' }}>
              Take an adaptive live interview session with Agent Turing to earn verified credentials.
            </p>
          </div>

          <button
            onClick={() => onNavigateStep(11)}
            className="btn-primary"
            style={{ width: '100%', padding: '0.85rem' }}
          >
            <Sparkles size={16} color="var(--accent-warm)" />
            <span>Start AI Interview</span>
          </button>
        </div>
      </div>

      {/* Bottom Sticky Mobile/Desktop Navigation Bar */}
      <div style={{
        position: 'fixed',
        bottom: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-strong)',
        borderRadius: 'var(--radius-full)',
        padding: '0.4rem 0.6rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',
        boxShadow: 'var(--shadow-lg)',
        zIndex: 90
      }}>
        {[
          { label: 'Dashboard', icon: LayoutDashboard, step: 15, active: true },
          { label: 'Skill Tree', icon: GitFork, step: 5 },
          { label: 'Roadmap', icon: Compass, step: 8 },
          { label: 'Courses', icon: BookOpen, step: 9 },
          { label: 'Interview', icon: MessageSquareCode, step: 11 },
          { label: 'Profile', icon: User, step: 1 }
        ].map((nav, idx) => {
          const Icon = nav.icon;
          return (
            <button
              key={idx}
              onClick={() => onNavigateStep(nav.step)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.45rem 0.95rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8125rem',
                fontWeight: nav.active ? 700 : 500,
                color: nav.active ? 'var(--text-inverse)' : 'var(--text-secondary)',
                background: nav.active ? 'var(--text-primary)' : 'transparent',
                transition: 'all 0.15s ease'
              }}
            >
              <Icon size={15} />
              <span>{nav.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
