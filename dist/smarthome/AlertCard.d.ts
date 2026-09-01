import * as React from 'react';
/** Severity of a home alert — drives the accent, glyph + announced label. */
export type AlertSeverity = 'info' | 'warning' | 'critical';
export interface AlertCardProps {
    /** Alert severity — `info`→primary, `warning`→warn, `critical`→danger. */
    severity: AlertSeverity;
    /** Headline of the alert (e.g. "Front door left open"). */
    title: string;
    /** Optional supporting detail line(s). */
    message?: string;
    /** Optional relative/absolute time, shown muted (e.g. "2m ago"). */
    time?: string;
    /** Optional device or zone the alert came from (e.g. "Front Door"). */
    deviceName?: string;
    /** Override the severity's default glyph/emoji. */
    icon?: string;
    /** When set, renders a dismiss (✕) control that fires this. */
    onDismiss?: () => void;
    /** When set, renders a primary "view" action that fires this. */
    onView?: () => void;
    /** Label for the `onView` action. Defaults to `'View'`. */
    viewLabel?: string;
    className?: string;
    style?: React.CSSProperties;
}
/**
 * AlertCard — **V4** "ambient" home alert. A calm notification card with a
 * **left severity-accent bar**, a severity glyph in a soft-tint disc, and a
 * soft (not saturated) severity-tinted background — `info`→primary,
 * `warning`→warn, `critical`→danger. Severity is spelled out as a word in the
 * accessible label so it never rides on color alone. Optional dismiss (✕) and
 * view actions are ≥44px targets. Exposed as `role="status"` (or `alert` when
 * critical). Presentational only; all colors from `--xen-*` token classes
 * (no literals), dark-mode safe.
 */
export declare const AlertCard: React.ForwardRefExoticComponent<AlertCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AlertCard.d.ts.map