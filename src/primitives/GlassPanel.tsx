import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { composeGlassCss } from '../theme/glass';
import type { GlassIntensity } from '../theme/glass';
import { cn } from './cn';

export type { GlassIntensity };

export interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * How much of the ground shows through.
   *
   * `soft` is the theme's own `--xen-glass-tint`, untouched — the most
   * translucent this theme's contrast budget allows. `regular` (default) and
   * `strong` mix that tint toward the opaque `--xen-surface`. The scale only
   * travels one way; see the note on legibility below.
   */
  intensity?: GlassIntensity;
  /** Draw the translucent token border (default true). */
  bordered?: boolean;
}

/**
 * The glass recipe, bound to the compiled `glass` tokens rather than to a
 * hand-picked percentage of `surface`.
 *
 * `--xen-glass-tint` is emitted per scheme, so the panel is frosted-white in
 * light and smoked-charcoal in dark with no configuration — and, more to the
 * point, it is the SAME value the native twin paints, because both platforms
 * compose it through `theme/glass.ts`. The percentages below are the CSS
 * mirror of `composeGlass`: `color-mix` blends in premultiplied alpha, and the
 * native helper does that same sum by hand.
 *
 * `--xen-glass-blur` carries the compiler's blur radius, which the web can
 * actually spend — `backdrop-filter` exists here even though it does not on
 * native. That is the one place the twins legitimately diverge: web gets a real
 * blur, native gets the pre-composited tint that makes the blur unnecessary.
 */
const GLASS_CSS = `
[data-xen-glass] {
  -webkit-backdrop-filter: blur(var(--xen-glass-blur));
  backdrop-filter: blur(var(--xen-glass-blur));
}
[data-xen-glass="soft"] { background-color: ${composeGlassCss('soft')}; }
[data-xen-glass="regular"] { background-color: ${composeGlassCss('regular')}; }
[data-xen-glass="strong"] { background-color: ${composeGlassCss('strong')}; }
[data-xen-glass][data-bordered="true"] { border: 1px solid var(--xen-glass-border); }
`;

/**
 * Translucent panel — the "glass card" treatment, on tokens.
 *
 * ## Legibility
 *
 * A panel over unknown artwork is where text quietly stops being readable, so
 * the alpha is not a taste knob. `theme/glass-legibility.spec.ts` composites
 * the tint over pure black and pure white — the extremes any real image sits
 * between — and measures `on-surface` against the result. The compiler's tint
 * clears WCAG AA with roughly 5.6:1 at worst, and loses that margin once it is
 * thinned by 12%. `intensity` therefore starts at the token and can only get
 * more opaque.
 *
 * The corollary: put `text-on-surface` on a glass panel, not `text-muted`.
 * `muted` carries no contrast promise even on an opaque surface and measurably
 * fails on glass.
 *
 * ## §8
 *
 * `design.md` bans "glassmorphism without purpose". This is the purpose-built
 * exception, not a default background — compose it under `ProductMock`, over
 * `AuroraBackground`, or as a floating chrome bar, where something is genuinely
 * layered over something else. The V4 surfaces reach for it only when the seed
 * asks for `depth: 'glass'`.
 */
export const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(function GlassPanel(
  { intensity = 'regular', bordered = true, className, children, ...rest },
  ref
) {
  injectStyleOnce('xen-glass-styles', GLASS_CSS);
  return (
    <div
      ref={ref}
      data-xen-glass={intensity}
      data-bordered={bordered ? 'true' : 'false'}
      className={cn('rounded-lg', className)}
      {...rest}
    >
      {children}
    </div>
  );
});
