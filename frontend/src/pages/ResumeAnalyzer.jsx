import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, CheckCircle, Loader, X, ArrowRight } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { useToast } from '../context/ToastContext';
import Button from '../components/ui/Button';

const processingSteps = [
  { label: 'Uploading resume', icon: Upload },
  { label: 'Parsing document', icon: FileText },
  { label: 'Analyzing experience', icon: Loader },
  { label: 'Matching ATS keywords', icon: Loader },
  { label: 'Generating insights', icon: Loader }
];

export default function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [completed, setCompleted] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      toast.error('Please upload a valid PDF or DOCX file (max 10MB)');
      return;
    }
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, [toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxSize: 10 * 1024 * 1024,
    multiple: false
  });

  const handleAnalyze = async () => {
    if (!file) return;
    setProcessing(true);

    for (let i = 0; i < processingSteps.length; i++) {
      setCurrentStep(i);
      await new Promise(r => setTimeout(r, 800 + Math.random() * 600));
    }

    setCompleted(true);
    toast.success('Resume analysis complete!');

    setTimeout(() => {
      navigate('/dashboard/ats-analysis');
    }, 1500);
  };

  const removeFile = () => {
    setFile(null);
    setProcessing(false);
    setCurrentStep(-1);
    setCompleted(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <h1 style={{
          fontSize: 'var(--text-2xl)',
          fontWeight: 700,
          letterSpacing: 'var(--tracking-tight)',
          marginBottom: 'var(--space-2)'
        }}>
          Resume Intelligence
        </h1>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
          Upload your resume for AI-powered analysis and ATS optimization.
        </p>
      </div>

      {!processing ? (
        <>
          {/* Dropzone */}
          <div
            {...getRootProps()}
            style={{
              padding: 'var(--space-16) var(--space-8)',
              border: `2px dashed ${isDragActive ? 'var(--accent)' : 'var(--border-default)'}`,
              borderRadius: 'var(--radius-xl)',
              background: isDragActive ? 'var(--accent-muted)' : 'var(--bg-surface)',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
              position: 'relative'
            }}
          >
            <input {...getInputProps()} />

            <motion.div
              animate={isDragActive ? { scale: 1.05 } : { scale: 1 }}
              style={{
                width: 64, height: 64, borderRadius: 'var(--radius-xl)',
                background: 'var(--bg-elevated)', border: '1px solid var(--border-default)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto var(--space-6)'
              }}
            >
              <Upload size={28} style={{ color: isDragActive ? 'var(--accent)' : 'var(--text-tertiary)' }} />
            </motion.div>

            <h3 style={{
              fontSize: 'var(--text-lg)', fontWeight: 600,
              marginBottom: 'var(--space-2)', color: 'var(--text-primary)'
            }}>
              {isDragActive ? 'Drop your resume here' : 'Drop your resume here'}
            </h3>
            <p style={{
              fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)', marginBottom: 'var(--space-5)'
            }}>
              PDF, DOCX up to 10MB
            </p>
            <Button variant="secondary" size="sm">Browse files</Button>
          </div>

          {/* Selected File */}
          <AnimatePresence>
            {file && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={{
                  marginTop: 'var(--space-6)',
                  padding: 'var(--space-4) var(--space-5)',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-default)',
                  borderRadius: 'var(--radius-lg)',
                  display: 'flex', alignItems: 'center', gap: 14
                }}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: 'var(--radius-md)',
                  background: 'var(--accent-muted)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                  <FileText size={18} style={{ color: 'var(--accent)' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: 'var(--text-sm)', fontWeight: 500,
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                  }}>
                    {file.name}
                  </div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
                    {(file.size / 1024).toFixed(1)} KB
                  </div>
                </div>
                <button onClick={(e) => { e.stopPropagation(); removeFile(); }} style={{
                  width: 28, height: 28, borderRadius: 'var(--radius-sm)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text-tertiary)', transition: 'all var(--transition-fast)'
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--error-muted)'; e.currentTarget.style.color = 'var(--error)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-tertiary)'; }}
                >
                  <X size={14} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {file && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ marginTop: 'var(--space-6)' }}
            >
              <Button size="lg" onClick={handleAnalyze} iconRight={ArrowRight}>
                Analyze Resume
              </Button>
            </motion.div>
          )}
        </>
      ) : (
        /* Processing Animation */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            padding: 'var(--space-12) var(--space-8)',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-xl)',
            maxWidth: 480,
            margin: '0 auto'
          }}
        >
          <div style={{
            display: 'flex', flexDirection: 'column', gap: 'var(--space-5)'
          }}>
            {processingSteps.map((step, i) => {
              const isActive = currentStep === i;
              const isDone = currentStep > i || completed;
              const isPending = currentStep < i;

              return (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '12px 16px',
                    background: isActive ? 'var(--accent-muted)' : 'transparent',
                    borderRadius: 'var(--radius-md)',
                    border: isActive ? '1px solid var(--border-accent)' : '1px solid transparent',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  {isDone ? (
                    <CheckCircle size={18} style={{ color: 'var(--success)', flexShrink: 0 }} />
                  ) : isActive ? (
                    <div style={{
                      width: 18, height: 18, border: '2px solid var(--accent)',
                      borderTopColor: 'transparent', borderRadius: '50%',
                      animation: 'spin 0.8s linear infinite', flexShrink: 0
                    }} />
                  ) : (
                    <div style={{
                      width: 18, height: 18, borderRadius: '50%',
                      border: '1px solid var(--border-default)', flexShrink: 0
                    }} />
                  )}
                  <span style={{
                    fontSize: 'var(--text-sm)',
                    color: isDone ? 'var(--success)' : isActive ? 'var(--text-primary)' : 'var(--text-tertiary)',
                    fontWeight: isActive ? 500 : 400,
                    transition: 'color var(--transition-fast)'
                  }}>
                    {step.label}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {completed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                textAlign: 'center', marginTop: 'var(--space-8)',
                padding: 'var(--space-4)', background: 'var(--success-muted)',
                borderRadius: 'var(--radius-md)', border: '1px solid rgba(52,211,153,0.2)'
              }}
            >
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--success)', fontWeight: 500 }}>
                Analysis complete — redirecting to results...
              </p>
            </motion.div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
