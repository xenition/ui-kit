import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge } from '../primitives/Badge';
import { Icon } from '../primitives/Icon';
import { PriceTag } from '../commerce/PriceTag';
import type { PricePackageRowProps } from './PricePackageRow';

/** Drop-in for {@link PricePackageRowProps} — same props, the V4 "studio" design. */
export type PricePackageRowV4Props = PricePackageRowProps;

/**
 * PricePackageRow — **V4** "studio" design. The clean à-la-carte price line: an
 * elevated surface row (no gradient — pricing stays a crisp, legible surface)
 * with the label set semibold, a muted detail line, and the {@link PriceTag}
 * right-aligned. A `highlighted` row keeps the clean surface but earns a primary
 * ring, a leading ✓ glyph, and a labelled soft-primary chip (`badgeLabel`) — a
 * marker, never color alone. Identical props/behavior to
 * {@link PricePackageRowProps}: honors `formatMoney` and `unitSuffix`; optional
 * `onPress` exposes it as a `button` (≥44px target) for quote building.
 * Token-only colors via `useXenitionTheme()`; 8-pt spacing.
 */
export function PricePackageRowV4({
  label,
  description,
  priceCents,
  currency = 'USD',
  unitSuffix,
  highlighted = false,
  badgeLabel,
  onPress,
  formatMoney,
  style,
}: PricePackageRowV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const rowStyle: StyleProp<ViewStyle> = [
    {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: tokens.spacing.sm,
      minHeight: 44,
      paddingVertical: tokens.spacing.sm,
      paddingHorizontal: tokens.spacing.md,
      borderRadius: tokens.radius.lg,
      borderWidth: highlighted ? 2 : 1,
      borderColor: highlighted ? colors.primary : colors.border,
      backgroundColor: colors.card,
      shadowColor: colors.onSurface,
      shadowOpacity: 0.08,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 6 },
      elevation: 3,
    },
    style,
  ];

  const inner = (
    <>
      <View style={{ flex: 1, gap: 2 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flexWrap: 'wrap' }}>
          {highlighted ? <Icon glyph="✓" size="sm" color="primary" /> : null}
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
            {label}
          </Text>
          {highlighted && badgeLabel ? (
            <Badge tone="primary" variant="soft" size="sm">
              {badgeLabel}
            </Badge>
          ) : null}
        </View>
        {description ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{description}</Text>
        ) : null}
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
        <PriceTag cents={priceCents} currency={currency} formatMoney={formatMoney} size="sm" />
        {unitSuffix ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{unitSuffix}</Text>
        ) : null}
      </View>
    </>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        onPress={onPress}
        style={({ pressed }) => [rowStyle, { opacity: pressed ? 0.9 : 1 }]}
      >
        {inner}
      </Pressable>
    );
  }

  return <View style={rowStyle}>{inner}</View>;
}
