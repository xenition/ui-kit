import * as React from 'react';
import type { ClaimStatusTrackerProps } from './ClaimStatusTracker';
/**
 * The happy-path stages of a claim, in order.
 *
 * Named rather than positional, because `stageLabels` has to be translatable
 * without the caller counting indexes — and because `denied` is not a stage,
 * it is what happens instead of one.
 */
export type ClaimStage = 'filed' | 'review' | 'approved' | 'paid';
export interface ClaimStatusTrackerV4Props extends ClaimStatusTrackerProps {
    /**
     * Why the claim was denied — the carrier's own sentence.
     *
     * The single most important prop in this module. See change 1.
     */
    denialReason?: string;
    /** Rename any stage. Defaults `'Filed'`, `'In review'`, `'Approved'`, `'Paid'`. */
    stageLabels?: Partial<Record<ClaimStage, string>>;
    /** The denial heading. Default `'Claim denied'`. */
    deniedLabel?: string;
}
/**
 * **V4 claim status tracker** — same props as {@link ClaimStatusTracker} plus
 * `denialReason`, `stageLabels` and `deniedLabel`.
 *
 * ## Four changes
 *
 * 1. **It no longer invents a denial reason.** The base hard-coded *"Reviewed
 *    after filing. Contact your agent to appeal."* as the body of the denial
 *    banner, and its props carried only `status` and `updated`. A claim denied
 *    because the damage predates policy inception, or because the vehicle was
 *    not on the policy, or because the deductible exceeds the loss, rendered
 *    that same sentence — the screen asserted a reason the caller never
 *    supplied and had no way to correct. The reason is now `denialReason`, and
 *    when the caller has none the banner says the claim was denied and stops,
 *    which is the truth.
 * 2. **The stages are real, ordered, announced positions.** The base delegated
 *    to the `Steps` primitive, which has no accessibility at all — no
 *    `aria-current="step"`, and an active step and a future step are both an
 *    outlined circle with the same numeral, so the only thing distinguishing
 *    "you are here" from "this has not happened" was a border colour. The
 *    tracker draws its own ordered list, marks the current stage with
 *    `aria-current="step"`, and gives every stage a word — Completed, Current
 *    stage, Not started — so the position survives greyscale, and survives a
 *    reader that ignores `aria-current`.
 * 3. **The denial is announced, once, as an alert.** It is the one genuinely
 *    urgent thing in the module: a decision the claimant has a deadline to
 *    appeal. The banner's heading is a real heading rather than a `<p>`, and
 *    the `aria-label` that used to replace the banner's contents — deleting
 *    the sentence under it — is gone.
 * 4. **Every stage word is a prop**, and the banner is a tinted ground mixed
 *    from the tone rather than `bg-danger/10` over `border-danger`, so it
 *    follows `[data-theme]` instead of being a pale plate on a dark page.
 */
export declare const ClaimStatusTrackerV4: React.ForwardRefExoticComponent<ClaimStatusTrackerV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ClaimStatusTrackerV4.d.ts.map