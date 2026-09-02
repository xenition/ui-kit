import * as React from 'react';
import { type ClaimStage } from './internal/tone-v4';
import type { ClaimStatusTrackerProps } from './ClaimStatusTracker';
export type { ClaimStage };
export interface ClaimStatusTrackerV4Props extends ClaimStatusTrackerProps {
    /**
     * Why the claim was denied.
     *
     * The base had no field for this and **invented** one; see change 1. Nothing
     * is drawn when it is omitted, because a banner with no reason is better than
     * a banner with the wrong one.
     */
    denialReason?: string;
    /** Override the four stage words. */
    stageLabels?: Partial<Record<ClaimStage, string>>;
    /** Heading on the denial notice. Default `'Claim denied'`. */
    deniedLabel?: string;
}
/**
 * **V4 claim status tracker** — same props as {@link ClaimStatusTracker} plus
 * `denialReason`, `stageLabels` and `deniedLabel`.
 *
 * ## Four changes
 *
 * 1. **The component stops inventing a denial reason.** The base hard-coded
 *    *"Reviewed after filing. Contact your agent to appeal."* as the body of
 *    the denial banner, and its props carried only `status` and `updated`. So a
 *    claim denied because the damage predates policy inception — or because the
 *    vehicle was not on the policy, or because the deductible exceeded the
 *    loss — rendered that same sentence, in the insurer's own voice, asserting
 *    a reason the caller never supplied and had no way to correct. The reason
 *    is a prop. Nothing is printed when there is not one.
 * 2. **The stages are readable.** The base rendered the `Steps` primitive,
 *    which has **no accessibility at all** — no `accessib*` prop anywhere in
 *    the native primitive, and on the web twin no `aria-current="step"`. An
 *    active step and a future step were both an outlined circle with the same
 *    numeral inside it, which is a difference no reader and no colour-blind
 *    user can see. The rail is drawn here instead: each stage carries a
 *    distinct mark (`✓` done, `●` current, `○` still to come), and the tracker
 *    reports its own position as a `progressbar` with the current stage's word
 *    as its value text, rather than relying on a primitive that cannot say it.
 * 3. **A denial is a state, drawn like one.** The banner hand-mixed
 *    `withAlpha(colors.danger, 0.1)` — a translucent wash that is a different
 *    colour on a card than on the page — and inked its heading with
 *    `colors.danger`, a fill slot with no contrast promise as text. It paints
 *    an opaque composite and uses `dangerText` now.
 * 4. **The copy is props.** Four stage names and a heading were hard-coded
 *    English in a component whose whole job is to tell somebody what happened
 *    to their claim.
 */
export declare function ClaimStatusTrackerV4({ status, updated, denialReason, stageLabels, deniedLabel, style, }: ClaimStatusTrackerV4Props): React.ReactElement;
//# sourceMappingURL=ClaimStatusTrackerV4.d.ts.map