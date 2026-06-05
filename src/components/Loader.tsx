'use client';

interface LoaderProps {
  progress: number;
  visible: boolean;
}

export default function Loader({ progress, visible }: LoaderProps) {
  return (
    <div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center gap-6 transition-opacity duration-600"
      style={{
        backgroundColor: 'var(--bg-base)',
        opacity: !visible ? 0 : progress >= 50 ? 0.4 : 1,
        pointerEvents: visible ? 'auto' : 'none',
        transitionTimingFunction: 'var(--easing-smooth)',
      }}
    >
      <span
        className="text-[32px] font-semibold tracking-tight"
        style={{
          fontFamily: "'Space Grotesk', monospace",
          color: 'var(--text-primary)',
        }}
      >
        {progress}%
      </span>

      <div
        className="w-[200px] h-[2px] rounded-sm overflow-hidden"
        style={{ backgroundColor: 'var(--border-default)' }}
      >
        <div
          className="h-full rounded-sm transition-[width] duration-150 ease-linear"
          style={{
            width: `${progress}%`,
            backgroundColor: 'var(--color-cyan)',
          }}
        />
      </div>

      <span
        className="text-[11px] font-medium tracking-[3px] uppercase"
        style={{
          fontFamily: "'Space Grotesk', monospace",
          color: 'var(--text-muted)',
        }}
      >
        Carregando experiência
      </span>
    </div>
  );
}
