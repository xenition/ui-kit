import * as React from 'react';
import type { PolicyAcknowledgeProps } from './PolicyAcknowledge';
export interface PolicyAcknowledgeV4Props extends PolicyAcknowledgeProps {
    /**
     * When the acknowledgement is due, pre-formatted.
     *
     * `overdue` is the adverse member of this union and the card had no field
     * saying *when* it went overdue, so "⚠ Overdue" was a red word with no
     * deadline attached to it.
     */
    dueDate?: string;
    /**
     * Whether the policy has been acknowledged — now genuinely controlled.
     *
     * The prop existed, but the consent tick beside it lived in the card's own
     * `useState`, so a caller that rejected the acknowledgement server-side and
     * flipped this back to `false` was left looking at a ticked box it had no
     * way to clear. The tick follows this prop.
     */
    acknowledged?: boolean;
    /** Copy on the acknowledge action. Default `'Acknowledge'`. */
    acknowledgeLabel?: string;
    /** Build the effective-date line. Default `` `Effective ${date}` ``. */
    formatEffective?: (date: string) => string;
    /** Build the due line. Default `` `Due ${date}` ``. */
    formatDue?: (date: string) => string;
    /** Test hook. Every native `hr` component had one; no web one did. */
    testID?: string;
}
/**
 * **V4 policy acknowledgement** — the web twin of the native
 * `PolicyAcknowledgeV4`, same props as {@link PolicyAcknowledge} plus
 * `dueDate`, a controlled `acknowledged`, `acknowledgeLabel`,
 * `formatEffective`, `formatDue` and `testID`.
 *
 * ## Five changes
 *
 * 1. **A server-side rejection can clear the tick.** Consent was uncontrolled
 *    `useState`. A caller that posted the acknowledgement, had it refused, and
 *    set `acknowledged={false}` again could not un-tick the box the employee
 *    was looking at — so the card said the policy had been agreed to and the
 *    record said it had not. The tick now follows the prop.
 * 2. **The consent checkbox is a 44 target.** It was a bare 16px `<input>` on
 *    the one control that turns a policy into a signed record.
 * 3. **The consent line is named once.** `aria-label={consentLabel}` on the
 *    input *and* the same sentence as the `<label>`'s visible text meant a
 *    reader was handed the sentence twice. The label names the input; the
 *    input carries no second name.
 * 4. **An overdue policy says when it was due.** See `dueDate`.
 * 5. **The status words are inked with ink slots.** "✓ Acknowledged" was drawn
 *    in `text-success` — a **fill** token, guaranteed readable only *under*
 *    `on-success`, not as text.
 */
export declare const PolicyAcknowledgeV4: React.ForwardRefExoticComponent<PolicyAcknowledgeV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PolicyAcknowledgeV4.d.ts.map