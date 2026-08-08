import React, { useState } from 'react';
import { 
  CheckCircle2, Flame, ArrowRight, Play, Lock, BookOpen, 
  Award, Shield, Compass, Sparkles, Star, Check 
} from 'lucide-react';

export default function Step15Dashboard({ onNavigateStep }) {
  const [hoveredNode, setHoveredNode] = useState(null);

  // Weekly streak days (M, T, W, T, F, S, S)
  const streakDays = [
    { label: 'M', completed: true, current: false },
    { label: 'T', completed: true, current: false },
    { label: 'W', completed: true, current: false },
    { label: 'T', completed: true, current: false },
    { label: 'F', completed: true, current: false },
    { label: 'S', completed: true, current: true }, // Current day
    { label: 'S', completed: false, current: false },
  ];

  // Upcoming courses data
  const upcomingCourses = [
    {
      id: 'course-1',
      title: 'Advanced JavaScript',
      tech: 'JavaScript',
      difficulty: 'Intermediate',
      duration: '4h 30m',
      status: 'CURRENT',
      stepNum: 9
    },
    {
      id: 'course-2',
      title: 'React Fundamentals',
      tech: 'React',
      difficulty: 'Intermediate',
      duration: '6h 00m',
      status: 'UP NEXT',
      stepNum: 9
    },
    {
      id: 'course-3',
      title: 'Node.js Fundamentals',
      tech: 'Backend',
      difficulty: 'Beginner',
      duration: '5h 00m',
      status: 'LOCKED',
      stepNum: 9
    }
  ];

  // Skill Tree nodes list for rendering hover information and node badges
  const skillNodes = [
    { id: 'fullstack', label: 'Full Stack Developer', status: 'strong', x: 250, y: 30, desc: 'Target composite career path' },
    { id: 'frontend', label: 'Frontend Engine', status: 'strong', x: 120, y: 100, desc: 'UI presentation layer' },
    { id: 'backend', label: 'Backend Systems', status: 'moderate', x: 380, y: 100, desc: 'Server side operations' },
    { id: 'html', label: 'HTML', status: 'strong', x: 50, y: 180, desc: 'Document structure semantics' },
    { id: 'css', label: 'CSS', status: 'strong', x: 120, y: 180, desc: 'Layout & styling systems' },
    { id: 'js', label: 'JavaScript', status: 'moderate', x: 190, y: 180, desc: 'Advanced ES6 & Async loop logic (CURRENT FOCUS)' },
    { id: 'react', label: 'React', status: 'locked', x: 190, y: 260, desc: 'Component tree framework (LOCKED)' },
    { id: 'node', label: 'Node.js', status: 'moderate', x: 310, y: 180, desc: 'Runtime environment operations' },
    { id: 'express', label: 'Express', status: 'not_started', x: 380, y: 180, desc: 'Web application framework' },
    { id: 'db', label: 'Databases', status: 'not_started', x: 450, y: 180, desc: 'Data storage & schemas' },
  ];

  return (
    <div style={{
      maxWidth: '100%',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      padding: '8px 4px 32px 4px',
      background: '#FAFAF9',
      minHeight: '100%',
      fontFamily: 'var(--font-sans)',
      boxSizing: 'border-box'
    }}>

      {/* ==================================================
          1. TOP WELCOME & DAILY STREAK SECTION
          ================================================== */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.8fr 1fr',
        gap: '20px',
        alignItems: 'stretch'
      }} className="dashboard-top-row">
        
        {/* Welcome Section */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '12px 0'
        }}>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 800,
            color: '#1C1B1A',
            letterSpacing: '-0.025em',
            margin: '0 0 4px 0'
          }}>
            Welcome back, Alex 👋
          </h1>
          <p style={{
            fontSize: '0.9375rem',
            color: '#5A564E',
            margin: 0,
            lineHeight: '1.45'
          }}>
            Continue your learning journey and get ready for your next technical interview.
          </p>
        </div>

        {/* Daily Streak Card */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #E5E7EB',
          borderRadius: '20px',
          padding: '16px 20px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}>
          <div>
            <span style={{ fontSize: '0.675rem', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Daily Streak
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: '4px 0' }}>
              <Flame size={20} color="#D97706" fill="#F59E0B" />
              <strong style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1C1B1A' }}>7 Days</strong>
            </div>
            <span style={{ fontSize: '0.725rem', color: '#5A564E' }}>Keep learning every day!</span>
          </div>

          {/* Weekly indicator icons strip */}
          <div style={{ display: 'flex', gap: '4px' }}>
            {streakDays.map((day, idx) => (
              <div 
                key={idx}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <div style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: day.completed ? '#D1FAE5' : '#F3F4F6',
                  color: day.completed ? '#065F46' : '#9CA3AF',
                  border: day.current ? '1.5px solid #059669' : '1px solid transparent',
                  fontSize: '0.7rem',
                  fontWeight: 700
                }}>
                  {day.completed ? <Check size={10} strokeWidth={3} /> : '•'}
                </div>
                <span style={{ fontSize: '0.625rem', fontWeight: 700, color: day.current ? '#059669' : '#9CA3AF' }}>
                  {day.label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ==================================================
          2. COURSES & PREPARATION OVERVIEW ROW
          ================================================== */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr 1fr',
        gap: '20px',
        alignItems: 'stretch'
      }} className="dashboard-stats-row">
        
        {/* Next Course Card */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #E5E7EB',
          borderRadius: '20px',
          padding: '20px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '#0.675rem', fontWeight: 700, color: '#D97706', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Next Course
              </span>
              <span style={{ fontSize: '0.725rem', color: '#6B7280', fontWeight: 500 }}>Est. time: 4h 30m</span>
            </div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#1C1B1A', margin: '0 0 6px 0' }}>
              Advanced JavaScript
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.7rem', background: '#F3F4F6', padding: '2px 8px', borderRadius: '4px', color: '#4B5563', fontWeight: 500 }}>
                JavaScript
              </span>
              <span style={{ fontSize: '0.7rem', background: '#F3F4F6', padding: '2px 8px', borderRadius: '4px', color: '#4B5563', fontWeight: 500 }}>
                ES6 · Async/Await
              </span>
            </div>
            {/* Progress bar */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }}>
                <span style={{ color: '#6B7280' }}>Progress</span>
                <strong style={{ color: '#1C1B1A' }}>68%</strong>
              </div>
              <div style={{ height: '6px', background: '#F3F4F6', borderRadius: '99px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '68%', background: '#10B981' }} />
              </div>
            </div>
          </div>

          <button 
            onClick={() => onNavigateStep(9)}
            style={{
              width: '100%',
              background: '#1C1B1A',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '12px',
              padding: '10px 16px',
              fontSize: '0.8125rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              cursor: 'pointer',
              marginTop: '16px',
              transition: 'opacity 0.2s'
            }}
          >
            <span>Continue Course</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Completed Courses Card */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #E5E7EB',
          borderRadius: '20px',
          padding: '20px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <span style={{ fontSize: '0.675rem', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '6px' }}>
              Completed Courses
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '8px' }}>
              <strong style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1C1B1A' }}>4 / 6</strong>
              <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>Completed modules</span>
            </div>
            
            {/* Progress bar */}
            <div style={{ height: '4px', background: '#F3F4F6', borderRadius: '99px', overflow: 'hidden', marginBottom: '14px' }}>
              <div style={{ height: '100%', width: '66%', background: '#10B981' }} />
            </div>

            {/* Completed list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {[
                'HTML & CSS',
                'JavaScript Fundamentals',
                'Git & GitHub',
                'React Basics'
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.725rem', color: '#4B5563' }}>
                  <CheckCircle2 size={12} color="#10B981" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interview Readiness Card */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #E5E7EB',
          borderRadius: '20px',
          padding: '20px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.675rem', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Interview Readiness
              </span>
              <span style={{
                fontSize: '0.625rem',
                background: '#FEF3C7',
                color: '#D97706',
                padding: '2px 8px',
                borderRadius: '99px',
                fontWeight: 700
              }}>
                Building Confidence
              </span>
            </div>
            
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1C1B1A', margin: '4px 0 8px 0' }}>
              72%
            </div>

            {/* Progress bar */}
            <div style={{ height: '6px', background: '#F3F4F6', borderRadius: '99px', overflow: 'hidden', marginBottom: '12px' }}>
              <div style={{ height: '100%', width: '72%', background: '#D97706' }} />
            </div>

            <p style={{ fontSize: '0.725rem', color: '#6B7280', lineHeight: '1.4', margin: 0 }}>
              Complete your current roadmap to unlock your next adaptive technical interview.
            </p>
          </div>

          <button 
            onClick={() => onNavigateStep(11)}
            style={{
              width: '100%',
              background: 'transparent',
              color: '#1C1B1A',
              border: '1px solid #D1D5DB',
              borderRadius: '12px',
              padding: '8px 14px',
              fontSize: '0.8125rem',
              fontWeight: 700,
              cursor: 'pointer',
              marginTop: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px'
            }}
          >
            <span>Start Practice Interview</span>
            <ArrowRight size={14} />
          </button>
        </div>

      </div>

      {/* ==================================================
          3. UPCOMING COURSES
          ================================================== */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '12px' }}>
          <div>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#1C1B1A', margin: 0 }}>
              Upcoming Courses
            </h2>
            <span style={{ fontSize: '0.725rem', color: '#6B7280' }}>Recommended based on your current skill tree.</span>
          </div>
          <button onClick={() => onNavigateStep(9)} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1C1B1A', cursor: 'pointer' }}>
            View All
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px'
        }} className="upcoming-courses-row">
          {upcomingCourses.map((c, idx) => {
            const isLocked = c.status === 'LOCKED';
            const isCurrent = c.status === 'CURRENT';
            return (
              <div 
                key={c.id}
                style={{
                  background: '#FFFFFF',
                  border: isCurrent ? '1.5px solid #1C1B1A' : '1px solid #E5E7EB',
                  borderRadius: '16px',
                  padding: '16px',
                  opacity: isLocked ? 0.75 : 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '140px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{
                      fontSize: '0.625rem',
                      fontWeight: 700,
                      background: isCurrent ? '#FEF3C7' : isLocked ? '#F3F4F6' : '#D1FAE5',
                      color: isCurrent ? '#D97706' : isLocked ? '#9CA3AF' : '#065F46',
                      padding: '2px 8px',
                      borderRadius: '99px'
                    }}>{c.status}</span>
                    <span style={{ fontSize: '0.675rem', color: '#9CA3AF' }}>{c.duration}</span>
                  </div>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 800, color: '#1C1B1A', margin: '0 0 4px 0' }}>
                    {c.title}
                  </h4>
                  <span style={{ fontSize: '0.7rem', color: '#6B7280' }}>{c.tech} · {c.difficulty}</span>
                </div>

                <button 
                  onClick={() => !isLocked && onNavigateStep(c.stepNum)}
                  disabled={isLocked}
                  style={{
                    width: '100%',
                    background: isLocked ? '#F3F4F6' : '#FFFFFF',
                    color: isLocked ? '#9CA3AF' : '#1C1B1A',
                    border: '1px solid #D1D5DB',
                    borderRadius: '10px',
                    padding: '6px 12px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: isLocked ? 'not-allowed' : 'pointer',
                    marginTop: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px'
                  }}
                >
                  {isLocked ? <Lock size={12} /> : null}
                  <span>{isLocked ? 'Locked' : 'Continue'}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* ==================================================
          4. YOUR CURRENT SKILL TREE
          ================================================== */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #E5E7EB',
        borderRadius: '24px',
        padding: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
      }}>
        {/* Section Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '20px',
          borderBottom: '1px solid #F3F4F6',
          paddingBottom: '16px'
        }}>
          <div>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#1C1B1A', margin: 0 }}>
              Your Current Skill Tree
            </h2>
            <span style={{ fontSize: '0.725rem', color: '#6B7280' }}>Your progress toward your selected career path.</span>
          </div>

          {/* Tree Summary Stats Badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            fontSize: '0.75rem'
          }}>
            <div>
              <span style={{ color: '#6B7280' }}>PATH:</span> <strong style={{ color: '#1C1B1A' }}>Frontend → Backend</strong>
            </div>
            <div style={{ width: '1px', height: '14px', background: '#D1D5DB' }} />
            <div>
              <span style={{ color: '#6B7280' }}>STRONG SKILLS:</span> <strong style={{ color: '#10B981' }}>HTML, CSS</strong>
            </div>
            <div style={{ width: '1px', height: '14px', background: '#D1D5DB' }} />
            <div>
              <span style={{ color: '#6B7280' }}>CURRENT FOCUS:</span> <strong style={{ color: '#D97706' }}>JS</strong>
            </div>
          </div>
        </div>

        {/* Tree Layout Viewport */}
        <div style={{
          position: 'relative',
          background: '#FAFAF9',
          border: '1px solid #E5E7EB',
          borderRadius: '16px',
          padding: '24px',
          overflowX: 'auto',
          minWidth: '550px'
        }}>
          
          {/* Custom SVG Connector Lines matching the tree structure */}
          <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
            {/* Level 0 to 1 */}
            <path d="M 250 50 L 120 120" stroke="#D1D5DB" strokeWidth={1.5} />
            <path d="M 250 50 L 380 120" stroke="#D1D5DB" strokeWidth={1.5} />
            {/* Level 1 to 2 (Frontend) */}
            <path d="M 120 120 L 50 200" stroke="#D1D5DB" strokeWidth={1.5} />
            <path d="M 120 120 L 120 200" stroke="#D1D5DB" strokeWidth={1.5} />
            <path d="M 120 120 L 190 200" stroke="#D1D5DB" strokeWidth={1.5} />
            {/* JS to React */}
            <path d="M 190 200 L 190 280" stroke="#E5E7EB" strokeWidth={1.5} strokeDasharray="3 3" />
            {/* Level 1 to 2 (Backend) */}
            <path d="M 380 120 L 310 200" stroke="#E5E7EB" strokeWidth={1.5} strokeDasharray="3 3" />
            <path d="M 380 120 L 380 200" stroke="#E5E7EB" strokeWidth={1.5} strokeDasharray="3 3" />
            <path d="M 380 120 L 450 200" stroke="#E5E7EB" strokeWidth={1.5} strokeDasharray="3 3" />
          </svg>

          {/* Interactive Tree Nodes */}
          <div style={{ height: '320px', position: 'relative' }}>
            {skillNodes.map(node => {
              const isFocus = node.id === 'js';
              const isLocked = node.status === 'locked';
              const isNotStarted = node.status === 'not_started';
              const isHovered = hoveredNode === node.id;

              return (
                <div
                  key={node.id}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  style={{
                    position: 'absolute',
                    left: `${node.x}px`,
                    top: `${node.y}px`,
                    transform: 'translate(-50%, -50%)',
                    background: isLocked ? '#F3F4F6' : '#FFFFFF',
                    border: isFocus ? '2px solid #D97706' : isLocked ? '1px dashed #D1D5DB' : '1px solid #D1D5DB',
                    borderRadius: '12px',
                    padding: '6px 12px',
                    cursor: 'pointer',
                    boxShadow: isHovered || isFocus ? '0 4px 10px rgba(0,0,0,0.04)' : '0 1px 2px rgba(0,0,0,0.01)',
                    zIndex: isHovered ? 10 : 2,
                    opacity: isNotStarted ? 0.75 : 1,
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {node.status === 'strong' && <span style={{ color: '#10B981', fontSize: '0.75rem' }}>✓</span>}
                    {node.status === 'moderate' && <span style={{ color: '#D97706', fontSize: '0.75rem' }}>●</span>}
                    {isNotStarted && <span style={{ color: '#9CA3AF', fontSize: '0.75rem' }}>○</span>}
                    {isLocked && <Lock size={10} color="#9CA3AF" />}
                    
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: 700, 
                      color: isLocked ? '#9CA3AF' : '#1C1B1A' 
                    }}>
                      {node.label}
                    </span>
                  </div>

                  {/* Bubble popup drawer showing node description */}
                  {isHovered && (
                    <div style={{
                      position: 'absolute',
                      bottom: '100%',
                      left: '50%',
                      transform: 'translateX(-50%) translateY(-6px)',
                      background: '#1C1B1A',
                      color: '#FFFFFF',
                      fontSize: '0.625rem',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      whiteSpace: 'nowrap',
                      zIndex: 9999,
                      boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                    }}>
                      {node.desc}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>

      {/* ==================================================
          5. BOTTOM RECOMMENDED NEXT STEP
          ================================================== */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #E5E7EB',
        borderRadius: '20px',
        padding: '16px 20px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: '#FEF3C7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#D97706'
          }}>
            <Sparkles size={16} />
          </div>
          <div>
            <span style={{ fontSize: '0.675rem', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>
              Your next best step
            </span>
            <span style={{ fontSize: '0.8125rem', color: '#1C1B1A', fontWeight: 600 }}>
              Complete Advanced JavaScript to unlock React Fundamentals.
            </span>
          </div>
        </div>

        <button 
          onClick={() => onNavigateStep(8)}
          style={{
            background: '#1C1B1A',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '10px',
            padding: '8px 14px',
            fontSize: '0.75rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <span>Continue Learning</span>
          <ArrowRight size={12} />
        </button>
      </div>

    </div>
  );
}
