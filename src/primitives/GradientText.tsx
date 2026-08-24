import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from './cn';

/** Token-ramp gradient recipes; every stop is a `--xen-*` variable. */
export type GradientTextRamp = 'primary' | 'accent' | 'primary-accent' | 'accent-primary';

export interface GradientTextProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Which theme ramp(s) feed the gradient. `primary-accent` (default) sweeps
   * from the primary ramp into the accent ramp — the classic "energy word".
   */
  ramp?: GradientTextRamp;
  /** Gradient angle in degrees (default 92 — a near-horizontal sweep). */
  angle?: number;
  /** Rendered element (default `span`, inline inside headings). */
  as?: 'span' | 'strong' | 'em' | 'b';
}

/**
 * All color-bearing declarations live in this injected sheet and reference
 * `--xen-*` ramp variables exclusively; the inline style carries only the
 * angle as a custom property. Restyles by theme seed alone.
 */
const GRADIENT_TEXT_CSS = `
[data-xen-gradient-text] {
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
[data-xen-gradient-text="primary"] {
  background-image: linear-gradient(var(--xen-gradient-text-angle, 92deg), var(--xen-primary-300) 0%, var(--xen-primary-400) 45%, var(--xen-primary-600) 100%);
}
[data-xen-gradient-text="accent"] {
  background-image: linear-gradient(var(--xen-gradient-text-angle, 92deg), var(--xen-accent-300) 0%, var(--xen-accent-400) 45%, var(--xen-accent-600) 100%);
}
[data-xen-gradient-text="primary-accent"] {
  background-image: linear-gradient(var(--xen-gradient-text-angle, 92deg), var(--xen-primary-300) 0%, var(--xen-primary-400) 38%, var(--xen-accent-400) 100%);
}
[data-xen-gradient-text="accent-primary"] {
  background-image: linear-gradient(var(--xen-gradient-text-angle, 92deg), var(--xen-accent-200) 0%, var(--xen-accent-400) 38%, var(--xen-primary-400) 100%);
}
`;

/**
 * Ramp-driven clipped gradient text — the highlighted word inside a headline.
 * Purely token-colored (the four recipes are fixed blends of the primary and
 * accent ramps), so it reads correctly over light and dark surfaces and
 * restyles from the theme seed alone. No motion, so nothing to reduce.
 *
 * ```tsx
 * <h1>Launch <GradientText>faster</GradientText></h1>
 * ```
 */
export const GradientText = React.forwardRef<HTMLElement, GradientTextProps>(
  function GradientText(
    { ramp = 'primary-accent', angle = 92, as: Tag = 'span', className, style, children, ...rest },
    ref
  ) {
    injectStyleOnce('xen-gradient-text-styles', GRADIENT_TEXT_CSS);
    return (
      <Tag
        ref={ref as React.Ref<never>}
        data-xen-gradient-text={ramp}
        className={cn('inline-block', className)}
        style={{ ['--xen-gradient-text-angle' as string]: `${angle}deg`, ...style }}
        {...rest}
      >
        {children}
      </Tag>
    );
  }
);
