import * as React from 'react';
export type WelcomeScreenVariant = 'centered' | 'bottomSheet';
export interface WelcomeScreenProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Product/brand name shown as the hero headline. */
    title: string;
    /** Supporting value line under the title. */
    subtitle?: string;
    /** Optional emoji/glyph for the brand medallion. */
    logoGlyph?: string;
    /**
     * Artwork for the hero slot (onboarding spec §3) — an `<img>`, an inline SVG,
     * a Lottie, whatever the app ships. The kit ships no artwork and must not, so
     * when this is omitted the {@link logoGlyph} medallion is promoted to hero
     * size instead: an empty hero slot still looks composed, never like a hole.
     */
    illustration?: React.ReactNode;
    /** Primary CTA copy. Default `'Get started'`. */
    primaryLabel?: string;
    /** Fires on the primary CTA. */
    onGetStarted?: () => void;
    /** Secondary link copy (e.g. `'I already have an account'`). */
    secondaryLabel?: string;
    /** Fires on the secondary link. Hidden when omitted. */
    onSecondary?: () => void;
    /**
     * Back affordance in the header (spec §1). Omit on the first screen of a
     * flow — there is nothing to go back to and a dead chevron is worse than no
     * chevron.
     */
    onBack?: () => void;
    /**
     * Dismiss affordance in the header (spec §1). Omit in a mandatory flow the
     * user is not allowed to escape.
     */
    onDismiss?: () => void;
    /**
     * Total steps in the surrounding flow. When set, the header carries the
     * segmented progress bars (spec §2). Omit for a standalone welcome.
     */
    stepCount?: number;
    /** Zero-based position within {@link stepCount}. Default `0`. */
    stepIndex?: number;
    /** Show a spinner on the primary CTA while an async step runs. */
    loading?: boolean;
    /** `'bottomSheet'` left-aligns for a sheet presentation. Default `'centered'`. */
    variant?: WelcomeScreenVariant;
}
/**
 * First-launch welcome — the screen that establishes the onboarding shell.
 *
 * What shipped before was three things stacked in the middle of a grey page: a
 * medallion, a headline, a button. No hero, no header, no footer, no rhythm.
 * This is the anatomy from §1 of the onboarding spec, top to bottom:
 *
 * 1. **header** — back · segmented progress · dismiss, each optional, each a
 *    44×44 tap target;
 * 2. **hero slot** — the caller's `illustration`, or the `logoGlyph` medallion
 *    at hero size, on a tinted 4:3 panel capped at 38% of the viewport;
 * 3. **headline block** — centred, `2xl` bold over a muted value line held to a
 *    readable measure;
 * 4. **sticky footer** — the 56-tall fully-rounded {@link GetStartedButton}
 *    with a trailing arrow, and any secondary action BELOW it as a centred
 *    muted link, never beside it competing for the same weight.
 *
 * Every part is optional and the screen composes without any of them: no
 * illustration, no subtitle, no header controls, no secondary action. The
 * `bottomSheet` variant left-aligns the headline block for a sheet
 * presentation — the one place §4 allows it. Every color traces to a token.
 * No literal colors.
 */
export declare const WelcomeScreen: React.ForwardRefExoticComponent<WelcomeScreenProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=WelcomeScreen.d.ts.map