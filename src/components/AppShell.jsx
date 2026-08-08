import React, { useState } from 'react';
import {
  Terminal, LayoutDashboard, GitFork, Compass,
  BookOpen, MessageSquareCode, Search, Bell, Settings,
  ToggleLeft, ToggleRight, User, HelpCircle, ArrowRight
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard',    icon: LayoutDashboard,   step: 15 },
  { id: 'tree',      label: 'Skill Tree',   icon: GitFork,           step: 5  },
  { id: 'roadmap',   label: 'Roadmap',      icon: Compass,           step: 8  },
  { id: 'courses',   label: 'Courses',      icon: BookOpen,          step: 9  },
  { id: 'interview', label: 'AI Interview', icon: MessageSquareCode, step: 11 },
];

const DEV_STEPS = [
  { num: 1,  label: 'Login'          }, { num: 2,  label: 'Track Selection'  },
  { num: 3,  label: 'Frontend Skills'}, { num: 4,  label: 'Backend Skills'   },
  { num: 5,  label: 'Skill Tree'     }, { num: 6,  label: 'MCQ Assessment'   },
  { num: 7,  label: 'Updated Tree'   }, { num: 8,  label: 'Roadmap'          },
  { num: 9,  label: 'Courses'        }, { num: 10, label: 'Progress'         },
  { num: 11, label: 'AI Interview'   }, { num: 12, label: 'Evaluation'       },
  { num: 13, label: 'Final Tree'     }, { num: 14, label: 'Future Path'      },
  { num: 15, label: 'Dashboard'      },
];

export default function AppShell({
  children,
  currentStep,
  setStep,
  activeTab,
  setActiveTab,
  isLoggedIn
}) {
  const [darkMode, setDarkMode] = useState(false);
  const activeNavId = NAV_ITEMS.find(n => n.step === currentStep)?.id ?? activeTab;

  const navigate = (id, step) => {
    setActiveTab(id);
    setStep(step);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#E2E6E9',
      padding: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-sans)',
      boxSizing: 'border-box'
    }}>
      {/* Outer Application Frame matching the screenshot device look */}
      <div style={{
        width: '100%',
        maxWidth: '1280px',
        background: '#FFFFFF',
        borderRadius: '36px',
        border: '1px solid #D1D5DB',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        overflow: 'hidden',
        height: '840px',
        position: 'relative'
      }}>
        
        {/* DEV CONTROLS ROW - Floating at the top of the frame for developer ease */}
        {currentStep !== 15 && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            background: '#F3F4F6',
            borderBottom: '1px solid #E5E7EB',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            fontSize: '0.75rem',
            zIndex: 9999
          }}>
            <div style={{ fontWeight: 600, color: '#374151' }}>
              PROTOTYPE STEP {currentStep} OF 15: {DEV_STEPS.find(s => s.num === currentStep)?.label}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <select
                value={currentStep}
                onChange={e => setStep(Number(e.target.value))}
                style={{ fontSize: '0.7rem', padding: '2px 6px', borderRadius: '4px', border: '1px solid #D1D5DB' }}
              >
                {DEV_STEPS.map(s => <option key={s.num} value={s.num}>Step {s.num}: {s.label}</option>)}
              </select>
              <button onClick={() => setStep(Math.max(1, currentStep - 1))} style={{ padding: '2px 8px', background: '#FFF', border: '1px solid #D1D5DB', borderRadius: '4px' }}>Prev</button>
              <button onClick={() => setStep(Math.min(15, currentStep + 1))} style={{ padding: '2px 8px', background: '#FFF', border: '1px solid #D1D5DB', borderRadius: '4px' }}>Next</button>
            </div>
          </div>
        )}

        {/* 1. LEFT SIDEBAR (Icon Only, Sleek like the screenshot) */}
        {isLoggedIn && (
          <aside style={{
            width: '76px',
            borderRight: '1px solid #F0F0F0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '24px 0',
            flexShrink: 0,
            background: '#FFFFFF'
          }}>
            {/* Top Brand Logo */}
            <div 
              onClick={() => navigate('dashboard', 15)}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: '#1C1B1A',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <Terminal size={20} strokeWidth={2.5} />
            </div>

            {/* Middle Nav Icons */}
            <nav style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              {NAV_ITEMS.map(item => {
                const Icon = item.icon;
                const isActive = activeNavId === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => navigate(item.id, item.step)}
                    title={item.label}
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: isActive ? '#F3F4F6' : 'transparent',
                      color: isActive ? '#1C1B1A' : '#9CA3AF',
                      border: 'none',
                      transition: 'all 0.2s ease',
                      position: 'relative'
                    }}
                  >
                    {isActive && (
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        width: '4px',
                        height: '16px',
                        background: '#1C1B1A',
                        borderRadius: '0 4px 4px 0'
                      }} />
                    )}
                    <Icon size={20} strokeWidth={isActive ? 2.2 : 1.8} />
                  </button>
                );
              })}
            </nav>

            {/* Bottom Controls */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px'
            }}>
              {/* Dark/Light mode cosmetic switcher */}
              <button 
                onClick={() => setDarkMode(!darkMode)}
                style={{ color: '#9CA3AF', cursor: 'pointer' }}
              >
                {darkMode ? <ToggleRight size={24} color="#1C1B1A" /> : <ToggleLeft size={24} />}
              </button>

              {/* User profile picture / placeholder */}
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid #E5E7EB',
                cursor: 'pointer'
              }}>
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" 
                  alt="Avatar" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          </aside>
        )}

        {/* RIGHT WORKSPACE (Header + Main Content + Right Info Panel) */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          paddingTop: currentStep !== 15 ? '36px' : '0px' // adjust for floating dev bar
        }}>
          
          {/* 2. TOP HEADER */}
          <header style={{
            height: '64px',
            borderBottom: '1px solid #F0F0F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            flexShrink: 0
          }}>
            {/* Search Input Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: '#F3F4F6',
              borderRadius: '99px',
              padding: '6px 14px',
              width: '240px'
            }}>
              <Search size={16} color="#9CA3AF" />
              <input 
                type="text" 
                placeholder="Search..." 
                style={{
                  border: 'none',
                  background: 'transparent',
                  outline: 'none',
                  fontSize: '0.8125rem',
                  width: '100%',
                  color: '#1C1B1A'
                }}
              />
            </div>

            {/* Header Right Actions */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              <span style={{
                background: '#E0F2FE',
                color: '#0369A1',
                fontSize: '0.75rem',
                fontWeight: 600,
                padding: '4px 12px',
                borderRadius: '99px',
                cursor: 'pointer'
              }}>
                Online support
              </span>
              <button style={{ color: '#4B5563', position: 'relative' }}>
                <Bell size={18} />
                <span style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  width: '6px',
                  height: '6px',
                  background: '#EF4444',
                  borderRadius: '50%'
                }} />
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#1C1B1A' }}>Alex Morgan</span>
                <span style={{ fontSize: '0.7rem', color: '#9CA3AF' }}>• AI Engineer Track</span>
              </div>
            </div>
          </header>

          {/* MAIN BODY AREA (Central Workspace + Right Panel) */}
          <div style={{
            flex: 1,
            display: 'flex',
            overflow: 'hidden'
          }}>
            
            {/* 3. CENTRAL MAIN WORKSPACE (Scrollable) */}
            <main style={{
              flex: 1,
              overflowY: 'auto',
              background: '#FFFFFF',
              padding: '24px'
            }}>
              {children}
            </main>

            {/* 4. RIGHT PANEL (Contextual sidebar exactly matching the styling of the screenshot) */}
            {isLoggedIn && (
              <aside style={{
                width: '280px',
                borderLeft: '1px solid #F0F0F0',
                background: '#FAFAF9',
                padding: '24px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                overflowY: 'auto',
                flexShrink: 0
              }}>
                {/* Dash bordered user profile placeholder box ("Add User" style from reference image) */}
                <div style={{
                  border: '1.5px dashed #D1D5DB',
                  borderRadius: '24px',
                  padding: '20px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px',
                  background: '#FFFFFF'
                }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: '#F3F4F6',
                    border: '1px solid #E5E7EB',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#9CA3AF',
                    position: 'relative'
                  }}>
                    <User size={28} />
                    <span style={{
                      position: 'absolute',
                      bottom: '0',
                      right: '0',
                      background: '#1C1B1A',
                      color: '#FFF',
                      borderRadius: '50%',
                      width: '20px',
                      height: '20px',
                      fontSize: '0.7rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold'
                    }}>+</span>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1C1B1A' }}>Alex Morgan</h4>
                    <span style={{ fontSize: '0.725rem', color: '#6B7280' }}>Target: AI App Engineer</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    gap: '4px'
                  }}>
                    {['React', 'FastAPI', 'Vite'].map((t, idx) => (
                      <span key={idx} style={{
                        fontSize: '0.625rem',
                        background: '#F3F4F6',
                        padding: '2px 8px',
                        borderRadius: '99px',
                        color: '#4B5563',
                        fontWeight: 500
                      }}>{t}</span>
                    ))}
                  </div>
                </div>

                {/* Technology / Skills switches row matching screenshot */}
                <div>
                  <h3 style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: '#6B7280',
                    marginBottom: '12px'
                  }}>Focus Technologies</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[
                      { name: 'React & Vite', active: true },
                      { name: 'FastAPI', active: true },
                      { name: 'Vector DBs', active: true },
                      { name: 'Observability', active: false },
                    ].map((tech, idx) => (
                      <div key={idx} style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: '#FFFFFF',
                        border: '1px solid #E5E7EB',
                        borderRadius: '12px',
                        padding: '10px 14px'
                      }}>
                        <span style={{ fontSize: '0.7875rem', fontWeight: 600, color: '#1C1B1A' }}>{tech.name}</span>
                        <div style={{ cursor: 'pointer' }}>
                          {tech.active ? (
                            <span style={{ fontSize: '0.7rem', color: '#10B981', fontWeight: 600 }}>Active</span>
                          ) : (
                            <span style={{ fontSize: '0.7rem', color: '#9CA3AF', fontWeight: 500 }}>Pending</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Black Call-to-action Promo Card matching screenshot's "Expand your possibilities" */}
                <div style={{
                  background: '#1C1B1A',
                  color: '#FFFFFF',
                  borderRadius: '24px',
                  padding: '20px',
                  marginTop: 'auto',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)'
                }}>
                  {/* Badge */}
                  <div style={{
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    marginBottom: '8px',
                    letterSpacing: '-0.02em'
                  }}>
                    72% Ready
                  </div>
                  <h4 style={{
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    lineHeight: '1.25',
                    marginBottom: '6px'
                  }}>
                    Expand your possibilities
                  </h4>
                  <p style={{
                    fontSize: '0.7rem',
                    color: '#9CA3AF',
                    lineHeight: '1.4',
                    marginBottom: '16px'
                  }}>
                    Unlock the final certified adaptive AI tech interview badge to share with employers.
                  </p>
                  
                  <button 
                    onClick={() => setStep(11)}
                    style={{
                      width: '100%',
                      background: '#FFFFFF',
                      color: '#1C1B1A',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      padding: '8px 12px',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    <span>Start Mock Interview</span>
                    <ArrowRight size={12} />
                  </button>
                </div>

              </aside>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
