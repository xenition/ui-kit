import * as React from 'react';
import type { TimePickerProps, TimeValue } from './TimePicker';
export type { TimePickerProps as TimePickerV4Props, TimeValue };
/**
 * **V4 time field** — the same props as {@link TimePicker}, a different design
 * line.
 *
 * ## Two columns, because that is what a time picker is
 *
 * §31 again: hours on the left, minutes on the right, scroll and tap. Every
 * platform's time picker is some version of this, and inventing a dial or a
 * text mask here would only mean the user has to learn our one. What changes
 * is the size of the things being tapped and how obviously the current time is
 * marked.
 *
 * ## The changes
 *
 * 1. **Rows you can hit.** The base row is `sm` vertical padding around a
 *    line of text — roughly 30px, well under the 44px floor, in a list where
 *    the neighbouring row is a different minute. Every row here is
 *    `tapTarget()` tall. That is the single change that makes the control stop
 *    feeling like a lottery.
 * 2. **A field that belongs in the form.** `InputV4`'s treatment: `2xl`
 *    minimum height, `md` radius, and the brand halo with its space reserved,
 *    so opening the picker never nudges the layout (§36.11). The field stays
 *    ringed while its popover is open.
 * 3. **A selection that survives dark mode.** The active hour and minute are
 *    filled `primary` with `onPrimary` ink — the pair the compiler
 *    contrast-checks — rather than a tinted row that dissolves on a dark page.
 * 4. **A confirm button that says what it does.** `Done` is `primary`, at the
 *    same `tapTarget()` height as everything else. §16 asks for
 *    action-specific labels, and for a picker whose two columns are already
 *    live, "Done" is genuinely what the button does.
 *
 * ## The overlay
 *
 * `elevation.sheet` through `popoverSkin`, glass only when the seed asked for
 * `depth: 'glass'`, and a scrim that is black from `elevation.sheet.color`
 * rather than `colors.onSurface` — which inverts with the scheme and veils a
 * dark page in white, as the base picker does today. Under "Reduce Motion" the
 * panel is simply there (§36.10).
 */
export declare function TimePickerV4({ value, onChange, minuteStep, placeholder, invalid, disabled, accessibilityLabel, style, }: TimePickerProps): React.ReactElement;
//# sourceMappingURL=TimePickerV4.d.ts.map