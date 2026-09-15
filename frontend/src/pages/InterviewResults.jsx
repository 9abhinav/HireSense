import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, ArrowRight, RefreshCw, Sparkles, Check, AlertTriangle, BookOpen } from 'lucide-react';
import ProgressRing from '../components/ui/ProgressRing';
import Button from '../components/ui/Button';

const scores = [
  { label: 'Communication', value: 88, color: 'var(--success)' },
  { label: 'Technical Depth', value: 79, color: 'var(--accent)' },
  { label: 'Problem Solving', value: 84, color: 'var(--success)' },
  { label: 'Confidence', value: 76, color: 'var(--warning)' },
  { label: 'Answer Quality', value: 83, color: 'var(--accent)' }
];

const wellDone = [
  'Clear and structured explanations of technical concepts',
  'Good use of specific examples from past experience',
  'Demonstrated understanding of system design principles',
  'Confident communication throughout most answers'
];

const toImprove = [
  'Use the STAR framework more consistently when discussing challenges',
  'Provide more quantitative metrics when describing project outcomes',
  'Dive deeper into technical trade-offs when discussing architecture decisions',
  'Take a moment to structure your answer before responding'
];

const practice = [
  'System design questions for distributed architectures',
  'Behavioral questions using STAR format',
  'Database optimization and query performance scenarios'
];

const stagger = {
  container: { transition: { staggerChildren: 0.06 } },
  item: {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35 } }
  }
};

export default function InterviewResults() {
  return (
    <motion.div variants={stagger.container} initial="hidden" animate="show">
      {/* Header */}
      <motion.div
        variants={stagger.item}
        style={{
          textAlign: 'center',
          padding: 'var(--space-8) 0',
          marginBottom: 'var(--space-6)'
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          style={{
            width: 64, height: 64, borderRadius: 'var(--radius-2xl)',
            background: 'var(--accent-gradient)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto var(--space-5)',
            boxShadow: 'var(--shadow-glow-lg)'
          }}
        >
          <Trophy size={28} style={{ color: '#fff' }} />
        </motion.div>
        <h1 style={{
          fontSize: 'var(--text-2xl)', fontWeight: 700,
          letterSpacing: 'var(--tracking-tight)', marginBottom: 'var(--space-2)'
        }}>
          Interview Complete
        </h1>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
          Here's your detailed performance breakdown.
        </p>
      </motion.div>

      {/* Overall Score */}
      <motion.div
        variants={stagger.item}
        style={{
          textAlign: 'center',
          padding: 'var(--space-8)',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-xl)',
          marginBottom: 'var(--space-8)'
        }}
      >
        <span style={{
          fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)',
          textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 500
        }}>
          Overall Score
        </span>
        <div style={{ margin: 'var(--space-5) auto' }}>
          <ProgressRing value={82} size={160} strokeWidth={8} color="var(--accent)" />
        </div>
      </motion.div>

      {/* Score Breakdown */}
      <motion.div
        variants={stagger.item}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: 'var(--space-4)',
          marginBottom: 'var(--space-8)'
        }}
      >
        {scores.map(s => (
          <div key={s.label} style={{
            padding: 'var(--space-5)', background: 'var(--bg-surface)',
            border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)',
            textAlign: 'center'
          }}>
            <ProgressRing value={s.value} size={72} strokeWidth={5} color={s.color} />
            <div style={{
              fontSize: 'var(--text-xs)', color: 'var(--text-secondary)',
              marginTop: 'var(--space-3)', fontWeight: 500
            }}>
              {s.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* AI Feedback */}
      <motion.div
        variants={stagger.item}
        style={{
          padding: 'var(--space-6)',
          background: 'var(--accent-muted)',
          border: '1px solid var(--border-accent)',
          borderRadius: 'var(--radius-xl)',
          marginBottom: 'var(--space-6)',
          display: 'flex', gap: 14
        }}
      >
        <Sparkles size={20} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2 }} />
        <div>
          <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>
            AI Interviewer Feedback
          </h3>
          <p style={{
            fontSize: 'var(--text-sm)', color: 'var(--text-secondary)',
            lineHeight: 'var(--leading-relaxed)'
          }}>
            Your technical explanation was strong, but your answers could be more structured. Use the STAR framework when discussing project challenges. Focus on providing quantifiable outcomes to make your impact more tangible to interviewers.
          </p>
        </div>
      </motion.div>

      {/* Feedback Sections */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 'var(--space-5)',
        marginBottom: 'var(--space-8)'
      }}>
        {/* What you did well */}
        <motion.div
          variants={stagger.item}
          style={{
            padding: 'var(--space-6)', background: 'var(--bg-surface)',
            border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)'
          }}
        >
          <h3 style={{
            fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-4)',
            display: 'flex', alignItems: 'center', gap: 8
          }}>
            <Check size={16} style={{ color: 'var(--success)' }} />
            What you did well
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {wellDone.map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 10
              }}>
                <div style={{
                  width: 5, height: 5, borderRadius: '50%',
                  background: 'var(--success)', flexShrink: 0, marginTop: 7
                }} />
                <span style={{
                  fontSize: 'var(--text-sm)', color: 'var(--text-secondary)',
                  lineHeight: 'var(--leading-relaxed)'
                }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* What to improve */}
        <motion.div
          variants={stagger.item}
          style={{
            padding: 'var(--space-6)', background: 'var(--bg-surface)',
            border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)'
          }}
        >
          <h3 style={{
            fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-4)',
            display: 'flex', alignItems: 'center', gap: 8
          }}>
            <AlertTriangle size={16} style={{ color: 'var(--warning)' }} />
            What to improve
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {toImprove.map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 10
              }}>
                <div style={{
                  width: 5, height: 5, borderRadius: '50%',
                  background: 'var(--warning)', flexShrink: 0, marginTop: 7
                }} />
                <span style={{
                  fontSize: 'var(--text-sm)', color: 'var(--text-secondary)',
                  lineHeight: 'var(--leading-relaxed)'
                }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recommended Practice */}
      <motion.div
        variants={stagger.item}
        style={{
          padding: 'var(--space-6)', background: 'var(--bg-surface)',
          border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)',
          marginBottom: 'var(--space-8)'
        }}
      >
        <h3 style={{
          fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-4)',
          display: 'flex', alignItems: 'center', gap: 8
        }}>
          <BookOpen size={16} style={{ color: 'var(--info)' }} />
          Recommended Practice
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {practice.map((item, i) => (
            <div key={i} style={{
              padding: '10px 14px', background: 'var(--bg-elevated)',
              borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)',
              fontSize: 'var(--text-sm)', color: 'var(--text-secondary)'
            }}>
              {item}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div
        variants={stagger.item}
        style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}
      >
        <Link to="/dashboard/mock-interview">
          <Button size="lg" icon={RefreshCw}>Practice Again</Button>
        </Link>
        <Link to="/dashboard">
          <Button size="lg" variant="secondary" iconRight={ArrowRight}>Back to Dashboard</Button>
        </Link>
      </motion.div>
    </motion.div>
  );
}
