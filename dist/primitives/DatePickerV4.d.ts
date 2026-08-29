import * as React from 'react';
import type { DatePickerProps } from './DatePicker';
export type { DatePickerProps as DatePickerV4Props };
/**
 * **V4 date field** — the same props as {@link DatePicker}, a different design
 * line.
 *
 * ## Why this stops being `<input type="date">`
 *
 * §31 says prefer familiar interactions, and the browser's own date input is
 * about as familiar as it gets — but it is a different control in every
 * browser, it cannot be themed past its border, and its calendar is the one
 * piece a design system has no reach into. A kit whose date field looks
 * nothing like the same field on iOS is not a kit. So V4 draws the same month
 * grid its native twin draws, from the same `internal/date-v4` arithmetic,
 * behind the same `--xen-*` tokens, and the two are the same control on both
 * platforms. The metaphor is untouched: seven columns, chevrons to page.
 *
 * ## The field belongs in the form
 *
 * The base is `rounded-[var(--xen-radius-sm)]` with `px-3 py-2` — visibly a
 * different control from the `InputV4` above it in the same form. This one
 * takes `InputV4`'s treatment exactly: the same `--xen-space-2xl` minimum
 * height (which is also the tap-target floor), the same `md` radius, and the
 * same brand halo drawn with `box-shadow`, so focusing costs no layout
 * (§36.11). While the calendar is open the field stays ringed — the popover
 * belongs to it and should look like it does.
 *
 * ## The grid
 *
 *   - **Day cells at the tap-target floor.** `--xen-space-2xl` in both axes,
 *     with the visible disc inside it, so the target is larger than the thing
 *     you are aiming at.
 *   - **A selection that survives dark mode.** A filled `primary` disc with
 *     `on-primary` ink, both of which follow `[data-theme]`. `bg-primary-50`
 *     would keep the light orientation in both schemes and paint a near-white
 *     hole in a dark grid.
 *   - **Today, ringed** in `primary`, so "where am I" is answerable before
 *     anything is selected (§32 — recognition over recall).
 *   - **Blocked days that say so.** A day outside `min`/`max` is muted and
 *     genuinely `disabled`, not merely faded.
 *
 * The popover floats on `--xen-elevation-card` with its hairline kept, takes
 * glass only when the seed asked for `depth: 'glass'`, and its entrance is
 * dropped entirely under `prefers-reduced-motion` (§36.10).
 */
export declare function DatePickerV4({ value, onChange, min, max, disabled, invalid, className, }: DatePickerProps): React.ReactElement;
//# sourceMappingURL=DatePickerV4.d.ts.map