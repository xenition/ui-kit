import * as React from 'react';
import type { TimePickerProps, TimeValue } from './TimePicker';
export type { TimePickerProps as TimePickerV4Props, TimeValue };
/**
 * **V4 time field** — the web twin of `TimePickerV4`, the same props as
 * {@link TimePicker}, a different design line.
 *
 * ## Two columns, because that is what a time picker is
 *
 * §31: hours on the left, minutes on the right, scroll and click. Every
 * platform's time picker is some version of this, and inventing a dial or a
 * text mask here would only mean the user has to learn our one. What changes is
 * the size of the things being clicked and how obviously the current time is
 * marked.
 *
 * ## The changes
 *
 * 1. **Rows you can hit.** The base row is `py-sm` around a line of text —
 *    roughly 30px, well under the 44px floor, in a list where the neighbouring
 *    row is a different minute. Every row here is `--xen-space-2xl` tall. That
 *    is the single change that makes the control stop feeling like a lottery.
 * 2. **A field that belongs in the form.** `InputV4`'s treatment: the same
 *    minimum height, the same `md` radius, and the same `box-shadow` halo, so
 *    focusing costs no layout (§36.11). The field stays ringed while its
 *    popover is open.
 * 3. **A selection that survives dark mode.** The active hour and minute are
 *    filled `primary` with `on-primary` ink — the pair the compiler
 *    contrast-checks. Hover is a `color-mix` against `--xen-surface`, never
 *    `hover:bg-neutral-100`, which is a light-oriented ramp step in both
 *    schemes and flashes near-white on a dark page.
 * 4. **A confirm button that says what it does.** `Done` is `primary`, at the
 *    same tap-target height as everything else.
 *
 * The popover floats on `--xen-elevation-card` with its hairline, takes glass
 * only when the seed asked for `depth: 'glass'`, and drops its entrance under
 * `prefers-reduced-motion` (§36.10).
 */
export declare function TimePickerV4({ value, onChange, minuteStep, placeholder, invalid, disabled, accessibilityLabel, className, }: TimePickerProps): React.ReactElement;
//# sourceMappingURL=TimePickerV4.d.ts.map