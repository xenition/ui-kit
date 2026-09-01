import * as React from 'react';
import type { LeadRowProps } from './LeadRow';
export interface LeadRowV4Props extends LeadRowProps {
    /** The unit in front of the score. Default `'Score'`. */
    scoreLabel?: string;
    /** How the score is spelled. Defaults to the whole number. */
    formatScore?: (score: number) => string;
}
/**
 * **V4 lead row** — the web twin of the native `LeadRowV4`, same props as
 * {@link LeadRow} plus `scoreLabel` and `formatScore`.
 *
 * ## Six changes
 *
 * 1. **The score badge stops being coloured by temperature.** It took its tone
 *    from `TEMPERATURE_META`, so a lead scored **5** rendered a `danger` badge
 *    purely because the lead was `hot` — the colour said nothing whatever about
 *    the number inside it, and it spent a status tone on an identity. The badge
 *    is neutral; temperature keeps its own glyph and its own word.
 * 2. **The score carries a unit.** `72` on its own is not a quantity of
 *    anything; the reader hears "Score 72".
 * 3. **`selected` is announced and drawn as more than a border colour.** A 1px
 *    accent edge is exactly the colour-alone signal the line forbids, and
 *    nothing reached assistive tech at all.
 * 4. **The row is a `button` only when it is interactive.** Native announced a
 *    plain row as a **disabled button**, because the role was unconditional and
 *    `disabled` was tied to the missing handler.
 * 5. **The temperature label fits.** "Warm" at 12px does not fit a 28px column
 *    and nothing truncated it, so it spilled. The column is the 44 target
 *    width and the label is allowed to sit in it.
 * 6. **One accessible name, money is tabular, and a press is a state layer.**
 */
export declare const LeadRowV4: React.ForwardRefExoticComponent<LeadRowV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LeadRowV4.d.ts.map