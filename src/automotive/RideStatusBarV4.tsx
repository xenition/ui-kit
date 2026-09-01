import * as React from 'react';
import { cn } from '../primitives/cn';
import { IconV4 } from '../primitives/IconV4';
import { TONE_BG, TONE_INK, TONE_ON, toneGround } from './internal/fleet-v4';
import type { RideStage, RideStatusBarProps } from './RideStatusBar';

export interface RideStatusBarV4Props extends RideStatusBarProps {
  /** Override the stage words — four English phrases lived inside. */
  stageLabels?: Partial<Record<RideStage, string>>;
  /** Copy for the cancelled state. Default `'Cancelled'`. */
  cancelledLabel?: string;
  /** Build the spoken position. Default `'step 2 of 4'`. */
  formatStep?: (position: number, total: number) => string;
}

const STAGES: { key: RideStage; label: string; glyph: string }[] = [
  { key: 'requested', label: 'Requested', glyph: '🔍' },
  { key: 'arriving', label: 'Arriving', glyph: '🚗' },
  { key: 'in-trip', label: 'In trip', glyph: '🧭' },
  { key: 'completed', label: 'Completed', glyph: '🏁' },
];

/**
 * **V4 ride status bar** — the web twin of the native `RideStatusBarV4`, same
 * props as {@link RideStatusBar} plus `stageLabels`, `cancelledLabel` and
 * `formatStep`.
 *
 * ## Four changes
 *
 * 1. **A walked stage stays filled.** The base marked only the current one, so
 *    the bar answered "which is selected" when the question is "how far
 *    through am I".
 * 2. **The cancelled band's ink is contrast-corrected**, at the one moment the
 *    user most needs to read it.
 * 3. **The stepper is a real `role="progressbar"`** with its value.
 * 4. **Every stage word is a prop**, and the step position is spoken.
 */
export const RideStatusBarV4 = React.forwardRef<HTMLDivElement, RideStatusBarV4Props>(
  function RideStatusBarV4(
    {
      stage,
      detail,
      cancelled = false,
      variant = 'stepper',
      stageLabels,
      cancelledLabel = 'Cancelled',
      formatStep,
      className,
      style,
      ...rest
    },
    ref
  ) {
    if (cancelled) {
      return (
        <div
          ref={ref}
          role="alert"
          data-xen-ride-status="cancelled"
          className={cn(
            'flex items-center gap-sm rounded-[var(--xen-radius-lg)] border border-border px-md py-sm',
            className
          )}
          style={{ background: toneGround('danger'), ...style }}
          {...rest}
        >
          <IconV4 name="close" size="base" className={TONE_INK.danger} />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-danger-text">{cancelledLabel}</p>
            {detail ? <p className="text-xs text-muted-text">{detail}</p> : null}
          </div>
        </div>
      );
    }

    const activeIndex = Math.max(
      0,
      STAGES.findIndex((s) => s.key === stage)
    );
    const current = STAGES[activeIndex] ?? STAGES[0]!;
    const currentLabel = stageLabels?.[current.key] ?? current.label;
    const step = (formatStep ?? ((n: number, of: number) => `step ${n} of ${of}`))(
      activeIndex + 1,
      STAGES.length
    );
    const spoken = [currentLabel, step, detail].filter(Boolean).join(', ');

    if (variant === 'compact') {
      return (
        <div
          ref={ref}
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={STAGES.length}
          aria-valuenow={activeIndex + 1}
          aria-label={spoken}
          data-xen-ride-status={stage}
          className={cn('flex items-center gap-sm', className)}
          style={style}
          {...rest}
        >
          <IconV4 glyph={current.glyph} size="base" />
          <span className="min-w-0 flex-1 text-sm font-semibold text-on-surface">
            {currentLabel}
          </span>
          {detail ? <span className="truncate text-xs text-muted-text">{detail}</span> : null}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={STAGES.length}
        aria-valuenow={activeIndex + 1}
        aria-label={spoken}
        data-xen-ride-status={stage}
        className={cn('flex flex-col gap-xs', className)}
        style={style}
        {...rest}
      >
        <div className="flex items-center">
          {STAGES.map((s, i) => {
            const walked = i <= activeIndex;
            return (
              <React.Fragment key={s.key}>
                {i > 0 ? (
                  <span
                    aria-hidden
                    className={cn(
                      'h-0.5 flex-1 rounded-full',
                      walked ? 'bg-primary' : 'bg-border'
                    )}
                  />
                ) : null}
                <span
                  aria-hidden
                  className={cn(
                    'flex h-4 w-4 items-center justify-center rounded-full text-[10px]',
                    walked ? cn(TONE_BG.primary, TONE_ON.primary) : cn('bg-muted', TONE_ON.neutral)
                  )}
                >
                  {s.glyph}
                </span>
              </React.Fragment>
            );
          })}
        </div>

        <div className="flex items-baseline gap-sm">
          <span className="min-w-0 flex-1 text-sm font-semibold text-on-surface">
            {currentLabel}
          </span>
          {detail ? <span className="truncate text-xs text-muted-text">{detail}</span> : null}
        </div>
      </div>
    );
  }
);
