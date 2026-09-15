import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import {
  ArrowRight,
  FileSearch,
  BarChart3,
  Mic,
  TrendingUp,
  FileStack,
  Briefcase,
  Sparkles,
  CheckCircle,
  Zap,
  Shield,
  Target,
  ChevronRight
} from 'lucide-react';
import Button from '../components/ui/Button';

/* ── Animated Counter ─────────────────────────────────── */
function AnimCounter({ end, duration = 2000, suffix = '', prefix = '' }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const startTime = performance.now();
    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(end * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };
    const t = setTimeout(() => requestAnimationFrame(animate), 500);
    return () => clearTimeout(t);
  }, [end, duration]);
  return <>{prefix}{val}{suffix}</>;
}

/* ── Waveform Bar ─────────────────────────────────────── */
function WaveformBar({ delay }) {
  return (
    <motion.div
      animate={{ height: [4, 18, 8, 22, 4] }}
      transition={{ repeat: Infinity, duration: 1.2, delay, ease: 'easeInOut' }}
      style={{
        width: 3,
        borderRadius: 2,
        background: 'var(--accent)',
        opacity: 0.6
      }}
    />
  );
}

/* ── Floating Panel (Hero Visual) ─────────────────────── */
function HeroPanel() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(t);
  }, []);

  const barData = [
    { label: 'Keyword Match', value: 88 },
    { label: 'Experience', status: 'Strong', color: 'var(--success)' },
    { label: 'Skills', status: 'Excellent', color: 'var(--success)' },
    { label: 'Impact', status: 'Needs improvement', color: 'var(--warning)' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: 5 }}
      animate={visible ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      style={{
        perspective: '1200px',
        width: '100%',
        maxWidth: 440
      }}
    >
      <div style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-xl)',
        padding: '24px',
        boxShadow: 'var(--shadow-xl), var(--shadow-glow)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle gradient overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 120,
          background: 'linear-gradient(180deg, rgba(124,92,252,0.06) 0%, transparent 100%)',
          pointerEvents: 'none'
        }} />

        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 20,
          position: 'relative'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}>
            <div style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: 'var(--success)',
              boxShadow: '0 0 8px var(--success)'
            }} />
            <span style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--text-tertiary)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontWeight: 500
            }}>
              ATS Score
            </span>
          </div>
          <span style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--text-tertiary)',
            fontFamily: 'var(--font-mono)'
          }}>
            Live Analysis
          </span>
        </div>

        {/* Big Score */}
        <div style={{
          textAlign: 'center',
          marginBottom: 24,
          position: 'relative'
        }}>
          <span style={{
            fontSize: '3.5rem',
            fontWeight: 800,
            color: 'var(--text-primary)',
            lineHeight: 1,
            letterSpacing: '-0.03em'
          }}>
            <AnimCounter end={87} />
          </span>
          <span style={{
            fontSize: 'var(--text-xl)',
            color: 'var(--text-tertiary)',
            fontWeight: 400,
            marginLeft: 4
          }}>
            / 100
          </span>
        </div>

        {/* Progress Bars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
          {/* Keyword Match Bar */}
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 6
            }}>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                Keyword Match
              </span>
              <span style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--accent)',
                fontFamily: 'var(--font-mono)',
                fontWeight: 500
              }}>
                <AnimCounter end={88} suffix="%" />
              </span>
            </div>
            <div style={{
              height: 4,
              background: 'var(--bg-hover)',
              borderRadius: 'var(--radius-full)',
              overflow: 'hidden'
            }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '88%' }}
                transition={{ duration: 1.2, delay: 0.8, ease: [0.4, 0, 0.2, 1] }}
                style={{
                  height: '100%',
                  background: 'var(--accent)',
                  borderRadius: 'var(--radius-full)'
                }}
              />
            </div>
          </div>

          {/* Status Items */}
          {barData.slice(1).map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + i * 0.15 }}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 12px',
                background: 'var(--bg-elevated)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                {item.label}
              </span>
              <span style={{
                fontSize: 'var(--text-xs)',
                color: item.color,
                fontWeight: 500
              }}>
                {item.status}
              </span>
            </motion.div>
          ))}
        </div>

        {/* AI Insight */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          style={{
            padding: '14px 16px',
            background: 'var(--accent-muted)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-accent)',
            display: 'flex',
            gap: 10
          }}
        >
          <Sparkles size={16} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2 }} />
          <p style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--text-secondary)',
            lineHeight: 'var(--leading-relaxed)',
            margin: 0
          }}>
            Your backend experience is strong, but your resume is missing measurable impact in 2 projects.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ── Features Data ────────────────────────────────────── */
const features = [
  {
    icon: FileSearch,
    title: 'AI Resume Analysis',
    desc: 'Deep analysis of your resume against industry standards and ATS requirements.'
  },
  {
    icon: BarChart3,
    title: 'ATS Score & Optimization',
    desc: 'Real-time scoring with actionable improvements to pass automated filters.'
  },
  {
    icon: Briefcase,
    title: 'Job Description Matching',
    desc: 'Compare your resume against any job posting and find exact gaps.'
  },
  {
    icon: Mic,
    title: 'AI Mock Interviews',
    desc: 'Practice with an AI interviewer that adapts to your role and experience.'
  },
  {
    icon: TrendingUp,
    title: 'Career Intelligence',
    desc: 'Personalized career trajectory insights and skill recommendations.'
  },
  {
    icon: FileStack,
    title: 'Resume Version Management',
    desc: 'Maintain multiple targeted resume versions for different roles.'
  }
];

const stats = [
  { value: 50, suffix: 'K+', label: 'Resumes analyzed' },
  { value: 92, suffix: '%', label: 'ATS pass rate improvement' },
  { value: 4.9, suffix: '', label: 'User satisfaction' },
  { value: 200, suffix: '+', label: 'Companies targeted' }
];

/* ── Landing Page ─────────────────────────────────────── */
export default function Landing() {
  return (
    <div style={{ background: 'var(--bg-primary)', overflow: 'hidden' }}>
      {/* ── Hero Section ──────────────────────────────── */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        paddingTop: 'var(--navbar-height)'
      }}>
        {/* Background grid */}
        <div className="grid-bg" style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.5,
          pointerEvents: 'none'
        }} />

        {/* Radial glow */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 800,
          height: 600,
          background: 'radial-gradient(ellipse, rgba(124,92,252,0.08) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-16)',
          paddingTop: 'var(--space-12)',
          paddingBottom: 'var(--space-12)',
          position: 'relative'
        }}>
          {/* Left: Content */}
          <div style={{ flex: 1, maxWidth: 600 }}>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 14px',
                background: 'var(--accent-muted)',
                border: '1px solid var(--border-accent)',
                borderRadius: 'var(--radius-full)',
                marginBottom: 'var(--space-6)',
                fontSize: 'var(--text-xs)',
                fontWeight: 500,
                color: 'var(--accent-hover)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase'
              }}
            >
              <Sparkles size={12} />
              AI-Powered Career Intelligence
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
                fontWeight: 800,
                lineHeight: 'var(--leading-tight)',
                letterSpacing: 'var(--tracking-tight)',
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-6)'
              }}
            >
              Your resume gets you noticed.{' '}
              <span className="gradient-text">HireSense</span> gets you ready.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              style={{
                fontSize: 'var(--text-lg)',
                color: 'var(--text-secondary)',
                lineHeight: 'var(--leading-relaxed)',
                marginBottom: 'var(--space-10)',
                maxWidth: 520
              }}
            >
              Analyze your resume, optimize it for ATS systems, practice realistic interviews, and discover exactly what recruiters are looking for.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              style={{
                display: 'flex',
                gap: 'var(--space-4)',
                flexWrap: 'wrap'
              }}
            >
              <Link to="/register">
                <Button size="lg" iconRight={ArrowRight}>
                  Analyze My Resume
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="secondary" size="lg" icon={Mic}>
                  Try Mock Interview
                </Button>
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-6)',
                marginTop: 'var(--space-10)',
                flexWrap: 'wrap'
              }}
            >
              {[
                'Free to start',
                'No credit card',
                'AI-powered analysis'
              ].map((text, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-tertiary)'
                }}>
                  <CheckCircle size={14} style={{ color: 'var(--success)' }} />
                  {text}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Hero Panel */}
          <div className="hero-visual" style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <HeroPanel />
          </div>
        </div>
      </section>

      {/* ── Features Section ──────────────────────────── */}
      <section id="features" style={{
        padding: 'var(--space-32) 0',
        position: 'relative'
      }}>
        <div className="container">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            style={{
              textAlign: 'center',
              marginBottom: 'var(--space-16)',
              maxWidth: 600,
              margin: '0 auto var(--space-16)'
            }}
          >
            <span className="caption" style={{ color: 'var(--accent)', marginBottom: 'var(--space-4)', display: 'block' }}>
              Features
            </span>
            <h2 style={{
              fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
              fontWeight: 700,
              letterSpacing: 'var(--tracking-tight)',
              marginBottom: 'var(--space-4)'
            }}>
              Everything you need to land your next role
            </h2>
            <p style={{
              fontSize: 'var(--text-base)',
              color: 'var(--text-secondary)',
              lineHeight: 'var(--leading-relaxed)'
            }}>
              An intelligent suite of AI tools designed to maximize your career potential.
            </p>
          </motion.div>

          {/* Feature Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--space-6)'
          }}>
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                style={{
                  padding: 'var(--space-8)',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-default)',
                  borderRadius: 'var(--radius-lg)',
                  transition: 'border-color var(--transition-fast), transform var(--transition-fast)',
                  cursor: 'default'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--border-strong)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border-default)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--accent-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 'var(--space-5)'
                }}>
                  <feature.icon size={20} style={{ color: 'var(--accent)' }} />
                </div>
                <h3 style={{
                  fontSize: 'var(--text-lg)',
                  fontWeight: 600,
                  marginBottom: 'var(--space-3)',
                  color: 'var(--text-primary)'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-secondary)',
                  lineHeight: 'var(--leading-relaxed)'
                }}>
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats Section ─────────────────────────────── */}
      <section style={{
        padding: 'var(--space-20) 0',
        borderTop: '1px solid var(--border-default)',
        borderBottom: '1px solid var(--border-default)'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'var(--space-8)',
            textAlign: 'center'
          }}>
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div style={{
                  fontSize: 'var(--text-4xl)',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  letterSpacing: 'var(--tracking-tight)',
                  marginBottom: 'var(--space-2)'
                }}>
                  <AnimCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-tertiary)'
                }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ───────────────────────────────── */}
      <section style={{
        padding: 'var(--space-32) 0',
        position: 'relative'
      }}>
        {/* Glow */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          height: 400,
          background: 'radial-gradient(ellipse, rgba(124,92,252,0.08) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ textAlign: 'center', position: 'relative' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 style={{
              fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
              fontWeight: 700,
              letterSpacing: 'var(--tracking-tight)',
              marginBottom: 'var(--space-4)'
            }}>
              Ready to transform your career?
            </h2>
            <p style={{
              fontSize: 'var(--text-lg)',
              color: 'var(--text-secondary)',
              marginBottom: 'var(--space-10)',
              maxWidth: 480,
              margin: '0 auto var(--space-10)'
            }}>
              Join thousands of professionals using AI to land their dream roles.
            </p>
            <Link to="/register">
              <Button size="lg" iconRight={ArrowRight}>
                Get Started — It's Free
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────── */}
      <footer style={{
        borderTop: '1px solid var(--border-default)',
        padding: 'var(--space-12) 0 var(--space-8)'
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 'var(--space-6)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10
            }}>
              <div style={{
                width: 28,
                height: 28,
                borderRadius: 'var(--radius-sm)',
                background: 'var(--accent-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: 13,
                color: '#fff'
              }}>
                H
              </div>
              <span style={{
                fontSize: 'var(--text-base)',
                fontWeight: 600,
                color: 'var(--text-secondary)'
              }}>
                HireSense
              </span>
            </div>
            <p style={{
              fontSize: 'var(--text-sm)',
              color: 'var(--text-tertiary)'
            }}>
              © {new Date().getFullYear()} HireSense. AI-powered career intelligence.
            </p>
          </div>
        </div>
      </footer>

      {/* ── Responsive Styles ─────────────────────────── */}
      <style>{`
        @media (max-width: 968px) {
          .hero-visual {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
