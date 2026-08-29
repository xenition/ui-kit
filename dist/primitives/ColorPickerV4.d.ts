import * as React from 'react';
import type { ColorPickerProps, ColorSwatch } from './ColorPicker';
export type { ColorPickerProps as ColorPickerV4Props, ColorSwatch };
/**
 * **V4 swatch picker** — the web twin of `ColorPickerV4`, the same props as
 * {@link ColorPicker}, a different design line.
 *
 * ## Two problems, both about the selected chip
 *
 * 1. **The selection had to stop being a mark on the colour.** The native base
 *    draws a ✓ in `on-primary` on top of the chosen swatch, and `on-primary`
 *    promises AA against `primary` and against nothing else — pick a pale
 *    swatch and the tick disappears. A mark whose legibility depends on which
 *    colour you chose is not a selection state.
 *
 *    So the selection is a **ring around the chip**, never a mark on it. A ring
 *    sits on the page, so its contrast is known and identical for every swatch,
 *    and it is a shape cue rather than only a colour one — what §46 asks for.
 * 2. **The chip was too small to hit.** `h-9 w-9` — 36px — in a wrapping grid
 *    where the neighbouring target is a different colour. Every swatch here is
 *    `--xen-space-2xl` (48px) with the coloured chip drawn smaller inside it,
 *    so the thing you can click is comfortably larger than the thing you are
 *    aiming at.
 *
 * ## Two rings, deliberately
 *
 * The chip always carries a `border` hairline, so a swatch the same colour as
 * the page still has an edge. The selection ring is a second, thicker ring
 * outside it, and its space is **always reserved** — transparent when
 * unselected — so choosing a colour never reflows the grid (§36.11).
 *
 * No depth at all. A swatch grid is a set of colours; a shadow on each one
 * would be one more thing competing with the only thing the control is about.
 */
export declare function ColorPickerV4({ value, onChange, swatches, disabled, accessibilityLabel, className, }: ColorPickerProps): React.ReactElement;
//# sourceMappingURL=ColorPickerV4.d.ts.map