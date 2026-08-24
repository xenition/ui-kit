import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { formatMoney } from '../commerce/money';
import type { ServiceMenuItemProps, ServiceCategory } from './ServiceMenuItem';

/** Drop-in alternate of {@link ServiceMenuItemProps} — identical prop contract. */
export type ServiceMenuItemV3Props = ServiceMenuItemProps;

const CATEGORY_LABEL: Record<ServiceCategory, string> = {
  hair: 'Hair',
  nails: 'Nails',
  skin: 'Skin',
  massage: 'Massage',
  makeup: 'Makeup',
  brows: 'Brows',
  waxing: 'Waxing',
  spa: 'Spa',
};

/**
 * ServiceMenuItem — design variant **V3**: a **minimal price-list line** in the
 * classic menu idiom — the name on the left, the price on the right, joined by a
 * hairline leader rule (`name ———— price`). No glyph tile, no card chrome, no
 * shadow: duration + description sit under the name as muted meta. `popular` is a
 * small accent marker; `unavailable` dims the row, strikes the price, and blocks
 * the press. Same props as {@link ServiceMenuItemProps}. Token-only colors.
 */
export function ServiceMenuItemV3({
  name,
  priceCents,
  currency = 'USD',
  category = 'spa',
  durationMin,
  description,
  popular = false,
  unavailable = false,
  pricePrefix,
  formatMoney: format = formatMoney,
  onPress,
  style,
}: ServiceMenuItemV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const priceText = `${pricePrefix ? `${pricePrefix} ` : ''}${format(priceCents, currency)}`;
  const interactive = !unavailable && !!onPress;
  const label = CATEGORY_LABEL[category] ?? CATEGORY_LABEL.spa;

  const metaBits: string[] = [];
  if (durationMin != null) metaBits.push(`${durationMin} min`);
  if (description) metaBits.push(description);

  return (
    <Pressable
      accessibilityRole={interactive ? 'button' : undefined}
      accessibilityLabel={`${name}, ${label}${durationMin != null ? `, ${durationMin} minutes` : ''}, ${priceText}${
        unavailable ? ', unavailable' : ''
      }`}
      accessibilityState={{ disabled: unavailable }}
      disabled={!interactive}
      onPress={interactive ? onPress : undefined}
      style={({ pressed }) => [
        {
          paddingVertical: tokens.spacing.sm,
          gap: 2,
          opacity: unavailable ? 0.5 : pressed ? 0.85 : 1,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: tokens.spacing.sm }}>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600', flexShrink: 1 }}
        >
          {name}
        </Text>
        {popular ? (
          <Text style={{ color: colors.accent, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>★ Popular</Text>
        ) : null}
        <View
          style={{
            flex: 1,
            marginBottom: 4,
            borderBottomWidth: 1,
            borderStyle: 'dotted',
            borderColor: withAlpha(colors.muted, 0.4),
          }}
        />
        <Text
          style={{
            color: unavailable ? colors.muted : colors.onSurface,
            fontSize: tokens.typography.scale.base,
            fontWeight: '700',
            textDecorationLine: unavailable ? 'line-through' : 'none',
          }}
        >
          {priceText}
        </Text>
      </View>
      {metaBits.length > 0 ? (
        <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
          {metaBits.join(' · ')}
        </Text>
      ) : null}
    </Pressable>
  );
}
