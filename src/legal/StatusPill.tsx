import * as React from 'react';
import { cn } from '../primitives/cn';
import type { LegalTone, StatusMeta } from './internal';

export type StatusPillVariant = 'soft' | 'inline' | 'solid';
export type StatusPillSize = 'sm' | 'md';

export interface StatusPillProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** The glyph + label + tone triple to render. */
  meta: StatusMeta;
  /** `soft` (default) tints the tone; `inline` is a bare glyph+word; `solid` fills. */
  variant?: StatusPillVariant;
  size?: StatusPillSize;
}

/** Soft (tinted) treatment per tone — every value is a `--xen-*` token class. */
const SOFT: Record<LegalTone, string> = {
  neutral: 'bg-neutral-100 text-on-surface',
  primary: 'bg-primary-50 text-primary',
  accent: 'bg-accent-50 text-accent',
  success: 'bg-success text-on-success',
  warn: 'bg-warn text-on-warn',
  danger: 'bg-danger text-on-danger',
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
 * Reusable status indicator for the legal module (web) — renders a
 * {@link StatusMeta} as a **glyph + word** pill so state is never conveyed by
 * color alone. Color always resolves from a `--xen-*` token utility class, never
 * a literal. `inline` drops the pill chrome for use inside a dense row. Not
 * domain-specific; every legal block composes it.
 */
export const StatusPill = React.forwardRef<HTMLSpanElement, StatusPillProps>(
  function StatusPill({ meta, variant = 'soft', size = 'md', className, ...rest }, ref) {
    const inline = variant === 'inline';
    const tone =
      variant === 'solid' ? SOLID[meta.tone] : inline ? INLINE[meta.tone] : SOFT[meta.tone];

    return (
      <span
        ref={ref}
        aria-label={meta.label}
        data-xen-status-pill={meta.tone}
        className={cn(
          'inline-flex items-center gap-1 font-semibold leading-none',
          size === 'sm' ? 'text-xs' : 'text-sm',
          inline ? '' : 'rounded-full px-2 py-0.5',
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
