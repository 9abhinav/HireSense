import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mic, MicOff, SkipForward, Clock, Sparkles } from 'lucide-react';
import Button from '../components/ui/Button';

const questions = [
  "Tell me about a backend system you've built and the challenges you faced.",
  "How would you design a REST API for a social media platform?",
  "Explain the difference between SQL and NoSQL databases. When would you choose each?",
  "Describe a time you had to optimize a slow database query. What was your approach?",
  "How do you handle authentication and authorization in a web application?",
  "What is your experience with containerization and Docker?",
  "Tell me about a project where you worked with a team. How did you handle conflicts?",
  "How would you design a caching strategy for a high-traffic API?",
  "What testing strategies do you use in backend development?",
  "Where do you see yourself in 3 years as a backend developer?"
];

function WaveformVisualization({ active }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 3,
      height: 40, justifyContent: 'center'
    }}>
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          animate={active ? {
            height: [4, Math.random() * 28 + 6, 4, Math.random() * 20 + 8, 4],
          } : { height: 4 }}
          transition={{
            repeat: active ? Infinity : 0,
            duration: 0.8 + Math.random() * 0.6,
            delay: i * 0.05,
            ease: 'easeInOut'
          }}
          style={{
            width: 3,
            borderRadius: 2,
            background: active ? 'var(--accent)' : 'var(--border-default)',
            minHeight: 4,
            transition: 'background 0.3s ease'
          }}
        />
      ))}
    </div>
  );
}

export default function InterviewSession() {
  const [currentQ, setCurrentQ] = useState(0);
  const [recording, setRecording] = useState(false);
  const [aiSpeaking, setAiSpeaking] = useState(true);
  const [timer, setTimer] = useState(20 * 60);
  const navigate = useNavigate();

  // Timer countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 0) { clearInterval(interval); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Simulate AI finishing speaking
  useEffect(() => {
    setAiSpeaking(true);
    const t = setTimeout(() => setAiSpeaking(false), 3000);
    return () => clearTimeout(t);
  }, [currentQ]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${String(sec).padStart(2, '0')}`;
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(prev => prev + 1);
      setRecording(false);
    } else {
      navigate('/dashboard/interview-results');
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      {/* Top Bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 'var(--space-8)', flexWrap: 'wrap', gap: 'var(--space-4)'
      }}>
        <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 700 }}>
          AI Mock Interview
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-5)' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '6px 12px', background: 'var(--bg-surface)',
            border: '1px solid var(--border-default)', borderRadius: 'var(--radius-full)',
            fontSize: 'var(--text-sm)', fontFamily: 'var(--font-mono)'
          }}>
            <Clock size={14} style={{ color: timer < 120 ? 'var(--error)' : 'var(--text-tertiary)' }} />
            <span style={{ color: timer < 120 ? 'var(--error)' : 'var(--text-primary)' }}>
              {formatTime(timer)}
            </span>
          </div>
          <span style={{
            fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)',
            fontFamily: 'var(--font-mono)'
          }}>
            {currentQ + 1} / {questions.length}
          </span>
        </div>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: 'var(--space-6)', alignItems: 'start'
      }} className="interview-grid">
        {/* Left — AI Interviewer */}
        <div style={{
          padding: 'var(--space-8)', background: 'var(--bg-surface)',
          border: '1px solid var(--border-default)', borderRadius: 'var(--radius-xl)',
          display: 'flex', flexDirection: 'column', alignItems: 'center'
        }}>
          {/* AI Avatar */}
          <div style={{
            width: 80, height: 80, borderRadius: 'var(--radius-2xl)',
            background: 'var(--accent-gradient)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 'var(--space-4)',
            boxShadow: aiSpeaking ? 'var(--shadow-glow-lg)' : 'none',
            transition: 'box-shadow 0.5s ease'
          }}>
            <Sparkles size={32} style={{ color: '#fff' }} />
          </div>

          <span style={{
            fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-2)'
          }}>
            AI Interviewer
          </span>

          {/* Waveform */}
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <WaveformVisualization active={aiSpeaking} />
          </div>

          {/* Question */}
          <div style={{
            padding: 'var(--space-5)', background: 'var(--bg-elevated)',
            borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)',
            width: '100%'
          }}>
            <p style={{
              fontSize: 'var(--text-sm)', color: 'var(--text-primary)',
              lineHeight: 'var(--leading-relaxed)', fontStyle: 'italic'
            }}>
              "{questions[currentQ]}"
            </p>
          </div>
        </div>

        {/* Right — Candidate Workspace */}
        <div style={{
          padding: 'var(--space-8)', background: 'var(--bg-surface)',
          border: '1px solid var(--border-default)', borderRadius: 'var(--radius-xl)'
        }}>
          <h3 style={{
            fontSize: 'var(--text-base)', fontWeight: 600, marginBottom: 'var(--space-6)'
          }}>
            Your Response
          </h3>

          {/* Recording Indicator */}
          <div style={{
            padding: 'var(--space-8)', background: 'var(--bg-elevated)',
            borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)',
            textAlign: 'center', marginBottom: 'var(--space-6)'
          }}>
            {recording ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: 'var(--error-muted)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto var(--space-4)',
                  animation: 'pulse-glow 2s infinite'
                }}>
                  <div style={{
                    width: 12, height: 12, borderRadius: '50%',
                    background: 'var(--error)'
                  }} />
                </div>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--error)', fontWeight: 500 }}>
                  Recording...
                </p>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 4 }}>
                  Speak your answer clearly
                </p>
              </motion.div>
            ) : (
              <div>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: 'var(--bg-hover)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto var(--space-4)'
                }}>
                  <MicOff size={20} style={{ color: 'var(--text-tertiary)' }} />
                </div>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}>
                  Click "Start Recording" when ready
                </p>
              </div>
            )}
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
            <Button
              variant={recording ? 'danger' : 'primary'}
              icon={recording ? MicOff : Mic}
              onClick={() => setRecording(!recording)}
              style={{ flex: 1 }}
            >
              {recording ? 'Stop Recording' : 'Start Recording'}
            </Button>
            <Button
              variant="secondary"
              icon={SkipForward}
              onClick={handleNext}
            >
              {currentQ === questions.length - 1 ? 'Finish' : 'Skip'}
            </Button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{
        marginTop: 'var(--space-8)', height: 3,
        background: 'var(--bg-surface)', borderRadius: 'var(--radius-full)', overflow: 'hidden'
      }}>
        <motion.div
          animate={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
          transition={{ duration: 0.5 }}
          style={{
            height: '100%', background: 'var(--accent)',
            borderRadius: 'var(--radius-full)'
          }}
        />
      </div>

      <style>{`
        @media (max-width: 768px) {
          .interview-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </motion.div>
  );
}
