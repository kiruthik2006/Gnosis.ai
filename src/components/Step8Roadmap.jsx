import React from 'react';
import { 
  CheckCircle2, PlayCircle, Lock, Clock, Award, ArrowRight,
  ChevronDown, BookOpen, Sparkles, Compass
} from 'lucide-react';
import { ROADMAP_STEPS } from '../data/mockData';

export default function Step8Roadmap({ onStartCourse, onGoToCourses }) {
  return (
    <div style={{
      maxWidth: '920px',
      margin: '0 auto',
      padding: '2.5rem 1.5rem',
      minHeight: 'calc(100vh - 120px)'
    }} className="animate-fade-in">

      {/* Title & Banner */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '2.5rem'
      }}>
        <div>
          <span className="badge badge-strong" style={{ marginBottom: '0.4rem' }}>
            PERSONALIZED LEARNING PATH
          </span>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            letterSpacing: '-0.025em'
          }}>
            Your Personalized Roadmap
          </h1>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
            Tailored sequence to address JavaScript practice areas and unlock AI Interview eligibility.
          </p>
        </div>

        <button onClick={onGoToCourses} className="btn-secondary" style={{ gap: '0.5rem' }}>
          <BookOpen size={16} />
          <span>Browse All Courses</span>
        </button>
      </div>

      {/* Roadmap Vertical Progression Timeline */}
      <div style={{ position: 'relative', paddingLeft: '2rem' }}>
        
        {/* Timeline Connector Line */}
        <div style={{
          position: 'absolute',
          left: '27px',
          top: '30px',
          bottom: '30px',
          width: '3px',
          background: 'var(--border-light)',
          zIndex: 1
        }} />

        {/* Current Level Node Badge at Top */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '2rem',
          marginLeft: '-2rem'
        }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'var(--text-primary)',
            color: '#FFF',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            boxShadow: 'var(--shadow-md)',
            fontWeight: 700,
            fontSize: '0.75rem',
            textAlign: 'center'
          }}>
            START
          </div>
          <div>
            <span className="badge badge-strong" style={{ fontSize: '0.7rem' }}>CURRENT LEVEL</span>
            <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
              Intermediate Frontend (JS Practice Needed)
            </div>
          </div>
        </div>

        {/* Timeline Cards Loop */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {ROADMAP_STEPS.map((step, idx) => {
            const isCompleted = step.status === 'completed';
            const isActive = step.status === 'active';
            const isLocked = step.status === 'locked';

            let borderStyle = '1px solid var(--border-light)';
            let bgStyle = 'var(--bg-card)';
            let iconBg = 'var(--bg-subtle)';
            let iconColor = 'var(--text-muted)';

            if (isCompleted) {
              borderStyle = '1px solid var(--status-strong-border)';
              iconBg = 'var(--status-strong-bg)';
              iconColor = 'var(--status-strong)';
            } else if (isActive) {
              borderStyle = '2px solid var(--accent-warm)';
              bgStyle = 'var(--accent-warm-light)';
              iconBg = 'var(--accent-warm)';
              iconColor = '#FFF';
            }

            return (
              <div
                key={step.id}
                className="saas-card"
                style={{
                  position: 'relative',
                  border: borderStyle,
                  background: bgStyle,
                  padding: '1.5rem',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: isActive ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                  transition: 'all 0.2s ease'
                }}
              >
                {/* Connected Node Dot */}
                <div style={{
                  position: 'absolute',
                  left: '-2.25rem',
                  top: '1.75rem',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: iconBg,
                  color: iconColor,
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  zIndex: 2,
                  boxShadow: '0 0 0 4px var(--bg-main)'
                }}>
                  {isCompleted && <CheckCircle2 size={14} />}
                  {isActive && <PlayCircle size={14} />}
                  {isLocked && <Lock size={12} />}
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justify: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}>
                  <div style={{ flex: 1 }}>
                    {/* Top Tags */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                      <span className="badge" style={{
                        background: 'var(--bg-subtle)',
                        color: 'var(--text-secondary)',
                        fontSize: '0.7rem'
                      }}>
                        STEP 0{idx + 1}
                      </span>

                      {isCompleted && <span className="badge badge-strong">Completed</span>}
                      {isActive && <span className="badge badge-moderate pulse-glow">In Progress</span>}
                      {isLocked && <span className="badge badge-locked">Locked</span>}
                    </div>

                    {/* Topic Title */}
                    <h3 style={{
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      marginBottom: '0.4rem'
                    }}>
                      {step.topic}
                    </h3>

                    {/* Meta: Time & Difficulty */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1.25rem',
                      fontSize: '0.8125rem',
                      color: 'var(--text-secondary)',
                      marginBottom: '0.85rem'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Clock size={14} />
                        <span>Estimated time: <strong>{step.time}</strong></span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Award size={14} />
                        <span>Difficulty: <strong>{step.difficulty}</strong></span>
                      </div>
                    </div>

                    {/* Recommended Course Pill */}
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.8125rem',
                      color: 'var(--text-primary)',
                      background: 'var(--bg-card)',
                      padding: '0.4rem 0.85rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-light)'
                    }}>
                      <BookOpen size={14} color="var(--accent-warm)" />
                      <span>Recommended: <strong>{step.courseName}</strong></span>
                    </div>
                  </div>

                  {/* Right Button / Progress */}
                  <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center' }}>
                    {isActive ? (
                      <button
                        onClick={() => onStartCourse(step)}
                        className="btn-primary"
                        style={{ padding: '0.7rem 1.4rem', fontSize: '0.875rem' }}
                      >
                        <span>Start Course</span>
                        <ArrowRight size={16} />
                      </button>
                    ) : isCompleted ? (
                      <div style={{
                        color: 'var(--status-strong)',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem'
                      }}>
                        <CheckCircle2 size={18} />
                        <span>Mastered</span>
                      </div>
                    ) : (
                      <button
                        disabled
                        className="btn-secondary"
                        style={{ padding: '0.6rem 1.2rem', fontSize: '0.8125rem', opacity: 0.6 }}
                      >
                        <Lock size={14} />
                        <span>Locked</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
