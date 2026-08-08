import React, { useState } from 'react';
import { 
  ChevronRight, Play, Star, Plus, MoreHorizontal, ArrowRight,
  TrendingUp, Calendar as CalIcon, BookOpen, Clock, Award, ShieldCheck,
  Search, Bell, Sparkles, Zap, CheckCircle2, Flame
} from 'lucide-react';

export default function Step15Dashboard({ onNavigateStep }) {
  // New Courses cards data
  const newSkills = [
    { title: 'Advanced JavaScript & Async', lessons: '12 Lessons', type: 'Frontend UI', rate: '4.9', color: '#FEE2E2', iconColor: '#EF4444', step: 3 },
    { title: 'FastAPI & Microservices', lessons: '15 Lessons', type: 'Backend API', rate: '5.0', color: '#ECFDF5', iconColor: '#10B981', step: 4 },
    { title: 'Vector DB & RAG Pipelines', lessons: '8 Lessons', type: 'AI Core', rate: '4.8', color: '#EFF6FF', iconColor: '#3B82F6', step: 5 },
  ];

  // Daily Schedule items
  const dailySchedule = [
    { title: 'Async Event Loop & Call Stack', sub: 'Adaptive AI Technical Interview', color: 'rgba(254, 226, 226, 0.8)', stepTarget: 11, time: '10:00 AM' },
    { title: 'System Architecture & Data Flow', sub: 'Claim Tree Verification', color: 'rgba(239, 246, 255, 0.8)', stepTarget: 5, time: '01:30 PM' },
    { title: 'Prompt Optimization & MCP', sub: 'Code Assessment Challenge', color: 'rgba(236, 253, 245, 0.8)', stepTarget: 6, time: '03:45 PM' },
    { title: 'Vector Retrieval Evaluation', sub: 'Final Skills Assessment Report', color: 'rgba(254, 243, 199, 0.8)', stepTarget: 12, time: '05:15 PM' },
  ];

  // Active courses taking
  const activeCourses = [
    { name: 'React 19 & Concurrent UI', instructor: 'Dr. Sarah Johnson', time: '4h 15min remaining', progress: 68, color: '#EEF2FF' },
    { name: 'Multi-Agent Systems & LangGraph', instructor: 'Alex Turner', time: '9h 30min remaining', progress: 85, color: '#ECFDF5' },
  ];

  // Assignments
  const assignments = [
    { name: 'FastAPI Router Benchmark', date: 'Today, 04:30 PM', status: 'In progress', badgeColor: 'rgba(238, 242, 255, 0.9)', textColor: '#4F46E5' },
    { name: 'RAG Retrieval Optimization', date: 'Yesterday, 11:15 AM', status: 'Completed', badgeColor: 'rgba(236, 253, 245, 0.9)', textColor: '#059669' },
    { name: 'Docker Guardrail Security', date: 'Tomorrow, 09:00 AM', status: 'Upcoming', badgeColor: 'rgba(254, 243, 199, 0.9)', textColor: '#D97706' },
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1.25rem',
      padding: '1.5rem 2rem',
      background: 'transparent',
      flex: 1,
      minHeight: '100%',
      boxSizing: 'border-box',
      overflowY: 'auto'
    }} className="animate-fade-in">

      {/* ── 1. HEADER ROW ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        paddingBottom: '0.25rem',
        borderBottom: '1px solid rgba(232, 226, 213, 0.6)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <h1 style={{
              fontSize: '1.6rem',
              fontWeight: 850,
              color: 'var(--text-primary)',
              letterSpacing: '-0.025em',
              margin: 0
            }}>
              Welcome back Alex 👋
            </h1>
            <span className="badge badge-strong" style={{ fontSize: '0.6875rem', gap: '0.35rem', padding: '0.25rem 0.65rem' }}>
              <Flame size={12} fill="#10B981" /> 88% READINESS SCORE
            </span>
          </div>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', margin: '0.2rem 0 0 0' }}>
            Candidate Profile: <strong style={{ color: 'var(--text-primary)' }}>Alex Turner (CAND-002)</strong> — 31-Day AI Engineering Path
          </p>
        </div>

        {/* Header Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(10px)',
            borderRadius: 'var(--radius-full)',
            padding: '6px 14px',
            border: '1px solid rgba(232, 226, 213, 0.8)',
            width: '210px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
          }}>
            <Search size={14} color="var(--text-muted)" />
            <input 
              type="text" 
              placeholder="Search curriculum skills..." 
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

          <button 
            onClick={() => onNavigateStep(11)}
            className="btn-primary"
            style={{ 
              padding: '0.55rem 1.15rem', 
              fontSize: '0.8125rem',
              borderRadius: 'var(--radius-full)',
              background: 'linear-gradient(135deg, #18181B 0%, #064E3B 100%)',
              gap: '0.45rem'
            }}
          >
            <Zap size={14} color="#10B981" fill="#10B981" />
            <span>Launch AI Interview</span>
          </button>
        </div>
      </div>

      {/* ── 2. NEW CURRICULUM COURSES GRID (3 cards) ── */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={16} color="var(--accent-warm)" />
            <h2 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.01em' }}>
              Featured AI Engineering Stack
            </h2>
          </div>
          <span 
            onClick={() => onNavigateStep(9)}
            style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-warm)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
          >
            View Full Curriculum <ArrowRight size={12} />
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem'
        }}>
          {newSkills.map((c, idx) => (
            <div 
              key={idx}
              onClick={() => onNavigateStep(c.step)}
              className="glass-card"
              style={{
                borderRadius: 'var(--radius-lg)',
                padding: '1.15rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: 'var(--radius-md)',
                  background: c.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: c.iconColor,
                  flexShrink: 0,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                }}>
                  <BookOpen size={18} />
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, lineHeight: 1.25 }}>{c.title}</h4>
                  <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)', fontWeight: 500, display: 'inline-block', marginTop: '0.2rem' }}>{c.lessons}</span>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justify: 'space-between',
                borderTop: '1px solid rgba(232, 226, 213, 0.7)',
                paddingTop: '0.65rem'
              }}>
                <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                  Domain: <strong style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{c.type}</strong>
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  <Star size={12} color="#F59E0B" fill="#F59E0B" />
                  <span>{c.rate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 3. DETAILED WIDGETS ROW (Hours Activity, Daily Schedule, Right Panel Widgets) ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.75fr 1fr 1.05fr',
        gap: '1rem',
        alignItems: 'stretch',
        flex: 1,
        minHeight: 0
      }}>
        
        {/* LEFT COLUMN: Hours Activity + Active Courses */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'space-between' }}>
          
          {/* Hours Activity Card */}
          <div className="glass-card" style={{
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
            flex: 1
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  Weekly Learning & Practice Velocity
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '0.2rem' }}>
                  <TrendingUp size={12} color="#10B981" />
                  <span style={{ fontSize: '0.725rem', color: '#10B981', fontWeight: 700 }}>+14.2% velocity increase vs last week</span>
                </div>
              </div>
              <span className="badge badge-strong" style={{ fontSize: '0.6875rem', padding: '0.2rem 0.6rem' }}>
                LIVE METRICS
              </span>
            </div>

            {/* Interactive Bar Chart */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-end',
              justify: 'space-between',
              height: '95px',
              padding: '0 8px',
              position: 'relative',
              marginTop: '0.4rem'
            }}>
              {[
                { label: 'Sun', hours: 32 },
                { label: 'Mon', hours: 55 },
                { label: 'Tue', hours: 42 },
                { label: 'Wed', hours: 68 },
                { label: 'Thu', hours: 88, highlight: true },
                { label: 'Fri', hours: 50 },
                { label: 'Sat', hours: 60 },
              ].map((bar, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', flex: 1 }}>
                  <div style={{
                    width: '8px',
                    height: `${bar.hours * 0.85}px`,
                    background: bar.highlight ? 'linear-gradient(180deg, #10B981 0%, #064E3B 100%)' : 'rgba(214, 207, 190, 0.7)',
                    borderRadius: '99px',
                    position: 'relative',
                    boxShadow: bar.highlight ? '0 0 10px rgba(16, 185, 129, 0.4)' : 'none',
                    transition: 'all 0.2s ease'
                  }}>
                    {bar.highlight && (
                      <div style={{
                        position: 'absolute',
                        bottom: '100%',
                        left: '50%',
                        transform: 'translateX(-50%) translateY(-6px)',
                        background: '#18181B',
                        color: '#10B981',
                        fontSize: '0.625rem',
                        fontWeight: 700,
                        padding: '3px 8px',
                        borderRadius: 'var(--radius-sm)',
                        whiteSpace: 'nowrap',
                        zIndex: 999,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                        border: '1px solid rgba(16,185,129,0.3)'
                      }}>
                        ⚡ Peak: 3.5h Active Code
                      </div>
                    )}
                  </div>
                  <span style={{ fontSize: '0.6875rem', color: bar.highlight ? 'var(--text-primary)' : 'var(--text-muted)', fontWeight: bar.highlight ? 800 : 600 }}>{bar.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Active Courses Section */}
          <div className="glass-card" style={{
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
            flex: 1
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>Active Skill Modules</h3>
              <button 
                onClick={() => onNavigateStep(3)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.725rem',
                  fontWeight: 700,
                  color: 'var(--accent-warm)',
                  background: 'transparent'
                }}
              >
                <span>Add Skill Module</span>
                <Plus size={12} strokeWidth={3} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {activeCourses.map((ac, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'space-between',
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.75rem 1rem',
                  border: '1px solid rgba(232, 226, 213, 0.8)',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: '32px', height: '32px', borderRadius: 'var(--radius-sm)', background: ac.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1E1B26'
                    }}>
                      <BookOpen size={16} />
                    </div>
                    <div>
                      <h5 style={{ fontSize: '0.8125rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>{ac.name}</h5>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Lead: {ac.instructor}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ textAlign: 'right' }}>
                      <strong style={{ fontSize: '0.725rem', color: 'var(--text-primary)', display: 'block' }}>{ac.time}</strong>
                    </div>
                    <div style={{
                      width: '30px', height: '30px', borderRadius: '50%',
                      border: '2.5px solid var(--border-light)', borderTopColor: '#10B981', borderRightColor: '#10B981',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-primary)',
                      background: 'rgba(240, 253, 244, 0.8)'
                    }}>
                      {ac.progress}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* MIDDLE COLUMN: Daily Technical Schedule */}
        <div className="glass-card" style={{
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.85rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Daily Schedule & Interviews
            </h3>
            <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--text-muted)' }}>4 Tasks Today</span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', flex: 1, justifyContent: 'space-between' }}>
            {dailySchedule.map((sched, idx) => (
              <div 
                key={idx}
                onClick={() => onNavigateStep(sched.stepTarget)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'space-between',
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: '1px solid rgba(232, 226, 213, 0.8)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.75rem 0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--text-primary)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(232, 226, 213, 0.8)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <div style={{
                    width: '30px', height: '30px', borderRadius: 'var(--radius-sm)', background: sched.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1E1B26', flexShrink: 0
                  }}>
                    <CalIcon size={14} />
                  </div>
                  <div>
                    <h5 style={{ fontSize: '0.785rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, lineHeight: 1.2 }}>{sched.title}</h5>
                    <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{sched.sub} • {sched.time}</span>
                  </div>
                </div>
                <ChevronRight size={15} color="var(--text-muted)" />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: AI Pro Assessment, Calendar, Assignments */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', justifyContent: 'space-between' }}>
          
          {/* AI Pro Assessment Card */}
          <div style={{
            background: 'linear-gradient(135deg, #18181B 0%, #064E3B 100%)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.15rem',
            color: '#FFFFFF',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(6, 78, 59, 0.25)',
            border: '1px solid rgba(16, 185, 129, 0.3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
              <Zap size={14} color="#C6F438" fill="#C6F438" />
              <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#C6F438', margin: 0 }}>
                AI Turing Evaluation
              </h4>
            </div>
            <p style={{ fontSize: '0.725rem', color: '#D1D5DB', margin: '0 0 0.85rem 0', lineHeight: 1.35 }}>
              Ready for your adaptive technical evaluation session?
            </p>
            <button 
              onClick={() => onNavigateStep(11)}
              style={{
                background: '#C6F438', 
                color: '#18181B', 
                border: 'none', 
                borderRadius: 'var(--radius-md)',
                padding: '0.5rem 1rem', 
                fontSize: '0.75rem', 
                fontWeight: 800, 
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                boxShadow: '0 4px 12px rgba(198, 244, 56, 0.3)'
              }}
            >
              <span>Start Session</span>
              <ArrowRight size={13} strokeWidth={2.5} />
            </button>
          </div>

          {/* Mini Calendar Widget */}
          <div className="glass-card" style={{
            borderRadius: 'var(--radius-lg)',
            padding: '0.85rem 1rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>August, 2026</span>
              <div style={{ display: 'flex', gap: '6px', fontSize: '0.7rem', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <span>‹</span>
                <span>›</span>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', textAlign: 'center', fontSize: '0.625rem' }}>
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, idx) => (
                <span key={idx} style={{ color: 'var(--text-muted)', fontWeight: 800, paddingBottom: '2px' }}>{d}</span>
              ))}
              {[...Array(31)].map((_, i) => {
                const day = i + 1;
                const isSelected = day === 8;
                return (
                  <span 
                    key={i} 
                    style={{
                      borderRadius: '50%',
                      background: isSelected ? '#10B981' : 'transparent',
                      color: isSelected ? '#FFFFFF' : 'var(--text-primary)',
                      fontWeight: isSelected ? 800 : 500,
                      display: 'inline-block',
                      width: '18px',
                      height: '18px',
                      lineHeight: '18px',
                      margin: 'auto',
                      boxShadow: isSelected ? '0 0 8px rgba(16, 185, 129, 0.4)' : 'none'
                    }}
                  >
                    {day}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Technical Verification Status */}
          <div className="glass-card" style={{
            borderRadius: 'var(--radius-lg)',
            padding: '0.85rem 1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ fontSize: '0.785rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>Verification Milestones</h4>
              <ShieldCheck size={14} color="#10B981" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {assignments.map((as, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.4rem 0.6rem',
                  border: '1px solid rgba(232, 226, 213, 0.7)'
                }}>
                  <div>
                    <h5 style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>{as.name}</h5>
                    <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)' }}>{as.date}</span>
                  </div>
                  <span style={{
                    fontSize: '0.625rem', fontWeight: 800, padding: '2px 6px', borderRadius: 'var(--radius-sm)',
                    background: as.badgeColor, color: as.textColor
                  }}>{as.status}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
