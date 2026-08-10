import React, { useState } from 'react';
import { 
  ChevronRight, ArrowRight, TrendingUp, BookOpen, Clock, Award, 
  ShieldCheck, CheckCircle2, Search, Bell, Sparkles, Zap, Flame, 
  Terminal, AlertTriangle, RefreshCw, Send, Activity, Calendar, User, ChevronDown,
  FileText, MessageSquareCode, X, Radio, Layers, Cpu, HelpCircle, GitBranch, Check, Eye, Sliders
} from 'lucide-react';

const CANDIDATE_PROFILES = [
  {
    member: {
      id: "CAND-001",
      name: "Sarah Johnson",
      jobRole: "Senior Data Engineer",
      yearsExperience: 9,
      education: "MS Computer Science",
      status: "COMPLETED"
    },
    signals: { commitDays: 28, missionsCompleted: 30, missionsFirstTry: 20 },
    readinessScore: 94,
    surge: "+14.2%",
    confidence: 96,
    consistency: 94,
    recovery: 91,
    cognitiveState: "ENGAGED",
    responseConsistency: "HIGH",
    promptSensitivity: "LOW",
    lastEvaluated: "8 sec ago",
    missions: [
      { day: 1, title: "Python Async I/O", passed: true, attempts: 1, score: 92, time: "06:12", correctness: 94, weakness: "Task cancellation", recovery: "+12%" },
      { day: 7, title: "Embeddings Explained", passed: true, attempts: 1, score: 95, time: "07:45", correctness: 97, weakness: "Cosine distance thresholding", recovery: "+18%" },
      { day: 14, title: "Vector DB Indexing (HNSW)", passed: true, attempts: 1, score: 98, time: "09:30", correctness: 99, weakness: "M parameter memory overhead", recovery: "+22%" },
      { day: 18, title: "RAG Pipeline Retrieval", passed: true, attempts: 2, score: 88, time: "11:15", correctness: 91, weakness: "Re-ranking latency", recovery: "+16%" },
      { day: 22, title: "Multi-Agent Orchestration", passed: true, attempts: 2, score: 90, time: "12:00", correctness: 92, weakness: "Deadlock prevention", recovery: "+20%" },
      { day: 31, title: "Capstone Live System Demo", passed: true, attempts: 1, score: 99, time: "15:40", correctness: 100, weakness: "None detected", recovery: "+28%" }
    ],
    competencies: [
      { id: "sys_design", name: "System Design", score: 95, confidence: 96, consistency: 94, attempts: 4, evidence: ["✓ HNSW vector indexing architecture", "✓ Distributed cluster sharding", "✓ Microservice API rate-limiting"], gaps: ["△ Peak load memory caps"], reliability: 95, x: 200, y: 50 },
      { id: "async_js", name: "Async & Distributed", score: 98, confidence: 97, consistency: 96, attempts: 2, evidence: ["✓ Async event stream pipelines", "✓ Non-blocking queue workers"], gaps: ["△ Cancellation handling"], reliability: 97, x: 330, y: 130 },
      { id: "databases", name: "Databases & RAG", score: 94, confidence: 93, consistency: 92, attempts: 3, evidence: ["✓ Hybrid dense-sparse retrieval", "✓ pgvector query optimization"], gaps: ["△ Cold-start caching"], reliability: 94, x: 300, y: 270 },
      { id: "prompt_eng", name: "Prompt Engineering", score: 82, confidence: 80, consistency: 78, attempts: 5, evidence: ["✓ Few-shot chain-of-thought", "✓ Structured JSON schema output"], gaps: ["△ Temperature sensitivity"], reliability: 83, x: 100, y: 270 },
      { id: "debugging", name: "Root Cause Debugging", score: 96, confidence: 95, consistency: 94, attempts: 2, evidence: ["✓ Memory leak heapsnapshot analysis", "✓ Trace propagation"], gaps: ["None"], reliability: 96, x: 70, y: 130 }
    ],
    inference: {
      pattern: "High conceptual retention & rapid failure recovery",
      difficulty: 88,
      confidence: 96,
      hesitation: 22,
      transfer: 92,
      quote: "Candidate reasons through architectural trade-offs from first principles rather than memorizing boilerplate."
    },
    liveStream: {
      agentState: "probing → HNSW vector indexing trade-offs",
      question: "Explain the latency and recall trade-offs of HNSW vs IVF indexing in massive vector search.",
      answer: "HNSW maintains a multi-layer graph providing sub-linear log(N) search time at higher RAM usage, whereas IVF partitions vectors into Voronoi cells requiring periodic centroid rebalancing.",
      analysis: ["✓ Precise mathematical complexity bounds", "✓ Accurately identified RAM trade-offs", "△ Could elaborate on dynamic index updates"],
      streamConfidence: 97,
      streamDifficulty: "9.2/10"
    },
    nextProbe: {
      targetConcept: "Kubernetes memory limits during index builds",
      weakness: "DevOps peak load spikes",
      prevPerf: "80% → 86%",
      diffDelta: "+1.8",
      infoGain: 94
    }
  },
  {
    member: {
      id: "CAND-002",
      name: "Alex Turner",
      jobRole: "Backend Software Engineer",
      yearsExperience: 5,
      education: "B.Tech Computer Science",
      status: "COMPLETED"
    },
    signals: { commitDays: 22, missionsCompleted: 29, missionsFirstTry: 10 },
    readinessScore: 88,
    surge: "+12.4%",
    confidence: 94,
    consistency: 91,
    recovery: 87,
    cognitiveState: "ENGAGED",
    responseConsistency: "HIGH",
    promptSensitivity: "MODERATE",
    lastEvaluated: "12 sec ago",
    missions: [
      { day: 1, title: "JavaScript Fundamentals", passed: true, attempts: 2, score: 62, time: "05:40", correctness: 68, weakness: "Scope & hoisting", recovery: "+8%" },
      { day: 7, title: "FastAPI REST Architecture", passed: true, attempts: 1, score: 78, time: "06:50", correctness: 82, weakness: "Middleware CORS order", recovery: "+14%" },
      { day: 14, title: "Async Execution & Event Loop", passed: true, attempts: 1, score: 95, time: "08:42", correctness: 96, weakness: "Microtask ordering", recovery: "+24%" },
      { day: 18, title: "Event Loop Debugging", passed: true, attempts: 3, score: 89, time: "09:15", correctness: 91, weakness: "Macro vs microtask queue", recovery: "+18%" },
      { day: 22, title: "Prompt Engineering Basics", passed: true, attempts: 5, score: 68, time: "11:30", correctness: 70, weakness: "Zero-shot fallback", recovery: "+10%" },
      { day: 31, title: "Capstone Backend Live Demo", passed: true, attempts: 2, score: 92, time: "14:10", correctness: 94, weakness: "Prompt edge cases", recovery: "+22%" }
    ],
    competencies: [
      { id: "sys_design", name: "System Design", score: 91, confidence: 90, consistency: 88, attempts: 3, evidence: ["✓ Scalable REST API routing", "✓ Load balancer session sticky strategy"], gaps: ["△ Distributed caching invalidation"], reliability: 90, x: 200, y: 50 },
      { id: "async_js", name: "Async JS & Event Loop", score: 96, confidence: 94, consistency: 91, attempts: 7, evidence: ["✓ Event loop microtask vs macrotask execution", "✓ Promise chaining error handling", "✓ Async queue concurrency limits"], gaps: ["△ Error propagation in nested streams", "△ Cancellation pattern edge cases"], reliability: 93, x: 330, y: 130 },
      { id: "databases", name: "Databases & ORM", score: 84, confidence: 82, consistency: 80, attempts: 4, evidence: ["✓ Relational indexing and JOIN tuning", "✓ Connection pooling"], gaps: ["△ Vector query cosine similarity fallback"], reliability: 85, x: 300, y: 270 },
      { id: "prompt_eng", name: "Prompt Engineering", score: 62, confidence: 60, consistency: 58, attempts: 5, evidence: ["✓ Basic system prompt framing"], gaps: ["△ High friction on multi-turn dialogue", "△ Unstructured output parser failures"], reliability: 64, x: 100, y: 270 },
      { id: "debugging", name: "Code Debugging", score: 94, confidence: 92, consistency: 90, attempts: 2, evidence: ["✓ Rapid call-stack trace inspection", "✓ Memory leak resolution"], gaps: ["None"], reliability: 92, x: 70, y: 130 }
    ],
    inference: {
      pattern: "Strong core engineering depth with isolated prompt friction",
      difficulty: 82,
      confidence: 94,
      hesitation: 31,
      transfer: 87,
      quote: "Candidate understands underlying computational concepts rather than memorizing superficial solutions."
    },
    liveStream: {
      agentState: "probing → async execution & microtask queueing",
      question: "Explain why Promise callbacks execute before setTimeout(fn, 0) even when setTimeout was scheduled earlier.",
      answer: "Because microtasks are processed at the end of the current task before the event loop advances to the next macrotask queue phase.",
      analysis: ["✓ Correct fundamental concept", "✓ Correct execution ordering explanation", "△ Missing browser rendering engine phase detail"],
      streamConfidence: 96,
      streamDifficulty: "8.2/10"
    },
    nextProbe: {
      targetConcept: "Retrieval fallback handling under LLM timeouts",
      weakness: "Prompt Engineering",
      prevPerf: "62% → 68%",
      diffDelta: "+1.4",
      infoGain: 91
    }
  },
  {
    member: {
      id: "CAND-003",
      name: "Emily Chen",
      jobRole: "AI Engineer",
      yearsExperience: 6,
      education: "MS Artificial Intelligence",
      status: "COMPLETED"
    },
    signals: { commitDays: 31, missionsCompleted: 31, missionsFirstTry: 30 },
    readinessScore: 99,
    surge: "+18.5%",
    confidence: 99,
    consistency: 98,
    recovery: 97,
    cognitiveState: "OPTIMAL",
    responseConsistency: "FLAWLESS",
    promptSensitivity: "NEGLIGIBLE",
    lastEvaluated: "2 sec ago",
    missions: [
      { day: 1, title: "Neural Net Foundations", passed: true, attempts: 1, score: 98, time: "05:10", correctness: 99, weakness: "None", recovery: "+15%" },
      { day: 7, title: "Embeddings & Vectors", passed: true, attempts: 1, score: 99, time: "06:30", correctness: 100, weakness: "None", recovery: "+20%" },
      { day: 14, title: "RAG Retrieval Architecture", passed: true, attempts: 1, score: 97, time: "08:10", correctness: 98, weakness: "None", recovery: "+22%" },
      { day: 18, title: "LangChain & AI Agents", passed: true, attempts: 1, score: 99, time: "09:05", correctness: 100, weakness: "None", recovery: "+25%" },
      { day: 22, title: "Multi-Agent Orchestration", passed: true, attempts: 1, score: 99, time: "10:40", correctness: 100, weakness: "None", recovery: "+28%" },
      { day: 31, title: "Capstone AI Platform", passed: true, attempts: 1, score: 100, time: "12:15", correctness: 100, weakness: "None", recovery: "+30%" }
    ],
    competencies: [
      { id: "sys_design", name: "System Design", score: 98, confidence: 99, consistency: 98, attempts: 1, evidence: ["✓ Autonomous agent mesh", "✓ High-throughput vector search"], gaps: ["None"], reliability: 99, x: 200, y: 50 },
      { id: "async_js", name: "Async & Concurrency", score: 97, confidence: 98, consistency: 97, attempts: 1, evidence: ["✓ Zero-copy streaming pipelines"], gaps: ["None"], reliability: 98, x: 330, y: 130 },
      { id: "databases", name: "Databases & RAG", score: 99, confidence: 99, consistency: 99, attempts: 1, evidence: ["✓ Context-aware chunking", "✓ Re-ranking rerankers"], gaps: ["None"], reliability: 99, x: 300, y: 270 },
      { id: "prompt_eng", name: "Prompt Engineering", score: 96, confidence: 97, consistency: 96, attempts: 1, evidence: ["✓ Dynamic meta-prompting", "✓ Self-consistency sampling"], gaps: ["None"], reliability: 97, x: 100, y: 270 },
      { id: "debugging", name: "Model Debugging", score: 98, confidence: 98, consistency: 98, attempts: 1, evidence: ["✓ Hallucination detection guardrails"], gaps: ["None"], reliability: 98, x: 70, y: 130 }
    ],
    inference: {
      pattern: "Flawless technical mastery across AI agent architectures",
      difficulty: 95,
      confidence: 99,
      hesitation: 10,
      transfer: 98,
      quote: "Demonstrates principal-level architectural maturity and first-try mastery."
    },
    liveStream: {
      agentState: "probing → multi-agent task allocation & safety guardrails",
      question: "How do you guarantee state convergence in cyclic multi-agent delegation loops?",
      answer: "By enforcing bounded recursion limits with DAG dependency validation and explicit state transition invariants at the agent router layer.",
      analysis: ["✓ Flawless architectural formulation", "✓ Comprehensive safety guardrail mitigation"],
      streamConfidence: 99,
      streamDifficulty: "9.8/10"
    },
    nextProbe: {
      targetConcept: "Distributed consensus in heterogeneous LLM clusters",
      weakness: "None",
      prevPerf: "98% → 99%",
      diffDelta: "+2.0",
      infoGain: 98
    }
  }
];

export default function Step15Dashboard({ onNavigateStep }) {
  const [selectedCandidateId, setSelectedCandidateId] = useState("CAND-002");
  const [selectedDayMission, setSelectedDayMission] = useState(null);
  const [selectedCompetency, setSelectedCompetency] = useState(null);
  const [isWhy88ModalOpen, setIsWhy88ModalOpen] = useState(false);
  const [termInput, setTermInput] = useState('');
  const [activeProbeDeployed, setActiveProbeDeployed] = useState(false);

  const currentCandidate = CANDIDATE_PROFILES.find(c => c.member.id === selectedCandidateId) || CANDIDATE_PROFILES[1];

  const handleCandidateChange = (id) => {
    setSelectedCandidateId(id);
    setSelectedDayMission(null);
    setSelectedCompetency(null);
    setActiveProbeDeployed(false);
  };

  const handleInjectProbe = () => {
    if (!termInput.trim()) return;
    setActiveProbeDeployed(true);
    setTermInput('');
  };

  return (
    <div style={{
      maxWidth: '1440px',
      width: '100%',
      height: '100%',
      margin: '0 auto',
      padding: '0.85rem 1.25rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      boxSizing: 'border-box',
      overflow: 'hidden'
    }} className="animate-fade-in">

      
      {/* ════════════════════════════════════════════════════════════════════════
          1. LIVE CANDIDATE TELEMETRY HEADER COMMAND BAR
      ════════════════════════════════════════════════════════════════════════ */}
      <div style={{
        background: 'linear-gradient(135deg, #14181F 0%, #0D1117 100%)',
        borderRadius: '16px',
        border: '1.5px solid rgba(16, 185, 129, 0.35)',
        padding: '0.75rem 1.25rem',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
        color: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem',
        flexShrink: 0
      }}>
        {/* Candidate & Live State */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ position: 'relative' }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              color: '#04241C',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: '1.2rem',
              boxShadow: '0 0 16px rgba(16, 185, 129, 0.35)'
            }}>
              {currentCandidate.member.name.charAt(0)}
            </div>
            <div style={{
              position: 'absolute', bottom: 0, right: 0,
              width: '14px', height: '14px', borderRadius: '50%',
              background: '#10B981', border: '2px solid #0D1117',
              boxShadow: '0 0 8px #10B981'
            }} className="pulse-glow" />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              {/* Candidate Dropdown */}
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <select
                  value={selectedCandidateId}
                  onChange={e => handleCandidateChange(e.target.value)}
                  style={{
                    appearance: 'none',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '99px',
                    padding: '0.25rem 1.8rem 0.25rem 0.85rem',
                    border: '1px solid rgba(16, 185, 129, 0.4)',
                    fontSize: '1.1rem',
                    fontWeight: 850,
                    color: '#FFFFFF',
                    cursor: 'pointer',
                    outline: 'none'
                  }}
                >
                  {CANDIDATE_PROFILES.map(c => (
                    <option key={c.member.id} value={c.member.id} style={{ background: '#121214', color: '#FFF' }}>
                      {c.member.name} ({c.member.jobRole})
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} color="#10B981" style={{ position: 'absolute', right: '10px', pointerEvents: 'none' }} />
              </div>

              <span style={{
                fontSize: '0.65rem', fontWeight: 800, padding: '3px 9px', borderRadius: '99px',
                background: 'rgba(16, 185, 129, 0.2)', color: '#10B981', border: '1px solid rgba(16, 185, 129, 0.4)',
                display: 'inline-flex', alignItems: 'center', gap: '4px'
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} className="pulse-glow" />
                LIVE / ANALYZING
              </span>
            </div>

            {/* Live Signal Badges */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginTop: '0.4rem', fontSize: '0.725rem', color: '#9CA3AF', flexWrap: 'wrap' }}>
              <span>🟢 Cognitive: <strong style={{ color: '#A7F3D0' }}>{currentCandidate.cognitiveState}</strong></span>
              <span>•</span>
              <span>🟢 Consistency: <strong style={{ color: '#A7F3D0' }}>{currentCandidate.responseConsistency}</strong></span>
              <span>•</span>
              <span>🟡 Sensitivity: <strong style={{ color: '#FDE68A' }}>{currentCandidate.promptSensitivity}</strong></span>
              <span>•</span>
              <span>🔵 Evaluated: <strong style={{ color: '#93C5FD' }}>{currentCandidate.lastEvaluated}</strong></span>
            </div>
          </div>
        </div>

        {/* Readiness Meter & "Why 88?" Exploration */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
              <span style={{ fontSize: '2rem', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.03em', lineHeight: 1 }}>
                {currentCandidate.readinessScore}%
              </span>
              <span style={{ fontSize: '0.785rem', fontWeight: 800, color: '#10B981' }}>
                {currentCandidate.surge} SURGE
              </span>

              <button
                onClick={() => setIsWhy88ModalOpen(true)}
                style={{
                  background: 'rgba(255, 255, 255, 0.12)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  color: '#A7F3D0',
                  fontSize: '0.6875rem',
                  fontWeight: 800,
                  padding: '2px 8px',
                  borderRadius: '99px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '3px',
                  transition: 'all 0.15s ease'
                }}
              >
                <HelpCircle size={12} /> Why {currentCandidate.readinessScore}?
              </button>
            </div>

            {/* Visual ASCII-style Progress Bar */}
            <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#10B981', letterSpacing: '0.08em', marginTop: '0.2rem' }}>
              ███████████████░ <span style={{ fontSize: '0.65rem', color: '#9CA3AF' }}>14/16 DOMAINS MASTERED</span>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.6875rem', color: '#9CA3AF', marginTop: '0.25rem' }}>
              <span>Confidence: <strong style={{ color: '#FFF' }}>{currentCandidate.confidence}%</strong></span>
              <span>Consistency: <strong style={{ color: '#FFF' }}>{currentCandidate.consistency}%</strong></span>
              <span>Recovery: <strong style={{ color: '#FFF' }}>{currentCandidate.recovery}%</strong></span>
            </div>
          </div>

          <button
            onClick={() => onNavigateStep(11)}
            style={{
              padding: '0.75rem 1.4rem',
              borderRadius: 'var(--radius-full)',
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              color: '#04241C',
              fontSize: '0.85rem',
              fontWeight: 850,
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 18px rgba(16, 185, 129, 0.4)'
            }}
          >
            <Zap size={16} fill="#04241C" />
            <span>LAUNCH LIVE SESSION →</span>
          </button>
        </div>
      </div>


      {/* ════════════════════════════════════════════════════════════════════════
          2. CANDIDATE JOURNEY (Compact Horizontal Timeline)
      ════════════════════════════════════════════════════════════════════════ */}
      <div className="glass-card" style={{ padding: '0.6rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
          <GitBranch size={13} color="#10B981" />
          <span style={{ fontSize: '0.7rem', fontWeight: 850, color: 'var(--text-primary)' }}>Journey</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0', flex: 1, position: 'relative', padding: '0.3rem 0' }}>
          <div style={{ position: 'absolute', top: '50%', left: '1rem', right: '1rem', height: '2px', background: 'linear-gradient(90deg, #10B981 0%, #3B82F6 50%, #10B981 100%)', zIndex: 0 }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', position: 'relative', zIndex: 1 }}>
            {currentCandidate.missions.slice(0, 6).map((m, idx) => {
              const isSelected = selectedDayMission?.day === m.day;
              const isCurrentPos = m.day === 18;
              return (
                <div key={idx} onClick={() => setSelectedDayMission(isSelected ? null : m)} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer', padding: '0.15rem 0.4rem', borderRadius: '99px', background: isSelected ? 'rgba(59,130,246,0.12)' : 'transparent', border: isSelected ? '1px solid rgba(59,130,246,0.3)' : '1px solid transparent', transition: 'all 0.15s ease' }}>
                  <div style={{ width: isSelected ? 12 : 9, height: isSelected ? 12 : 9, borderRadius: '50%', background: isCurrentPos ? '#3B82F6' : m.score >= 90 ? '#10B981' : '#F59E0B', border: '1.5px solid #FFF', boxShadow: '0 1px 4px rgba(0,0,0,0.15)', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.6rem', fontWeight: 800, color: 'var(--text-muted)' }}>D{m.day}</span>
                  <span style={{ fontSize: '0.625rem', fontWeight: 850, color: 'var(--text-primary)' }}>{m.score}%</span>
                </div>
              );
            })}
          </div>
        </div>
        {selectedDayMission && (
          <div className="animate-fade-in" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(248,250,252,0.95)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '8px', padding: '0.3rem 0.6rem', flexShrink: 0 }}>
            <span style={{ fontSize: '0.6rem', fontWeight: 900, background: '#3B82F6', color: '#FFF', padding: '1px 5px', borderRadius: '3px' }}>D{selectedDayMission.day}</span>
            <span style={{ fontSize: '0.6rem', fontWeight: 700, color: 'var(--text-primary)', maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{selectedDayMission.title}</span>
            <span style={{ fontSize: '0.6rem', color: '#059669', fontWeight: 800 }}>{selectedDayMission.correctness}%</span>
            <button onClick={() => setSelectedDayMission(null)} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 0, lineHeight: 1 }}><X size={11} /></button>
          </div>
        )}
      </div>

      {/* ════════════════════════════════════════════════════════════════════════
          3. MAIN COMMAND CENTER (2-Column Split)
      ════════════════════════════════════════════════════════════════════════ */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', flex: 1, minHeight: 0 }}>

        {/* LEFT: Digital Twin + AI Inference Engine */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', minHeight: 0 }}>

          {/* DIGITAL TWIN RADAR */}
          <div className="glass-card" style={{ padding: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1, minHeight: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '0.75rem', fontWeight: 850, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Cpu size={13} color="#10B981" /> Digital Twin & Competency Topology
              </h3>
              <span style={{ fontSize: '0.575rem', fontWeight: 800, color: '#2563EB', background: 'rgba(239,246,255,0.9)', padding: '2px 7px', borderRadius: '99px', border: '1px solid rgba(59,130,246,0.3)' }}>AUDITABLE EVIDENCE</span>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.9)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(232,226,213,0.85)', padding: '0.5rem', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 0 }}>
              <svg width="100%" height="100%" viewBox="0 0 400 280" preserveAspectRatio="xMidYMid meet" style={{ overflow: 'visible', maxHeight: '100%' }}>
                <polygon points="200,20 330,100 300,240 100,240 70,100" fill="rgba(16,185,129,0.04)" stroke="rgba(16,185,129,0.2)" strokeWidth="1" />
                <polygon points="200,50 295,110 270,210 130,210 105,110" fill="rgba(16,185,129,0.06)" stroke="rgba(16,185,129,0.25)" strokeWidth="1" strokeDasharray="3 3" />
                {currentCandidate.competencies.map((comp, idx) => (
                  <line key={idx} x1="200" y1="145" x2={comp.x} y2={comp.y} stroke={comp.score < 70 ? 'rgba(239,68,68,0.4)' : 'rgba(16,185,129,0.4)'} strokeWidth="1.5" />
                ))}
                <circle cx="200" cy="145" r="18" fill="#0D1117" stroke="#10B981" strokeWidth="2" />
                <text x="200" y="149" textAnchor="middle" fill="#10B981" fontSize="9" fontWeight="900">{currentCandidate.member.name.split(' ')[0].toUpperCase()}</text>
                {currentCandidate.competencies.map((comp, idx) => {
                  const isSelected = selectedCompetency?.id === comp.id;
                  const isWeak = comp.score < 70;
                  const nodeColor = isWeak ? '#EF4444' : comp.score >= 90 ? '#10B981' : '#F59E0B';
                  return (
                    <g key={idx} onClick={() => setSelectedCompetency(isSelected ? null : comp)} style={{ cursor: 'pointer' }}>
                      <circle cx={comp.x} cy={comp.y} r={isSelected ? 15 : 11} fill={nodeColor} stroke="#FFF" strokeWidth="2" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.15))" />
                      <text x={comp.x} y={comp.y + (comp.y < 145 ? -16 : 22)} textAnchor="middle" fill="var(--text-primary)" fontSize="8.5" fontWeight="850">{comp.name} ({comp.score}%)</text>
                      {isWeak && <text x={comp.x} y={comp.y + (comp.y < 145 ? -26 : 32)} textAnchor="middle" fill="#EF4444" fontSize="7.5" fontWeight="900">⚠ PROBE</text>}
                    </g>
                  );
                })}
              </svg>
            </div>
            {selectedCompetency && (
              <div className="animate-fade-in" style={{ background: 'rgba(255,255,255,0.95)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(16,185,129,0.35)', padding: '0.5rem 0.65rem', fontSize: '0.625rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>{selectedCompetency.name.toUpperCase()} — {selectedCompetency.score}%</strong>
                  <button onClick={() => setSelectedCompetency(null)} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 0 }}><X size={11} /></button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.35rem' }}>
                  <div style={{ background: 'rgba(236,253,245,0.8)', padding: '0.3rem 0.5rem', borderRadius: '4px' }}>
                    <div style={{ color: '#059669', fontWeight: 800, marginBottom: '0.15rem', fontSize: '0.575rem' }}>VERIFIED</div>
                    {selectedCompetency.evidence.map((ev, i) => <div key={i} style={{ color: 'var(--text-primary)', fontSize: '0.575rem' }}>{ev}</div>)}
                  </div>
                  <div style={{ background: 'rgba(254,243,199,0.8)', padding: '0.3rem 0.5rem', borderRadius: '4px' }}>
                    <div style={{ color: '#D97706', fontWeight: 800, marginBottom: '0.15rem', fontSize: '0.575rem' }}>GAPS</div>
                    {selectedCompetency.gaps.map((gp, i) => <div key={i} style={{ color: 'var(--text-secondary)', fontSize: '0.575rem' }}>{gp}</div>)}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* AI INFERENCE ENGINE (Compact) */}
          <div className="glass-card" style={{ padding: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '0.75rem', fontWeight: 850, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Sparkles size={13} color="#10B981" /> AI Cognitive Inference Engine
              </h3>
              <span style={{ fontSize: '0.575rem', fontWeight: 800, color: '#D97706', background: 'rgba(254,243,199,0.9)', padding: '2px 7px', borderRadius: '99px' }}>CONFIDENCE: {currentCandidate.inference.confidence}%</span>
            </div>
            <div style={{ background: 'rgba(236,253,245,0.85)', padding: '0.4rem 0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(16,185,129,0.3)', fontSize: '0.65rem', color: 'var(--text-primary)' }}>
              Pattern: <strong style={{ color: '#059669' }}>{currentCandidate.inference.pattern}</strong>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.35rem' }}>
              {[
                { label: 'DIFFICULTY', value: currentCandidate.inference.difficulty, color: '#10B981' },
                { label: 'CONFIDENCE', value: currentCandidate.inference.confidence, color: '#10B981' },
                { label: 'HESITATION', value: currentCandidate.inference.hesitation, color: '#F59E0B' },
                { label: 'TRANSFER', value: currentCandidate.inference.transfer, color: '#2563EB' },
              ].map((g, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.9)', padding: '0.3rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(232,226,213,0.8)', fontSize: '0.575rem' }}>
                  <div style={{ color: 'var(--text-muted)', fontWeight: 700 }}>{g.label}</div>
                  <div style={{ fontWeight: 850, color: g.color, fontSize: '0.7rem' }}>{g.value}%</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: '0.625rem', fontStyle: 'italic', color: 'var(--text-secondary)', background: 'rgba(248,250,252,0.9)', padding: '0.35rem 0.65rem', borderRadius: 'var(--radius-sm)', borderLeft: '2px solid #10B981' }}>
              "{currentCandidate.inference.quote}"
            </div>
          </div>
        </div>

        {/* RIGHT: Live Evaluation Stream + Adaptive Question Engine */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', minHeight: 0 }}>

          {/* LIVE EVALUATION STREAM */}
          <div style={{ background: '#0D1117', borderRadius: '16px', padding: '0.85rem', border: '1.5px solid rgba(16,185,129,0.35)', display: 'flex', flexDirection: 'column', gap: '0.5rem', boxShadow: '0 8px 24px rgba(0,0,0,0.4)', color: '#FFF', flex: 1, minHeight: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.35rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span className="pulse-glow" style={{ width: 7, height: 7, borderRadius: '50%', background: '#10B981' }} />
                <span style={{ fontSize: '0.7rem', fontWeight: 850, letterSpacing: '0.04em' }}>LIVE EVALUATION STREAM</span>
              </div>
              <span style={{ fontSize: '0.575rem', color: '#9CA3AF', fontFamily: 'var(--font-mono)' }}>AGENT TURING</span>
            </div>
            <div style={{ fontSize: '0.6rem', color: '#A7F3D0', fontWeight: 700 }}>● {currentCandidate.liveStream.agentState}</div>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.45rem 0.65rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '0.55rem', color: '#9CA3AF', fontWeight: 800, marginBottom: '0.15rem' }}>ACTIVE QUESTION</div>
              <div style={{ fontSize: '0.65rem', color: '#FFF', lineHeight: 1.35 }}>"{currentCandidate.liveStream.question}"</div>
            </div>
            <div style={{ background: 'rgba(16,185,129,0.08)', padding: '0.45rem 0.65rem', borderRadius: '6px', border: '1px solid rgba(16,185,129,0.25)' }}>
              <div style={{ fontSize: '0.55rem', color: '#10B981', fontWeight: 800, marginBottom: '0.15rem' }}>CANDIDATE RESPONSE</div>
              <div style={{ fontSize: '0.65rem', color: '#E5E7EB', lineHeight: 1.35 }}>"{currentCandidate.liveStream.answer}"</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.04)', padding: '0.4rem 0.6rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.08)', fontSize: '0.6rem' }}>
              <div style={{ fontSize: '0.55rem', color: '#F59E0B', fontWeight: 800, marginBottom: '0.15rem' }}>AI REAL-TIME REASONING</div>
              {currentCandidate.liveStream.analysis.map((an, i) => <div key={i} style={{ color: '#D1D5DB', fontSize: '0.6rem' }}>{an}</div>)}
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.2rem', color: '#9CA3AF', fontSize: '0.55rem' }}>
                <span>Confidence: <strong style={{ color: '#10B981' }}>{currentCandidate.liveStream.streamConfidence}%</strong></span>
                <span>Difficulty: <strong style={{ color: '#F59E0B' }}>{currentCandidate.liveStream.streamDifficulty}</strong></span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              <button onClick={() => onNavigateStep(11)} style={{ flex: 1, background: 'rgba(255,255,255,0.1)', color: '#FFF', border: '1px solid rgba(255,255,255,0.2)', padding: '0.35rem', borderRadius: '6px', fontSize: '0.625rem', fontWeight: 800, cursor: 'pointer' }}>DEEPER PROBE</button>
              <button onClick={() => onNavigateStep(11)} style={{ flex: 1, background: '#10B981', color: '#04241C', border: 'none', padding: '0.35rem', borderRadius: '6px', fontSize: '0.625rem', fontWeight: 850, cursor: 'pointer' }}>ACCEPT ANSWER</button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', padding: '3px 6px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <span style={{ color: '#10B981', fontFamily: 'var(--font-mono)', fontSize: '0.65rem' }}>&gt;_</span>
              <input type="text" value={termInput} onChange={e => setTermInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleInjectProbe()} placeholder="Inject prompt..." style={{ border: 'none', background: 'transparent', outline: 'none', color: '#FFF', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', width: '100%' }} />
              <button onClick={handleInjectProbe} style={{ background: 'transparent', border: 'none', color: '#10B981', cursor: 'pointer' }}><Send size={10} /></button>
            </div>
          </div>

          {/* ADAPTIVE QUESTION ENGINE (Compact) */}
          <div className="glass-card" style={{ padding: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '0.75rem', fontWeight: 850, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Sliders size={13} color="#10B981" /> Adaptive Question Engine
              </h3>
              <span style={{ fontSize: '0.575rem', fontWeight: 800, color: '#D97706', background: 'rgba(254,243,199,0.9)', padding: '2px 7px', borderRadius: '99px' }}>WEAKNESS DETECTED</span>
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>
              Target: <strong style={{ color: '#D97706' }}>{currentCandidate.nextProbe.weakness}</strong> ({currentCandidate.nextProbe.prevPerf})
            </div>
            <div style={{ background: 'rgba(236,253,245,0.9)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(16,185,129,0.3)', padding: '0.45rem 0.65rem', display: 'flex', gap: '1rem', fontSize: '0.625rem', flexWrap: 'wrap' }}>
              <span>Difficulty: <strong style={{ color: '#10B981' }}>{currentCandidate.nextProbe.diffDelta}</strong></span>
              <span>Concept: <strong style={{ color: 'var(--text-primary)' }}>{currentCandidate.nextProbe.targetConcept}</strong></span>
              <span>Info Gain: <strong style={{ color: '#059669' }}>{currentCandidate.nextProbe.infoGain}%</strong></span>
            </div>
            <button onClick={() => onNavigateStep(11)} className="btn-primary" style={{ width: '100%', padding: '0.45rem', fontSize: '0.7rem', background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', boxShadow: '0 3px 10px rgba(16,185,129,0.3)', gap: '0.35rem' }}>
              <Zap size={12} fill="#FFF" />
              <span>{activeProbeDeployed ? 'PROBE DEPLOYED ✓' : 'DEPLOY ADAPTIVE PROBE →'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════════
          4. OS TELEMETRY STRIP (Compact Horizontal)
      ════════════════════════════════════════════════════════════════════════ */}
      <div style={{ background: '#0D1117', borderRadius: '12px', padding: '0.5rem 1.25rem', border: '1px solid rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#9CA3AF', fontFamily: 'var(--font-mono)', fontSize: '0.575rem', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#10B981', fontWeight: 850, fontSize: '0.625rem' }}>
          <span className="pulse-glow" style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} />
          ENGINE ONLINE
        </div>
        <div style={{ display: 'flex', gap: '1.25rem' }}>
          <span>EVALUATED: <strong style={{ color: '#FFF' }}>14 DOMAINS</strong></span>
          <span>EVENTS: <strong style={{ color: '#FFF' }}>284</strong></span>
          <span>VECTOR: <strong style={{ color: '#10B981' }}>READY</strong></span>
          <span>GRAPH: <strong style={{ color: '#10B981' }}>SYNCED</strong></span>
          <span>AGENT: <strong style={{ color: '#A7F3D0' }}>TURING</strong></span>
          <span>LATENCY: <strong style={{ color: '#93C5FD' }}>82ms</strong></span>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════════
          5. "WHY 88?" READINESS BREAKDOWN MODAL DIALOG
      ════════════════════════════════════════════════════════════════════════ */}
      {isWhy88ModalOpen && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0, 0, 0, 0.78)', backdropFilter: 'blur(12px)',
          zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem'
        }} className="animate-fade-in">
          <div style={{
            background: '#121214', border: '1.5px solid rgba(16, 185, 129, 0.4)', borderRadius: '24px',
            maxWidth: '540px', width: '100%', padding: '1.75rem', color: '#FFF', boxShadow: '0 24px 60px rgba(0,0,0,0.6)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.75rem' }}>
              <div>
                <span style={{ fontSize: '0.6875rem', color: '#10B981', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  AUDITABLE READINESS DECONSTRUCTION
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 850, margin: '0.2rem 0 0 0', color: '#FFF' }}>
                  READINESS SCORE: {currentCandidate.readinessScore} / 100
                </h3>
              </div>
              <button onClick={() => setIsWhy88ModalOpen(false)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#9CA3AF', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X size={16} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.8125rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Technical Competency (30% wt)</span>
                <strong style={{ color: '#10B981' }}>92 / 100</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Problem Solving & Transfer (25% wt)</span>
                <strong style={{ color: '#10B981' }}>91 / 100</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Evaluation Consistency (20% wt)</span>
                <strong style={{ color: '#10B981' }}>89 / 100</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>System Communication (10% wt)</span>
                <strong style={{ color: '#93C5FD' }}>86 / 100</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Adaptability & Recovery (10% wt)</span>
                <strong style={{ color: '#10B981' }}>94 / 100</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Prompt Engineering (5% wt)</span>
                <strong style={{ color: '#EF4444' }}>62 / 100 ⚠️</strong>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.6rem', display: 'flex', justifyContent: 'space-between', fontWeight: 850 }}>
                <span>Weighted Readiness Index</span>
                <span style={{ color: '#10B981', fontSize: '1rem' }}>{currentCandidate.readinessScore} / 100</span>
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.75rem', borderRadius: 'var(--radius-md)', fontSize: '0.75rem', color: '#9CA3AF' }}>
              <div>Confidence Interval: <strong style={{ color: '#FFF', fontFamily: 'var(--font-mono)' }}>84 ─────────●───────── 91</strong></div>
              <div style={{ marginTop: '0.2rem' }}>Evidence Coverage: <strong style={{ color: '#10B981' }}>87% Verified Interactions</strong></div>
            </div>

            <button
              onClick={() => setIsWhy88ModalOpen(false)}
              className="btn-primary"
              style={{ width: '100%', marginTop: '1.25rem', padding: '0.65rem' }}
            >
              Close Readiness Deconstruction
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
