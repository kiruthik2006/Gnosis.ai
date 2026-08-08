import React from 'react';
import { Layout, Server, Layers, CheckCircle2, ArrowRight } from 'lucide-react';
import { TRACKS } from '../data/mockData';

export default function Step2TrackSelection({ selectedTrack, setSelectedTrack, onContinue }) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Layout': return <Layout size={26} strokeWidth={1.8} />;
      case 'Server': return <Server size={26} strokeWidth={1.8} />;
      case 'Layers': return <Layers size={26} strokeWidth={1.8} />;
      default: return <Layout size={26} />;
    }
  };

  return (
    <div style={{
      maxWidth: '860px',
      margin: '0 auto',
      padding: '3rem 1.5rem',
      minHeight: 'calc(100vh - 120px)'
    }} className="animate-fade-in">

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span className="badge badge-strong" style={{ marginBottom: '0.75rem' }}>
          STEP 01 — TARGET ROLE
        </span>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          letterSpacing: '-0.025em',
          marginTop: '0.5rem',
          marginBottom: '0.5rem'
        }}>
          What do you want to prepare for?
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
          Select your primary target track. We will customize your baseline skill tree and interview questions accordingly.
        </p>
      </div>

      {/* Track Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2rem'
      }}>
        {TRACKS.map((track) => {
          const isSelected = selectedTrack === track.id;
          return (
            <div
              key={track.id}
              onClick={() => setSelectedTrack(track.id)}
              className={`saas-card saas-card-interactive ${isSelected ? 'saas-card-selected' : ''}`}
              style={{
                padding: '1.75rem',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
                cursor: 'pointer',
                borderWidth: isSelected ? '2px' : '1px'
              }}
            >
              {/* Top Row: Icon & Checkmark */}
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'space-between',
                  marginBottom: '1.25rem'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: 'var(--radius-md)',
                    background: isSelected ? 'var(--text-primary)' : 'var(--bg-subtle)',
                    color: isSelected ? 'var(--text-inverse)' : 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'center',
                    transition: 'all 0.2s ease'
                  }}>
                    {getIcon(track.iconName)}
                  </div>

                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    border: isSelected ? 'none' : '2px solid var(--border-strong)',
                    background: isSelected ? 'var(--text-primary)' : 'transparent',
                    color: isSelected ? '#FFF' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'center',
                    transition: 'all 0.2s ease'
                  }}>
                    <CheckCircle2 size={16} strokeWidth={2.5} />
                  </div>
                </div>

                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.015em',
                  marginBottom: '0.35rem'
                }}>
                  {track.title}
                </h3>

                <p style={{
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '0.5rem'
                }}>
                  {track.subtitle}
                </p>

                <p style={{
                  fontSize: '0.8125rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.5
                }}>
                  {track.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Conditional Recommendation Banner when BOTH is selected */}
      {selectedTrack === 'BOTH' && (
        <div className="animate-fade-in" style={{
          background: 'var(--accent-warm-light)',
          border: '1px solid var(--accent-warm-border)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem 1.25rem',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          color: 'var(--accent-warm)',
          fontWeight: 600,
          fontSize: '0.9375rem'
        }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'var(--accent-warm)'
          }} className="pulse-glow" />
          <span>Recommended path: Frontend → Backend</span>
        </div>
      )}

      {/* Footer Action */}
      <div style={{ textAlign: 'right' }}>
        <button
          onClick={onContinue}
          className="btn-primary"
          style={{ padding: '0.85rem 2rem' }}
        >
          <span>Continue</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
