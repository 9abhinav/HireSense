import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: 'var(--bg-primary)'
    }}>
      <Sidebar />

      {/* Main Content */}
      <main
        className="dashboard-main"
        style={{
          flex: 1,
          marginLeft: 260,
          minHeight: '100vh',
          transition: 'margin-left 0.25s ease'
        }}
      >
        {/* Mobile Header */}
        <div
          className="mobile-dashboard-header"
          style={{
            display: 'none',
            position: 'sticky',
            top: 0,
            height: 'var(--navbar-height)',
            background: 'var(--bg-surface)',
            borderBottom: '1px solid var(--border-default)',
            alignItems: 'center',
            padding: '0 var(--space-4)',
            zIndex: 200
          }}
        >
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              width: 36,
              height: 36,
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-primary)'
            }}
          >
            <Menu size={20} />
          </button>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginLeft: 12
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
              color: 'var(--text-primary)'
            }}>
              HireSense
            </span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            padding: 'var(--space-8)',
            maxWidth: 1100,
          }}
        >
          <Outlet />
        </motion.div>
      </main>

      <style>{`
        @media (max-width: 768px) {
          .dashboard-main {
            margin-left: 0 !important;
          }
          .mobile-dashboard-header {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
}
