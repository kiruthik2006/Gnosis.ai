import React, { useState } from 'react';
import { 
  CheckCircle2, Compass, GitFork, BookOpen, MessageSquareCode, 
  ArrowRight, Sparkles, Clock, Globe, ShieldCheck, Activity, Award,
  Sliders, ArrowUpRight, HelpCircle
} from 'lucide-react';

export default function Step15Dashboard({ onNavigateStep }) {
  const [selectedFilter, setSelectedFilter] = useState('All');

  // Interactive mock data for daily activity bar graph
  const dailyActivity = [
    { day: '22 Sept', val: 30, active: false },
    { day: '23 Sept', val: 50, active: false },
    { day: '24 Sept', val: 40, active: false },
    { day: '25 Sept', val: 75, active: false },
    { day: '26 Sept', val: 95, active: true }, // high peak matching screenshot
    { day: '27 Sept', val: 65, active: false },
    { day: '28 Sept', val: 45, active: false },
    { day: '29 Sept', val: 55, active: false },
    { day: '30 Sept', val: 50, active: false },
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      animation: 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
    }}>
      
      {/* ── HEADER ROW (Verification Stats style from screenshot) ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Title */}
        <h1 style={{
          fontSize: '2.125rem',
          fontWeight: 800,
          color: 'var(--text-primary)',
          letterSpacing: '-0.03em',
          margin: 0
        }}>
          Interview stats
        </h1>

        {/* Small Counters in Header Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {/* Counter 1 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#F3F4F6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#374151'
            }}>
              <Clock size={18} />
            </div>
            <div>
              <span style={{ fontSize: '0.675rem', color: '#6B7280', display: 'block' }}>Study time this week</span>
              <strong style={{ fontSize: '1rem', color: '#111827', fontWeight: 800 }}>12.4h</strong>
            </div>
          </div>

          {/* Counter 2 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#F3F4F6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#374151'
            }}>
              <Globe size={18} />
            </div>
            <div>
              <span style={{ fontSize: '0.675rem', color: '#6B7280', display: 'block' }}>Topics completed</span>
              <strong style={{ fontSize: '1rem', color: '#111827', fontWeight: 800 }}>7 / 12</strong>
            </div>
          </div>
        </div>
      </div>

      {/* ── FILTER TABS BAR (All, Activity, Protection...) ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        borderBottom: '1px solid #F3F4F6',
        paddingBottom: '12px'
      }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          {['All', 'Skill Tree', 'Roadmap', 'Courses', 'AI Interview'].map((tab) => {
            const isSel = selectedFilter === tab;
            return (
              <button
                key={tab}
                onClick={() => setSelectedFilter(tab)}
                style={{
                  fontSize: '0.7875rem',
                  fontWeight: 600,
                  padding: '6px 14px',
                  borderRadius: '99px',
                  background: isSel ? '#E1EFEA' : 'transparent',
                  color: isSel ? '#10B981' : '#6B7280',
                  border: isSel ? '1px solid #C2DFD6' : '1px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Small action icon on filter row */}
        <button style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: '1px solid #E5E7EB',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#4B5563',
          cursor: 'pointer'
        }}>
          <Sliders size={14} />
        </button>
      </div>

      {/* ── 5. MAIN MOCK CHART WIDGET (Mint Green Rounded Card) ── */}
      <div style={{
        background: '#E6F4F0',
        borderRadius: '24px',
        padding: '24px',
        border: '1px solid #CBEAE0',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        {/* Widget Top Title */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.675rem', fontWeight: 700, color: '#0F766E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              TRACK PROGRESS
            </span>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', margin: '2px 0 0 0' }}>
              Your activity
            </h2>
          </div>
          <span style={{
            fontSize: '0.725rem',
            background: '#FFFFFF',
            padding: '4px 10px',
            borderRadius: '99px',
            color: '#0F766E',
            fontWeight: 600,
            border: '1px solid #BFE3D8'
          }}>
            31-Day AI Engineering
          </span>
        </div>

        {/* Main Chart Content Grid */}
        <div style={{
          display: 'flex',
          gap: '24px',
          alignItems: 'stretch',
          flexWrap: 'wrap'
        }}>
          {/* Left panel info cards (inline devices / stats) */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            width: '200px',
            flexShrink: 0
          }}>
            {/* Box 1 */}
            <div style={{ background: '#FFFFFF', padding: '12px 14px', borderRadius: '16px', border: '1px solid #D3EDE3' }}>
              <div style={{ fontSize: '0.725rem', color: '#6B7280', fontWeight: 500 }}>Active Track</div>
              <strong style={{ fontSize: '0.85rem', color: '#1C1B1A', fontWeight: 700 }}>AI Engineer</strong>
            </div>

            {/* Box 2 */}
            <div style={{ background: '#FFFFFF', padding: '12px 14px', borderRadius: '16px', border: '1px solid #D3EDE3' }}>
              <div style={{ fontSize: '0.725rem', color: '#6B7280', fontWeight: 500 }}>Completed Lessons</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                <strong style={{ fontSize: '0.85rem', color: '#1C1B1A', fontWeight: 700 }}>4 Modules</strong>
                <span style={{ fontSize: '0.675rem', color: '#10B981', fontWeight: 600 }}>✓ On schedule</span>
              </div>
            </div>
          </div>

          {/* Center: Realized bar chart */}
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            height: '140px',
            background: 'rgba(255, 255, 255, 0.4)',
            borderRadius: '16px',
            padding: '16px 20px',
            border: '1px solid #D3EDE3',
            minWidth: '280px'
          }}>
            {dailyActivity.map((d, idx) => (
              <div key={idx} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                flex: 1
              }}>
                {/* Bar */}
                <div style={{
                  width: '18px',
                  height: `${d.val}px`,
                  background: d.active ? '#1C1B1A' : '#A7F3D0',
                  borderRadius: '99px',
                  transition: 'height 0.3s ease'
                }} />
                {/* Day Label */}
                <span style={{ fontSize: '0.625rem', color: '#0F766E', fontWeight: 600 }}>
                  {d.day.split(' ')[0]}
                </span>
              </div>
            ))}
          </div>

          {/* Right vertical utility buttons strip */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            justifyContent: 'center'
          }}>
            {['chart', 'history', 'settings'].map((btn, idx) => (
              <button key={idx} style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#FFFFFF',
                border: '1px solid #CBEAE0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#1C1B1A',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
              }}>
                <Activity size={13} />
              </button>
            ))}
          </div>

        </div>

      </div>

      {/* ── THREE LOWER WIDGETS ROW ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
        alignItems: 'stretch'
      }} className="lower-widgets-row">
        
        {/* Widget 1: Most Used (Capsule vertical progress bars) */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #E5E7EB',
          borderRadius: '24px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 800, color: '#111827', marginBottom: '12px' }}>
              Skill Node Strength
            </h3>
            
            {/* Custom styled progress rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { name: 'HTML & CSS', val: 90, color: '#A7F3D0' },
                { name: 'JavaScript', val: 75, color: '#FCD34D' },
                { name: 'React Framework', val: 68, color: '#60A5FA' },
                { name: 'FastAPI Router', val: 80, color: '#F87171' },
              ].map((prog, idx) => (
                <div key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.725rem', marginBottom: '2px' }}>
                    <span style={{ color: '#4B5563', fontWeight: 500 }}>{prog.name}</span>
                    <strong style={{ color: '#111827' }}>{prog.val}%</strong>
                  </div>
                  <div style={{ height: '6px', background: '#F3F4F6', borderRadius: '99px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${prog.val}%`, background: prog.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={() => onNavigateStep(5)}
            style={{
              marginTop: '16px',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#1C1B1A',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
              alignSelf: 'flex-start'
            }}
          >
            <span>View full skill tree</span>
            <ArrowRight size={12} />
          </button>
        </div>

        {/* Widget 2: Readiness / Verification Speed dial */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #E5E7EB',
          borderRadius: '24px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 800, color: '#111827', marginBottom: '4px' }}>
              Readiness metrics
            </h3>
            <span style={{ fontSize: '0.675rem', color: '#6B7280', display: 'block', marginBottom: '14px' }}>
              Based on active mock assignments
            </span>

            {/* Circular readiness dial look */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              background: '#F9FAFB',
              padding: '12px 14px',
              borderRadius: '16px',
              border: '1px solid #F3F4F6'
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: '#E1EFEA',
                border: '3px solid #10B981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.9rem',
                fontWeight: 800,
                color: '#0F766E'
              }}>
                72%
              </div>
              <div>
                <strong style={{ fontSize: '0.8125rem', color: '#111827', display: 'block' }}>Ready for Mock</strong>
                <span style={{ fontSize: '0.675rem', color: '#10B981', fontWeight: 600 }}>✓ Pre-assessment completed</span>
              </div>
            </div>
          </div>

          <div style={{
            fontSize: '0.725rem',
            color: '#6B7280',
            borderTop: '1px solid #F3F4F6',
            paddingTop: '12px',
            marginTop: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span>Benchmark percentile:</span>
            <strong style={{ color: '#111827' }}>Top 15%</strong>
          </div>
        </div>

        {/* Widget 3: Turing Evaluator update card */}
        <div style={{
          background: '#FAFAF9',
          border: '1px solid #E5E7EB',
          borderRadius: '24px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div>
            <span style={{
              fontSize: '0.625rem',
              fontWeight: 700,
              background: '#FEF3C7',
              color: '#D97706',
              padding: '2px 8px',
              borderRadius: '99px',
              textTransform: 'uppercase',
              display: 'inline-block',
              marginBottom: '10px'
            }}>
              Agent Turing
            </span>
            <h3 style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#111827', marginBottom: '6px' }}>
              AI Tech Interview
            </h3>
            <p style={{ fontSize: '0.725rem', color: '#6B7280', lineHeight: '1.4' }}>
              Launch the live interactive AI evaluation to get your skills verified on-chain.
            </p>
          </div>

          {/* Colorful sphere style background graphic */}
          <div style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(167,243,208,1) 0%, rgba(96,165,250,1) 100%)',
            opacity: 0.7,
            filter: 'blur(8px)',
            pointerEvents: 'none'
          }} />

          <button 
            onClick={() => onNavigateStep(11)}
            style={{
              marginTop: '16px',
              width: '100%',
              background: '#1C1B1A',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.775rem',
              padding: '8px 12px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              cursor: 'pointer'
            }}
          >
            <span>Start AI Interview</span>
            <ArrowRight size={12} />
          </button>
        </div>

      </div>

      {/* ── NEXT MILESTONE STRIP (Subtle strip matching bottom card styles) ── */}
      <div style={{
        background: '#FAF8F5',
        border: '1px solid #E5E7EB',
        borderRadius: '20px',
        padding: '12px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={16} color="#D97706" />
          <span style={{ fontSize: '0.7875rem', color: '#374151' }}>
            Next Milestone: <strong>Complete Advanced JavaScript</strong> to unlock React Fundamentals.
          </span>
        </div>
        <button 
          onClick={() => onNavigateStep(8)}
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: '#1C1B1A',
            cursor: 'pointer',
            border: 'none',
            background: 'transparent'
          }}
        >
          Resume Roadmap →
        </button>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .lower-widgets-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
