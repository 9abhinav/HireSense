import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Resume AI', href: '#resume-ai' },
    { label: 'Mock Interview', href: '#mock-interview' },
    { label: 'Career Insights', href: '#career-insights' }
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 'var(--navbar-height)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 'var(--z-navbar)',
          background: scrolled ? 'rgba(10, 10, 15, 0.8)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
          transition: 'background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease'
        }}
      >
        <div style={{
          width: '100%',
          maxWidth: 'var(--max-width)',
          padding: '0 var(--space-6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Logo */}
          <Link to="/" style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            textDecoration: 'none'
          }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: 'var(--radius-md)',
              background: 'var(--accent-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: 16,
              color: '#fff'
            }}>
              H
            </div>
            <span style={{
              fontSize: 'var(--text-lg)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em'
            }}>
              HireSense
            </span>
          </Link>

          {/* Center Nav — Desktop */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-1)'
          }}
          className="nav-desktop"
          >
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  padding: '8px 14px',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-secondary)',
                  borderRadius: 'var(--radius-sm)',
                  transition: 'color var(--transition-fast), background var(--transition-fast)',
                  fontWeight: 450
                }}
                onMouseEnter={e => {
                  e.target.style.color = 'var(--text-primary)';
                  e.target.style.background = 'var(--bg-hover)';
                }}
                onMouseLeave={e => {
                  e.target.style.color = 'var(--text-secondary)';
                  e.target.style.background = 'transparent';
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right — Desktop */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3)'
          }}
          className="nav-desktop"
          >
            <Link to="/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link to="/register">
              <Button size="sm" iconRight={ArrowRight}>Get Started</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="nav-mobile-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              display: 'none',
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-primary)',
              transition: 'background var(--transition-fast)'
            }}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="nav-mobile-menu"
            style={{
              position: 'fixed',
              top: 'var(--navbar-height)',
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(10, 10, 15, 0.95)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              zIndex: 299,
              padding: 'var(--space-6)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-2)'
            }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setMobileOpen(false)}
                style={{
                  padding: '14px 16px',
                  fontSize: 'var(--text-lg)',
                  color: 'var(--text-primary)',
                  fontWeight: 500,
                  borderRadius: 'var(--radius-md)',
                  transition: 'background var(--transition-fast)'
                }}
                onMouseEnter={e => e.target.style.background = 'var(--bg-hover)'}
                onMouseLeave={e => e.target.style.background = 'transparent'}
              >
                {link.label}
              </motion.a>
            ))}

            <div style={{
              marginTop: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-3)',
              paddingBottom: 'var(--space-8)'
            }}>
              <Link to="/login" onClick={() => setMobileOpen(false)}>
                <Button variant="secondary" size="lg" fullWidth>Log in</Button>
              </Link>
              <Link to="/register" onClick={() => setMobileOpen(false)}>
                <Button size="lg" fullWidth iconRight={ArrowRight}>Get Started</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive styles */}
      <style>{`
        .nav-desktop { display: flex !important; }
        .nav-mobile-btn { display: none !important; }
        
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
