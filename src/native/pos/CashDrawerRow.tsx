import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { StatusPill } from './StatusPill';
import {
  formatMoney,
  safeCents,
  toneColor,
  varianceMeta,
  CASH_MOVEMENT_META,
  type CashMovementKind,
  type PosTone,
} from './internal';

export type CashDrawerRowVariant = 'default' | 'total';

export interface CashDrawerRowProps {
  /** Movement kind — drives the glyph + default label. */
  kind: CashMovementKind;
  /** Override the default movement label. */
  label?: string;
  /** Amount in integer **cents**. */
  amountCents: number;
  /** ISO 4217 currency (default USD). */
  currency?: string;
  /**
   * For `kind="variance"`: the expected amount to compare `amountCents`
   * (counted) against — resolves an over/short/balanced pill and signed delta.
   */
  expectedCents?: number;
  /** Optional muted sub-line (e.g. count of transactions). */
  detail?: string;
  /** Tap handler (e.g. drill into the movement). */
  onPress?: () => void;
  /** `total` renders emphasized (bold, top rule) for a subtotal/expected line. */
  variant?: CashDrawerRowVariant;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

const SIGN: Partial<Record<CashMovementKind, '+' | '-'>> = {
  sale: '+',
  payIn: '+',
  refund: '-',
  payOut: '-',
};

/**
 * One row of a cash-drawer count / register audit: opening float, cash sales,
 * pay-ins/outs, expected, counted, and the variance. Money is integer **cents**
 * via `formatMoney`, with in/out movements signed. For `kind="variance"`, pass
 * `expectedCents` and the counted `amountCents` to draw an over/short/balanced
 * **glyph + word** pill and a signed delta — state by text, never color alone.
 * Token-only.
 */
export function CashDrawerRow({
  kind,
  label,
  amountCents,
  currency = 'USD',
  expectedCents,
  detail,
  onPress,
  variant = 'default',
  testID,
  style,
}: CashDrawerRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = CASH_MOVEMENT_META[kind];
  const isTotal = variant === 'total';

  const isVariance = kind === 'variance' && typeof expectedCents === 'number';
  const variance = isVariance ? varianceMeta(safeCents(expectedCents), safeCents(amountCents)) : null;

  const sign = SIGN[kind];
  const displayCents = variance ? variance.deltaCents : safeCents(amountCents);
  const amountTone: PosTone = variance ? variance.meta.tone : 'neutral';
  const amountColor = variance ? toneColor(colors, amountTone) : colors.onSurface;
  const prefix = variance
    ? variance.deltaCents > 0
      ? '+'
      : variance.deltaCents < 0
        ? '−'
        : ''
    : sign === '+'
      ? '+'
      : sign === '-'
        ? '−'
        : '';

  const content = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: tokens.spacing.md,
          paddingVertical: tokens.spacing.sm,
          borderTopWidth: isTotal ? 1 : 0,
          borderTopColor: colors.border,
        },
        style,
      ]}
    >
      <View style={{ flex: 1, minWidth: 0, gap: 2 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Text allowFontScaling={false} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            {meta.glyph}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              color: colors.onSurface,
              fontSize: tokens.typography.scale.sm,
              fontWeight: isTotal ? '700' : '500',
            }}
          >
            {label ?? meta.label}
          </Text>
          {variance ? <StatusPill meta={variance.meta} variant="inline" size="sm" /> : null}
        </View>
        {detail ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {detail}
          </Text>
        ) : null}
      </View>

      <Text
        style={{
          color: amountColor,
          fontSize: isTotal ? tokens.typography.scale.base : tokens.typography.scale.sm,
          fontWeight: isTotal || variance ? '700' : '500',
        }}
      >
        {prefix}
        {formatMoney(Math.abs(displayCents), currency)}
      </Text>
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${label ?? meta.label}, ${formatMoney(Math.abs(displayCents), currency)}`}
        onPress={onPress}
        testID={testID}
      >
        {content}
      </Pressable>
    );
  }
  return <View testID={testID}>{content}</View>;
}
