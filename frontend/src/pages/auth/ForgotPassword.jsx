import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) { setError('Email is required'); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { setError('Enter a valid email address'); return; }

    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSent(true);
    toast.success('Reset link sent to your email');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-primary)',
      padding: 'var(--space-6)'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%', maxWidth: 420 }}
      >
        <Link
          to="/login"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 'var(--text-sm)',
            color: 'var(--text-secondary)',
            marginBottom: 'var(--space-8)',
            transition: 'color var(--transition-fast)'
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
        >
          <ArrowLeft size={16} />
          Back to login
        </Link>

        {sent ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ textAlign: 'center', padding: 'var(--space-8) 0' }}
          >
            <div style={{
              width: 64, height: 64, borderRadius: 'var(--radius-xl)',
              background: 'var(--success-muted)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto var(--space-6)'
            }}>
              <CheckCircle size={28} style={{ color: 'var(--success)' }} />
            </div>
            <h1 style={{
              fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-3)'
            }}>
              Check your email
            </h1>
            <p style={{
              fontSize: 'var(--text-sm)', color: 'var(--text-secondary)',
              lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--space-6)'
            }}>
              We've sent a password reset link to <strong style={{ color: 'var(--text-primary)' }}>{email}</strong>
            </p>
            <Link to="/login">
              <Button variant="secondary">Return to login</Button>
            </Link>
          </motion.div>
        ) : (
          <>
            <h1 style={{
              fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-2)'
            }}>
              Reset your password
            </h1>
            <p style={{
              fontSize: 'var(--text-sm)', color: 'var(--text-secondary)',
              marginBottom: 'var(--space-8)', lineHeight: 'var(--leading-relaxed)'
            }}>
              Enter your email address and we'll send you a link to reset your password.
            </p>
            <form onSubmit={handleSubmit} style={{
              display: 'flex', flexDirection: 'column', gap: 'var(--space-5)'
            }}>
              <Input
                id="forgot-email" label="Email address" type="email"
                placeholder="you@example.com" value={email}
                onChange={e => { setEmail(e.target.value); setError(''); }}
                error={error} icon={Mail} required autoComplete="email"
              />
              <Button type="submit" size="lg" fullWidth loading={loading}
                iconRight={!loading ? ArrowRight : undefined}
              >
                Send reset link
              </Button>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
}
