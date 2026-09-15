import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mic, ArrowRight, Clock, ChevronDown } from 'lucide-react';
import Button from '../components/ui/Button';

const roles = ['Backend Developer', 'Frontend Developer', 'Full Stack Developer', 'Data Engineer', 'ML Engineer', 'DevOps Engineer', 'Software Engineer'];
const experiences = ['Entry Level', 'Mid Level', 'Senior', 'Lead'];
const types = ['Technical', 'Behavioral', 'System Design', 'Mixed'];
const difficulties = ['Easy', 'Medium', 'Hard'];
const durations = ['10 minutes', '15 minutes', '20 minutes', '30 minutes'];

function SelectField({ label, value, onChange, options }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{
        fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--text-secondary)'
      }}>
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{
            width: '100%', padding: '12px 40px 12px 14px',
            background: 'var(--bg-surface)', border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-md)', color: 'var(--text-primary)',
            fontSize: 'var(--text-sm)', appearance: 'none',
            cursor: 'pointer', outline: 'none',
            transition: 'border-color var(--transition-fast)'
          }}
          onFocus={e => e.target.style.borderColor = 'var(--accent)'}
          onBlur={e => e.target.style.borderColor = 'var(--border-default)'}
        >
          {options.map(opt => (
            <option key={opt} value={opt} style={{ background: 'var(--bg-elevated)' }}>{opt}</option>
          ))}
        </select>
        <ChevronDown size={16} style={{
          position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
          color: 'var(--text-tertiary)', pointerEvents: 'none'
        }} />
      </div>
    </div>
  );
}

export default function MockInterview() {
  const [role, setRole] = useState(roles[0]);
  const [experience, setExperience] = useState(experiences[0]);
  const [type, setType] = useState(types[0]);
  const [difficulty, setDifficulty] = useState(difficulties[1]);
  const [duration, setDuration] = useState(durations[2]);
  const navigate = useNavigate();

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <h1 style={{
          fontSize: 'var(--text-2xl)', fontWeight: 700,
          letterSpacing: 'var(--tracking-tight)', marginBottom: 'var(--space-2)'
        }}>
          AI Mock Interview
        </h1>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
          Practice like the interview is real.
        </p>
      </div>

      <div style={{
        maxWidth: 560,
        padding: 'var(--space-8)',
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-xl)'
      }}>
        {/* Icon */}
        <div style={{
          width: 56, height: 56, borderRadius: 'var(--radius-xl)',
          background: 'var(--accent-muted)', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          marginBottom: 'var(--space-6)'
        }}>
          <Mic size={24} style={{ color: 'var(--accent)' }} />
        </div>

        <h2 style={{
          fontSize: 'var(--text-lg)', fontWeight: 600, marginBottom: 'var(--space-2)'
        }}>
          Configure your interview
        </h2>
        <p style={{
          fontSize: 'var(--text-sm)', color: 'var(--text-secondary)',
          marginBottom: 'var(--space-8)', lineHeight: 'var(--leading-relaxed)'
        }}>
          Choose your role, experience level, and interview parameters for a personalized experience.
        </p>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 'var(--space-5)', marginBottom: 'var(--space-8)'
        }}
        className="interview-setup-grid"
        >
          <SelectField label="Choose Role" value={role} onChange={setRole} options={roles} />
          <SelectField label="Experience" value={experience} onChange={setExperience} options={experiences} />
          <SelectField label="Interview Type" value={type} onChange={setType} options={types} />
          <SelectField label="Difficulty" value={difficulty} onChange={setDifficulty} options={difficulties} />
          <SelectField label="Duration" value={duration} onChange={setDuration} options={durations} />
        </div>

        <Button
          size="lg" fullWidth iconRight={ArrowRight}
          onClick={() => navigate('/dashboard/interview-session')}
        >
          Start Interview
        </Button>
      </div>

      <style>{`
        @media (max-width: 480px) {
          .interview-setup-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </motion.div>
  );
}
