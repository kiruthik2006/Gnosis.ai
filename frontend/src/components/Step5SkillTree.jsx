import React, { useState } from 'react';
import { 
  CheckCircle2, AlertCircle, Circle, Lock, ArrowRight, Info
} from 'lucide-react';

export default function Step5SkillTree({ 
  claimTree,
  customNodeStatuses,
  onStartAssessment, 
  title = "Your Initial Skill Tree",
  subtitle = "Generated from your selected AI & App stack claims. Perform baseline assessment to evaluate your node proficiency.",
  showAssessmentBtn = true
}) {
  const [selectedNode, setSelectedNode] = useState(null);
  const [activeOnlyFilter, setActiveOnlyFilter] = useState(false);

  // Convert confidence string to internal status
  const mapConfidenceToStatus = (level) => {
    switch (level) {
      case 'CONFIDENT': return 'strong';
      case 'FAMILIAR': return 'moderate';
      case 'WEAK': return 'needs_practice';
      case 'LOCKED': return 'locked';
      default: return 'not_started';
    }
  };

  // Helper to retrieve status for a skill title or node id
  const getSkillStatus = (nodeId, titleStr) => {
    if (customNodeStatuses) {
      if (customNodeStatuses[nodeId]) return customNodeStatuses[nodeId];
      if (customNodeStatuses[titleStr]) return customNodeStatuses[titleStr];
    }
    if (claimTree) {
      const categories = ['frontend', 'backend', 'aiCore', 'devOps'];
      for (const cat of categories) {
        if (claimTree[cat] && claimTree[cat][titleStr]) {
          return mapConfidenceToStatus(claimTree[cat][titleStr]);
        }
      }
    }
    return 'not_started';
  };

  // Status visual mapping helper
  const getStatusBadge = (status) => {
    switch (status) {
      case 'strong':
        return (
          <span className="badge badge-strong">
            <CheckCircle2 size={12} /> Confident
          </span>
        );
      case 'moderate':
        return (
          <span className="badge badge-moderate">
            <AlertCircle size={12} /> Familiar
          </span>
        );
      case 'needs_practice':
        return (
          <span className="badge badge-practice">
            <AlertCircle size={12} /> Weak
          </span>
        );
      case 'not_started':
        return (
          <span className="badge" style={{ background: 'var(--bg-subtle)', color: 'var(--text-secondary)' }}>
            <Circle size={12} /> Unselected
          </span>
        );
      case 'locked':
      default:
        return (
          <span className="badge badge-locked">
            <Lock size={12} /> Locked
          </span>
        );
    }
  };

  const getCategoryStatus = (keysList) => {
    for (const key of keysList) {
      const st = getSkillStatus(key, key);
      if (st !== 'not_started') return 'strong';
    }
    return 'not_started';
  };

  // Dynamic Skill Tree Nodes layout with spacious non-overlapping coordinates (Width: 1140px, Height: 520px)
  const nodes = [
    { id: 'root', label: 'AI ENGINEER', category: 'Core Target', status: 'strong', x: 570, y: 45 },
    
    // Level 1: Main Branches
    { id: 'app_stack', label: 'APP STACK', category: 'Roof 1 & 2', status: getCategoryStatus(['react_vite', 'streamlit', 'fastapi', 'vector_db', 'retrieval']), x: 300, y: 135 },
    { id: 'ai_ops', label: 'AI & OPS', category: 'Roof 3 & 4', status: getCategoryStatus(['embeddings', 'prompt_eng', 'multi_agent', 'mcp', 'docker', 'observability']), x: 840, y: 135 },
    
    // Level 2: Categories (Dynamic based on active claims)
    { id: 'fe', label: 'Frontend UI', category: 'Roof 1', status: getCategoryStatus(['react_vite', 'streamlit', 'rich_fmt', 'React & Vite', 'Streamlit', 'html', 'css', 'javascript']), x: 160, y: 230 },
    { id: 'be', label: 'Backend Systems', category: 'Roof 2', status: getCategoryStatus(['fastapi', 'vector_db', 'retrieval', 'sql_pandas', 'FastAPI', 'Vector Databases', 'nodejs', 'db']), x: 440, y: 230 },
    { id: 'ai_core', label: 'AI Core Logic', category: 'Roof 3', status: getCategoryStatus(['embeddings', 'prompt_eng', 'multi_agent', 'mcp', 'Embeddings', 'Prompt Engineering']), x: 700, y: 230 },
    { id: 'devops', label: 'DevOps & Infra', category: 'Roof 4', status: getCategoryStatus(['docker', 'observability', 'security', 'Docker & Kubernetes', 'Security Guardrails']), x: 980, y: 230 },

    // Level 3: Individual Skills (Row 1)
    { id: 'react_vite', label: 'React & Vite', category: 'Frontend', status: getSkillStatus('react_vite', 'React & Vite'), x: 160, y: 330 },

    { id: 'fastapi', label: 'FastAPI', category: 'Backend', status: getSkillStatus('fastapi', 'FastAPI'), x: 370, y: 330 },
    { id: 'vector_db', label: 'Vector DBs', category: 'Backend', status: getSkillStatus('vector_db', 'Vector Databases'), x: 510, y: 330 },

    { id: 'embeddings', label: 'Embeddings', category: 'AI Core', status: getSkillStatus('embeddings', 'Embeddings'), x: 640, y: 330 },
    { id: 'prompt_eng', label: 'Prompt Eng.', category: 'AI Core', status: getSkillStatus('prompt_eng', 'Prompt Engineering'), x: 775, y: 330 },

    { id: 'docker', label: 'Docker & K8s', category: 'DevOps', status: getSkillStatus('docker', 'Docker & Kubernetes'), x: 915, y: 330 },
    { id: 'observability', label: 'Observability', category: 'DevOps', status: getSkillStatus('observability', 'Observability'), x: 1045, y: 330 },

    // Level 4: Individual Skills (Row 2)
    { id: 'streamlit', label: 'Streamlit', category: 'Frontend', status: getSkillStatus('streamlit', 'Streamlit'), x: 100, y: 445 },
    { id: 'rich_fmt', label: 'Rich Formatting', category: 'Frontend', status: getSkillStatus('rich_fmt', 'Rich Formatting'), x: 220, y: 445 },

    { id: 'retrieval', label: 'Retrieval Engine', category: 'Backend', status: getSkillStatus('retrieval', 'Retrieval Engine'), x: 370, y: 445 },
    { id: 'sql_pandas', label: 'SQL & Pandas', category: 'Backend', status: getSkillStatus('sql_pandas', 'SQL & Pandas'), x: 510, y: 445 },

    { id: 'multi_agent', label: 'Multi-Agent', category: 'AI Core', status: getSkillStatus('multi_agent', 'Multi-Agent Orchestration'), x: 640, y: 445 },
    { id: 'mcp', label: 'MCP Protocol', category: 'AI Core', status: getSkillStatus('mcp', 'Model Context Protocol (MCP)'), x: 775, y: 445 },

    { id: 'security', label: 'Guardrails', category: 'DevOps', status: getSkillStatus('security', 'Security Guardrails'), x: 980, y: 445 },
  ];

  // Connections between nodes
  const connections = [
    { from: 'root', to: 'app_stack' },
    { from: 'root', to: 'ai_ops' },
    { from: 'app_stack', to: 'fe' },
    { from: 'app_stack', to: 'be' },
    { from: 'ai_ops', to: 'ai_core' },
    { from: 'ai_ops', to: 'devops' },

    { from: 'fe', to: 'react_vite' },
    { from: 'fe', to: 'streamlit' },
    { from: 'fe', to: 'rich_fmt' },

    { from: 'be', to: 'fastapi' },
    { from: 'be', to: 'vector_db' },
    { from: 'be', to: 'retrieval' },
    { from: 'be', to: 'sql_pandas' },

    { from: 'ai_core', to: 'embeddings' },
    { from: 'ai_core', to: 'prompt_eng' },
    { from: 'ai_core', to: 'multi_agent' },
    { from: 'ai_core', to: 'mcp' },

    { from: 'devops', to: 'docker' },
    { from: 'devops', to: 'observability' },
    { from: 'devops', to: 'security' },
  ];

  return (
    /* ── Page margin wrapper ── */
    <div style={{
      padding: '1.5rem 1.5rem 2.5rem',
      minHeight: 'calc(100vh - 56px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch'
    }}>
    {/* ── Premium outer frame ── */}
    <div
      className="animate-fade-in skill-tree-frame"
      style={{
        maxWidth: '1200px',
        width: '100%',
        margin: '0 auto',
        flex: 1,
        background: '#FAFAF8',
        border: '1.5px solid #E2DDD5',
        borderRadius: '32px',
        boxShadow:
          '0 1px 3px rgba(28,27,26,0.04), 0 4px 24px rgba(28,27,26,0.04)',
        padding: '2.5rem 2rem',
        overflow: 'hidden'
      }}
    >

      {/* Header & Legend Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        <div>
          <span className="badge badge-strong" style={{ marginBottom: '0.4rem' }}>
            INTERACTIVE SKILL TREE
          </span>
          <h1 style={{
            fontSize: '1.75rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em'
          }}>
            {title}
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            {subtitle}
          </p>
        </div>

        {/* Tree Status Legend & Active Skillset Focus Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveOnlyFilter(!activeOnlyFilter)}
            style={{
              background: activeOnlyFilter ? '#10B981' : 'rgba(255, 255, 255, 0.9)',
              color: activeOnlyFilter ? '#FFF' : 'var(--text-primary)',
              border: `1.5px solid ${activeOnlyFilter ? '#059669' : 'var(--border-strong)'}`,
              padding: '0.55rem 1rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.8125rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              boxShadow: activeOnlyFilter ? '0 4px 14px rgba(16, 185, 129, 0.3)' : 'var(--shadow-sm)',
              transition: 'all 0.2s ease'
            }}
          >
            <span>{activeOnlyFilter ? '✨ Focus: User Active Skillset' : '🎯 Shift to User Skillset'}</span>
          </button>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            background: 'var(--bg-card)',
            padding: '0.6rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-sm)',
            fontSize: '0.8125rem'
          }}>
            <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>LEGEND:</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--status-strong)', fontWeight: 600 }}>
              🟢 Confident
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--status-moderate)', fontWeight: 600 }}>
              🟡 Familiar
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--status-needs-practice)', fontWeight: 600 }}>
              🔴 Weak
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
              ⚪ Unselected
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Skill Tree SVG Container */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        borderRadius: 'var(--radius-xl)',
        padding: '2rem 1rem',
        boxShadow: 'var(--shadow-md)',
        position: 'relative',
        overflowX: 'auto',
        marginBottom: '2rem'
      }}>
        <div style={{ minWidth: '1140px', position: 'relative', height: '520px' }}>
          {/* SVG Connection Lines */}
          <svg style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, pointerEvents: 'none' }}>
            {connections.map((conn, idx) => {
              const fromNode = nodes.find(n => n.id === conn.from);
              const toNode = nodes.find(n => n.id === conn.to);
              if (!fromNode || !toNode) return null;

              const isNotStarted = toNode.status === 'not_started';
              const strokeColor = isNotStarted 
                ? 'rgba(214, 207, 190, 0.75)' 
                : toNode.status === 'strong' 
                  ? '#10B981' 
                  : toNode.status === 'moderate' 
                    ? '#F59E0B' 
                    : '#EF4444';

              return (
                <path
                  key={idx}
                  d={`M ${fromNode.x} ${fromNode.y + 18} C ${fromNode.x} ${fromNode.y + 45}, ${toNode.x} ${toNode.y - 45}, ${toNode.x} ${toNode.y - 18}`}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth={isNotStarted ? "1.5" : "2.2"}
                  strokeDasharray={isNotStarted ? "4 4" : "none"}
                  opacity={isNotStarted ? 0.6 : 0.85}
                />
              );
            })}
          </svg>

          {/* Node Elements */}
          {nodes.map((node) => {
            const isSelected = selectedNode?.id === node.id;
            const isStrong = node.status === 'strong';
            const isModerate = node.status === 'moderate';
            const isNeedsPractice = node.status === 'needs_practice';
            const isNotStarted = node.status === 'not_started';

            let bgColor = 'rgba(255, 255, 255, 0.95)';
            let borderColor = 'var(--border-light)';
            let textColor = 'var(--text-primary)';
            let glowShadow = '0 4px 12px rgba(0,0,0,0.04)';

            if (isStrong) {
              bgColor = '#F0FDF4';
              borderColor = '#22C55E';
              glowShadow = '0 4px 14px rgba(34, 197, 94, 0.2)';
            } else if (isModerate) {
              bgColor = '#FEFCE8';
              borderColor = '#EAB308';
              glowShadow = '0 4px 14px rgba(234, 179, 8, 0.2)';
            } else if (isNeedsPractice) {
              bgColor = '#FEF2F2';
              borderColor = '#EF4444';
              glowShadow = '0 4px 14px rgba(239, 68, 68, 0.2)';
            } else if (isNotStarted) {
              bgColor = 'rgba(245, 242, 236, 0.7)';
              borderColor = 'rgba(214, 207, 190, 0.9)';
              textColor = 'var(--text-muted)';
            }

            return (
              <div
                key={node.id}
                onClick={() => setSelectedNode(node)}
                style={{
                  position: 'absolute',
                  left: `${node.x}px`,
                  top: `${node.y}px`,
                  transform: 'translate(-50%, -50%)',
                  background: bgColor,
                  border: `2px solid ${isSelected ? '#18181b' : borderColor}`,
                  borderRadius: 'var(--radius-md)',
                  padding: '0.45rem 0.85rem',
                  minWidth: '110px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  boxShadow: isSelected ? '0 8px 24px rgba(0,0,0,0.18)' : glowShadow,
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  zIndex: 2,
                  opacity: isNotStarted ? (activeOnlyFilter ? 0.15 : 0.75) : 1,
                  pointerEvents: isNotStarted && activeOnlyFilter ? 'none' : 'auto',
                  whiteSpace: 'nowrap'
                }}
              >
                <div style={{
                  fontSize: '0.575rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: isNotStarted ? 'var(--text-muted)' : 'var(--text-secondary)',
                  marginBottom: '0.15rem'
                }}>
                  {node.category}
                </div>

                <div style={{
                  fontWeight: 800,
                  fontSize: '0.8125rem',
                  color: textColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.35rem'
                }}>
                  {isStrong && <span>🟢</span>}
                  {isModerate && <span>🟡</span>}
                  {isNeedsPractice && <span>🔴</span>}
                  {isNotStarted && <span>⚪</span>}
                  <span>{node.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Node Detail Inspection Drawer */}
      {selectedNode && (
        <div className="animate-fade-in" style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-strong)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem 1.5rem',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Info size={20} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <strong style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>{selectedNode.label}</strong>
                {getStatusBadge(selectedNode.status)}
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                Category: {selectedNode.category} · Claim State: {selectedNode.status.toUpperCase()}
              </p>
            </div>
          </div>

          <button onClick={() => setSelectedNode(null)} className="btn-ghost" style={{ fontSize: '0.8125rem' }}>
            Dismiss
          </button>
        </div>
      )}

      {/* Action Footer to start baseline MCQ Assessment */}
      {showAssessmentBtn && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--bg-card)',
          padding: '1.25rem 1.75rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>
              Ready for adaptive technical interview evaluation?
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Evaluate your claimed initial skill tree against AI engineering benchmarks.
            </div>
          </div>

          <button
            onClick={onStartAssessment}
            className="btn-primary"
            style={{ padding: '0.85rem 2rem', gap: '0.6rem' }}
          >
            <span>Start Skill Assessment</span>
            <ArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
    </div>
  );
}
