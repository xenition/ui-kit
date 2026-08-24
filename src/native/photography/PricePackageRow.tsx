import * as React from 'react';
import {
  Pressable,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge } from '../primitives/Badge';
import { PriceTag } from '../commerce/PriceTag';
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

/** Token-derived translucent tint (no literal hex). */
function withAlpha(hex: string, alpha: number): string {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * A compact à-la-carte price line — label, optional detail, and a right-aligned
 * {@link PriceTag} with a unit suffix. `highlighted` gives the row an accent
 * tint and shows an optional `badgeLabel` (a labelled marker, not color alone).
 * Optional `onPress` exposes it as a `button` for quote building. Composes
 * `Badge` and `PriceTag`. Token-only colors.
 */
export function PricePackageRow({
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
}: PricePackageRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const rowStyle: StyleProp<ViewStyle> = [
    {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: tokens.spacing.sm,
      paddingVertical: tokens.spacing.sm,
      paddingHorizontal: tokens.spacing.md,
      borderRadius: tokens.radius.md,
      borderWidth: 1,
      borderColor: highlighted ? colors.accent : colors.border,
      backgroundColor: highlighted ? withAlpha(colors.accent, 0.1) : colors.surface,
    },
    style,
  ];

  const inner = (
    <>
      <View style={{ flex: 1, gap: 2 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flexWrap: 'wrap' }}>
          <Text
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}
          >
            {label}
          </Text>
          {highlighted && badgeLabel ? (
            <Badge tone="accent" variant="soft" size="sm">
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
