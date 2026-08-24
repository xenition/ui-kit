import * as React from 'react';
import { cn } from '../primitives/cn';

/** The three SLA health states. */
export type SLAState = 'on-track' | 'at-risk' | 'breached';
export type SLABadgeSize = 'sm' | 'md';

export interface SLABadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** SLA health. Drives glyph + label + tone — never color alone. */
  state: SLAState;
  /**
   * Optional right-hand hint (e.g. a remaining-time string like `"2h left"`
   * or `"12m over"`). Rendered after the state label.
   */
  hint?: string;
  /** Size scale (default `md`). */
  size?: SLABadgeSize;
  /** Override the visible state label (defaults to a humanized state). */
  label?: string;
}

interface StateSpec {
  glyph: string;
  label: string;
  /** Token utility classes — semantic border + text, never a literal color. */
  cls: string;
}

// breached → danger, at-risk → warn, on-track → success. Each also carries a
// distinct glyph so the state reads without color (a11y / colorblind).
const STATE: Record<SLAState, StateSpec> = {
  'on-track': { glyph: '●', label: 'On track', cls: 'border-success text-success' },
  'at-risk': { glyph: '▲', label: 'At risk', cls: 'border-warn text-warn' },
  breached: { glyph: '■', label: 'Breached', cls: 'border-danger text-danger' },
};

const SIZE: Record<SLABadgeSize, string> = {
  sm: 'gap-1 px-2 py-px text-xs',
  md: 'gap-1 px-2.5 py-0.5 text-sm',
};

/**
 * SLA health pill for a helpdesk ticket. Encodes `on-track` / `at-risk` /
 * `breached` with a semantic tone **and** a distinct glyph + text label, so the
 * state is legible without relying on color (colorblind-safe / screen-reader
 * announced). Colors come only from the `--xen-*` token classes
 * (`text-success`/`text-warn`/`text-danger`) — no literal hex. Presentational.
 */
export const SLABadge = React.forwardRef<HTMLSpanElement, SLABadgeProps>(function SLABadge(
  { state, hint, size = 'md', label, className, ...rest },
  ref
) {
  const spec = STATE[state] ?? STATE['on-track'];
  const sz = SIZE[size] ?? SIZE.md;
  const text = label ?? spec.label;
  const a11y = hint ? `SLA ${text}, ${hint}` : `SLA ${text}`;

  return (
    <span
      ref={ref}
      role="img"
      aria-label={a11y}
      className={cn(
        'inline-flex items-center rounded-full border font-semibold',
        sz,
        spec.cls,
        className
      )}
      {...rest}
    >
      <span aria-hidden="true">{spec.glyph}</span>
      <span>{text}</span>
      {hint ? (
        <span aria-hidden="true" className="font-normal text-muted">
          {hint}
        </span>
      ) : null}
    </span>
  );
});
