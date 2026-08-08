import React from 'react';
import { 
  CheckCircle2, AlertTriangle, Award, ArrowRight, Sparkles, TrendingUp, ShieldCheck 
} from 'lucide-react';
import { EVALUATION_DATA } from '../data/mockData';

export default function Step12Evaluation({ onUpdateTree }) {
  return (
    <div style={{
      maxWidth: '960px',
      margin: '0 auto',
      padding: '2.5rem 1.5rem',
      minHeight: 'calc(100vh - 120px)'
    }} className="animate-fade-in">

      {/* Hero Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span className="badge badge-strong" style={{ marginBottom: '0.75rem' }}>
          SESSION COMPLETED
        </span>
        <h1 style={{
          fontSize: '2.25rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          letterSpacing: '-0.03em',
          marginTop: '0.5rem',
          marginBottom: '0.35rem'
        }}>
          Interview Complete
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
          Detailed AI performance report generated for Alex Morgan.
        </p>
      </div>

      {/* Top Section: Overall Score + 4 Domain Breakdown Bars */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {/* Overall Score Circle Card */}
        <div className="saas-card" style={{
          padding: '2rem',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justify: 'center',
          borderRadius: 'var(--radius-lg)'
        }}>
          <div style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '1rem'
          }}>
            OVERALL EVALUATION SCORE
          </div>

          <div style={{
            position: 'relative',
            width: '130px',
            height: '130px',
            borderRadius: '50%',
            background: 'conic-gradient(var(--accent-warm) 0% 82%, var(--bg-subtle) 82% 100%)',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            boxShadow: 'var(--shadow-md)',
            marginBottom: '1rem'
          }}>
            <div style={{
              width: '104px',
              height: '104px',
              borderRadius: '50%',
              background: 'var(--bg-card)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justify: 'center'
            }}>
              <span style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
                {EVALUATION_DATA.score}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                / 100
              </span>
            </div>
          </div>

          <span className="badge badge-strong" style={{ padding: '0.3rem 0.8rem', fontSize: '0.75rem' }}>
            PASSED — STRONG ADVANCEMENT
          </span>
        </div>

        {/* 4 Skill Score Breakdown Bars */}
        <div className="saas-card" style={{ padding: '1.75rem', borderRadius: 'var(--radius-lg)' }}>
          <div style={{
            fontSize: '0.8125rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            letterSpacing: '0.04em',
            marginBottom: '1.25rem'
          }}>
            TECHNICAL COMPETENCY BREAKDOWN
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {EVALUATION_DATA.metrics.map((m, idx) => (
              <div key={idx}>
                <div style={{
                  display: 'flex',
                  justify: 'space-between',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '0.35rem'
                }}>
                  <span>{m.label}</span>
                  <strong>{m.val}%</strong>
                </div>
                <div style={{
                  height: '8px',
                  width: '100%',
                  background: 'var(--bg-subtle)',
                  borderRadius: '99px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    width: `${m.val}%`,
                    background: m.val >= 80 ? 'var(--status-strong)' : 'var(--accent-warm)',
                    borderRadius: '99px',
                    transition: 'width 0.5s ease'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Two Cards: Strengths & Areas to Improve */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2.5rem'
      }}>
        {/* Strengths */}
        <div className="saas-card" style={{
          padding: '1.75rem',
          borderRadius: 'var(--radius-lg)',
          background: 'var(--status-strong-bg)',
          borderColor: 'var(--status-strong-border)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: 700,
            fontSize: '1.1rem',
            color: 'var(--status-strong)',
            marginBottom: '1rem'
          }}>
            <ShieldCheck size={20} />
            <span>STRENGTHS</span>
          </div>

          <ul style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            listStyle: 'none',
            padding: 0
          }}>
            {EVALUATION_DATA.strengths.map((str, idx) => (
              <li key={idx} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.5rem',
                fontSize: '0.875rem',
                color: 'var(--text-primary)',
                lineHeight: 1.4
              }}>
                <CheckCircle2 size={16} color="var(--status-strong)" style={{ marginTop: '0.15rem', flexShrink: 0 }} />
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Areas to Improve */}
        <div className="saas-card" style={{
          padding: '1.75rem',
          borderRadius: 'var(--radius-lg)',
          background: 'var(--accent-warm-light)',
          borderColor: 'var(--accent-warm-border)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: 700,
            fontSize: '1.1rem',
            color: 'var(--accent-warm)',
            marginBottom: '1rem'
          }}>
            <TrendingUp size={20} />
            <span>AREAS TO IMPROVE</span>
          </div>

          <ul style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            listStyle: 'none',
            padding: 0
          }}>
            {EVALUATION_DATA.improvements.map((imp, idx) => (
              <li key={idx} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.5rem',
                fontSize: '0.875rem',
                color: 'var(--text-primary)',
                lineHeight: 1.4
              }}>
                <AlertTriangle size={16} color="var(--accent-warm)" style={{ marginTop: '0.15rem', flexShrink: 0 }} />
                <span>{imp}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Footer */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        background: 'var(--bg-card)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-light)',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
            Apply results to your master Skill Tree
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Passing this interview updates JavaScript to STRONG and unlocks React & Node.js.
          </div>
        </div>

        <button
          onClick={onUpdateTree}
          className="btn-primary"
          style={{ padding: '0.85rem 2rem', gap: '0.6rem' }}
        >
          <Sparkles size={18} />
          <span>Update Skill Tree with Results</span>
        </button>
      </div>
    </div>
  );
}
