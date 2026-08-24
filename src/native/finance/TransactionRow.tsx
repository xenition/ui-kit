import * as React from 'react';
import { Animated, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Icon } from '../primitives';
import { appearanceStyle, type Appearance } from '../primitives/internal/appearance';
import { usePressScale } from '../primitives/internal/motion';
import { MoneyAmount } from './MoneyAmount';

/** Credit (money in) vs debit (money out). */
export type TransactionDirection = 'income' | 'expense';

export interface TransactionRowProps {
  /** Merchant / counterparty / description. */
  title: string;
  /** Secondary line (category, account, memo). */
  subtitle?: string;
  /** Transaction amount in integer **cents** (magnitude; sign taken from `direction`). */
  amountCents: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /**
   * Income tints the amount `success` and prefixes `+`; expense tints it
   * `danger` and prefixes `−`. Omit to let the sign of `amountCents` drive tone.
   */
  direction?: TransactionDirection;
  /** Right-aligned timestamp string (already localized by the caller). */
  date?: string;
  /** Leading glyph/emoji for the category avatar (e.g. `'☕'`, `'🛒'`). */
  icon?: string;
  /** Accent color slot for the avatar disc (default `primary`). */
  iconColor?: keyof SemanticColors;
  /** Fires on row press. */
  onPress?: () => void;
  /**
   * Surface treatment (visual-diversity preset). Defaults to `classic` —
   * byte-for-byte the historical borderless row, so this is opt-in only.
   */
  appearance?: Appearance;
  style?: StyleProp<ViewStyle>;
}

/**
 * One line in a transaction feed: a tinted category avatar, a title/subtitle
 * stack, and a right-aligned {@link MoneyAmount} over an optional date. The
 * amount tone follows `direction` (income = `success`, expense = `danger`) and
 * the magnitude is integer cents — no float drift. Fully token-bound; becomes a
 * button only when `onPress` is supplied (which also enables a press-scale
 * spring). `appearance` opts the row into an alternate surface treatment.
 */
export function TransactionRow({
  title,
  subtitle,
  amountCents,
  currency = 'USD',
  direction,
  date,
  icon,
  iconColor = 'primary',
  onPress,
  appearance = 'classic',
  style,
}: TransactionRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();

  const signedCents = direction
    ? direction === 'expense'
      ? -Math.abs(amountCents)
      : Math.abs(amountCents)
    : amountCents;

  // Appearance surface goes FIRST; layout (radius/padding) stays AFTER. Classic
  // stays byte-for-byte identical (no surface layer added).
  const surface = appearance === 'classic' ? undefined : appearanceStyle(appearance, colors, tokens);

  const row = (
    <View
      style={[
        surface,
        { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md, paddingVertical: tokens.spacing.sm },
        style,
      ]}
    >
      {icon != null ? (
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: tokens.radius.full,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <Icon glyph={icon} color={iconColor} size="lg" />
        </View>
      ) : null}
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}
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
          size="md"
          signDisplay="always"
        />
        {date != null ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{date}</Text>
        ) : null}
      </View>
    </View>
  );

  if (!onPress) return row;
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
        {row}
      </Pressable>
    </Animated.View>
  );
}
