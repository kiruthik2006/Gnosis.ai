import React, { useState } from 'react';
import {
  LayoutDashboard, GitFork, Compass,
  BookOpen, MessageSquareCode,
  ChevronLeft, ChevronRight, LogOut
} from 'lucide-react';
import Logo from './Logo';

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

// How far active/hovered tabs protrude rightward past the sidebar edge to slide under the main panel
const TAB_PROTRUDE = 30;

export default function AppShell({
  children,
  currentStep,
  setStep,
  activeTab,
  setActiveTab,
  isLoggedIn
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredNavId, setHoveredNavId] = useState(null);
  const activeNavId = NAV_ITEMS.find(n => n.step === currentStep)?.id ?? activeTab;

  const navigate = (id, step) => {
    setActiveTab(id);
    setStep(step);
  };

  return (
    /*  ─── OUTER PAGE: deep dark-green radial gradient ─── */
    <div style={{
      height: '100vh',
      width: '100vw',
      background: 'radial-gradient(ellipse 120% 80% at 50% 20%, #0d6b4a 0%, #042e20 55%, #01100a 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      position: 'relative',
      padding: '16px',
      boxSizing: 'border-box',
      fontFamily: 'var(--font-sans)',
    }}>

      {/* Subtle star dots */}
      {[
        { top: '14%', left: '24%', s: 2, o: 0.5 },
        { top:  '7%', left: '44%', s: 3, o: 0.7 },
        { top: '24%', right: '29%', s: 2, o: 0.4 },
        { top: '60%', left: '10%', s: 2, o: 0.35 },
        { top: '80%', right: '15%', s: 2, o: 0.45 },
      ].map((p, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: p.top, left: p.left, right: p.right,
          width: p.s, height: p.s,
          borderRadius: '50%',
          background: '#fff',
          opacity: p.o,
          boxShadow: `0 0 ${p.s * 3}px #fff`,
          pointerEvents: 'none',
        }} />
      ))}

      {/*  ─── MAIN ROW: sidebar + 16px gap + white panel ─── */}
      <div style={{
        width: '100%',
        maxWidth: 1480,
        height: '100%',
        maxHeight: 880,
        display: 'flex',
        gap: 16,
        overflow: 'visible',     // allow sidebar to paint over gap
      }}>

        {/* ═══════════════════════════════════════════════
            SIDEBAR
            zIndex 5 — behind the white panel (zIndex 10)
        ═══════════════════════════════════════════════ */}
        {isLoggedIn && (
          <aside
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
            style={{
              position: 'relative',
              zIndex: 5,               // behind main panel (zIndex 10)
              flexShrink: 0,
              width: isExpanded ? 220 : 72,
              transition: 'width 0.25s cubic-bezier(0.4,0,0.2,1)',
              overflow: 'visible',
            }}
          >
            {/* Pill background — full height, rounded on ALL sides */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(16,185,129,0.16) 0%, rgba(4,36,28,0.42) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(16,185,129,0.28)',
              borderRadius: 32,
              boxShadow: '0 20px 50px rgba(0,0,0,0.35)',
              pointerEvents: 'none',
            }} />

            {/* Content column */}
            <div style={{
              position: 'relative',
              zIndex: 2,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '24px 0',
            }}>

              {/* ── LOGO AREA ── */}
              <div style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: isExpanded ? 'flex-start' : 'center',
                paddingLeft: isExpanded ? 16 : 0,
                paddingRight: isExpanded ? 20 : 0,
                transition: 'padding 0.25s, justify-content 0.25s'
              }}>
                <Logo
                  size={40}
                  variant="emerald"
                  showText={isExpanded}
                  onClick={() => navigate('dashboard', 15)}
                />
              </div>

              {/* Chevron toggle — placed on the right edge of sidebar */}
              <div 
                onClick={() => setIsExpanded(!isExpanded)}
                style={{
                  position: 'absolute',
                  top: 24,
                  right: -9,
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  background: '#04241c',
                  border: '1.5px solid rgba(16,185,129,0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#a7f3d0',
                  zIndex: 30,
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
                }}
              >
                {isExpanded ? <ChevronLeft size={10} /> : <ChevronRight size={10} />}
              </div>

              {/* ── NAV ITEMS ── */}
              <nav style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                width: '100%',
                overflow: 'visible',
              }}>
                {NAV_ITEMS.map(item => {
                  const Icon = item.icon;
                  const isActive = activeNavId === item.id;
                  const isHovered = hoveredNavId === item.id;
                  const isExtended = isActive || isHovered;

                  return (
                    <div
                      key={item.id}
                      style={{ position: 'relative', overflow: 'visible', width: '100%' }}
                    >
                      {/* Active or hovered tab button — extends rightward under main body panel */}
                      <button
                        onClick={() => navigate(item.id, item.step)}
                        onMouseEnter={() => setHoveredNavId(item.id)}
                        onMouseLeave={() => setHoveredNavId(null)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          border: 'none',
                          cursor: 'pointer',
                          position: 'relative',
                          background: isActive
                            ? 'rgba(255, 255, 255, 0.95)'
                            : isHovered
                              ? 'rgba(255, 255, 255, 0.15)'
                              : 'transparent',
                          backdropFilter: isActive ? 'blur(16px) saturate(180%)' : undefined,
                          WebkitBackdropFilter: isActive ? 'blur(16px) saturate(180%)' : undefined,
                          borderRadius: isExtended ? '20px 0 0 20px' : 16,
                          color: isActive
                            ? '#04241c'
                            : isHovered
                              ? '#ffffff'
                              : '#a7f3d0',
                          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                          width: isExtended ? `calc(100% + ${TAB_PROTRUDE}px)` : '100%',
                          marginRight: isExtended ? -TAB_PROTRUDE : 0,
                          height: 44,
                          padding: 0,
                          fontFamily: 'inherit',
                          zIndex: isActive ? 12 : 1,
                        }}
                      >
                        <div style={{
                          width: isExpanded ? '100%' : 72,
                          paddingLeft: isExpanded ? 16 : 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: isExpanded ? 'flex-start' : 'center',
                          flexShrink: 0,
                          gap: 12
                        }}>
                          <Icon size={18} strokeWidth={isActive ? 2.4 : 1.8} />
                          {isExpanded && (
                            <span style={{ fontSize: '0.8rem', fontWeight: 700, whiteSpace: 'nowrap' }}>
                              {item.label}
                            </span>
                          )}
                        </div>

                        {/* Small rectangular blur box placed over the junction seam */}
                        {isActive && (
                          <div style={{
                            position: 'absolute',
                            right: -12,
                            top: -4,
                            bottom: -4,
                            width: 28,
                            background: 'rgba(255, 255, 255, 0.94)',
                            backdropFilter: 'blur(24px) saturate(190%)',
                            WebkitBackdropFilter: 'blur(24px) saturate(190%)',
                            borderRadius: '6px',
                            boxShadow: '0 0 16px rgba(255, 255, 255, 0.95), 0 4px 12px rgba(0, 0, 0, 0.08)',
                            pointerEvents: 'none',
                            zIndex: 25,
                          }} />
                        )}
                      </button>
                    </div>
                  );
                })}
              </nav>

              {/* ── BOTTOM AVATAR & LOGOUT ── */}
              <div style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem'
              }}>
                <div style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: isExpanded ? 'flex-start' : 'center',
                  gap: '0.75rem',
                  paddingLeft: isExpanded ? 16 : 0,
                  transition: 'padding 0.25s, justify-content 0.25s'
                }}>
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '2px solid rgba(16,185,129,0.45)',
                    cursor: 'pointer',
                    flexShrink: 0,
                    boxShadow: '0 0 10px rgba(16,185,129,0.2)'
                  }}>
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                      alt="Avatar"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  {isExpanded && (
                    <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
                      <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#ffffff' }}>Alex Morgan</div>
                      <div style={{ fontSize: '0.6875rem', color: '#a7f3d0' }}>AI Engineer</div>
                    </div>
                  )}
                </div>

                {/* ── LOGOUT ACTION ── */}
                <button
                  onClick={() => navigate('login', 1)}
                  title="Logout to Landing Page"
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: isExpanded ? 'flex-start' : 'center',
                    paddingLeft: isExpanded ? 16 : 0,
                    gap: 12,
                    height: 38,
                    background: 'transparent',
                    border: 'none',
                    color: '#FCA5A5',
                    cursor: 'pointer',
                    borderRadius: 12,
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(239, 68, 68, 0.18)';
                    e.currentTarget.style.color = '#FF8A8A';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#FCA5A5';
                  }}
                >
                  <LogOut size={17} strokeWidth={2.2} />
                  {isExpanded && (
                    <span style={{ fontSize: '0.85rem', fontWeight: 750, whiteSpace: 'nowrap' }}>
                      Logout
                    </span>
                  )}
                </button>
              </div>

            </div>
          </aside>
        )}

        {/* ═══════════════════════════════════════════════
            MAIN GLASS PANEL
            zIndex 10 — lower than sidebar
        ═══════════════════════════════════════════════ */}
        <div style={{
          flex: 1,
          position: 'relative',
          zIndex: 10,
          background: currentStep === 1 
            ? 'linear-gradient(180deg, #F3F1EC 0%, #0E1C14 30%, #050D08 65%, #000000 100%)' 
            : 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(20px) saturate(190%)',
          WebkitBackdropFilter: 'blur(20px) saturate(190%)',
          borderRadius: 32,
          border: currentStep === 1 ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid rgba(255, 255, 255, 0.75)',
          borderBottom: currentStep === 1 ? 'none' : undefined,
          boxShadow: currentStep === 1 
            ? '0 24px 60px rgba(0, 0, 0, 0.6)' 
            : '0 24px 60px rgba(28, 27, 26, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.95)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          minWidth: 0,
        }}>

          {/* Subtle Ambient Light-Themed Animated Background Layer */}
          {currentStep !== 1 && (
            <div style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              zIndex: 0,
              overflow: 'hidden',
              background: 'linear-gradient(135deg, #FAF9F6 0%, #F0F6F2 40%, #EBF4EE 75%, #F7F5F0 100%)'
            }}>
              {/* Dot Grid Matrix Overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'radial-gradient(rgba(16, 185, 129, 0.22) 1.4px, transparent 1.4px)',
                backgroundSize: '26px 26px',
                opacity: 0.85
              }} />

              {/* Floating Animated Emerald Blob */}
              <div style={{
                position: 'absolute',
                top: '-15%',
                left: '10%',
                width: '500px',
                height: '500px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(16, 185, 129, 0.18) 0%, rgba(16, 185, 129, 0) 70%)',
                filter: 'blur(45px)',
                animation: 'floatSlow 18s infinite ease-in-out'
              }} />

              {/* Floating Animated Warm Amber Blob */}
              <div style={{
                position: 'absolute',
                bottom: '-10%',
                right: '8%',
                width: '550px',
                height: '550px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(245, 158, 11, 0.13) 0%, rgba(245, 158, 11, 0) 70%)',
                filter: 'blur(55px)',
                animation: 'floatSlowReverse 22s infinite ease-in-out'
              }} />

              {/* Floating Animated Soft Blue Glow */}
              <div style={{
                position: 'absolute',
                top: '35%',
                right: '28%',
                width: '420px',
                height: '420px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.09) 0%, rgba(59, 130, 246, 0) 70%)',
                filter: 'blur(50px)',
                animation: 'floatSlow 26s infinite ease-in-out'
              }} />
            </div>
          )}



          {/* Page content */}
          <div style={{ position: 'relative', zIndex: 1, flex: 1, overflowY: currentStep === 1 ? 'hidden' : 'auto', display: 'flex', flexDirection: 'column' }}>
            {children}
          </div>

        </div>
      </div>
    </div>
  );
}
