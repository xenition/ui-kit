import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { StatusPill } from './StatusPill';
import {
  formatMoney,
  safeCents,
  toneColor,
  varianceMeta,
  withAlpha,
  CASH_MOVEMENT_META,
  type CashMovementKind,
  type PosTone,
} from './internal';
import type { CashDrawerRowProps } from './CashDrawerRow';

/** Drop-in for {@link CashDrawerRowProps} — same props, the V4 "register" design. */
export type CashDrawerRowV4Props = CashDrawerRowProps;

/** Signed money movements — in (+) versus out (−). */
const SIGN: Partial<Record<CashMovementKind, '+' | '-'>> = {
  sale: '+',
  payIn: '+',
  refund: '-',
  payOut: '-',
};

/**
 * CashDrawerRow — **V4** "register" design. The tactile checkout take on a
 * cash-movement row: the kind glyph rides in a **soft-tint disc**, the label +
 * optional detail sit beside it, and the **signed amount is big and bold** in
 * tabular numerals — money in reads `success`, money out reads `danger` by sign,
 * always shown with `+`/`−`. For `kind="variance"`, pass `expectedCents` +
 * counted `amountCents` for an over/short/balanced **glyph + word** pill and a
 * signed delta (state by text, never color alone). Same props/behavior as
 * {@link CashDrawerRowProps}; token-only tints via `useXenitionTheme()`.
 */
export function CashDrawerRowV4({
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
}: CashDrawerRowV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = CASH_MOVEMENT_META[kind];
  const isTotal = variant === 'total';

  const isVariance = kind === 'variance' && typeof expectedCents === 'number';
  const variance = isVariance ? varianceMeta(safeCents(expectedCents), safeCents(amountCents)) : null;

  const sign = SIGN[kind];
  const displayCents = variance ? variance.deltaCents : safeCents(amountCents);

  // Amount color: variance → its tone; signed in → success, out → danger.
  const amountTone: PosTone = variance
    ? variance.meta.tone
    : sign === '+'
      ? 'success'
      : sign === '-'
        ? 'danger'
        : 'neutral';
  const amountColor = amountTone === 'neutral' ? colors.onSurface : toneColor(colors, amountTone);

  // Disc tint follows the movement's own tone.
  const discTint = toneColor(colors, meta.tone);

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
          borderRadius: tokens.radius.md,
          paddingHorizontal: tokens.spacing.sm,
          paddingVertical: tokens.spacing.sm,
          borderTopWidth: isTotal ? 1 : 0,
          borderTopColor: colors.border,
          marginTop: isTotal ? tokens.spacing.xs : 0,
        },
        style,
      ]}
    >
      <View style={{ flex: 1, minWidth: 0, flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: tokens.radius.full,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: withAlpha(discTint, 0.14),
          }}
        >
          <Text allowFontScaling={false} style={{ color: discTint, fontSize: tokens.typography.scale.base }}>
            {meta.glyph}
          </Text>
        </View>
        <View style={{ flex: 1, minWidth: 0, gap: 2 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
            <Text
              numberOfLines={1}
              style={{
                color: colors.onSurface,
                fontSize: tokens.typography.scale.sm,
                fontWeight: isTotal ? '700' : '600',
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
      </View>

      <Text
        style={{
          color: amountColor,
          fontSize: isTotal ? tokens.typography.scale.lg : tokens.typography.scale.base,
          fontWeight: '800',
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
