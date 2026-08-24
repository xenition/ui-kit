import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Severity of a civic / emergency alert — drives glyph, label, and token slot. */
export type AlertSeverity = 'info' | 'advisory' | 'warning' | 'emergency';
export interface CivicAlertProps {
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
    style?: StyleProp<ViewStyle>;
}
/**
 * An emergency / civic alert banner. Severity is conveyed by **glyph + label +
 * a token color slot** (info → primary, warning → warn, emergency → danger) —
 * never color alone; the severity label is always rendered as text. Uses the RN
 * `alert` accessibility role so screen readers announce it. Optional primary and
 * dismiss actions. Every color traces to a `SemanticColors` slot or a
 * token-derived tint — no literals.
 */
export declare function CivicAlert({ severity, title, message, source, time, actionLabel, onAction, onDismiss, style, }: CivicAlertProps): React.ReactElement;
//# sourceMappingURL=CivicAlert.d.ts.map