import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type MoneyFormatter } from '../commerce/money';
export interface SalonBookingBarProps {
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
    /** Shows a spinner and blocks the CTA. */
    loading?: boolean;
    /** Empty-state copy shown when no service is selected. */
    emptyLabel?: string;
    /** Fires when the CTA is pressed. */
    onBook?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A sticky salon booking bar for the bottom of a service/stylist screen: a
 * two-line summary (service + price on the left, detail beneath) and a dominant
 * "Book now" CTA. With no `serviceName` it shows an empty prompt and disables
 * the CTA; `loading` shows a spinner. Prices are integer cents via
 * {@link formatMoney}. Token-only colors; the bar reads the `surface`/`border`
 * slots so it restyles with the theme (dark mode included).
 */
export declare function SalonBookingBar({ serviceName, totalCents, currency, detail, formatMoney: format, ctaLabel, disabled, loading, emptyLabel, onBook, style, }: SalonBookingBarProps): React.ReactElement;
//# sourceMappingURL=SalonBookingBar.d.ts.map