import * as React from 'react';
import type { ReportListingProps, ReportReason } from './ReportListing';
export type { ReportReason };
export interface ReportListingV4Props extends ReportListingProps {
    /**
     * What the confirmation step asks. Default names the consequence and the one
     * thing a reporter is usually afraid of.
     *
     * §26 asks that a destructive consequence be *legible*: "Are you sure?" is
     * not legible, it is a speed bump. The default says what happens and what
     * does not.
     */
    confirmMessage?: string;
    /** The confirm button's label inside the bubble. Default `'Report'`. */
    confirmLabel?: string;
}
/**
 * **V4 report-a-listing form** — the one component in Group D where `danger`
 * is spent honestly, and the one that grows a step it did not have.
 *
 * ## The confirmation step
 *
 * Reporting is **outward-facing and hard to reverse**: it names another person
 * to a moderator, and nothing in the product un-names them. The base fired it
 * on a single tap of a button that sat exactly where "Save" sits on every other
 * form in the kit. §25 asks for friction proportional to risk, and this is the
 * highest-risk tap in either module — so the submit is wrapped in
 * `PopconfirmV4`, the kit's existing confirmation affordance, rather than a new
 * one invented here. Popconfirm already gets the parts that are easy to get
 * wrong right: it clones the trigger instead of nesting a second `Pressable`
 * under it (which on native would eat the responder and make the whole thing a
 * silent no-op), the destructive button is the only coloured thing in the
 * bubble, and the scrim is the shadow colour rather than `onSurface`, which
 * inverts.
 *
 * A single tap now opens the sheet and submits nothing.
 *
 * ## Everything else
 *
 * 1. **The reasons are an option list, not a radio list.** Same treatment as
 *    `ShippingOptionV4`, for the same HIG rule: a persistent `selected`
 *    highlight plus a trailing checkmark. The 18pt hand-drawn dot, its
 *    `borderWidth: 2` and the `withAlpha(primary, 0.08)` tint all go.
 *    `accessibilityRole="radio"` and the `selected` state stay.
 * 2. **The rows are the family's rows**, on the 56 metric with `md` gutters,
 *    so a list of reasons is a list rather than a stack of outlined chips.
 * 3. **The details field is `InputV4`** — the 48/`radius.md` metric — and its
 *    requirement is a **sentence** when it is unmet, not a red outline
 *    (Addendum item 2, the same exception `MakeOfferFormV4` takes).
 * 4. **Both twins degrade to `EmptyStateV4`.** This twin rendered a bare grey
 *    line of text where the web one composed an empty state — the parity defect
 *    this pass keeps finding, closed here.
 * 5. **The panel is a card on `card`** (rule 4), not `surface`.
 */
export declare function ReportListingV4({ reasons, title, submitLabel, loading, onSubmit, onCancel, confirmMessage, confirmLabel, style, }: ReportListingV4Props): React.ReactElement;
//# sourceMappingURL=ReportListingV4.d.ts.map