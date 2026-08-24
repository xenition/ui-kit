import * as React from 'react';
import { cn } from '../primitives/cn';
import type { RideStatusBarProps, RideStage } from './RideStatusBar';

/** Same public contract as {@link RideStatusBar} — a drop-in alternate design. */
export type RideStatusBarV3Props = RideStatusBarProps;

const STAGES: { key: RideStage; label: string; glyph: string }[] = [
  { key: 'requested', label: 'Requested', glyph: '📱' },
  { key: 'arriving', label: 'Arriving', glyph: '🚗' },
  { key: 'in-trip', label: 'In trip', glyph: '🛣️' },
  { key: 'completed', label: 'Completed', glyph: '✅' },
];

/**
 * RideStatusBar, redesigned (v3): a **compact status line**. The current stage's
 * glyph + label and the detail sit inline, with a tiny progress-dot strip on the
 * right showing position in the lifecycle. The opposite of v2's stepper. Same
 * props, token-only.
 */
export const RideStatusBarV3 = React.forwardRef<HTMLDivElement, RideStatusBarV3Props>(
  function RideStatusBarV3({ stage, detail, cancelled = false, variant, className, ...rest }, ref) {
    void variant;
    const activeIndex = Math.max(0, STAGES.findIndex((s) => s.key === stage));

    if (cancelled) {
      return (
        <div ref={ref} data-xen-ride-status-bar="" role="status" className={cn('flex items-center gap-2 border-b border-border py-2', className)} {...rest}>
          <span aria-hidden>⚠️</span>
          <span className="text-sm font-semibold text-danger">Cancelled{detail ? ` · ${detail}` : ''}</span>
        </div>
      );
    }
    const current = STAGES[activeIndex] ?? STAGES[0]!;

    return (
      <div ref={ref} data-xen-ride-status-bar="" role="status" aria-label={`Ride status: ${current.label}`} className={cn('flex items-center gap-2 border-b border-border py-2', className)} {...rest}>
        <span aria-hidden>{current.glyph}</span>
        <div className="min-w-0 flex-1">
          <span className="text-sm font-semibold text-on-surface">{current.label}</span>
          {detail ? <span className="text-xs text-muted"> · {detail}</span> : null}
        </div>
        <div className="flex gap-1">
          {STAGES.map((s, i) => <span key={s.key} className={cn('h-1.5 w-1.5 rounded-full', i <= activeIndex ? 'bg-primary' : 'bg-neutral-200')} aria-hidden />)}
        </div>
      </div>
    );
  }
);
