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
 * on a single click of a button that sat exactly where "Save" sits on every
 * other form in the kit. §25 asks for friction proportional to risk, and this
 * is the highest-risk button in either module — so the submit is wrapped in
 * `PopconfirmV4`, the kit's existing confirmation affordance, rather than a new
 * one invented here. Popconfirm already gets the parts that are easy to get
 * wrong right: it clones the trigger instead of wrapping it (so a disabled
 * submit stays disabled), it focuses **Cancel** by default, and the destructive
 * button is the only coloured thing in the bubble.
 *
 * A single tap now opens the bubble and submits nothing.
 *
 * ## Everything else
 *
 * 1. **The reasons are an option list, not a radio list.** Same treatment as
 *    `ShippingOptionV4`, for the same HIG rule: a persistent `selected`
 *    highlight plus a trailing checkmark. The 18px hand-drawn dot and its
 *    `border-2` go, and so does `h-2 w-2` — both literals brief §1 names. Each
 *    reason is still a real `role="radio"` inside a `role="radiogroup"`.
 * 2. **The rows are the family's rows**, on the 56 metric with `md` gutters,
 *    so a list of reasons is a list rather than a stack of outlined chips.
 * 3. **The details field is `InputV4`** — the 48/`radius.md` metric — and its
 *    requirement is a **sentence** when it is unmet, not a red outline
 *    (Addendum item 2, the same exception `MakeOfferFormV4` takes).
 * 4. **Both twins degrade to `EmptyStateV4`.** The web base composed the
 *    commerce `EmptyState`; the native base rendered a bare grey line of text.
 *    That is the parity defect this pass keeps finding, and it is closed here.
 * 5. **The panel is a card on `card`** (rule 4), not `surface`.
 */
export declare const ReportListingV4: React.ForwardRefExoticComponent<ReportListingV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ReportListingV4.d.ts.map