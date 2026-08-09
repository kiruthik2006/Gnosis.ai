import React from 'react';
import { Check, ArrowRight, Code2, Globe, Cpu, FileCode } from 'lucide-react';
import { FRONTEND_SKILLS } from '../data/mockData';

export default function Step3FrontendSkills({ selectedSkills, setSelectedSkills, onContinue }) {
  const toggleSkill = (skillId) => {
    if (selectedSkills.includes(skillId)) {
      setSelectedSkills(selectedSkills.filter(id => id !== skillId));
    } else {
      setSelectedSkills([...selectedSkills, skillId]);
    }
  };

  const getTechIcon = (name) => {
    switch (name) {
      case 'HTML': return <Globe size={20} />;
      case 'CSS': return <FileCode size={20} />;
      case 'JavaScript': return <Code2 size={20} />;
      case 'React': return <Code2 size={20} />;
      default: return <Cpu size={20} />;
    }
  };

  return (
    <div style={{
      maxWidth: '960px',
      margin: '0 auto',
      padding: '3rem 1.5rem',
      minHeight: 'calc(100vh - 120px)'
    }} className="animate-fade-in">
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span className="badge badge-strong" style={{ marginBottom: '0.75rem' }}>
          STEP 02 — FRONTEND STACK
        </span>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          letterSpacing: '-0.025em',
          marginTop: '0.5rem',
          marginBottom: '0.5rem'
        }}>
          Choose your frontend skills
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
          Select the technologies you want to be assessed on.
        </p>
      </div>

      {/* Grid of 8 Frontend Skills */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
        gap: '1rem',
        marginBottom: '2.5rem'
      }}>
        {FRONTEND_SKILLS.map((skill) => {
          const isSelected = selectedSkills.includes(skill.id);
          return (
            <div
              key={skill.id}
              onClick={() => toggleSkill(skill.id)}
              className={`saas-card saas-card-interactive ${isSelected ? 'saas-card-selected' : ''}`}
              style={{
                padding: '1.25rem',
                borderWidth: isSelected ? '2px' : '1px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '130px'
              }}
            >
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '0.75rem'
                }}>
                  <div style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: 'var(--radius-sm)',
                    background: isSelected ? 'var(--text-primary)' : 'var(--bg-subtle)',
                    color: isSelected ? '#FFF' : 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {getTechIcon(skill.name)}
                  </div>

                  {/* Checkbox indicator */}
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '4px',
                    border: isSelected ? 'none' : '1.5px solid var(--border-strong)',
                    background: isSelected ? 'var(--text-primary)' : 'transparent',
                    color: '#FFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.15s ease'
                  }}>
                    {isSelected && <Check size={14} strokeWidth={3} />}
                  </div>
                </div>

                <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>
                  {skill.name}
                </div>

                <p style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-secondary)',
                  marginTop: '0.25rem',
                  lineHeight: 1.4
                }}>
                  {skill.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Counter & Action */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'var(--bg-card)',
        padding: '1.25rem 1.75rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-light)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Selected <strong style={{ color: 'var(--text-primary)' }}>{selectedSkills.length}</strong> technologies for frontend assessment.
        </div>

        <button
          onClick={onContinue}
          disabled={selectedSkills.length === 0}
          className="btn-primary"
          style={{ padding: '0.8rem 2rem' }}
        >
          <span>Continue</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
