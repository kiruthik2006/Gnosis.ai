import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy, ArrowRight, CheckCircle2, Unlock } from 'lucide-react';
import Step5SkillTree from './Step5SkillTree';

export default function Step13FinalTreeUpdate({ onGoToFuturePath }) {
  // Fire celebration confetti when component mounts
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C47838', '#2E6F40', '#D6CFBE', '#1C1B1A']
      });
    } catch (e) {
      console.log('Confetti trigger', e);
    }
  }, []);

  // Post-Interview final tree state as specified:
  // JavaScript ✓ Strong | React ● Moderate / In Progress | Node.js 🔓 Unlocked
  const finalTreeState = {
    root: 'strong',
    fe: 'strong',
    be: 'strong',
    html: 'strong',
    css: 'strong',
    javascript: 'strong',    // Previously ●, Now ✓ Strong!
    nodejs: 'strong',        // Previously 🔒, Now 🔓 Unlocked!
    db: 'moderate',
    react: 'moderate',       // Previously 🔒, Now ● Moderate!
    express: 'moderate',
    mongodb: 'not_started'
  };

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '3rem' }}>
      
      {/* Celebration Banner */}
      <div style={{
        maxWidth: '1100px',
        margin: '1.5rem auto 0 auto',
        padding: '0 1.5rem'
      }}>
        <div style={{
          background: 'var(--text-primary)',
          color: '#FFF',
          borderRadius: 'var(--radius-xl)',
          padding: '1.75rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between',
          flexWrap: 'wrap',
          gap: '1.25rem',
          boxShadow: 'var(--shadow-lg)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', zIndex: 2 }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justify: 'center'
            }}>
              <Trophy size={28} color="#F7D070" />
            </div>

            <div>
              <div style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: '#F7D070',
                textTransform: 'uppercase'
              }}>
                MILESTONE UNLOCKED!
              </div>

              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '0.1rem' }}>
                Congratulations!
              </h2>

              <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.85)' }}>
                You've unlocked the next stage of your roadmap. <strong>JavaScript is now ✓ Strong</strong> and <strong>React & Node.js are 🔓 Unlocked!</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onGoToFuturePath}
            className="btn-primary"
            style={{
              background: '#FFF',
              color: 'var(--text-primary)',
              padding: '0.85rem 1.75rem',
              zIndex: 2
            }}
          >
            <span>View Future Skill Path</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Render Final Updated Skill Tree */}
      <Step5SkillTree
        treeState={finalTreeState}
        title="Mastery Skill Tree — Stage 2"
        subtitle="Newly unlocked nodes are glowing and ready for advanced project coursework."
        showAssessmentBtn={false}
      />
    </div>
  );
}
