import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2, AlertCircle, Lock } from 'lucide-react';
import Step5SkillTree from './Step5SkillTree';

export default function Step7UpdatedTree({ onGoToRoadmap }) {
  // Post-Assessment updated tree state as required in prompt:
  // HTML ✓ Strong | CSS ● Moderate | JavaScript ⚠ Needs Practice | React 🔒 Locked
  const updatedTreeState = {
    root: 'not_started',
    fe: 'strong',
    be: 'not_started',
    html: 'strong',          // HTML ✓ Strong
    css: 'moderate',         // CSS ● Moderate
    javascript: 'needs_practice', // JavaScript ⚠ Needs Practice
    nodejs: 'not_started',
    db: 'locked',
    react: 'locked',         // React 🔒 Locked
    express: 'locked',
    mongodb: 'locked'
  };

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '3rem' }}>
      
      {/* Toast Notification Banner */}
      <div style={{
        maxWidth: '1100px',
        margin: '1.5rem auto 0 auto',
        padding: '0 1.5rem'
      }}>
        <div style={{
          background: 'var(--accent-warm-light)',
          border: '1px solid var(--accent-warm-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.1rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: 'var(--accent-warm)',
              color: '#FFF',
              display: 'flex',
              alignItems: 'center',
              justify: 'center'
            }}>
              <Sparkles size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                Your skill tree has been updated based on your assessment.
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                HTML evaluated as <strong>Strong</strong>, CSS as <strong>Moderate</strong>, and JavaScript identified as <strong>Needs Practice</strong>.
              </div>
            </div>
          </div>

          <button
            onClick={onGoToRoadmap}
            className="btn-primary"
            style={{ padding: '0.7rem 1.5rem', fontSize: '0.875rem' }}
          >
            <span>View My Personalized Roadmap</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Render the Skill Tree with Updated State */}
      <Step5SkillTree
        treeState={updatedTreeState}
        title="Updated Skill Assessment Tree"
        subtitle="Live evaluation results reflect your baseline test scores. Focus areas are highlighted."
        showAssessmentBtn={false}
      />
    </div>
  );
}
