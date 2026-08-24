import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { MoneyFormatter } from '../commerce/money';
/** Lifecycle of a shoot booking. */
export type ShootBookingStatus = 'requested' | 'confirmed' | 'completed' | 'cancelled';
export interface ShootBookingCardProps {
    /** Client name. */
    clientName: string;
    /** Shoot type (e.g. "Wedding", "Portrait session"). */
    shootType?: string;
    /** Human date line (e.g. "Sat, Aug 30"). */
    dateText?: string;
    /** Human time line (e.g. "2:00 PM – 5:00 PM"). */
    timeText?: string;
    /** Location / venue. */
    location?: string;
    /** Booking status (default `requested`). */
    status?: ShootBookingStatus;
    /** Quoted price in integer cents. */
    priceCents?: number;
    /** ISO 4217 currency code (default `USD`). */
    currency?: string;
    /** Confirm handler; renders a confirm button when provided and pending. */
    onConfirm?: () => void;
    /** Confirm button label (default `Confirm`). */
    confirmLabel?: string;
    /** Press handler for the whole card. */
    onPress?: () => void;
    /** Override the cents → string formatter. */
    formatMoney?: MoneyFormatter;
    style?: StyleProp<ViewStyle>;
}
/**
 * A photo-shoot booking summary — client, shoot type, a date/time/location
 * block, a status `Badge`, an optional quoted {@link PriceTag}, and a confirm
 * action for pending requests. Composes `Card`, `Badge`, `Button`, `Icon`, and
 * `PriceTag`. Status is conveyed with a labelled badge (not color alone).
 * Token-only colors.
 */
export declare function ShootBookingCard({ clientName, shootType, dateText, timeText, location, status, priceCents, currency, onConfirm, confirmLabel, onPress, formatMoney, style, }: ShootBookingCardProps): React.ReactElement;
//# sourceMappingURL=ShootBookingCard.d.ts.map