import * as React from 'react';
import { cn } from '../primitives/cn';

/** The ordered lifecycle stages of a ride. */
export type RideStage = 'requested' | 'arriving' | 'in-trip' | 'completed';
/** Presentation for a {@link RideStatusBar}. */
export type RideStatusVariant = 'stepper' | 'compact';

/** Canonical stage order + glyph + human label. */
const STAGES: { key: RideStage; label: string; glyph: string }[] = [
  { key: 'requested', label: 'Requested', glyph: '🔍' },
  { key: 'arriving', label: 'Arriving', glyph: '🚗' },
  { key: 'in-trip', label: 'In trip', glyph: '🧭' },
  { key: 'completed', label: 'Completed', glyph: '🏁' },
];

export interface RideStatusBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The current stage. */
  stage: RideStage;
  /** Contextual detail for the active stage (e.g. `'Driver 3 min away'`). */
  detail?: string;
  /** Whether the ride was cancelled (renders a distinct cancelled state). */
  cancelled?: boolean;
  /** Presentation variant. */
  variant?: RideStatusVariant;
}

/**
 * A ride lifecycle progress bar — walks `requested → arriving → in-trip →
 * completed`, marking each stage done / active / pending. Completed and active
 * stages are distinguished by a glyph (✓ / the stage icon) and a spelled-out
 * label plus an a11y label, so progress never rests on color alone. A
 * `cancelled` flag overrides with an explicit cancelled state. Colors come from
 * `--xen-*` token classes — no literal colors. The `stage` is matched against a
 * known set and falls back safely if unrecognised. Web parity of the native
 * `RideStatusBar`.
 */
export const RideStatusBar = React.forwardRef<HTMLDivElement, RideStatusBarProps>(
  function RideStatusBar({ stage, detail, cancelled = false, variant = 'stepper', className, ...rest }, ref) {
    const activeIndex = Math.max(0, STAGES.findIndex((s) => s.key === stage));
    const compact = variant === 'compact';

    if (cancelled) {
      return (
        <div
          ref={ref}
          data-xen-ride-status="cancelled"
          aria-label="Ride cancelled"
          className={cn(
            'flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-danger bg-surface px-[var(--xen-space-md)] py-[var(--xen-space-sm)]',
            className
          )}
          {...rest}
        >
          <span aria-hidden="true" className="text-base text-danger">
            ✕
          </span>
          <div className="min-w-0 flex-1">
            <span className="block text-sm font-bold text-danger">Cancelled</span>
            {detail ? <span className="block text-xs text-muted">{detail}</span> : null}
          </div>
        </div>
      );
    }

    const current = STAGES[activeIndex] ?? STAGES[0]!;
    const a11y = `Ride status: ${current.label}, step ${activeIndex + 1} of ${STAGES.length}${
      detail ? `, ${detail}` : ''
    }`;

    return (
      <div
        ref={ref}
        data-xen-ride-status={current.key}
        aria-label={a11y}
        className={cn('flex flex-col gap-[var(--xen-space-sm)]', className)}
        {...rest}
      >
        <div className="flex items-start" aria-hidden="true">
          {STAGES.map((s, i) => {
            const done = i < activeIndex;
            const active = i === activeIndex;
            const isLast = i === STAGES.length - 1;
            return (
              <React.Fragment key={s.key}>
                <div className={cn('flex flex-col items-center', compact ? 'w-[30px]' : 'w-16')}>
                  <span
                    className={cn(
                      'inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-extrabold',
                      done
                        ? 'bg-primary text-on-primary'
                        : active
                          ? 'border-2 border-primary bg-primary-50 text-on-surface'
                          : 'bg-neutral-100 text-on-surface'
                    )}
                  >
                    {done ? '✓' : s.glyph}
                  </span>
                  {!compact ? (
                    <span
                      className={cn(
                        'mt-[var(--xen-space-xs)] truncate text-xs',
                        active ? 'font-bold text-on-surface' : 'font-medium text-muted'
                      )}
                    >
                      {s.label}
                    </span>
                  ) : null}
                </div>
                {!isLast ? (
                  <span
                    className={cn(
                      'mt-[13px] h-0.5 flex-1 rounded-full',
                      i < activeIndex ? 'bg-primary' : 'bg-neutral-200'
                    )}
                  />
                ) : null}
              </React.Fragment>
            );
          })}
        </div>

        <div className="flex items-center gap-[var(--xen-space-xs)]">
          <span className="text-sm font-bold text-on-surface">{current.label}</span>
          {detail ? <span className="text-sm text-muted">· {detail}</span> : null}
        </div>
      </div>
    );
  }
);
