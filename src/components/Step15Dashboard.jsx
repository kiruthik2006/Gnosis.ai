import React, { useState } from 'react';
import { 
  ChevronRight, Play, Star, Plus, MoreHorizontal, ArrowRight,
  TrendingUp, Calendar as CalIcon, BookOpen, Clock, Award, ShieldCheck,
  Search, Bell
} from 'lucide-react';

export default function Step15Dashboard({ onNavigateStep }) {
  // New Courses cards data
  const newSkills = [
    { title: 'Advanced JavaScript', lessons: '12 Lessons', type: 'Frontend UI', rate: '4.8', color: '#FEE2E2', iconColor: '#EF4444' },
    { title: 'FastAPI Routing', lessons: '15 Lessons', type: 'Backend API', rate: '5.0', color: '#ECFDF5', iconColor: '#10B981' },
    { title: 'Vector DB & RAG', lessons: '8 Lessons', type: 'AI Core', rate: '4.7', color: '#EFF6FF', iconColor: '#3B82F6' },
  ];

  // Daily Schedule items
  const dailySchedule = [
    { title: 'Design System', sub: 'Lecture - Class', color: '#FEE2E2', stepTarget: 8 },
    { title: 'Typography', sub: 'Group - Test', color: '#EFF6FF', stepTarget: 8 },
    { title: 'Color Style', sub: 'Group - Test', color: '#ECFDF5', stepTarget: 8 },
    { title: 'Visual Design', sub: 'Lecture - Test', color: '#FEF3C7', stepTarget: 8 },
  ];

  // Active courses taking
  const activeCourses = [
    { name: 'React Fundamentals', instructor: 'Micheal Andrew', time: '8h 45min', progress: 45, color: '#EEF2FF' },
    { name: 'Python & PyTest', instructor: 'Natalia Vaman', time: '18h 12min', progress: 75, color: '#FFF1F2' },
  ];

  // Assignments
  const assignments = [
    { name: 'Methods of data', date: '02 July, 10:30 AM', status: 'In progress', badgeColor: '#EEF2FF', textColor: '#4F46E5' },
    { name: 'Market Research', date: '14 June, 12:45 AM', status: 'Completed', badgeColor: '#ECFDF5', textColor: '#059669' },
    { name: 'Data Collection', date: '12 May, 11:00 AM', status: 'Upcoming', badgeColor: '#FFF7ED', textColor: '#D97706' },
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '14px', // Reduced spacing to prevent overflow
      padding: '16px 20px', // Compact padding
      background: '#FAF9F6',
      height: '100%',
      boxSizing: 'border-box',
      overflow: 'hidden' // Secure no inner scrollbars
    }}>

      {/* ── 1. HEADER ROW ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <h1 style={{
          fontSize: '1.4rem', // Slightly smaller font
          fontWeight: 850,
          color: '#1E1B26',
          letterSpacing: '-0.025em',
          margin: 0
        }}>
          Welcome back Alex 👋
        </h1>

        {/* Header Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#FFFFFF',
            borderRadius: '99px',
            padding: '5px 12px',
            border: '1px solid #E5E7EB',
            width: '180px'
          }}>
            <Search size={12} color="#9CA3AF" />
            <input 
              type="text" 
              placeholder="Search courses" 
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontSize: '0.7rem',
                width: '100%',
                color: '#1C1B1A'
              }}
            />
          </div>

          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '2px solid #E5E7EB'
          }}>
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" 
              alt="Avatar" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>

      {/* ── 2. NEW COURSES GRID (3 cards) ── */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
          <h2 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1E1B26', margin: 0 }}>New Courses</h2>
          <span style={{ fontSize: '0.675rem', color: '#9CA3AF', cursor: 'pointer' }}>View All</span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px'
        }}>
          {newSkills.map((c, idx) => (
            <div 
              key={idx}
              style={{
                background: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '16px',
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                boxShadow: '0 1px 2px rgba(0,0,0,0.01)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '8px',
                  background: c.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: c.iconColor
                }}>
                  <BookOpen size={14} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.75rem', fontWeight: 800, color: '#1E1B26', margin: 0 }}>{c.title}</h4>
                  <span style={{ fontSize: '0.625rem', color: '#9CA3AF' }}>{c.lessons}</span>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTop: '1px solid #F3F4F6',
                paddingTop: '8px'
              }}>
                <span style={{ fontSize: '0.625rem', color: '#9CA3AF' }}>Type: <strong style={{ color: '#4B5563' }}>{c.type}</strong></span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '0.65rem', fontWeight: 700, color: '#1E1B26' }}>
                  <Star size={10} color="#FBBF24" fill="#FBBF24" />
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
        gridTemplateColumns: '1.85fr 1fr 1fr',
        gap: '14px',
        alignItems: 'stretch',
        flex: 1,
        minHeight: 0
      }} className="dashboard-content-columns">
        
        {/* LEFT COLUMN: Hours Activity + Courses You're Taking */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', justifyContent: 'space-between' }}>
          
          {/* Hours Activity Card */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: '16px',
            padding: '14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            flex: 1
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '0.8rem', fontWeight: 800, color: '#1E1B26', margin: 0 }}>Hours Activity</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '1px' }}>
                  <TrendingUp size={10} color="#10B981" />
                  <span style={{ fontSize: '0.625rem', color: '#10B981', fontWeight: 600 }}>+3% increase than last week</span>
                </div>
              </div>
              <span style={{ fontSize: '0.625rem', background: '#F3F4F6', padding: '3px 8px', borderRadius: '99px', color: '#4B5563', fontWeight: 600 }}>
                Weekly
              </span>
            </div>

            {/* Bar chart representation - highly compact */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              height: '80px',
              padding: '0 4px',
              position: 'relative',
              marginTop: '4px'
            }}>
              {[
                { label: 'Su', hours: 22 },
                { label: 'Mo', hours: 35 },
                { label: 'Tu', hours: 45 },
                { label: 'We', hours: 20 },
                { label: 'Th', hours: 65, highlight: true },
                { label: 'Fr', hours: 30 },
                { label: 'Sa', hours: 40 },
              ].map((bar, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flex: 1 }}>
                  <div style={{
                    width: '6px',
                    height: `${bar.hours}px`,
                    background: bar.highlight ? '#1E1B26' : '#E5E7EB',
                    borderRadius: '99px',
                    position: 'relative'
                  }}>
                    {bar.highlight && (
                      <div style={{
                        position: 'absolute',
                        bottom: '100%',
                        left: '50%',
                        transform: 'translateX(-50%) translateY(-4px)',
                        background: '#1E1B26',
                        color: '#FFFFFF',
                        fontSize: '0.5rem',
                        padding: '2px 6px',
                        borderRadius: '3px',
                        whiteSpace: 'nowrap',
                        zIndex: 999
                      }}>
                        01:45 min 5 Jan 2023
                      </div>
                    )}
                  </div>
                  <span style={{ fontSize: '0.55rem', color: '#9CA3AF', fontWeight: 600 }}>{bar.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Courses You're Taking Section */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: '16px',
            padding: '14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            flex: 1
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '0.8rem', fontWeight: 800, color: '#1E1B26', margin: 0 }}>Course You're Taking</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '0.65rem', color: '#9CA3AF', fontWeight: 600 }}>Active</span>
                <button style={{
                  width: '18px', height: '18px', borderRadius: '50%', background: '#C6F438', border: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1E1B26', cursor: 'pointer'
                }}>
                  <Plus size={10} strokeWidth={3} />
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {activeCourses.map((ac, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: '#FAF9F6',
                  borderRadius: '12px',
                  padding: '8px 12px',
                  border: '1px solid #F0F0F0'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '26px', height: '26px', borderRadius: '6px', background: ac.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1E1B26'
                    }}>
                      <BookOpen size={12} />
                    </div>
                    <div>
                      <h5 style={{ fontSize: '0.7rem', fontWeight: 800, color: '#1E1B26', margin: 0 }}>{ac.name}</h5>
                      <span style={{ fontSize: '0.55rem', color: '#9CA3AF' }}>{ac.instructor}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.55rem', color: '#9CA3AF', display: 'block' }}>Remaining</span>
                      <strong style={{ fontSize: '0.625rem', color: '#4B5563' }}>{ac.time}</strong>
                    </div>
                    <div style={{
                      width: '24px', height: '24px', borderRadius: '50%',
                      border: '2px solid #E5E7EB', borderTopColor: '#C6F438',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.5rem', fontWeight: 800, color: '#1E1B26'
                    }}>
                      {ac.progress}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* MIDDLE COLUMN: Daily Schedule */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #E5E7EB',
          borderRadius: '16px',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <h3 style={{ fontSize: '0.8rem', fontWeight: 800, color: '#1E1B26', margin: 0 }}>Daily Schedule</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, justifyContent: 'space-between' }}>
            {dailySchedule.map((sched, idx) => (
              <div 
                key={idx}
                onClick={() => onNavigateStep(sched.stepTarget)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '12px',
                  padding: '8px 10px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#1E1B26'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#E5E7EB'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '24px', height: '24px', borderRadius: '6px', background: sched.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1E1B26'
                  }}>
                    <BookOpen size={10} />
                  </div>
                  <div>
                    <h5 style={{ fontSize: '0.7rem', fontWeight: 800, color: '#1E1B26', margin: 0 }}>{sched.title}</h5>
                    <span style={{ fontSize: '0.55rem', color: '#9CA3AF' }}>{sched.sub}</span>
                  </div>
                </div>
                <ChevronRight size={12} color="#9CA3AF" />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Go Premium, Calendar, Assignments */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', justifyContent: 'space-between' }}>
          
          {/* Go Premium Card */}
          <div style={{
            background: '#1E1B26',
            borderRadius: '16px',
            padding: '12px',
            color: '#FFFFFF',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <h4 style={{ fontSize: '0.75rem', fontWeight: 800, color: '#C6F438', margin: '0 0 2px 0' }}>
              Go Premium
            </h4>
            <p style={{ fontSize: '0.55rem', color: '#9CA3AF', margin: '0 0 8px 0', lineHeight: 1.2 }}>
              Explore 25k+ courses with lifetime access.
            </p>
            <button 
              onClick={() => onNavigateStep(11)}
              style={{
                background: '#C6F438', color: '#1E1B26', border: 'none', borderRadius: '8px',
                padding: '4px 10px', fontSize: '0.625rem', fontWeight: 800, cursor: 'pointer'
              }}
            >
              Get Access
            </button>
          </div>

          {/* Mini Calendar Widget - Highly compact */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: '16px',
            padding: '8px 10px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <span style={{ fontSize: '0.625rem', fontWeight: 800, color: '#1E1B26' }}>August, 2023</span>
              <div style={{ display: 'flex', gap: '2px', fontSize: '0.55rem', color: '#9CA3AF' }}>
                <span>‹</span>
                <span>›</span>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px', textAlign: 'center', fontSize: '0.5rem' }}>
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, idx) => (
                <span key={idx} style={{ color: '#9CA3AF', fontWeight: 800 }}>{d}</span>
              ))}
              {[...Array(31)].map((_, i) => {
                const day = i + 1;
                const isSelected = day === 17;
                return (
                  <span 
                    key={i} 
                    style={{
                      borderRadius: '50%',
                      background: isSelected ? '#C6F438' : 'transparent',
                      color: isSelected ? '#1E1B26' : '#4B5563',
                      fontWeight: isSelected ? 800 : 500,
                      display: 'inline-block',
                      width: '12px',
                      height: '12px',
                      lineHeight: '12px',
                      margin: 'auto'
                    }}
                  >
                    {day}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Assignments list */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: '16px',
            padding: '10px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ fontSize: '0.7rem', fontWeight: 800, color: '#1E1B26', margin: 0 }}>Assignments</h4>
              <button style={{
                width: '14px', height: '14px', borderRadius: '50%', background: '#C6F438', border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1E1B26', cursor: 'pointer'
              }}>
                <Plus size={8} strokeWidth={3} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {assignments.map((as, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: '#FAF9F6',
                  borderRadius: '8px',
                  padding: '4px 6px',
                  border: '1px solid #F0F0F0'
                }}>
                  <div>
                    <h5 style={{ fontSize: '0.6rem', fontWeight: 800, color: '#1E1B26', margin: 0 }}>{as.name}</h5>
                    <span style={{ fontSize: '0.5rem', color: '#9CA3AF' }}>{as.date}</span>
                  </div>
                  <span style={{
                    fontSize: '0.48rem', fontWeight: 800, padding: '1px 4px', borderRadius: '3px',
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
