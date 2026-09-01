import * as React from 'react';
import type { PermitStatusProps } from './PermitStatus';
export interface PermitStatusV4Props extends PermitStatusProps {
    /** Why the permit was refused. Rendered and announced when the status is adverse. */
    reason?: string;
    /** Override the status word (`'Under review'`, `'Denied'`, …). */
    statusLabel?: string;
    /** Build the position sentence. Default `` `${label}, step ${step} of ${total}` ``. */
    formatStep?: (label: string, step: number, total: number) => string;
    /** What the permit number identifies. Default `'Permit'`. */
    referenceLabel?: string;
}
/**
 * **V4 permit tracker** — same props as {@link PermitStatus} plus `reason`,
 * `statusLabel`, `formatStep` and `referenceLabel`.
 *
 * ## Five changes
 *
 * 1. **The status always renders.** `<PermitStatus status="review" title="…" />`
 *    produced a card in which the words "Under review" appeared **nowhere**:
 *    the only human-readable status line was gated on `updatedDate`, an
 *    optional prop. `statusSentence()` renders it whether or not a date was
 *    passed, and carries the position with it — "Under review, step 2 of 4".
 * 2. **The tracker says which step is yours.** The base `Steps` conveyed
 *    position entirely by colour: the active marker and a pending one both
 *    render a bare digit and differ only by border and text colour, with no
 *    `accessibilityState` anywhere. `StepsV4` already announces "Step 2 of 4,
 *    current" and draws the completed run as a filled rail, so a red-green
 *    deficient reader and a blind one both get the answer.
 * 3. **A denial says why, and announces.** The banner carried a fixed
 *    consolation sentence with no way to say what the notice said, under
 *    `accessibilityRole="alert"` — which on React Native sets no announcement
 *    behaviour at all without `accessibilityLiveRegion`. It is one assertive
 *    live region now, naming the status and the `reason` together.
 * 4. **The permit number is labelled.** A reader heard "BLD-2026-0417" with no
 *    idea what it identified; it is `referenceLabel` + the number now, and the
 *    denial headline takes the contrast-corrected ink rather than the `danger`
 *    fill drawn as text on a tint of itself.
 * 5. **The dead branch is gone.** `denied ? 1 : …` picked a step for a status
 *    that never reaches `Steps`, and the loading block is the shared opaque
 *    skeleton rather than a translucent wash of a ramp step.
 */
export declare function PermitStatusV4({ status, permitNumber, title, updatedDate, loading, reason, statusLabel, formatStep, referenceLabel, style, }: PermitStatusV4Props): React.ReactElement;
//# sourceMappingURL=PermitStatusV4.d.ts.map