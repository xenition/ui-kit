import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type MoneyFormatter } from '../commerce/money';
export type ServiceCategory = 'hair' | 'nails' | 'skin' | 'massage' | 'makeup' | 'brows' | 'waxing' | 'spa';
export interface ServiceMenuItemProps {
    /** Service name, e.g. "Balayage & tone". */
    name: string;
    /** Price in integer cents. */
    priceCents: number;
    /** ISO 4217 currency (default `USD`). */
    currency?: string;
    /** Category; drives the icon, tag, and accent tone. Falls back to `spa`. */
    category?: ServiceCategory;
    /** Duration in minutes. */
    durationMin?: number;
    /** Optional one/two-line description. */
    description?: string;
    /** Flags the row with a "Popular" marker. */
    popular?: boolean;
    /** When set, the row is dimmed and non-interactive. */
    unavailable?: boolean;
    /** Prefix shown before the price (e.g. "from"). */
    pricePrefix?: string;
    /** Override the cents → string money formatter. */
    formatMoney?: MoneyFormatter;
    /** Fires when the row is tapped (unless `unavailable`). */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A single salon/spa service-menu row: category icon + tag, name, optional
 * description, a duration chip, and a right-aligned price (integer cents via
 * {@link formatMoney}). `popular` adds a soft marker; `unavailable` dims the row
 * and blocks the press. The whole row is one `button` when interactive with a
 * spoken label carrying the price/duration. Token-only colors.
 */
export declare function ServiceMenuItem({ name, priceCents, currency, category, durationMin, description, popular, unavailable, pricePrefix, formatMoney: format, onPress, style, }: ServiceMenuItemProps): React.ReactElement;
//# sourceMappingURL=ServiceMenuItem.d.ts.map