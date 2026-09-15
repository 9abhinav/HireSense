import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Briefcase, GraduationCap, Code, FolderOpen, Target, Edit3, Check, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Button from '../components/ui/Button';

function EditableField({ label, value, onSave, multiline = false }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  const save = () => {
    onSave(draft);
    setEditing(false);
  };

  const cancel = () => {
    setDraft(value);
    setEditing(false);
  };

  return (
    <div style={{
      padding: '14px 18px',
      background: 'var(--bg-elevated)',
      borderRadius: 'var(--radius-md)',
      border: '1px solid var(--border-subtle)'
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: editing ? 10 : 0
      }}>
        <span style={{
          fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)',
          textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 500
        }}>
          {label}
        </span>
        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            style={{
              width: 24, height: 24, borderRadius: 'var(--radius-sm)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--text-tertiary)', cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.background = 'var(--accent-muted)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-tertiary)'; e.currentTarget.style.background = 'transparent'; }}
          >
            <Edit3 size={12} />
          </button>
        ) : (
          <div style={{ display: 'flex', gap: 4 }}>
            <button onClick={save} style={{
              width: 24, height: 24, borderRadius: 'var(--radius-sm)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--success)', cursor: 'pointer', background: 'var(--success-muted)'
            }}>
              <Check size={12} />
            </button>
            <button onClick={cancel} style={{
              width: 24, height: 24, borderRadius: 'var(--radius-sm)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--error)', cursor: 'pointer', background: 'var(--error-muted)'
            }}>
              <X size={12} />
            </button>
          </div>
        )}
      </div>
      {editing ? (
        multiline ? (
          <textarea
            value={draft}
            onChange={e => setDraft(e.target.value)}
            style={{
              width: '100%', minHeight: 80, padding: 10,
              background: 'var(--bg-surface)', border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)',
              fontSize: 'var(--text-sm)', fontFamily: 'var(--font-sans)',
              resize: 'vertical', outline: 'none'
            }}
            onFocus={e => e.target.style.borderColor = 'var(--accent)'}
            onBlur={e => e.target.style.borderColor = 'var(--border-default)'}
            autoFocus
          />
        ) : (
          <input
            value={draft}
            onChange={e => setDraft(e.target.value)}
            style={{
              width: '100%', padding: '8px 10px',
              background: 'var(--bg-surface)', border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)',
              fontSize: 'var(--text-sm)', outline: 'none'
            }}
            onFocus={e => e.target.style.borderColor = 'var(--accent)'}
            onBlur={e => e.target.style.borderColor = 'var(--border-default)'}
            autoFocus
            onKeyDown={e => e.key === 'Enter' && save()}
          />
        )
      ) : (
        <p style={{
          fontSize: 'var(--text-sm)', color: 'var(--text-primary)',
          lineHeight: 'var(--leading-relaxed)', marginTop: 6
        }}>
          {value || <span style={{ color: 'var(--text-tertiary)', fontStyle: 'italic' }}>Not set</span>}
        </p>
      )}
    </div>
  );
}

const stagger = {
  container: { transition: { staggerChildren: 0.05 } },
  item: { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } }
};

export default function Profile() {
  const { user, updateUser } = useAuth();
  const toast = useToast();

  const [profile, setProfile] = useState({
    name: user?.name || 'Abhinav Sharma',
    email: user?.email || 'abhinav@example.com',
    summary: 'Backend developer with experience in Python, FastAPI, and MongoDB. Passionate about building scalable APIs and distributed systems.',
    skills: 'Python, FastAPI, MongoDB, Docker, REST APIs, Git, PostgreSQL, JavaScript, React',
    experience: 'Software Engineer Intern at TechCorp (2025)\nBackend Developer at StartupXYZ (2024)',
    education: 'B.Tech in Computer Science, XYZ University (2022-2026)',
    projects: 'HireSense — AI Career Intelligence Platform\nTaskFlow — Distributed Task Queue System\nChatBot — LangChain + Gemini powered assistant',
    targetRoles: 'Backend Developer, Software Engineer, Full Stack Developer'
  });

  const updateField = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
    toast.success('Profile updated');
  };

  const sections = [
    { icon: User, label: 'Full Name', key: 'name' },
    { icon: Mail, label: 'Email', key: 'email' },
    { icon: Briefcase, label: 'Professional Summary', key: 'summary', multiline: true },
    { icon: Code, label: 'Skills', key: 'skills', multiline: true },
    { icon: Briefcase, label: 'Experience', key: 'experience', multiline: true },
    { icon: GraduationCap, label: 'Education', key: 'education', multiline: true },
    { icon: FolderOpen, label: 'Projects', key: 'projects', multiline: true },
    { icon: Target, label: 'Target Roles', key: 'targetRoles' }
  ];

  return (
    <motion.div variants={stagger.container} initial="hidden" animate="show">
      <motion.div variants={stagger.item} style={{ marginBottom: 'var(--space-8)' }}>
        <h1 style={{
          fontSize: 'var(--text-2xl)', fontWeight: 700,
          letterSpacing: 'var(--tracking-tight)', marginBottom: 'var(--space-2)'
        }}>
          Profile
        </h1>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
          Manage your personal and professional information.
        </p>
      </motion.div>

      {/* Avatar */}
      <motion.div
        variants={stagger.item}
        style={{
          display: 'flex', alignItems: 'center', gap: 'var(--space-5)',
          padding: 'var(--space-6)',
          background: 'var(--bg-surface)', border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-xl)', marginBottom: 'var(--space-6)'
        }}
      >
        <div style={{
          width: 64, height: 64, borderRadius: 'var(--radius-xl)',
          background: 'var(--accent-gradient)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 'var(--text-2xl)', fontWeight: 700, color: '#fff', flexShrink: 0
        }}>
          {profile.name?.charAt(0)?.toUpperCase() || 'U'}
        </div>
        <div>
          <div style={{ fontSize: 'var(--text-lg)', fontWeight: 600, marginBottom: 2 }}>
            {profile.name}
          </div>
          <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
            {profile.email}
          </div>
        </div>
      </motion.div>

      {/* Profile Fields */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {sections.map(section => (
          <motion.div key={section.key} variants={stagger.item}>
            <EditableField
              label={section.label}
              value={profile[section.key]}
              onSave={(val) => updateField(section.key, val)}
              multiline={section.multiline}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
