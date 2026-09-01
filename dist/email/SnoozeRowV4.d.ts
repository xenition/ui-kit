import * as React from 'react';
import type { SnoozeRowProps } from './SnoozeRow';
export interface SnoozeRowV4Props extends SnoozeRowProps {
}
/**
 * **V4 snooze row** — the same props as {@link SnoozeRow}, and no new ones. The
 * defects here were all in what it drew and what it said.
 *
 * ## Four changes
 *
 * 1. **A hovered preset stops looking like the chosen one.** Selected was
 *    `bg-primary-50` and hover was `bg-neutral-100` — two ramp steps of nearly
 *    the same lightness on a light page, and both near-white on a dark one. In
 *    a picker of five presets the pointer marked whichever row it was passing
 *    over as the answer. Selected is now the `selected` container and hover is
 *    the M3 state layer over it, so they are a step apart by construction.
 * 2. **The check mark is decorative.** It carried `aria-label="Selected"`, so a
 *    reader landed on the row, heard the whole preset, then landed again on a
 *    lone word "Selected" — a second stop saying what `aria-pressed` already
 *    said. Native had it hidden; only web spoke it.
 * 3. **The row clears 44.** `py-md` on a `base` line comes close, but it was
 *    coincidence rather than a floor, and a dense seed lost it.
 * 4. **The ink is the contrast-corrected slot**, and on the selected ground it
 *    is that ground's guaranteed pair — `primary` and `muted` are fills and
 *    neither was measured against the wash the row was painting behind them.
 */
export declare const SnoozeRowV4: React.ForwardRefExoticComponent<SnoozeRowV4Props & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=SnoozeRowV4.d.ts.map