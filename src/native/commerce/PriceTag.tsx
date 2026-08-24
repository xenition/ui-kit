import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { formatMoney, type MoneyFormatter } from './money';

export interface PriceTagProps {
  /** Current price in integer cents. */
  cents: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Optional "was" price in cents; struck through when higher than `cents`. */
  compareAtCents?: number;
  /** Override the cents → string formatter (locale control). */
  formatMoney?: MoneyFormatter;
  /** Visual scale of the current price (default `md`). */
  size?: 'sm' | 'md' | 'lg';
  style?: StyleProp<ViewStyle>;
}

const SIZE_KEY: Record<NonNullable<PriceTagProps['size']>, 'sm' | 'base' | 'xl'> = {
  sm: 'sm',
  md: 'base',
  lg: 'xl',
};

/**
 * Formatted price with an optional strikethrough "compare-at" — the native
 * mirror of the web `PriceTag`. All money is integer cents formatted through
 * {@link formatMoney} (overridable via `formatMoney`). Token-only: the current
 * price reads `on-surface`, the struck original is `muted`.
 */
export function PriceTag({
  cents,
  currency = 'USD',
  compareAtCents,
  formatMoney: format = formatMoney,
  size = 'md',
  style,
}: PriceTagProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const hasCompare = typeof compareAtCents === 'number' && compareAtCents > cents;

  return (
    <View
      style={[{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, style]}
    >
      <Text
        style={{
          color: colors.onSurface,
          fontSize: tokens.typography.scale[SIZE_KEY[size]],
          fontWeight: '600',
        }}
      >
        {format(cents, currency)}
      </Text>
      {hasCompare ? (
        <Text
          style={{
            color: colors.muted,
            fontSize: tokens.typography.scale.sm,
            textDecorationLine: 'line-through',
          }}
        >
          {format(compareAtCents as number, currency)}
        </Text>
      ) : null}
    </View>
  );
}
