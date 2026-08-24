import * as React from 'react';
import { cn } from '../primitives/cn';
import { countdownParts } from './format';

/** Layout of a {@link CountdownBadge}. */
export type CountdownVariant = 'inline' | 'blocks';

/** Semantic tone of the badge. */
export type CountdownTone = 'primary' | 'accent' | 'neutral';

export interface CountdownBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Absolute target time. Ignored when `remainingMs` is given. */
  target?: Date;
  /** Explicit remaining milliseconds (wins over `target`; handy for tests). */
  remainingMs?: number;
  /** Reference "now" for computing the delta from `target` (defaults to now). */
  now?: Date;
  /** Leading caption, e.g. `Starts in`. */
  label?: string;
  /** Text shown once the target has passed. */
  elapsedLabel?: string;
  /** `inline` compact chip, or `blocks` of dd/hh/mm tiles. */
  variant?: CountdownVariant;
  /** Color tone. */
  tone?: CountdownTone;
}

/** Token background + foreground classes per tone. */
const TONE_BG: Record<CountdownTone, string> = {
  primary: 'bg-primary',
  accent: 'bg-accent',
  neutral: 'bg-border',
};
const TONE_FG: Record<CountdownTone, string> = {
  primary: 'text-on-primary',
  accent: 'text-on-accent',
  neutral: 'text-on-surface',
};

const pad = (n: number): string => String(n).padStart(2, '0');

/**
 * Countdown to an event. Accepts an absolute `target` (measured against `now`)
 * or explicit `remainingMs`. `inline` renders a single chip (`3d 04h 12m`);
 * `blocks` renders separate dd / hh / mm tiles. Once elapsed it shows
 * `elapsedLabel`. This is a pure display component — it does not tick on its own
 * and reads no clock at import; the host re-renders with a fresh `now` /
 * `remainingMs`. Colors come from the `--xen-*` tokens; no literal colors.
 */
export const CountdownBadge = React.forwardRef<HTMLDivElement, CountdownBadgeProps>(function CountdownBadge(
  { target, remainingMs, now, label, elapsedLabel = 'Started', variant = 'inline', tone = 'primary', className, ...rest },
  ref
) {
  const ms =
    typeof remainingMs === 'number'
      ? remainingMs
      : target
        ? target.getTime() - (now ?? new Date()).getTime()
        : 0;
  const parts = countdownParts(ms);
  const bg = TONE_BG[tone];
  const fg = TONE_FG[tone];

  const a11y = parts.elapsed
    ? elapsedLabel
    : `${label ? `${label} ` : ''}${parts.days} days ${parts.hours} hours ${parts.minutes} minutes`;

  if (parts.elapsed) {
    return (
      <div
        ref={ref}
        aria-label={a11y}
        className={cn('inline-flex self-start rounded-full bg-border px-md py-xs', className)}
        {...rest}
      >
        <span className="text-sm font-bold text-on-surface">{elapsedLabel}</span>
      </div>
    );
  }

  if (variant === 'blocks') {
    const blocks: { value: string; unit: string }[] = [
      { value: pad(parts.days), unit: 'DAY' },
      { value: pad(parts.hours), unit: 'HR' },
      { value: pad(parts.minutes), unit: 'MIN' },
    ];
    return (
      <div ref={ref} aria-label={a11y} className={cn('flex flex-col gap-xs', className)} {...rest}>
        {label ? <span className="text-xs font-semibold text-muted">{label}</span> : null}
        <div className="flex flex-row gap-xs">
          {blocks.map((b) => (
            <div key={b.unit} className={cn('flex min-w-[3rem] flex-col items-center rounded-md px-sm py-sm', bg)}>
              <span className={cn('text-lg font-extrabold', fg)}>{b.value}</span>
              <span className={cn('text-xs tracking-wide', fg)}>{b.unit}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const compact = `${parts.days > 0 ? `${parts.days}d ` : ''}${pad(parts.hours)}h ${pad(parts.minutes)}m`;
  return (
    <div
      ref={ref}
      aria-label={a11y}
      className={cn('inline-flex flex-row items-center gap-xs self-start rounded-full px-md py-xs', bg, className)}
      {...rest}
    >
      {label ? <span className={cn('text-xs font-semibold', fg)}>{label}</span> : null}
      <span className={cn('text-sm font-extrabold', fg)}>{compact}</span>
    </div>
  );
});
