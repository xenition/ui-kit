import * as React from 'react';
import { type HealthRange, type RangeVerdict } from './goal-v4';
import type { VitalStatProps } from './VitalStat';
import { type Appearance } from './internal/tone-v4';
export interface VitalStatV4Props extends VitalStatProps {
    /** The reading's normal band. Given one, tone and a word follow the verdict. */
    range?: HealthRange;
    /** Override the three verdict words. */
    rangeLabels?: Partial<Record<RangeVerdict, string>>;
    /** Surface preset, matching the native twin. Default `'classic'`. */
    appearance?: Appearance;
}
/**
 * **V4 vital stat** — same props as {@link VitalStat} plus `range`,
 * `rangeLabels` and `appearance` (`label` and `unit` were already there).
 *
 * ## Five changes
 *
 * 1. **A resting 58 bpm and a dangerous 190 bpm rendered identically.** The
 *    tone was fixed by `variant` — `heart-rate` was permanently `danger`,
 *    `temperature` permanently `warn` — so the status vocabulary was spent on
 *    *identity* and had nothing left to say about the reading. The glyph now
 *    carries the identity; pass a `range` and `success`/`warn`/`danger` mean
 *    what they say, with a word beside them so nothing rests on colour. With no
 *    `range` the tile behaves exactly as it did.
 * 2. **The delta reached sighted users only.** The card computed it, coloured
 *    it and drew it — and then left it out of the accessible name, which, once
 *    the tile was a `role="button"`, *replaced* its contents. The one number
 *    that says whether the reading is moving was silently dropped.
 * 3. **The activation is a real `<button>` and clears 44.** `div` +
 *    `role="button"` + `tabIndex` + a hand-written Enter/Space handler is three
 *    approximations of a button, and it sat inside a tile with no minimum
 *    height.
 * 4. **Press is a state layer.** `hover:opacity-80` dims the tile's own
 *    content, which is M3's *disabled* signal.
 * 5. **The value is inked with the corrected slot**, not the fill token — the
 *    largest number on the tile was drawn in `var(--xen-danger)`, measured as
 *    low as 1.32:1 against the card.
 */
export declare const VitalStatV4: React.ForwardRefExoticComponent<VitalStatV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=VitalStatV4.d.ts.map