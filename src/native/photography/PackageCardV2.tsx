import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card } from '../primitives/Card';
import { Button } from '../primitives/Button';
import { Icon } from '../primitives/Icon';
import { PriceTag } from '../commerce/PriceTag';
import { shadow } from '../primitives/internal/elevation';
import type { PackageCardProps } from './PackageCard';

/** Drop-in alternate of {@link PackageCardProps} — identical prop contract. */
export type PackageCardV2Props = PackageCardProps;

/**
 * PackageCard — design variant **V2**: an **elevated pricing card** with a
 * corner **ribbon**. Featured packages float on an `xl` shadow, an accent ribbon
 * band runs across the top-right corner, and a big centred price sits above a
 * checked feature list and a full-width CTA — the "recommended tier" look of a
 * pricing table. Featured state carries the labelled ribbon, not colour alone.
 * Same props as {@link PackageCardProps}; token-only, empty-features fallback.
 */
export function PackageCardV2({
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
}: PackageCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const list = features ?? [];

  return (
    <Card
      variant="flat"
      padding="lg"
      radius="lg"
      style={[
        {
          overflow: 'hidden',
          gap: tokens.spacing.md,
          borderWidth: featured ? 2 : 0,
          borderColor: featured ? colors.accent : 'transparent',
          ...shadow(featured ? 'xl' : 'md', tokens),
        },
        style,
      ]}
    >
      {featured ? (
        <View
          accessibilityRole="text"
          accessibilityLabel={featuredLabel}
          style={{
            position: 'absolute',
            top: tokens.spacing.md,
            right: -tokens.spacing.xl,
            transform: [{ rotate: '45deg' }],
            backgroundColor: colors.accent,
            paddingHorizontal: tokens.spacing.xl,
            paddingVertical: 2,
          }}
        >
          <Text
            style={{
              color: colors.onAccent,
              fontSize: tokens.typography.scale.xs,
              fontWeight: '700',
            }}
          >
            {featuredLabel}
          </Text>
        </View>
      ) : null}

      <View style={{ gap: 2, alignItems: 'center' }}>
        <Text
          accessibilityRole="header"
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700', textAlign: 'center' }}
        >
          {name}
        </Text>
        {tagline ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, textAlign: 'center' }}>
            {tagline}
          </Text>
        ) : null}
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'center', gap: tokens.spacing.xs }}>
        <PriceTag cents={priceCents} currency={currency} formatMoney={formatMoney} size="lg" />
        {priceSuffix ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{priceSuffix}</Text>
        ) : null}
      </View>

      <View
        style={{
          gap: tokens.spacing.sm,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          paddingTop: tokens.spacing.md,
        }}
      >
        {list.length === 0 ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, textAlign: 'center' }}>
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
        <Button variant={featured ? 'primary' : 'elevated'} onPress={onSelect}>
          {ctaLabel}
        </Button>
      ) : null}
    </Card>
  );
}
