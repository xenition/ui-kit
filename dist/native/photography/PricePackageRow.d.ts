import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { MoneyFormatter } from '../commerce/money';
export interface PricePackageRowProps {
    /** À-la-carte line label (e.g. "Extra edited photo"). */
    label: string;
    /** Supporting detail line. */
    description?: string;
    /** Price in integer cents. */
    priceCents: number;
    /** ISO 4217 currency code (default `USD`). */
    currency?: string;
    /** Unit suffix (e.g. "each", "/ hour"). */
    unitSuffix?: string;
    /** Highlights the row (accent tint + optional badge). */
    highlighted?: boolean;
    /** Small badge text (e.g. "Best value"). */
    badgeLabel?: string;
    /** Press handler (e.g. add to quote). */
    onPress?: () => void;
    /** Override the cents → string formatter. */
    formatMoney?: MoneyFormatter;
    style?: StyleProp<ViewStyle>;
}
/**
 * A compact à-la-carte price line — label, optional detail, and a right-aligned
 * {@link PriceTag} with a unit suffix. `highlighted` gives the row an accent
 * tint and shows an optional `badgeLabel` (a labelled marker, not color alone).
 * Optional `onPress` exposes it as a `button` for quote building. Composes
 * `Badge` and `PriceTag`. Token-only colors.
 */
export declare function PricePackageRow({ label, description, priceCents, currency, unitSuffix, highlighted, badgeLabel, onPress, formatMoney, style, }: PricePackageRowProps): React.ReactElement;
//# sourceMappingURL=PricePackageRow.d.ts.map