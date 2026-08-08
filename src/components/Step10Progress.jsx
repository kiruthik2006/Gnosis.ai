import React from 'react';
import { 
  CheckCircle2, Sparkles, Trophy, ArrowRight, Lock, Unlock, GitFork, BookOpen 
} from 'lucide-react';

export default function Step10Progress({ onStartInterview, onReviewTree }) {
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
          MILESTONE REACHED
        </span>
        <h1 style={{
          fontSize: '2.25rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          letterSpacing: '-0.03em',
          marginTop: '0.5rem',
          marginBottom: '0.5rem'
        }}>
          Your Progress
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
          You have fulfilled the core roadmap prerequisites. AI Technical Interview eligibility is now UNLOCKED!
        </p>
      </div>

      {/* 3 Metric Hero Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2.5rem'
      }}>
        {/* Overall Progress */}
        <div className="saas-card" style={{ padding: '1.75rem', textAlign: 'center' }}>
          <div style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '0.5rem'
          }}>
            OVERALL PROGRESS
          </div>
          <div style={{
            fontSize: '2.75rem',
            fontWeight: 800,
            color: 'var(--text-primary)',
            lineHeight: 1
          }}>
            68%
          </div>
          <div style={{
            height: '6px',
            background: 'var(--bg-subtle)',
            borderRadius: '99px',
            margin: '1rem 0 0.5rem 0',
            overflow: 'hidden'
          }}>
            <div style={{ height: '100%', width: '68%', background: 'var(--accent-warm)', borderRadius: '99px' }} />
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Roadmap target on track</span>
        </div>

        {/* Skills Completed */}
        <div className="saas-card" style={{ padding: '1.75rem', textAlign: 'center' }}>
          <div style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '0.5rem'
          }}>
            SKILLS MASTERED
          </div>
          <div style={{
            fontSize: '2.75rem',
            fontWeight: 800,
            color: 'var(--text-primary)',
            lineHeight: 1
          }}>
            7 / 12
          </div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            marginTop: '1rem',
            color: 'var(--status-strong)',
            fontSize: '0.8125rem',
            fontWeight: 600
          }}>
            <CheckCircle2 size={16} /> HTML, CSS, ES6, Async JS...
          </div>
        </div>

        {/* Courses Completed */}
        <div className="saas-card" style={{ padding: '1.75rem', textAlign: 'center' }}>
          <div style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '0.5rem'
          }}>
            COURSES COMPLETED
          </div>
          <div style={{
            fontSize: '2.75rem',
            fontWeight: 800,
            color: 'var(--text-primary)',
            lineHeight: 1
          }}>
            4 / 6
          </div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            marginTop: '1rem',
            color: 'var(--accent-warm)',
            fontSize: '0.8125rem',
            fontWeight: 600
          }}>
            <BookOpen size={16} /> Advanced JS Completed
          </div>
        </div>
      </div>

      {/* Unlocked Nodes Callout */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.75rem',
        marginBottom: '2.5rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--status-strong-bg)',
            color: 'var(--status-strong)',
            display: 'flex',
            alignItems: 'center',
            justify: 'center'
          }}>
            <Unlock size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Tree Nodes Unlocked & AI Interview Available
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Completing "Advanced JavaScript" has unlocked the <strong>React Fundamentals</strong> node and qualified you for the <strong>AI Technical Interview</strong> assessment.
            </p>
          </div>
        </div>

        {/* Dynamic Nodes Pill List */}
        <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
          <div style={{
            background: 'var(--status-strong-bg)',
            border: '1px solid var(--status-strong-border)',
            padding: '0.5rem 0.85rem',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: 'var(--status-strong)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}>
            <CheckCircle2 size={15} />
            <span>JavaScript: Upgraded to STRONG</span>
          </div>

          <div style={{
            background: 'var(--accent-warm-light)',
            border: '1px solid var(--accent-warm-border)',
            padding: '0.5rem 0.85rem',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: 'var(--accent-warm)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}>
            <Unlock size={15} />
            <span>React Fundamentals: UNLOCKED</span>
          </div>

          <div style={{
            background: 'var(--text-primary)',
            color: '#FFF',
            padding: '0.5rem 0.85rem',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.8125rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}>
            <Sparkles size={15} color="#F7D070" />
            <span>Start AI Interview: READY</span>
          </div>
        </div>
      </div>

      {/* Main Unlock Call-to-action button */}
      <div style={{
        textAlign: 'center',
        background: 'var(--text-primary)',
        color: '#FFF',
        padding: '2.5rem',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <span className="badge" style={{
          background: 'rgba(255,255,255,0.15)',
          color: '#FFF',
          marginBottom: '1rem'
        }}>
          FINAL STEP PREPARATION
        </span>

        <h2 style={{
          fontSize: '1.75rem',
          fontWeight: 700,
          marginBottom: '0.5rem',
          letterSpacing: '-0.02em'
        }}>
          Start AI Technical Interview
        </h2>

        <p style={{
          fontSize: '0.9375rem',
          color: 'rgba(255,255,255,0.8)',
          maxWidth: '560px',
          margin: '0 auto 1.75rem auto'
        }}>
          The AI will conduct an adaptive technical evaluation specifically tailored to your completed JavaScript & async runtime coursework.
        </p>

        <button
          onClick={onStartInterview}
          className="btn-primary"
          style={{
            background: '#FFF',
            color: 'var(--text-primary)',
            padding: '0.95rem 2.5rem',
            fontSize: '1rem',
            fontWeight: 700,
            boxShadow: 'var(--shadow-md)'
          }}
        >
          <Sparkles size={20} color="var(--accent-warm)" />
          <span>Launch AI Tech Interview</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
