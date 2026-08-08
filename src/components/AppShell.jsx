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

  return (
    <div style={{
      minHeight: '100vh',
      // Deep glowing dark emerald radial gradient background with subtle stars
      background: 'radial-gradient(circle at 50% 30%, #0A5E44 0%, #04241C 70%, #010F0B 100%)',
      padding: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-sans)',
      boxSizing: 'border-box',
      overflow: 'hidden',
      position: 'relative'
    }}>
      
      {/* Visual background star particles matching the screenshot */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '25%',
        width: '2px',
        height: '2px',
        background: '#FFF',
        opacity: 0.5,
        boxShadow: '0 0 8px #FFF'
      }} />
      <div style={{
        position: 'absolute',
        top: '8%',
        left: '45%',
        width: '3px',
        height: '3px',
        background: '#FFF',
        opacity: 0.7,
        boxShadow: '0 0 10px #FFF'
      }} />
      <div style={{
        position: 'absolute',
        top: '25%',
        right: '30%',
        width: '2px',
        height: '2px',
        background: '#FFF',
        opacity: 0.4,
        boxShadow: '0 0 6px #FFF'
      }} />

      {/* Main outer wrapper holding sidebar and workspace separate */}
      <div style={{
        width: '100%',
        maxWidth: '1240px',
        display: 'flex',
        gap: '20px',
        alignItems: 'stretch',
        height: '780px'
      }}>

        {/* ── 1. DYNAMIC EXPANDABLE SIDEBAR (Glassmorphic Green) ── */}
        {isLoggedIn && (
          <aside 
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
            style={{
              width: isExpanded ? '200px' : '72px',
              background: 'linear-gradient(180deg, rgba(16, 185, 129, 0.15) 0%, rgba(4, 36, 28, 0.3) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              borderRadius: '32px',
              padding: '24px 0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              flexShrink: 0,
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
              position: 'relative'
            }}
          >
            {/* Top Logo / Leaf bubble */}
            <div style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative'
            }}>
              <div style={{
                width: '44px',
                height: '44px',
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
                <Terminal size={20} strokeWidth={2.5} />
              </div>
              
              {/* Expand/Collapse Chevron Indicator */}
              <div style={{
                position: 'absolute',
                top: '12px',
                right: isExpanded ? '-10px' : '-6px',
                background: 'rgba(16, 185, 129, 0.3)',
                border: '1px solid rgba(16, 185, 129, 0.5)',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFF',
                zIndex: 10
              }}>
                {isExpanded ? <ChevronLeft size={10} /> : <ChevronRight size={10} />}
              </div>
            </div>

            {/* Menu Navigation List */}
            <nav style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              width: '100%',
              paddingLeft: isExpanded ? '12px' : '0px',
              transition: 'padding 0.3s'
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
                      width: '100%',
                      transition: 'all 0.2s ease',
                      position: 'relative',
                      background: isActive ? '#FFFFFF' : 'transparent',
                      // Rounded tab cutout shape look
                      borderRadius: isActive ? '20px 0 0 20px' : '16px',
                      color: isActive ? '#04241C' : '#A7F3D0',
                      justifyContent: isExpanded ? 'flex-start' : 'center',
                      boxShadow: isActive ? '-5px 5px 15px rgba(0,0,0,0.1)' : 'none'
                    }}
                  >
                    <Icon size={18} strokeWidth={isActive ? 2.5 : 1.8} />
                    {isExpanded && (
                      <span style={{ 
                        fontSize: '0.85rem', 
                        fontWeight: 700,
                        whiteSpace: 'nowrap',
                        animation: 'fadeIn 0.2s forwards'
                      }}>
                        {item.label}
                      </span>
                    )}

                    {/* Smooth custom tab blending flow into the right container */}
                    {isActive && !isExpanded && (
                      <span style={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        bottom: 0,
                        width: '4px',
                        background: '#FFFFFF',
                        borderRadius: '4px 0 0 4px'
                      }} />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Bottom Avatar / Settings */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px'
            }}>
              <div style={{
                width: '36px',
                height: '36px',
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
          background: '#FFFFFF', // Clean solid white workspace container
          borderRadius: '32px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          minWidth: 0,
          border: '1px solid rgba(255,255,255,0.8)'
        }}>

          {/* Floating Dev quick jumper bar */}
          {currentStep !== 15 && (
            <div style={{
              background: '#F3F4F6',
              borderBottom: '1px solid #E5E7EB',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 24px',
              fontSize: '0.725rem',
              flexShrink: 0
            }}>
              <div style={{ fontWeight: 600, color: '#374151' }}>
                PROTOTYPE STEP {currentStep} OF 15: {DEV_STEPS.find(s => s.num === currentStep)?.label}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <select
                  value={currentStep}
                  onChange={e => setStep(Number(e.target.value))}
                  style={{ fontSize: '0.7rem', padding: '1px 4px', borderRadius: '4px', border: '1px solid #D1D5DB' }}
                >
                  {DEV_STEPS.map(s => <option key={s.num} value={s.num}>Step {s.num}: {s.label}</option>)}
                </select>
                <button onClick={() => setStep(Math.max(1, currentStep - 1))} style={{ padding: '1px 6px', background: '#FFF', border: '1px solid #D1D5DB', borderRadius: '4px' }}>Prev</button>
                <button onClick={() => setStep(Math.min(15, currentStep + 1))} style={{ padding: '1px 6px', background: '#FFF', border: '1px solid #D1D5DB', borderRadius: '4px' }}>Next</button>
              </div>
            </div>
          )}

          {/* Inner Content scroll body */}
          <div style={{
            flex: 1,
            overflowY: 'auto'
          }}>
            {children}
          </div>

        </div>

      </div>
    </div>
  );
}
