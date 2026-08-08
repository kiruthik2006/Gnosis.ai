import React, { useState } from 'react';
import {
  Terminal, LayoutDashboard, GitFork, Compass,
  BookOpen, MessageSquareCode,
  ChevronLeft, ChevronRight
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

// How far the active tab protrudes rightward past the sidebar edge
// to slide on top of the main container
const TAB_PROTRUDE = 30;
// Radius of the decorative curves at top/bottom of active tab
const CURVE_R = 16;

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
      padding: '20px',
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
        maxWidth: 1220,
        height: '100%',
        maxHeight: 720,
        display: 'flex',
        gap: 16,
        overflow: 'visible',     // allow sidebar to paint over gap
      }}>

        {/* ═══════════════════════════════════════════════
            SIDEBAR
            zIndex 20 — paints on top of the white panel
        ═══════════════════════════════════════════════ */}
        {isLoggedIn && (
          <aside
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
            style={{
              position: 'relative',
              zIndex: 20,              // above main panel (zIndex 10)
              flexShrink: 0,
              width: isExpanded ? 200 : 72,
              transition: 'width 0.25s cubic-bezier(0.4,0,0.2,1)',
              // The pill itself is painted via an inner wrapper so that
              // overflow:visible works on this element for the tab protrusion
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
              <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
                {/* Terminal icon circle */}
                <div
                  onClick={() => navigate('dashboard', 15)}
                  style={{
                    width: 44, height: 44,
                    borderRadius: '50%',
                    background: 'rgba(16,185,129,0.22)',
                    border: '1.5px solid rgba(255,255,255,0.35)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#ffffff',
                    cursor: 'pointer',
                    boxShadow: '0 0 14px rgba(16,185,129,0.4)',
                    flexShrink: 0,
                  }}>
                  <Terminal size={20} strokeWidth={2.4} />
                </div>

                {/* Chevron toggle — dark pill so it's always visible */}
                <div style={{
                  position: 'absolute',
                  top: 12, right: -10,
                  width: 18, height: 18,
                  borderRadius: '50%',
                  background: '#04241c',
                  border: '1.5px solid rgba(16,185,129,0.6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#a7f3d0',
                  zIndex: 30,
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
                }}>
                  {isExpanded ? <ChevronLeft size={10} /> : <ChevronRight size={10} />}
                </div>
              </div>

              {/* ── NAV ITEMS ── */}
              <nav style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                width: '100%',
                paddingLeft: isExpanded ? 12 : 0,
                transition: 'padding 0.25s',
                overflow: 'visible',
              }}>
                {NAV_ITEMS.map(item => {
                  const Icon = item.icon;
                  const isActive = activeNavId === item.id;

                  return (
                    <div
                      key={item.id}
                      style={{ position: 'relative', overflow: 'visible', width: '100%' }}
                    >
                      {/* Active tab button — protrudes rightward to cover gap + main border */}
                      <button
                        onClick={() => navigate(item.id, item.step)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 12,
                          padding: 12,
                          border: 'none',
                          cursor: 'pointer',
                          position: 'relative',
                          background: isActive ? '#ffffff' : 'transparent',
                          // Rounded on left, flat on right when active (seamless with main panel)
                          borderRadius: isActive ? '20px 0 0 20px' : 16,
                          color: isActive ? '#04241c' : '#a7f3d0',
                          justifyContent: isExpanded ? 'flex-start' : 'center',
                          transition: 'all 0.2s ease',
                          // Protrude past the sidebar right edge
                          width: isActive ? `calc(100% + ${TAB_PROTRUDE}px)` : '100%',
                          marginRight: isActive ? -TAB_PROTRUDE : 0,
                          fontFamily: 'inherit',
                        }}
                      >
                        <Icon size={18} strokeWidth={isActive ? 2.4 : 1.8} />
                        {isExpanded && (
                          <span style={{ fontSize: '0.8rem', fontWeight: 700, whiteSpace: 'nowrap' }}>
                            {item.label}
                          </span>
                        )}
                      </button>

                      {/* ── Reverse-curve cutouts that hug the sidebar right edge ── */}
                      {isActive && (
                        <>
                          {/* TOP curve — white shadow pops outward to fill the notch */}
                          <div style={{
                            position: 'absolute',
                            right: TAB_PROTRUDE,
                            top: -CURVE_R,
                            width: CURVE_R,
                            height: CURVE_R,
                            pointerEvents: 'none',
                            background: 'transparent',
                            borderBottomRightRadius: CURVE_R,
                            boxShadow: `${CURVE_R / 2}px ${CURVE_R / 2}px 0 ${CURVE_R / 2}px #ffffff`,
                            zIndex: 30,
                          }} />
                          {/* BOTTOM curve */}
                          <div style={{
                            position: 'absolute',
                            right: TAB_PROTRUDE,
                            bottom: -CURVE_R,
                            width: CURVE_R,
                            height: CURVE_R,
                            pointerEvents: 'none',
                            background: 'transparent',
                            borderTopRightRadius: CURVE_R,
                            boxShadow: `${CURVE_R / 2}px -${CURVE_R / 2}px 0 ${CURVE_R / 2}px #ffffff`,
                            zIndex: 30,
                          }} />
                        </>
                      )}
                    </div>
                  );
                })}
              </nav>

              {/* ── BOTTOM AVATAR ── */}
              <div style={{
                width: 34, height: 34,
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid rgba(16,185,129,0.45)',
                cursor: 'pointer',
                flexShrink: 0,
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

        {/* ═══════════════════════════════════════════════
            MAIN WHITE PANEL
            zIndex 10 — lower than sidebar
            The active tab white area slides ON TOP of this panel's left border
        ═══════════════════════════════════════════════ */}
        <div style={{
          flex: 1,
          position: 'relative',
          zIndex: 10,
          background: '#ffffff',
          borderRadius: 32,
          border: '1px solid rgba(16,185,129,0.18)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.28)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          minWidth: 0,
        }}>

          {/* Dev jumper bar (hidden on Dashboard step) */}
          {currentStep !== 15 && (
            <div style={{
              background: '#f3f4f6',
              borderBottom: '1px solid #e5e7eb',
              height: 30,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 24px',
              fontSize: '0.7rem',
              flexShrink: 0,
            }}>
              <span style={{ fontWeight: 600, color: '#374151' }}>
                STEP {currentStep}: {DEV_STEPS.find(s => s.num === currentStep)?.label}
              </span>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <select
                  value={currentStep}
                  onChange={e => setStep(Number(e.target.value))}
                  style={{ fontSize: '0.65rem', padding: '1px 2px', borderRadius: 4, border: '1px solid #d1d5db' }}
                >
                  {DEV_STEPS.map(s => (
                    <option key={s.num} value={s.num}>Step {s.num}: {s.label}</option>
                  ))}
                </select>
                <button onClick={() => setStep(Math.max(1, currentStep - 1))} style={{ padding: '1px 5px', background: '#fff', border: '1px solid #d1d5db', borderRadius: 4 }}>Prev</button>
                <button onClick={() => setStep(Math.min(15, currentStep + 1))} style={{ padding: '1px 5px', background: '#fff', border: '1px solid #d1d5db', borderRadius: 4 }}>Next</button>
              </div>
            </div>
          )}

          {/* Page content — no scroll */}
          <div style={{ flex: 1, overflow: 'hidden' }}>
            {children}
          </div>

        </div>
      </div>
    </div>
  );
}
