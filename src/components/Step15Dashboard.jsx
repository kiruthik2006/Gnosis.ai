import React, { useState } from 'react';
import { 
  ChevronRight, Play, Star, Plus, MoreHorizontal, ArrowRight,
  TrendingUp, Calendar as CalIcon, BookOpen, Clock, Award, ShieldCheck,
  Search, Bell
} from 'lucide-react';

export default function Step15Dashboard({ onNavigateStep }) {
  const [selectedActivityDay, setSelectedActivityDay] = useState('Th');

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
      gap: '24px',
      padding: '24px',
      background: '#FAF9F6',
      height: '100%',
      overflowY: 'auto',
      boxSizing: 'border-box'
    }}>

      {/* ── 1. HEADER ROW ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <h1 style={{
          fontSize: '1.75rem',
          fontWeight: 800,
          color: '#1E1B26',
          letterSpacing: '-0.025em',
          margin: 0
        }}>
          Welcome back Alex 👋
        </h1>

        {/* Header Right Actions (Search box + notification + profile) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#FFFFFF',
            borderRadius: '99px',
            padding: '6px 14px',
            border: '1px solid #E5E7EB',
            width: '200px'
          }}>
            <Search size={14} color="#9CA3AF" />
            <input 
              type="text" 
              placeholder="Search courses" 
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontSize: '0.75rem',
                width: '100%',
                color: '#1C1B1A'
              }}
            />
          </div>

          <div style={{
            width: '32px',
            height: '32px',
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '12px' }}>
          <h2 style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#1E1B26', margin: 0 }}>New Courses</h2>
          <span style={{ fontSize: '0.7rem', color: '#9CA3AF', cursor: 'pointer' }}>View All</span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px'
        }} className="new-courses-row">
          {newSkills.map((c, idx) => (
            <div 
              key={idx}
              style={{
                background: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '20px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.01)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: c.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: c.iconColor
                }}>
                  <BookOpen size={16} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#1E1B26', margin: 0 }}>{c.title}</h4>
                  <span style={{ fontSize: '0.675rem', color: '#9CA3AF' }}>{c.lessons}</span>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTop: '1px solid #F3F4F6',
                paddingTop: '10px'
              }}>
                <span style={{ fontSize: '0.7rem', color: '#9CA3AF' }}>Type: <strong style={{ color: '#4B5563' }}>{c.type}</strong></span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '0.725rem', fontWeight: 700, color: '#1E1B26' }}>
                  <Star size={12} color="#FBBF24" fill="#FBBF24" />
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
        gridTemplateColumns: '1.8fr 1fr 1fr',
        gap: '20px',
        alignItems: 'stretch'
      }} className="dashboard-content-columns">
        
        {/* LEFT COLUMN: Hours Activity + Courses You're Taking */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Hours Activity Card */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: '20px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '0.875rem', fontWeight: 800, color: '#1E1B26', margin: 0 }}>Hours Activity</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                  <TrendingUp size={12} color="#10B981" />
                  <span style={{ fontSize: '0.675rem', color: '#10B981', fontWeight: 600 }}>+3% increase than last week</span>
                </div>
              </div>
              <span style={{ fontSize: '0.7rem', background: '#F3F4F6', padding: '4px 10px', borderRadius: '99px', color: '#4B5563', fontWeight: 600 }}>
                Weekly
              </span>
            </div>

            {/* Simulated bar chart matching screenshot */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              height: '110px',
              padding: '0 10px',
              position: 'relative'
            }}>
              {/* Daily performance bars */}
              {[
                { label: 'Su', hours: 30 },
                { label: 'Mo', hours: 45 },
                { label: 'Tu', hours: 55 },
                { label: 'We', hours: 25 },
                { label: 'Th', hours: 75, highlight: true },
                { label: 'Fr', hours: 40 },
                { label: 'Sa', hours: 50 },
              ].map((bar, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', flex: 1 }}>
                  <div style={{
                    width: '8px',
                    height: `${bar.hours}px`,
                    background: bar.highlight ? '#1E1B26' : '#E5E7EB',
                    borderRadius: '99px',
                    position: 'relative'
                  }}>
                    {bar.highlight && (
                      /* Hover tooltip style card */
                      <div style={{
                        position: 'absolute',
                        bottom: '100%',
                        left: '50%',
                        transform: 'translateX(-50%) translateY(-6px)',
                        background: '#1E1B26',
                        color: '#FFFFFF',
                        fontSize: '0.55rem',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        whiteSpace: 'nowrap',
                        zIndex: 999
                      }}>
                        01:45 min 5 Jan 2023
                      </div>
                    )}
                  </div>
                  <span style={{ fontSize: '0.625rem', color: '#9CA3AF', fontWeight: 600 }}>{bar.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Courses You're Taking Section */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: '20px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 800, color: '#1E1B26', margin: 0 }}>Course You're Taking</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.7rem', color: '#9CA3AF', fontWeight: 600 }}>Active</span>
                <button style={{
                  width: '22px', height: '22px', borderRadius: '50%', background: '#C6F438', border: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1E1B26', cursor: 'pointer'
                }}>
                  <Plus size={12} strokeWidth={3} />
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {activeCourses.map((ac, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: '#FAF9F6',
                  borderRadius: '16px',
                  padding: '12px 16px',
                  border: '1px solid #F0F0F0'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '32px', height: '32px', borderRadius: '8px', background: ac.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1E1B26'
                    }}>
                      <BookOpen size={14} />
                    </div>
                    <div>
                      <h5 style={{ fontSize: '0.75rem', fontWeight: 800, color: '#1E1B26', margin: 0 }}>{ac.name}</h5>
                      <span style={{ fontSize: '0.625rem', color: '#9CA3AF' }}>{ac.instructor}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.625rem', color: '#9CA3AF', display: 'block' }}>Remaining</span>
                      <strong style={{ fontSize: '0.7rem', color: '#4B5563' }}>{ac.time}</strong>
                    </div>
                    {/* Circle progress bar mock */}
                    <div style={{
                      width: '30px', height: '30px', borderRadius: '50%',
                      border: '3px solid #E5E7EB', borderTopColor: '#C6F438',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.55rem', fontWeight: 800, color: '#1E1B26'
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
          borderRadius: '20px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 800, color: '#1E1B26', marginBottom: '14px' }}>Daily Schedule</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
                    borderRadius: '16px',
                    padding: '12px 14px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#1E1B26'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = '#E5E7EB'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '28px', height: '28px', borderRadius: '8px', background: sched.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1E1B26'
                    }}>
                      <BookOpen size={12} />
                    </div>
                    <div>
                      <h5 style={{ fontSize: '0.75rem', fontWeight: 800, color: '#1E1B26', margin: 0 }}>{sched.title}</h5>
                      <span style={{ fontSize: '0.625rem', color: '#9CA3AF' }}>{sched.sub}</span>
                    </div>
                  </div>
                  <ChevronRight size={14} color="#9CA3AF" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Go Premium, Calendar, Assignments */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Go Premium Card */}
          <div style={{
            background: '#1E1B26', // Dark slate matching header
            borderRadius: '20px',
            padding: '16px',
            color: '#FFFFFF',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <span style={{ fontSize: '0.625rem', color: '#C6F438', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Eduplex Premium
            </span>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#FFFFFF', margin: '4px 0 6px 0', lineHeight: 1.2 }}>
              Go Premium
            </h4>
            <p style={{ fontSize: '0.625rem', color: '#9CA3AF', margin: '0 0 12px 0', lineHeight: 1.3 }}>
              Explore 25k+ courses with lifetime membership.
            </p>
            <button 
              onClick={() => onNavigateStep(11)}
              style={{
                background: '#C6F438', color: '#1E1B26', border: 'none', borderRadius: '10px',
                padding: '6px 12px', fontSize: '0.7rem', fontWeight: 800, cursor: 'pointer'
              }}
            >
              Get Access
            </button>
            {/* Visual gradient circle background representing graphics */}
            <div style={{
              position: 'absolute', bottom: '-10px', right: '-10px', width: '50px', height: '50px',
              borderRadius: '50%', background: '#C6F438', opacity: 0.15
            }} />
          </div>

          {/* Mini Calendar Widget */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: '20px',
            padding: '12px 14px'
          }}>
            {/* Calendar header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#1E1B26' }}>August, 2023</span>
              <div style={{ display: 'flex', gap: '4px' }}>
                <span style={{ fontSize: '0.625rem', cursor: 'pointer', color: '#9CA3AF' }}>‹</span>
                <span style={{ fontSize: '0.625rem', cursor: 'pointer', color: '#9CA3AF' }}>›</span>
              </div>
            </div>
            {/* Calendar grid representation */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', textAlign: 'center', fontSize: '0.55rem' }}>
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
                      padding: '2px',
                      borderRadius: '50%',
                      background: isSelected ? '#C6F438' : 'transparent',
                      color: isSelected ? '#1E1B26' : '#4B5563',
                      fontWeight: isSelected ? 800 : 500
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
            borderRadius: '20px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ fontSize: '0.75rem', fontWeight: 800, color: '#1E1B26', margin: 0 }}>Assignments</h4>
              <button style={{
                width: '18px', height: '18px', borderRadius: '50%', background: '#C6F438', border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1E1B26', cursor: 'pointer'
              }}>
                <Plus size={10} strokeWidth={3} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {assignments.map((as, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: '#FAF9F6',
                  borderRadius: '10px',
                  padding: '8px 10px',
                  border: '1px solid #F0F0F0'
                }}>
                  <div>
                    <h5 style={{ fontSize: '0.675rem', fontWeight: 800, color: '#1E1B26', margin: 0 }}>{as.name}</h5>
                    <span style={{ fontSize: '0.55rem', color: '#9CA3AF' }}>{as.date}</span>
                  </div>
                  <span style={{
                    fontSize: '0.55rem', fontWeight: 800, padding: '2px 6px', borderRadius: '4px',
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
