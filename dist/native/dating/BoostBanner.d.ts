import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type BoostVariant = 'boost' | 'superboost' | 'premium';
export interface BoostBannerProps {
    /** Which upsell. Drives glyph + accent slot. Defaults to `boost`. */
    variant?: BoostVariant;
    /** Headline. Sensible default per variant. */
    title?: string;
    /** Supporting line. */
    subtitle?: string;
    /** CTA button label. Defaults per variant. */
    ctaLabel?: string;
    /** Fires the CTA (and card tap). */
    onPress?: () => void;
    /** Live countdown text (e.g. "Boost active · 22m left"). Switches to active styling. */
    activeLabel?: string;
    /** Dismiss handler; renders a close affordance when provided. */
    onDismiss?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * Upsell banner for boosts / premium — the native boost banner. Presents a
 * glyph, headline, subtitle, and a CTA, switching to an "active" treatment when
 * an `activeLabel` (countdown) is supplied. The whole card is tappable and the
 * CTA repeats the action for clarity. Colors are token-derived via `withAlpha`
 * tints — no literal colors; state is conveyed by text, not color alone.
 */
export declare function BoostBanner({ variant, title, subtitle, ctaLabel, onPress, activeLabel, onDismiss, style, }: BoostBannerProps): React.ReactElement;
//# sourceMappingURL=BoostBanner.d.ts.map