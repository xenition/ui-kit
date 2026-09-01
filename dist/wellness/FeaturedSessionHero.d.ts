import * as React from 'react';
export interface FeaturedSessionHeroProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /** Small uppercase kicker above the title (e.g. `'Today'` or a category). */
    eyebrow?: string;
    /** The session title — the headline of the hero. */
    title: string;
    /** A supporting line below the title. */
    subtitle?: string;
    /** Session length in minutes; shown as a frosted chip when set. */
    durationMin?: number;
    /** Large, faint decorative glyph in the top-right. Default `'🌅'`. */
    coverGlyph?: string;
    /** Fires when the play button is tapped. */
    onPlay?: () => void;
    className?: string;
}
/**
 * FeaturedSessionHero (web parity) — the home-screen centerpiece: a soft
 * primary-hue gradient ground carrying the featured session, a near-white play
 * button (`bg-on-primary` with a `text-primary` ▶), and a frosted
 * `bg-primary-500` duration chip. A large faint glyph sits behind the copy for
 * warmth. Near-white ink (`text-on-primary` / `text-primary-100`) and the
 * gradient both derive from the brand ramp — token-only colors. The single
 * vivid surface at the top of the screen.
 */
export declare const FeaturedSessionHero: React.ForwardRefExoticComponent<FeaturedSessionHeroProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=FeaturedSessionHero.d.ts.map