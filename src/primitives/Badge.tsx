import * as React from 'react';
import { cn } from './cn';

export type BadgeTone = 'neutral' | 'muted' | 'primary' | 'success' | 'warn' | 'danger' | 'accent';
export type BadgeVariant = 'solid' | 'soft' | 'outline';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  /** `solid` (default) is the historical fill; `soft` tints it; `outline` rings it. */
  variant?: BadgeVariant;
  /** Size scale. Defaults to the historical `md`. */
  size?: BadgeSize;
  /** Render a leading status dot (optionally alongside a label). */
  dot?: boolean;
  /** Numeric count; when set it becomes the label, clamped by `max`. */
  count?: number;
  /** Cap for `count` before rolling over to `${max}+` (default 99). */
  max?: number;
}

/** Historical fill look — preserved exactly for `variant="solid"` (the default). */
const SOLID: Record<BadgeTone, string> = {
  neutral: 'bg-neutral-100 text-on-surface',
  muted: 'bg-neutral-100 text-muted',
  primary: 'bg-primary-50 text-primary',
  success: 'bg-success text-on-success',
  warn: 'bg-warn text-on-warn',
  danger: 'bg-danger text-on-danger',
  accent: 'bg-accent text-on-accent',
};

/** Soft tint. success/warn/danger have no `-50` ramp → neutral bg + colored text. */
const SOFT: Record<BadgeTone, string> = {
  neutral: 'bg-neutral-100 text-on-surface',
  muted: 'bg-neutral-100 text-muted',
  primary: 'bg-primary-50 text-primary',
  accent: 'bg-accent-50 text-accent',
  success: 'bg-neutral-100 text-success',
  warn: 'bg-neutral-100 text-warn',
  danger: 'bg-neutral-100 text-danger',
};

const OUTLINE: Record<BadgeTone, string> = {
  neutral: 'border border-border text-on-surface',
  muted: 'border border-border text-muted',
  primary: 'border border-primary text-primary',
  accent: 'border border-accent text-accent',
  success: 'border border-success text-success',
  warn: 'border border-warn text-warn',
  danger: 'border border-danger text-danger',
};

const VARIANT: Record<BadgeVariant, Record<BadgeTone, string>> = {
  solid: SOLID,
  soft: SOFT,
  outline: OUTLINE,
};

/** Status-dot fill per tone. */
const DOT: Record<BadgeTone, string> = {
  neutral: 'bg-on-surface',
  muted: 'bg-muted',
  primary: 'bg-primary',
  accent: 'bg-accent',
  success: 'bg-success',
  warn: 'bg-warn',
  danger: 'bg-danger',
};

const SIZE: Record<BadgeSize, string> = {
  sm: 'px-1.5 py-px',
  md: 'px-2 py-0.5',
};

const DOT_SIZE: Record<BadgeSize, string> = {
  sm: 'h-1.5 w-1.5',
  md: 'h-2 w-2',
};

/**
 * Small status/label pill bound to the theme tokens — for statuses, tags,
 * counts. The default (`neutral`, `solid`, `md`) renders exactly as before;
 * the `accent` tone, `soft`/`outline` variants, `sm` size, a `dot` status mode,
 * and a numeric `count` (`max`-capped to `${max}+`) are additive opt-ins
 * mirroring the native `Badge`. No literal colors.
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { className, tone = 'neutral', variant = 'solid', size = 'md', dot = false, count, max = 99, children, ...rest },
  ref
) {
  const label =
    count !== undefined ? (count > max ? `${max}+` : String(count)) : children;

  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center gap-1 rounded-full text-xs font-medium',
        SIZE[size],
        VARIANT[variant][tone],
        className
      )}
      {...rest}
    >
      {dot && (
        <span
          aria-hidden
          className={cn('inline-block shrink-0 rounded-full', DOT_SIZE[size], DOT[tone])}
        />
      )}
      {label}
    </span>
  );
});
