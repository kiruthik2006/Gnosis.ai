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
      margin: '0 auto',
      padding: '1.25rem 1.5rem 2rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.25rem',
      boxSizing: 'border-box'
    }} className="animate-fade-in">

      
      {/* ════════════════════════════════════════════════════════════════════════
          1. LIVE CANDIDATE TELEMETRY HEADER COMMAND BAR
      ════════════════════════════════════════════════════════════════════════ */}
      <div style={{
        background: 'linear-gradient(135deg, #14181F 0%, #0D1117 100%)',
        borderRadius: '24px',
        border: '1.5px solid rgba(16, 185, 129, 0.35)',
        padding: '1.25rem 1.75rem',
        boxShadow: '0 16px 40px rgba(0, 0, 0, 0.4)',
        color: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.25rem'
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

      {/* ════════════════════════════════════════════════════════════════════════
          MASTER COMMAND CENTER GRID (3-COLUMN LAYOUT)
      ════════════════════════════════════════════════════════════════════════ */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '240px 1fr 240px',
        gap: '1.25rem',
        alignItems: 'start'
      }}>

        {/* LEFT COLUMN: VERTICAL CANDIDATE JOURNEY */}
        <div className="glass-card" style={{ padding: '1.25rem 1rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', height: '100%', boxSizing: 'border-box' }}>
          <div>
            <h3 style={{ fontSize: '0.85rem', fontWeight: 850, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <GitBranch size={14} color="#10B981" /> Journey
            </h3>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>31-Day Timeline</div>
          </div>

          {/* Timeline Axis Container (Vertical) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative', paddingLeft: '1rem', marginTop: '0.5rem' }}>
            {/* Connecting Line (Vertical) */}
            <div style={{ position: 'absolute', top: '10px', bottom: '10px', left: '1.45rem', width: '3px', background: 'linear-gradient(180deg, #10B981 0%, #3B82F6 50%, #10B981 100%)', zIndex: 0 }} />

            {currentCandidate.missions.slice(0, 6).map((m, idx) => {
              const isSelected = selectedDayMission?.day === m.day;
              const isCurrentPos = m.day === 18;

              return (
                <div
                  key={idx}
                  onClick={() => setSelectedDayMission(isSelected ? null : m)}
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    transform: isSelected ? 'translateX(4px)' : 'none'
                  }}
                >
                  {/* Node Circle */}
                  <div style={{
                    minWidth: isSelected ? '18px' : '14px',
                    height: isSelected ? '18px' : '14px',
                    borderRadius: '50%',
                    background: isCurrentPos ? '#3B82F6' : m.score >= 90 ? '#10B981' : '#F59E0B',
                    border: isSelected ? '2px solid #18181B' : '2px solid #FFF',
                    boxShadow: isSelected ? '0 0 12px rgba(16, 185, 129, 0.6)' : '0 2px 6px rgba(0,0,0,0.15)',
                    transition: 'all 0.2s ease'
                  }} />

                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
                      <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-muted)' }}>
                        Day {m.day < 10 ? `0${m.day}` : m.day}
                      </span>
                      <span style={{ fontSize: '0.75rem', fontWeight: 850, color: 'var(--text-primary)' }}>
                        {m.score}%
                      </span>
                    </div>
                    <span style={{ fontSize: '0.625rem', color: 'var(--text-secondary)', maxWidth: '120px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                      {m.title}
                    </span>
                  </div>

                  {isCurrentPos && (
                    <span style={{
                      position: 'absolute', top: '-14px', left: '2rem', fontSize: '0.5rem', fontWeight: 900,
                      background: '#3B82F6', color: '#FFF', padding: '1px 5px', borderRadius: '99px',
                      whiteSpace: 'nowrap', boxShadow: '0 2px 4px rgba(59, 130, 246, 0.4)'
                    }}>
                      CURRENT
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Selected Day Inspector Drawer (Compact) */}
          {selectedDayMission && (
            <div className="animate-fade-in" style={{
              background: 'rgba(248, 250, 252, 0.95)',
              borderRadius: 'var(--radius-md)',
              border: '1.5px solid rgba(59, 130, 246, 0.35)',
              padding: '0.75rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              marginTop: '0.5rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ background: '#3B82F6', color: '#FFF', padding: '0.25rem 0.5rem', borderRadius: '4px', fontWeight: 900, fontSize: '0.65rem' }}>
                  DAY {selectedDayMission.day}
                </span>
                <button onClick={() => setSelectedDayMission(null)} style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', padding: 0 }}>
                  <X size={14} />
                </button>
              </div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {selectedDayMission.title}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.25rem', fontSize: '0.65rem', color: 'var(--text-secondary)' }}>
                <div>Time: <strong>{selectedDayMission.time}</strong></div>
                <div>Correct: <strong style={{ color: '#059669' }}>{selectedDayMission.correctness}%</strong></div>
              </div>
              <button
                onClick={() => onNavigateStep(11)}
                className="btn-primary"
                style={{ fontSize: '0.65rem', padding: '0.35rem', marginTop: '0.25rem', display: 'flex', justifyContent: 'center' }}
              >
                View Session
              </button>
            </div>
          )}
        </div>


        {/* CENTER COLUMN: MAIN COMMAND CENTER (SPLIT VIEW) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
          {/* LEFT COLUMN: CANDIDATE DIGITAL TWIN & AI INFERENCE ENGINE */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

          {/* CANDIDATE DIGITAL TWIN & COMPETENCY TOPOLOGY */}
          <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 850, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <Cpu size={16} color="#10B981" /> Candidate Digital Twin & Competency Topology
                </h3>
                <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Interactive cognitive node map — click any domain node for auditable evidence</span>
              </div>
              <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#2563EB', background: 'rgba(239, 246, 255, 0.9)', padding: '3px 10px', borderRadius: '99px', border: '1px solid rgba(59,130,246,0.3)' }}>
                AUDITABLE EVIDENCE
              </span>
            </div>

            {/* SVG Radar / Topology Map */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.9)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(232, 226, 213, 0.85)',
              padding: '1rem',
              position: 'relative',
              height: '320px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="100%" height="100%" viewBox="0 0 400 320" style={{ overflow: 'visible' }}>
                {/* Background Radar Rings */}
                <polygon points="200,30 330,120 300,270 100,270 70,120" fill="rgba(16, 185, 129, 0.04)" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="1" />
                <polygon points="200,60 295,130 270,240 130,240 105,130" fill="rgba(16, 185, 129, 0.06)" stroke="rgba(16, 185, 129, 0.25)" strokeWidth="1" strokeDasharray="3 3" />

                {/* Connecting Edges */}
                {currentCandidate.competencies.map((comp, idx) => (
                  <line key={idx} x1="200" y1="170" x2={comp.x} y2={comp.y} stroke={comp.score < 70 ? 'rgba(239, 68, 68, 0.4)' : 'rgba(16, 185, 129, 0.4)'} strokeWidth="1.5" />
                ))}

                {/* Center Digital Twin Nucleus */}
                <circle cx="200" cy="170" r="22" fill="#0D1117" stroke="#10B981" strokeWidth="2.5" />
                <text x="200" y="174" textAnchor="middle" fill="#10B981" fontSize="10" fontWeight="900">ALEX</text>

                {/* Competency Domain Nodes */}
                {currentCandidate.competencies.map((comp, idx) => {
                  const isSelected = selectedCompetency?.id === comp.id;
                  const isWeak = comp.score < 70;
                  const nodeColor = isWeak ? '#EF4444' : comp.score >= 90 ? '#10B981' : '#F59E0B';

                  return (
                    <g key={idx} onClick={() => setSelectedCompetency(isSelected ? null : comp)} style={{ cursor: 'pointer' }}>
                      <circle cx={comp.x} cy={comp.y} r={isSelected ? "18" : "14"} fill={nodeColor} stroke="#FFF" strokeWidth="2.5" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.15))" />
                      <text x={comp.x} y={comp.y + (comp.y < 170 ? -20 : 28)} textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontWeight="850">
                        {comp.name} ({comp.score}%)
                      </text>
                      {isWeak && (
                        <text x={comp.x} y={comp.y + (comp.y < 170 ? -32 : 40)} textAnchor="middle" fill="#EF4444" fontSize="9" fontWeight="900">
                          ⚠️ PROBE REQUIRED
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Auditable Evidence Inspector Drawer */}
            {selectedCompetency && (
              <div className="animate-fade-in" style={{
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: 'var(--radius-md)',
                border: '1.5px solid rgba(16, 185, 129, 0.4)',
                padding: '0.85rem 1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.55rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 850, color: 'var(--text-primary)' }}>
                    AUDITABLE EVIDENCE: {selectedCompetency.name.toUpperCase()} ({selectedCompetency.score}% MASTERED)
                  </span>
                  <button onClick={() => setSelectedCompetency(null)} className="btn-ghost" style={{ fontSize: '0.7rem', padding: '2px 6px' }}>
                    Dismiss
                  </button>
                </div>

                <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)' }}>
                  Reliability Index: <strong style={{ color: '#059669' }}>{selectedCompetency.reliability}%</strong> • Attempts required: <strong>{selectedCompetency.attempts}</strong>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.725rem' }}>
                  <div style={{ background: 'rgba(236, 253, 245, 0.8)', padding: '0.4rem 0.6rem', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ color: '#059669', fontWeight: 800, marginBottom: '0.2rem' }}>VERIFIED INTERACTIONS</div>
                    {selectedCompetency.evidence.map((ev, i) => <div key={i} style={{ color: 'var(--text-primary)' }}>{ev}</div>)}
                  </div>

                  <div style={{ background: 'rgba(254, 243, 199, 0.8)', padding: '0.4rem 0.6rem', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ color: '#D97706', fontWeight: 800, marginBottom: '0.2rem' }}>CONTRADICTORY EVIDENCE</div>
                    {selectedCompetency.gaps.map((gp, i) => <div key={i} style={{ color: 'var(--text-secondary)' }}>{gp}</div>)}
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* AI INFERENCE ENGINE PANEL */}
          <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 850, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <Sparkles size={16} color="#10B981" /> AI Cognitive Inference Engine
                </h3>
                <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Real-time pattern recognition & hesitation metrics</span>
              </div>
              <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#D97706', background: 'rgba(254, 243, 199, 0.9)', padding: '3px 10px', borderRadius: '99px', border: '1px solid rgba(245,158,11,0.3)' }}>
                CONFIDENCE: {currentCandidate.inference.confidence}%
              </span>
            </div>

            {/* Pattern Signals */}
            <div style={{ background: 'rgba(236, 253, 245, 0.85)', padding: '0.6rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(16, 185, 129, 0.3)', fontSize: '0.75rem', color: 'var(--text-primary)' }}>
              Detected Pattern: <strong style={{ color: '#059669' }}>{currentCandidate.inference.pattern}</strong>
            </div>

            {/* 4 Cognitive Gauges */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.45rem', fontSize: '0.65rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.9)', padding: '0.45rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(232, 226, 213, 0.8)' }}>
                <div style={{ color: 'var(--text-muted)', fontWeight: 700 }}>DIFFICULTY</div>
                <div style={{ fontWeight: 850, color: '#10B981', fontSize: '0.785rem' }}>{currentCandidate.inference.difficulty}%</div>
                <div style={{ color: '#10B981', fontFamily: 'var(--font-mono)' }}>████████░░</div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.9)', padding: '0.45rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(232, 226, 213, 0.8)' }}>
                <div style={{ color: 'var(--text-muted)', fontWeight: 700 }}>CONFIDENCE</div>
                <div style={{ fontWeight: 850, color: '#10B981', fontSize: '0.785rem' }}>{currentCandidate.inference.confidence}%</div>
                <div style={{ color: '#10B981', fontFamily: 'var(--font-mono)' }}>█████████░</div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.9)', padding: '0.45rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(232, 226, 213, 0.8)' }}>
                <div style={{ color: 'var(--text-muted)', fontWeight: 700 }}>HESITATION</div>
                <div style={{ fontWeight: 850, color: '#F59E0B', fontSize: '0.785rem' }}>{currentCandidate.inference.hesitation}%</div>
                <div style={{ color: '#F59E0B', fontFamily: 'var(--font-mono)' }}>███░░░░░░░</div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.9)', padding: '0.45rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(232, 226, 213, 0.8)' }}>
                <div style={{ color: 'var(--text-muted)', fontWeight: 700 }}>CONCEPT TRANSFER</div>
                <div style={{ fontWeight: 850, color: '#2563EB', fontSize: '0.785rem' }}>{currentCandidate.inference.transfer}%</div>
                <div style={{ color: '#2563EB', fontFamily: 'var(--font-mono)' }}>████████░░</div>
              </div>
            </div>

            {/* Inference Quote */}
            <div style={{ fontSize: '0.75rem', fontStyle: 'italic', color: 'var(--text-secondary)', background: 'rgba(248, 250, 252, 0.9)', padding: '0.55rem 0.85rem', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid #10B981' }}>
              "{currentCandidate.inference.quote}"
            </div>
          </div>
        </div>
          {/* RIGHT COLUMN: LIVE EVALUATION STREAM & ADAPTIVE QUESTION ENGINE */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

          {/* LIVE EVALUATION STREAM (AGENT TURING TERMINAL) */}
          <div style={{
            background: '#0D1117',
            borderRadius: '24px',
            padding: '1.25rem',
            border: '1.5px solid rgba(16, 185, 129, 0.35)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.4)',
            color: '#FFFFFF'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <span className="pulse-glow" style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981' }} />
                <span style={{ fontSize: '0.8rem', fontWeight: 850, letterSpacing: '0.04em' }}>LIVE EVALUATION STREAM</span>
              </div>
              <span style={{ fontSize: '0.65rem', color: '#9CA3AF', fontFamily: 'var(--font-mono)' }}>AGENT TURING</span>
            </div>

            <div style={{ fontSize: '0.7rem', color: '#A7F3D0', fontWeight: 700 }}>
              ● {currentCandidate.liveStream.agentState}
            </div>

            {/* Current Probing Question Box */}
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '0.625rem', color: '#9CA3AF', fontWeight: 800, marginBottom: '0.2rem' }}>ACTIVE QUESTION</div>
              <div style={{ fontSize: '0.785rem', color: '#FFF', lineHeight: 1.4 }}>
                "{currentCandidate.liveStream.question}"
              </div>
            </div>

            {/* Candidate Response Box */}
            <div style={{ background: 'rgba(16, 185, 129, 0.08)', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
              <div style={{ fontSize: '0.625rem', color: '#10B981', fontWeight: 800, marginBottom: '0.2rem' }}>CANDIDATE RESPONSE</div>
              <div style={{ fontSize: '0.785rem', color: '#E5E7EB', lineHeight: 1.4 }}>
                "{currentCandidate.liveStream.answer}"
              </div>
            </div>

            {/* AI Reasoning Analysis */}
            <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '0.55rem 0.75rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.08)', fontSize: '0.7rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <div style={{ fontSize: '0.625rem', color: '#F59E0B', fontWeight: 800 }}>AI REAL-TIME REASONING</div>
              {currentCandidate.liveStream.analysis.map((an, i) => <div key={i} style={{ color: '#D1D5DB' }}>{an}</div>)}
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.25rem', color: '#9CA3AF', fontSize: '0.65rem' }}>
                <span>Confidence: <strong style={{ color: '#10B981' }}>{currentCandidate.liveStream.streamConfidence}%</strong></span>
                <span>Difficulty: <strong style={{ color: '#F59E0B' }}>{currentCandidate.liveStream.streamDifficulty}</strong></span>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => onNavigateStep(11)}
                style={{
                  flex: 1, background: 'rgba(255, 255, 255, 0.1)', color: '#FFF', border: '1px solid rgba(255, 255, 255, 0.2)',
                  padding: '0.45rem', borderRadius: '8px', fontSize: '0.725rem', fontWeight: 800, cursor: 'pointer'
                }}
              >
                DEEPER PROBE
              </button>
              <button
                onClick={() => onNavigateStep(11)}
                style={{
                  flex: 1, background: '#10B981', color: '#04241C', border: 'none',
                  padding: '0.45rem', borderRadius: '8px', fontSize: '0.725rem', fontWeight: 850, cursor: 'pointer'
                }}
              >
                ACCEPT ANSWER
              </button>
            </div>

            {/* Terminal Input Injector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', padding: '4px 8px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <span style={{ color: '#10B981', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>&gt;_</span>
              <input 
                type="text" 
                value={termInput}
                onChange={e => setTermInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleInjectProbe()}
                placeholder="Inject custom prompt test..." 
                style={{ border: 'none', background: 'transparent', outline: 'none', color: '#FFF', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', width: '100%' }}
              />
              <button onClick={handleInjectProbe} style={{ background: 'transparent', border: 'none', color: '#10B981', cursor: 'pointer' }}>
                <Send size={12} />
              </button>
            </div>
          </div>

          {/* ADAPTIVE QUESTION ENGINE */}
          <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 850, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <Sliders size={16} color="#10B981" /> Adaptive Question Decision Engine
                </h3>
                <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Real-time next question selection based on information gain</span>
              </div>
              <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#D97706', background: 'rgba(254, 243, 199, 0.9)', padding: '3px 9px', borderRadius: '99px' }}>
                WEAKNESS DETECTED
              </span>
            </div>

            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Target Weakness: <strong style={{ color: '#D97706' }}>{currentCandidate.nextProbe.weakness}</strong> (Previous: {currentCandidate.nextProbe.prevPerf})
            </div>

            {/* Adaptive Decision Card */}
            <div style={{
              background: 'rgba(236, 253, 245, 0.9)',
              borderRadius: 'var(--radius-md)',
              border: '1.5px solid rgba(16, 185, 129, 0.35)',
              padding: '0.75rem 0.85rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.45rem',
              fontSize: '0.75rem'
            }}>
              <div>Increase Difficulty: <strong style={{ color: '#10B981' }}>{currentCandidate.nextProbe.diffDelta}</strong></div>
              <div>Target Concept: <strong style={{ color: 'var(--text-primary)' }}>{currentCandidate.nextProbe.targetConcept}</strong></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>Expected Information Gain:</span>
                <strong style={{ color: '#059669', fontFamily: 'var(--font-mono)' }}>█████████░ {currentCandidate.nextProbe.infoGain}%</strong>
              </div>
            </div>

            <button
              onClick={() => onNavigateStep(11)}
              className="btn-primary"
              style={{
                width: '100%', padding: '0.6rem', fontSize: '0.785rem',
                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)', gap: '0.4rem'
              }}
            >
              <Zap size={14} fill="#FFF" />
              <span>{activeProbeDeployed ? 'PROBE DEPLOYED TO STREAM ✓' : 'DEPLOY ADAPTIVE PROBE →'}</span>
            </button>
        </div>

{/* RIGHT COLUMN: VERTICAL OS TELEMETRY RAIL (ENDS AT CANDIDATE JOURNEY LEVEL) */}
        <div style={{
          background: '#0D1117',
          borderRadius: '24px',
          border: '1.5px solid rgba(16, 185, 129, 0.35)',
          padding: '1.25rem 1rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          color: '#9CA3AF',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6875rem',
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.4)',
          gap: '0.85rem',
          height: '100%',
          boxSizing: 'border-box'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Header Status */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              color: '#10B981',
              fontWeight: 850,
              fontSize: '0.75rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              paddingBottom: '0.75rem'
            }}>
              <span className="pulse-glow" style={{ width: 7, height: 7, borderRadius: '50%', background: '#10B981' }} />
              ENGINE ONLINE
            </div>

            {/* Telemetry Stack */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '0.55rem 0.7rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: '0.575rem', color: '#6B7280', fontWeight: 800 }}>EVALUATED</div>
                <div style={{ fontWeight: 850, color: '#FFF', marginTop: '2px', fontSize: '0.8rem' }}>14 DOMAINS</div>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '0.55rem 0.7rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: '0.575rem', color: '#6B7280', fontWeight: 800 }}>EVENTS AUDITED</div>
                <div style={{ fontWeight: 850, color: '#FFF', marginTop: '2px', fontSize: '0.8rem' }}>284 EVENTS</div>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '0.55rem 0.7rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: '0.575rem', color: '#6B7280', fontWeight: 800 }}>VECTOR INDEX</div>
                <div style={{ fontWeight: 850, color: '#10B981', marginTop: '2px', fontSize: '0.8rem' }}>READY</div>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '0.55rem 0.7rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: '0.575rem', color: '#6B7280', fontWeight: 800 }}>KNOWLEDGE GRAPH</div>
                <div style={{ fontWeight: 850, color: '#10B981', marginTop: '2px', fontSize: '0.8rem' }}>SYNCED</div>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '0.55rem 0.7rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: '0.575rem', color: '#6B7280', fontWeight: 800 }}>ACTIVE EVALUATOR</div>
                <div style={{ fontWeight: 850, color: '#A7F3D0', marginTop: '2px', fontSize: '0.8rem' }}>AGENT TURING</div>
              </div>
            </div>
          </div>

          {/* Footer Metrics */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '0.75rem', fontSize: '0.65rem' }}>
            <div>LATENCY: <strong style={{ color: '#93C5FD' }}>82ms</strong></div>
            <div>LAST EVENT: <strong style={{ color: '#FDE68A' }}>1.2s AGO</strong></div>
          </div>
        </div>
      </div>

      </div>
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
