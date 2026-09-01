import * as React from 'react';
import type { HourlyRowProps } from './HourlyRow';
/** Drop-in for {@link HourlyRowProps} — same props, a different design. */
export type HourlyRowV4Props = HourlyRowProps;
/**
 * HourlyRow — **tiled on a brand ground** design (v4), web parity of the native
 * `HourlyRowV4`. A `primary`-colored panel holding a horizontal scroll of soft
 * tiles, one per hour: the time, a condition glyph + label, the temperature, and
 * an optional precip chance. Ground is `primary`, tiles a lighter ramp step, text
 * the contrast-guaranteed `on-primary` — all from `--xen-*` classes, no literal
 * colors; the condition is a glyph AND text. Each tile is a `<button>` when
 * `onSelectHour` is set. Renders a muted line when `hours` is empty. Same props
 * as {@link HourlyRowProps}.
 */
export declare const HourlyRowV4: React.ForwardRefExoticComponent<HourlyRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=HourlyRowV4.d.ts.map