import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type MoneyFormatter } from '../commerce/money';
export interface ProductRecommendationProps {
    /** Product name. */
    name: string;
    /** Price in integer cents. */
    priceCents: number;
    /** ISO 4217 currency (default `USD`). */
    currency?: string;
    /** Brand / line. */
    brand?: string;
    /** Average rating (0–5). Hidden when omitted. */
    rating?: number;
    /** Thumbnail URL; a token-tinted square shows when absent. */
    imageUrl?: string;
    /** Why it's recommended (e.g. "Pairs with your color service"). */
    reason?: string;
    /** Whether the item is already in the bag; swaps the CTA. */
    added?: boolean;
    /** Out-of-stock — disables the CTA. */
    soldOut?: boolean;
    /** Override the cents → string money formatter. */
    formatMoney?: MoneyFormatter;
    /** Add-to-bag CTA label (default "Add"). */
    addLabel?: string;
    /** Fires when the CTA is pressed. */
    onAdd?: () => void;
    /** Fires when the row body is pressed. */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A retail product recommendation row for after-service upsell: thumbnail,
 * brand + name, a star rating, a highlighted "reason" line, the price, and an
 * add-to-bag CTA. `added` swaps the CTA to a done state; `soldOut` disables it
 * (state, not color alone). Missing image degrades to a token-tinted square.
 * Prices are integer cents via {@link formatMoney}. Token-only colors.
 */
export declare function ProductRecommendation({ name, priceCents, currency, brand, rating, imageUrl, reason, added, soldOut, formatMoney: format, addLabel, onAdd, onPress, style, }: ProductRecommendationProps): React.ReactElement;
//# sourceMappingURL=ProductRecommendation.d.ts.map