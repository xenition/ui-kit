import * as React from 'react';
import type { RoutineRowProps } from './RoutineRow';
export interface RoutineRowV4Props extends RoutineRowProps {
    /**
     * Open the step — its detail, its photo, its history.
     *
     * Deliberately **separate from** `onToggle`. See change 1.
     */
    onClick?: () => void;
    /** The word a finished step carries. Default `'done'`. */
    doneLabel?: string;
    /** The word an unfinished step carries. Default `'not done'`. */
    notDoneLabel?: string;
}
/**
 * **V4 routine row** — same props as {@link RoutineRow} plus `onClick`,
 * `doneLabel` and `notDoneLabel`.
 *
 * ## Six changes
 *
 * 1. **A routine step can be opened.** The base made the *entire row* one
 *    `<button role="checkbox">`, so ticking the box and opening the step were
 *    the same gesture and the second one could not exist — there was nowhere
 *    to put a photo of the finished bed, a note, or a history. The toggle is
 *    now a real checkbox at the trailing end and the activation is its
 *    sibling, each with its own name, exactly as `NextStepRowV4` splits the
 *    same pair.
 * 2. **`{...rest}` is spread first.** It was spread after `onClick` — and on
 *    this component it was also cast twice through `unknown` to get a
 *    `div`'s attributes onto a `<button>`, which silently smuggled a
 *    `div`-typed handler onto a button element.
 * 3. **The non-interactive row's name reached nobody.** With no `onToggle` the
 *    base put `aria-label` on a bare `div`, which browsers ignore, so a
 *    read-only routine announced nothing at all. The state word is now real
 *    text in the accessibility tree.
 * 4. **No dead checkbox.** With no `onToggle` the base still drew an
 *    apparently-tappable circle that did nothing; without a handler the row
 *    draws a static mark instead.
 * 5. **A ticked step fills `primary`, not `success`.** Ticking a step is a
 *    *selection*; `success` has to keep meaning that something went well, and
 *    in a module that draws children it must not become the colour of
 *    compliance.
 * 6. **Targets, press and disabled.** The checkbox was a 24px circle in a
 *    module built for children and is now 44; press is the M3 state layer
 *    rather than `hover:bg-neutral-50`, a light-scheme ramp step that paints a
 *    near-white slab on a dark page; disabled is M3's 0.38 band rather than
 *    `opacity-50`, a round number.
 */
export declare const RoutineRowV4: React.ForwardRefExoticComponent<RoutineRowV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RoutineRowV4.d.ts.map