import * as React from 'react';
import type { ColorPickerProps, ColorSwatch } from './ColorPicker';
export type { ColorPickerProps as ColorPickerV4Props, ColorSwatch };
/**
 * **V4 swatch picker** — the same props as {@link ColorPicker}, a different
 * design line.
 *
 * ## Two problems, both about the selected chip
 *
 * 1. **The tick had no contrast guarantee.** The base draws a ✓ in
 *    `colors.onPrimary` on top of the chosen swatch — but the swatch is an
 *    arbitrary colour supplied by the caller, and `onPrimary` promises AA
 *    against `primary` and against nothing else. Pick a pale swatch and the
 *    tick is invisible; pick the brand and it happens to work. A mark whose
 *    legibility depends on which colour you chose is not a selection state.
 *
 *    So the selection is a **ring around the chip**, not a mark on top of it.
 *    A ring never lands on the swatch, so its contrast is against the page —
 *    known, and the same for every swatch. It is also a shape cue rather than
 *    only a colour one, which is what §46 asks for.
 *
 * 2. **The chip was too small to hit.** 36px in a wrapping grid, where the
 *    neighbouring target is a different colour. Every swatch here is
 *    `tapTarget()` — `spacing['2xl']`, 48px — with the coloured chip drawn
 *    smaller inside it, so the thing you can hit is comfortably larger than the
 *    thing you are aiming at.
 *
 * ## Two rings, deliberately
 *
 * The chip always carries a `colors.border` hairline, so a swatch the same
 * colour as the page (there is one in the default palette: `surface`) still has
 * an edge. The selection ring is a second, thicker ring outside it, and its
 * space is **always reserved** — transparent when unselected — so choosing a
 * colour never reflows the grid (§36.11).
 *
 * No depth at all. A swatch grid is a set of colours; a shadow on each one
 * would be one more thing competing with the only thing the control is about.
 */
export declare function ColorPickerV4({ value, onChange, swatches, disabled, accessibilityLabel, style, }: ColorPickerProps): React.ReactElement;
//# sourceMappingURL=ColorPickerV4.d.ts.map