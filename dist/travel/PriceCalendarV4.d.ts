import * as React from 'react';
import type { PriceCalendarProps } from './PriceCalendar';
/** Drop-in for {@link PriceCalendarProps} — same props, the V4 "journey" design. */
export type PriceCalendarV4Props = PriceCalendarProps;
/**
 * PriceCalendar — **V4** "journey" design (web parity of the native V4). The
 * boarding-pass take on a fare grid: clean `surface` day cells with muted price
 * ink, where the cheapest available day wears a small brand-gradient disc
 * (`from-primary-400 to-primary-700`) with near-white price ink — the signature
 * V4 touch. A currently selected day is ringed in token `primary`. Same
 * props/behavior as {@link PriceCalendarProps}: each cell announces its date,
 * price and cheapest flag via `aria-label` (never color-alone), unavailable days
 * (no `cents`) are disabled, and selection is controlled via `selectedDate`. All
 * colors from `--xen-*` token classes (no literal colors).
 */
export declare const PriceCalendarV4: React.ForwardRefExoticComponent<PriceCalendarProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PriceCalendarV4.d.ts.map