import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Plus, Check, X, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import ProgressRing from '../components/ui/ProgressRing';
import Button from '../components/ui/Button';

const sections = [
  { label: 'ATS Compatibility', value: 92, color: 'var(--success)' },
  { label: 'Keyword Coverage', value: 84, color: 'var(--accent)' },
  { label: 'Experience Impact', value: 78, color: 'var(--warning)' },
  { label: 'Formatting', value: 96, color: 'var(--success)' },
  { label: 'Skills Alignment', value: 89, color: 'var(--accent)' }
];

const missingKeywords = [
  { word: 'Docker', priority: 'high' },
  { word: 'AWS', priority: 'high' },
  { word: 'Microservices', priority: 'medium' },
  { word: 'CI/CD', priority: 'medium' },
  { word: 'Kubernetes', priority: 'low' }
];

const insights = [
  {
    id: 1, severity: 'high',
    title: 'Project descriptions lack measurable outcomes',
    explanation: 'Recruiters and ATS systems look for quantifiable impact. Add metrics like "reduced latency by 40%" or "served 10K+ daily users".',
    suggestion: 'Add specific numbers, percentages, or scale metrics to at least 3 project descriptions.'
  },
  {
    id: 2, severity: 'high',
    title: 'Backend experience should appear higher on the page',
    explanation: 'ATS parsers prioritize content near the top. Your most relevant experience is buried below less relevant roles.',
    suggestion: 'Reorder your experience section to lead with backend-focused roles.'
  },
  {
    id: 3, severity: 'medium',
    title: 'Add Docker to your technical skills',
    explanation: '78% of backend engineering job postings mention Docker as a requirement.',
    suggestion: 'Add "Docker" and "containerization" to your technical skills section.'
  },
  {
    id: 4, severity: 'medium',
    title: 'Summary could be more targeted toward backend roles',
    explanation: 'Your summary is generic and doesn\'t mention your target role type or key backend technologies.',
    suggestion: 'Rewrite your summary to specifically mention backend engineering, APIs, and distributed systems.'
  },
  {
    id: 5, severity: 'low',
    title: 'Consider adding a "Projects" section header',
    explanation: 'A distinct projects section improves ATS parsing accuracy by 12%.',
    suggestion: 'Add a clearly labeled "Projects" section separate from work experience.'
  },
  {
    id: 6, severity: 'low',
    title: 'Education section formatting can be improved',
    explanation: 'Your education section uses inconsistent date formatting.',
    suggestion: 'Standardize all dates to "Month Year – Month Year" format.'
  },
  {
    id: 7, severity: 'low',
    title: 'Add relevant certifications if available',
    explanation: 'Certifications boost ATS scores by an average of 8 points for technical roles.',
    suggestion: 'Include any AWS, Docker, or cloud certifications you hold.'
  }
];

const severityColors = {
  high: { bg: 'var(--error-muted)', border: 'var(--error)', text: 'var(--error)', label: 'High' },
  medium: { bg: 'var(--warning-muted)', border: 'var(--warning)', text: 'var(--warning)', label: 'Medium' },
  low: { bg: 'var(--info-muted)', border: 'var(--info)', text: 'var(--info)', label: 'Low' }
};

const stagger = {
  container: { transition: { staggerChildren: 0.05 } },
  item: {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35 } }
  }
};

export default function ATSAnalysis() {
  const [expandedInsight, setExpandedInsight] = useState(null);
  const [appliedInsights, setAppliedInsights] = useState(new Set());
  const [dismissedInsights, setDismissedInsights] = useState(new Set());

  const applyInsight = (id) => {
    setAppliedInsights(prev => new Set([...prev, id]));
  };

  const dismissInsight = (id) => {
    setDismissedInsights(prev => new Set([...prev, id]));
  };

  const activeInsights = insights.filter(i => !dismissedInsights.has(i.id));

  return (
    <motion.div variants={stagger.container} initial="hidden" animate="show">
      {/* Header */}
      <motion.div variants={stagger.item} style={{ marginBottom: 'var(--space-8)' }}>
        <h1 style={{
          fontSize: 'var(--text-2xl)', fontWeight: 700,
          letterSpacing: 'var(--tracking-tight)', marginBottom: 'var(--space-2)'
        }}>
          Resume Intelligence
        </h1>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
          Detailed analysis of your resume's ATS performance and optimization opportunities.
        </p>
      </motion.div>

      {/* Big Score */}
      <motion.div
        variants={stagger.item}
        style={{
          display: 'flex', alignItems: 'center', gap: 'var(--space-8)',
          padding: 'var(--space-8)', background: 'var(--bg-surface)',
          border: '1px solid var(--border-default)', borderRadius: 'var(--radius-xl)',
          marginBottom: 'var(--space-8)', flexWrap: 'wrap'
        }}
      >
        <ProgressRing value={87} size={140} strokeWidth={8} color="var(--accent)" />
        <div>
          <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, marginBottom: 4 }}>
            87 / 100
          </h2>
          <p style={{
            fontSize: 'var(--text-sm)', color: 'var(--success)', fontWeight: 500, marginBottom: 8
          }}>
            Strong candidate profile
          </p>
          <p style={{
            fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', maxWidth: 400,
            lineHeight: 'var(--leading-relaxed)'
          }}>
            Your resume scores well across most categories. Focus on experience impact and keyword coverage to push past 90.
          </p>
        </div>
      </motion.div>

      {/* Section Breakdowns */}
      <motion.div
        variants={stagger.item}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 'var(--space-4)',
          marginBottom: 'var(--space-10)'
        }}
      >
        {sections.map(s => (
          <div key={s.label} style={{
            padding: 'var(--space-5)', background: 'var(--bg-surface)',
            border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)',
            textAlign: 'center'
          }}>
            <ProgressRing value={s.value} size={80} strokeWidth={5} color={s.color} />
            <div style={{
              fontSize: 'var(--text-xs)', color: 'var(--text-secondary)',
              marginTop: 'var(--space-3)', fontWeight: 500
            }}>
              {s.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Missing Keywords */}
      <motion.div variants={stagger.item} style={{ marginBottom: 'var(--space-10)' }}>
        <h3 style={{
          fontSize: 'var(--text-base)', fontWeight: 600,
          marginBottom: 'var(--space-4)'
        }}>
          Missing Keywords
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
          {missingKeywords.map(kw => (
            <div key={kw.word} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '8px 14px', background: 'var(--bg-surface)',
              border: '1px solid var(--border-default)', borderRadius: 'var(--radius-full)',
              fontSize: 'var(--text-sm)', color: 'var(--text-primary)'
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: kw.priority === 'high' ? 'var(--error)' : kw.priority === 'medium' ? 'var(--warning)' : 'var(--info)'
              }} />
              {kw.word}
              <button style={{
                width: 22, height: 22, borderRadius: 'var(--radius-full)',
                background: 'var(--accent-muted)', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                color: 'var(--accent)', cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent-muted)'; e.currentTarget.style.color = 'var(--accent)'; }}
              >
                <Plus size={12} />
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* AI Insights */}
      <motion.div variants={stagger.item}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, marginBottom: 'var(--space-5)'
        }}>
          <Sparkles size={18} style={{ color: 'var(--accent)' }} />
          <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}>
            AI detected {activeInsights.length} opportunities
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {activeInsights.map((insight, i) => {
            const sev = severityColors[insight.severity];
            const isExpanded = expandedInsight === insight.id;
            const isApplied = appliedInsights.has(insight.id);

            return (
              <motion.div
                key={insight.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                style={{
                  padding: 'var(--space-4) var(--space-5)',
                  background: isApplied ? 'var(--success-muted)' : 'var(--bg-surface)',
                  border: `1px solid ${isApplied ? 'rgba(52,211,153,0.2)' : 'var(--border-default)'}`,
                  borderRadius: 'var(--radius-lg)',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <div
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer'
                  }}
                  onClick={() => setExpandedInsight(isExpanded ? null : insight.id)}
                >
                  <span style={{
                    fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)',
                    color: 'var(--accent)', fontWeight: 600, marginTop: 2, flexShrink: 0
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap'
                    }}>
                      <span style={{
                        fontSize: 'var(--text-sm)', fontWeight: 500,
                        color: isApplied ? 'var(--success)' : 'var(--text-primary)',
                        textDecoration: isApplied ? 'line-through' : 'none'
                      }}>
                        {insight.title}
                      </span>
                      <span style={{
                        fontSize: '10px', padding: '2px 8px', borderRadius: 'var(--radius-full)',
                        background: sev.bg, color: sev.text, fontWeight: 600,
                        textTransform: 'uppercase', letterSpacing: '0.05em'
                      }}>
                        {sev.label}
                      </span>
                    </div>
                  </div>
                  <div style={{ color: 'var(--text-tertiary)', flexShrink: 0, marginTop: 2 }}>
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </div>

                {isExpanded && !isApplied && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{ marginTop: 'var(--space-4)', marginLeft: 28 }}
                  >
                    <p style={{
                      fontSize: 'var(--text-sm)', color: 'var(--text-secondary)',
                      lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--space-3)'
                    }}>
                      {insight.explanation}
                    </p>
                    <div style={{
                      padding: '10px 14px', background: 'var(--bg-elevated)',
                      borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)',
                      marginBottom: 'var(--space-4)'
                    }}>
                      <span style={{
                        fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)',
                        textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500
                      }}>
                        Suggested improvement
                      </span>
                      <p style={{
                        fontSize: 'var(--text-sm)', color: 'var(--text-primary)',
                        marginTop: 4, lineHeight: 'var(--leading-relaxed)'
                      }}>
                        {insight.suggestion}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                      <Button size="sm" onClick={() => applyInsight(insight.id)} icon={Check}>
                        Apply suggestion
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => dismissInsight(insight.id)} icon={X}>
                        Dismiss
                      </Button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
