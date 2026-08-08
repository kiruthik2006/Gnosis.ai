import React, { useState } from 'react';
import {
  Terminal, LayoutDashboard, GitFork, Compass,
  BookOpen, MessageSquareCode, Search, Bell, Settings,
  ChevronLeft, ChevronRight, User, Sparkles
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
  const [isExpanded, setIsExpanded] = useState(false);
  const activeNavId = NAV_ITEMS.find(n => n.step === currentStep)?.id ?? activeTab;

  const navigate = (id, step) => {
    setActiveTab(id);
    setStep(step);
  };

  const gapSize = 16; // Gap size in pixels
  const overlapSize = 48; // Extend 48px to completely slide behind the rounded main body

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      background: 'radial-gradient(circle at 50% 30%, #0A5E44 0%, #04241C 70%, #010F0B 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-sans)',
      boxSizing: 'border-box',
      overflow: 'hidden',
      position: 'relative',
      padding: '20px'
    }}>
      
      {/* Background star particles */}
      <div style={{ position: 'absolute', top: '15%', left: '25%', width: '2px', height: '2px', background: '#FFF', opacity: 0.5, boxShadow: '0 0 8px #FFF' }} />
      <div style={{ position: 'absolute', top: '8%', left: '45%', width: '3px', height: '3px', background: '#FFF', opacity: 0.7, boxShadow: '0 0 10px #FFF' }} />
      <div style={{ position: 'absolute', top: '25%', right: '30%', width: '2px', height: '2px', background: '#FFF', opacity: 0.4, boxShadow: '0 0 6px #FFF' }} />

      {/* Main outer wrapper */}
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        display: 'flex',
        gap: `${gapSize}px`,
        alignItems: 'stretch',
        height: '700px',
        overflow: 'hidden'
      }}>

        {/* ── 1. DYNAMIC EXPANDABLE SIDEBAR (Glassmorphic Green) ── */}
        {isLoggedIn && (
          <aside 
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
            style={{
              width: isExpanded ? '200px' : '72px',
              background: 'linear-gradient(180deg, rgba(16, 185, 129, 0.15) 0%, rgba(4, 36, 28, 0.35) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              borderRadius: '32px',
              padding: '24px 0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              transition: 'width 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              flexShrink: 0,
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
              position: 'relative',
              zIndex: 1, // Set lower than the main container so active tab slides behind it
              overflow: 'visible'
            }}
          >
            {/* Top Logo */}
            <div style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.2)',
                border: '1.5px solid rgba(16, 185, 129, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#A7F3D0',
                cursor: 'pointer',
                boxShadow: '0 0 15px rgba(16, 185, 129, 0.3)'
              }}>
                <Terminal size={18} strokeWidth={2.5} />
              </div>
              
              <div style={{
                position: 'absolute',
                top: '12px',
                right: '-9px',
                background: 'rgba(16, 185, 129, 0.4)',
                border: '1px solid rgba(16, 185, 129, 0.6)',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFF',
                zIndex: 12
              }}>
                {isExpanded ? <ChevronLeft size={10} /> : <ChevronRight size={10} />}
              </div>
            </div>

            {/* Menu Navigation List */}
            <nav style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              width: '100%',
              paddingLeft: isExpanded ? '12px' : '0px',
              transition: 'padding 0.25s',
              overflow: 'visible'
            }}>
              {NAV_ITEMS.map(item => {
                const Icon = item.icon;
                const isActive = activeNavId === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => navigate(item.id, item.step)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      position: 'relative',
                      background: isActive ? '#FFFFFF' : 'transparent',
                      borderRadius: isActive ? '20px 0 0 20px' : '16px',
                      color: isActive ? '#04241C' : '#A7F3D0',
                      justifyContent: isExpanded ? 'flex-start' : 'center',
                      // Protrude right to bridge the gap and slide underneath the main container
                      width: isActive ? `calc(100% + ${overlapSize}px)` : '100%',
                      marginRight: isActive ? `-${overlapSize}px` : '0px',
                      boxShadow: isActive ? '-5px 5px 15px rgba(0,0,0,0.1)' : 'none'
                    }}
                  >
                    <Icon size={18} strokeWidth={isActive ? 2.5 : 1.8} />
                    {isExpanded && (
                      <span style={{ 
                        fontSize: '0.8rem', 
                        fontWeight: 700,
                        whiteSpace: 'nowrap'
                      }}>
                        {item.label}
                      </span>
                    )}

                    {/* Seamless white connection/cutout */}
                    {isActive && (
                      <>
                        {/* Top curve block positioned at the sidebar boundary */}
                        <div style={{
                          position: 'absolute',
                          right: `${overlapSize}px`,
                          top: '-16px',
                          width: '16px',
                          height: '16px',
                          background: 'transparent',
                          borderBottomRightRadius: '16px',
                          boxShadow: '8px 8px 0 8px #FFFFFF',
                          pointerEvents: 'none',
                          zIndex: 25
                        }} />
                        {/* Bottom curve block positioned at the sidebar boundary */}
                        <div style={{
                          position: 'absolute',
                          right: `${overlapSize}px`,
                          bottom: '-16px',
                          width: '16px',
                          height: '16px',
                          background: 'transparent',
                          borderTopRightRadius: '16px',
                          boxShadow: '8px -8px 0 8px #FFFFFF',
                          pointerEvents: 'none',
                          zIndex: 25
                        }} />
                      </>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Bottom Avatar */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid rgba(16, 185, 129, 0.4)',
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

        {/* ── 2. SEPARATE MAIN WORKSPACE (White Container) ── */}
        <div style={{
          flex: 1,
          background: '#FFFFFF', // Solid white background hides overlapping active tab perfectly
          borderRadius: '32px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          minWidth: 0,
          border: '1px solid rgba(16, 185, 129, 0.2)',
          position: 'relative',
          zIndex: 10 // Set higher than the sidebar so the active tab white connector slides underneath
        }}>

          {/* Floating Dev quick jumper bar */}
          {currentStep !== 15 && (
            <div style={{
              background: '#F3F4F6',
              borderBottom: '1px solid #E5E7EB',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 24px',
              fontSize: '0.7rem',
              flexShrink: 0
            }}>
              <div style={{ fontWeight: 600, color: '#374151' }}>
                PROTOTYPE STEP {currentStep}: {DEV_STEPS.find(s => s.num === currentStep)?.label}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <select
                  value={currentStep}
                  onChange={e => setStep(Number(e.target.value))}
                  style={{ fontSize: '0.65rem', padding: '1px', borderRadius: '4px', border: '1px solid #D1D5DB' }}
                >
                  {DEV_STEPS.map(s => <option key={s.num} value={s.num}>Step {s.num}: {s.label}</option>)}
                </select>
                <button onClick={() => setStep(Math.max(1, currentStep - 1))} style={{ padding: '1px 4px', background: '#FFF', border: '1px solid #D1D5DB', borderRadius: '4px' }}>Prev</button>
                <button onClick={() => setStep(Math.min(15, currentStep + 1))} style={{ padding: '1px 4px', background: '#FFF', border: '1px solid #D1D5DB', borderRadius: '4px' }}>Next</button>
              </div>
            </div>
          )}

          {/* Inner Content scroll body */}
          <div style={{
            flex: 1,
            overflow: 'hidden'
          }}>
            {children}
          </div>

        </div>

      </div>
    </div>
  );
}
