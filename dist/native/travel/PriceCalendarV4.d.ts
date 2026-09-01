import * as React from 'react';
import type { PriceCalendarProps } from './PriceCalendar';
/** Drop-in for {@link PriceCalendarProps} — same props, the V4 "journey" design. */
export type PriceCalendarV4Props = PriceCalendarProps;
/**
 * PriceCalendar — **V4** "journey" design. The boarding-pass take on a fare
 * grid: clean `surface` day cells with muted price ink, where the cheapest
 * available day wears a small brand-gradient disc (`journeyDisc`) with
 * near-white price ink — the signature V4 touch. A currently selected day is
 * ringed in token `primary`. Same props/behavior as {@link PriceCalendarProps}:
 * each cell announces its date, price and cheapest flag via
 * `accessibilityLabel` (never color-alone), unavailable days (no `cents`) are
 * disabled, and selection is controlled via `selectedDate`. Token-only colors
 * via `useXenitionTheme()`.
 */
export declare function PriceCalendarV4({ days, columns, selectedDate, currency, formatMoney: format, onSelectDay, style, }: PriceCalendarV4Props): React.ReactElement;
//# sourceMappingURL=PriceCalendarV4.d.ts.map