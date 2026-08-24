import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { formatMoney, type MoneyFormatter } from '../commerce/money';

export type PriceListRowVariant = 'default' | 'section';

export interface PriceListRowProps {
  /** Left label — the service/item name, or a section title. */
  label: string;
  /** Price in integer cents. Omit for `section` rows. */
  priceCents?: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Renders "from {price}" when the price is a starting rate. */
  fromPrice?: boolean;
  /** Small note under the label (e.g. duration or "incl. wash"). */
  note?: string;
  /** Duration in minutes, shown as a right-aligned sub-line. */
  durationMin?: number;
  /** Struck-through original price in cents (when discounted). */
  compareAtCents?: number;
  /** `section` renders a subdued header row (bold label, no price). */
  variant?: PriceListRowVariant;
  /** Override the cents → string money formatter. */
  formatMoney?: MoneyFormatter;
  style?: StyleProp<ViewStyle>;
}

/**
 * One line of a printed-style salon price list: a left label (+ optional note)
 * and a right-aligned price. `fromPrice` prefixes "from"; `compareAtCents`
 * strikes through the original; `durationMin` adds a small sub-line. The
 * `section` variant is a subdued header (bold label, no price). Prices are
 * integer cents via {@link formatMoney}. Token-only colors.
 */
export function PriceListRow({
  label,
  priceCents,
  currency = 'USD',
  fromPrice = false,
  note,
  durationMin,
  compareAtCents,
  variant = 'default',
  formatMoney: format = formatMoney,
  style,
}: PriceListRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (variant === 'section') {
    return (
      <View
        accessibilityRole="header"
        accessibilityLabel={label}
        style={[
          { paddingVertical: tokens.spacing.sm, borderBottomColor: withAlpha(colors.muted, 0.25), borderBottomWidth: 1 },
          style,
        ]}
      >
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1 }}>
          {label}
        </Text>
      </View>
    );
  }

  const hasPrice = typeof priceCents === 'number';
  const priceText = hasPrice ? `${fromPrice ? 'from ' : ''}${format(priceCents as number, currency)}` : '—';
  const hasCompare = typeof compareAtCents === 'number' && hasPrice && compareAtCents > (priceCents as number);

  return (
    <View
      accessibilityLabel={`${label}${hasPrice ? `, ${priceText}` : ''}${durationMin != null ? `, ${durationMin} minutes` : ''}`}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: tokens.spacing.md,
          paddingVertical: tokens.spacing.sm,
          borderBottomColor: withAlpha(colors.muted, 0.15),
          borderBottomWidth: 1,
        },
        style,
      ]}
    >
      <View style={{ flex: 1, gap: 2 }}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>{label}</Text>
        {note ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{note}</Text> : null}
      </View>
      <View style={{ alignItems: 'flex-end', gap: 2 }}>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
          {hasCompare ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, textDecorationLine: 'line-through' }}>
              {format(compareAtCents as number, currency)}
            </Text>
          ) : null}
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>{priceText}</Text>
        </View>
        {durationMin != null ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{durationMin} min</Text>
        ) : null}
      </View>
    </View>
  );
}
