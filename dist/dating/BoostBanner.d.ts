import * as React from 'react';
export type BoostVariant = 'boost' | 'superboost' | 'premium';
export interface BoostBannerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'title'> {
    /** Which upsell. Drives glyph + accent slot. Defaults to `boost`. */
    variant?: BoostVariant;
    /** Headline. Sensible default per variant. */
    title?: string;
    /** Supporting line. */
    subtitle?: string;
    /** CTA button label. Defaults per variant. */
    ctaLabel?: string;
    /** Fires the CTA (and card click). */
    onClick?: () => void;
    /** Live countdown text (e.g. "Boost active · 22m left"). Switches to active styling. */
    activeLabel?: string;
    /** Dismiss handler; renders a close affordance when provided. */
    onDismiss?: () => void;
}
/**
 * Upsell banner for boosts / premium — the web parity of the native boost banner.
 * Presents a glyph, headline, subtitle, and a CTA, switching to an "active"
 * treatment when an `activeLabel` (countdown) is supplied. The whole card is a
 * keyboard-operable `role="button"` container and the nested CTA/dismiss are real
 * `<button>`s that stop propagation. Token classes only; state is conveyed by
 * text, not color alone.
 */
export declare const BoostBanner: React.ForwardRefExoticComponent<BoostBannerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=BoostBanner.d.ts.map