import * as React from 'react';
import type { MeterReadingProps } from './MeterReading';
/** Drop-in for {@link MeterReadingProps} — same props, a different design. */
export type MeterReadingV4Props = MeterReadingProps;
/**
 * MeterReading — **V4** design. The clean, trust-first meter card: an elevated
 * rounded surface with the utility-kind glyph in a small brand-gradient disc (the
 * signature V4 touch). Keeps the previous → current → used reading trio, the
 * derived consumption (`current − previous`, clamped to `0`) printed via
 * `formatUsage`, the date, and the source tag. Restraint by design — only the disc
 * is gradient. Same props/behavior as {@link MeterReadingProps}; token-only colors.
 */
export declare const MeterReadingV4: React.ForwardRefExoticComponent<MeterReadingProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MeterReadingV4.d.ts.map