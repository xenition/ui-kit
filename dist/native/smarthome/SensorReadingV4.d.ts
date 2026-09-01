import * as React from 'react';
import type { SensorReadingProps } from './SensorReading';
/** Drop-in for {@link SensorReadingProps} — same props, the V4 "ambient" design. */
export type SensorReadingV4Props = SensorReadingProps;
/**
 * SensorReading — **V4** "ambient" design. The calm take on a sensor card: a
 * glyph sits in a **status-tinted glowing disc**, the reading is a **big
 * legible numeral** (3xl, weight 800) beside its unit, with the sensor `label`
 * and a soft-tint status pill (Normal / High / Alert / Offline) below. `status`
 * also colors the numeral — but the pill's icon+label always carries the
 * meaning, so an at-risk reading is never conveyed by color alone. When
 * `offline` the value renders as an em dash; optional `trend` sits underneath.
 * Same props/behavior as {@link SensorReadingProps}; token-only colors via
 * `useXenitionTheme()` + `withAlpha`.
 */
export declare function SensorReadingV4({ label, value, unit, icon, status, trend, style, }: SensorReadingV4Props): React.ReactElement;
//# sourceMappingURL=SensorReadingV4.d.ts.map