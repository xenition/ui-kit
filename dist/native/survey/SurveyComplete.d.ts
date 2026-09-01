import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface SurveyCompleteProps {
    /** Headline — the celebratory payoff. Default `'All done!'`. */
    title?: string;
    /** Optional supporting line under the title (a thank-you note). */
    message?: string;
    /** Big celebratory glyph over the title (an emoji or a check). Default `'🎉'`. */
    emoji?: string;
    /**
     * Optional single highlight stat rendered as a frosted glass tile
     * (e.g. `{ label: 'Completed in', value: '2:14' }`).
     */
    stat?: {
        label: string;
        value: string;
    };
    /** Primary CTA label. Default `'Done'`. */
    primaryLabel?: string;
    /** Fires on the primary CTA. The button is hidden when unset. */
    onPrimary?: () => void;
    /** Optional secondary CTA label (e.g. `'View results'`). */
    secondaryLabel?: string;
    /** Fires on the secondary CTA. The secondary button is hidden when unset. */
    onSecondary?: () => void;
    /** Container style override. */
    style?: StyleProp<ViewStyle>;
}
/**
 * SurveyComplete — the survey's peak-end **celebration hero** (V4 "focus" line).
 * A full two-hue celebratory gradient ground (`focusCelebrate`, accent→primary)
 * carries near-white ink (`focusInk` / `focusInkSoft`): a big emoji/check mark,
 * the headline, an optional thank-you message, and an optional highlight stat as
 * a frosted glass tile (`focusTile` / `focusBorder`). Big ≥44px CTAs sit in the
 * thumb zone — a near-white primary pill and an optional ghost secondary.
 * Presentational only (shaped data + callbacks). Token-only colors via
 * `useXenitionTheme()` + `focus*(tokens.ramps)` (no literals), dark-mode safe.
 */
export declare function SurveyComplete({ title, message, emoji, stat, primaryLabel, onPrimary, secondaryLabel, onSecondary, style, }: SurveyCompleteProps): React.ReactElement;
//# sourceMappingURL=SurveyComplete.d.ts.map