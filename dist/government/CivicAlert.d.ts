import * as React from 'react';
/** Severity of a civic / emergency alert — drives glyph, label, and token slot. */
export type AlertSeverity = 'info' | 'advisory' | 'warning' | 'emergency';
export interface CivicAlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /** Alert severity — drives the glyph, label, and token color slot. */
    severity: AlertSeverity;
    /** Alert headline. */
    title: string;
    /** Body / detail message. */
    message?: string;
    /** Issuing agency / source. */
    source?: string;
    /** Localized issued time (already formatted). */
    time?: string;
    /** Label for the primary action (shown only with `onAction`). */
    actionLabel?: string;
    /** Fires the primary action (e.g. "View details", "Get directions"). */
    onAction?: () => void;
    /** Fires dismiss; a dismiss control is shown only when supplied. */
    onDismiss?: () => void;
}
/**
 * An emergency / civic alert banner. Severity is conveyed by **glyph + label +
 * a token color slot** (info → primary, warning → warn, emergency → danger) —
 * never color alone; the severity label is always rendered as text. Uses
 * `role="alert"` so screen readers announce it. Optional primary and dismiss
 * actions are real `<button>`s. Token-bound throughout — no literal colors. Web
 * parity of the native `CivicAlert`.
 */
export declare const CivicAlert: React.ForwardRefExoticComponent<CivicAlertProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CivicAlert.d.ts.map