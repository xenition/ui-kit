import * as React from 'react';
import type { PermitStatusProps } from './PermitStatus';
export interface PermitStatusV4Props extends PermitStatusProps {
    /** Why the permit was refused. Rendered and announced when the status is adverse. */
    reason?: string;
    /** Override the status word — `'Under review'`, `'Denied'`. */
    statusLabel?: string;
    /** Build the position sentence. Default `` `${label}, step ${step} of ${total}` ``. */
    formatStep?: (label: string, step: number, total: number) => string;
    /** What the permit number is called. Default `'Permit'`. */
    referenceLabel?: string;
}
/**
 * **V4 permit tracker** — the web twin of the native `PermitStatusV4`, same
 * props as {@link PermitStatus} plus `reason`, `statusLabel`, `formatStep` and
 * `referenceLabel`.
 *
 * ## Five changes
 *
 * 1. **The status always renders.** `<PermitStatus status="review" title="…" />`
 *    produced a card in which the words "Under review" appeared **nowhere in
 *    the DOM** — the only place they could surface was gated on `updatedDate`,
 *    an optional prop. An applicant heard the whole happy path, "1 Submitted 2
 *    Under review 3 Approved 4 Issued", with no indication which stage was
 *    theirs. `statusSentence()` renders the stage as a sentence whether or not
 *    a date was passed.
 * 2. **The tracker is `StepsV4`.** The base `Steps` conveyed position entirely
 *    by colour: the active marker and a pending one both draw a bare digit and
 *    differ only by `border-primary text-primary` against `border-border
 *    text-muted`. The V4 primitive already emits `aria-current="step"` and
 *    draws the walked rail as one continuous line, so a red-green deficient
 *    reader can see where they are.
 * 3. **A denial says why, and announces.** The base hard-coded the consolation
 *    "Review the notice and re-apply or appeal" and had no field for what the
 *    notice actually said. `reason` fills that, and the sentence reaches an
 *    assertive live region **one commit after mount** — a live region announces
 *    *changes*, so `role="alert"` on content present at first paint, which is
 *    what the base had, is silent in the ordinary case.
 * 4. **The permit number is labelled** — a reader heard "BLD-2026-0417" with no
 *    idea what it identified — and the denial headline takes the
 *    contrast-corrected `danger-text` ink rather than the `danger` **fill**
 *    drawn as words on a 12% tint of itself.
 * 5. **The dead `denied ? 1` branch is gone.** A denied permit renders the
 *    banner, never the tracker, so that index could not reach `Steps`; and the
 *    loading state draws the tracker's own shape instead of a grey slab off the
 *    neutral ramp, which mirrors under `[data-theme="dark"]`.
 */
export declare const PermitStatusV4: React.ForwardRefExoticComponent<PermitStatusV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PermitStatusV4.d.ts.map