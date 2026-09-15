import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function ProgressRing({
  value = 0,
  max = 100,
  size = 120,
  strokeWidth = 6,
  color = 'var(--accent)',
  trackColor = 'var(--border-default)',
  label,
  sublabel,
  animate = true,
  showValue = true
}) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min((animatedValue / max) * 100, 100);
  const offset = circumference - (percentage / 100) * circumference;

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => setAnimatedValue(value), 100);
      return () => clearTimeout(timer);
    } else {
      setAnimatedValue(value);
    }
  }, [value, animate]);

  const getColor = () => {
    if (typeof color === 'string') return color;
    if (percentage >= 80) return 'var(--success)';
    if (percentage >= 60) return 'var(--accent)';
    if (percentage >= 40) return 'var(--warning)';
    return 'var(--error)';
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8
    }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg
          width={size}
          height={size}
          style={{ transform: 'rotate(-90deg)' }}
        >
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={trackColor}
            strokeWidth={strokeWidth}
          />
          {/* Progress */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={getColor()}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{
              transition: animate ? 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.3s ease' : 'none'
            }}
          />
        </svg>
        {showValue && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center'
          }}>
            <span style={{
              fontSize: size > 100 ? 'var(--text-2xl)' : 'var(--text-lg)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              lineHeight: 1
            }}>
              {Math.round(animatedValue)}
            </span>
            {max !== 100 && (
              <span style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--text-tertiary)',
                fontWeight: 400
              }}>
                /{max}
              </span>
            )}
            {max === 100 && (
              <span style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--text-tertiary)',
                fontWeight: 400
              }}>
                %
              </span>
            )}
          </div>
        )}
      </div>
      {(label || sublabel) && (
        <div style={{ textAlign: 'center' }}>
          {label && (
            <div style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 500,
              color: 'var(--text-primary)'
            }}>
              {label}
            </div>
          )}
          {sublabel && (
            <div style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--text-tertiary)',
              marginTop: 2
            }}>
              {sublabel}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
