import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { formatMoney as defaultFormat, type MoneyFormatter } from '../commerce';

/** How many options may be selected at once. */
export type ModifierSelectionMode = 'single' | 'multi';

export interface ModifierOption {
  /** Stable id passed back to `onToggle`. */
  id: string;
  /** Human label (e.g. "Extra cheese"). */
  label: string;
  /** Price delta in integer cents (e.g. +150). Zero/absent shows nothing. */
  priceCents?: number;
  /** Whether this option is currently selected. */
  selected?: boolean;
  /** Disable this individual option. */
  disabled?: boolean;
}

export interface ModifierListProps {
  /** Options to render. When empty an `emptyLabel` row is shown. */
  options: ModifierOption[];
  /** `single` (radio) or `multi` (checkbox) selection (default `multi`). */
  mode?: ModifierSelectionMode;
  /** Group heading (e.g. "Add-ons", "Choose a size"). */
  title?: string;
  /** Marks the group required; renders a "Required" hint next to the title. */
  required?: boolean;
  /** Fired with the toggled option id. */
  onToggle?: (id: string) => void;
  /** ISO 4217 currency code for price deltas (default `USD`). */
  currency?: string;
  /** Copy shown when `options` is empty (default `No options`). */
  emptyLabel?: string;
  /** Override the cents → string formatter. */
  formatMoney?: MoneyFormatter;
  style?: StyleProp<ViewStyle>;
}

/**
 * A selectable list of dish modifiers / add-ons. `mode` picks the semantics:
 * `single` behaves like a radio group (announced as `radio`), `multi` like
 * checkboxes (announced as `checkbox`). Each row shows its label, a signed
 * price delta, and a token-drawn check/dot indicator whose selected state is
 * carried in `accessibilityState` (not color alone). Renders an empty row when
 * there are no options. Token-only.
 */
export function ModifierList({
  options,
  mode = 'multi',
  title,
  required = false,
  onToggle,
  currency = 'USD',
  emptyLabel = 'No options',
  formatMoney = defaultFormat,
  style,
}: ModifierListProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const single = mode === 'single';

  return (
    <View style={[{ gap: tokens.spacing.sm }, style]}>
      {title ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text
            accessibilityRole="header"
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}
          >
            {title}
          </Text>
          {required ? (
            <Text style={{ color: colors.danger, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
              Required
            </Text>
          ) : null}
        </View>
      ) : null}

      {options.length === 0 ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{emptyLabel}</Text>
      ) : (
        <View
          accessibilityRole={single ? 'radiogroup' : undefined}
          style={{
            borderRadius: tokens.radius.md,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.surface,
            overflow: 'hidden',
          }}
        >
          {options.map((option, index) => {
            const selected = option.selected === true;
            const delta = typeof option.priceCents === 'number' && option.priceCents !== 0;
            return (
              <Pressable
                key={option.id}
                accessibilityRole={single ? 'radio' : 'checkbox'}
                accessibilityState={{ checked: selected, disabled: option.disabled }}
                accessibilityLabel={option.label}
                disabled={option.disabled}
                onPress={() => onToggle?.(option.id)}
                style={({ pressed }) => ({
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: tokens.spacing.sm,
                  paddingVertical: tokens.spacing.sm,
                  paddingHorizontal: tokens.spacing.md,
                  borderTopWidth: index === 0 ? 0 : 1,
                  borderTopColor: colors.border,
                  opacity: option.disabled ? 0.5 : pressed ? 0.8 : 1,
                })}
              >
                <View
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: single ? tokens.radius.full : tokens.radius.sm,
                    borderWidth: 2,
                    borderColor: selected ? colors.primary : colors.border,
                    backgroundColor: selected ? colors.primary : colors.surface,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {selected ? (
                    <Text style={{ color: colors.onPrimary, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
                      {single ? '●' : '✓'}
                    </Text>
                  ) : null}
                </View>
                <Text style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>
                  {option.label}
                </Text>
                {delta ? (
                  <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
                    {(option.priceCents as number) > 0 ? '+' : '−'}
                    {formatMoney(Math.abs(option.priceCents as number), currency)}
                  </Text>
                ) : null}
              </Pressable>
            );
          })}
        </View>
      )}
    </View>
  );
}
