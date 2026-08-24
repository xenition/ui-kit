import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge } from '../primitives/Badge';
import { Icon } from '../primitives/Icon';
import { PriceTag } from '../commerce/PriceTag';
import type { PackageCardProps } from './PackageCard';

/** Drop-in alternate of {@link PackageCardProps} — identical prop contract. */
export type PackageCardV3Props = PackageCardProps;

/**
 * PackageCard — design variant **V3**: a **minimal price line**. Name + tagline
 * on the left, the price hugging the right on a single hairline-separated row,
 * with the feature list collapsed to a muted count and the whole row tappable to
 * select — a lightweight list entry for a stacked package menu, not a pricing
 * card. Featured still shows a labelled `Badge`. Same props as
 * {@link PackageCardProps}; token-only, empty-features safe.
 */
export function PackageCardV3({
  name,
  tagline,
  priceCents,
  currency = 'USD',
  priceSuffix,
  features,
  featured = false,
  featuredLabel = 'Popular',
  onSelect,
  emptyFeaturesLabel = 'Details coming soon',
  formatMoney,
  style,
}: PackageCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const list = features ?? [];
  const featureLine =
    list.length === 0 ? emptyFeaturesLabel : `${list.length} included`;

  const containerStyle: StyleProp<ViewStyle> = [
    {
      flexDirection: 'row',
      alignItems: 'center',
      gap: tokens.spacing.md,
      paddingVertical: tokens.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    style,
  ];

  const inner = (
    <>
      <View style={{ flex: 1, gap: 2 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          <Text
            accessibilityRole="header"
            numberOfLines={1}
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
          >
            {name}
          </Text>
          {featured ? (
            <Badge tone="accent" variant="soft" size="sm">
              {featuredLabel}
            </Badge>
          ) : null}
        </View>
        <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
          {tagline ? `${tagline} · ${featureLine}` : featureLine}
        </Text>
      </View>

      <View style={{ alignItems: 'flex-end' }}>
        <PriceTag cents={priceCents} currency={currency} formatMoney={formatMoney} size="md" />
        {priceSuffix ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{priceSuffix}</Text>
        ) : null}
      </View>

      {onSelect ? <Icon glyph="›" size="lg" color="muted" /> : null}
    </>
  );

  if (onSelect) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={name}
        onPress={onSelect}
        style={({ pressed }) => [containerStyle, { opacity: pressed ? 0.9 : 1 }]}
      >
        {inner}
      </Pressable>
    );
  }

  return <View style={containerStyle}>{inner}</View>;
}
