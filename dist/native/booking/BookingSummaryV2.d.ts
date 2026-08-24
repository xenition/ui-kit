import * as React from 'react';
import type { BookingSummaryProps } from './BookingSummary';
/** Drop-in alternate of {@link BookingSummaryProps} — identical prop contract. */
export type BookingSummaryV2Props = BookingSummaryProps;
/**
 * BookingSummary — design variant **V2**: an **elevated, receipt-style card**
 * with a highlighted appointment band. Where V1 is a flat bordered card of
 * label/value rows, V2 floats on a shadow with a dashed rule separating the
 * meta rows (With / Duration / Timezone) from a primary-tinted "band" that
 * frames the chosen date and time range like the total on a receipt — the one
 * line the eye should land on. Same
 * `resource`/`slot`/`timeZone`/`formatDate`/`formatTime`/`action`/`title`
 * contract as {@link BookingSummaryProps}. Token-only.
 */
export declare function BookingSummaryV2({ resource, slot, timeZone, formatDate, formatTime, action, title, style, }: BookingSummaryV2Props): React.ReactElement;
//# sourceMappingURL=BookingSummaryV2.d.ts.map