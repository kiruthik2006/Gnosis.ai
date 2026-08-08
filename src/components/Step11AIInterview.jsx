import React, { useState, useEffect } from 'react';
import { 
  Bot, Mic, MicOff, Send, Sparkles, CheckCircle2, 
  Award, Activity, Clock, ShieldCheck, Zap, AlertCircle, FileText, ChevronRight
} from 'lucide-react';
import { MOCK_INTERVIEW_SCRIPT } from '../data/mockData';

export default function Step11AIInterview({ selectedCandidate, onFinishInterview }) {
  const candidateObj = selectedCandidate || {
    member: { id: 'CAND-002', name: 'Alex Turner', jobRole: 'Backend Software Engineer', yearsExperience: 5 }
  };

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [questionCount, setQuestionCount] = useState(1);
  const [isMicActive, setIsMicActive] = useState(true);
  const [sessionId] = useState(() => `session-${candidateObj.member?.id || 'CAND-002'}-${Date.now()}`);
  const [interviewFeedback, setInterviewFeedback] = useState(null);
  const [isApiConnected, setIsApiConnected] = useState(false);

  // Initialize interview with Backend API POST /api/interview
  useEffect(() => {
    let isMounted = true;
    setIsAiThinking(true);

    fetch('http://localhost:8000/api/interview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: sessionId,
        candidate: candidateObj
      })
    })
      .then(res => {
        if (!res.ok) throw new Error('API server returned error');
        return res.json();
      })
      .then(data => {
        if (!isMounted) return;
        setIsApiConnected(true);
        setIsAiThinking(false);
        if (data.reply) {
          setMessages([{
            role: 'ai',
            text: data.reply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }]);
        }
      })
      .catch(err => {
        console.warn('FastAPI server offline, using client simulation:', err);
        if (!isMounted) return;
        setIsApiConnected(false);
        setIsAiThinking(false);
        setMessages([
          {
            role: 'ai',
            text: `Welcome ${candidateObj.member?.name || 'Candidate'}. I am Agent Turing, your AI interviewer. Let's begin by testing your understanding of your Day 12 mission: Prompt Engineering Fundamentals. Can you explain zero-shot vs few-shot system prompting?`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      });

    return () => { isMounted = false; };
  }, [sessionId]);

  const handleSend = (textToSend = inputText) => {
    if (!textToSend.trim() || isAiThinking) return;

    const userMsg = {
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsAiThinking(true);

    if (isApiConnected) {
      // Live API Call to FastAPI http://localhost:8000/api/interview
      fetch('http://localhost:8000/api/interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: sessionId,
          message: textToSend
        })
      })
        .then(res => res.json())
        .then(data => {
          setIsAiThinking(false);
          setQuestionCount(prev => prev + 1);
          if (data.reply) {
            setMessages(prev => [
              ...prev,
              {
                role: 'ai',
                isAdaptiveFollowUp: true,
                text: data.reply,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }
            ]);
          }
          if (data.done && data.feedback) {
            setInterviewFeedback(data.feedback);
          }
        })
        .catch(err => {
          console.error('API call failed:', err);
          setIsAiThinking(false);
        });
    } else {
      // Fallback Simulation Mode
      setTimeout(() => {
        setIsAiThinking(false);
        setQuestionCount(prev => Math.min(8, prev + 1));
        const aiReply = {
          role: 'ai',
          isAdaptiveFollowUp: true,
          text: `Great response. Probing deeper into ${candidateObj.member?.jobRole || 'Engineering'}: How does your architectural approach handle vector embedding similarity indexing when scaling to 10M+ documents?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, aiReply]);
      }, 1100);
    }
  };

  // Quick suggestion chips
  const suggestions = [
    "Zero-shot provides no examples, relying purely on instruction tuning, whereas few-shot supplies in-context demonstrations.",
    "Promises enter the Microtask queue which executes before macrotasks (setTimeout).",
    "We use HNSW indexing in vector databases to achieve sub-linear top-k similarity search latency."
  ];

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

      {/* LEFT SIDEBAR: AI Interviewer Profile & Candidate Context */}
      <div className="glass-card" style={{
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        justify: 'space-between',
        borderRadius: 'var(--radius-xl)'
      }}>
        <div>
          {/* Avatar Profile */}
          <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
            <div style={{
              width: '76px',
              height: '76px',
              margin: '0 auto 0.85rem auto',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #18181B 0%, #064E3B 100%)',
              color: '#FFF',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              boxShadow: '0 8px 24px rgba(6, 78, 59, 0.3)',
              border: '2px solid rgba(16, 185, 129, 0.4)',
              position: 'relative'
            }}>
              <Bot size={38} color="#10B981" />
              <div style={{
                position: 'absolute',
                bottom: '2px',
                right: '2px',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                background: '#10B981',
                border: '2.5px solid #FFF',
                boxShadow: '0 0 8px #10B981'
              }} className="pulse-glow" />
            </div>

            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: 0 }}>
              Agent Turing
            </h3>
            <div style={{ fontSize: '0.785rem', color: 'var(--text-secondary)', fontWeight: 600, marginTop: '0.15rem' }}>
              AI Technical Evaluator
            </div>
            
            <div style={{ marginTop: '0.55rem' }}>
              <span className="badge badge-strong" style={{ fontSize: '0.65rem', padding: '0.25rem 0.65rem', gap: '0.35rem' }}>
                <Zap size={11} fill="#10B981" /> FASTAPI API CONNECTED
              </span>
            </div>
          </div>

          {/* Active Candidate Profile Banner */}
          <div style={{
            background: 'rgba(236, 253, 245, 0.9)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: 'var(--radius-lg)',
            padding: '0.85rem 1rem',
            marginBottom: '1rem'
          }}>
            <div style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#047857', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              INTERVIEWEE PROFILE
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: 850, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
              {candidateObj.member?.name || 'Candidate'}
            </div>
            <div style={{ fontSize: '0.785rem', color: 'var(--text-secondary)' }}>
              {candidateObj.member?.jobRole} ({candidateObj.member?.yearsExperience} Yrs)
            </div>
          </div>

          {/* Live Audio Visualizer */}
          <div style={{
            background: 'rgba(243, 239, 231, 0.6)',
            border: '1px solid rgba(232, 226, 213, 0.8)',
            padding: '0.85rem 0.75rem',
            borderRadius: 'var(--radius-lg)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.6875rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.05em', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
              Speech Spectrum
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px', height: '24px' }}>
              {[12, 22, 16, 28, 18, 24, 26, 14, 18, 10].map((h, i) => (
                <div
                  key={i}
                  style={{
                    width: '3px',
                    height: `${isAiThinking ? Math.min(24, h + 4) : h}px`,
                    background: isAiThinking ? '#10B981' : 'var(--accent-warm)',
                    borderRadius: '4px',
                    transition: 'all 0.15s ease'
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Audio Mic Toggle Button */}
        <button
          onClick={() => setIsMicActive(!isMicActive)}
          className={isMicActive ? 'btn-secondary' : 'btn-primary'}
          style={{ 
            width: '100%', 
            padding: '0.75rem', 
            fontSize: '0.785rem',
            border: isMicActive ? '1px solid rgba(16,185,129,0.4)' : 'none'
          }}
        >
          {isMicActive ? <Mic size={15} color="#10B981" /> : <MicOff size={15} />}
          <span>{isMicActive ? 'Voice STT Active' : 'Enable Voice Mic'}</span>
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
          padding: '1rem 1.35rem',
          borderBottom: '1px solid rgba(232, 226, 213, 0.7)',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between'
        }}>
          <div>
            <div style={{ fontWeight: 850, fontSize: '1.05rem', color: 'var(--text-primary)', letterSpacing: '-0.015em' }}>
              Live Technical Interview Chat
            </div>
            <div style={{ fontSize: '0.785rem', color: 'var(--text-secondary)', marginTop: '0.1rem' }}>
              Target: <strong style={{ color: 'var(--text-primary)' }}>{candidateObj.member?.name} ({candidateObj.member?.id || 'CAND-002'})</strong>
            </div>
          </div>

          <span className="badge badge-strong" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.35rem 0.75rem' }}>
            <Activity size={14} /> POST /api/interview
          </span>
        </div>

        {/* Messages Stream */}
        <div style={{
          flex: 1,
          padding: '1.25rem',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.15rem',
          background: 'rgba(250, 248, 245, 0.4)'
        }}>
          {messages.map((msg, idx) => {
            const isAi = msg.role === 'ai';
            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  gap: '0.75rem',
                  alignSelf: isAi ? 'flex-start' : 'flex-end',
                  maxWidth: '85%'
                }}
              >
                {isAi && (
                  <div style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #18181B 0%, #064E3B 100%)',
                    color: '#10B981',
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'center',
                    flexShrink: 0,
                    boxShadow: '0 4px 12px rgba(6,78,59,0.2)'
                  }}>
                    <Bot size={18} />
                  </div>
                )}

                <div>
                  <div style={{
                    background: isAi ? 'rgba(255, 255, 255, 0.95)' : 'linear-gradient(135deg, #18181B 0%, #04241C 100%)',
                    color: isAi ? 'var(--text-primary)' : '#FFFFFF',
                    border: isAi ? '1px solid rgba(232, 226, 213, 0.9)' : 'none',
                    borderLeft: isAi ? '3px solid #10B981' : 'none',
                    padding: '1rem 1.25rem',
                    borderRadius: isAi ? '0 var(--radius-md) var(--radius-md) var(--radius-md)' : 'var(--radius-md) 0 var(--radius-md) var(--radius-md)',
                    fontSize: '0.9rem',
                    lineHeight: 1.55,
                    boxShadow: isAi ? '0 4px 16px rgba(28, 27, 26, 0.04)' : '0 6px 20px rgba(0, 0, 0, 0.18)'
                  }}>
                    {msg.text}
                  </div>

                  <div style={{
                    fontSize: '0.6875rem',
                    fontWeight: 500,
                    color: 'var(--text-muted)',
                    marginTop: '0.3rem',
                    textAlign: isAi ? 'left' : 'right',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    justify: 'isAi' ? 'flex-start' : 'flex-end'
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
              padding: '0.65rem 1.1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-light)',
              maxWidth: '300px',
              fontSize: '0.8125rem',
              color: 'var(--text-secondary)'
            }}>
              <Bot size={16} color="#10B981" />
              <span>Agent Turing evaluating & replying...</span>
            </div>
          )}

          {/* Final Feedback Report Component when interview is done */}
          {interviewFeedback && (
            <div style={{
              background: 'linear-gradient(145deg, #18181B 0%, #064E3B 100%)',
              color: '#FFF',
              borderRadius: '20px',
              padding: '1.35rem',
              border: '2px solid #10B981',
              boxShadow: '0 12px 32px rgba(16, 185, 129, 0.25)',
              marginTop: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem' }}>
                <CheckCircle2 size={20} color="#10B981" />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 850, margin: 0, color: '#FFF' }}>
                  Interview Completed — Evaluation Feedback Report
                </h3>
              </div>

              <p style={{ fontSize: '0.85rem', color: '#D1D5DB', lineHeight: 1.45, marginBottom: '1rem' }}>
                {interviewFeedback.summary}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.8125rem' }}>
                <div>
                  <h4 style={{ color: '#10B981', fontWeight: 800, margin: '0 0 0.35rem 0' }}>✓ Key Strengths</h4>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#E5E7EB', lineHeight: 1.4 }}>
                    {interviewFeedback.strengths?.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>

                <div>
                  <h4 style={{ color: '#F59E0B', fontWeight: 800, margin: '0 0 0.35rem 0' }}>⚠️ Technical Gaps</h4>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#E5E7EB', lineHeight: 1.4 }}>
                    {interviewFeedback.gaps?.map((g, i) => <li key={i}>{g}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div style={{ 
          padding: '0.55rem 1.15rem', 
          background: 'rgba(255, 255, 255, 0.85)', 
          borderTop: '1px solid rgba(232, 226, 213, 0.7)' 
        }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            SUGGESTED TECHNICAL ANSWERS:
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.2rem' }}>
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => handleSend(s)}
                style={{
                  fontSize: '0.725rem',
                  padding: '0.3rem 0.65rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(243, 239, 231, 0.8)',
                  color: 'var(--text-primary)',
                  border: '1px solid rgba(214, 207, 190, 0.8)',
                  whiteSpace: 'nowrap',
                  fontWeight: 500,
                  cursor: 'pointer'
                }}
              >
                "{s.slice(0, 42)}..."
              </button>
            ))}
          </div>
        </div>

        {/* Input Controls Box */}
        <div style={{
          padding: '0.85rem 1.15rem',
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
              placeholder="Type your technical answer to Agent Turing..."
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              style={{
                width: '100%',
                padding: '0.65rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                border: '1.5px solid var(--border-strong)',
                fontSize: '0.85rem',
                outline: 'none',
                resize: 'none',
                background: '#FFFFFF'
              }}
            />
          </div>

          <button
            onClick={() => handleSend()}
            disabled={!inputText.trim() || isAiThinking}
            className="btn-primary"
            style={{ 
              height: '48px', 
              padding: '0 1.35rem', 
              background: inputText.trim() ? 'linear-gradient(135deg, #18181B 0%, #04241C 100%)' : '#E5E7EB',
              color: inputText.trim() ? '#FFFFFF' : '#9CA3AF',
              border: 'none'
            }}
          >
            <Send size={16} />
          </button>
        </div>
      </div>

      {/* RIGHT SIDEBAR: Live Session Metrics & Finish Action */}
      <div className="glass-card" style={{
        padding: '1.35rem',
        display: 'flex',
        flexDirection: 'column',
        justify: 'space-between',
        borderRadius: 'var(--radius-xl)'
      }}>
        <div>
          <div style={{ fontSize: '0.725rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
            SESSION METRICS
          </div>

          <div style={{
            background: 'rgba(243, 239, 231, 0.6)',
            padding: '1rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid rgba(232, 226, 213, 0.8)',
            marginBottom: '1.25rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 800, marginBottom: '0.45rem', color: 'var(--text-primary)' }}>
              <span>Questions Asked</span>
              <span>{questionCount} / 8</span>
            </div>
            <div style={{ height: '7px', width: '100%', background: 'rgba(214, 207, 190, 0.6)', borderRadius: '99px', overflow: 'hidden' }}>
              <div style={{ 
                height: '100%', 
                width: `${(questionCount / 8) * 100}%`, 
                background: 'linear-gradient(90deg, #10B981 0%, #059669 100%)', 
                borderRadius: '99px',
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>

          <div style={{ fontSize: '0.725rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
            CURRICULUM MISSIONS
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', maxHeight: '240px', overflowY: 'auto' }}>
            {(candidateObj.missions || [
              { day: 7, title: 'Embeddings Explained', passed: true },
              { day: 12, title: 'Prompt Engineering', passed: true },
              { day: 16, title: 'Chatbot Backend API', passed: true },
              { day: 22, title: 'Multi-Agent Orchestration', passed: true }
            ]).slice(0, 5).map((m, i) => (
              <div 
                key={i} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  fontSize: '0.785rem',
                  padding: '0.45rem 0.65rem',
                  borderRadius: 'var(--radius-sm)',
                  background: m.passed ? 'rgba(240, 253, 244, 0.8)' : 'rgba(254, 242, 242, 0.8)',
                  border: m.passed ? '1px solid rgba(187, 247, 208, 0.8)' : '1px solid rgba(254, 202, 202, 0.8)'
                }}
              >
                <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.75rem' }}>
                  Day {m.day}: {m.title.slice(0, 20)}...
                </span>
                {m.passed ? (
                  <CheckCircle2 size={15} color="#10B981" />
                ) : (
                  <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#EF4444' }}>Skipped</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Finish & Evaluate Action Button */}
        <button
          onClick={onFinishInterview}
          className="btn-primary"
          style={{ 
            width: '100%', 
            padding: '0.85rem', 
            marginTop: '1.25rem', 
            background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
            border: 'none',
            fontSize: '0.85rem',
            gap: '0.5rem',
            boxShadow: '0 4px 16px rgba(5, 150, 105, 0.3)'
          }}
        >
          <Award size={16} />
          <span>Finish & Generate Feedback</span>
        </button>
      </div>
    </div>
  );
}
