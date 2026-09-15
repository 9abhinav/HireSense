import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function ScoreCard({
  label,
  value,
  suffix = '',
  prefix = '',
  description,
  icon: Icon,
  trend,
  color,
  size = 'md',
  animate = true
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const numericValue = typeof value === 'number' ? value : parseInt(value) || 0;

  useEffect(() => {
    if (!animate) {
      setDisplayValue(numericValue);
      return;
    }

    let start = 0;
    const end = numericValue;
    const duration = 1200;
    const startTime = performance.now();

    const animateCount = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(animateCount);
    };

    const timer = setTimeout(() => requestAnimationFrame(animateCount), 200);
    return () => clearTimeout(timer);
  }, [numericValue, animate]);

  const sizeStyles = {
    sm: { padding: '16px', valueSize: 'var(--text-2xl)', labelSize: 'var(--text-xs)', gap: 4 },
    md: { padding: '20px', valueSize: 'var(--text-3xl)', labelSize: 'var(--text-sm)', gap: 6 },
    lg: { padding: '24px', valueSize: 'var(--text-4xl)', labelSize: 'var(--text-sm)', gap: 8 }
  };

  const s = sizeStyles[size];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        padding: s.padding,
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-lg)',
        display: 'flex',
        flexDirection: 'column',
        gap: s.gap,
        transition: 'border-color var(--transition-fast)'
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-strong)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-default)'}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <span style={{
          fontSize: s.labelSize,
          color: 'var(--text-secondary)',
          fontWeight: 500,
          letterSpacing: '0.02em',
          textTransform: 'uppercase'
        }}>
          {label}
        </span>
        {Icon && (
          <div style={{
            width: 32,
            height: 32,
            borderRadius: 'var(--radius-md)',
            background: color ? `${color}15` : 'var(--accent-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Icon size={16} style={{ color: color || 'var(--accent)' }} />
          </div>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
        <span style={{
          fontSize: s.valueSize,
          fontWeight: 700,
          color: 'var(--text-primary)',
          lineHeight: 1,
          letterSpacing: 'var(--tracking-tight)'
        }}>
          {prefix}{displayValue}{suffix}
        </span>
      </div>
      {description && (
        <span style={{
          fontSize: 'var(--text-xs)',
          color: 'var(--text-tertiary)',
          lineHeight: 'var(--leading-normal)'
        }}>
          {description}
        </span>
      )}
      {trend && (
        <span style={{
          fontSize: 'var(--text-xs)',
          color: trend > 0 ? 'var(--success)' : 'var(--error)',
          fontWeight: 500
        }}>
          {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from last analysis
        </span>
      )}
    </motion.div>
  );
}
