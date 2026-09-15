import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, ArrowRight, Check, X, Sparkles, Loader } from 'lucide-react';
import ProgressRing from '../components/ui/ProgressRing';
import Button from '../components/ui/Button';

const matchingSkills = ['Python', 'FastAPI', 'MongoDB', 'REST APIs', 'Docker', 'Git', 'PostgreSQL'];
const missingSkills = ['AWS', 'Kubernetes', 'Redis', 'Terraform'];

export default function JobMatch() {
  const [jobDescription, setJobDescription] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) return;
    setAnalyzing(true);
    await new Promise(r => setTimeout(r, 2000));
    setResult({
      score: 91,
      matchingSkills,
      missingSkills,
      whyGood: 'Your resume demonstrates strong proficiency in backend development with Python and FastAPI, which are the primary technologies mentioned in this role. Your MongoDB experience directly aligns with the database requirements, and your REST API development experience matches the core job responsibilities.',
      improvements: 'To strengthen your application, consider highlighting any cloud deployment experience (especially AWS). If you have worked with container orchestration tools, even in personal projects, add that to your resume. Redis caching experience would also be valuable for this role.'
    });
    setAnalyzing(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <h1 style={{
          fontSize: 'var(--text-2xl)', fontWeight: 700,
          letterSpacing: 'var(--tracking-tight)', marginBottom: 'var(--space-2)'
        }}>
          Job Description Matching
        </h1>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
          Paste a job description to see how well your resume matches.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: result ? '1fr 1fr' : '1fr',
        gap: 'var(--space-6)',
        alignItems: 'start'
      }} className="job-match-grid">
        {/* Left — Job Description */}
        <div>
          <label style={{
            fontSize: 'var(--text-sm)', fontWeight: 500,
            color: 'var(--text-secondary)', marginBottom: 8, display: 'block'
          }}>
            Job Description
          </label>
          <textarea
            value={jobDescription}
            onChange={e => setJobDescription(e.target.value)}
            placeholder="Paste the complete job description here..."
            style={{
              width: '100%', minHeight: 300, padding: 'var(--space-4)',
              background: 'var(--bg-surface)', border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-lg)', color: 'var(--text-primary)',
              fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)',
              resize: 'vertical', fontFamily: 'var(--font-sans)',
              transition: 'border-color var(--transition-fast)',
              outline: 'none'
            }}
            onFocus={e => e.target.style.borderColor = 'var(--accent)'}
            onBlur={e => e.target.style.borderColor = 'var(--border-default)'}
          />
          {!result && (
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} style={{ marginTop: 'var(--space-4)' }}>
              <Button
                size="lg" onClick={handleAnalyze}
                loading={analyzing}
                iconRight={!analyzing ? ArrowRight : undefined}
                disabled={!jobDescription.trim()}
              >
                {analyzing ? 'Analyzing Match...' : 'Analyze Match'}
              </Button>
            </motion.div>
          )}
        </div>

        {/* Right — Results */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Match Score */}
              <div style={{
                padding: 'var(--space-6)', background: 'var(--bg-surface)',
                border: '1px solid var(--border-default)', borderRadius: 'var(--radius-xl)',
                textAlign: 'center', marginBottom: 'var(--space-5)'
              }}>
                <span style={{
                  fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)',
                  textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 500
                }}>
                  Match Score
                </span>
                <div style={{ margin: 'var(--space-4) auto' }}>
                  <ProgressRing value={result.score} size={120} strokeWidth={7} color="var(--success)" />
                </div>
              </div>

              {/* Matching Skills */}
              <div style={{
                padding: 'var(--space-5)', background: 'var(--bg-surface)',
                border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)',
                marginBottom: 'var(--space-4)'
              }}>
                <h4 style={{
                  fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-3)',
                  display: 'flex', alignItems: 'center', gap: 6
                }}>
                  <Check size={14} style={{ color: 'var(--success)' }} />
                  Matching Skills
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {result.matchingSkills.map(s => (
                    <span key={s} style={{
                      padding: '4px 10px', borderRadius: 'var(--radius-full)',
                      background: 'var(--success-muted)', color: 'var(--success)',
                      fontSize: 'var(--text-xs)', fontWeight: 500
                    }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing Skills */}
              <div style={{
                padding: 'var(--space-5)', background: 'var(--bg-surface)',
                border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)',
                marginBottom: 'var(--space-5)'
              }}>
                <h4 style={{
                  fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-3)',
                  display: 'flex', alignItems: 'center', gap: 6
                }}>
                  <X size={14} style={{ color: 'var(--error)' }} />
                  Missing Skills
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {result.missingSkills.map(s => (
                    <span key={s} style={{
                      padding: '4px 10px', borderRadius: 'var(--radius-full)',
                      background: 'var(--error-muted)', color: 'var(--error)',
                      fontSize: 'var(--text-xs)', fontWeight: 500
                    }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* AI Analysis */}
              <div style={{
                padding: 'var(--space-5)', background: 'var(--bg-surface)',
                border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)',
                marginBottom: 'var(--space-4)'
              }}>
                <h4 style={{
                  fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-3)',
                  display: 'flex', alignItems: 'center', gap: 6
                }}>
                  <Sparkles size={14} style={{ color: 'var(--accent)' }} />
                  Why you're a good match
                </h4>
                <p style={{
                  fontSize: 'var(--text-sm)', color: 'var(--text-secondary)',
                  lineHeight: 'var(--leading-relaxed)'
                }}>
                  {result.whyGood}
                </p>
              </div>

              <div style={{
                padding: 'var(--space-5)', background: 'var(--bg-surface)',
                border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)'
              }}>
                <h4 style={{
                  fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-3)',
                  display: 'flex', alignItems: 'center', gap: 6
                }}>
                  <Sparkles size={14} style={{ color: 'var(--warning)' }} />
                  What to improve
                </h4>
                <p style={{
                  fontSize: 'var(--text-sm)', color: 'var(--text-secondary)',
                  lineHeight: 'var(--leading-relaxed)'
                }}>
                  {result.improvements}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .job-match-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </motion.div>
  );
}
