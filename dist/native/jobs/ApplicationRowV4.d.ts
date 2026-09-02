import * as React from 'react';
import type { ApplicationRowProps } from './ApplicationRow';
export interface ApplicationRowV4Props extends ApplicationRowProps {
    /**
     * Why the application ended. Drawn and announced when
     * `application.rejected` is set.
     */
    rejectionReason?: string;
    /** Re-word the applied age. Default `'2d ago'`. */
    formatRelative?: (iso: string) => string;
    /** The last row in a list — drops the separator that would hang off the end. */
    last?: boolean;
}
/**
 * **V4 application row** — same props as {@link ApplicationRow} plus
 * `rejectionReason`, `formatRelative` and `last`.
 *
 * ## Five changes
 *
 * 1. **The stage is announced.** This is the module's headline defect in one
 *    component: `<ApplicationRow application={{stage:'interview'}} />` said
 *    the job title and stopped. The pipeline drew the stage into a `View` that
 *    was never `accessible`, and the row's own `Pressable` flattened it
 *    anyway, so where the application stands — the only reason anyone opens
 *    this list — was silent. The stage is now part of the row's name, and the
 *    pipeline beneath it is hidden from the reader so the fact is stated once.
 * 2. **A rejection can say why.** `Application.rejected` is a bare boolean
 *    with no reason and no stage-of-rejection, so the row could report the
 *    worst outcome in the funnel and offer nothing else. `rejectionReason` is
 *    drawn under the pipeline and joined into the name — an adverse outcome is
 *    the one state in this module that owes the reader an explanation.
 * 3. **The `accessory` is a sibling.** Anything a caller passes — a chevron, a
 *    withdraw button — sat inside the row's activation and was flattened into
 *    it, so a real control there was unreachable. The row container is a plain
 *    `View` now and the accessory sits beside the activation.
 * 4. **`muted` stopped inking text.** Three captions here were drawn in
 *    `muted`, a ramp step with no contrast promise; they take `mutedText`.
 * 5. **Press is a state layer**, not `opacity: 0.9` — M3 reserves fading for
 *    disabled, and the base's press made a tapped row read as a dead one.
 *
 * **Renders nothing without a job title** (§4.5).
 */
export declare function ApplicationRowV4({ application, onPress, accessory, rejectionReason, formatRelative, last, style, }: ApplicationRowV4Props): React.ReactElement | null;
//# sourceMappingURL=ApplicationRowV4.d.ts.map