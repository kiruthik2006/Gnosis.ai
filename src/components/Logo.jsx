import React from 'react';

/**
 * Polished, Production-Grade Brand Logo for Interview Agent / Gnosis.ai
 */
export default function Logo({ size = 36, variant = 'emerald', showText = false, subtitle = null, onClick }) {
  const isEmerald = variant === 'emerald';

  const badgeStyle = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: size > 40 ? '14px' : '10px',
    background: isEmerald 
      ? 'linear-gradient(135deg, rgba(16,185,129,0.28) 0%, rgba(4,36,28,0.85) 100%)'
      : 'linear-gradient(135deg, #1C1B1A 0%, #2A2826 100%)',
    border: isEmerald 
      ? '1.5px solid rgba(16,185,129,0.45)'
      : '1.5px solid rgba(255,255,255,0.15)',
    boxShadow: isEmerald 
      ? '0 0 16px rgba(16,185,129,0.25), inset 0 1px 1px rgba(255,255,255,0.2)'
      : '0 4px 12px rgba(0,0,0,0.15), inset 0 1px 1px rgba(255,255,255,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    flexShrink: 0,
    cursor: onClick ? 'pointer' : 'default',
    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
  };

  const iconSize = Math.round(size * 0.52);

  return (
    <div 
      onClick={onClick}
      style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', cursor: onClick ? 'pointer' : 'default' }}
    >
      <div style={badgeStyle}>
        {/* Subtle background glow effect */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          left: '-20%',
          width: '60%',
          height: '60%',
          background: isEmerald ? 'rgba(16,185,129,0.4)' : 'rgba(255,255,255,0.15)',
          borderRadius: '50%',
          filter: 'blur(8px)',
          pointerEvents: 'none'
        }} />

        {/* Polished Terminal + AI Node SVG Mark */}
        <svg 
          width={iconSize} 
          height={iconSize} 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: 'relative', zIndex: 2 }}
        >
          {/* Terminal prompt chevron */}
          <path 
            d="M4.5 7L9.5 12L4.5 17" 
            stroke="#FFFFFF" 
            strokeWidth="2.4" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          {/* Terminal cursor line */}
          <path 
            d="M11.5 17H17.5" 
            stroke="#FFFFFF" 
            strokeWidth="2.4" 
            strokeLinecap="round" 
          />
          {/* AI Node Spark Star (Emerald accent) */}
          <circle cx="17.5" cy="6.5" r="2.2" fill="#10B981" />
          <path 
            d="M17.5 3.5V9.5M14.5 6.5H20.5" 
            stroke="#10B981" 
            strokeWidth="1.2" 
            strokeLinecap="round" 
            opacity="0.8" 
          />
        </svg>
      </div>

      {showText && (
        <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
          <div style={{
            fontWeight: 850,
            fontSize: size > 40 ? '1.15rem' : '0.85rem',
            letterSpacing: '-0.02em',
            color: isEmerald ? '#FFFFFF' : 'var(--text-primary)',
            lineHeight: 1.15
          }}>
            INTERVIEW AGENT
          </div>
          {subtitle && (
            <div style={{
              fontSize: size > 40 ? '0.75rem' : '0.65rem',
              color: isEmerald ? '#A7F3D0' : 'var(--text-muted)',
              fontWeight: 500,
              lineHeight: 1.15,
              marginTop: '0.15rem'
            }}>
              {subtitle}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
