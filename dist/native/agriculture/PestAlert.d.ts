import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Pressure / threat level — colors the alert and is stated as a text chip. */
export type PestSeverity = 'low' | 'moderate' | 'high' | 'critical';
export interface PestAlertProps {
    /** Pest / disease name (e.g. "Aphid infestation"). */
    pest: string;
    /** Threat level. Default `'moderate'` — colors banner + text chip. */
    severity?: PestSeverity;
    /** Affected crop or field (e.g. "Tomatoes · Greenhouse 2"). */
    affected?: string;
    /** Recommended action / note. */
    recommendation?: string;
    /** Detection hint (e.g. "Detected 2h ago"). */
    detectedAt?: string;
    /** Leading glyph/emoji. Default `'🐛'`. */
    icon?: string;
    /** Label for the primary action button; omit to hide it. */
    actionLabel?: string;
    /** Fires when the action button is pressed. */
    onAction?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A pest / disease alert — a tinted, accent-barred callout with a bug glyph, the
 * pest name, affected crop/field, an optional recommendation + detection time,
 * and an optional action {@link Button}. Severity drives the color, but the text
 * {@link Badge} states it too, so the alert never relies on color alone.
 * Announced via `accessibilityRole="alert"`. The tint is a token-derived
 * `withAlpha` of the severity slot — no literal colors.
 */
export declare function PestAlert({ pest, severity, affected, recommendation, detectedAt, icon, actionLabel, onAction, style, }: PestAlertProps): React.ReactElement;
//# sourceMappingURL=PestAlert.d.ts.map