import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FileSearch, BarChart3, Target, Mic, Sparkles,
  ArrowRight, TrendingUp, Zap, ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ScoreCard from '../components/ui/ScoreCard';
import ProgressRing from '../components/ui/ProgressRing';
import Button from '../components/ui/Button';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

const stagger = {
  container: { transition: { staggerChildren: 0.06 } },
  item: {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  }
};

export default function Dashboard() {
  const { user } = useAuth();

  const recommendations = [
    { num: '01', text: 'Add measurable impact to your projects' },
    { num: '02', text: 'Mention distributed systems experience' },
    { num: '03', text: 'Strengthen database optimization keywords' }
  ];

  return (
    <motion.div
      variants={stagger.container}
      initial="hidden"
      animate="show"
    >
      {/* Header */}
      <motion.div variants={stagger.item} style={{ marginBottom: 'var(--space-10)' }}>
        <h1 style={{
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          fontWeight: 700,
          letterSpacing: 'var(--tracking-tight)',
          marginBottom: 'var(--space-2)'
        }}>
          {getGreeting()}, {user?.name?.split(' ')[0] || 'there'}.
        </h1>
        <p style={{
          fontSize: 'var(--text-base)',
          color: 'var(--text-secondary)'
        }}>
          Here's what your career profile looks like today.
        </p>
      </motion.div>

      {/* Metrics Grid */}
      <motion.div
        variants={stagger.item}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'var(--space-4)',
          marginBottom: 'var(--space-10)'
        }}
      >
        <ScoreCard label="Resume Score" value={87} icon={FileSearch} color="var(--accent)" trend={5} />
        <ScoreCard label="ATS Readiness" value={92} suffix="%" icon={BarChart3} color="var(--success)" trend={3} />
        <ScoreCard label="Skills Matched" value={18} suffix=" / 21" icon={Target} color="var(--info)" />
        <ScoreCard label="Interview Readiness" value={74} suffix="%" icon={Mic} color="var(--warning)" />
      </motion.div>

      {/* Career Intelligence */}
      <motion.div variants={stagger.item} style={{ marginBottom: 'var(--space-10)' }}>
        <h2 style={{
          fontSize: 'var(--text-lg)',
          fontWeight: 600,
          marginBottom: 'var(--space-6)',
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }}>
          <Zap size={18} style={{ color: 'var(--accent)' }} />
          Career Intelligence
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: 'var(--space-6)',
          padding: 'var(--space-8)',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-xl)'
        }}>
          <ProgressRing value={87} label="Resume Health" color="auto" />
          <ProgressRing value={92} label="ATS Compatibility" color="auto" />
          <ProgressRing value={74} label="Interview Ready" color="auto" />
          <ProgressRing value={81} label="Profile Strength" color="auto" />
        </div>
      </motion.div>

      {/* AI Recommendation */}
      <motion.div
        variants={stagger.item}
        style={{
          padding: 'var(--space-8)',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-xl)',
          marginBottom: 'var(--space-8)'
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: 'var(--space-5)'
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: 'var(--radius-md)',
            background: 'var(--accent-muted)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Sparkles size={16} style={{ color: 'var(--accent)' }} />
          </div>
          <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}>
            AI Recommendation
          </h3>
        </div>

        <p style={{
          fontSize: 'var(--text-sm)',
          color: 'var(--text-secondary)',
          lineHeight: 'var(--leading-relaxed)',
          marginBottom: 'var(--space-5)'
        }}>
          Your resume is strong for backend engineering roles. Three improvements could increase your ATS compatibility:
        </p>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-3)',
          marginBottom: 'var(--space-6)'
        }}>
          {recommendations.map(r => (
            <div key={r.num} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 12,
              padding: '10px 14px',
              background: 'var(--bg-elevated)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)'
            }}>
              <span style={{
                fontSize: 'var(--text-xs)',
                fontFamily: 'var(--font-mono)',
                color: 'var(--accent)',
                fontWeight: 600,
                marginTop: 1,
                flexShrink: 0
              }}>
                {r.num}
              </span>
              <span style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--text-secondary)'
              }}>
                {r.text}
              </span>
            </div>
          ))}
        </div>

        <Link to="/dashboard/resume-analyzer">
          <Button iconRight={ArrowRight}>Improve My Resume</Button>
        </Link>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        variants={stagger.item}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 'var(--space-4)'
        }}
      >
        {[
          { icon: FileSearch, title: 'Analyze Resume', desc: 'Upload and analyze your resume', to: '/dashboard/resume-analyzer' },
          { icon: Target, title: 'Match a Job', desc: 'Compare against a job description', to: '/dashboard/job-match' },
          { icon: Mic, title: 'Mock Interview', desc: 'Practice with AI interviewer', to: '/dashboard/mock-interview' }
        ].map((action, i) => (
          <Link key={i} to={action.to} style={{ textDecoration: 'none' }}>
            <motion.div
              whileHover={{ y: -2, borderColor: 'var(--border-strong)' }}
              style={{
                padding: 'var(--space-6)',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 'var(--radius-md)',
                background: 'var(--accent-muted)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0
              }}>
                <action.icon size={18} style={{ color: 'var(--accent)' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 2 }}>
                  {action.title}
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
                  {action.desc}
                </div>
              </div>
              <ChevronRight size={16} style={{ color: 'var(--text-tertiary)' }} />
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </motion.div>
  );
}
