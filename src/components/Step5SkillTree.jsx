import React, { useState } from 'react';
import { 
  CheckCircle2, AlertCircle, Circle, Lock, Sparkles, ArrowRight,
  Info, Shield, Layers, Layout, Server, ChevronRight
} from 'lucide-react';

export default function Step5SkillTree({ 
  treeState, 
  onStartAssessment, 
  title = "Your Initial Skill Tree",
  subtitle = "Generated from your selected tech stack. Perform baseline assessment to evaluate your node proficiency.",
  showAssessmentBtn = true
}) {
  const [selectedNode, setSelectedNode] = useState(null);

  // Status visual mapping helper
  const getStatusBadge = (status) => {
    switch (status) {
      case 'strong':
        return (
          <span className="badge badge-strong">
            <CheckCircle2 size={12} /> Strong
          </span>
        );
      case 'moderate':
        return (
          <span className="badge badge-moderate">
            <AlertCircle size={12} /> Moderate
          </span>
        );
      case 'needs_practice':
        return (
          <span className="badge badge-practice">
            <AlertCircle size={12} /> Needs Practice
          </span>
        );
      case 'not_started':
        return (
          <span className="badge" style={{ background: 'var(--bg-subtle)', color: 'var(--text-secondary)' }}>
            <Circle size={12} /> Not Started
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

  // Node definitions with coordinates for custom SVG tree diagram
  const nodes = [
    { id: 'root', label: 'FULL STACK', category: 'Core Target', status: treeState.root || 'not_started', x: 500, y: 50 },
    
    // Level 1
    { id: 'fe', label: 'FRONTEND', category: 'Track', status: treeState.fe || 'strong', x: 300, y: 150 },
    { id: 'be', label: 'BACKEND', category: 'Track', status: treeState.be || 'not_started', x: 700, y: 150 },
    
    // Level 2 (Frontend side)
    { id: 'html', label: 'HTML', category: 'Markup', status: treeState.html || 'not_started', x: 180, y: 270 },
    { id: 'css', label: 'CSS', category: 'Styling', status: treeState.css || 'not_started', x: 300, y: 270 },
    { id: 'javascript', label: 'JavaScript', category: 'Language', status: treeState.javascript || 'moderate', x: 420, y: 270 },
    
    // Level 2 (Backend side)
    { id: 'nodejs', label: 'Node.js', category: 'Runtime', status: treeState.nodejs || 'not_started', x: 620, y: 270 },
    { id: 'db', label: 'Database', category: 'Storage', status: treeState.db || 'locked', x: 780, y: 270 },

    // Level 3
    { id: 'react', label: 'React', category: 'Framework', status: treeState.react || 'locked', x: 420, y: 390 },
    { id: 'express', label: 'Express.js', category: 'Framework', status: treeState.express || 'locked', x: 620, y: 390 },

    // Level 4
    { id: 'mongodb', label: 'MongoDB', category: 'NoSQL DB', status: treeState.mongodb || 'locked', x: 620, y: 500 }
  ];

  // SVG Connection curves between nodes
  const connections = [
    { from: 'root', to: 'fe' },
    { from: 'root', to: 'be' },
    { from: 'fe', to: 'html' },
    { from: 'fe', to: 'css' },
    { from: 'fe', to: 'javascript' },
    { from: 'be', to: 'nodejs' },
    { from: 'be', to: 'db' },
    { from: 'javascript', to: 'react' },
    { from: 'nodejs', to: 'express' },
    { from: 'express', to: 'mongodb' }
  ];

  return (
    <div style={{
      maxWidth: '1100px',
      margin: '0 auto',
      padding: '2.5rem 1.5rem',
      minHeight: 'calc(100vh - 120px)'
    }} className="animate-fade-in">

      {/* Header & Legend Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
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

        {/* Tree Status Legend */}
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
            <CheckCircle2 size={14} /> ✓ Strong
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--status-moderate)', fontWeight: 600 }}>
            <AlertCircle size={14} /> ● Needs Improvement
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
            <Circle size={14} /> ○ Not Started
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--text-muted)', fontWeight: 500 }}>
            <Lock size={14} /> 🔒 Locked
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
        <div style={{ minWidth: '850px', position: 'relative', height: '560px' }}>
          {/* SVG Connection Lines */}
          <svg style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, pointerEvents: 'none' }}>
            {connections.map((conn, idx) => {
              const fromNode = nodes.find(n => n.id === conn.from);
              const toNode = nodes.find(n => n.id === conn.to);
              if (!fromNode || !toNode) return null;

              const isLocked = toNode.status === 'locked';

              return (
                <path
                  key={idx}
                  d={`M ${fromNode.x} ${fromNode.y + 25} C ${fromNode.x} ${fromNode.y + 70}, ${toNode.x} ${toNode.y - 70}, ${toNode.x} ${toNode.y - 25}`}
                  fill="none"
                  stroke={isLocked ? 'var(--border-light)' : 'var(--border-strong)'}
                  strokeWidth={isLocked ? "1.5" : "2"}
                  strokeDasharray={isLocked ? "4 4" : "none"}
                />
              );
            })}
          </svg>

          {/* Node Elements */}
          {nodes.map((node) => {
            const isSelected = selectedNode?.id === node.id;
            const isLocked = node.status === 'locked';
            const isStrong = node.status === 'strong';
            const isModerate = node.status === 'moderate';
            const isNeedsPractice = node.status === 'needs_practice';

            let bgColor = 'var(--bg-card)';
            let borderColor = 'var(--border-light)';
            let textColor = 'var(--text-primary)';

            if (isStrong) {
              bgColor = 'var(--status-strong-bg)';
              borderColor = 'var(--status-strong-border)';
            } else if (isModerate) {
              bgColor = 'var(--accent-warm-light)';
              borderColor = 'var(--accent-warm-border)';
            } else if (isNeedsPractice) {
              bgColor = 'var(--status-needs-practice-bg)';
              borderColor = 'var(--status-needs-practice-border)';
            } else if (isLocked) {
              bgColor = 'var(--bg-subtle)';
              borderColor = 'var(--border-light)';
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
                  border: `2px solid ${isSelected ? 'var(--text-primary)' : borderColor}`,
                  borderRadius: 'var(--radius-md)',
                  padding: '0.6rem 1.1rem',
                  minWidth: '130px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  boxShadow: isSelected ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  zIndex: 2,
                  opacity: isLocked ? 0.75 : 1
                }}
              >
                <div style={{
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: isLocked ? 'var(--text-muted)' : 'var(--text-secondary)',
                  marginBottom: '0.15rem'
                }}>
                  {node.category}
                </div>

                <div style={{
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  color: textColor,
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  gap: '0.35rem'
                }}>
                  {isStrong && <CheckCircle2 size={14} color="var(--status-strong)" />}
                  {isModerate && <AlertCircle size={14} color="var(--status-moderate)" />}
                  {isNeedsPractice && <AlertCircle size={14} color="var(--status-needs-practice)" />}
                  {isLocked && <Lock size={13} color="var(--text-muted)" />}
                  <span>{node.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Node Detail Inspection Modal / Drawer */}
      {selectedNode && (
        <div className="animate-fade-in" style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-strong)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem 1.5rem',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between',
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
              justify: 'center'
            }}>
              <Info size={20} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <strong style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>{selectedNode.label}</strong>
                {getStatusBadge(selectedNode.status)}
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                Category: {selectedNode.category} · Status: {selectedNode.status.replace('_', ' ').toUpperCase()}
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
          justify: 'space-between',
          background: 'var(--bg-card)',
          padding: '1.25rem 1.75rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>
              Ready for baseline assessment?
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Take a short 5-question baseline assessment to test your skill levels and update node statuses.
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
  );
}
