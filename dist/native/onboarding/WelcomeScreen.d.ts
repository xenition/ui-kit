import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type WelcomeScreenVariant = 'centered' | 'bottomSheet';
export interface WelcomeScreenProps {
    /** Product/brand name shown as the hero headline. */
    title: string;
    /** Supporting value line under the title. */
    subtitle?: string;
    /** Optional emoji/glyph for the brand medallion. */
    logoGlyph?: string;
    /** Primary CTA copy. Default `'Get started'`. */
    primaryLabel?: string;
    /** Fires on the primary CTA. */
    onGetStarted?: () => void;
    /** Secondary link copy (e.g. `'I already have an account'`). */
    secondaryLabel?: string;
    /** Fires on the secondary link. Hidden when omitted. */
    onSecondary?: () => void;
    /** Show a spinner on the primary CTA while an async step runs. */
    loading?: boolean;
    /** `'bottomSheet'` left-aligns for a sheet presentation. Default `'centered'`. */
    variant?: WelcomeScreenVariant;
    style?: StyleProp<ViewStyle>;
}
/**
 * First-launch welcome — a brand medallion, headline, one value line and the
 * primary {@link GetStartedButton}, with an optional "already have an account"
 * secondary link (design.md §42). The `bottomSheet` variant left-aligns for use
 * inside a sheet. Every color/spacing traces to a token. No literal colors.
 */
export declare function WelcomeScreen({ title, subtitle, logoGlyph, primaryLabel, onGetStarted, secondaryLabel, onSecondary, loading, variant, style, }: WelcomeScreenProps): React.ReactElement;
//# sourceMappingURL=WelcomeScreen.d.ts.map