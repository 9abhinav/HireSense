import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { register } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = 'Name is required';
    if (!email) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Enter a valid email address';
    if (!password) errs.password = 'Password is required';
    else if (password.length < 8) errs.password = 'Password must be at least 8 characters';
    if (password !== confirmPassword) errs.confirmPassword = 'Passwords do not match';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const result = await register(name, email, password);
    setLoading(false);

    if (result.success) {
      toast.success('Account created! Welcome to HireSense.');
      navigate('/dashboard');
    } else {
      toast.error(result.error || 'Registration failed');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      background: 'var(--bg-primary)'
    }}>
      {/* Left — Branding */}
      <div className="auth-left" style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 'var(--space-16)',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg-surface)',
        borderRight: '1px solid var(--border-default)'
      }}>
        <div className="grid-bg" style={{
          position: 'absolute', inset: 0, opacity: 0.4, pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', top: '40%', left: '50%',
          transform: 'translate(-50%, -50%)', width: 500, height: 500,
          background: 'radial-gradient(ellipse, rgba(124,92,252,0.1) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ position: 'relative', maxWidth: 400, textAlign: 'center' }}
        >
          <div style={{
            width: 48, height: 48, borderRadius: 'var(--radius-lg)',
            background: 'var(--accent-gradient)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 800, fontSize: 22, color: '#fff',
            margin: '0 auto var(--space-8)', boxShadow: 'var(--shadow-glow)'
          }}>H</div>
          <h2 style={{
            fontSize: 'var(--text-3xl)', fontWeight: 700,
            letterSpacing: 'var(--tracking-tight)', marginBottom: 'var(--space-4)'
          }}>
            Your AI career copilot starts here.
          </h2>
          <p style={{
            fontSize: 'var(--text-base)', color: 'var(--text-secondary)',
            lineHeight: 'var(--leading-relaxed)'
          }}>
            Create your account and get personalized career intelligence in minutes.
          </p>
        </motion.div>
      </div>

      {/* Right — Form */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center', padding: 'var(--space-8)'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ width: '100%', maxWidth: 400 }}
        >
          <h1 style={{
            fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-2)'
          }}>
            Create your account
          </h1>
          <p style={{
            fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-8)'
          }}>
            Get started with HireSense for free
          </p>

          {/* Google */}
          <button
            style={{
              width: '100%', padding: '12px', display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: 10, background: 'var(--bg-surface)',
              border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)',
              fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--text-primary)',
              cursor: 'pointer', transition: 'border-color var(--transition-fast)'
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-strong)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-default)'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div style={{
            display: 'flex', alignItems: 'center', gap: 16,
            margin: 'var(--space-6) 0', color: 'var(--text-tertiary)', fontSize: 'var(--text-xs)'
          }}>
            <div style={{ flex: 1, height: 1, background: 'var(--border-default)' }} />
            or
            <div style={{ flex: 1, height: 1, background: 'var(--border-default)' }} />
          </div>

          <form onSubmit={handleSubmit} style={{
            display: 'flex', flexDirection: 'column', gap: 'var(--space-5)'
          }}>
            <Input
              id="register-name" label="Full Name" placeholder="John Doe"
              value={name} onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: '' })); }}
              error={errors.name} icon={User} required
            />
            <Input
              id="register-email" label="Email" type="email" placeholder="you@example.com"
              value={email} onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: '' })); }}
              error={errors.email} icon={Mail} required autoComplete="email"
            />
            <Input
              id="register-password" label="Password" type="password" placeholder="Create a password"
              value={password} onChange={e => { setPassword(e.target.value); setErrors(p => ({ ...p, password: '' })); }}
              error={errors.password} icon={Lock} required autoComplete="new-password"
            />
            <Input
              id="register-confirm" label="Confirm Password" type="password" placeholder="Confirm your password"
              value={confirmPassword} onChange={e => { setConfirmPassword(e.target.value); setErrors(p => ({ ...p, confirmPassword: '' })); }}
              error={errors.confirmPassword} icon={Lock} required autoComplete="new-password"
            />
            <Button type="submit" size="lg" fullWidth loading={loading}
              iconRight={!loading ? ArrowRight : undefined}
              style={{ marginTop: 'var(--space-2)' }}
            >
              Create Account
            </Button>
          </form>

          <p style={{
            textAlign: 'center', fontSize: 'var(--text-sm)',
            color: 'var(--text-secondary)', marginTop: 'var(--space-8)'
          }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--accent)', fontWeight: 500 }}>Sign in</Link>
          </p>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .auth-left { display: none !important; }
        }
      `}</style>
    </div>
  );
}
