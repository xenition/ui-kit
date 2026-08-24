import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives';
import { usePressScale } from '../primitives/internal/motion';
import { shadow } from '../primitives/internal/elevation';
import { withAlpha } from '../primitives/internal/color';
import { MoneyAmount } from './MoneyAmount';
import type { TransactionRowProps } from './TransactionRow';

/** Same public contract as {@link TransactionRow} — a drop-in alternate design. */
export type TransactionRowV2Props = TransactionRowProps;

/**
 * TransactionRow, redesigned (v2): an elevated **card row**. The category glyph
 * sits in a rounded, tinted tile on the left; the title stacks over a "running
 * note" subtitle; and the signed {@link MoneyAmount} is rendered large and bold
 * on the right over its date. Distinct at a glance from v1's borderless
 * avatar-disc row. Same props, integer-cents money, token-pure throughout.
 */
export function TransactionRowV2({
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
}: TransactionRowV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();

  const signedCents = direction
    ? direction === 'expense'
      ? -Math.abs(amountCents)
      : Math.abs(amountCents)
    : amountCents;

  const tint = colors[iconColor];

  const body = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          padding: tokens.spacing.md,
          borderRadius: tokens.radius.lg,
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
          ...shadow('sm', tokens),
        },
        style,
      ]}
    >
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: tokens.radius.md,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: withAlpha(tint, 0.12),
        }}
      >
        <Icon glyph={icon ?? '•'} color={iconColor} size="lg" />
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
        >
          {title}
        </Text>
        {subtitle != null ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      <View style={{ alignItems: 'flex-end', gap: 2 }}>
        <MoneyAmount
          cents={signedCents}
          currency={currency}
          tone={direction ?? 'auto'}
          size="lg"
          signDisplay="always"
        />
        {date != null ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{date}</Text>
        ) : null}
      </View>
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
        style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
      >
        {body}
      </Pressable>
    </Animated.View>
  );
}
