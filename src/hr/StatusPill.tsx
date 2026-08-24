import * as React from 'react';
import { cn } from '../primitives/cn';
import { TONE_TEXT_CLASS, type HrTone, type StatusMeta } from './internal';

export type StatusPillVariant = 'soft' | 'inline' | 'solid';
export type StatusPillSize = 'sm' | 'md';

export interface StatusPillProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** The glyph + label + tone triple to render. */
  meta: StatusMeta;
  /** `soft` (default) tints a neutral chrome; `inline` is a bare glyph+word; `solid` fills the tone. */
  variant?: StatusPillVariant;
  size?: StatusPillSize;
}

/** Solid (filled) chrome per tone — background + paired on-token text, both tokens. */
const SOLID_CLASS: Record<HrTone, string> = {
  neutral: 'bg-neutral-100 text-on-surface',
  primary: 'bg-primary text-on-primary',
  success: 'bg-success text-on-success',
  warn: 'bg-warn text-on-warn',
  danger: 'bg-danger text-on-danger',
  accent: 'bg-accent text-on-accent',
};

/**
 * Reusable status indicator for the web HR module — the DOM parity of the
 * native `StatusPill`. Renders a {@link StatusMeta} as a **glyph + word** pill so
 * state is never conveyed by color alone. Every color resolves from a `--xen-*`
 * token class (`text-primary`, `bg-success`, …), never a literal. `soft`
 * (default) draws neutral pill chrome with a tone-colored glyph + word; `inline`
 * drops the chrome for dense rows; `solid` fills the tone. `forwardRef` to the
 * root `<span>`.
 */
export const StatusPill = React.forwardRef<HTMLSpanElement, StatusPillProps>(function StatusPill(
  { meta, variant = 'soft', size = 'md', className, ...rest },
  ref
) {
  const solid = variant === 'solid';
  const inline = variant === 'inline';
  const textSize = size === 'sm' ? 'text-xs' : 'text-sm';

  return (
    <span
      ref={ref}
      aria-label={meta.label}
      className={cn(
        'inline-flex items-center gap-1 font-semibold',
        textSize,
        inline
          ? cn('bg-transparent', TONE_TEXT_CLASS[meta.tone])
          : solid
            ? cn('rounded-full', size === 'sm' ? 'px-2 py-0.5' : 'px-2.5 py-0.5', SOLID_CLASS[meta.tone])
            : cn('rounded-full bg-neutral-100', size === 'sm' ? 'px-2 py-0.5' : 'px-2.5 py-0.5', TONE_TEXT_CLASS[meta.tone]),
        className
      )}
      {...rest}
    >
      <span aria-hidden="true">{meta.glyph}</span>
      <span>{meta.label}</span>
    </span>
  );
});
