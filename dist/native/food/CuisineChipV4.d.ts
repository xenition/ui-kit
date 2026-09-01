import * as React from 'react';
import type { CuisineChipProps } from './CuisineChip';
export interface CuisineChipV4Props extends CuisineChipProps {
    /**
     * Whether the chip starts selected when `selected` is not given. Default
     * `false` — where the base always sat, and could never leave.
     */
    defaultSelected?: boolean;
}
/**
 * **V4 cuisine chip** — same props as {@link CuisineChip} plus
 * `defaultSelected`.
 *
 * ## Four changes
 *
 * 1. **It works uncontrolled.** A toggle with no internal state and a
 *    `selected` default of `false` is a filter that can never be applied:
 *    dropped in as `<CuisineChip label="Thai" onPress={…} />` it stayed
 *    unselected however many times it was tapped. `defaultSelected` gives the
 *    state somewhere to live; passing `selected` still drives it from outside.
 * 2. **The chip clears 44.** It was 24–30 tall depending on `size`, which is a
 *    filter rail that is hard to hit and easy to hit wrongly.
 * 3. **It is a toggle button, and both twins say so.** The base announced
 *    `accessibilityState.selected` while its own doc called the chip
 *    "radio-like" and the web twin used `aria-pressed`. It is a toggle: one
 *    chip's state says nothing about its neighbours'. `selected` is the native
 *    spelling of `aria-pressed`, and the doc no longer claims otherwise.
 * 4. **Disabled means the handler does not fire**, at M3's 0.38 band rather
 *    than a hand-picked 0.5 — and press is a state layer, so a pressed chip
 *    stops reading as an unavailable one.
 *
 * **Renders nothing without a `label`.**
 */
export declare function CuisineChipV4({ label, glyph, selected, defaultSelected, onPress, disabled, size, style, }: CuisineChipV4Props): React.ReactElement | null;
//# sourceMappingURL=CuisineChipV4.d.ts.map