import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card } from '../primitives/Card';
import { Button } from '../primitives/Button';
import { Badge } from '../primitives/Badge';
import { Icon } from '../primitives/Icon';
import { PriceTag } from '../commerce/PriceTag';
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
export function PackageCard({
  name,
  tagline,
  priceCents,
  currency = 'USD',
  priceSuffix,
  features,
  featured = false,
  featuredLabel = 'Popular',
  onSelect,
  ctaLabel = 'Choose package',
  emptyFeaturesLabel = 'Details coming soon',
  formatMoney,
  style,
}: PackageCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const list = features ?? [];

  return (
    <Card
      variant={featured ? 'elevated' : 'outlined'}
      padding="lg"
      style={[
        {
          gap: tokens.spacing.md,
          borderWidth: featured ? 2 : 1,
          borderColor: featured ? colors.accent : colors.border,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
        <View style={{ flex: 1, gap: 2 }}>
          <Text
            accessibilityRole="header"
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}
          >
            {name}
          </Text>
          {tagline ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{tagline}</Text>
          ) : null}
        </View>
        {featured ? (
          <Badge tone="accent" variant="soft">
            {featuredLabel}
          </Badge>
        ) : null}
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
        <PriceTag cents={priceCents} currency={currency} formatMoney={formatMoney} size="lg" />
        {priceSuffix ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{priceSuffix}</Text>
        ) : null}
      </View>

      <View style={{ gap: tokens.spacing.xs }}>
        {list.length === 0 ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            {emptyFeaturesLabel}
          </Text>
        ) : (
          list.map((feature, i) => (
            <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
              <Icon glyph="✓" size="sm" color="success" />
              <Text style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>
                {feature}
              </Text>
            </View>
          ))
        )}
      </View>

      {onSelect ? (
        <Button variant={featured ? 'primary' : 'outline'} onPress={onSelect}>
          {ctaLabel}
        </Button>
      ) : null}
    </Card>
  );
}
