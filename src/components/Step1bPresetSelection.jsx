import React, { useState, useEffect } from 'react';
import { 
  FileJson, ArrowRight, Sparkles, Wrench, X, User, 
  CheckCircle2, Briefcase, Award, GraduationCap, Search, ShieldCheck 
} from 'lucide-react';

export default function Step1bPresetSelection({ onSelectPreset, onCreateCustomStack }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [candidatesList, setCandidatesList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch('/candidates.json')
      .then(res => res.json())
      .then(data => {
        if (data && data.candidates) {
          setCandidatesList(data.candidates);
        }
      })
      .catch(err => {
        console.warn('Could not fetch candidates.json, using fallback:', err);
      });
  }, []);

  const filteredCandidates = candidatesList.filter(c => {
    const name = c.member?.name || '';
    const role = c.member?.jobRole || '';
    const query = searchQuery.toLowerCase();
    return name.toLowerCase().includes(query) || role.toLowerCase().includes(query);
  });

  return (
    <div style={{
      maxWidth: '860px',
      margin: '0 auto',
      padding: '3.5rem 1.5rem',
      minHeight: 'calc(100vh - 120px)',
      display: 'flex',
      flexDirection: 'column',
      justify: 'center',
      alignItems: 'center',
      position: 'relative'
    }} className="animate-fade-in">

      {/* Header following Step 2 Track Selection theme */}
      <div style={{ textAlign: 'center', marginBottom: '2.75rem', maxWidth: '640px' }}>
        <span className="badge badge-strong" style={{ marginBottom: '0.75rem', gap: '0.4rem' }}>
          <Sparkles size={13} fill="#10B981" /> STEP 01 — SETUP METHOD
        </span>
        <h1 style={{
          fontSize: '2.1rem',
          fontWeight: 800,
          color: 'var(--text-primary)',
          letterSpacing: '-0.025em',
          marginTop: '0.5rem',
          marginBottom: '0.65rem'
        }}>
          How would you like to set up your evaluation?
        </h1>
        <p style={{ fontSize: '0.975rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          Select a pre-configured candidate evaluation profile from JSON or build your own custom technical stack from scratch.
        </p>
      </div>

      {/* Choice Container */}
      <div style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.75rem'
      }}>
        
        {/* BIGGER & PROMINENT BUTTON: Select Preset from json */}
        <div 
          onClick={() => setIsModalOpen(true)}
          className="saas-card saas-card-interactive"
          style={{
            width: '100%',
            maxWidth: '560px',
            padding: '2rem 2.25rem',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, #18181B 0%, #04241C 100%)',
            border: '2px solid rgba(16, 185, 129, 0.45)',
            boxShadow: '0 16px 40px rgba(4, 36, 28, 0.35)',
            color: '#FFFFFF',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justify: 'space-between',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            position: 'relative'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.borderColor = '#10B981';
            e.currentTarget.style.boxShadow = '0 20px 50px rgba(16, 185, 129, 0.3)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.45)';
            e.currentTarget.style.boxShadow = '0 16px 40px rgba(4, 36, 28, 0.35)';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'rgba(16, 185, 129, 0.18)',
              color: '#10B981',
              border: '1px solid rgba(16, 185, 129, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              flexShrink: 0
            }}>
              <FileJson size={28} />
            </div>
            <div>
              <span style={{ fontSize: '0.725rem', color: '#10B981', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                RECOMMENDED
              </span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 850, color: '#FFFFFF', margin: '0.15rem 0 0.25rem 0' }}>
                Select Preset from json
              </h3>
              <p style={{ fontSize: '0.8125rem', color: '#9CA3AF', margin: 0, lineHeight: 1.35 }}>
                Load pre-built 31-Day candidate claim trees & AI evaluation benchmarks.
              </p>
            </div>
          </div>

          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: '#10B981',
            color: '#04241C',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            flexShrink: 0,
            boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)'
          }}>
            <ArrowRight size={20} strokeWidth={2.5} />
          </div>
        </div>

        {/* SMALLER & LESS NOTICEABLE BUTTON: Create your own stack */}
        <button
          onClick={onCreateCustomStack}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-secondary)',
            fontSize: '0.875rem',
            fontWeight: 600,
            padding: '0.6rem 1.25rem',
            borderRadius: 'var(--radius-full)',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            opacity: 0.8,
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.color = 'var(--text-primary)';
            e.currentTarget.style.background = 'var(--bg-subtle)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.opacity = '0.8';
            e.currentTarget.style.color = 'var(--text-secondary)';
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <Wrench size={14} color="var(--text-muted)" />
          <span>Create your own stack</span>
        </button>

      </div>

      {/* ── CANDIDATE PROFILES POPUP MODAL ── */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justify: 'center',
          padding: '1.5rem'
        }} className="animate-fade-in">
          
          <div style={{
            background: '#121214',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '28px',
            width: '100%',
            maxWidth: '820px',
            maxHeight: '85vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.6)',
            color: '#FFFFFF'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '1.5rem 1.75rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justify: 'space-between',
              background: '#18181B'
            }}>
              <div>
                <span style={{ fontSize: '0.7rem', color: '#10B981', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  CANDIDATES.JSON PRESET POOL
                </span>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 850, color: '#FFFFFF', margin: '0.2rem 0 0 0' }}>
                  Select Student Profile
                </h2>
              </div>

              <button 
                onClick={() => setIsModalOpen(false)}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: 'none',
                  color: '#9CA3AF',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Search Bar */}
            <div style={{ padding: '1rem 1.75rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', background: '#141416' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: '#1C1C1F',
                borderRadius: '99px',
                padding: '8px 16px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <Search size={16} color="#9CA3AF" />
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search candidate by name or role (e.g. Alex Turner, Sarah Johnson)..."
                  style={{
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: '#FFF',
                    fontSize: '0.85rem',
                    width: '100%'
                  }}
                />
              </div>
            </div>

            {/* Modal Candidate List */}
            <div style={{
              padding: '1.25rem 1.75rem',
              overflowY: 'auto',
              flex: 1,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '1rem'
            }}>
              {filteredCandidates.map((cand) => {
                const member = cand.member || {};
                const missions = cand.missions || [];
                const signals = cand.signals || {};

                return (
                  <div
                    key={member.id}
                    onClick={() => {
                      setIsModalOpen(false);
                      onSelectPreset(cand);
                    }}
                    style={{
                      background: 'linear-gradient(160deg, #1C1C1F 0%, #161618 100%)',
                      borderRadius: '18px',
                      border: '1px solid rgba(255, 255, 255, 0.09)',
                      padding: '1.2rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justify: 'space-between',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      gap: '0.85rem'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = '#10B981';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.09)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                          color: '#04241C',
                          display: 'flex',
                          alignItems: 'center',
                          justify: 'center',
                          fontWeight: 900,
                          fontSize: '0.9rem'
                        }}>
                          {member.name ? member.name.charAt(0) : 'U'}
                        </div>
                        <div>
                          <h4 style={{ fontSize: '1rem', fontWeight: 850, color: '#FFFFFF', margin: 0 }}>
                            {member.name}
                          </h4>
                          <span style={{ fontSize: '0.785rem', color: '#9CA3AF', fontWeight: 500 }}>
                            {member.jobRole} • {member.yearsExperience} Yrs
                          </span>
                        </div>
                      </div>

                      <span style={{
                        background: 'rgba(16, 185, 129, 0.15)',
                        color: '#10B981',
                        border: '1px solid rgba(16, 185, 129, 0.3)',
                        padding: '3px 9px',
                        borderRadius: '99px',
                        fontSize: '0.6875rem',
                        fontWeight: 800
                      }}>
                        {member.id}
                      </span>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      fontSize: '0.75rem',
                      color: '#9CA3AF',
                      borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                      paddingTop: '0.65rem'
                    }}>
                      <span>Missions: <strong style={{ color: '#FFF' }}>{signals.missionsCompleted || missions.length}</strong></span>
                      <span>1st Try: <strong style={{ color: '#10B981' }}>{signals.missionsFirstTry || 0}</strong></span>
                      <span>Commits: <strong style={{ color: '#FFF' }}>{signals.commitDays || 0}d</strong></span>
                    </div>

                    <button
                      style={{
                        width: '100%',
                        padding: '0.55rem',
                        borderRadius: '12px',
                        background: '#FFFFFF',
                        color: '#121214',
                        border: 'none',
                        fontSize: '0.8125rem',
                        fontWeight: 850,
                        display: 'flex',
                        alignItems: 'center',
                        justify: 'center',
                        gap: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      <span>Start AI Interview</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
