import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface FeaturedSessionHeroProps {
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
    style?: StyleProp<ViewStyle>;
}
/**
 * FeaturedSessionHero — the home-screen centerpiece: a soft primary-hue gradient
 * ground carrying the featured session, a near-white play button, and a frosted
 * duration chip. A large faint glyph sits behind the copy for warmth. Near-white
 * ink and the gradient both derive from the brand ramp — no literal colors, so it
 * restyles from the seed in light and dark. This is the single vivid surface at
 * the top of the screen; everything else stays calm around it.
 */
export declare function FeaturedSessionHero({ eyebrow, title, subtitle, durationMin, coverGlyph, onPlay, style, }: FeaturedSessionHeroProps): React.ReactElement;
//# sourceMappingURL=FeaturedSessionHero.d.ts.map