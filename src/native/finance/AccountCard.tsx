import * as React from 'react';
import { Animated, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Card, Icon } from '../primitives';
import { appearanceStyle, type Appearance } from '../primitives/internal/appearance';
import { usePressScale } from '../primitives/internal/motion';
import { MoneyAmount } from './MoneyAmount';
import { maskAccountNumber } from './internal/mask';

/** The kind of account a card represents. */
export type AccountVariant = 'checking' | 'savings' | 'credit';

export interface AccountCardProps {
  /** Account display name (e.g. "Everyday Checking"). */
  name: string;
  /** Account kind — drives the accent color slot and default glyph. */
  variant: AccountVariant;
  /** Current balance in integer **cents** (may be negative for credit). */
  balanceCents: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Full or partial account/card number; shown masked to the last four. */
  accountNumber?: string;
  /** Override the leading glyph (defaults per variant). */
  icon?: string;
  /** Fires on card press. */
  onPress?: () => void;
  /**
   * Surface treatment (visual-diversity preset). Defaults to `classic` —
   * byte-for-byte the historical bordered card, so this is opt-in only.
   */
  appearance?: Appearance;
  style?: StyleProp<ViewStyle>;
}

const VARIANT_META: Record<
  AccountVariant,
  { accent: keyof SemanticColors; glyph: string; label: string }
> = {
  checking: { accent: 'primary', glyph: '🏦', label: 'Checking' },
  savings: { accent: 'success', glyph: '🐖', label: 'Savings' },
  credit: { accent: 'accent', glyph: '💳', label: 'Credit' },
};

/**
 * A single account tile: a tinted variant glyph + name/type header over the
 * balance. `variant` selects the accent `SemanticColors` slot (`checking` →
 * primary, `savings` → success, `credit` → accent) and a default glyph; the
 * balance is integer cents rendered through {@link MoneyAmount} (neutral tone,
 * so a positive balance is not colored "income" green). Token-bound throughout.
 */
export function AccountCard({
  name,
  variant,
  balanceCents,
  currency = 'USD',
  accountNumber,
  icon,
  onPress,
  appearance = 'classic',
  style,
}: AccountCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = VARIANT_META[variant];
  const press = usePressScale();

  // Appearance overrides the Card's default surface; classic → the Card's own
  // outlined look, unchanged. Card keeps its radius/padding.
  const surface = appearance === 'classic' ? undefined : appearanceStyle(appearance, colors, tokens);

  const body = (
    <Card style={[surface, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: tokens.radius.md,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors[meta.accent],
          }}
        >
          <Icon glyph={icon ?? meta.glyph} color={meta.accent} size="lg" />
        </View>
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
      </View>
      <View style={{ marginTop: tokens.spacing.md, gap: 2 }}>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Balance</Text>
        <MoneyAmount cents={balanceCents} currency={currency} tone="neutral" size="lg" />
      </View>
    </Card>
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
        style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
      >
        {body}
      </Pressable>
    </Animated.View>
  );
}
