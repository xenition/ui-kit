import * as React from 'react';
import type { DateRange, DateRangePickerProps } from './DateRangePicker';
export type { DateRangePickerProps as DateRangePickerV4Props, DateRange };
/**
 * **V4 date range** — the same props as {@link DateRangePicker}, a different
 * design line.
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
 * §31 points at it: **one field with two segments, one calendar, tap start then
 * tap end.** The span fills in as you go, so the thing being chosen is the
 * thing on screen. A caption under the grid says which end the next tap sets,
 * so the mode is never a guess (§37 — make system status visible).
 *
 * ## The span has to survive dark mode
 *
 * The two ends are filled `primary` discs with `onPrimary` ink — the pair the
 * compiler contrast-checks. The days between them get `rangeFill`, which is the
 * brand composited ONCE against `colors.surface` into an opaque colour.
 *
 * That last part is the whole reason the helper exists. `ramps.primary[50]` —
 * the obvious "lighter primary" — carries the light orientation in BOTH
 * schemes, so on a dark page the band is near-white and the range reads as a
 * hole punched through the calendar. A translucent primary is scheme-correct
 * but composites against whatever ground it lands on, and this band lands on
 * the panel, on glass, and over a scrimmed page. Compositing once, against the
 * panel's own surface, is the only version that is right in all three.
 *
 * The band is drawn as a full-bleed layer behind the day, half-width on the two
 * ends, so the span is one continuous shape rather than seven separate chips.
 *
 * ## Everything else
 *
 * The field wears `InputV4`'s treatment and halo, day cells are at
 * `tapTarget()`, the scrim is black from the elevation token rather than
 * `colors.onSurface`, and the panel takes `elevation.sheet` — glass only when
 * the seed asked for it. Under "Reduce Motion" the panel is simply there.
 */
export declare function DateRangePickerV4({ value, onChange, min, max, startLabel, endLabel, locale, invalid, disabled, style, }: DateRangePickerProps): React.ReactElement;
//# sourceMappingURL=DateRangePickerV4.d.ts.map