import React, { useState } from 'react';
import { 
  ChevronRight, Play, Star, Plus, MoreHorizontal, ArrowRight,
  TrendingUp, BookOpen, Clock, Award, ShieldCheck, CheckCircle2,
  Search, Bell, Sparkles, Zap, Flame, Terminal, AlertTriangle, RefreshCw, Send, Activity
} from 'lucide-react';

export default function Step15Dashboard({ onNavigateStep }) {
  // Terminal streaming messages state
  const [terminalLogs, setTerminalLogs] = useState([
    { id: 1, time: '22:01:04', type: 'system', text: 'INITIALIZING SESSION: Candidate Alex Turner (CAND-002)...' },
    { id: 2, time: '22:01:05', type: 'system', text: 'CLAIM TREE INSTANTIATED: 14 Domains (8 Mastered, 4 Familiar, 2 Weak)' },
    { id: 3, time: '22:01:07', type: 'ai', text: 'Agent Turing: "Welcome Alex! Let\'s probe your understanding of ES6 Event Loop microtasks vs macrotasks..."' },
    { id: 4, time: '22:01:12', type: 'user', text: 'Alex: "Promise microtasks execute immediately after the current stack clears, prior to setTimeout macrotasks."' },
    { id: 5, time: '22:01:13', type: 'eval', text: 'EVALUATION ENGINE: Response validated. Confidence 98% -> Domain MASTERED (1 Attempt).' },
    { id: 6, time: '22:01:15', type: 'ai', text: 'Agent Turing: "Pivoting to Module 6: How does vector similarity search handle high-dimensional embeddings in RAG?"' }
  ]);

  const [termInput, setTermInput] = useState('');

  const handleSendTerminal = () => {
    if (!termInput.trim()) return;
    const newLog = {
      id: Date.now(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      type: 'user',
      text: `Alex: "${termInput}"`
    };
    setTerminalLogs(prev => [...prev, newLog]);
    setTermInput('');

    // Simulate AI streaming response
    setTimeout(() => {
      setTerminalLogs(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          type: 'eval',
          text: 'EVALUATION ENGINE: Processing live technical response... Score: 94%'
        }
      ]);
    }, 900);
  };

  // 1. Claimed vs. Verified Skill Cards Data (Alex Turner CAND-002)
  const skillClaimCards = [
    { 
      domain: 'Async & Event Loop', 
      status: 'VERIFIED: MASTERED', 
      attempts: '1 Attempt (First Try)', 
      score: '96%', 
      statusColor: '#10B981', 
      badgeBg: 'rgba(236, 253, 245, 0.95)',
      badgeBorder: '#10B981',
      iconText: 'JS',
      iconBg: '#F7DF1E',
      iconColor: '#000'
    },
    { 
      domain: 'FastAPI & Microservices', 
      status: 'VERIFIED: MASTERED', 
      attempts: 'Passed Day 16 (1 Attempt)', 
      score: '98%', 
      statusColor: '#10B981', 
      badgeBg: 'rgba(236, 253, 245, 0.95)',
      badgeBorder: '#10B981',
      iconText: 'API',
      iconBg: '#009688',
      iconColor: '#FFF'
    },
    { 
      domain: 'Vector DBs & RAG Pipelines', 
      status: 'CLAIMED: FAMILIAR', 
      attempts: '3 Attempts Needed (Friction)', 
      score: '64%', 
      statusColor: '#D97706', 
      badgeBg: 'rgba(254, 243, 199, 0.95)',
      badgeBorder: '#F59E0B',
      iconText: 'RAG',
      iconBg: '#3B82F6',
      iconColor: '#FFF'
    },
  ];

  // 2. Friction & Attempts Chart Data
  const frictionChart = [
    { module: 'Async JS', attempts: 1, status: 'Mastered', color: '#10B981' },
    { module: 'FastAPI', attempts: 1, status: 'Mastered', color: '#10B981' },
    { module: 'Prompting', attempts: 5, status: 'High Friction ⚠️', highlight: true, color: '#EF4444' },
    { module: 'Vector DBs', attempts: 3, status: 'Familiar', color: '#F59E0B' },
    { module: 'Agentic AI', attempts: 2, status: 'In Evaluation', color: '#3B82F6' },
    { module: 'Docker Guard', attempts: 1, status: 'Mastered', color: '#10B981' },
  ];

  // 3. Evaluation Audit Log Data
  const auditLogs = [
    { 
      action: 'Analyzing Vector DB Knowledge...', 
      status: 'PARTIAL', 
      desc: 'Friction detected on HNSW similarity indexing & top-k reranking.',
      badgeColor: '#D97706',
      badgeBg: 'rgba(254, 243, 199, 0.9)',
      step: 5
    },
    { 
      action: 'Pivoting to Module 6: Agentic AI...', 
      status: 'ADAPTIVE PROMPT GENERATED', 
      desc: 'Formulated multi-tool orchestration question based on candidate history.',
      badgeColor: '#3B82F6',
      badgeBg: 'rgba(239, 246, 255, 0.9)',
      step: 11
    },
    { 
      action: 'Evaluating ES6 Event Loop Microtasks...', 
      status: 'MASTERED', 
      desc: 'Candidate articulated promise queue vs macrotask execution order accurately.',
      badgeColor: '#10B981',
      badgeBg: 'rgba(236, 253, 245, 0.9)',
      step: 12
    },
    { 
      action: 'Validating Docker Security Guardrails...', 
      status: 'VERIFICATION PENDING', 
      desc: 'Container network isolation & memory limit checks queued.',
      badgeColor: '#6B7280',
      badgeBg: 'rgba(243, 244, 246, 0.9)',
      step: 6
    }
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1.25rem',
      padding: '1.5rem 2rem',
      background: 'transparent',
      flex: 1,
      minHeight: '100%',
      boxSizing: 'border-box',
      overflowY: 'auto'
    }} className="animate-fade-in">

      {/* ── 1. HEADER ROW ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        paddingBottom: '0.25rem',
        borderBottom: '1px solid rgba(232, 226, 213, 0.6)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <h1 style={{
              fontSize: '1.6rem',
              fontWeight: 850,
              color: 'var(--text-primary)',
              letterSpacing: '-0.025em',
              margin: 0
            }}>
              Candidate Evaluation Dashboard
            </h1>
            <span className="badge badge-strong" style={{ fontSize: '0.6875rem', gap: '0.35rem', padding: '0.25rem 0.65rem' }}>
              <Flame size={12} fill="#10B981" /> 88% READINESS SCORE
            </span>
          </div>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', margin: '0.2rem 0 0 0' }}>
            Active Candidate: <strong style={{ color: 'var(--text-primary)' }}>Alex Turner (CAND-002)</strong> — Senior AI Engineer Track
          </p>
        </div>

        {/* Header Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(10px)',
            borderRadius: 'var(--radius-full)',
            padding: '6px 14px',
            border: '1px solid rgba(232, 226, 213, 0.8)',
            width: '210px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
          }}>
            <Search size={14} color="var(--text-muted)" />
            <input 
              type="text" 
              placeholder="Search candidate claims..." 
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontSize: '0.785rem',
                width: '100%',
                color: 'var(--text-primary)'
              }}
            />
          </div>

          <button 
            onClick={() => onNavigateStep(11)}
            className="btn-primary"
            style={{ 
              padding: '0.55rem 1.2rem', 
              fontSize: '0.8125rem',
              borderRadius: 'var(--radius-full)',
              background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
              gap: '0.45rem',
              boxShadow: '0 4px 14px rgba(5, 150, 105, 0.3)'
            }}
          >
            <Zap size={14} color="#FFF" fill="#FFF" />
            <span>Launch Live AI Session</span>
          </button>
        </div>
      </div>

      {/* ── 2. CLAIMED VS. VERIFIED SKILL CARDS (3 Cards) ── */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={16} color="var(--status-strong)" />
            <h2 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.01em' }}>
              Claimed vs. Verified Skill Matrix (Alex Turner)
            </h2>
          </div>
          <span 
            onClick={() => onNavigateStep(5)}
            style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-warm)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
          >
            Inspect Claim Tree <ArrowRight size={12} />
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem'
        }}>
          {skillClaimCards.map((c, idx) => (
            <div 
              key={idx}
              className="glass-card"
              style={{
                borderRadius: 'var(--radius-lg)',
                padding: '1.15rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: 'var(--radius-md)',
                    background: c.iconBg,
                    color: c.iconColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 900,
                    fontSize: '0.8rem',
                    flexShrink: 0,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                  }}>
                    {c.iconText}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.875rem', fontWeight: 850, color: 'var(--text-primary)', margin: 0, lineHeight: 1.25 }}>{c.domain}</h4>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, display: 'inline-block', marginTop: '0.2rem' }}>
                      {c.attempts}
                    </span>
                  </div>
                </div>

                <span style={{
                  background: c.badgeBg,
                  color: c.statusColor,
                  border: `1px solid ${c.badgeBorder}`,
                  padding: '3px 8px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  whiteSpace: 'nowrap'
                }}>
                  {c.status}
                </span>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justify: 'space-between',
                borderTop: '1px solid rgba(232, 226, 213, 0.7)',
                paddingTop: '0.65rem'
              }}>
                <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                  Evaluated Accuracy: <strong style={{ color: c.statusColor, fontWeight: 850 }}>{c.score}</strong>
                </span>
                <button 
                  onClick={() => onNavigateStep(5)}
                  style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-primary)', background: 'transparent', display: 'flex', alignItems: 'center', gap: '2px', cursor: 'pointer' }}
                >
                  <span>Verify Node</span>
                  <ChevronRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 3. DETAILED WIDGETS ROW: FRICTION CHART + EVALUATION AUDIT LOG + AI TERMINAL ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.7fr 1.15fr 1.3fr',
        gap: '1rem',
        alignItems: 'stretch',
        flex: 1,
        minHeight: 0
      }}>
        
        {/* LEFT COLUMN: Friction & Attempts Chart */}
        <div className="glass-card" style={{
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          justify: 'space-between',
          gap: '1rem'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 850, color: 'var(--text-primary)', margin: 0 }}>
                  Candidate Friction & Assessment Attempts
                </h3>
                <p style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', margin: '0.2rem 0 0 0' }}>
                  Analyzes attempt history per module to pinpoint candidate strengths & struggles.
                </p>
              </div>
              <span className="badge badge-strong" style={{ fontSize: '0.65rem', padding: '0.2rem 0.6rem' }}>
                HISTORICAL FRICTION
              </span>
            </div>

            {/* Friction Bar Chart (X: Curriculum Modules, Y: Attempts) */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-end',
              justify: 'space-between',
              height: '140px',
              padding: '1.5rem 0.5rem 0 0.5rem',
              position: 'relative'
            }}>
              {frictionChart.map((bar, idx) => {
                const heightPx = bar.attempts * 22; // Scale attempts to height
                return (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flex: 1, position: 'relative' }}>
                    <div style={{
                      width: '18px',
                      height: `${heightPx}px`,
                      background: bar.highlight ? 'linear-gradient(180deg, #EF4444 0%, #B91C1C 100%)' : bar.color,
                      borderRadius: '6px',
                      position: 'relative',
                      boxShadow: bar.highlight ? '0 0 12px rgba(239, 68, 68, 0.4)' : 'none',
                      transition: 'all 0.2s ease'
                    }}>
                      {/* Highlight Tooltip Callout */}
                      {bar.highlight && (
                        <div style={{
                          position: 'absolute',
                          bottom: '100%',
                          left: '50%',
                          transform: 'translateX(-50%) translateY(-8px)',
                          background: '#18181B',
                          color: '#F87171',
                          fontSize: '0.625rem',
                          fontWeight: 800,
                          padding: '4px 8px',
                          borderRadius: 'var(--radius-sm)',
                          whiteSpace: 'nowrap',
                          zIndex: 999,
                          boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
                          border: '1px solid rgba(239,68,68,0.4)',
                          textAlign: 'center'
                        }}>
                          ⚠️ High Friction: 5 Attempts
                          <div style={{ fontSize: '0.55rem', color: '#D1D5DB', fontWeight: 500 }}>Struggled with Prompting</div>
                        </div>
                      )}
                      
                      {/* Attempts number tag inside bar */}
                      <span style={{
                        position: 'absolute',
                        top: '4px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        color: '#FFF',
                        fontSize: '0.65rem',
                        fontWeight: 900
                      }}>
                        {bar.attempts}
                      </span>
                    </div>

                    <span style={{ 
                      fontSize: '0.6875rem', 
                      color: bar.highlight ? '#EF4444' : 'var(--text-primary)', 
                      fontWeight: bar.highlight ? 850 : 600,
                      textAlign: 'center'
                    }}>
                      {bar.module}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Chart Insights Footer */}
          <div style={{
            background: 'rgba(243, 239, 231, 0.7)',
            borderRadius: 'var(--radius-md)',
            padding: '0.75rem 1rem',
            border: '1px solid rgba(232, 226, 213, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justify: 'space-between',
            fontSize: '0.75rem'
          }}>
            <span style={{ color: 'var(--text-secondary)' }}>
              Evaluation Finding: Candidate <strong style={{ color: 'var(--text-primary)' }}>Alex Turner</strong> crushed <strong style={{ color: '#10B981' }}>FastAPI Backend (1 Attempt)</strong> but needs targeted probing on <strong style={{ color: '#EF4444' }}>Prompt Engineering (5 Attempts)</strong>.
            </span>
          </div>
        </div>

        {/* CENTER COLUMN: Evaluation Audit Log */}
        <div className="glass-card" style={{
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.85rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 850, color: 'var(--text-primary)', margin: 0 }}>
                Evaluation Audit Log
              </h3>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Real-Time AI Internal Reasoning</span>
            </div>
            <Activity size={15} color="#10B981" />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', flex: 1, justifyContent: 'space-between' }}>
            {auditLogs.map((log, idx) => (
              <div 
                key={idx}
                onClick={() => onNavigateStep(log.step)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem',
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: '1px solid rgba(232, 226, 213, 0.8)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.75rem 0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--text-primary)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(232, 226, 213, 0.8)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.785rem', fontWeight: 850, color: 'var(--text-primary)' }}>
                    {log.action}
                  </span>
                  <span style={{
                    fontSize: '0.625rem',
                    fontWeight: 800,
                    padding: '2px 6px',
                    borderRadius: 'var(--radius-sm)',
                    background: log.badgeBg,
                    color: log.badgeColor
                  }}>
                    {log.status}
                  </span>
                </div>
                <span style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', lineHeight: 1.3 }}>
                  {log.desc}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: AI Turing Evaluation Terminal (No August Calendar!) */}
        <div style={{
          background: '#0D1117',
          borderRadius: 'var(--radius-lg)',
          padding: '1rem',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          justify: 'space-between',
          gap: '0.75rem',
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.4)',
          overflow: 'hidden'
        }}>
          
          {/* Top Launch Session Button */}
          <button 
            onClick={() => onNavigateStep(11)}
            style={{
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              color: '#04241C',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              padding: '0.65rem 1rem',
              fontSize: '0.8125rem',
              fontWeight: 850,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)'
            }}
          >
            <Zap size={15} fill="#04241C" />
            <span>Launch Live AI Evaluation Session</span>
          </button>

          {/* Terminal Window Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justify: 'space-between',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            paddingBottom: '0.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EF4444' }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F59E0B' }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} />
              <span style={{ fontSize: '0.7rem', color: '#9CA3AF', fontFamily: 'var(--font-mono)', marginLeft: '4px' }}>
                turing_eval_stream.log
              </span>
            </div>

            <span style={{ fontSize: '0.625rem', color: '#10B981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span className="pulse-glow" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }} />
              LIVE WEBSOCKET
            </span>
          </div>

          {/* Streaming Log Stream Area */}
          <div style={{
            flex: 1,
            maxHeight: '230px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.6rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            lineHeight: 1.45,
            paddingRight: '4px'
          }}>
            {terminalLogs.map(log => {
              let color = '#D1D5DB';
              if (log.type === 'system') color = '#6B7280';
              if (log.type === 'ai') color = '#A7F3D0';
              if (log.type === 'user') color = '#F3E8FF';
              if (log.type === 'eval') color = '#F59E0B';

              return (
                <div key={log.id} style={{ color }}>
                  <span style={{ color: '#6B7280', fontSize: '0.625rem', marginRight: '6px' }}>[{log.time}]</span>
                  {log.text}
                </div>
              );
            })}
          </div>

          {/* Terminal Interactive Input Field */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: 'var(--radius-md)',
            padding: '4px 8px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <span style={{ color: '#10B981', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>&gt;_</span>
            <input 
              type="text" 
              value={termInput}
              onChange={e => setTermInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSendTerminal()}
              placeholder="Inject prompt test..." 
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                color: '#FFF',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                width: '100%'
              }}
            />
            <button 
              onClick={handleSendTerminal}
              style={{ background: 'transparent', border: 'none', color: '#10B981', cursor: 'pointer', padding: '2px' }}
            >
              <Send size={12} />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
