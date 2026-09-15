import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Sparkles, ArrowDown, Star } from 'lucide-react';
import ProgressRing from '../components/ui/ProgressRing';

const recommendedSkills = [
  { name: 'Docker', priority: 'High', category: 'DevOps' },
  { name: 'Redis', priority: 'High', category: 'Database' },
  { name: 'AWS', priority: 'High', category: 'Cloud' },
  { name: 'System Design', priority: 'Medium', category: 'Architecture' },
  { name: 'PostgreSQL', priority: 'Medium', category: 'Database' },
  { name: 'Kubernetes', priority: 'Low', category: 'DevOps' }
];

const trajectory = [
  { role: 'Current Position', status: 'current' },
  { role: 'Backend Developer', status: 'next' },
  { role: 'Senior Backend Engineer', status: 'future' },
  { role: 'Software Engineer II', status: 'future' }
];

const priorityColors = {
  High: { bg: 'var(--error-muted)', text: 'var(--error)' },
  Medium: { bg: 'var(--warning-muted)', text: 'var(--warning)' },
  Low: { bg: 'var(--info-muted)', text: 'var(--info)' }
};

const stagger = {
  container: { transition: { staggerChildren: 0.06 } },
  item: {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35 } }
  }
};

export default function CareerInsights() {
  return (
    <motion.div variants={stagger.container} initial="hidden" animate="show">
      <motion.div variants={stagger.item} style={{ marginBottom: 'var(--space-8)' }}>
        <h1 style={{
          fontSize: 'var(--text-2xl)', fontWeight: 700,
          letterSpacing: 'var(--tracking-tight)', marginBottom: 'var(--space-2)'
        }}>
          Your Career Intelligence
        </h1>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
          AI-powered insights to guide your career trajectory.
        </p>
      </motion.div>

      {/* Top Cards */}
      <motion.div
        variants={stagger.item}
        style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 'var(--space-4)', marginBottom: 'var(--space-8)'
        }}
      >
        <div style={{
          padding: 'var(--space-6)', background: 'var(--bg-surface)',
          border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)'
        }}>
          <span style={{
            fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)',
            textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500
          }}>
            Target Role
          </span>
          <div style={{
            fontSize: 'var(--text-xl)', fontWeight: 700, marginTop: 4,
            color: 'var(--text-primary)'
          }}>
            Backend Developer
          </div>
        </div>
        <div style={{
          padding: 'var(--space-6)', background: 'var(--bg-surface)',
          border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)',
          display: 'flex', alignItems: 'center', gap: 'var(--space-5)'
        }}>
          <ProgressRing value={81} size={80} strokeWidth={5} color="auto" />
          <div>
            <span style={{
              fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)',
              textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500
            }}>
              Profile Strength
            </span>
            <div style={{
              fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--text-primary)', marginTop: 2
            }}>
              81%
            </div>
          </div>
        </div>
      </motion.div>

      {/* Recommended Skills */}
      <motion.div variants={stagger.item} style={{ marginBottom: 'var(--space-8)' }}>
        <h2 style={{
          fontSize: 'var(--text-base)', fontWeight: 600, marginBottom: 'var(--space-4)',
          display: 'flex', alignItems: 'center', gap: 8
        }}>
          <Star size={16} style={{ color: 'var(--accent)' }} />
          Recommended Skills to Learn
        </h2>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 'var(--space-3)'
        }}>
          {recommendedSkills.map(skill => {
            const pc = priorityColors[skill.priority];
            return (
              <div key={skill.name} style={{
                padding: '14px 18px', background: 'var(--bg-surface)',
                border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                transition: 'border-color var(--transition-fast)'
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-strong)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-default)'}
              >
                <div>
                  <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 2 }}>
                    {skill.name}
                  </div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
                    {skill.category}
                  </div>
                </div>
                <span style={{
                  fontSize: '10px', padding: '3px 8px', borderRadius: 'var(--radius-full)',
                  background: pc.bg, color: pc.text, fontWeight: 600,
                  textTransform: 'uppercase', letterSpacing: '0.05em'
                }}>
                  {skill.priority}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Career Trajectory */}
      <motion.div variants={stagger.item} style={{ marginBottom: 'var(--space-8)' }}>
        <h2 style={{
          fontSize: 'var(--text-base)', fontWeight: 600, marginBottom: 'var(--space-5)',
          display: 'flex', alignItems: 'center', gap: 8
        }}>
          <TrendingUp size={16} style={{ color: 'var(--accent)' }} />
          Career Trajectory
        </h2>
        <div style={{
          padding: 'var(--space-6)', background: 'var(--bg-surface)',
          border: '1px solid var(--border-default)', borderRadius: 'var(--radius-xl)'
        }}>
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0
          }}>
            {trajectory.map((step, i) => (
              <React.Fragment key={step.role}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.15 }}
                  style={{
                    padding: '14px 28px',
                    background: step.status === 'current' ? 'var(--accent-muted)' :
                      step.status === 'next' ? 'var(--bg-elevated)' : 'var(--bg-elevated)',
                    border: `1px solid ${step.status === 'current' ? 'var(--border-accent)' : 'var(--border-subtle)'}`,
                    borderRadius: 'var(--radius-lg)',
                    fontSize: 'var(--text-sm)', fontWeight: step.status === 'current' ? 600 : 500,
                    color: step.status === 'current' ? 'var(--accent-hover)' : 'var(--text-secondary)',
                    textAlign: 'center', minWidth: 220
                  }}
                >
                  {step.role}
                </motion.div>
                {i < trajectory.length - 1 && (
                  <div style={{
                    width: 1, height: 28,
                    background: 'var(--border-default)',
                    position: 'relative'
                  }}>
                    <ArrowDown size={12} style={{
                      position: 'absolute', bottom: -4, left: '50%', transform: 'translateX(-50%)',
                      color: 'var(--text-tertiary)'
                    }} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </motion.div>

      {/* AI Career Recommendations */}
      <motion.div
        variants={stagger.item}
        style={{
          padding: 'var(--space-6)',
          background: 'var(--accent-muted)',
          border: '1px solid var(--border-accent)',
          borderRadius: 'var(--radius-xl)',
          display: 'flex', gap: 14
        }}
      >
        <Sparkles size={20} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2 }} />
        <div>
          <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>
            AI Career Recommendations
          </h3>
          <p style={{
            fontSize: 'var(--text-sm)', color: 'var(--text-secondary)',
            lineHeight: 'var(--leading-relaxed)'
          }}>
            Based on your resume and target roles, Docker and cloud deployment are your two highest-value skills to develop next. Companies hiring for backend roles increasingly require container orchestration experience. Consider building a project deployed on AWS ECS or Google Cloud Run to demonstrate these capabilities.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
