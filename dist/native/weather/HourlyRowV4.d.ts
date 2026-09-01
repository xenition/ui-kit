import * as React from 'react';
import type { HourlyRowProps } from './HourlyRow';
/** Drop-in for {@link HourlyRowProps} — same props, a different design. */
export type HourlyRowV4Props = HourlyRowProps;
/**
 * HourlyRow — **sky tiles** design (v4). A rounded gradient panel holding a
 * horizontal scroll of soft translucent tiles, one per hour: time, a condition
 * glyph + label, temperature, and an optional precip chance. Gradient stops and
 * near-white ink derive from the brand ramp; the tiles are `skyTile` — no literal
 * colors, condition shown as glyph AND text. Renders a muted line when `hours` is
 * empty. Same props as {@link HourlyRowProps}.
 */
export declare function HourlyRowV4({ hours, unit, showPrecip, onSelectHour, emptyLabel, style, }: HourlyRowV4Props): React.ReactElement;
//# sourceMappingURL=HourlyRowV4.d.ts.map