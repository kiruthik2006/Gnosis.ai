import React from 'react';
import { Server, Cpu, Database, Check, Sparkles } from 'lucide-react';
import { BACKEND_SKILLS } from '../data/mockData';

export default function Step4BackendSkills({ selectedBackend, setSelectedBackend, onGenerateTree }) {
  const toggleBackendSkill = (skillId) => {
    if (selectedBackend.includes(skillId)) {
      setSelectedBackend(selectedBackend.filter(id => id !== skillId));
    } else {
      setSelectedBackend([...selectedBackend, skillId]);
    }
  };

  const sections = [
    { title: 'SERVER', icon: Server, data: BACKEND_SKILLS.server, label: 'Runtime & Server Languages' },
    { title: 'FRAMEWORK', icon: Cpu, data: BACKEND_SKILLS.framework, label: 'Application Web Frameworks' },
    { title: 'DATABASE', icon: Database, data: BACKEND_SKILLS.database, label: 'Data Storage & Persistence' }
  ];

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
          STEP 03 — BACKEND STACK
        </span>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          letterSpacing: '-0.025em',
          marginTop: '0.5rem',
          marginBottom: '0.5rem'
        }}>
          Build your backend stack
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
          Choose the technologies you want to strengthen.
        </p>
      </div>

      {/* 3 Clearly Separated Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '2.5rem' }}>
        {sections.map((sec) => {
          const SectionIcon = sec.icon;
          return (
            <div key={sec.title} style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
              {/* Section Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
                <div style={{
                  padding: '0.4rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-subtle)',
                  color: 'var(--text-primary)'
                }}>
                  <SectionIcon size={18} />
                </div>
                <div>
                  <div style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    color: 'var(--text-muted)'
                  }}>
                    {sec.title}
                  </div>
                  <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {sec.label}
                  </div>
                </div>
              </div>

              {/* Cards Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1rem'
              }}>
                {sec.data.map((item) => {
                  const isSelected = selectedBackend.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleBackendSkill(item.id)}
                      className={`saas-card saas-card-interactive ${isSelected ? 'saas-card-selected' : ''}`}
                      style={{
                        padding: '1.25rem',
                        borderWidth: isSelected ? '2px' : '1px',
                        display: 'flex',
                        flexDirection: 'column',
                        justify: 'space-between'
                      }}
                    >
                      <div>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justify: 'space-between',
                          marginBottom: '0.5rem'
                        }}>
                          <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>
                            {item.name}
                          </span>

                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '4px',
                            border: isSelected ? 'none' : '1.5px solid var(--border-strong)',
                            background: isSelected ? 'var(--text-primary)' : 'transparent',
                            color: '#FFF',
                            display: 'flex',
                            alignItems: 'center',
                            justify: 'center'
                          }}>
                            {isSelected && <Check size={14} strokeWidth={3} />}
                          </div>
                        </div>

                        <p style={{ fontSize: '0.785rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        background: 'var(--bg-card)',
        padding: '1.25rem 1.75rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-light)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Backend stack: <strong style={{ color: 'var(--text-primary)' }}>{selectedBackend.length} items</strong> configured.
        </div>

        <button
          onClick={onGenerateTree}
          className="btn-primary"
          style={{
            padding: '0.85rem 2rem',
            background: 'var(--text-primary)',
            gap: '0.6rem'
          }}
        >
          <Sparkles size={18} />
          <span>Generate My Skill Tree</span>
        </button>
      </div>
    </div>
  );
}
