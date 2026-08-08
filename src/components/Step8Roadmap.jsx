import React, { useState } from 'react';
import { 
  Play, Plus, Check, MoreHorizontal, X, Lock, Clock, Search, 
  Sparkles, Calendar, BookOpen, Star, User, Activity, ArrowRight,
  ShieldCheck, MessageSquare, Smile, FileText, CheckCircle2
} from 'lucide-react';

export default function Step8Roadmap({ onStartCourse, onGoToCourses }) {
  const [activeCard, setActiveCard] = useState('card-active');

  return (
    <div style={{
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '1.5rem',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      background: 'transparent',
      minHeight: 'calc(100vh - 110px)'
    }} className="animate-fade-in">

      {/* ── 1. TOP HEADER & METRIC STATS ROW ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        {/* Left Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <h1 style={{
            fontSize: '1.6rem',
            fontWeight: 850,
            color: 'var(--text-primary)',
            letterSpacing: '-0.025em',
            margin: 0
          }}>
            My Learning Plan
          </h1>
          <span style={{ fontSize: '1.4rem' }}>🕰️</span>
        </div>

        {/* Right Controls: Search + Stat Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
          {/* Search Input */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '99px',
            padding: '6px 14px',
            border: '1px solid rgba(232, 226, 213, 0.8)',
            width: '200px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
          }}>
            <Search size={14} color="var(--text-muted)" />
            <input 
              type="text" 
              placeholder="Search skills..." 
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontSize: '0.785rem',
                width: '100%',
                color: 'var(--text-primary)'
              }}
            />
          </div>

          {/* Stat Pill 1: Total */}
          <div style={{
            background: '#E0F2FE',
            color: '#0369A1',
            borderRadius: '16px',
            padding: '6px 16px',
            textAlign: 'center',
            minWidth: '64px',
            border: '1px solid #BAE6FD'
          }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 850, lineHeight: 1 }}>26</div>
            <div style={{ fontSize: '0.625rem', fontWeight: 600, marginTop: '2px' }}>Total</div>
          </div>

          {/* Stat Pill 2: Completed */}
          <div style={{
            background: '#DCFCE7',
            color: '#15803D',
            borderRadius: '16px',
            padding: '6px 16px',
            textAlign: 'center',
            minWidth: '72px',
            position: 'relative',
            border: '1px solid #BBF7D0'
          }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 850, lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px' }}>
              2 <span>🎉</span>
            </div>
            <div style={{ fontSize: '0.625rem', fontWeight: 600, marginTop: '2px' }}>Completed</div>
          </div>

          {/* Stat Pill 3: Upcoming */}
          <div style={{
            background: '#F3F4F6',
            color: '#4B5563',
            borderRadius: '16px',
            padding: '6px 16px',
            textAlign: 'center',
            minWidth: '64px',
            border: '1px solid #E5E7EB'
          }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 850, lineHeight: 1 }}>23</div>
            <div style={{ fontSize: '0.625rem', fontWeight: 600, marginTop: '2px' }}>Upcoming</div>
          </div>
        </div>
      </div>

      {/* ── 2. MAIN WORKSPACE: CONNECTED ROADMAP CANVAS + EVENTS SIDEBAR ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 340px',
        gap: '1.5rem',
        alignItems: 'start'
      }}>

        {/* ── LEFT CANVAS: INTERACTIVE VISUAL ROADMAP NODE MAP ── */}
        <div style={{
          position: 'relative',
          background: 'rgba(255, 255, 255, 0.65)',
          backdropFilter: 'blur(16px)',
          borderRadius: '28px',
          border: '1px solid rgba(255, 255, 255, 0.8)',
          padding: '2rem 1.75rem 4.5rem 1.75rem',
          boxShadow: '0 12px 36px rgba(0, 0, 0, 0.04)',
          overflow: 'hidden',
          minHeight: '620px'
        }}>

          {/* SVG Connector Lines Overlay */}
          <svg 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 1
            }}
          >
            {/* Dashed connector path from Card 1 (top left) to Card 2 (top right) */}
            <path 
              d="M 290 110 C 340 110, 340 170, 410 170" 
              fill="none" 
              stroke="#10B981" 
              strokeWidth="2" 
              strokeDasharray="5 5" 
            />
            {/* Connector path to middle card */}
            <path 
              d="M 290 280 C 350 280, 350 220, 410 200" 
              fill="none" 
              stroke="#10B981" 
              strokeWidth="2" 
              strokeDasharray="5 5" 
            />
            {/* Connector path to Card 4 */}
            <path 
              d="M 290 280 C 350 280, 350 430, 410 430" 
              fill="none" 
              stroke="#10B981" 
              strokeWidth="2" 
              strokeDasharray="5 5" 
            />
          </svg>

          {/* Node Grid Layout */}
          <div style={{
            position: 'relative',
            zIndex: 2,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem 2.5rem',
            alignItems: 'start'
          }}>

            {/* ── LEFT COLUMN CARDS ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

              {/* CARD 1: React & UI Mechanics */}
              <div className="glass-card" style={{
                borderRadius: '24px',
                padding: '1.25rem 1.35rem',
                background: '#FFFFFF',
                border: '1px solid rgba(232, 226, 213, 0.9)',
                position: 'relative',
                boxShadow: '0 8px 24px rgba(0,0,0,0.03)'
              }}>
                {/* Plus Action Icon */}
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  right: '-12px',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: '#DCFCE7',
                  color: '#15803D',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #FFFFFF',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                  cursor: 'pointer'
                }}>
                  <Plus size={14} strokeWidth={2.5} />
                </div>

                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 0.35rem 0' }}>
                  React & UI Mechanics
                </h3>
                <p style={{ fontSize: '0.785rem', color: 'var(--text-secondary)', margin: '0 0 1rem 0', lineHeight: 1.35 }}>
                  Learn basic UI component state, props, and client-side rendering hooks.
                </p>

                {/* Actions Row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{
                    background: '#DCFCE7',
                    color: '#15803D',
                    borderRadius: '99px',
                    padding: '4px 12px',
                    fontSize: '0.725rem',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    Completed 👋
                  </span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <button style={{ background: '#F3F4F6', border: 'none', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', cursor: 'pointer' }}>...</button>
                    <button style={{ background: '#F3F4F6', border: 'none', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', cursor: 'pointer' }}>×</button>
                    <button style={{ background: '#18181B', color: '#FFF', border: 'none', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                      <Check size={12} strokeWidth={3} />
                    </button>
                  </div>
                </div>
              </div>

              {/* CARD 2: Active Focus Feature Card (AI Core & Prompting) */}
              <div 
                onClick={() => onStartCourse({ topic: 'AI Core & Prompt Engineering' })}
                style={{
                  borderRadius: '28px',
                  padding: '1.5rem',
                  background: 'linear-gradient(135deg, #F3E8FF 0%, #F5D0FE 100%)',
                  border: '2px solid #E9D5FF',
                  position: 'relative',
                  boxShadow: '0 16px 36px rgba(168, 85, 247, 0.18)',
                  cursor: 'pointer',
                  transform: 'rotate(-1.5deg)',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {/* Floating Music & AI Sparkles */}
                <span style={{ position: 'absolute', top: '12px', right: '80px', fontSize: '1.1rem', opacity: 0.7 }}>🎵</span>
                <span style={{ position: 'absolute', top: '24px', right: '35px', fontSize: '0.9rem', opacity: 0.6 }}>✨</span>

                {/* Big Play Button Circle */}
                <div style={{
                  position: 'absolute',
                  top: '1.25rem',
                  right: '1.25rem',
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  color: '#9333EA',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  boxShadow: '0 8px 20px rgba(147, 51, 234, 0.25)',
                  cursor: 'pointer'
                }}>
                  <Play size={22} fill="#9333EA" style={{ marginLeft: '3px' }} />
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 850, color: '#581C87', margin: '0 0 0.4rem 0', paddingRight: '60px' }}>
                  AI Core & Prompt Engineering
                </h3>
                <p style={{ fontSize: '0.8125rem', color: '#6B21A8', margin: '0 0 1.25rem 0', lineHeight: 1.4, paddingRight: '40px' }}>
                  Master zero-shot prompting, system instructions, and LLM response mechanics.
                </p>

                {/* Bottom Row: Watching Time Pill + Candidate Avatars Stack */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{
                    background: '#FFFFFF',
                    color: '#581C87',
                    borderRadius: '99px',
                    padding: '6px 14px',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
                  }}>
                    <Clock size={13} color="#9333EA" />
                    <span>In Progress 00:30</span>
                  </div>

                  {/* Candidate Avatar Overlap Stack */}
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" 
                      alt="Avatar" 
                      style={{ width: '28px', height: '28px', borderRadius: '50%', border: '2px solid #FFF', objectFit: 'cover' }}
                    />
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80" 
                      alt="Avatar" 
                      style={{ width: '28px', height: '28px', borderRadius: '50%', border: '2px solid #FFF', objectFit: 'cover', marginLeft: '-8px' }}
                    />
                    <img 
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80" 
                      alt="Avatar" 
                      style={{ width: '28px', height: '28px', borderRadius: '50%', border: '2px solid #FFF', objectFit: 'cover', marginLeft: '-8px' }}
                    />
                  </div>
                </div>
              </div>

              {/* CARD 3: Multi-Agent Systems & MCP */}
              <div className="glass-card" style={{
                borderRadius: '24px',
                padding: '1.25rem 1.35rem',
                background: '#FFFFFF',
                border: '1px solid rgba(232, 226, 213, 0.9)',
                position: 'relative',
                boxShadow: '0 8px 24px rgba(0,0,0,0.03)'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  right: '-12px',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: '#F3F4F6',
                  color: '#4B5563',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  border: '2px solid #FFFFFF',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.08)'
                }}>
                  <Lock size={13} />
                </div>

                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 0.35rem 0' }}>
                  Multi-Agent Systems & MCP
                </h3>
                <p style={{ fontSize: '0.785rem', color: 'var(--text-secondary)', margin: '0 0 1rem 0', lineHeight: 1.35 }}>
                  Study autonomous agent orchestration, tools, and Model Context Protocol.
                </p>

                <span style={{
                  background: '#F3F4F6',
                  color: '#6B7280',
                  borderRadius: '99px',
                  padding: '4px 12px',
                  fontSize: '0.725rem',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  Upcoming ⏱️
                </span>
              </div>

            </div>

            {/* ── RIGHT COLUMN CARDS ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '3rem' }}>

              {/* CARD 4: FastAPI & Retrieval Engine */}
              <div className="glass-card" style={{
                borderRadius: '24px',
                padding: '1.25rem 1.35rem',
                background: '#FFFFFF',
                border: '1px solid rgba(232, 226, 213, 0.9)',
                position: 'relative',
                boxShadow: '0 8px 24px rgba(0,0,0,0.03)'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  right: '-12px',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: '#DCFCE7',
                  color: '#15803D',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  border: '2px solid #FFFFFF',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.08)'
                }}>
                  <Sparkles size={14} />
                </div>

                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 0.35rem 0' }}>
                  FastAPI & Retrieval Engine
                </h3>
                <p style={{ fontSize: '0.785rem', color: 'var(--text-secondary)', margin: '0 0 1rem 0', lineHeight: 1.35 }}>
                  Understand async API routes, Pydantic validation, and vector indexing.
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{
                    background: '#DCFCE7',
                    color: '#15803D',
                    borderRadius: '99px',
                    padding: '4px 12px',
                    fontSize: '0.725rem',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    Completed 👋
                  </span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <button style={{ background: '#F3F4F6', border: 'none', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', cursor: 'pointer' }}>...</button>
                    <button style={{ background: '#F3F4F6', border: 'none', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', cursor: 'pointer' }}>×</button>
                    <button style={{ background: '#18181B', color: '#FFF', border: 'none', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                      <Check size={12} strokeWidth={3} />
                    </button>
                  </div>
                </div>
              </div>

              {/* CARD 5: Vector DB & Security Guardrails */}
              <div className="glass-card" style={{
                borderRadius: '24px',
                padding: '1.25rem 1.35rem',
                background: '#FFFFFF',
                border: '1px solid rgba(232, 226, 213, 0.9)',
                position: 'relative',
                boxShadow: '0 8px 24px rgba(0,0,0,0.03)'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  right: '-12px',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: '#F3F4F6',
                  color: '#4B5563',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  border: '2px solid #FFFFFF',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.08)'
                }}>
                  <Lock size={13} />
                </div>

                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 0.35rem 0' }}>
                  Vector DB & Security Guardrails
                </h3>
                <p style={{ fontSize: '0.785rem', color: 'var(--text-secondary)', margin: '0 0 1rem 0', lineHeight: 1.35 }}>
                  Implement Docker isolation, rate-limiting, and evaluation safety guardrails.
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{
                    background: '#F3F4F6',
                    color: '#6B7280',
                    borderRadius: '99px',
                    padding: '4px 12px',
                    fontSize: '0.725rem',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    Upcoming ⏱️
                  </span>

                  <button style={{ background: '#F3F4F6', border: 'none', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', cursor: 'pointer' }}>...</button>
                </div>
              </div>

            </div>

          </div>

          {/* ── FLOATING BOTTOM MAC DOCK TOOLBAR ── */}
          <div style={{
            position: 'absolute',
            bottom: '1.25rem',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(24, 24, 27, 0.92)',
            backdropFilter: 'blur(16px)',
            borderRadius: '99px',
            padding: '6px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.35)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            zIndex: 10
          }}>
            {[
              { label: 'T', color: '#A7F3D0', text: '#064E3B' },
              { label: 'A', color: '#BAE6FD', text: '#0369A1' },
              { icon: FileText, color: '#FBCFE8', text: '#9D174D' },
              { icon: Activity, color: '#FEF08A', text: '#854D0E' },
              { icon: MessageSquare, color: '#DDD6FE', text: '#5B21B6' },
              { icon: Smile, color: '#BBF7D0', text: '#15803D' },
            ].map((btn, i) => {
              const IconComp = btn.icon;
              return (
                <div 
                  key={i}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: btn.color,
                    color: btn.text,
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'center',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    transition: 'transform 0.15s ease'
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  {IconComp ? <IconComp size={16} /> : btn.label}
                </div>
              );
            })}

            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: '#27272A',
              color: '#FFF',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              cursor: 'pointer'
            }}>
              <Plus size={16} />
            </div>

            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: '#27272A',
              color: '#9CA3AF',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              cursor: 'pointer'
            }}>
              <Lock size={14} />
            </div>
          </div>

        </div>

        {/* ── RIGHT SIDEBAR: MY EVENTS 🥳 (UPCOMING EVALUATIONS & TASKS) ── */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          position: 'relative'
        }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 850, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.02em' }}>
              My Events
            </h2>
            <span style={{ fontSize: '1.1rem' }}>🥳</span>
          </div>

          {/* EVENT CARD 1: Live Technical Assessment */}
          <div className="glass-card" style={{
            borderRadius: '24px',
            padding: '1.25rem',
            background: '#FFFFFF',
            border: '1px solid rgba(232, 226, 213, 0.9)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" 
                  alt="Host" 
                  style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)' }}>Live Technical Session</span>
              </div>
              <span style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-muted)' }}>Tu, 25.03</span>
            </div>

            <p style={{ fontSize: '0.785rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
              Understanding AI system architecture, critical prompt evaluation, and applying evidence-based code practices.
            </p>

            <button 
              onClick={() => onStartCourse({ topic: 'Async Mechanics & Live Assessment' })}
              style={{
                background: '#F3F4F6',
                color: 'var(--text-primary)',
                border: '1px solid #E5E7EB',
                borderRadius: '99px',
                padding: '0.5rem 1rem',
                fontSize: '0.785rem',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#E5E7EB'}
              onMouseLeave={e => e.currentTarget.style.background = '#F3F4F6'}
            >
              <Clock size={13} />
              <span>Start at 12:30</span>
            </button>
          </div>

          {/* EVENT CARD 2: Lesson Workshop (Soft Purple #F3E8FF) */}
          <div style={{
            borderRadius: '24px',
            padding: '1.25rem',
            background: 'linear-gradient(135deg, #F3E8FF 0%, #FAE8FF 100%)',
            border: '1px solid #E9D5FF',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#7E22CE', fontWeight: 800, fontSize: '0.8125rem' }}>
                <Activity size={15} />
                <span>Lesson</span>
              </div>
              <span style={{ fontSize: '0.725rem', fontWeight: 700, color: '#7E22CE', opacity: 0.8 }}>We, 26.03</span>
            </div>

            <p style={{ fontSize: '0.785rem', color: '#6B21A8', margin: 0, lineHeight: 1.4 }}>
              Overview of async Event Loop microtasks, V8 memory allocation, and performance profiling.
            </p>
          </div>

          {/* EVENT CARD 3: Portfolio Task (Soft Yellow #FEF9C3) */}
          <div style={{
            borderRadius: '24px',
            padding: '1.25rem',
            background: 'linear-gradient(135deg, #FEF9C3 0%, #FEF3C7 100%)',
            border: '1px solid #FDE047',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#A16207', fontWeight: 800, fontSize: '0.8125rem' }}>
                <Star size={15} fill="#A16207" />
                <span>Task</span>
              </div>
              <span style={{ fontSize: '0.725rem', fontWeight: 700, color: '#A16207', opacity: 0.8 }}>Th, 27.03</span>
            </div>

            <p style={{ fontSize: '0.785rem', color: '#854D0E', margin: 0, lineHeight: 1.4 }}>
              Build and deploy an end-to-end RAG vector search engine using FastAPI and React.
            </p>
          </div>

          {/* FLOATING ACCENT TASK CARD (Soft Green #DCFCE7 with rotation & shadow) */}
          <div style={{
            borderRadius: '24px',
            padding: '1.25rem',
            background: 'linear-gradient(135deg, #DCFCE7 0%, #BBF7D0 100%)',
            border: '1.5px solid #86EFAC',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            boxShadow: '0 12px 32px rgba(22, 101, 52, 0.15)',
            transform: 'rotate(2.5deg) translateY(-8px)',
            marginTop: '0.25rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#15803D', fontWeight: 800, fontSize: '0.8125rem' }}>
                <Star size={15} fill="#15803D" />
                <span>Task</span>
              </div>
              <span style={{ fontSize: '0.725rem', fontWeight: 700, color: '#15803D', opacity: 0.8 }}>Fr, 28.03</span>
            </div>

            <p style={{ fontSize: '0.785rem', color: '#166534', margin: 0, lineHeight: 1.4 }}>
              Importance of prompt evaluation and agent safety guardrails for optimal AI system performance.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
