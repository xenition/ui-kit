import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type TrialBannerTone = 'info' | 'warn' | 'success';
export interface TrialBannerProps {
    /** Headline (e.g. `'7 days of Pro, on us'`). */
    title: string;
    /** Optional supporting line (e.g. `'No charge until Aug 30'`). */
    subtitle?: string;
    /** Days remaining — when set, renders a `'N days left'` chip. */
    daysLeft?: number;
    /** Tone → accent/warn/success surface. Default `'info'`. */
    tone?: TrialBannerTone;
    /** Inline action copy (e.g. `'Manage'`). Hidden without `onActionPress`. */
    actionLabel?: string;
    /** Fires on the inline action. */
    onActionPress?: () => void;
    /** Leading glyph. Default `'✨'`. */
    icon?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Free-trial status strip — a tinted banner that advertises an active or
 * available trial and, optionally, a countdown chip and an inline action. Sits
 * atop the paywall (value-first framing, design.md §27) or in-app once a trial
 * is running. Tone maps to the accent/warn/success token pairs. No literal
 * colors.
 *
 * **There is deliberately no `TrialBannerV2`/`V3`.** A strip this small has one
 * correct shape, so the base component *is* its whole design line — which is
 * why a V2 or V3 paywall composing this base banner is correct rather than a
 * cross-line leak. `design-line-composition.native.spec.tsx` documents the same
 * conclusion from the other side.
 */
export declare function TrialBanner({ title, subtitle, daysLeft, tone, actionLabel, onActionPress, icon, style, }: TrialBannerProps): React.ReactElement;
//# sourceMappingURL=TrialBanner.d.ts.map