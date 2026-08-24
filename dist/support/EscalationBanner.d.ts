import * as React from 'react';
/** Severity of the escalation. `critical` maps to danger, `warning` to warn. */
export type EscalationLevel = 'info' | 'warning' | 'critical';
export interface EscalationBannerProps extends React.HTMLAttributes<HTMLDivElement> {
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
    /** Show the escalate button as busy (disabled — the web `Button` has no spinner). */
    escalating?: boolean;
}
/**
 * A prominent escalation banner for at-risk / breached tickets. Severity is
 * shown by a leading glyph, a role word ("Warning"/"Critical") **and** a
 * semantic left-border tone — never color alone — mapping `critical`→danger,
 * `warning`→warn, `info`→primary. Exposes an "Escalate" primary action
 * (`onEscalate`; disabled while `escalating`) and an "Acknowledge" secondary
 * (`onAcknowledge`). All colors come from token classes; no literal hex.
 */
export declare const EscalationBanner: React.ForwardRefExoticComponent<EscalationBannerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=EscalationBanner.d.ts.map