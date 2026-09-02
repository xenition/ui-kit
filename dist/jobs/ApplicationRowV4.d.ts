import * as React from 'react';
import type { ApplicationRowProps } from './ApplicationRow';
export interface ApplicationRowV4Props extends ApplicationRowProps {
    /**
     * Why the application was rejected.
     *
     * `Application.rejected` is a bare boolean with no reason and no
     * stage-of-rejection, so an applicant saw "✕ Rejected" and nothing else.
     * Rendered whenever `application.rejected` is set.
     */
    rejectionReason?: string;
    /** Render the applied age. Default `'3d ago'`, floored. */
    formatRelative?: (iso: string) => string;
    /** The last row in a list — drops the separator that would hang off the end. */
    last?: boolean;
}
/**
 * **V4 application row** — same props as {@link ApplicationRow} plus
 * `rejectionReason`, `formatRelative` and `last`.
 *
 * ## Six changes
 *
 * 1. **The stage is announced.** This is the module's headline defect and this
 *    row is where it costs the most: the row's whole purpose is to say where
 *    an application sits, and it said it nowhere. The stage arrived through a
 *    `StatusPipeline variant="compact"`, whose only accessible name hung off
 *    `role="text"` — not an ARIA role, a WebKit extension that Chrome and
 *    Firefox drop along with the `aria-label` — and the row's own label sat on
 *    a bare `<div>`, which ARIA forbids naming. So
 *    `<ApplicationRow application={{stage:'interview'}} />` announced neither
 *    the title nor the stage. One real `<button>` now carries title, company,
 *    applied age, stage and rejection as a single sentence.
 * 2. **An unknown stage is no longer reported as stage 1.** The base's
 *    `Math.max(0, indexOf(stage))` announced "Stage 1 of 5: Applied" for a
 *    withdrawn application — the most confident possible statement of the
 *    wrong thing.
 * 3. **A rejection can say why.** See `rejectionReason`.
 * 4. **The `accessory` slot is a sibling of the activation, not a child of
 *    it.** Whatever an app puts there — a chevron, a withdraw button, a menu —
 *    was nested inside `role="button"`, which makes it invalid ARIA and, if it
 *    was interactive, loses its keyboard activation to the row's own handler.
 * 5. **The applied age stops rounding up.** 25 days ago read "1mo ago"; 90
 *    minutes read "2h ago".
 * 6. **It joins the shared row family**, so an application row and a
 *    conversation row are one height with one state layer and one separator,
 *    instead of `border-b` plus `hover:opacity-95` — which fades the row's own
 *    content, the signal M3 spends on *disabled*.
 */
export declare const ApplicationRowV4: React.ForwardRefExoticComponent<ApplicationRowV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ApplicationRowV4.d.ts.map