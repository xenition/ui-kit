import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { usePressScale } from '../primitives/internal/motion';
import { MoneyAmount } from './MoneyAmount';
import type { TransactionRowProps } from './TransactionRow';

/** Same public contract as {@link TransactionRow} — a drop-in alternate design. */
export type TransactionRowV3Props = TransactionRowProps;

/**
 * TransactionRow, redesigned (v3): a **minimal dense line**. A tiny colored
 * status glyph leads, the title and (middot-joined) subtitle share one flexible
 * line, and the signed amount hugs the right edge. No avatar disc, no card —
 * tuned for long, scannable feeds. Distinct at a glance from v1/v2. Same props,
 * integer-cents money, token-pure.
 */
export function TransactionRowV3({
  title,
  subtitle,
  amountCents,
  currency = 'USD',
  direction,
  date,
  icon,
  iconColor = 'primary',
  onPress,
  style,
}: TransactionRowV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();

  const signedCents = direction
    ? direction === 'expense'
      ? -Math.abs(amountCents)
      : Math.abs(amountCents)
    : amountCents;

  const meta = [subtitle, date].filter((s): s is string => s != null).join(' · ');

  const body = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.xs,
        },
        style,
      ]}
    >
      {icon != null ? (
        <Text style={{ fontSize: tokens.typography.scale.sm }}>{icon}</Text>
      ) : (
        <View
          style={{
            width: 6,
            height: 6,
            borderRadius: tokens.radius.full,
            backgroundColor: colors[iconColor],
          }}
        />
      )}
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}
        >
          {title}
        </Text>
        {meta !== '' ? (
          <Text
            numberOfLines={1}
            style={{ flex: 1, color: colors.muted, fontSize: tokens.typography.scale.xs }}
          >
            {meta}
          </Text>
        ) : null}
      </View>
      <MoneyAmount
        cents={signedCents}
        currency={currency}
        tone={direction ?? 'auto'}
        size="sm"
        signDisplay="always"
      />
    </View>
  );

  if (!onPress) return body;
  return (
    <Animated.View style={{ transform: [{ scale: press.scale }] }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={title}
        onPress={onPress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
      >
        {body}
      </Pressable>
    </Animated.View>
  );
}
