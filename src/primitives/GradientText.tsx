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
 * All colour-bearing declarations live in this injected sheet and reference
 * `--xen-*` variables exclusively; the inline style carries only the angle.
 *
 * Every stop is a compiler-guaranteed **text** slot, never a pale ramp step. `--xen-primary-text` is `primary` walked in lightness until it
 * clears AA on `surface` — the same correction `gradientInk` applies, done once
 * by the compiler and emitted as a variable, which is the only way a web
 * component can carry that guarantee without printing a hex value into an
 * inline style.
 *
 * The single-ramp recipes need a second stop in the same hue family, and a
 * deep RAMP step will not do: measured on a teal seed, `primary-800` reads at
 * 3.81:1 on the dark page it lands on. So they run from the text slot toward
 * `--xen-on-surface` instead — the page's own ink, itself AA by construction.
 * Both ends are far from the surface on the same side, so everything between
 * them is too.
 */
const GRADIENT_TEXT_CSS = `
[data-xen-gradient-text] {
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
[data-xen-gradient-text="primary"] {
  background-image: linear-gradient(var(--xen-gradient-text-angle, 92deg), var(--xen-primary-text) 0%, color-mix(in srgb, var(--xen-primary-text) 55%, var(--xen-on-surface)) 100%);
}
[data-xen-gradient-text="accent"] {
  background-image: linear-gradient(var(--xen-gradient-text-angle, 92deg), var(--xen-accent-text) 0%, color-mix(in srgb, var(--xen-accent-text) 55%, var(--xen-on-surface)) 100%);
}
[data-xen-gradient-text="primary-accent"] {
  background-image: linear-gradient(var(--xen-gradient-text-angle, 92deg), var(--xen-primary-text) 0%, var(--xen-accent-text) 100%);
}
[data-xen-gradient-text="accent-primary"] {
  background-image: linear-gradient(var(--xen-gradient-text-angle, 92deg), var(--xen-accent-text) 0%, var(--xen-primary-text) 100%);
}
`;

/**
 * Ramp-driven clipped gradient text — the highlighted word inside a headline.
 *
 * This component predates the `gradient.brand` token, and it showed. Its stops
 * were hand-picked ramp steps starting at `300` — a pale tint of the brand,
 * used as **text**, on a light page. Nothing had measured it, and nothing
 * could: `300` is two steps from the surface, so the default recipe was an
 * unreadable headline word in every light-mode app that used it.
 *
 * The sweep is now the brand pair the compiler already owns — primary into
 * accent, the same two hues as `gradient.brand` — taken in the **contrast-safe
 * text form** of each. `--xen-primary-text` is `primary` walked in lightness
 * until it clears AA on `surface`, which is precisely the correction
 * `gradientInk` performs; doing it in the compiler rather than in the component
 * is what keeps this file free of hex, which the marketing token-purity sweep
 * requires. Single-ramp recipes fade that text slot toward `on-surface`, so
 * both of their stops are compiler-guaranteed against the page too.
 *
 * Purely token-coloured, so it restyles from the theme seed alone and reads on
 * light and dark surfaces. No motion, so nothing to reduce.
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
