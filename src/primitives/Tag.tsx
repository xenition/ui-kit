import * as React from 'react';
import { cn } from './cn';

export type TagTone = 'neutral' | 'primary' | 'success' | 'warn' | 'danger' | 'accent';
export type TagVariant = 'solid' | 'soft' | 'outline';
export type TagSize = 'sm' | 'md';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: TagTone;
  /** `solid` (default) is the historical fill; `soft` tints it; `outline` rings it. */
  variant?: TagVariant;
  /** Size scale. Defaults to the historical `md`. */
  size?: TagSize;
  /** Force the remove (×) affordance even without `onRemove`. */
  removable?: boolean;
  /** Leading status dot. */
  dot?: boolean;
  /** Renders a remove (×) button that calls this. */
  onRemove?: () => void;
}

/** Historical fill look — preserved exactly for `variant="solid"` (the default). */
const SOLID: Record<TagTone, string> = {
  neutral: 'bg-neutral-100 text-on-surface',
  primary: 'bg-primary-50 text-primary',
  success: 'bg-success text-on-success',
  warn: 'bg-warn text-on-warn',
  danger: 'bg-danger text-on-danger',
  accent: 'bg-accent text-on-accent',
};

/** Soft tint. success/warn/danger have no `-50` ramp → neutral bg + colored text. */
const SOFT: Record<TagTone, string> = {
  neutral: 'bg-neutral-100 text-on-surface',
  primary: 'bg-primary-50 text-primary',
  accent: 'bg-accent-50 text-accent',
  success: 'bg-neutral-100 text-success',
  warn: 'bg-neutral-100 text-warn',
  danger: 'bg-neutral-100 text-danger',
};

const OUTLINE: Record<TagTone, string> = {
  neutral: 'border border-border text-on-surface',
  primary: 'border border-primary text-primary',
  accent: 'border border-accent text-accent',
  success: 'border border-success text-success',
  warn: 'border border-warn text-warn',
  danger: 'border border-danger text-danger',
};

const VARIANT: Record<TagVariant, Record<TagTone, string>> = {
  solid: SOLID,
  soft: SOFT,
  outline: OUTLINE,
};

const DOT: Record<TagTone, string> = {
  neutral: 'bg-on-surface',
  primary: 'bg-primary',
  accent: 'bg-accent',
  success: 'bg-success',
  warn: 'bg-warn',
  danger: 'bg-danger',
};

const SIZE: Record<TagSize, string> = {
  sm: 'px-1.5 py-px',
  md: 'px-2 py-0.5',
};

const DOT_SIZE: Record<TagSize, string> = {
  sm: 'h-1.5 w-1.5',
  md: 'h-2 w-2',
};

/**
 * Removable chip/tag bound to the theme tokens — for filters, keywords,
 * multi-select values. The default (`neutral`, `solid`, `md`) renders exactly
 * as before; the `accent` tone, `soft`/`outline` variants, `sm` size, a leading
 * `dot`, and a `removable` flag (× also shows whenever `onRemove` is set) are
 * additive opt-ins mirroring the native `Tag`. No literal colors.
 */
export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(function Tag(
  {
    className,
    tone = 'neutral',
    variant = 'solid',
    size = 'md',
    removable = false,
    dot = false,
    onRemove,
    children,
    ...rest
  },
  ref
) {
  const showRemove = removable || onRemove != null;

  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center gap-1 rounded-[var(--xen-radius-sm)] text-xs font-medium',
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
      {children}
      {showRemove && (
        <button
          type="button"
          aria-label="Remove"
          onClick={onRemove}
          className="ml-0.5 opacity-70 transition-opacity hover:opacity-100"
        >
          ×
        </button>
      )}
    </span>
  );
});
