import * as React from 'react';
import { type MoneyFormatter } from '../commerce';
export interface SalonBookingBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** Primary line — the selected service(s) summary. */
    serviceName?: string;
    /** Total price in integer cents. Hidden when omitted. */
    totalCents?: number;
    /** ISO 4217 currency (default `USD`). */
    currency?: string;
    /** Secondary line (e.g. "with Ana · Today 3:00 PM · 45 min"). */
    detail?: string;
    /** Override the cents → string money formatter. */
    formatMoney?: MoneyFormatter;
    /** CTA label (default "Book now"). */
    ctaLabel?: string;
    /** Disables the CTA (e.g. nothing selected). */
    disabled?: boolean;
    /** Shows a spinner and blocks the CTA (web `Button` has no `loading` → disabled). */
    loading?: boolean;
    /** Empty-state copy shown when no service is selected. */
    emptyLabel?: string;
    /** Fires when the CTA is pressed. */
    onBook?: () => void;
}
/**
 * A sticky salon booking bar for the bottom of a service/stylist screen: a
 * two-line summary (service + price on the left, detail beneath) and a dominant
 * "Book now" CTA. With no `serviceName` it shows an empty prompt and disables
 * the CTA; `loading` shows a spinner and disables the CTA (web `Button` has no
 * `loading` prop). Prices are integer cents via {@link formatMoney}. Token-only
 * colors.
 */
export declare const SalonBookingBar: React.ForwardRefExoticComponent<SalonBookingBarProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SalonBookingBar.d.ts.map