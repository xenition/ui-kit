import * as React from 'react';
import { cn } from '../primitives/cn';
import type { LegalTone } from './internal';
import type { StatusPillProps } from './StatusPill';

/** Drop-in for {@link StatusPillProps} — same props, the V4 "chambers" design. */
export type StatusPillV4Props = StatusPillProps;

/** Soft treatment — a tone-tinted well with a hairline ring (every value a token class). */
const SOFT: Record<LegalTone, string> = {
  neutral: 'bg-neutral-100 text-on-surface ring-1 ring-border',
  primary: 'bg-primary/10 text-primary ring-1 ring-primary/20',
  accent: 'bg-accent/10 text-accent ring-1 ring-accent/20',
  success: 'bg-success/10 text-success ring-1 ring-success/20',
  warn: 'bg-warn/10 text-warn ring-1 ring-warn/20',
  danger: 'bg-danger/10 text-danger ring-1 ring-danger/20',
};

/** Solid (filled) treatment per tone. */
const SOLID: Record<LegalTone, string> = {
  neutral: 'bg-neutral-200 text-on-surface',
  primary: 'bg-primary text-on-primary',
  accent: 'bg-accent text-on-accent',
  success: 'bg-success text-on-success',
  warn: 'bg-warn text-on-warn',
  danger: 'bg-danger text-on-danger',
};

/** Inline (chrome-less) treatment — tone text color only. */
const INLINE: Record<LegalTone, string> = {
  neutral: 'text-muted',
  primary: 'text-primary',
  accent: 'text-accent',
  success: 'text-success',
  warn: 'text-warn',
  danger: 'text-danger',
};

/**
 * StatusPill — **V4** "chambers" design (web parity of the native V4). The
 * distinguished, chambers take on the shared status indicator: a rounded
 * **glyph + word** pill so state is never carried by color alone. The `soft`
 * variant reads as a tone-tinted well with a hairline ring; `solid` fills;
 * `inline` drops the chrome for dense rows. Keeps the base `variant`
 * (`soft` / `inline` / `solid`) and `size` (`sm` / `md`). Color always resolves
 * from a `--xen-*` token class, never a literal. Identical props/behavior to
 * {@link StatusPillProps}.
 */
export const StatusPillV4 = React.forwardRef<HTMLSpanElement, StatusPillV4Props>(
  function StatusPillV4({ meta, variant = 'soft', size = 'md', className, ...rest }, ref) {
    const inline = variant === 'inline';
    const tone = variant === 'solid' ? SOLID[meta.tone] : inline ? INLINE[meta.tone] : SOFT[meta.tone];

    return (
      <span
        ref={ref}
        aria-label={meta.label}
        data-xen-status-pill={meta.tone}
        className={cn(
          'inline-flex items-center gap-1 font-bold leading-none',
          size === 'sm' ? 'text-xs' : 'text-sm',
          inline ? '' : 'rounded-full px-2.5 py-1',
          tone,
          className
        )}
        {...rest}
      >
        <span aria-hidden="true">{meta.glyph}</span>
        <span>{meta.label}</span>
      </span>
    );
  }
);
