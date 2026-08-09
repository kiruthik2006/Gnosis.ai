import React from 'react';
import { 
  Sparkles, ArrowRight, ShieldCheck, Zap, Bot, Code, Terminal, 
  Layers, CheckCircle2, Award, Play, ChevronRight, Activity
} from 'lucide-react';
import Logo from './Logo';

export default function Step1Login({ onContinue }) {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      padding: '1.5rem 2rem 1.75rem 2rem',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      overflow: 'hidden'
    }} className="animate-fade-in">

      {/* ── 0. HALF-PAGE GREEN ARC BACKGROUND + SEAMLESS MASK FADE OVERLAY ── */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
        overflow: 'hidden'
      }}>
        {/* Background Green Arc Image with top mask fade */}
        <img 
          src="/green_arc.png" 
          alt="Glowing Green Arc Background" 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 65%',
            transform: 'translateY(14%) scale(1.05)',
            display: 'block',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, transparent 30%, rgba(0,0,0,0.6) 48%, rgba(0,0,0,1) 65%)',
            maskImage: 'linear-gradient(to bottom, transparent 0%, transparent 30%, rgba(0,0,0,0.6) 48%, rgba(0,0,0,1) 65%)'
          }}
        />

        {/* Lighter Overlay Layer for Vibrant Green Arc Illumination */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, transparent 0%, rgba(8, 16, 11, 0.12) 30%, rgba(3, 7, 5, 0.38) 70%, rgba(0, 0, 0, 0.8) 100%)'
        }} />
      </div>

      {/* ── FOREGROUND CONTENT CONTAINER ── */}
      <div style={{
        maxWidth: '1200px',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justify: 'space-between',
        position: 'relative',
        zIndex: 2
      }}>

        {/* ── 1. HERO HEADER ── */}
        <div style={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '820px',
          margin: '0.5rem auto 0 auto'
        }}>
          {/* Badge */}
          <div className="badge badge-strong" style={{ 
            marginBottom: '0.75rem', 
            padding: '0.4rem 1.05rem', 
            fontSize: '0.75rem',
            gap: '0.45rem',
            boxShadow: '0 4px 16px rgba(16, 185, 129, 0.2)'
          }}>
            <Sparkles size={14} fill="#10B981" />
            <span>AUTONOMOUS 31-DAY AI TECHNICAL EVALUATOR</span>
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: '2.7rem',
            fontWeight: 900,
            color: 'var(--text-primary)',
            letterSpacing: '-0.035em',
            lineHeight: 1.1,
            marginBottom: '0.75rem'
          }}>
            Build the Interviewer. <br />
            <span style={{
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Verify Technical Mastery.
            </span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.5,
            fontWeight: 500,
            marginBottom: '1.5rem',
            maxWidth: '700px'
          }}>
            Transform candidate self-claims into an interactive 31-Day Initial Claim Tree. Probe real technical depth with Agent Turing’s live adaptive interviewing engine.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button 
              onClick={onContinue}
              className="btn-primary"
              style={{ 
                padding: '0.85rem 2rem', 
                fontSize: '0.95rem',
                borderRadius: 'var(--radius-full)',
                background: 'linear-gradient(135deg, #18181B 0%, #04241C 100%)',
                boxShadow: '0 8px 24px rgba(4, 36, 28, 0.35)',
                gap: '0.6rem'
              }}
            >
              <span>Start Evaluation Flow</span>
              <ArrowRight size={17} />
            </button>

            <button 
              onClick={onContinue}
              className="btn-secondary"
              style={{ 
                padding: '0.85rem 1.8rem', 
                fontSize: '0.95rem',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(255, 255, 255, 0.88)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(232, 226, 213, 0.9)',
                gap: '0.55rem'
              }}
            >
              <Zap size={17} color="#10B981" fill="#10B981" />
              <span>Launch Live AI Interview Demo</span>
            </button>
          </div>
        </div>

        {/* ── 2. CENTER PLATFORM ARCHITECTURE FANCY WORDS & STATS ── */}
        <div style={{ 
          textAlign: 'center', 
          margin: '3.5rem 0 2.25rem 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.85rem'
        }}>
          <span style={{ 
            fontSize: '0.725rem', 
            fontWeight: 850, 
            color: '#10B981', 
            letterSpacing: '0.12em', 
            textTransform: 'uppercase',
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.35)',
            padding: '4px 14px',
            borderRadius: '99px',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)'
          }}>
            ✨ VERIFICATION & FRICTION INTELLIGENCE
          </span>
          
          <h2 style={{ fontSize: '1.95rem', fontWeight: 850, color: '#FFFFFF', margin: 0, letterSpacing: '-0.025em', lineHeight: 1.25 }}>
            31-Day Claim Tree & Adaptive Turing Engine
          </h2>
          
          <p style={{ fontSize: '0.9rem', color: '#9CA3AF', margin: '0.2rem 0 0.5rem 0', maxWidth: '680px', lineHeight: 1.6 }}>
            Probe real engineering depth, eliminate candidate resume inflation, and inspect live AI evaluation reasoning in real-time.
          </p>

          {/* Fancy Stat Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#A7F3D0', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', padding: '5px 14px', borderRadius: '99px' }}>
              ⚡ 100% Adaptive Probing
            </span>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#93C5FD', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', padding: '5px 14px', borderRadius: '99px' }}>
              🛡️ Zero Resume Inflation
            </span>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#FDE68A', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', padding: '5px 14px', borderRadius: '99px' }}>
              📊 Real-Time Friction Graphs
            </span>
          </div>
        </div>

        {/* ── 3. LOWER FEATURE CARDS OVER DARK OVERLAY ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5rem',
          marginTop: '1.5rem',
          marginBottom: '1rem'
        }}>
          {/* Feature 1 */}
          <div style={{
            background: 'rgba(12, 20, 15, 0.65)',
            backdropFilter: 'blur(16px)',
            borderRadius: '20px',
            padding: '1.35rem 1.4rem',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.65rem',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.6)'
          }}>
            <div style={{
              width: '38px', height: '38px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.18)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981', border: '1px solid rgba(16, 185, 129, 0.35)'
            }}>
              <Layers size={19} />
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 850, color: '#FFFFFF', margin: 0 }}>
              31-Day Claim Tree Builder
            </h3>
            <p style={{ fontSize: '0.8125rem', color: '#9CA3AF', margin: 0, lineHeight: 1.45 }}>
              Categorize candidate claims across 4 roofs (Frontend UI, Backend API, AI Core, DevOps) using 3-state confidence toggles.
            </p>
          </div>

          {/* Feature 2 */}
          <div style={{
            background: 'rgba(12, 20, 15, 0.65)',
            backdropFilter: 'blur(16px)',
            borderRadius: '20px',
            padding: '1.35rem 1.4rem',
            border: '1px solid rgba(59, 130, 246, 0.25)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.65rem',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.6)'
          }}>
            <div style={{
              width: '38px', height: '38px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.18)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60A5FA', border: '1px solid rgba(59, 130, 246, 0.35)'
            }}>
              <Bot size={19} />
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 850, color: '#FFFFFF', margin: 0 }}>
              Agent Turing AI Simulator
            </h3>
            <p style={{ fontSize: '0.8125rem', color: '#9CA3AF', margin: 0, lineHeight: 1.45 }}>
              Live adaptive interviewing engine with audio speech-to-text, microtask probing questions, and dynamic scaling.
            </p>
          </div>

          {/* Feature 3 */}
          <div style={{
            background: 'rgba(12, 20, 15, 0.65)',
            backdropFilter: 'blur(16px)',
            borderRadius: '20px',
            padding: '1.35rem 1.4rem',
            border: '1px solid rgba(245, 158, 11, 0.25)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.65rem',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.6)'
          }}>
            <div style={{
              width: '38px', height: '38px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.18)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FBBF24', border: '1px solid rgba(245, 158, 11, 0.35)'
            }}>
              <Terminal size={19} />
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 850, color: '#FFFFFF', margin: 0 }}>
              Audit Log & Friction Analysis
            </h3>
            <p style={{ fontSize: '0.8125rem', color: '#9CA3AF', margin: 0, lineHeight: 1.45 }}>
              Real-time streaming terminal logs, historical friction metrics per module, and automated evaluation reports.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
