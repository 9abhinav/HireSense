import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, MoreVertical, Copy, Download, Trash2,
  BarChart3, Edit3, Eye, Plus, ArrowRight
} from 'lucide-react';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';

const initialVersions = [
  { id: 1, name: 'Backend Resume', role: 'Backend Developer', score: 87, updatedAt: '2 hours ago', status: 'Active' },
  { id: 2, name: 'Frontend Resume', role: 'Frontend Developer', score: 72, updatedAt: '3 days ago', status: 'Draft' },
  { id: 3, name: 'Full Stack Resume', role: 'Full Stack Developer', score: 81, updatedAt: '1 week ago', status: 'Active' },
  { id: 4, name: 'AI Engineer Resume', role: 'AI/ML Engineer', score: 65, updatedAt: '2 weeks ago', status: 'Draft' }
];

export default function ResumeVersions() {
  const [versions, setVersions] = useState(initialVersions);
  const [menuOpen, setMenuOpen] = useState(null);
  const [compareMode, setCompareMode] = useState(false);
  const [selected, setSelected] = useState([]);
  const [showCompare, setShowCompare] = useState(false);

  const toggleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(s => s !== id));
    } else if (selected.length < 2) {
      setSelected([...selected, id]);
    }
  };

  const deleteVersion = (id) => {
    setVersions(versions.filter(v => v.id !== id));
    setMenuOpen(null);
  };

  const duplicateVersion = (id) => {
    const original = versions.find(v => v.id === id);
    if (original) {
      setVersions([...versions, {
        ...original,
        id: Date.now(),
        name: `${original.name} (Copy)`,
        updatedAt: 'Just now',
        status: 'Draft'
      }]);
    }
    setMenuOpen(null);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'var(--success)';
    if (score >= 60) return 'var(--warning)';
    return 'var(--error)';
  };

  const stagger = {
    container: { transition: { staggerChildren: 0.06 } },
    item: { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } }
  };

  return (
    <motion.div variants={stagger.container} initial="hidden" animate="show">
      <motion.div
        variants={stagger.item}
        style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          marginBottom: 'var(--space-8)', flexWrap: 'wrap', gap: 'var(--space-4)'
        }}
      >
        <div>
          <h1 style={{
            fontSize: 'var(--text-2xl)', fontWeight: 700,
            letterSpacing: 'var(--tracking-tight)', marginBottom: 'var(--space-2)'
          }}>
            Resume Versions
          </h1>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
            Manage multiple resume versions targeted for different roles.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <Button
            variant={compareMode ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => { setCompareMode(!compareMode); setSelected([]); }}
          >
            {compareMode ? 'Cancel Compare' : 'Compare Versions'}
          </Button>
          <Button size="sm" icon={Plus}>New Version</Button>
        </div>
      </motion.div>

      {compareMode && selected.length === 2 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: 'var(--space-5)' }}
        >
          <Button onClick={() => setShowCompare(true)} iconRight={ArrowRight}>
            Compare Selected
          </Button>
        </motion.div>
      )}

      {/* Versions Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 'var(--space-4)'
      }}>
        {versions.map(version => {
          const isSelected = selected.includes(version.id);
          return (
            <motion.div
              key={version.id}
              variants={stagger.item}
              layout
              style={{
                padding: 'var(--space-5)',
                background: 'var(--bg-surface)',
                border: `1px solid ${isSelected ? 'var(--accent)' : 'var(--border-default)'}`,
                borderRadius: 'var(--radius-lg)',
                transition: 'border-color var(--transition-fast)',
                cursor: compareMode ? 'pointer' : 'default',
                position: 'relative'
              }}
              onClick={() => compareMode && toggleSelect(version.id)}
              onMouseEnter={e => {
                if (!compareMode) e.currentTarget.style.borderColor = 'var(--border-strong)';
              }}
              onMouseLeave={e => {
                if (!compareMode && !isSelected) e.currentTarget.style.borderColor = 'var(--border-default)';
              }}
            >
              {/* Checkbox for compare mode */}
              {compareMode && (
                <div style={{
                  position: 'absolute', top: 12, right: 12,
                  width: 20, height: 20, borderRadius: 'var(--radius-sm)',
                  border: `2px solid ${isSelected ? 'var(--accent)' : 'var(--border-default)'}`,
                  background: isSelected ? 'var(--accent)' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all var(--transition-fast)'
                }}>
                  {isSelected && (
                    <svg width="12" height="12" viewBox="0 0 12 12">
                      <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              )}

              {/* Header */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 12, marginBottom: 'var(--space-4)'
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 'var(--radius-md)',
                  background: 'var(--accent-muted)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                  <FileText size={18} style={{ color: 'var(--accent)' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: 'var(--text-sm)', fontWeight: 600,
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                  }}>
                    {version.name}
                  </div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
                    {version.role}
                  </div>
                </div>
                {!compareMode && (
                  <div style={{ position: 'relative' }}>
                    <button
                      onClick={(e) => { e.stopPropagation(); setMenuOpen(menuOpen === version.id ? null : version.id); }}
                      style={{
                        width: 28, height: 28, borderRadius: 'var(--radius-sm)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'var(--text-tertiary)', transition: 'all var(--transition-fast)'
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-hover)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-tertiary)'; }}
                    >
                      <MoreVertical size={14} />
                    </button>

                    {/* Dropdown */}
                    <AnimatePresence>
                      {menuOpen === version.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: -4 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -4 }}
                          style={{
                            position: 'absolute', top: '100%', right: 0, marginTop: 4,
                            background: 'var(--bg-elevated)', border: '1px solid var(--border-default)',
                            borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-lg)',
                            minWidth: 160, zIndex: 50, overflow: 'hidden'
                          }}
                        >
                          {[
                            { icon: Edit3, label: 'Edit', action: () => setMenuOpen(null) },
                            { icon: BarChart3, label: 'Analyze', action: () => setMenuOpen(null) },
                            { icon: Copy, label: 'Duplicate', action: () => duplicateVersion(version.id) },
                            { icon: Download, label: 'Download', action: () => setMenuOpen(null) },
                            { icon: Trash2, label: 'Delete', action: () => deleteVersion(version.id), danger: true }
                          ].map(item => (
                            <button
                              key={item.label}
                              onClick={item.action}
                              style={{
                                width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                                padding: '10px 14px', fontSize: 'var(--text-sm)',
                                color: item.danger ? 'var(--error)' : 'var(--text-secondary)',
                                transition: 'all var(--transition-fast)', textAlign: 'left'
                              }}
                              onMouseEnter={e => {
                                e.currentTarget.style.background = item.danger ? 'var(--error-muted)' : 'var(--bg-hover)';
                                e.currentTarget.style.color = item.danger ? 'var(--error)' : 'var(--text-primary)';
                              }}
                              onMouseLeave={e => {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.color = item.danger ? 'var(--error)' : 'var(--text-secondary)';
                              }}
                            >
                              <item.icon size={14} />
                              {item.label}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {/* Score */}
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '10px 14px', background: 'var(--bg-elevated)',
                borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)',
                marginBottom: 'var(--space-3)'
              }}>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
                  ATS Score
                </span>
                <span style={{
                  fontSize: 'var(--text-sm)', fontWeight: 700,
                  color: getScoreColor(version.score)
                }}>
                  {version.score}/100
                </span>
              </div>

              {/* Footer */}
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
              }}>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
                  Updated {version.updatedAt}
                </span>
                <span style={{
                  fontSize: '10px', padding: '2px 8px', borderRadius: 'var(--radius-full)',
                  background: version.status === 'Active' ? 'var(--success-muted)' : 'var(--bg-hover)',
                  color: version.status === 'Active' ? 'var(--success)' : 'var(--text-tertiary)',
                  fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em'
                }}>
                  {version.status}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Compare Modal */}
      <Modal isOpen={showCompare} onClose={() => setShowCompare(false)} title="Version Comparison" maxWidth={640}>
        {selected.length === 2 && (
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-5)'
          }}>
            {selected.map(id => {
              const v = versions.find(ver => ver.id === id);
              if (!v) return null;
              return (
                <div key={id} style={{
                  padding: 'var(--space-5)', background: 'var(--bg-surface)',
                  borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-default)',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-3)'
                  }}>
                    {v.name}
                  </div>
                  <div style={{
                    fontSize: 'var(--text-3xl)', fontWeight: 800,
                    color: getScoreColor(v.score), marginBottom: 4
                  }}>
                    {v.score}
                  </div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
                    ATS Score
                  </div>
                  <div style={{
                    fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: 8
                  }}>
                    Target: {v.role}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Modal>
    </motion.div>
  );
}
