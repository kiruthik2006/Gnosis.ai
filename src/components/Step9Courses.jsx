import React, { useState } from 'react';
import { 
  BookOpen, Clock, Award, PlayCircle, CheckCircle2, Lock, ArrowRight, Sparkles 
} from 'lucide-react';
import { COURSES } from '../data/mockData';

export default function Step9Courses({ onCompleteCourse, onProceedToInterview }) {
  const [coursesList, setCoursesList] = useState(COURSES);

  const handleSimulateComplete = (courseId) => {
    const updated = coursesList.map(c => {
      if (c.id === courseId) {
        return { ...c, progress: 100, status: 'Completed' };
      }
      if (c.id === 'c3' && courseId === 'c2') {
        return { ...c, status: 'In Progress', progress: 20 };
      }
      return c;
    });
    setCoursesList(updated);
    if (onCompleteCourse) onCompleteCourse(courseId);
  };

  const allCompletedCount = coursesList.filter(c => c.progress === 100).length;

  return (
    <div style={{
      maxWidth: '1080px',
      margin: '0 auto',
      padding: '2.5rem 1.5rem',
      minHeight: 'calc(100vh - 120px)'
    }} className="animate-fade-in">

      {/* Header */}
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
            LEARNING MODULES
          </span>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            letterSpacing: '-0.025em'
          }}>
            Recommended Courses
          </h1>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
            Targeted technical modules designed to strengthen roadmap gaps.
          </p>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          background: 'var(--bg-card)',
          padding: '0.6rem 1.25rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-light)'
        }}>
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Completed Modules:</span>
          <strong style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>{allCompletedCount} / {coursesList.length}</strong>
        </div>
      </div>

      {/* Course Cards Clean Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2.5rem'
      }}>
        {coursesList.map((course) => {
          const isCompleted = course.progress === 100;
          const isLocked = course.status === 'Locked';
          const isInProgress = course.progress > 0 && course.progress < 100;

          return (
            <div
              key={course.id}
              className="saas-card"
              style={{
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
                borderRadius: 'var(--radius-lg)',
                border: isInProgress ? '2px solid var(--accent-warm)' : '1px solid var(--border-light)'
              }}
            >
              <div>
                {/* Header Tag */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'space-between',
                  marginBottom: '0.75rem'
                }}>
                  <span className="badge" style={{
                    background: 'var(--bg-subtle)',
                    color: 'var(--text-secondary)'
                  }}>
                    COURSE
                  </span>

                  {isCompleted && <span className="badge badge-strong">Completed</span>}
                  {isInProgress && <span className="badge badge-moderate">In Progress</span>}
                  {isLocked && <span className="badge badge-locked">Locked</span>}
                  {!isInProgress && !isCompleted && !isLocked && <span className="badge badge-strong" style={{ background: '#F0F4F8', color: '#2B5B84', border: '1px solid #C4D7E6' }}>Available</span>}
                </div>

                {/* Course Title */}
                <h3 style={{
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '0.5rem',
                  lineHeight: 1.3
                }}>
                  "{course.title}"
                </h3>

                <p style={{
                  fontSize: '0.8125rem',
                  color: 'var(--text-secondary)',
                  marginBottom: '1rem',
                  lineHeight: 1.4
                }}>
                  {course.desc}
                </p>

                {/* Skills Chips */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.35rem',
                  marginBottom: '1.25rem'
                }}>
                  {course.skills.map((skill, sIdx) => (
                    <span key={sIdx} style={{
                      fontSize: '0.725rem',
                      fontWeight: 600,
                      color: 'var(--text-secondary)',
                      background: 'var(--bg-subtle)',
                      padding: '0.15rem 0.5rem',
                      borderRadius: 'var(--radius-sm)'
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Meta details */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                  fontSize: '0.785rem',
                  color: 'var(--text-muted)',
                  marginBottom: '1.25rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Award size={13} />
                    <span>{course.difficulty}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Clock size={13} />
                    <span>{course.duration}</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar & Actions */}
              <div>
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{
                    display: 'flex',
                    justify: 'space-between',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    marginBottom: '0.35rem',
                    color: 'var(--text-secondary)'
                  }}>
                    <span>Course Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div style={{
                    height: '6px',
                    width: '100%',
                    background: 'var(--bg-subtle)',
                    borderRadius: '99px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${course.progress}%`,
                      background: isCompleted ? 'var(--status-strong)' : 'var(--accent-warm)',
                      borderRadius: '99px',
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                </div>

                {/* Buttons */}
                {isCompleted ? (
                  <button disabled className="btn-secondary" style={{ width: '100%', opacity: 0.7 }}>
                    <CheckCircle2 size={16} color="var(--status-strong)" />
                    <span>Course Completed</span>
                  </button>
                ) : isLocked ? (
                  <button disabled className="btn-secondary" style={{ width: '100%', opacity: 0.5 }}>
                    <Lock size={15} />
                    <span>Complete Prerequisite</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleSimulateComplete(course.id)}
                    className="btn-primary"
                    style={{ width: '100%', padding: '0.75rem' }}
                  >
                    <span>{isInProgress ? 'Complete Course & Unlock' : 'Start Learning'}</span>
                    <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Footer Banner */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        background: 'var(--bg-card)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-light)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
            Ready to test your knowledge in a live technical interview?
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Completing recommended modules unlocks the AI Technical Interview simulator.
          </div>
        </div>

        <button
          onClick={onProceedToInterview}
          className="btn-primary"
          style={{ padding: '0.85rem 2rem', gap: '0.6rem' }}
        >
          <Sparkles size={18} />
          <span>Proceed to Learning Progress & Interview</span>
        </button>
      </div>
    </div>
  );
}
