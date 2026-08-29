import * as React from 'react';
import type { GlassIntensity } from '../theme/glass';
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
export declare const GlassPanel: React.ForwardRefExoticComponent<GlassPanelProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=GlassPanel.d.ts.map