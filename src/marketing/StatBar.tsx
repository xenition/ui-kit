import * as React from 'react';
import { AnimatedCounter } from '../motion/AnimatedCounter';
import { cn } from '../primitives/cn';

export type StatBarProps = React.HTMLAttributes<HTMLDivElement>;

/** Horizontal row of `Stat`s — counts up as it scrolls into view. */
export const StatBar = React.forwardRef<HTMLDivElement, StatBarProps>(function StatBar(
  { className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      data-xen-statbar=""
      className={cn(
        'flex flex-wrap items-start justify-center gap-x-[var(--xen-space-2xl)] gap-y-[var(--xen-space-lg)]',
        className
      )}
      {...rest}
    />
  );
});

export interface StatProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'prefix'> {
  /** Final value the counter reaches. */
  to: number;
  /** Label under the number. */
  label: React.ReactNode;
  /** Rendered before the number (e.g. `$`). */
  prefix?: React.ReactNode;
  /** Rendered after the number (e.g. `+`, `%`). */
  suffix?: React.ReactNode;
  /** Count duration in ms. */
  duration?: number;
  /** Formats the animated value. */
  format?: (value: number) => string;
}

/** One statistic: an `AnimatedCounter` with prefix/suffix and a label. */
export const Stat = React.forwardRef<HTMLDivElement, StatProps>(function Stat(
  { to, label, prefix, suffix, duration, format, className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      data-xen-stat=""
      className={cn('flex flex-col items-center gap-[var(--xen-space-xs)] text-center', className)}
      {...rest}
    >
      <div className="font-heading text-3xl font-bold text-on-surface">
        {prefix}
        <AnimatedCounter to={to} duration={duration} format={format} />
        {suffix}
      </div>
      <div className="text-sm text-muted">{label}</div>
    </div>
  );
});
