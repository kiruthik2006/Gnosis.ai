import React, { useState } from 'react';
import { 
  Bot, Mic, MicOff, Send, Sparkles, CheckCircle2, 
  Award, Activity, Clock, ShieldCheck, Zap
} from 'lucide-react';
import { MOCK_INTERVIEW_SCRIPT } from '../data/mockData';

export default function Step11AIInterview({ onFinishInterview }) {
  const [messages, setMessages] = useState(MOCK_INTERVIEW_SCRIPT);
  const [inputText, setInputText] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [questionCount, setQuestionCount] = useState(2);
  const [isMicActive, setIsMicActive] = useState(true);

  // Quick suggestion chips for rapid prototype response testing
  const suggestions = [
    "Promises enter the Microtask queue which executes before macrotasks (setTimeout).",
    "The call stack must clear completely before the event loop processes microtasks.",
    "Microtasks can starve macrotasks if recursively scheduled."
  ];

  const handleSend = (textToSend = inputText) => {
    if (!textToSend.trim()) return;

    const userMsg = {
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsAiThinking(true);

    // Simulate adaptive AI follow-up after 1.2s
    setTimeout(() => {
      setIsAiThinking(false);
      setQuestionCount(prev => Math.min(4, prev + 1));
      const aiReply = {
        role: 'ai',
        isAdaptiveFollowUp: true,
        text: "Excellent explanation. Based on your answer about queue ordering: how does Node's process.nextTick priority interact with standard ES6 Promise microtasks?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiReply]);
    }, 1200);
  };

  return (
    <div style={{
      maxWidth: '1240px',
      margin: '0 auto',
      padding: '1.25rem',
      height: 'calc(100vh - 110px)',
      display: 'grid',
      gridTemplateColumns: '270px 1fr 290px',
      gap: '1.25rem'
    }} className="animate-fade-in">

      {/* LEFT SIDEBAR: AI Interviewer Profile & Live Audio Visualizer */}
      <div className="glass-card" style={{
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: 'var(--radius-xl)'
      }}>
        <div>
          {/* Avatar Profile */}
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 1rem auto',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #18181B 0%, #064E3B 100%)',
              color: '#FFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(6, 78, 59, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.3)',
              border: '2px solid rgba(16, 185, 129, 0.4)',
              position: 'relative'
            }}>
              <Bot size={40} color="#10B981" />
              <div style={{
                position: 'absolute',
                bottom: '3px',
                right: '3px',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: '#10B981',
                border: '3px solid #FFF',
                boxShadow: '0 0 8px #10B981'
              }} className="pulse-glow" />
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              Agent Turing
            </h3>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', fontWeight: 600, marginTop: '0.15rem' }}>
              AI Technical Evaluator
            </div>
            
            <div style={{ marginTop: '0.65rem' }}>
              <span className="badge badge-strong" style={{ fontSize: '0.6875rem', padding: '0.3rem 0.75rem', gap: '0.35rem' }}>
                <Zap size={11} fill="#10B981" /> ADAPTIVE ENGINE V2.4
              </span>
            </div>
          </div>

          {/* Live Audio Spectrum Visualizer */}
          <div style={{
            background: 'rgba(243, 239, 231, 0.6)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(232, 226, 213, 0.8)',
            padding: '1.15rem 1rem',
            borderRadius: 'var(--radius-lg)',
            textAlign: 'center',
            marginBottom: '1rem'
          }}>
            <div style={{ fontSize: '0.725rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.05em', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
              Voice & Audio Spectrum
            </div>

            {/* Audio Waveform Equalizer */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              height: '32px'
            }}>
              {[14, 26, 18, 32, 20, 28, 30, 16, 22, 12].map((h, i) => (
                <div
                  key={i}
                  style={{
                    width: '3.5px',
                    height: `${isAiThinking ? Math.min(32, h + 4) : h}px`,
                    background: isAiThinking ? '#10B981' : 'var(--accent-warm)',
                    borderRadius: '4px',
                    boxShadow: isAiThinking ? '0 0 8px rgba(16,185,129,0.5)' : 'none',
                    transition: 'all 0.15s ease',
                    animation: isAiThinking ? `pulseGlow 0.8s infinite alternate ${i * 0.08}s` : 'none'
                  }}
                />
              ))}
            </div>

            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginTop: '0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}>
              <Activity size={13} color={isAiThinking ? "#10B981" : "var(--accent-warm)"} />
              <span>{isAiThinking ? 'Evaluating reasoning depth...' : 'Listening to response'}</span>
            </div>
          </div>
        </div>

        {/* Audio Mic Toggle Button */}
        <button
          onClick={() => setIsMicActive(!isMicActive)}
          className={isMicActive ? 'btn-secondary' : 'btn-primary'}
          style={{ 
            width: '100%', 
            padding: '0.8rem', 
            fontSize: '0.8125rem',
            border: isMicActive ? '1px solid rgba(16,185,129,0.4)' : 'none',
            boxShadow: isMicActive ? '0 2px 10px rgba(16,185,129,0.12)' : 'var(--shadow-md)'
          }}
        >
          {isMicActive ? <Mic size={16} color="#10B981" /> : <MicOff size={16} />}
          <span>{isMicActive ? 'Voice Speech-to-Text Active' : 'Enable Voice Microphone'}</span>
        </button>
      </div>

      {/* CENTER PANEL: Interactive AI Evaluation Session Stream */}
      <div className="glass-card" style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden'
      }}>
        {/* Header Bar */}
        <div style={{
          padding: '1.15rem 1.5rem',
          borderBottom: '1px solid rgba(232, 226, 213, 0.7)',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-primary)', letterSpacing: '-0.015em' }}>
              Live Technical Session
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '0.1rem' }}>
              Focus Domain: <strong style={{ color: 'var(--text-primary)' }}>Advanced JavaScript & Engine Mechanics</strong>
            </div>
          </div>

          <span className="badge badge-moderate" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.35rem 0.75rem' }}>
            <Activity size={14} /> ADAPTIVE DIFFICULTY: HIGH
          </span>
        </div>

        {/* Messages Stream */}
        <div style={{
          flex: 1,
          padding: '1.5rem',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          background: 'rgba(250, 248, 245, 0.4)'
        }}>
          {messages.map((msg, idx) => {
            const isAi = msg.role === 'ai';
            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  gap: '0.85rem',
                  alignSelf: isAi ? 'flex-start' : 'flex-end',
                  maxWidth: '82%'
                }}
              >
                {isAi && (
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #18181B 0%, #064E3B 100%)',
                    color: '#10B981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 4px 12px rgba(6,78,59,0.2)',
                    marginTop: msg.isAdaptiveFollowUp ? '28px' : 0
                  }}>
                    <Bot size={20} />
                  </div>
                )}

                <div>
                  {/* Adaptive Follow-up Tag */}
                  {msg.isAdaptiveFollowUp && (
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      background: 'rgba(253, 246, 238, 0.9)',
                      color: 'var(--accent-warm)',
                      border: '1px solid var(--accent-warm-border)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.725rem',
                      fontWeight: 700,
                      marginBottom: '0.4rem',
                      boxShadow: '0 2px 6px rgba(196,120,56,0.1)'
                    }}>
                      <Sparkles size={12} /> Adaptive Dynamic Follow-Up
                    </div>
                  )}

                  <div style={{
                    background: isAi ? 'rgba(255, 255, 255, 0.95)' : 'linear-gradient(135deg, #18181B 0%, #04241C 100%)',
                    color: isAi ? 'var(--text-primary)' : '#FFFFFF',
                    border: isAi ? '1px solid rgba(232, 226, 213, 0.9)' : 'none',
                    borderLeft: isAi ? '3px solid #10B981' : 'none',
                    padding: '1.1rem 1.35rem',
                    borderRadius: isAi ? '0 var(--radius-md) var(--radius-md) var(--radius-md)' : 'var(--radius-md) 0 var(--radius-md) var(--radius-md)',
                    fontSize: '0.925rem',
                    lineHeight: 1.55,
                    boxShadow: isAi ? '0 4px 16px rgba(28, 27, 26, 0.04)' : '0 6px 20px rgba(0, 0, 0, 0.18)'
                  }}>
                    {msg.text}
                  </div>

                  <div style={{
                    fontSize: '0.7rem',
                    fontWeight: 500,
                    color: 'var(--text-muted)',
                    marginTop: '0.35rem',
                    textAlign: isAi ? 'left' : 'right',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    justifyContent: isAi ? 'flex-start' : 'flex-end'
                  }}>
                    <Clock size={11} /> {msg.timestamp}
                  </div>
                </div>
              </div>
            );
          })}

          {isAiThinking && (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.65rem',
              background: 'rgba(255, 255, 255, 0.9)',
              padding: '0.75rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-light)',
              maxWidth: '300px',
              fontSize: '0.8125rem',
              color: 'var(--text-secondary)'
            }}>
              <Bot size={18} color="#10B981" />
              <span>Agent Turing is formulating question...</span>
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div style={{ 
          padding: '0.6rem 1.25rem', 
          background: 'rgba(255, 255, 255, 0.85)', 
          borderTop: '1px solid rgba(232, 226, 213, 0.7)' 
        }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            SUGGESTED TECHNICAL ANSWERS (PROTOTYPE QUICK-TEST):
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => handleSend(s)}
                style={{
                  fontSize: '0.75rem',
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(243, 239, 231, 0.8)',
                  color: 'var(--text-primary)',
                  border: '1px solid rgba(214, 207, 190, 0.8)',
                  whiteSpace: 'nowrap',
                  fontWeight: 500,
                  transition: 'all 0.15s ease'
                }}
              >
                "{s.slice(0, 48)}..."
              </button>
            ))}
          </div>
        </div>

        {/* Input Controls Box */}
        <div style={{
          padding: '1rem 1.25rem',
          background: 'rgba(255, 255, 255, 0.95)',
          borderTop: '1px solid rgba(232, 226, 213, 0.8)',
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'center'
        }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <textarea
              rows={2}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your technical answer here (e.g. explain microtask queue vs event loop stack)..."
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: '1.5px solid var(--border-strong)',
                fontSize: '0.875rem',
                outline: 'none',
                resize: 'none',
                background: '#FFFFFF',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.02)'
              }}
            />
          </div>

          <button
            onClick={() => handleSend()}
            disabled={!inputText.trim()}
            className="btn-primary"
            style={{ 
              height: '52px', 
              padding: '0 1.5rem', 
              background: inputText.trim() ? 'linear-gradient(135deg, #18181B 0%, #04241C 100%)' : '#E5E7EB',
              color: inputText.trim() ? '#FFFFFF' : '#9CA3AF',
              border: 'none'
            }}
          >
            <Send size={18} />
          </button>
        </div>
      </div>

      {/* RIGHT SIDEBAR: Live Interview Progress & Domain Criteria */}
      <div className="glass-card" style={{
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: 'var(--radius-xl)'
      }}>
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: '0.85rem' }}>
            EVALUATION PROGRESS
          </div>

          <div style={{
            background: 'rgba(243, 239, 231, 0.6)',
            padding: '1.15rem 1rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid rgba(232, 226, 213, 0.8)',
            marginBottom: '1.5rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', fontWeight: 800, marginBottom: '0.45rem', color: 'var(--text-primary)' }}>
              <span>Questions Covered</span>
              <span>{questionCount} / 4</span>
            </div>
            <div style={{ height: '8px', width: '100%', background: 'rgba(214, 207, 190, 0.6)', borderRadius: '99px', overflow: 'hidden' }}>
              <div style={{ 
                height: '100%', 
                width: `${(questionCount / 4) * 100}%`, 
                background: 'linear-gradient(90deg, #10B981 0%, #059669 100%)', 
                borderRadius: '99px',
                transition: 'width 0.3s ease',
                boxShadow: '0 0 8px rgba(16,185,129,0.4)'
              }} />
            </div>
          </div>

          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: '0.85rem' }}>
            EVALUATED SKILL DOMAINS
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { label: 'Event Loop & Call Stack', evaluated: true },
              { label: 'Microtask vs Macrotask', evaluated: true },
              { label: 'Promise Internal States', evaluated: true },
              { label: 'V8 Memory Management', evaluated: false }
            ].map((d, i) => (
              <div 
                key={i} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  fontSize: '0.8125rem',
                  padding: '0.5rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  background: d.evaluated ? 'rgba(240, 253, 244, 0.8)' : 'rgba(243, 239, 231, 0.4)',
                  border: d.evaluated ? '1px solid rgba(187, 247, 208, 0.8)' : '1px solid rgba(232, 226, 213, 0.6)'
                }}
              >
                <span style={{ color: d.evaluated ? 'var(--text-primary)' : 'var(--text-muted)', fontWeight: d.evaluated ? 700 : 500 }}>
                  {d.label}
                </span>
                {d.evaluated ? (
                  <CheckCircle2 size={16} color="#10B981" />
                ) : (
                  <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)' }}>Pending</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Complete & Evaluate Action Button */}
        <button
          onClick={onFinishInterview}
          className="btn-primary"
          style={{ 
            width: '100%', 
            padding: '0.9rem', 
            marginTop: '1.5rem', 
            background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
            border: 'none',
            fontSize: '0.9rem',
            gap: '0.6rem',
            boxShadow: '0 4px 16px rgba(5, 150, 105, 0.3)'
          }}
        >
          <Award size={18} />
          <span>Finish & Evaluate Interview</span>
        </button>
      </div>
    </div>
  );
}
