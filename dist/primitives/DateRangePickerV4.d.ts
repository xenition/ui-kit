import * as React from 'react';
import type { DateRange, DateRangePickerProps } from './DateRangePicker';
export type { DateRangePickerProps as DateRangePickerV4Props, DateRange };
/**
 * **V4 date range** — the web twin of `DateRangePickerV4`, the same props as
 * {@link DateRangePicker}, a different design line.
 *
 * ## One range, one calendar
 *
 * The base composes two independent `DatePicker`s and keeps them from crossing.
 * That is correct and it is not a range: the user picks a date, closes a
 * calendar, opens a second calendar, and has to hold the first date in their
 * head while doing it — §32's "recognition over recall", failed twice over.
 * Worse, at no point do they ever see the span they are choosing.
 *
 * V4 is the pattern every booking flow has settled on, which is exactly why
 * §31 points at it: **one field with two segments, one calendar, click start
 * then click end.** The span fills in as you go, so the thing being chosen is
 * the thing on screen. A caption under the grid says which end the next click
 * sets, so the mode is never a guess (§37 — make system status visible).
 *
 * ## The span has to survive dark mode
 *
 * The two ends are filled `primary` discs with `on-primary` ink — the pair the
 * compiler contrast-checks. The days between them get the shared range fill, a
 * `color-mix` of the brand into `--xen-surface`.
 *
 * That is deliberate and not decoration. `bg-primary-50` — the obvious "lighter
 * primary" — is a ramp step, and the ramps carry the light orientation in BOTH
 * schemes, so under `[data-theme="dark"]` the band is near-white and the range
 * reads as a hole punched through the calendar. Mixing against the panel's own
 * surface is right in both.
 *
 * The band is drawn as a full-bleed layer behind the day, half-width under each
 * cap, so the span is one continuous shape rather than seven separate chips.
 *
 * ## Everything else
 *
 * The field wears `InputV4`'s treatment and focus ring, day cells sit at the
 * `--xen-space-2xl` tap-target floor, and the popover floats on
 * `--xen-elevation-card` — glass only when the seed asked for it, motion
 * dropped under `prefers-reduced-motion`.
 */
export declare function DateRangePickerV4({ value, onChange, min, max, startLabel, endLabel, invalid, disabled, className, }: DateRangePickerProps): React.ReactElement;
//# sourceMappingURL=DateRangePickerV4.d.ts.map