import React, { useState } from 'react';
import { 
  BookOpen, Clock, Award, PlayCircle, CheckCircle2, Lock, ArrowRight, Sparkles,
  Search, ChevronDown, RefreshCw, ExternalLink, Filter, Check
} from 'lucide-react';
import { COURSES } from '../data/mockData';

// Custom Tech Icon Badges matching the Code Academy reference design
const TECH_BADGES = {
  c1: { bg: '#F7DF1E', text: '#000000', iconText: 'JS', label: 'JS', glow: 'rgba(247, 223, 30, 0.15)' },
  c2: { bg: 'linear-gradient(135deg, #F7DF1E 0%, #EAB308 100%)', text: '#000000', iconText: 'JS', label: 'V8 Engine', glow: 'rgba(234, 179, 8, 0.2)' },
  c3: { bg: '#61DAFB', text: '#000000', iconText: '⚛', label: 'React', glow: 'rgba(97, 218, 251, 0.2)' },
  c4: { bg: '#000000', border: '#10B981', text: '#10B981', iconText: 'EX', label: 'Express', glow: 'rgba(16, 185, 129, 0.2)' },
  c5: { bg: '#47A248', text: '#FFFFFF', iconText: 'MDB', label: 'MongoDB', glow: 'rgba(71, 162, 72, 0.2)' },
  c6: { bg: '#009688', text: '#FFFFFF', iconText: 'API', label: 'FastAPI', glow: 'rgba(0, 150, 136, 0.2)' }
};

export default function Step9Courses({ onCompleteCourse, onProceedToInterview }) {
  const [coursesList, setCoursesList] = useState(COURSES);
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSimulateComplete = (courseId) => {
    const updated = coursesList.map(c => {
      if (c.id === courseId) {
        return { ...c, progress: 100, status: 'Completed' };
      }
      if (c.id === 'c3' && courseId === 'c2') {
        return { ...c, status: 'In Progress', progress: 25 };
      }
      return c;
    });
    setCoursesList(updated);
    if (onCompleteCourse) onCompleteCourse(courseId);
  };

  const filteredCourses = coursesList.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevel === 'All' || c.difficulty.toLowerCase() === selectedLevel.toLowerCase();
    return matchesSearch && matchesLevel;
  });

  const allCompletedCount = coursesList.filter(c => c.progress === 100).length;

  return (
    <div style={{
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '1.5rem 2rem',
      background: 'transparent',
      minHeight: 'calc(100vh - 110px)',
      boxSizing: 'border-box'
    }} className="animate-fade-in">

      {/* ── 1. HEADER ROW ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '1.5rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid rgba(232, 226, 213, 0.6)'
      }}>
        <div>
          <span className="badge badge-strong" style={{ marginBottom: '0.4rem', gap: '0.35rem' }}>
            <Sparkles size={11} fill="#10B981" /> CODE ACADEMY CURRICULUM
          </span>
          <h1 style={{
            fontSize: '1.8rem',
            fontWeight: 850,
            color: 'var(--text-primary)',
            letterSpacing: '-0.025em',
            margin: 0
          }}>
            Recommended Courses & Modules
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0 0' }}>
            Targeted technical modules designed to strengthen roadmap gaps for AI technical interviews.
          </p>
        </div>

        {/* Header Right Completion Counter */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.85rem',
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(10px)',
          padding: '0.6rem 1.25rem',
          borderRadius: 'var(--radius-full)',
          border: '1px solid rgba(232, 226, 213, 0.8)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
        }}>
          <BookOpen size={16} color="var(--accent-warm)" />
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Progress:</span>
          <strong style={{ fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: 850 }}>{allCompletedCount} / {coursesList.length} Completed</strong>
        </div>
      </div>

      {/* ── 2. SEARCH & SORT BAR ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        marginBottom: '1.5rem',
        flexWrap: 'wrap'
      }}>
        {/* Search Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: '#1C1C1F',
          borderRadius: '99px',
          padding: '8px 18px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          flex: 1,
          maxWidth: '520px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
        }}>
          <Search size={15} color="#9CA3AF" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="What are you looking for? Type to search..." 
            style={{
              border: 'none',
              background: 'transparent',
              outline: 'none',
              fontSize: '0.8125rem',
              width: '100%',
              color: '#FFFFFF'
            }}
          />
        </div>

        {/* Sort Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button style={{
            background: '#1C1C1F',
            color: '#FFFFFF',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '99px',
            padding: '8px 16px',
            fontSize: '0.8125rem',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer'
          }}>
            <span>Most relevant</span>
            <ChevronDown size={14} color="#9CA3AF" />
          </button>
        </div>
      </div>

      {/* ── 3. MAIN WORKSPACE GRID: FILTERS SIDEBAR + DARK CODE ACADEMY CARDS GRID ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '220px 1fr',
        gap: '1.75rem',
        alignItems: 'start'
      }}>

        {/* LEFT SIDEBAR: FILTERS */}
        <div style={{
          background: '#141416',
          borderRadius: '20px',
          padding: '1.25rem',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          color: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          boxShadow: '0 8px 24px rgba(0,0,0,0.25)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 800, fontSize: '0.9rem' }}>
              <Filter size={14} color="#9CA3AF" />
              <span>Filters</span>
            </div>
            <button 
              onClick={() => { setSelectedLevel('All'); setSelectedTopic('All'); setSearchQuery(''); }}
              style={{ fontSize: '0.725rem', color: '#9CA3AF', background: 'transparent', border: 'none', cursor: 'pointer' }}
            >
              Clear all
            </button>
          </div>

          <hr style={{ border: 0, borderTop: '1px solid rgba(255, 255, 255, 0.08)', margin: 0 }} />

          {/* Type Filter */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9CA3AF', marginBottom: '0.55rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Type
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.8125rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: '#E5E7EB' }}>
                <input type="checkbox" defaultChecked style={{ accentColor: '#10B981' }} />
                <span>Courses</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: '#9CA3AF' }}>
                <input type="checkbox" style={{ accentColor: '#10B981' }} />
                <span>Paths</span>
              </label>
            </div>
          </div>

          {/* Level Filter */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9CA3AF', marginBottom: '0.55rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Level
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.8125rem' }}>
              {['All', 'Beginner', 'Intermediate', 'Advanced'].map(lvl => (
                <label 
                  key={lvl} 
                  onClick={() => setSelectedLevel(lvl)}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: selectedLevel === lvl ? '#10B981' : '#9CA3AF', fontWeight: selectedLevel === lvl ? 700 : 400 }}
                >
                  <input type="radio" name="level" checked={selectedLevel === lvl} onChange={() => {}} style={{ accentColor: '#10B981' }} />
                  <span>{lvl}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Topic Filter */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9CA3AF', marginBottom: '0.55rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Topic
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.8125rem' }}>
              {['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB'].map(topic => (
                <label key={topic} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: '#9CA3AF' }}>
                  <input type="checkbox" defaultChecked={topic === 'JavaScript'} style={{ accentColor: '#10B981' }} />
                  <span>{topic}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Duration Filter */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9CA3AF', marginBottom: '0.55rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Average Length
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.8125rem', color: '#9CA3AF' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input type="radio" name="length" style={{ accentColor: '#10B981' }} />
                <span>Under 5 hours</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input type="radio" name="length" defaultChecked style={{ accentColor: '#10B981' }} />
                <span>5–10 hours</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input type="radio" name="length" style={{ accentColor: '#10B981' }} />
                <span>10+ hours</span>
              </label>
            </div>
          </div>
        </div>

        {/* RIGHT CARDS GRID: DARK CODE ACADEMY CARDS */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.25rem'
        }}>
          {filteredCourses.map((course) => {
            const isCompleted = course.progress === 100;
            const isLocked = course.status === 'Locked';
            const isInProgress = course.progress > 0 && course.progress < 100;
            const badge = TECH_BADGES[course.id] || TECH_BADGES.c1;

            return (
              <div
                key={course.id}
                style={{
                  background: 'linear-gradient(160deg, #1C1C1F 0%, #121214 100%)',
                  borderRadius: '20px',
                  border: '1px solid rgba(255, 255, 255, 0.09)',
                  padding: '1.35rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '260px',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 12px 32px rgba(0, 0, 0, 0.35)',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'pointer'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.09)';
                }}
              >
                {/* Subtle Ambient Radial Glow at Bottom */}
                <div style={{
                  position: 'absolute',
                  bottom: '-30%',
                  right: '-20%',
                  width: '160px',
                  height: '160px',
                  background: badge.glow,
                  borderRadius: '50%',
                  filter: 'blur(35px)',
                  pointerEvents: 'none'
                }} />

                <div>
                  {/* Card Header Row: Tech Logo Box + Meta Badges */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    marginBottom: '1.15rem'
                  }}>
                    {/* Tech Logo Square Badge */}
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      background: badge.bg,
                      color: badge.text,
                      border: badge.border ? `1.5px solid ${badge.border}` : 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 900,
                      fontSize: '0.9rem',
                      letterSpacing: '-0.02em',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                      flexShrink: 0
                    }}>
                      {badge.iconText}
                    </div>

                    {/* Top Right Meta Pills */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        color: '#D1D5DB',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        padding: '3px 8px',
                        borderRadius: '99px',
                        fontSize: '0.6875rem',
                        fontWeight: 600
                      }}>
                        {course.difficulty}
                      </span>

                      <span style={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        color: '#9CA3AF',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        padding: '3px 8px',
                        borderRadius: '99px',
                        fontSize: '0.6875rem',
                        fontWeight: 600,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '3px'
                      }}>
                        <Clock size={11} color="#9CA3AF" />
                        <span>{course.duration}</span>
                      </span>

                      {isInProgress && (
                        <div style={{
                          width: '22px', height: '22px', borderRadius: '50%',
                          background: 'rgba(16,185,129,0.15)', color: '#10B981',
                          display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                          <RefreshCw size={11} className="pulse-glow" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Course Title with Arrow Prompt ↗ */}
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: 850,
                    color: '#FFFFFF',
                    margin: '0 0 0.45rem 0',
                    lineHeight: 1.3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <span>{course.title}</span>
                    <span style={{ fontSize: '1rem', color: '#9CA3AF' }}>↗</span>
                  </h3>

                  <p style={{
                    fontSize: '0.8125rem',
                    color: '#9CA3AF',
                    margin: '0 0 1.1rem 0',
                    lineHeight: 1.45
                  }}>
                    {course.desc}
                  </p>
                </div>

                {/* Card Bottom Row: Progress Bar & Action Control */}
                <div style={{ position: 'relative', zIndex: 2 }}>
                  {/* Progress Line */}
                  <div style={{ marginBottom: '0.85rem' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '0.725rem',
                      fontWeight: 600,
                      marginBottom: '0.35rem',
                      color: '#9CA3AF'
                    }}>
                      <span>Completion</span>
                      <span style={{ color: isCompleted ? '#10B981' : '#F59E0B', fontWeight: 800 }}>{course.progress}%</span>
                    </div>

                    <div style={{
                      height: '5px',
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '99px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        height: '100%',
                        width: `${course.progress}%`,
                        background: isCompleted ? '#10B981' : 'linear-gradient(90deg, #F59E0B 0%, #D97706 100%)',
                        borderRadius: '99px',
                        transition: 'width 0.3s ease'
                      }} />
                    </div>
                  </div>

                  {/* Action Button */}
                  {isCompleted ? (
                    <button 
                      disabled 
                      style={{
                        width: '100%',
                        padding: '0.6rem',
                        borderRadius: '12px',
                        background: 'rgba(16, 185, 129, 0.15)',
                        border: '1px solid rgba(16, 185, 129, 0.3)',
                        color: '#10B981',
                        fontSize: '0.8125rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        cursor: 'default'
                      }}
                    >
                      <CheckCircle2 size={15} color="#10B981" />
                      <span>Completed</span>
                    </button>
                  ) : isLocked ? (
                    <button 
                      disabled 
                      style={{
                        width: '100%',
                        padding: '0.6rem',
                        borderRadius: '12px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        color: '#6B7280',
                        fontSize: '0.8125rem',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        cursor: 'not-allowed'
                      }}
                    >
                      <Lock size={14} />
                      <span>Locked</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSimulateComplete(course.id)}
                      style={{
                        width: '100%',
                        padding: '0.65rem',
                        borderRadius: '12px',
                        background: '#FFFFFF',
                        color: '#121214',
                        border: 'none',
                        fontSize: '0.8125rem',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 4px 12px rgba(255,255,255,0.1)'
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = '#E5E7EB'}
                      onMouseLeave={e => e.currentTarget.style.background = '#FFFFFF'}
                    >
                      <span>{isInProgress ? 'Complete & Unlock' : 'Start Course'}</span>
                      <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* ── 4. PROGRESS FOOTER BANNER ── */}
      <div style={{
        marginTop: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'linear-gradient(135deg, #18181B 0%, #064E3B 100%)',
        padding: '1.25rem 1.75rem',
        borderRadius: '20px',
        border: '1px solid rgba(16, 185, 129, 0.3)',
        boxShadow: '0 8px 24px rgba(6, 78, 59, 0.25)',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#FFFFFF', letterSpacing: '-0.015em' }}>
            Ready to test your knowledge in a live AI technical interview?
          </div>
          <div style={{ fontSize: '0.8125rem', color: '#A7F3D0', marginTop: '0.2rem' }}>
            Completing recommended modules unlocks the AI Technical Interview simulator with Agent Turing.
          </div>
        </div>

        <button
          onClick={onProceedToInterview}
          className="btn-primary"
          style={{
            padding: '0.8rem 1.6rem',
            borderRadius: 'var(--radius-full)',
            background: '#10B981',
            color: '#04241C',
            border: 'none',
            fontSize: '0.875rem',
            fontWeight: 850,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(16, 185, 129, 0.35)'
          }}
        >
          <Sparkles size={16} fill="#04241C" />
          <span>Proceed to AI Interview</span>
        </button>
      </div>

    </div>
  );
}
