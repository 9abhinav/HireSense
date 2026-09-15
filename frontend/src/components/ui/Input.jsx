import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function Input({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  icon: Icon,
  disabled = false,
  required = false,
  id,
  name,
  autoComplete,
  style = {},
  ...props
}) {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {label && (
        <label
          htmlFor={id}
          style={{
            fontSize: 'var(--text-sm)',
            fontWeight: 500,
            color: error ? 'var(--error)' : 'var(--text-secondary)'
          }}
        >
          {label}
          {required && <span style={{ color: 'var(--error)', marginLeft: 4 }}>*</span>}
        </label>
      )}
      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
      }}>
        {Icon && (
          <Icon
            size={16}
            style={{
              position: 'absolute',
              left: 14,
              color: focused ? 'var(--accent)' : 'var(--text-tertiary)',
              transition: 'color var(--transition-fast)',
              pointerEvents: 'none',
              zIndex: 1
            }}
          />
        )}
        <input
          id={id}
          name={name}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: '100%',
            padding: `12px ${isPassword ? '44px' : '14px'} 12px ${Icon ? '42px' : '14px'}`,
            fontSize: 'var(--text-sm)',
            color: 'var(--text-primary)',
            background: 'var(--bg-surface)',
            border: `1px solid ${error ? 'var(--error)' : focused ? 'var(--accent)' : 'var(--border-default)'}`,
            borderRadius: 'var(--radius-md)',
            transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
            outline: 'none',
            boxShadow: focused ? `0 0 0 3px ${error ? 'var(--error-muted)' : 'var(--accent-muted)'}` : 'none',
            opacity: disabled ? 0.5 : 1,
            cursor: disabled ? 'not-allowed' : 'text'
          }}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            style={{
              position: 'absolute',
              right: 12,
              padding: 4,
              color: 'var(--text-tertiary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              borderRadius: 'var(--radius-sm)',
              transition: 'color var(--transition-fast)'
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-secondary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-tertiary)'}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {error && (
        <span style={{
          fontSize: 'var(--text-xs)',
          color: 'var(--error)',
          marginTop: 2
        }}>
          {error}
        </span>
      )}
    </div>
  );
}
