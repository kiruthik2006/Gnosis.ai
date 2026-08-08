import React from 'react';
import { 
  CheckCircle2, Lock, Star, ArrowRight, Sparkles, Compass, Shield, Award 
} from 'lucide-react';

export default function Step14FuturePath({ onGoToDashboard }) {
  const futurePathNodes = [
    { title: 'CURRENT LEVEL', status: 'completed', subtitle: 'Baseline Assessed & Async JS Passed' },
    { title: 'JavaScript Fundamentals', status: 'completed', subtitle: 'ES6, Closures, DOM, Scope' },
    { title: 'React Fundamentals', status: 'completed', subtitle: 'Hooks, State, Virtual DOM' },
    { title: 'Node.js Server Runtime', status: 'completed', subtitle: 'Event loop, HTTP streams, async I/O' },
    { title: 'Express.js Framework', status: 'active', subtitle: 'RESTful Routing & Middleware' },
    { title: 'MongoDB Data Layer', status: 'future_locked', subtitle: 'NoSQL Schema & Aggregations' },
    { title: 'FULL STACK ENGINEER', status: 'future_target', subtitle: 'Enterprise Architectural Readiness' }
  ];

  return (
    <div style={{
      maxWidth: '920px',
      margin: '0 auto',
      padding: '2.5rem 1.5rem',
      minHeight: 'calc(100vh - 120px)'
    }} className="animate-fade-in">

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span className="badge badge-strong" style={{ marginBottom: '0.75rem' }}>
          FUTURE CAREER TRAJECTORY
        </span>
        <h1 style={{
          fontSize: '2.25rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          letterSpacing: '-0.03em',
          marginTop: '0.5rem',
          marginBottom: '0.5rem'
        }}>
          Your Future Path
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
          Visualize your target mastery trajectory from initial skills to senior Full Stack Engineer status.
        </p>
      </div>

      {/* Connected Future Node Stream */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
        {futurePathNodes.map((node, idx) => {
          const isCompleted = node.status === 'completed';
          const isActive = node.status === 'active';
          const isTarget = node.status === 'future_target';
          const isLocked = node.status === 'future_locked';

          return (
            <React.Fragment key={idx}>
              <div
                className="saas-card"
                style={{
                  padding: '1.25rem 1.75rem',
                  borderRadius: 'var(--radius-lg)',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'space-between',
                  border: isTarget ? '2px solid var(--text-primary)' : isActive ? '2px solid var(--accent-warm)' : '1px solid var(--border-light)',
                  background: isTarget ? 'var(--text-primary)' : isCompleted ? 'var(--status-strong-bg)' : isLocked ? 'var(--bg-subtle)' : 'var(--bg-card)',
                  color: isTarget ? '#FFF' : 'var(--text-primary)',
                  opacity: isLocked ? 0.75 : 1,
                  boxShadow: isTarget ? 'var(--shadow-lg)' : 'var(--shadow-sm)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: isTarget ? '#FFF' : isCompleted ? 'var(--status-strong)' : isActive ? 'var(--accent-warm)' : 'var(--border-strong)',
                    color: isTarget ? 'var(--text-primary)' : '#FFF',
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'center',
                    fontWeight: 700,
                    fontSize: '0.85rem'
                  }}>
                    {isCompleted && <CheckCircle2 size={18} />}
                    {isActive && <Sparkles size={18} />}
                    {isLocked && <Lock size={16} />}
                    {isTarget && <Star size={18} fill="currentColor" />}
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.15rem' }}>
                      {node.title}
                    </h3>
                    <p style={{ fontSize: '0.8125rem', color: isTarget ? 'rgba(255,255,255,0.8)' : 'var(--text-secondary)' }}>
                      {node.subtitle}
                    </p>
                  </div>
                </div>

                <div>
                  {isCompleted && <span className="badge badge-strong">✓ Mastered</span>}
                  {isActive && <span className="badge badge-moderate pulse-glow">In Progress</span>}
                  {isLocked && <span className="badge badge-locked">🔒 Future Node</span>}
                  {isTarget && <span className="badge" style={{ background: '#F7D070', color: '#1C1B1A', fontWeight: 700 }}>GOAL TARGET</span>}
                </div>
              </div>

              {idx < futurePathNodes.length - 1 && (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)', margin: '-0.4rem 0' }}>
                  ↓
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Banner */}
      <div style={{
        background: 'var(--accent-warm-light)',
        border: '1px solid var(--accent-warm-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem 1.75rem',
        marginBottom: '2.5rem',
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <Sparkles size={24} color="var(--accent-warm)" />
          <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--accent-warm)' }}>
            Complete your recommended roadmap to unlock these future skills.
          </div>
        </div>

        <button
          onClick={onGoToDashboard}
          className="btn-primary"
          style={{ padding: '0.8rem 1.75rem' }}
        >
          <span>Go to Main Dashboard</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
