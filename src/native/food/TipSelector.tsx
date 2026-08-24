import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { formatMoney as defaultFormat, type MoneyFormatter } from '../commerce';

export interface TipSelectorProps {
  /** Selectable tip percentages (default `[10, 15, 20, 25]`). */
  percents?: number[];
  /** Currently selected percentage, or `null` for "no tip". */
  selectedPercent?: number | null;
  /** Fired with the chosen percentage (or `null` when "No tip" is picked). */
  onSelect?: (percent: number | null) => void;
  /**
   * Order subtotal in integer cents. When provided, each option shows the
   * computed tip amount under its percentage.
   */
  subtotalCents?: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Group heading (default `Add a tip`). */
  title?: string;
  /** Include a "No tip" option (default `true`). */
  allowNone?: boolean;
  /** Override the cents → string formatter. */
  formatMoney?: MoneyFormatter;
  style?: StyleProp<ViewStyle>;
}

const DEFAULT_PERCENTS = [10, 15, 20, 25];

/**
 * A row of tip-percentage options rendered as a radio-style segmented control.
 * Each option shows its percentage and, when `subtotalCents` is given, the
 * computed amount. The selected option fills with the `primary` token pair and
 * carries `accessibilityState.checked` so selection is not signalled by color
 * alone. An optional leading "No tip" option emits `null`. Token-only.
 */
export function TipSelector({
  percents = DEFAULT_PERCENTS,
  selectedPercent,
  onSelect,
  subtotalCents,
  currency = 'USD',
  title = 'Add a tip',
  allowNone = true,
  formatMoney = defaultFormat,
  style,
}: TipSelectorProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  type Choice = { key: string; percent: number | null; label: string };
  const choices: Choice[] = [
    ...(allowNone ? [{ key: 'none', percent: null as number | null, label: 'No tip' }] : []),
    ...percents.map((p) => ({ key: String(p), percent: p as number | null, label: `${p}%` })),
  ];

  return (
    <View style={[{ gap: tokens.spacing.sm }, style]}>
      {title ? (
        <Text
          accessibilityRole="header"
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}
        >
          {title}
        </Text>
      ) : null}
      <View accessibilityRole="radiogroup" style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
        {choices.map((choice) => {
          const selected =
            choice.percent === null
              ? selectedPercent === null || selectedPercent === undefined
              : selectedPercent === choice.percent;
          const amount =
            choice.percent !== null && typeof subtotalCents === 'number'
              ? Math.round((subtotalCents * choice.percent) / 100)
              : null;

          return (
            <Pressable
              key={choice.key}
              accessibilityRole="radio"
              accessibilityState={{ selected, checked: selected }}
              accessibilityLabel={
                amount !== null ? `${choice.label}, ${formatMoney(amount, currency)}` : choice.label
              }
              onPress={() => onSelect?.(choice.percent)}
              style={({ pressed }) => ({
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.xs,
                borderRadius: tokens.radius.md,
                borderWidth: 1,
                borderColor: selected ? colors.primary : colors.border,
                backgroundColor: selected ? colors.primary : colors.surface,
                opacity: pressed ? 0.85 : 1,
              })}
            >
              <Text
                style={{
                  color: selected ? colors.onPrimary : colors.onSurface,
                  fontSize: tokens.typography.scale.sm,
                  fontWeight: '700',
                }}
              >
                {choice.label}
              </Text>
              {amount !== null ? (
                <Text
                  style={{
                    color: selected ? colors.onPrimary : colors.muted,
                    fontSize: tokens.typography.scale.xs,
                  }}
                >
                  {formatMoney(amount, currency)}
                </Text>
              ) : null}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
