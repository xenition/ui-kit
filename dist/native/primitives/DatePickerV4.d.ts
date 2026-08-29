import * as React from 'react';
import type { DatePickerProps } from './DatePicker';
export type { DatePickerProps as DatePickerV4Props };
/**
 * **V4 date field** — the same props as {@link DatePicker}, a different design
 * line.
 *
 * ## The field belongs in the form
 *
 * The base trigger is `radius.sm` with `sm/md` padding — visibly a different
 * control from the `InputV4` sitting above it in the same form. This one takes
 * `InputV4`'s treatment exactly: the same `2xl` minimum height (which is also
 * the tap-target floor, so a field is never smaller than the smallest thing you
 * are allowed to touch), the same `md` radius, and the same brand halo, whose
 * space is reserved whether or not it is showing so opening the picker never
 * nudges the layout (§36.11). While the calendar is open the field stays
 * ringed, because the popover belongs to it and should look like it does.
 *
 * ## The calendar is a calendar
 *
 * §31: a month grid, seven columns, chevrons to page. The changes are all
 * about the hand rather than the metaphor:
 *
 *   - **Day cells at `tapTarget()`.** The base gives its day a 44px box inside
 *     a 44px column, so a cell edge and a target edge are the same line and
 *     there is no slack for a thumb. Here the target is `spacing['2xl']` and
 *     the visible disc sits inside it.
 *   - **A selection that survives dark mode.** A filled `primary` disc with
 *     `onPrimary` ink, both resolved for the active scheme. `ramps.primary[50]`
 *     would keep the light orientation in both and paint a near-white hole in a
 *     dark grid.
 *   - **Today, marked.** A `primary` ring on today's cell, so "where am I" is
 *     answerable before you have selected anything (§32 — recognition over
 *     recall).
 *   - **Blocked days that say so.** A day outside `min`/`max` is muted, struck
 *     from the tab order and reported disabled, rather than merely faded.
 *
 * ## The overlay
 *
 * `elevation.sheet` and — only when the seed asked for `depth: 'glass'` — the
 * glass pair, both through `popoverSkin`. The scrim is `elevation.sheet.color`
 * at a fixed alpha: **never `colors.onSurface`**, which inverts with the scheme
 * and paints a white veil over a dark page, which is what the base picker does
 * today. A shadow colour does not invert, because a shadow does not.
 *
 * The panel fades and lifts in over `PICKER_MOTION.popover`, and under the OS
 * "Reduce Motion" setting it is simply there (§36.10).
 */
export declare function DatePickerV4({ value, onChange, min, max, placeholder, invalid, disabled, locale, accessibilityLabel, style, }: DatePickerProps): React.ReactElement;
//# sourceMappingURL=DatePickerV4.d.ts.map