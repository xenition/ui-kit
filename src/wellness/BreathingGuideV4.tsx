import * as React from 'react';
import { cn } from '../primitives/cn';
import { injectStyleOnce } from '../motion/internal/inject';
import type { BreathingGuideProps, BreathPhase, BreathStep, BreathingPattern } from './BreathingGuide';

export type BreathingGuideV4Props = BreathingGuideProps;

const PATTERNS: Record<BreathingPattern, BreathStep[]> = {
  box: [
    { phase: 'inhale', seconds: 4 },
    { phase: 'hold', seconds: 4 },
    { phase: 'exhale', seconds: 4 },
    { phase: 'holdOut', seconds: 4 },
  ],
  '4-7-8': [
    { phase: 'inhale', seconds: 4 },
    { phase: 'hold', seconds: 7 },
    { phase: 'exhale', seconds: 8 },
  ],
  calm: [
    { phase: 'inhale', seconds: 4 },
    { phase: 'exhale', seconds: 6 },
  ],
  coherent: [
    { phase: 'inhale', seconds: 5 },
    { phase: 'exhale', seconds: 5 },
  ],
};

const PHASE_LABEL: Record<BreathPhase, string> = {
  inhale: 'Breathe in',
  hold: 'Hold',
  exhale: 'Breathe out',
  holdOut: 'Hold',
};

const MIN_SCALE = 0.62;
const MAX_SCALE = 1;

// Reduced-motion kill switch for the easing transition (no color — token-safe).
const BREATHING_CSS = `
@media (prefers-reduced-motion: reduce) {
  [data-xen-breathing-circle] { transition: none !important; }
}`;

/**
 * BreathingGuideV4 — the "calm" restyle of {@link BreathingGuide}. The CSS
 * `transform` transition, the phase timer, and the reduced-motion kill switch are
 * copied exactly, so the same props, callbacks (`onPhaseChange`/`onCycleComplete`)
 * and a11y hold; only the visuals change: the breathing circle is a soft gradient
 * surface (`bg-gradient-to-br from-primary-400 to-primary-700`) with the phase
 * caption in near-white ink (`text-on-primary`) and the sub-caption in `text-muted`.
 * Token-only colors.
 */
export const BreathingGuideV4 = React.forwardRef<
  HTMLDivElement,
  BreathingGuideV4Props & React.HTMLAttributes<HTMLDivElement>
>(function BreathingGuideV4(
  { pattern = 'box', steps, running = false, size = 200, onPhaseChange, onCycleComplete, label, className, ...rest },
  ref
) {
  injectStyleOnce('xen-breathing-styles', BREATHING_CSS);

  const resolved = steps && steps.length > 0 ? steps : PATTERNS[pattern] ?? PATTERNS.box;
  const signature = React.useMemo(() => resolved.map((s) => `${s.phase}:${s.seconds}`).join('|'), [resolved]);

  const [phaseIdx, setPhaseIdx] = React.useState(0);
  const [scale, setScale] = React.useState(MIN_SCALE);
  const [durationMs, setDurationMs] = React.useState(0);

  // Keep callbacks fresh without restarting the loop.
  const phaseCb = React.useRef(onPhaseChange);
  const cycleCb = React.useRef(onCycleComplete);
  phaseCb.current = onPhaseChange;
  cycleCb.current = onCycleComplete;

  React.useEffect(() => {
    if (!running || resolved.length === 0) {
      setPhaseIdx(0);
      return;
    }
    let cancelled = false;
    let idx = 0;
    let cycle = 0;
    let timer: ReturnType<typeof setTimeout>;

    const step = (): void => {
      if (cancelled) return;
      const current = resolved[idx];
      if (!current) return;
      setPhaseIdx(idx);
      phaseCb.current?.(current.phase, idx);

      const target = current.phase === 'inhale' ? MAX_SCALE : current.phase === 'exhale' ? MIN_SCALE : null;
      if (target != null) {
        setDurationMs(current.seconds * 1000);
        setScale(target);
      }

      timer = setTimeout(() => {
        idx += 1;
        if (idx >= resolved.length) {
          idx = 0;
          cycle += 1;
          cycleCb.current?.(cycle);
        }
        step();
      }, current.seconds * 1000);
    };

    step();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, signature]);

  const active = resolved[phaseIdx] ?? resolved[0];
  const caption = label ?? (active ? PHASE_LABEL[active.phase] : PHASE_LABEL.inhale);

  return (
    <div
      ref={ref}
      role="img"
      aria-label={`Breathing guide, ${running ? caption : 'paused'}`}
      className={cn('flex flex-col items-center justify-center gap-[var(--xen-space-md)]', className)}
      {...rest}
    >
      <div className="flex items-center justify-center" style={{ width: size, height: size }}>
        <div
          data-xen-breathing-circle=""
          className="flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary-400 to-primary-700"
          style={{
            width: size,
            height: size,
            transform: `scale(${scale})`,
            transition: `transform ${durationMs}ms ease-in-out`,
          }}
        >
          <span className="font-heading text-xl font-bold text-on-primary">{caption}</span>
        </div>
      </div>
      {active ? (
        <span className="text-sm text-muted">
          {cap(active.phase === 'holdOut' ? 'hold' : active.phase)} · {active.seconds}s
        </span>
      ) : null}
    </div>
  );
});

function cap(s: string): string {
  return s.length === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1);
}
