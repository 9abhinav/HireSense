import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  FileSearch,
  BarChart3,
  Briefcase,
  Mic,
  TrendingUp,
  FileStack,
  Settings,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const navItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
  { path: '/dashboard/resume-analyzer', icon: FileSearch, label: 'Resume Intelligence' },
  { path: '/dashboard/ats-analysis', icon: BarChart3, label: 'ATS Analyzer' },
  { path: '/dashboard/job-match', icon: Briefcase, label: 'Job Match' },
  { path: '/dashboard/mock-interview', icon: Mic, label: 'Mock Interview' },
  { path: '/dashboard/career-insights', icon: TrendingUp, label: 'Career Insights' },
  { path: '/dashboard/resume-versions', icon: FileStack, label: 'Resume Versions' }
];

const bottomItems = [
  { path: '/dashboard/profile', icon: User, label: 'Profile' }
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { logout, user } = useAuth();
  const location = useLocation();

  const linkStyle = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    gap: collapsed ? 0 : 12,
    padding: collapsed ? '10px' : '10px 14px',
    borderRadius: 'var(--radius-md)',
    fontSize: 'var(--text-sm)',
    fontWeight: isActive ? 500 : 400,
    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
    background: isActive ? 'var(--bg-hover)' : 'transparent',
    transition: 'all var(--transition-fast)',
    textDecoration: 'none',
    justifyContent: collapsed ? 'center' : 'flex-start',
    position: 'relative',
    overflow: 'hidden'
  });

  return (
    <>
      <motion.aside
        animate={{ width: collapsed ? 72 : 260 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        className="sidebar-container"
        style={{
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          background: 'var(--bg-surface)',
          borderRight: '1px solid var(--border-default)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 'var(--z-sidebar)',
          overflow: 'hidden'
        }}
      >
        {/* Logo */}
        <div style={{
          padding: collapsed ? '20px 12px' : '20px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          borderBottom: '1px solid var(--border-default)',
          minHeight: 'var(--navbar-height)'
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
            color: '#fff',
            flexShrink: 0
          }}>
            H
          </div>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                fontSize: 'var(--text-lg)',
                fontWeight: 700,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
                whiteSpace: 'nowrap'
              }}
            >
              HireSense
            </motion.span>
          )}
        </div>

        {/* Navigation */}
        <nav style={{
          flex: 1,
          padding: collapsed ? '12px 8px' : '12px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          overflowY: 'auto'
        }}>
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/dashboard'}
              style={({ isActive }) => linkStyle(isActive)}
              onMouseEnter={e => {
                if (!e.currentTarget.classList.contains('active')) {
                  e.currentTarget.style.background = 'var(--bg-hover)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }
              }}
              onMouseLeave={e => {
                const isActive = location.pathname === item.path ||
                  (item.path === '/dashboard' && location.pathname === '/dashboard');
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }
              }}
              title={collapsed ? item.label : undefined}
            >
              <item.icon size={18} style={{ flexShrink: 0 }} />
              {!collapsed && (
                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {item.label}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom */}
        <div style={{
          padding: collapsed ? '12px 8px' : '12px 12px',
          borderTop: '1px solid var(--border-default)',
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}>
          {bottomItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => linkStyle(isActive)}
              title={collapsed ? item.label : undefined}
            >
              <item.icon size={18} style={{ flexShrink: 0 }} />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
          <button
            onClick={logout}
            style={{
              ...linkStyle(false),
              cursor: 'pointer',
              color: 'var(--text-tertiary)'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--error-muted)';
              e.currentTarget.style.color = 'var(--error)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--text-tertiary)';
            }}
            title={collapsed ? 'Sign out' : undefined}
          >
            <LogOut size={18} style={{ flexShrink: 0 }} />
            {!collapsed && <span>Sign out</span>}
          </button>

          {/* Collapse Toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 8,
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-tertiary)',
              cursor: 'pointer',
              marginTop: 4,
              transition: 'all var(--transition-fast)'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--bg-hover)';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--text-tertiary)';
            }}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
      </motion.aside>

      {/* Responsive: Mobile bottom nav */}
      <style>{`
        .sidebar-mobile-overlay { display: none; }
        
        @media (max-width: 768px) {
          .sidebar-container {
            transform: translateX(-100%);
            transition: transform 0.3s ease;
          }
          .sidebar-container.open {
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}
