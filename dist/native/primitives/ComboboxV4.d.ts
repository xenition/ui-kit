import * as React from 'react';
import type { ComboboxOption, ComboboxProps } from './Combobox';
export type { ComboboxProps as ComboboxV4Props, ComboboxOption };
/**
 * **V4 combobox** — the same props as {@link Combobox}, a different design
 * line.
 *
 * ## The selected option has to be findable
 *
 * The base marks it by colouring the label `colors.primary`. That is the one
 * token in the palette with no contrast promise against `surface` — `primary`
 * is guaranteed against `onPrimary`, and `primaryText` is the slot the compiler
 * derives for exactly this case: brand-coloured text ON a surface. So the
 * selected row uses `primaryText`, and it also carries a ✓, because colour
 * alone is never the only cue (§46).
 *
 * ## Everything else is about size and honesty
 *
 * 1. **Rows at `tapTarget()`.** The base row is `md` padding around a line of
 *    text; in a filtered list the row above is a different answer.
 * 2. **A field that belongs in the form.** `InputV4`'s treatment — `2xl`
 *    minimum height, `md` radius, brand halo with its space reserved — and the
 *    field stays ringed while its sheet is open, because the sheet is its.
 * 3. **An empty state that says something.** "No matches for “x”", quoting the
 *    query back, rather than the base's bare "No matches" (§15, §37).
 * 4. **A scrim that is black.** The base scrims with `ramps.neutral[950]`,
 *    which the dark scheme re-emits inverted — a WHITE veil over a dark page.
 *    `elevation.sheet.color` does not invert, because a shadow does not.
 *
 * The search field inside the sheet is the same `InputV4` treatment as the
 * trigger, so the two do not look like different species; the sheet itself
 * takes `elevation.sheet` and glass only when the seed asked for it.
 */
export declare function ComboboxV4({ options, value, onValueChange, onChange, placeholder, invalid, disabled, accessibilityLabel, style, }: ComboboxProps): React.ReactElement;
//# sourceMappingURL=ComboboxV4.d.ts.map