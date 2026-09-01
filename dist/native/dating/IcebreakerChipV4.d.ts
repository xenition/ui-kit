import * as React from 'react';
import type { IcebreakerChipProps } from './IcebreakerChip';
export type { IcebreakerChipProps as IcebreakerChipV4Props };
/**
 * **V4 icebreaker chip** — the same props as {@link IcebreakerChip}, nothing
 * added.
 *
 * ## Four changes
 *
 * 1. **The chip is big enough to hit.** `sm` measured about 22px tall and `md`
 *    about 30 — and `ProfileCard` renders *every* interest chip at `sm`, so an
 *    entire profile's worth of tappable chips sat under half the minimum
 *    target. Both sizes now clear 44 through `minTap`, with the padding still
 *    doing the visual work.
 * 2. **`solid` is solid.** The base drew `solid` as a 20% tint and `soft` as a
 *    12% tint — two washes four points apart, which is not a difference a
 *    person can see, and neither of them is what "solid" means. `solid` now
 *    fills `primary` and inks it `onPrimary`; `soft` is the tint, opaque.
 * 3. **Brand ink on a tint is the corrected slot.** A `soft` chip drew its
 *    label in `colors.primary` — the fill token — over a 12% wash of itself.
 *    That is the lowest-contrast pairing in the palette. It is `primaryText`
 *    now, which is the slot the compiler measured for exactly this.
 * 4. **Selection is a mark, not a colour.** The base expressed `selected`
 *    purely as a background flip; it now carries a check glyph as well, so it
 *    survives greyscale and CVD (§ "nothing is carried by colour alone").
 *    Press is a state layer over the chip's own ground rather than `opacity`,
 *    and disabled is M3's 0.38 rather than the base's 0.5.
 */
export declare function IcebreakerChipV4({ label, value, selected, disabled, variant, size, glyph, onPress, style, }: IcebreakerChipProps): React.ReactElement;
//# sourceMappingURL=IcebreakerChipV4.d.ts.map