import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Search, Inbox } from 'lucide-react';
import Button from './Button';

const defaultIcons = {
  resume: FileText,
  search: Search,
  default: Inbox
};

export default function EmptyState({
  icon: CustomIcon,
  iconType = 'default',
  title = 'Nothing here yet',
  description = 'Get started by taking an action.',
  actionLabel,
  onAction,
  style = {}
}) {
  const Icon = CustomIcon || defaultIcons[iconType] || defaultIcons.default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 24px',
        textAlign: 'center',
        ...style
      }}
    >
      <div style={{
        width: 64,
        height: 64,
        borderRadius: 'var(--radius-xl)',
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border-default)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
      }}>
        <Icon size={28} style={{ color: 'var(--text-tertiary)' }} />
      </div>
      <h3 style={{
        fontSize: 'var(--text-lg)',
        fontWeight: 600,
        color: 'var(--text-primary)',
        marginBottom: 8
      }}>
        {title}
      </h3>
      <p style={{
        fontSize: 'var(--text-sm)',
        color: 'var(--text-secondary)',
        maxWidth: 320,
        lineHeight: 'var(--leading-relaxed)'
      }}>
        {description}
      </p>
      {actionLabel && (
        <div style={{ marginTop: 20 }}>
          <Button onClick={onAction}>{actionLabel}</Button>
        </div>
      )}
    </motion.div>
  );
}
