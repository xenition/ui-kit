import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge } from '../primitives/Badge';
import { Button } from '../primitives/Button';
import { Icon } from '../primitives/Icon';
import { PriceTag } from '../commerce/PriceTag';
import type { PackageCardProps } from './PackageCard';

/** Drop-in for {@link PackageCardProps} — same props, the V4 "studio" design. */
export type PackageCardV4Props = PackageCardProps;

/**
 * PackageCard — **V4** "studio" design. The clean, price-forward take on a
 * pricing package: an elevated surface card (no gradient — pricing stays a crisp,
 * legible surface) whose headline is the big, bold {@link PriceTag} (`size="lg"`),
 * the package name set bold above it with a muted tagline, and the inclusions
 * listed with a ✓ glyph. A `featured` ("popular") package earns a labelled
 * soft-primary chip **and** a primary ring — a marker, never color alone.
 * Identical props/behavior to {@link PackageCardProps}: honors `formatMoney`,
 * `priceSuffix`, `features`/`emptyFeaturesLabel`, and renders the `onSelect` CTA
 * when provided. Token-only colors via `useXenitionTheme()`; 8-pt spacing.
 */
export function PackageCardV4({
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
}: PackageCardV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const list = features ?? [];

  const containerStyle: StyleProp<ViewStyle> = [
    {
      gap: tokens.spacing.md,
      borderRadius: tokens.radius.lg,
      borderWidth: featured ? 2 : 1,
      borderColor: featured ? colors.primary : colors.border,
      backgroundColor: colors.card,
      padding: tokens.spacing.lg,
      shadowColor: colors.onSurface,
      shadowOpacity: 0.08,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 6 },
      elevation: 3,
    },
    style,
  ];

  return (
    <View style={containerStyle}>
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
          <Badge tone="primary" variant="soft" size="sm">
            {featuredLabel}
          </Badge>
        ) : null}
      </View>

      {/* The price is the visual peak: big, bold PriceTag. */}
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
    </View>
  );
}
