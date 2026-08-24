import * as React from 'react';
import { cn } from '../primitives/cn';
import { TONE_TEXT, TONE_SOFT, TONE_SOLID, type StatusMeta } from './internal';

export type StatusPillVariant = 'soft' | 'inline' | 'solid';
export type StatusPillSize = 'sm' | 'md';

export interface StatusPillProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** The glyph + label + tone triple to render. */
  meta: StatusMeta;
  /** `soft` (default) tints the tone; `inline` is a bare glyph+word; `solid` fills. */
  variant?: StatusPillVariant;
  size?: StatusPillSize;
}

/**
 * Reusable status indicator for the POS module — the DOM parity of the native
 * `StatusPill`. Renders a {@link StatusMeta} as a **glyph + word** so state is
 * never conveyed by color alone. Color always resolves from a `--xen-*` token
 * class, never a literal. `inline` drops the pill chrome for dense rows. Every
 * POS block composes it, so tender / ticket / refund state reads the same.
 */
export const StatusPill = React.forwardRef<HTMLSpanElement, StatusPillProps>(function StatusPill(
  { meta, variant = 'soft', size = 'md', className, ...rest },
  ref
) {
  const inline = variant === 'inline';
  const textSize = size === 'sm' ? 'text-xs' : 'text-sm';
  const toneClass = inline
    ? TONE_TEXT[meta.tone]
    : variant === 'solid'
      ? TONE_SOLID[meta.tone]
      : TONE_SOFT[meta.tone];

  return (
    <span
      ref={ref}
      aria-label={meta.label}
      data-xen-status-pill=""
      className={cn(
        'inline-flex items-center gap-1 font-semibold',
        textSize,
        inline ? '' : 'rounded-full px-2 py-0.5',
        toneClass,
        className
      )}
      {...rest}
    >
      <span aria-hidden="true">{meta.glyph}</span>
      <span>{meta.label}</span>
    </span>
  );
});
