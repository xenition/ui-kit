import * as React from 'react';
import { AnimatedCounter } from '../motion/AnimatedCounter';
import { cn } from '../primitives/cn';
import type { StatBarProps, StatProps } from './StatBar';

/** Drop-in for {@link StatBarProps} — same props, the V4 "showcase" design. */
export type StatBarV4Props = StatBarProps;

/** Drop-in for {@link StatProps} — same props, the V4 "showcase" design. */
export type StatV4Props = StatProps;

/**
 * StatBar — **V4** "showcase" design (web parity of the native V4). A content
 * section, so NOT a gradient surface: a centered, wrapping row of `StatV4`s on
 * the page ground with generous 8-pt gutters. Same props/behavior as
 * {@link StatBarProps}; token-only colors, no literals.
 */
export const StatBarV4 = React.forwardRef<HTMLDivElement, StatBarV4Props>(function StatBarV4(
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

/**
 * Stat — **V4** "showcase" design (web parity of the native V4). One statistic:
 * a big extra-bold **tabular-nums** numeral (an `AnimatedCounter` with
 * prefix/suffix that counts up as it scrolls into view) over a muted label. Same
 * props/behavior as {@link StatProps}; token-only colors, no literals.
 */
export const StatV4 = React.forwardRef<HTMLDivElement, StatV4Props>(function StatV4(
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
      <div className="font-heading text-4xl font-extrabold tracking-tight tabular-nums text-on-surface">
        {prefix}
        <AnimatedCounter to={to} duration={duration} format={format} />
        {suffix}
      </div>
      <div className="text-sm text-muted">{label}</div>
    </div>
  );
});
