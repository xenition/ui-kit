import * as React from 'react';
import type { CurrencyInputProps } from './CurrencyInput';
export type { CurrencyInputProps as CurrencyInputV4Props };
/**
 * **V4 currency field** — the same props as {@link CurrencyInput}, a different
 * design line.
 *
 * Money is the field people check twice, so the changes are all about reading
 * it rather than decorating it:
 *
 * 1. **It is a field like the others.** `2xl` tall, `md` radius, `md`
 *    horizontal padding, from the shared `fieldMetrics` — the same numbers
 *    `InputV4` and `SelectV4` take, so an amount sitting under a text field in
 *    a form shares its edge (§13).
 * 2. **Figures of equal width.** `tabular-nums` on the amount, so a column of
 *    prices lines up on the decimal point and a digit changing does not shift
 *    the ones beside it (§33, optimize for scanning). The amount is right
 *    aligned for the same reason, which is where the base already had it.
 * 3. **A real focus ring.** Focusing the amount lights the shared brand halo
 *    around the whole field — symbol included, because the symbol is part of
 *    the control — and its space is reserved whether or not it is showing, so
 *    focusing never nudges the layout (§36.11).
 *
 * The symbol is `muted` and the amount is `onSurface`: the currency is context
 * and the number is the content, and §6 asks for the hierarchy to be settled
 * before anything is styled. `invalid` turns the border and the ring `danger`
 * from one flag, so they can never disagree — the recovery copy belongs to the
 * `Field` around this control, since a primitive cannot invent the sentence
 * that says what to fix (§38).
 *
 * No gradient, no glass, no shadow: §16 asks that forms stay minimal, and an
 * amount is not a hero.
 */
export declare function CurrencyInputV4({ value, onChange, symbol, precision, placeholder, invalid, disabled, accessibilityLabel, containerStyle, }: CurrencyInputProps): React.ReactElement;
//# sourceMappingURL=CurrencyInputV4.d.ts.map