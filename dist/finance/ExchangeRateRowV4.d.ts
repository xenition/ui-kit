import * as React from 'react';
import type { ExchangeRateRowProps } from './ExchangeRateRow';
export interface ExchangeRateRowV4Props extends ExchangeRateRowProps {
    /** BCP-47 locale for the rate and the change. */
    locale?: string;
}
/**
 * **V4 exchange-rate row** — the web twin of the native `ExchangeRateRowV4`,
 * same props as {@link ExchangeRateRow} plus `locale`.
 *
 * ## Five changes
 *
 * 1. **The rate goes through `Intl`.** `toFixed` hard-locks the decimal mark
 *    to `.` and never groups, so a de-DE app printed "1.234,56 EUR" from the
 *    amount components and "0.9184" from this one, in the same list.
 * 2. **A large `precision` no longer throws.** `Math.max(0, …)` clamped the
 *    bottom and left the top open, so any value above 100 raised a
 *    `RangeError` out of `toFixed` and took the screen with it.
 *    `ratePrecision()` clamps both ends.
 * 3. **A zero change is not a green gain.** `(changePct ?? 0) >= 0` painted
 *    "▲ +0.00%" in `success`, which reads as a rise that did not happen.
 * 4. **Direction is a sign, not a hue.** The percentage carries `+` / `−`
 *    from `Intl`'s `signDisplay`, so it survives greyscale, and the arrow
 *    beside it is decoration.
 * 5. **It is a real `<button>` when it is interactive**, from the shared row
 *    family, with a press state layer and `ring-ring` — where the base used
 *    the module's `role="button"`-on-a-`div` helper, no press feedback and
 *    `ring-primary-300`, a ramp step that inverts under
 *    `[data-theme="dark"]`.
 */
export declare const ExchangeRateRowV4: React.ForwardRefExoticComponent<ExchangeRateRowV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ExchangeRateRowV4.d.ts.map