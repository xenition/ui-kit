import * as React from 'react';
import type { PolicyAcknowledgeProps } from './PolicyAcknowledge';
export interface PolicyAcknowledgeV4Props extends PolicyAcknowledgeProps {
    /** When the acknowledgement is due, pre-formatted. */
    dueDate?: string;
    /** Name of the acknowledge action. Default `'Acknowledge'`. */
    acknowledgeLabel?: string;
    /** Build the effective-date line. Default `` `Effective ${date}` ``. */
    formatEffective?: (date: string) => string;
    /** Build the due line. Default `` `Due ${date}` ``. */
    formatDue?: (date: string) => string;
}
/**
 * **V4 policy acknowledgement** — same props as {@link PolicyAcknowledge} plus
 * `dueDate`, `acknowledgeLabel`, `formatEffective` and `formatDue`, and with
 * `acknowledged` finally honoured as a controlled input.
 *
 * ## Five changes
 *
 * 1. **A rejected acknowledgement can be cleared.** Consent lived in an
 *    uncontrolled `useState` that nothing outside the component could reach, so
 *    a caller whose server refused the acknowledgement — a stale version, a
 *    signature that failed to record — had no way to untick the box. The user
 *    saw a ticked consent and a policy that was still outstanding. Passing
 *    `acknowledged={false}` now clears the tick.
 * 2. **An overdue policy says when it was due.** `overdue` was one of six
 *    adverse statuses in the module with nowhere to say why, and for this one
 *    the reason is a date the component was never given.
 * 3. **The consent box is a target.** A 20pt checkbox with no wrapper is under
 *    half the 44pt floor, and it is the control that gates the whole card.
 * 4. **The confirmation line is inked with ink.** `colors.success` is a
 *    **fill** slot used as a text colour — measured as low as 1.32:1 in the
 *    audit that produced the `*Text` tokens.
 * 5. **The copy is props.** "Acknowledge", "Effective" and the "Due" line were
 *    hard-coded English on a legal consent, and the card now announces the
 *    whole thing — title, version, effective date, due date and status —
 *    instead of leaving five loose text nodes for the reader to assemble.
 *
 * The acknowledge button is `variant="primary"` on both twins, which is what
 * the native base rendered by default and what the web base asked for by name.
 *
 * **Renders nothing without a `title`.**
 */
export declare function PolicyAcknowledgeV4({ title, version, effectiveDate, summary, status, acknowledged, acknowledgedDate, consentLabel, variant, dueDate, acknowledgeLabel, formatEffective, formatDue, onToggle, onAcknowledge, testID, style, }: PolicyAcknowledgeV4Props): React.ReactElement | null;
//# sourceMappingURL=PolicyAcknowledgeV4.d.ts.map