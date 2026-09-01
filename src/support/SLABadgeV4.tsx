import * as React from 'react';
import { cn } from '../primitives/cn';
import type { SLABadgeProps, SLAState } from './SLABadge';

/** Drop-in for {@link SLABadgeProps} — same props, the V4 "calm console" design. */
export type SLABadgeV4Props = SLABadgeProps;

interface StateSpec {
  glyph: string;
  label: string;
  /** Soft-tint pill classes (bg + text) — state is never color-only. */
  pill: string;
}

// breached → danger, at-risk → warn, on-track → success. Each also carries a
// distinct glyph so the state reads without color (a11y / colorblind).
const STATE: Record<SLAState, StateSpec> = {
  'on-track': { glyph: '●', label: 'On track', pill: 'bg-success/10 text-success' },
  'at-risk': { glyph: '▲', label: 'At risk', pill: 'bg-warn/10 text-warn' },
  breached: { glyph: '■', label: 'Breached', pill: 'bg-danger/10 text-danger' },
};

const SIZE: Record<NonNullable<SLABadgeProps['size']>, { pad: string; text: string; hint: string }> = {
  sm: { pad: 'gap-1.5 px-2 py-0.5', text: 'text-xs', hint: 'text-sm' },
  md: { pad: 'gap-1.5 px-2.5 py-1', text: 'text-sm', hint: 'text-base' },
};

/**
 * SLABadge — **V4** "calm console" design (drop-in for {@link SLABadgeProps}). An
 * SLA status badge rendered as a soft-tint pill (`bg-<slot>/10 text-<slot>`)
 * carrying a glyph + state label and, when supplied, a big legible remaining-time
 * `hint` set in `tabular-nums`. Encodes `on-track` → success, `at-risk` → warn,
 * `breached` → danger with a distinct glyph **and** color, so the state reads
 * without relying on color (colorblind-safe / screen-reader announced). Same
 * props/behavior as the base; colors only from `--xen-*` token classes (no
 * literal hex). Presentational.
 */
export const SLABadgeV4 = React.forwardRef<HTMLSpanElement, SLABadgeV4Props>(function SLABadgeV4(
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
      className={cn('inline-flex items-center rounded-full font-semibold', sz.pad, sz.text, spec.pill, className)}
      {...rest}
    >
      <span aria-hidden="true">{spec.glyph}</span>
      <span>{text}</span>
      {hint ? (
        <span aria-hidden="true" className={cn('font-bold leading-none tabular-nums', sz.hint)}>
          {hint}
        </span>
      ) : null}
    </span>
  );
});
