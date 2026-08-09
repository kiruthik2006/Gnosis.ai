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
  const [preGoalSheet, setPreGoalSheet] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isGeneratingGoal, setIsGeneratingGoal] = useState(true);

  // Initialize interview with Backend API POST /api/pre-goal first
  useEffect(() => {
    let isMounted = true;
    setIsGeneratingGoal(true);

    const payload = {
      sessionId: sessionId,
      candidate: candidateObj
    };
    console.log('[Step11AIInterview] 📤 PRE-GOAL request payload:', JSON.stringify(payload));

    fetch('http://localhost:8000/api/pre-goal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(async res => {
        if (!res.ok) throw new Error('Failed to fetch pre-goal sheet');
        return await res.json();
      })
      .then(data => {
        if (!isMounted) return;
        setPreGoalSheet(data);
        setIsGeneratingGoal(false);
        setIsApiConnected(true);
      })
      .catch(err => {
        console.error('[Step11AIInterview] ❌ Pre-goal failed:', err);
        if (!isMounted) return;
        setIsGeneratingGoal(false);
        setIsApiConnected(false);
      });

    return () => { isMounted = false; };
  }, [sessionId]);

  const startInterview = () => {
    setHasStarted(true);
    setIsAiThinking(true);

    const payload = {
      sessionId: sessionId,
      candidate: candidateObj
    };
    console.log('[Step11AIInterview] 📤 INIT request payload:', JSON.stringify(payload));

    fetch('http://localhost:8000/api/interview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(async res => {
        const body = await res.json();
        if (!res.ok) throw new Error(`Server error ${res.status}`);
        return body;
      })
      .then(data => {
        setIsApiConnected(true);
        setIsAiThinking(false);
        if (data.reply) {
          setMessages([{
            role: 'ai',
            text: data.reply,
            uiCue: data.ui_cue,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }]);
        }
      })
      .catch(err => {
        console.error('[Step11AIInterview] ❌ Init failed:', err.message);
        setIsApiConnected(false);
        setIsAiThinking(false);
        setMessages([{
          role: 'ai',
          text: '⚠️ Could not connect to the interview server. Please check your backend.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      });
  };


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

    const sendPayload = { sessionId: sessionId, message: textToSend };
    console.log('[Step11AIInterview] 📤 SEND payload:', JSON.stringify(sendPayload).substring(0, 200));

    // Always attempt live API Call to FastAPI http://localhost:8000/api/interview
    fetch('http://localhost:8000/api/interview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sendPayload)
    })
      .then(async res => {
        console.log('[Step11AIInterview] 📥 SEND response status:', res.status, res.statusText);
        const body = await res.json();
        console.log('[Step11AIInterview] 📥 SEND response body:', JSON.stringify(body).substring(0, 300));
        if (!res.ok) {
          console.error('[Step11AIInterview] ❌ Server error on SEND:', res.status, body);
          throw new Error(`Server error ${res.status}: ${body.detail || JSON.stringify(body)}`);
        }
        return body;
      })
      .then(data => {
        setIsApiConnected(true);
        setIsAiThinking(false);
        setQuestionCount(prev => prev + 1);
        console.log('[Step11AIInterview] ✅ AI reply received, done:', data.done);
        if (data.reply) {
          setMessages(prev => [
            ...prev,
            {
              role: 'ai',
              isAdaptiveFollowUp: true,
              text: data.reply,
              uiCue: data.ui_cue,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]);
        }
        if (data.done && data.feedback) {
          setInterviewFeedback(data.feedback);
        }
      })
      .catch(err => {
        console.error('[Step11AIInterview] ❌ SEND failed:', err.message);
        console.error('[Step11AIInterview] SessionId:', sessionId);
        console.error('[Step11AIInterview] Message sent:', textToSend);
        setIsApiConnected(false);
        setIsAiThinking(false);
        setMessages(prev => [
          ...prev,
          {
            role: 'ai',
            isAdaptiveFollowUp: true,
            text: '⚠️ Could not reach the interview server. Please make sure the backend is running on http://localhost:8000 and try again.',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      });
  };

  // Quick suggestion chips
  const suggestions = [
    "Zero-shot provides no examples, relying purely on instruction tuning, whereas few-shot supplies in-context demonstrations.",
    "Promises enter the Microtask queue which executes before macrotasks (setTimeout).",
    "We use HNSW indexing in vector databases to achieve sub-linear top-k similarity search latency."
  ];

  return (
    <div style={{
      maxWidth: '1280px',
      width: '100%',
      margin: '0 auto',
      padding: '1.25rem 1.25rem 1.75rem',
      flex: 1,
      minHeight: 'calc(100vh - 72px)',
      display: 'grid',
      gridTemplateColumns: '270px 1fr 290px',
      gap: '1.25rem',
      boxSizing: 'border-box'
    }} className="animate-fade-in">

      {/* LEFT SIDEBAR: AI Interviewer Profile & Candidate Context */}
      <div className="glass-card" style={{
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
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
              justifyContent: 'center',
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
          justifyContent: 'space-between'
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
          {!hasStarted ? (
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start',
              margin: 'auto 0', padding: '1rem', textAlign: 'center', width: '100%'
            }}>
              {isGeneratingGoal ? (
                <div style={{ color: 'var(--text-muted)' }}>
                  <Bot size={48} className="pulse-glow" style={{ margin: '0 auto 1rem', color: '#10B981' }} />
                  <h3>Gemma 4 is drafting your pre-interview goal sheet...</h3>
                </div>
              ) : preGoalSheet ? (
                <div style={{
                  background: 'white', padding: '1.5rem 1.75rem', borderRadius: '20px',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                  boxShadow: '0 12px 32px rgba(16, 185, 129, 0.12)', maxWidth: '600px', width: '100%'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <Sparkles size={22} color="#10B981" />
                    <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 850, color: 'var(--text-primary)' }}>Interview Strategy Prepared</h3>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem', fontSize: '0.875rem', lineHeight: 1.5 }}>
                    {preGoalSheet.suggested_strategy}
                  </p>
                  
                  <div style={{ textAlign: 'left', marginBottom: '2rem' }}>
                    <h4 style={{ color: '#059669', marginBottom: '0.5rem', fontSize: '0.85rem' }}>🎯 TARGET FOCUS AREAS</h4>
                    <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--text-primary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                      {preGoalSheet.focus_areas.map((area, i) => <li key={i}>{area}</li>)}
                    </ul>
                  </div>

                  <button
                    onClick={startInterview}
                    className="btn-primary"
                    style={{ width: '100%', padding: '1rem', fontSize: '1rem' }}
                  >
                    Start Technical Interview
                  </button>
                </div>
              ) : (
                <div style={{ color: '#EF4444' }}>
                  <AlertCircle size={48} style={{ margin: '0 auto 1rem' }} />
                  <h3>Failed to generate pre-goal sheet</h3>
                  <button onClick={startInterview} className="btn-secondary" style={{ marginTop: '1rem' }}>
                    Start Interview Without Strategy
                  </button>
                </div>
              )}
            </div>
          ) : messages.map((msg, idx) => {
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
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 4px 12px rgba(6,78,59,0.2)',
                    marginTop: '2px'
                  }}>
                    <Bot size={18} style={{ display: 'block' }} />
                  </div>
                )}

                <div>
                  <div style={{
                    background: isAi ? 'rgba(255, 255, 255, 0.95)' : 'linear-gradient(135deg, #18181B 0%, #04241C 100%)',
                    color: isAi ? 'var(--text-primary)' : '#FFFFFF',
                    border: isAi 
                      ? (msg.uiCue === 'warning_pulse' ? '2px solid #EF4444' : '1px solid rgba(232, 226, 213, 0.9)')
                      : 'none',
                    borderLeft: isAi ? (msg.uiCue === 'warning_pulse' ? '4px solid #EF4444' : '3px solid #10B981') : 'none',
                    padding: '1rem 1.25rem',
                    borderRadius: isAi ? '0 var(--radius-md) var(--radius-md) var(--radius-md)' : 'var(--radius-md) 0 var(--radius-md) var(--radius-md)',
                    fontSize: '0.9rem',
                    lineHeight: 1.55,
                    boxShadow: isAi 
                      ? (msg.uiCue === 'success_confetti' ? '0 0 24px rgba(16,185,129,0.4)' : '0 4px 16px rgba(28, 27, 26, 0.04)')
                      : '0 6px 20px rgba(0, 0, 0, 0.18)',
                    position: 'relative',
                    animation: msg.uiCue === 'warning_pulse' ? 'pulse 2s infinite' : 'none'
                  }}>
                    {msg.uiCue === 'success_confetti' && (
                      <Sparkles size={20} color="#10B981" style={{ position: 'absolute', top: '-10px', right: '-10px' }} />
                    )}
                    {msg.uiCue === 'show_hint' && (
                      <div style={{ marginBottom: '0.5rem', color: '#F59E0B', fontWeight: 600, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Zap size={14} /> AI Hint Active
                      </div>
                    )}
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



        {/* Input Controls Box */}
        <div style={{
          padding: '0.85rem 1.15rem',
          background: 'rgba(255, 255, 255, 0.95)',
          borderTop: '1px solid rgba(232, 226, 213, 0.8)',
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'center',
          opacity: hasStarted ? 1 : 0.5,
          pointerEvents: hasStarted ? 'auto' : 'none'
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
        justifyContent: 'space-between',
        borderRadius: 'var(--radius-xl)'
      }}>
        <div>
          <div style={{ fontSize: '0.725rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
            INTERVIEW PROGRESS
          </div>

          {/* Live Interview Phase Indicator */}
          <div style={{
            background: 'rgba(243, 239, 231, 0.6)',
            padding: '1rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid rgba(232, 226, 213, 0.8)',
            marginBottom: '1.25rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem' }}>
              <div style={{
                width: 8, height: 8, borderRadius: '50%',
                background: questionCount >= 8 ? '#10B981' : '#F59E0B',
                boxShadow: questionCount >= 8 ? '0 0 8px #10B981' : '0 0 8px #F59E0B',
                animation: questionCount < 8 ? 'pulse 1.5s infinite' : 'none'
              }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: questionCount >= 8 ? '#059669' : '#D97706' }}>
                {questionCount >= 8 ? 'Evaluation Ready' : 'Interview In Progress'}
              </span>
            </div>

            {/* Phase Steps */}
            {[
              { label: 'Opening', minQ: 1, icon: '👋' },
              { label: 'Core Probing', minQ: 3, icon: '🔍' },
              { label: 'Deep Dive', minQ: 5, icon: '🧠' },
              { label: 'Final Assessment', minQ: 7, icon: '📊' },
            ].map((phase, i) => {
              const isActive = questionCount >= phase.minQ && questionCount < (i < 3 ? [3, 5, 7, 99][i] : 99);
              const isComplete = questionCount >= [3, 5, 7, 8][i];
              return (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '0.6rem',
                  padding: '0.35rem 0',
                  opacity: questionCount >= phase.minQ ? 1 : 0.4
                }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%',
                    background: isComplete ? '#10B981' : isActive ? '#F59E0B' : 'rgba(214,207,190,0.5)',
                    color: isComplete || isActive ? '#FFF' : 'var(--text-muted)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.65rem', fontWeight: 800,
                    transition: 'all 0.3s ease'
                  }}>
                    {isComplete ? '✓' : phase.icon}
                  </div>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: isActive ? 800 : 600,
                    color: isActive ? 'var(--text-primary)' : isComplete ? '#059669' : 'var(--text-muted)'
                  }}>
                    {phase.label}
                  </span>
                  {i < 3 && (
                    <div style={{
                      position: 'absolute', left: '2.15rem',
                      top: '100%', width: 2, height: 6,
                      background: isComplete ? '#10B981' : 'rgba(214,207,190,0.5)'
                    }} />
                  )}
                </div>
              );
            })}

            {/* Minimal turn counter */}
            <div style={{
              marginTop: '0.65rem', paddingTop: '0.55rem',
              borderTop: '1px solid rgba(214,207,190,0.5)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>Turns completed</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 850, color: 'var(--text-primary)' }}>
                {questionCount}
              </span>
            </div>
          </div>

          <div style={{ fontSize: '0.725rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
            CANDIDATE LEARNING HISTORY
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1, minHeight: '200px', overflowY: 'auto', paddingRight: '4px' }}>
            {(candidateObj.missions || []).map((m, i) => {
              const isPassed = m.passed !== false && !m.skipped;
              const isSkipped = m.skipped === true;
              const attempts = m.attempts || 1;
              return (
                <div 
                  key={i} 
                  style={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    padding: '0.55rem 0.7rem',
                    borderRadius: 'var(--radius-md)',
                    background: isSkipped 
                      ? 'rgba(254, 242, 242, 0.6)' 
                      : isPassed 
                        ? 'rgba(240, 253, 244, 0.7)' 
                        : 'rgba(255, 251, 235, 0.7)',
                    border: isSkipped 
                      ? '1px solid rgba(254, 202, 202, 0.6)' 
                      : isPassed 
                        ? '1px solid rgba(187, 247, 208, 0.6)' 
                        : '1px solid rgba(253, 230, 138, 0.6)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.4rem' }}>
                    <span style={{ 
                      fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-primary)', 
                      lineHeight: 1.3, flex: 1 
                    }}>
                      {m.title}
                    </span>
                    {isSkipped ? (
                      <span style={{ 
                        fontSize: '0.6rem', fontWeight: 800, color: '#DC2626', 
                        background: 'rgba(254,226,226,0.8)', padding: '0.1rem 0.4rem', 
                        borderRadius: '4px', whiteSpace: 'nowrap', flexShrink: 0
                      }}>SKIPPED</span>
                    ) : isPassed ? (
                      <CheckCircle2 size={14} color="#10B981" style={{ flexShrink: 0, marginTop: 1 }} />
                    ) : (
                      <AlertCircle size={14} color="#F59E0B" style={{ flexShrink: 0, marginTop: 1 }} />
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                      Day {m.day}
                    </span>
                    {!isSkipped && (
                      <span style={{ 
                        fontSize: '0.6rem', fontWeight: 700,
                        color: attempts > 3 ? '#DC2626' : attempts > 1 ? '#D97706' : '#059669'
                      }}>
                        {attempts === 1 ? '1st try ✨' : `${attempts} attempts`}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            {(!candidateObj.missions || candidateObj.missions.length === 0) && (
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', padding: '1rem 0' }}>
                No mission history available
              </div>
            )}
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
