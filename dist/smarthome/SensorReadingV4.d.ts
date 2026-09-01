import * as React from 'react';
import type { SensorReadingProps } from './SensorReading';
/** Drop-in for {@link SensorReadingProps} — same props, the V4 "ambient" design. */
export type SensorReadingV4Props = SensorReadingProps;
/**
 * SensorReading — **V4** "ambient" design (web parity of the native V4). The
 * calm take on a sensor card: a glyph sits in a **status-tinted glowing disc**,
 * the reading is a **big legible numeral** (`text-3xl`, weight 800) beside its
 * unit, with the sensor `label` and a soft-tint status pill
 * (Normal / High / Alert / Offline) below. `status` also colors the numeral —
 * but the pill's icon+label always carries the meaning, so an at-risk reading
 * is never conveyed by color alone. When `offline` the value renders as an em
 * dash; optional `trend` sits underneath. Same props/behavior as
 * {@link SensorReadingProps}; all colors from `--xen-*` token classes (no
 * literals).
 */
export declare const SensorReadingV4: React.ForwardRefExoticComponent<SensorReadingProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SensorReadingV4.d.ts.map