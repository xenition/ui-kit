import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Severity of the escalation. `critical` maps to danger, `warning` to warn. */
export type EscalationLevel = 'info' | 'warning' | 'critical';
export interface EscalationBannerProps {
    /** Severity level (default `warning`). */
    level?: EscalationLevel;
    /** Headline (e.g. "SLA breach imminent"). */
    title: string;
    /** Optional supporting line. */
    message?: string;
    /** Fires when the primary "Escalate" button is pressed. */
    onEscalate?: () => void;
    /** Fires when the secondary "Acknowledge"/dismiss button is pressed. */
    onAcknowledge?: () => void;
    /** Primary button label (default "Escalate"). */
    escalateLabel?: string;
    /** Secondary button label (default "Acknowledge"). */
    acknowledgeLabel?: string;
    /** Show a busy spinner on the escalate button. */
    escalating?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * A prominent escalation banner for at-risk / breached tickets. Severity is
 * shown by a leading glyph, a role word ("Warning"/"Critical") **and** a
 * semantic tint — never color alone — mapping `critical`→danger, `warning`→warn,
 * `info`→primary. Exposes an "Escalate" primary action (`onEscalate`, with an
 * optional busy spinner) and an "Acknowledge" secondary (`onAcknowledge`). All
 * colors come from `SemanticColors` + token tints; no literal hex.
 */
export declare function EscalationBanner({ level, title, message, onEscalate, onAcknowledge, escalateLabel, acknowledgeLabel, escalating, style, }: EscalationBannerProps): React.ReactElement;
//# sourceMappingURL=EscalationBanner.d.ts.map