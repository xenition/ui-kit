import * as React from 'react';
export interface SurveyCompleteProps extends React.HTMLAttributes<HTMLDivElement> {
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
}
/**
 * SurveyComplete — the survey's peak-end **celebration hero** (V4 "focus" line).
 * A full two-hue celebratory gradient ground (`bg-gradient-to-br from-accent-400
 * to-primary-600`) carries near-white ink (`text-primary-50` / `text-primary-100`):
 * a big emoji/check mark, the headline, an optional thank-you message, and an
 * optional highlight stat as a frosted glass tile (`bg-primary-50/15 border
 * border-primary-50/30`). Big ≥44px CTAs sit in the thumb zone — a near-white
 * primary pill and an optional ghost secondary. Presentational only (shaped data
 * + callbacks). All colors from `--xen-*` token classes + gradient utilities (no
 * literal colors), dark-mode safe.
 */
export declare const SurveyComplete: React.ForwardRefExoticComponent<SurveyCompleteProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SurveyComplete.d.ts.map