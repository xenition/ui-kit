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
 * 1. **It is a field like the others.** It takes `FIELD_V4_SHELL` — the same
 *    height, radius and padding `InputV4` and `SelectV4` take, from the same
 *    shared constant — so an amount sitting under a text field in a form
 *    shares its edge (§13).
 * 2. **Figures of equal width.** `tabular-nums` on the amount, so a column of
 *    prices lines up on the decimal point and a digit changing does not shift
 *    the ones beside it (§33, optimize for scanning). It stays right aligned
 *    for the same reason.
 * 3. **A real focus ring.** The shell carries `data-xen-v4-shell`, so focusing
 *    the amount rings the whole field — symbol included, because the symbol is
 *    part of the control — drawn with `box-shadow` so arming it costs no
 *    layout (§36.11). The base's `focus-within:ring-1` was a hairline that read
 *    as a second border.
 *
 * The symbol is `muted` and the amount is `on-surface`: the currency is context
 * and the number is the content, and §6 asks for the hierarchy to be settled
 * before anything is styled. `invalid` turns the border and the ring `danger`
 * from one flag, so they can never disagree — the recovery copy belongs to the
 * `Field` around this control, since a primitive cannot invent the sentence
 * that says what to fix (§38).
 *
 * No gradient, no glass, no shadow: §16 asks that forms stay minimal, and an
 * amount is not a hero.
 */
export declare function CurrencyInputV4({ value, onChange, symbol, precision, placeholder, invalid, disabled, accessibilityLabel, className, }: CurrencyInputProps): React.ReactElement;
//# sourceMappingURL=CurrencyInputV4.d.ts.map