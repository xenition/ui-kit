import * as React from 'react';
import type { ApplyButtonProps } from './ApplyButton';
export interface ApplyButtonV4Props extends ApplyButtonProps {
    /** Copy for the `apply` state. Default `'Apply'`. */
    applyLabel?: string;
    /** Copy for the `applied` state. Default `'Applied'`. */
    appliedLabel?: string;
    /** Copy for the `withdrawn` state. Default `'Re-apply'`. */
    reapplyLabel?: string;
}
/**
 * **V4 apply button** — same props as {@link ApplyButton} plus `applyLabel`,
 * `appliedLabel` and `reapplyLabel`.
 *
 * ## Three changes
 *
 * 1. **A double tap no longer submits twice.** The base wired `onApply`
 *    straight to the press, and an application is not an idempotent request —
 *    two taps on a slow connection is two applications to the same job, which
 *    a recruiter sees and the applicant cannot undo. The button latches on the
 *    first press and releases when the caller moves `state` or flips
 *    `loading`, which is exactly the moment the submission has been
 *    acknowledged. A caller that does neither gets a one-shot button, which is
 *    the correct behaviour for a submit.
 * 2. **Busy is not disabled.** `ButtonV4` treats `loading` as `disabled` — it
 *    dims to M3's 0.38 disabled band **and** reports `accessibilityState`
 *    `disabled: true`, which on both platforms drops focus and tells the
 *    reader the control is unavailable rather than working. So V4 does not
 *    hand `loading` down: while busy the button keeps its full ink, keeps its
 *    place in the focus order, shows a spinner beside its own label, announces
 *    `busy`, and swallows presses itself. `disabled` still means disabled and
 *    still dims. The two states now look and sound different, which is the
 *    whole point of having both.
 * 3. **Every label is a prop, and the tick is not one of them.** The base
 *    hard-coded "Apply", "Applied ✓" and "Re-apply" with no override, in the
 *    one component in the module a localised app cannot avoid rendering. The
 *    applied state's tick is drawn as decoration beside the label and kept out
 *    of the name (see {@link APPLIED_TICK}), so `appliedLabel` is a word a
 *    translator can translate.
 *
 * The accessible name still names the state, so what the press will do is
 * never carried by the variant's colour alone — and it is composed from the
 * same three props on both twins, so the two announce identically.
 */
export declare function ApplyButtonV4({ state, onApply, onWithdraw, loading, disabled, size, block, applyLabel, appliedLabel, reapplyLabel, style, }: ApplyButtonV4Props): React.ReactElement;
//# sourceMappingURL=ApplyButtonV4.d.ts.map