import * as React from 'react';
import type { BookingSummaryProps } from './BookingSummary';
/** Drop-in alternate of {@link BookingSummaryProps} — identical prop contract. */
export type BookingSummaryV3Props = BookingSummaryProps;
/**
 * BookingSummary — design variant **V3**: **minimal, headline-first**. Where V1
 * is a bordered card of evenly-weighted label/value rows, V3 drops the chrome
 * and leads with the appointment itself — a large date over a bold time range —
 * then trails the supporting facts (resource · duration · timezone) as a single
 * muted, dot-separated line. No border, no fill: separation comes from type
 * scale and spacing alone. Same
 * `resource`/`slot`/`timeZone`/`formatDate`/`formatTime`/`action`/`title`
 * contract as {@link BookingSummaryProps}. Token-only.
 */
export declare function BookingSummaryV3({ resource, slot, timeZone, formatDate, formatTime, action, title, style, }: BookingSummaryV3Props): React.ReactElement;
//# sourceMappingURL=BookingSummaryV3.d.ts.map