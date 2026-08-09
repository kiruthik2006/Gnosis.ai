import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, AlertCircle, HelpCircle, ArrowRight } from 'lucide-react';
import { INITIAL_ASSESSMENT_QUESTIONS } from '../data/mockData';

export default function Step6Assessment({ onCompleteAssessment }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({}); // { qId: selectedKey }
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQ = INITIAL_ASSESSMENT_QUESTIONS[currentIdx];
  const totalQ = 15; // Simulated 15 total assessment length
  const activeQNumber = currentIdx + 1;
  const progressPercent = Math.round((activeQNumber / totalQ) * 100);

  const selectedKey = answers[currentQ.id];

  const handleOptionSelect = (key) => {
    setAnswers({ ...answers, [currentQ.id]: key });
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentIdx < INITIAL_ASSESSMENT_QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      // Completed sample questions, proceed to step 7!
      onCompleteAssessment(answers);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setShowExplanation(false);
      setCurrentIdx(currentIdx - 1);
    }
  };

  return (
    <div style={{
      maxWidth: '780px',
      margin: '0 auto',
      padding: '2.5rem 1.5rem',
      minHeight: 'calc(100vh - 120px)'
    }} className="animate-fade-in">

      {/* Header & Progress Bar */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '0.6rem'
        }}>
          <div>
            <span className="badge badge-strong" style={{ marginBottom: '0.2rem' }}>
              SKILL ASSESSMENT
            </span>
            <h1 style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em'
            }}>
              Technical Proficiency Test
            </h1>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Question {String(activeQNumber).padStart(2, '0')} / {totalQ}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Assessment Progress: {progressPercent}%
            </div>
          </div>
        </div>

        {/* Progress Bar Container */}
        <div style={{
          height: '6px',
          width: '100%',
          background: 'var(--bg-subtle)',
          borderRadius: '99px',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            width: `${progressPercent}%`,
            background: 'var(--text-primary)',
            borderRadius: '99px',
            transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }} />
        </div>
      </div>

      {/* Question Card */}
      <div className="saas-card" style={{
        padding: '2rem',
        marginBottom: '1.5rem',
        boxShadow: 'var(--shadow-md)'
      }}>
        {/* Category Tag */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.35rem',
          fontSize: '0.75rem',
          fontWeight: 700,
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '0.75rem'
        }}>
          <HelpCircle size={14} />
          <span>TOPIC: {currentQ.skill.toUpperCase()}</span>
        </div>

        {/* Question Text */}
        <h2 style={{
          fontSize: '1.25rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          letterSpacing: '-0.015em',
          lineHeight: 1.4,
          marginBottom: '1.75rem'
        }}>
          "{currentQ.question}"
        </h2>

        {/* 4 Options Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {currentQ.options.map((opt) => {
            const isSelected = selectedKey === opt.key;
            const isCorrect = opt.correct;
            
            let borderColor = 'var(--border-light)';
            let bgColor = 'var(--bg-card)';
            
            if (isSelected) {
              if (isCorrect) {
                borderColor = 'var(--status-strong)';
                bgColor = 'var(--status-strong-bg)';
              } else {
                borderColor = 'var(--status-needs-practice)';
                bgColor = 'var(--status-needs-practice-bg)';
              }
            }

            return (
              <div
                key={opt.key}
                onClick={() => handleOptionSelect(opt.key)}
                className={`saas-card saas-card-interactive`}
                style={{
                  padding: '1rem 1.25rem',
                  border: `2px solid ${borderColor}`,
                  background: bgColor,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  borderRadius: 'var(--radius-md)',
                  transition: 'all 0.15s ease'
                }}
              >
                {/* Option Key Badge */}
                <div style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: 'var(--radius-sm)',
                  background: isSelected ? 'var(--text-primary)' : 'var(--bg-subtle)',
                  color: isSelected ? '#FFF' : 'var(--text-primary)',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {opt.key}
                </div>

                <div style={{
                  flex: 1,
                  fontSize: '0.9375rem',
                  fontWeight: isSelected ? 600 : 500,
                  color: 'var(--text-primary)'
                }}>
                  {opt.text}
                </div>

                {/* Selected Indicator */}
                {isSelected && (
                  <div>
                    {isCorrect ? (
                      <span className="badge badge-strong">Correct</span>
                    ) : (
                      <span className="badge badge-practice">Incorrect</span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Explanation Banner */}
        {showExplanation && (
          <div className="animate-fade-in" style={{
            marginTop: '1.5rem',
            padding: '1rem 1.25rem',
            background: 'var(--bg-subtle)',
            borderLeft: '4px solid var(--text-primary)',
            borderRadius: '0 var(--radius-md) var(--radius-md) 0',
            fontSize: '0.875rem',
            color: 'var(--text-secondary)'
          }}>
            <strong style={{ color: 'var(--text-primary)' }}>Explanation: </strong>
            {currentQ.explanation}
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <button
          onClick={handlePrev}
          disabled={currentIdx === 0}
          className="btn-secondary"
          style={{ opacity: currentIdx === 0 ? 0.5 : 1 }}
        >
          <ChevronLeft size={18} />
          <span>Previous</span>
        </button>

        <button
          onClick={handleNext}
          disabled={!selectedKey}
          className="btn-primary"
          style={{ padding: '0.8rem 1.75rem', opacity: !selectedKey ? 0.5 : 1 }}
        >
          <span>{currentIdx === INITIAL_ASSESSMENT_QUESTIONS.length - 1 ? 'Finish & Update Tree' : 'Next'}</span>
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
