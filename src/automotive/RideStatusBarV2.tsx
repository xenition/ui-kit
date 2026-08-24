import * as React from 'react';
import { cn } from '../primitives/cn';
import type { RideStatusBarProps, RideStage } from './RideStatusBar';

/** Same public contract as {@link RideStatusBar} — a drop-in alternate design. */
export type RideStatusBarV2Props = RideStatusBarProps;

const STAGES: { key: RideStage; label: string; glyph: string }[] = [
  { key: 'requested', label: 'Requested', glyph: '📱' },
  { key: 'arriving', label: 'Arriving', glyph: '🚗' },
  { key: 'in-trip', label: 'In trip', glyph: '🛣️' },
  { key: 'completed', label: 'Completed', glyph: '✅' },
];

/**
 * RideStatusBar, redesigned (v2): a **big horizontal stepper**. Each stage is a
 * node with a connector; reached nodes fill primary, the active one is ringed, and
 * a detail line sits beneath — a prominent trip tracker. Distinct from v1. Same
 * props, token-only.
 */
export const RideStatusBarV2 = React.forwardRef<HTMLDivElement, RideStatusBarV2Props>(
  function RideStatusBarV2({ stage, detail, cancelled = false, variant, className, ...rest }, ref) {
    void variant;
    const activeIndex = Math.max(0, STAGES.findIndex((s) => s.key === stage));

    if (cancelled) {
      return (
        <div ref={ref} data-xen-ride-status-bar="" role="status" className={cn('flex items-center gap-2 rounded-lg border border-danger bg-danger/5 px-md py-2', className)} {...rest}>
          <span aria-hidden>⚠️</span>
          <span className="text-sm font-semibold text-danger">Ride cancelled{detail ? ` · ${detail}` : ''}</span>
        </div>
      );
    }

    return (
      <div ref={ref} data-xen-ride-status-bar="" role="status" aria-label={`Ride status: ${STAGES[activeIndex]?.label}`} className={cn('flex flex-col gap-2', className)} {...rest}>
        <div className="flex items-center">
          {STAGES.map((s, i) => {
            const reached = i <= activeIndex;
            const active = i === activeIndex;
            return (
              <React.Fragment key={s.key}>
                <div className="flex flex-col items-center gap-1">
                  <span className={cn('flex h-8 w-8 items-center justify-center rounded-full text-sm', active ? 'bg-primary text-on-primary ring-2 ring-primary ring-offset-2' : reached ? 'bg-primary/20 text-primary' : 'bg-neutral-100 text-muted')}>{s.glyph}</span>
                  <span className={cn('text-[10px]', reached ? 'text-on-surface' : 'text-muted')}>{s.label}</span>
                </div>
                {i < STAGES.length - 1 ? <span className={cn('mx-1 h-px flex-1', i < activeIndex ? 'bg-primary' : 'bg-border')} aria-hidden /> : null}
              </React.Fragment>
            );
          })}
        </div>
        {detail ? <p className="text-center text-xs text-muted">{detail}</p> : null}
      </div>
    );
  }
);
