import * as React from 'react';
import type { MeterReadingProps } from './MeterReading';
/** Drop-in for {@link MeterReadingProps} — same props, a different design. */
export type MeterReadingV4Props = MeterReadingProps;
/**
 * MeterReading — **V4** design. The clean, trust-first meter card: an elevated
 * rounded surface with the utility-kind glyph in a small brand-gradient disc (the
 * signature V4 touch). Keeps the previous → current → used reading trio, the
 * derived consumption clamped to `0` and printed via `formatUsage`, the date, and
 * the source tag. Restraint by design — only the disc is gradient. Same props as
 * {@link MeterReadingProps}; token-only colors.
 */
export declare function MeterReadingV4({ kind, previous, current, unit, decimals, date, source, style, }: MeterReadingV4Props): React.ReactElement;
//# sourceMappingURL=MeterReadingV4.d.ts.map