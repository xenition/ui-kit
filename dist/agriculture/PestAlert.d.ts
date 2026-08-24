import * as React from 'react';
/** Pressure / threat level — colors the alert and is stated as a text chip. */
export type PestSeverity = 'low' | 'moderate' | 'high' | 'critical';
export interface PestAlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
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
    /** Fires when the action button is activated. */
    onAction?: () => void;
}
/**
 * A pest / disease alert — a token-tinted, accent-barred callout with a bug
 * glyph, the pest name, affected crop/field, an optional recommendation +
 * detection time, and an optional action {@link Button}. Severity drives the
 * accent color, but the text {@link Badge} states it too, so the alert never
 * relies on color alone. Announced via `role="alert"`. The tint and left edge
 * come from token classes (`bg-neutral-50` + `border-<tone>`) — no literal
 * colors.
 */
export declare const PestAlert: React.ForwardRefExoticComponent<PestAlertProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PestAlert.d.ts.map