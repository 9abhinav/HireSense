import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';

const ToastContext = createContext(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
}

let toastId = 0;

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info
};

const colors = {
  success: { bg: 'var(--success-muted)', border: 'var(--success)', icon: 'var(--success)' },
  error: { bg: 'var(--error-muted)', border: 'var(--error)', icon: 'var(--error)' },
  warning: { bg: 'var(--warning-muted)', border: 'var(--warning)', icon: 'var(--warning)' },
  info: { bg: 'var(--info-muted)', border: 'var(--info)', icon: 'var(--info)' }
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = ++toastId;
    setToasts(prev => [...prev, { id, message, type }]);
    if (duration > 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, duration);
    }
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const toast = {
    success: (msg, dur) => addToast(msg, 'success', dur),
    error: (msg, dur) => addToast(msg, 'error', dur),
    warning: (msg, dur) => addToast(msg, 'warning', dur),
    info: (msg, dur) => addToast(msg, 'info', dur)
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 'var(--z-toast)',
        display: 'flex',
        flexDirection: 'column-reverse',
        gap: 8,
        pointerEvents: 'none'
      }}>
        <AnimatePresence>
          {toasts.map(t => {
            const Icon = icons[t.type];
            const color = colors[t.type];
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                style={{
                  pointerEvents: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 16px',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-default)',
                  borderLeft: `3px solid ${color.border}`,
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-lg)',
                  maxWidth: 400,
                  minWidth: 280
                }}
              >
                <Icon size={18} style={{ color: color.icon, flexShrink: 0 }} />
                <span style={{ fontSize: 'var(--text-sm)', flex: 1 }}>{t.message}</span>
                <button
                  onClick={() => removeToast(t.id)}
                  style={{
                    flexShrink: 0,
                    padding: 4,
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-tertiary)',
                    transition: 'var(--transition-fast)'
                  }}
                  onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
                  onMouseLeave={e => e.target.style.color = 'var(--text-tertiary)'}
                >
                  <X size={14} />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
