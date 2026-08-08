import React from 'react';
import {
  GitFork, Compass, MessageSquareCode,
  ArrowRight, Sparkles, BookOpen
} from 'lucide-react';

/* ─── tiny design helpers ─── */
const Label = ({ children, style = {} }) => (
  <div style={{
    fontSize: '0.6875rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'var(--text-muted)',
    ...style
  }}>
    {children}
  </div>
);

const Divider = () => (
  <div style={{ height: '1px', background: 'var(--border-light)', margin: '1.25rem 0' }} />
);

/* ─── Progress bar ─── */
function ProgressBar({ value, color = 'var(--text-primary)', height = 3 }) {
  return (
    <div style={{
      height: `${height}px`,
      background: 'var(--bg-muted)',
      borderRadius: '99px',
      overflow: 'hidden'
    }}>
      <div style={{
        height: '100%',
        width: `${value}%`,
        background: color,
        borderRadius: '99px',
        transition: 'width 0.4s ease'
      }} />
    </div>
  );
}

/* ─── Stat card ─── */
function StatCard({ label, value, sub, progress, progressColor, badge, badgeColor }) {
  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border-light)',
      borderRadius: 'var(--radius-md)',
      padding: '1.125rem 1.25rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.35rem',
      flex: 1,
      minWidth: 0
    }}>
      <Label>{label}</Label>
      <div style={{
        fontSize: '1.75rem',
        fontWeight: 800,
        color: 'var(--text-primary)',
        letterSpacing: '-0.02em',
        lineHeight: 1.1
      }}>
        {value}
      </div>
      {progress !== undefined && (
        <ProgressBar value={progress} color={progressColor} height={3} />
      )}
      {badge && (
        <span style={{
          display: 'inline-block',
          fontSize: '0.6875rem',
          fontWeight: 600,
          color: badgeColor || 'var(--text-muted)',
          background: 'var(--bg-subtle)',
          padding: '0.15rem 0.5rem',
          borderRadius: 'var(--radius-sm)',
          alignSelf: 'flex-start',
          marginTop: '0.1rem'
        }}>
          {badge}
        </span>
      )}
      {sub && !badge && (
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>
          {sub}
        </div>
      )}
    </div>
  );
}

/* ─── Hub card ─── */
function HubCard({ icon: Icon, iconAccent, label, title, description, badgeText, badgeGreen, button, onAction, prominent }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--bg-card)',
        border: prominent ? '1.5px solid var(--text-primary)' : '1px solid var(--border-light)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        transition: 'box-shadow 0.2s ease, transform 0.2s ease',
        boxShadow: hovered ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        transform: hovered ? 'translateY(-1px)' : 'none',
        cursor: 'default'
      }}
    >
      {/* Icon + badge row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: 'var(--radius-sm)',
          background: prominent ? 'var(--text-primary)' : 'var(--bg-subtle)',
          color: prominent ? '#fff' : (iconAccent || 'var(--text-secondary)'),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <Icon size={20} />
        </div>

        {badgeText && (
          <span style={{
            fontSize: '0.6875rem',
            fontWeight: 700,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            padding: '0.2rem 0.6rem',
            borderRadius: 'var(--radius-sm)',
            background: badgeGreen ? '#EEF7F1' : 'var(--bg-subtle)',
            color: badgeGreen ? '#2E6F40' : 'var(--text-muted)',
            border: badgeGreen ? '1px solid #C8E6D0' : '1px solid var(--border-light)'
          }}>
            {badgeText}
          </span>
        )}
      </div>

      {/* Text block */}
      <div style={{ flex: 1 }}>
        <Label style={{ marginBottom: '0.3rem' }}>{label}</Label>
        <div style={{
          fontSize: '1.0625rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          marginBottom: '0.4rem',
          lineHeight: 1.3
        }}>
          {title}
        </div>
        <p style={{
          fontSize: '0.8125rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.55
        }}>
          {description}
        </p>
      </div>

      {/* CTA Button */}
      <button
        onClick={onAction}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.4rem',
          width: '100%',
          padding: '0.65rem 1rem',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.875rem',
          fontWeight: 600,
          border: prominent ? 'none' : '1px solid var(--border-strong)',
          background: prominent ? 'var(--text-primary)' : 'transparent',
          color: prominent ? '#fff' : 'var(--text-primary)',
          cursor: 'pointer',
          transition: 'opacity 0.15s ease, background 0.15s ease'
        }}
        onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; }}
        onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
      >
        {prominent && <Sparkles size={14} style={{ color: 'var(--accent-warm)' }} />}
        <span>{button}</span>
        <ArrowRight size={14} />
      </button>
    </div>
  );
}

/* ════════════════════════════════════════════════
   MAIN DASHBOARD
════════════════════════════════════════════════ */
export default function Step15Dashboard({ onNavigateStep }) {
  return (
    <div
      className="animate-fade-in"
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2.5rem 1.5rem 4rem'
      }}
    >

      {/* ── HERO ROW ── */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.25rem',
        marginBottom: '2rem'
      }}>
        {/* Left: greeting */}
        <div>
          <div style={{
            fontSize: '1.625rem',
            fontWeight: 800,
            color: 'var(--text-primary)',
            letterSpacing: '-0.025em',
            lineHeight: 1.2,
            marginBottom: '0.4rem'
          }}>
            Welcome back, Alex 👋
          </div>
          <p style={{
            fontSize: '0.9375rem',
            color: 'var(--text-secondary)',
            fontWeight: 400,
            maxWidth: '440px',
            lineHeight: 1.5
          }}>
            Track your progress, strengthen your skills, and get interview-ready.
          </p>
        </div>

        {/* Right: recommended next step */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.875rem',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-light)',
          borderRadius: 'var(--radius-md)',
          padding: '0.85rem 1.125rem',
          boxShadow: 'var(--shadow-sm)',
          flexShrink: 0
        }}>
          <div style={{
            width: '34px',
            height: '34px',
            borderRadius: 'var(--radius-sm)',
            background: '#FEF4E8',
            border: '1px solid #F0D9BC',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-warm)',
            flexShrink: 0
          }}>
            <Sparkles size={16} />
          </div>
          <div>
            <Label style={{ color: 'var(--accent-warm)', marginBottom: '0.2rem' }}>
              Recommended Next Step
            </Label>
            <div style={{
              fontSize: '0.875rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              whiteSpace: 'nowrap'
            }}>
              Complete Advanced JavaScript
            </div>
          </div>
          <button
            onClick={() => onNavigateStep(8)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              padding: '0.4rem 0.875rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              background: 'var(--text-primary)',
              color: '#fff',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              border: 'none',
              transition: 'opacity 0.15s'
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Resume <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* ── STATISTICS ROW ── */}
      <div style={{
        display: 'flex',
        gap: '0.875rem',
        flexWrap: 'wrap',
        marginBottom: '2rem'
      }}>
        <StatCard
          label="Overall Progress"
          value="68%"
          progress={68}
          progressColor="var(--text-primary)"
        />
        <StatCard
          label="Current Level"
          value="Intermediate"
          badge="Frontend → Backend"
        />
        <StatCard
          label="Skills"
          value="7 / 12"
          sub="HTML · CSS · JS"
        />
        <StatCard
          label="Courses"
          value="4 / 6"
          sub="2 remaining"
        />
        <StatCard
          label="Interview Readiness"
          value="72%"
          progress={72}
          progressColor="#4A7C59"
          sub="Ready for mock"
        />
      </div>

      {/* ── MAIN HUB CARDS ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1.125rem',
        marginBottom: '1.75rem'
      }}
        className="hub-grid"
      >
        <HubCard
          icon={GitFork}
          label="Skill Tree"
          title="Your Skill Tree"
          description="See your strengths, gaps, and unlocked technologies across your learning path."
          badgeText="7 Strong Nodes"
          button="View Skill Tree"
          onAction={() => onNavigateStep(5)}
        />

        <HubCard
          icon={Compass}
          iconAccent="var(--text-primary)"
          label="Roadmap"
          title="Your Roadmap"
          description="Continue building the skills needed for your target role. Step 2 of 6."
          badgeText="In Progress"
          button="Continue Learning"
          onAction={() => onNavigateStep(8)}
        />

        <HubCard
          icon={MessageSquareCode}
          label="AI Technical Interview"
          title="AI Technical Interview"
          description="Test your technical knowledge through an adaptive interview based on your learning journey."
          badgeText="Unlocked & Ready"
          badgeGreen
          button="Start AI Interview"
          onAction={() => onNavigateStep(11)}
          prominent
        />
      </div>

      {/* ── NEXT MILESTONE STRIP ── */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        borderRadius: 'var(--radius-md)',
        padding: '1.125rem 1.375rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        flexWrap: 'wrap'
      }}>
        <div style={{ flexShrink: 0 }}>
          <Label style={{ marginBottom: '0.25rem' }}>Next Milestone</Label>
          <div style={{
            fontSize: '0.9375rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            maxWidth: '420px'
          }}>
            Complete Advanced JavaScript to unlock React Fundamentals.
          </div>
        </div>

        <div style={{ flex: 1, minWidth: '160px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '0.4rem'
          }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>Progress</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>72%</span>
          </div>
          <ProgressBar value={72} color="var(--text-primary)" height={4} />
        </div>

        <button
          onClick={() => onNavigateStep(8)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.55rem 1rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.8125rem',
            fontWeight: 600,
            background: 'transparent',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-strong)',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            transition: 'background 0.15s'
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-subtle)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          Continue Roadmap <ArrowRight size={13} />
        </button>
      </div>

      {/* ── Responsive grid style ── */}
      <style>{`
        @media (max-width: 900px) {
          .hub-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 580px) {
          .hub-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
