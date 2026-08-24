import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { usePressScale } from '../primitives/internal/motion';
import { MoneyAmount } from './MoneyAmount';
import { maskAccountNumber } from './internal/mask';
import type { AccountCardProps, AccountVariant } from './AccountCard';

/** Same public contract as {@link AccountCard} — a drop-in alternate design. */
export type AccountCardV3Props = AccountCardProps;

const VARIANT_META: Record<
  AccountVariant,
  { accent: keyof SemanticColors; glyph: string; label: string }
> = {
  checking: { accent: 'primary', glyph: '🏦', label: 'Checking' },
  savings: { accent: 'success', glyph: '🐖', label: 'Savings' },
  credit: { accent: 'accent', glyph: '💳', label: 'Credit' },
};

/**
 * AccountCard, redesigned (v3): a **minimal list row**. A single colored account
 * dot (the variant accent) leads a name / type stack, with the balance right-
 * aligned through {@link MoneyAmount}. No card, no glyph tile — a hairline base
 * rule is the only separation, so a stack of these reads as a lean account list.
 * Distinct at a glance from v1's bordered card and v2's card face. Same props.
 */
export function AccountCardV3({
  name,
  variant,
  balanceCents,
  currency = 'USD',
  accountNumber,
  onPress,
  style,
}: AccountCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = VARIANT_META[variant];
  const press = usePressScale();

  const body = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          paddingVertical: tokens.spacing.sm,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        style,
      ]}
    >
      <View
        style={{
          width: 10,
          height: 10,
          borderRadius: tokens.radius.full,
          backgroundColor: colors[meta.accent],
        }}
      />
      <View style={{ flex: 1 }}>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}
        >
          {name}
        </Text>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          {accountNumber != null ? maskAccountNumber(accountNumber) : meta.label}
        </Text>
      </View>
      <MoneyAmount cents={balanceCents} currency={currency} tone="neutral" size="md" />
    </View>
  );

  if (!onPress) return body;
  return (
    <Animated.View style={{ transform: [{ scale: press.scale }] }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${name}, ${meta.label} account`}
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
