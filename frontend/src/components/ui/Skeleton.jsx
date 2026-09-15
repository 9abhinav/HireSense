import React from 'react';

export function Skeleton({ width, height, radius = 'var(--radius-md)', style = {} }) {
  return (
    <div style={{
      width: width || '100%',
      height: height || 20,
      borderRadius: radius,
      background: 'linear-gradient(90deg, var(--bg-surface) 25%, var(--bg-elevated) 50%, var(--bg-surface) 75%)',
      backgroundSize: '200% 100%',
      animation: 'shimmer 1.5s infinite ease-in-out',
      ...style
    }} />
  );
}

export function SkeletonText({ lines = 3, style = {} }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, ...style }}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          height={14}
          width={i === lines - 1 ? '60%' : '100%'}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ height = 160, style = {} }) {
  return (
    <div style={{
      padding: 20,
      background: 'var(--bg-surface)',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-lg)',
      height,
      ...style
    }}>
      <Skeleton width={100} height={12} style={{ marginBottom: 16 }} />
      <Skeleton width={60} height={28} style={{ marginBottom: 12 }} />
      <SkeletonText lines={2} />
    </div>
  );
}
