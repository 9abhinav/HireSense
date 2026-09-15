import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

const variants = {
  primary: {
    background: 'var(--accent)',
    color: '#fff',
    border: 'none',
    hoverBg: 'var(--accent-hover)',
    shadow: 'var(--shadow-glow)'
  },
  secondary: {
    background: 'var(--bg-elevated)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-strong)',
    hoverBg: 'var(--bg-hover)',
    shadow: 'none'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--text-secondary)',
    border: 'none',
    hoverBg: 'var(--bg-hover)',
    shadow: 'none'
  },
  outline: {
    background: 'transparent',
    color: 'var(--accent)',
    border: '1px solid var(--border-accent)',
    hoverBg: 'var(--accent-muted)',
    shadow: 'none'
  },
  danger: {
    background: 'var(--error)',
    color: '#fff',
    border: 'none',
    hoverBg: '#ef4444',
    shadow: 'none'
  }
};

const sizes = {
  sm: { padding: '8px 14px', fontSize: 'var(--text-xs)', gap: 6, borderRadius: 'var(--radius-sm)' },
  md: { padding: '10px 20px', fontSize: 'var(--text-sm)', gap: 8, borderRadius: 'var(--radius-md)' },
  lg: { padding: '14px 28px', fontSize: 'var(--text-base)', gap: 10, borderRadius: 'var(--radius-md)' }
};

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconRight: IconRight,
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  style = {},
  ...props
}, ref) => {
  const v = variants[variant];
  const s = sizes[size];

  return (
    <motion.button
      ref={ref}
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      onClick={!disabled && !loading ? onClick : undefined}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: s.gap,
        padding: s.padding,
        fontSize: s.fontSize,
        fontWeight: 500,
        lineHeight: 1,
        background: v.background,
        color: v.color,
        border: v.border,
        borderRadius: s.borderRadius,
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: `background ${150}ms ease, box-shadow ${150}ms ease`,
        width: fullWidth ? '100%' : 'auto',
        whiteSpace: 'nowrap',
        position: 'relative',
        overflow: 'hidden',
        letterSpacing: '0.01em',
        ...style
      }}
      onMouseEnter={e => {
        if (!disabled && !loading) {
          e.currentTarget.style.background = v.hoverBg;
          if (v.shadow !== 'none') e.currentTarget.style.boxShadow = v.shadow;
        }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = v.background;
        e.currentTarget.style.boxShadow = 'none';
      }}
      {...props}
    >
      {loading ? (
        <span style={{
          width: 16,
          height: 16,
          border: '2px solid rgba(255,255,255,0.3)',
          borderTopColor: '#fff',
          borderRadius: '50%',
          animation: 'spin 0.6s linear infinite',
          flexShrink: 0
        }} />
      ) : Icon ? (
        <Icon size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} style={{ flexShrink: 0 }} />
      ) : null}
      {children}
      {IconRight && !loading && (
        <IconRight size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} style={{ flexShrink: 0 }} />
      )}
    </motion.button>
  );
});

Button.displayName = 'Button';
export default Button;
