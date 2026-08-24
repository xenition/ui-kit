import * as React from 'react';
import { cn } from '../primitives/cn';
import { injectStyleOnce } from '../motion/internal/inject';
import { SLOT_BORDER, SLOT_TEXT, SLOT_TINT, type WellnessSlot } from './_tokens';

export type BreathPhase = 'inhale' | 'hold' | 'exhale' | 'holdOut';

export interface BreathStep {
  phase: BreathPhase;
  /** Seconds to spend in this phase. */
  seconds: number;
}

/** Named breathing patterns; expanded to steps when no explicit `steps`. */
export type BreathingPattern = 'box' | '4-7-8' | 'calm' | 'coherent';

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

const PHASE_META: Record<BreathPhase, { label: string; color: WellnessSlot }> = {
  inhale: { label: 'Breathe in', color: 'primary' },
  hold: { label: 'Hold', color: 'accent' },
  exhale: { label: 'Breathe out', color: 'success' },
  holdOut: { label: 'Hold', color: 'accent' },
};

const MIN_SCALE = 0.62;
const MAX_SCALE = 1;

// Reduced-motion kill switch for the easing transition (no color — token-safe).
const BREATHING_CSS = `
@media (prefers-reduced-motion: reduce) {
  [data-xen-breathing-circle] { transition: none !important; }
}`;

export interface BreathingGuideProps {
  /** Named pattern; ignored when `steps` is supplied. Default `'box'`. */
  pattern?: BreathingPattern;
  /** Explicit phase sequence — overrides `pattern`. */
  steps?: BreathStep[];
  /** Drive the animation. When false the guide sits at rest. Default false. */
  running?: boolean;
  /** Circle diameter in px. Default 200. */
  size?: number;
  /** Fires when the active phase changes. */
  onPhaseChange?: (phase: BreathPhase, index: number) => void;
  /** Fires each time the full sequence loops. */
  onCycleComplete?: (cycle: number) => void;
  /** Overrides the auto phase caption (e.g. localized). */
  label?: string;
  className?: string;
}

/**
 * An animated breathing coach (web parity of the native block). A circle expands
 * on inhale, holds, and contracts on exhale, cycling through the chosen
 * `pattern` (or explicit `steps`). The easing is a CSS `transform` transition
 * whose duration tracks each phase; under `prefers-reduced-motion` an injected
 * media rule kills the transition so the circle snaps between sizes while the
 * caption still advances — the guidance never depends on motion alone. State is
 * exposed to screen readers via the caption, not color. Token-only colors.
 */
export const BreathingGuide = React.forwardRef<HTMLDivElement, BreathingGuideProps>(
  function BreathingGuide(
    { pattern = 'box', steps, running = false, size = 200, onPhaseChange, onCycleComplete, label, className },
    ref
  ) {
    injectStyleOnce('xen-breathing-styles', BREATHING_CSS);

    const resolved = steps && steps.length > 0 ? steps : PATTERNS[pattern] ?? PATTERNS.box;
    const signature = React.useMemo(
      () => resolved.map((s) => `${s.phase}:${s.seconds}`).join('|'),
      [resolved]
    );

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

        const target =
          current.phase === 'inhale' ? MAX_SCALE : current.phase === 'exhale' ? MIN_SCALE : null;
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
    const meta = active ? PHASE_META[active.phase] : PHASE_META.inhale;
    const caption = label ?? meta.label;

    return (
      <div
        ref={ref}
        role="img"
        aria-label={`Breathing guide, ${running ? caption : 'paused'}`}
        className={cn('flex flex-col items-center justify-center gap-[var(--xen-space-md)]', className)}
      >
        <div className="flex items-center justify-center" style={{ width: size, height: size }}>
          <div
            data-xen-breathing-circle=""
            className={cn(
              // border + faint fill in the phase tone
              'flex items-center justify-center rounded-full border-2',
              SLOT_BORDER[meta.color],
              SLOT_TINT[meta.color]
            )}
            style={{
              width: size,
              height: size,
              transform: `scale(${scale})`,
              transition: `transform ${durationMs}ms ease-in-out`,
            }}
          >
            <span className={cn('font-heading text-xl font-bold', SLOT_TEXT[meta.color])}>{caption}</span>
          </div>
        </div>
        {active ? (
          <span className="text-sm text-muted">
            {cap(active.phase === 'holdOut' ? 'hold' : active.phase)} · {active.seconds}s
          </span>
        ) : null}
      </div>
    );
  }
);

function cap(s: string): string {
  return s.length === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1);
}
