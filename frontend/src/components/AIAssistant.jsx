import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, FileSearch, Mic, Target, BookOpen, ArrowRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const suggestions = [
  { icon: FileSearch, text: 'Analyze my resume', color: 'var(--accent)' },
  { icon: Sparkles, text: 'Improve this bullet', color: 'var(--warning)' },
  { icon: Mic, text: 'Prepare me for an interview', color: 'var(--success)' },
  { icon: Target, text: 'Match me to this job', color: 'var(--info)' },
  { icon: BookOpen, text: 'What skills should I learn?', color: 'var(--accent-hover)' }
];

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hi! I\'m your HireSense AI assistant. What would you like to improve today?' }
  ]);
  const location = useLocation();

  // Hide on public pages
  const showAssistant = location.pathname.startsWith('/dashboard');
  if (!showAssistant) return null;

  const handleSend = () => {
    if (!message.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text: message }]);
    const userMsg = message;
    setMessage('');

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: `I'd be happy to help with "${userMsg}". This feature connects to the Gemini API through your backend. For now, I can guide you to the relevant section of HireSense.`
      }]);
    }, 1000);
  };

  const handleSuggestion = (text) => {
    setMessages(prev => [...prev, { role: 'user', text }]);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: `Great choice! I'll help you with that. Navigate to the relevant section in the sidebar, or I can analyze your current context and provide recommendations.`
      }]);
    }, 800);
  };

  return (
    <>
      {/* FAB Button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen(true)}
            style={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              width: 52,
              height: 52,
              borderRadius: 'var(--radius-full)',
              background: 'var(--accent-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              boxShadow: 'var(--shadow-glow-lg)',
              zIndex: 'var(--z-ai-assistant)',
              cursor: 'pointer',
              border: 'none'
            }}
          >
            <Sparkles size={22} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              width: 380,
              maxWidth: 'calc(100vw - 48px)',
              height: 520,
              maxHeight: 'calc(100vh - 100px)',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--shadow-xl)',
              zIndex: 'var(--z-ai-assistant)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            {/* Header */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 18px',
              borderBottom: '1px solid var(--border-default)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 'var(--radius-md)',
                  background: 'var(--accent-gradient)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Sparkles size={14} style={{ color: '#fff' }} />
                </div>
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                  Ask HireSense
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                style={{
                  width: 26, height: 26, borderRadius: 'var(--radius-sm)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text-tertiary)', cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-hover)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-tertiary)'; }}
              >
                <X size={14} />
              </button>
            </div>

            {/* Messages */}
            <div style={{
              flex: 1, overflowY: 'auto', padding: '16px',
              display: 'flex', flexDirection: 'column', gap: 12
            }}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    display: 'flex',
                    justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
                  }}
                >
                  <div style={{
                    maxWidth: '85%',
                    padding: '10px 14px',
                    borderRadius: msg.role === 'user'
                      ? '12px 12px 4px 12px'
                      : '12px 12px 12px 4px',
                    background: msg.role === 'user' ? 'var(--accent)' : 'var(--bg-surface)',
                    border: msg.role === 'user' ? 'none' : '1px solid var(--border-default)',
                    fontSize: 'var(--text-sm)',
                    color: msg.role === 'user' ? '#fff' : 'var(--text-secondary)',
                    lineHeight: 'var(--leading-relaxed)'
                  }}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {/* Suggestions (only show if few messages) */}
              {messages.length <= 2 && (
                <div style={{
                  display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8
                }}>
                  {suggestions.map((s, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      onClick={() => handleSuggestion(s.text)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        padding: '10px 14px',
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border-default)',
                        borderRadius: 'var(--radius-md)',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--text-secondary)',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all var(--transition-fast)'
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = 'var(--border-strong)';
                        e.currentTarget.style.color = 'var(--text-primary)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = 'var(--border-default)';
                        e.currentTarget.style.color = 'var(--text-secondary)';
                      }}
                    >
                      <s.icon size={14} style={{ color: s.color, flexShrink: 0 }} />
                      {s.text}
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <div style={{
              padding: '12px 16px',
              borderTop: '1px solid var(--border-default)',
              display: 'flex', alignItems: 'center', gap: 8
            }}>
              <input
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Ask anything..."
                style={{
                  flex: 1, padding: '10px 14px',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-default)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-primary)',
                  fontSize: 'var(--text-sm)',
                  outline: 'none',
                  transition: 'border-color var(--transition-fast)'
                }}
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e => e.target.style.borderColor = 'var(--border-default)'}
              />
              <button
                onClick={handleSend}
                disabled={!message.trim()}
                style={{
                  width: 36, height: 36, borderRadius: 'var(--radius-md)',
                  background: message.trim() ? 'var(--accent)' : 'var(--bg-hover)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: message.trim() ? '#fff' : 'var(--text-tertiary)',
                  cursor: message.trim() ? 'pointer' : 'not-allowed',
                  transition: 'all var(--transition-fast)',
                  flexShrink: 0
                }}
              >
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
