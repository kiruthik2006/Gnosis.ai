import React, { useState, useEffect } from 'react';
import { 
  Bot, User, Mic, MicOff, Send, Sparkles, CheckCircle2, 
  Code, Award, ArrowRight, Activity, Terminal
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
        text: "Excellent explanation. Based on your answer about queue ordering: how does node's process.nextTick priority interact with standard ES6 Promise microtasks?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiReply]);
    }, 1200);
  };

  return (
    <div style={{
      maxWidth: '1240px',
      margin: '0 auto',
      padding: '1.5rem',
      height: 'calc(100vh - 110px)',
      display: 'grid',
      gridTemplateColumns: '260px 1fr 280px',
      gap: '1.25rem'
    }} className="animate-fade-in">

      {/* LEFT SIDEBAR: AI Interviewer Profile */}
      <div className="saas-card" style={{
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        justify: 'space-between',
        borderRadius: 'var(--radius-lg)'
      }}>
        <div>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{
              width: '72px',
              height: '72px',
              margin: '0 auto 0.85rem auto',
              borderRadius: '50%',
              background: 'var(--text-primary)',
              color: '#FFF',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              boxShadow: 'var(--shadow-md)',
              position: 'relative'
            }}>
              <Bot size={36} />
              <div style={{
                position: 'absolute',
                bottom: '2px',
                right: '2px',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                background: '#4A7C59',
                border: '2px solid #FFF'
              }} />
            </div>

            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Agent Turing
            </h3>
            <div style={{ fontSize: '0.785rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
              AI Tech Interviewer
            </div>
            <span className="badge badge-strong" style={{ marginTop: '0.5rem', fontSize: '0.65rem' }}>
              ADAPTIVE EVALUATOR
            </span>
          </div>

          <hr style={{ border: 0, borderTop: '1px solid var(--border-light)', margin: '1rem 0' }} />

          {/* Live Audio Spectrum Simulator */}
          <div style={{
            background: 'var(--bg-subtle)',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            textAlign: 'center',
            marginBottom: '1rem'
          }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              VOICE & CONVERSATION
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              gap: '4px',
              height: '24px'
            }}>
              {[12, 22, 16, 28, 14, 20, 24, 10, 18].map((h, i) => (
                <div
                  key={i}
                  style={{
                    width: '3px',
                    height: `${h}px`,
                    background: 'var(--accent-warm)',
                    borderRadius: '2px',
                    animation: isAiThinking ? 'pulseGlow 1s infinite alternate' : 'none'
                  }}
                />
              ))}
            </div>
            <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>
              {isAiThinking ? 'Analyzing response...' : 'Listening to candidate'}
            </div>
          </div>
        </div>

        {/* Audio Mic Toggle */}
        <button
          onClick={() => setIsMicActive(!isMicActive)}
          className={isMicActive ? 'btn-secondary' : 'btn-primary'}
          style={{ width: '100%', padding: '0.7rem', fontSize: '0.8125rem' }}
        >
          {isMicActive ? <Mic size={16} color="var(--status-strong)" /> : <MicOff size={16} />}
          <span>{isMicActive ? 'Mic Active (Speech-to-Text)' : 'Enable Voice Mic'}</span>
        </button>
      </div>

      {/* CENTER PANEL: Interactive Conversation Stream */}
      <div className="saas-card" style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          padding: '1rem 1.5rem',
          borderBottom: '1px solid var(--border-light)',
          background: 'var(--bg-card)',
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between'
        }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>
              Live Technical Session
            </div>
            <div style={{ fontSize: '0.785rem', color: 'var(--text-muted)' }}>
              Target: Advanced JavaScript & Asynchronous Mechanics
            </div>
          </div>

          <span className="badge badge-moderate" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Activity size={13} /> ADAPTIVE DIFFICULTY: HIGH
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
          background: 'var(--bg-card-hover)'
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
                  maxWidth: '85%'
                }}
              >
                {isAi && (
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'var(--text-primary)',
                    color: '#FFF',
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'center',
                    flexShrink: 0
                  }}>
                    <Bot size={18} />
                  </div>
                )}

                <div>
                  {/* Adaptive Follow-up Tag */}
                  {msg.isAdaptiveFollowUp && (
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      background: 'var(--accent-warm-light)',
                      color: 'var(--accent-warm)',
                      border: '1px solid var(--accent-warm-border)',
                      padding: '0.15rem 0.55rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      marginBottom: '0.35rem'
                    }}>
                      <Sparkles size={11} /> Adaptive Follow-up
                    </div>
                  )}

                  <div style={{
                    background: isAi ? 'var(--bg-card)' : 'var(--text-primary)',
                    color: isAi ? 'var(--text-primary)' : '#FFF',
                    border: isAi ? '1px solid var(--border-light)' : 'none',
                    padding: '1rem 1.25rem',
                    borderRadius: isAi ? '0 var(--radius-md) var(--radius-md) var(--radius-md)' : 'var(--radius-md) 0 var(--radius-md) var(--radius-md)',
                    fontSize: '0.9rem',
                    lineHeight: 1.5,
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    {msg.text}
                  </div>

                  <div style={{
                    fontSize: '0.7rem',
                    color: 'var(--text-muted)',
                    marginTop: '0.25rem',
                    textAlign: isAi ? 'left' : 'right'
                  }}>
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            );
          })}

          {isAiThinking && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
              <Bot size={16} />
              <span>Agent Turing is formulating adaptive question...</span>
            </div>
          )}
        </div>

        {/* Suggestion Chips */}
        <div style={{ padding: '0.5rem 1.25rem', background: 'var(--bg-card)', borderTop: '1px solid var(--border-light)' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
            QUICK RESPONSE SUGGESTIONS (PROTOTYPE):
          </div>
          <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => handleSend(s)}
                style={{
                  fontSize: '0.725rem',
                  padding: '0.25rem 0.65rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-subtle)',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border-light)',
                  whiteSpace: 'nowrap'
                }}
              >
                "{s.slice(0, 45)}..."
              </button>
            ))}
          </div>
        </div>

        {/* Input Box */}
        <div style={{
          padding: '1rem 1.25rem',
          background: 'var(--bg-card)',
          borderTop: '1px solid var(--border-light)',
          display: 'flex',
          gap: '0.75rem'
        }}>
          <textarea
            rows={2}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your technical response here..."
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            style={{
              flex: 1,
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-strong)',
              fontSize: '0.875rem',
              outline: 'none',
              resize: 'none'
            }}
          />

          <button
            onClick={() => handleSend()}
            disabled={!inputText.trim()}
            className="btn-primary"
            style={{ padding: '0 1.25rem' }}
          >
            <Send size={18} />
          </button>
        </div>
      </div>

      {/* RIGHT SIDEBAR: Live Interview Progress & Criteria */}
      <div className="saas-card" style={{
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        justify: 'space-between',
        borderRadius: 'var(--radius-lg)'
      }}>
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
            INTERVIEW PROGRESS
          </div>

          <div style={{
            background: 'var(--bg-subtle)',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.25rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem' }}>
              <span>Questions Covered</span>
              <span>{questionCount} / 4</span>
            </div>
            <div style={{ height: '6px', width: '100%', background: 'var(--border-light)', borderRadius: '99px' }}>
              <div style={{ height: '100%', width: `${(questionCount / 4) * 100}%`, background: 'var(--text-primary)', borderRadius: '99px' }} />
            </div>
          </div>

          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
            EVALUATED SKILL DOMAINS
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {[
              { label: 'Event Loop & Call Stack', evaluated: true },
              { label: 'Microtask vs Macrotask', evaluated: true },
              { label: 'Promise Internal States', evaluated: true },
              { label: 'V8 Memory Management', evaluated: false }
            ].map((d, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justify: 'space-between', fontSize: '0.8125rem' }}>
                <span style={{ color: d.evaluated ? 'var(--text-primary)' : 'var(--text-muted)', fontWeight: d.evaluated ? 600 : 400 }}>
                  {d.label}
                </span>
                {d.evaluated ? (
                  <CheckCircle2 size={15} color="var(--status-strong)" />
                ) : (
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Pending</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Complete & Evaluate Button */}
        <button
          onClick={onFinishInterview}
          className="btn-primary"
          style={{ width: '100%', padding: '0.85rem', marginTop: '1.5rem', background: 'var(--accent-warm)' }}
        >
          <Award size={18} />
          <span>Finish & Evaluate Interview</span>
        </button>
      </div>
    </div>
  );
}
