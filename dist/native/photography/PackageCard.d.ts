import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { MoneyFormatter } from '../commerce/money';
export interface PackageCardProps {
    /** Package name (e.g. "Wedding — Gold"). */
    name: string;
    /** Short positioning line. */
    tagline?: string;
    /** Price in integer cents. */
    priceCents: number;
    /** ISO 4217 currency code (default `USD`). */
    currency?: string;
    /** Billing / unit suffix (e.g. "per event", "starting at"). */
    priceSuffix?: string;
    /** Included features, rendered as a checked list. */
    features?: string[];
    /** Highlights this package (accent ring + "Popular" badge). */
    featured?: boolean;
    /** Ribbon text when `featured` (default `Popular`). */
    featuredLabel?: string;
    /** Book / select handler; renders the CTA when provided. */
    onSelect?: () => void;
    /** CTA label (default `Choose package`). */
    ctaLabel?: string;
    /** Copy when `features` is empty. */
    emptyFeaturesLabel?: string;
    /** Override the cents → string formatter. */
    formatMoney?: MoneyFormatter;
    style?: StyleProp<ViewStyle>;
}
/**
 * A photography pricing package — name, tagline, a headline {@link PriceTag}
 * with a unit suffix, a checked feature list, and a select CTA. `featured`
 * rings the card in the accent token and shows a "Popular" `Badge` (a labelled
 * marker, not color alone). Falls back to an empty-features line. Composes
 * `Card`, `Badge`, `Button`, `Icon`, `PriceTag`. Token-only colors.
 */
export declare function PackageCard({ name, tagline, priceCents, currency, priceSuffix, features, featured, featuredLabel, onSelect, ctaLabel, emptyFeaturesLabel, formatMoney, style, }: PackageCardProps): React.ReactElement;
//# sourceMappingURL=PackageCard.d.ts.map