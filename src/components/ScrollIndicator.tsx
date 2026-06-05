export default function ScrollIndicator() {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[100] flex-col items-center gap-6 hidden md:flex">
      <span
        className="text-[10px] font-medium tracking-[3px] uppercase"
        style={{
          fontFamily: "'Space Grotesk', monospace",
          color: 'var(--text-muted)',
          writingMode: 'vertical-rl',
        }}
      >
        Scroll to explore
      </span>

      <div
        className="w-px h-[60px] relative overflow-hidden"
        style={{ backgroundColor: 'var(--border-default)' }}
      >
        <div
          className="absolute top-0 left-0 w-full h-[30px]"
          style={{
            backgroundColor: 'var(--color-cyan)',
            animation: 'scroll-line-pulse 2s var(--easing-smooth) infinite',
          }}
        />
      </div>

      <span
        className="text-[11px] font-semibold tracking-[1px]"
        style={{
          fontFamily: "'Space Grotesk', monospace",
          color: 'var(--text-secondary)',
        }}
      >
        01
      </span>
    </div>
  );
}
