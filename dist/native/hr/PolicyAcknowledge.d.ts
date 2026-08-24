import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type PolicyStatus } from './internal';
export type PolicyAcknowledgeVariant = 'default' | 'compact';
export interface PolicyAcknowledgeProps {
    /** Policy title (e.g. "Code of Conduct"). */
    title: string;
    /** Version / revision label (e.g. "v3.1"). */
    version?: string;
    /** Pre-formatted effective date. */
    effectiveDate?: string;
    /** Short summary of what's being acknowledged. */
    summary?: string;
    /** Acknowledgement status — glyph + word pill. */
    status?: PolicyStatus;
    /** Whether the user has acknowledged (controls the checkbox + action). */
    acknowledged?: boolean;
    /** Pre-formatted acknowledgement date (shown once acknowledged). */
    acknowledgedDate?: string;
    /** Consent line next to the checkbox. */
    consentLabel?: string;
    /** Density. */
    variant?: PolicyAcknowledgeVariant;
    /** Fires with the next checked value when the consent box is toggled. */
    onToggle?: (checked: boolean) => void;
    /** Fires when the acknowledge button is pressed. */
    onAcknowledge?: () => void;
    testID?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * A policy-acknowledgement card: title, version, effective date and a summary,
 * with a consent checkbox and an acknowledge action. Status is a glyph + word
 * pill (acknowledged → success, overdue → danger, never color alone). Once
 * acknowledged the control collapses to a confirmation line with the date. The
 * acknowledge button stays disabled until consent is checked. `compact` drops
 * the summary. All colors are theme tokens — no literals.
 */
export declare function PolicyAcknowledge({ title, version, effectiveDate, summary, status, acknowledged, acknowledgedDate, consentLabel, variant, onToggle, onAcknowledge, testID, style, }: PolicyAcknowledgeProps): React.ReactElement;
//# sourceMappingURL=PolicyAcknowledge.d.ts.map