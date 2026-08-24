import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Visual treatment of a {@link MatchingGiftBanner}. */
export type MatchingGiftVariant = 'solid' | 'soft' | 'outline';
export interface MatchingGiftBannerProps {
    /** Sponsor doing the matching, e.g. `Acme Foundation`. */
    matcherName: string;
    /** Match multiplier, e.g. `2` renders `2×`. */
    multiplier?: number;
    /** Amount matched so far, integer **cents** (enables a progress bar with cap). */
    matchedCents?: number;
    /** Total match pool / cap, integer **cents**. */
    capCents?: number;
    /** ISO 4217 currency (default `USD`). */
    currency?: string;
    /** Pre-formatted deadline label, e.g. `Ends Sep 30`. */
    deadlineLabel?: string;
    /** CTA label (default `Give now`). Button renders only when `onAction` is set. */
    actionLabel?: string;
    /** Fires when the CTA is pressed. */
    onAction?: () => void;
    /** Visual treatment (default `soft`). */
    variant?: MatchingGiftVariant;
    style?: StyleProp<ViewStyle>;
}
/**
 * A promotional banner announcing a gift-matching offer: sponsor, multiplier,
 * an optional matched/cap progress bar (integer cents → `formatMoney`, cap
 * divide-by-zero guarded), a deadline, and an optional CTA. `variant` chooses a
 * solid accent fill, a soft tint (`withAlpha`), or an outline. Progress is shown
 * as a bar plus a printed cap figure — not color alone. All colors come from the
 * compiled theme tokens — no literal colors.
 */
export declare function MatchingGiftBanner({ matcherName, multiplier, matchedCents, capCents, currency, deadlineLabel, actionLabel, onAction, variant, style, }: MatchingGiftBannerProps): React.ReactElement;
//# sourceMappingURL=MatchingGiftBanner.d.ts.map