import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

// Layouts
import Navbar from './components/layout/Navbar';
import DashboardLayout from './components/layout/DashboardLayout';

// Public Pages
import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';

// Dashboard Pages
import Dashboard from './pages/Dashboard';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import ATSAnalysis from './pages/ATSAnalysis';
import JobMatch from './pages/JobMatch';
import MockInterview from './pages/MockInterview';
import InterviewSession from './pages/InterviewSession';
import InterviewResults from './pages/InterviewResults';
import CareerInsights from './pages/CareerInsights';
import ResumeVersions from './pages/ResumeVersions';
import Profile from './pages/Profile';

// Components
import AIAssistant from './components/AIAssistant';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-primary)'
      }}>
        <div className="loading-spinner" />
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

function PublicRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) return null;
  if (user) return <Navigate to="/dashboard" replace />;
  
  return children;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<><Navbar /><Landing /></>} />
            <Route path="/login" element={
              <PublicRoute><Login /></PublicRoute>
            } />
            <Route path="/register" element={
              <PublicRoute><Register /></PublicRoute>
            } />
            <Route path="/forgot-password" element={
              <PublicRoute><ForgotPassword /></PublicRoute>
            } />

            {/* Dashboard Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute><DashboardLayout /></ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="resume-analyzer" element={<ResumeAnalyzer />} />
              <Route path="ats-analysis" element={<ATSAnalysis />} />
              <Route path="job-match" element={<JobMatch />} />
              <Route path="mock-interview" element={<MockInterview />} />
              <Route path="interview-session" element={<InterviewSession />} />
              <Route path="interview-results" element={<InterviewResults />} />
              <Route path="career-insights" element={<CareerInsights />} />
              <Route path="resume-versions" element={<ResumeVersions />} />
              <Route path="profile" element={<Profile />} />
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          {/* Global AI Assistant */}
          <AIAssistant />
        </ToastProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
