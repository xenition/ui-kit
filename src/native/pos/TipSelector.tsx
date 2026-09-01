import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { formatMoney } from './internal';

/**
 * Props for {@link TipSelector} — a big-target tip-percentage picker for the
 * register. Presentational only: the caller owns the selection state and
 * receives callbacks. Amounts are computed from `subtotalCents` (integer
 * **cents**) for display; the selected value is echoed back via callbacks.
 */
export interface TipSelectorProps {
  /** Base amount the tip percentage is applied to, in integer **cents**. */
  subtotalCents: number;
  /** ISO 4217 currency code for the computed amounts. Defaults to `'USD'`. */
  currency?: string;
  /** Preset tip percentages to offer. Defaults to `[15, 18, 20]`. */
  percents?: readonly number[];
  /** Currently selected preset percentage, or `null` for none/custom/no-tip. */
  selectedPercent?: number | null;
  /**
   * Explicit custom tip amount in integer **cents**, or `null` when no custom
   * tip is set. When non-null, the Custom option is shown as selected.
   */
  customCents?: number | null;
  /** Fired with the chosen preset percentage when a preset is pressed. */
  onSelectPercent?: (percent: number) => void;
  /** Fired when the "No tip" option is pressed. */
  onNoTip?: () => void;
  /**
   * Fired when the "Custom" option is pressed. When omitted, the Custom option
   * is not rendered.
   */
  onCustom?: () => void;
  /** Optional test id forwarded to the root view. */
  testID?: string;
}

/** Compute a tip amount (integer cents) from a subtotal and a percentage. */
function tipCentsFor(subtotalCents: number, percent: number): number {
  return Math.round((subtotalCents * percent) / 100);
}

/**
 * TipSelector — **V4** "register" design. A `radiogroup` of big (≥44px) tip
 * options: each preset shows the **% bold** and the computed amount
 * (`subtotal × pct / 100`) in `tabular-nums` below, plus a "No tip" and an
 * optional "Custom" option. The selected option fills **solid primary** with
 * on-primary ink; the rest stay calm on `surface`. Presentational only —
 * selection is driven by props and reported via callbacks. Token-only colors
 * via `useXenitionTheme()`, dark-mode safe.
 */
export function TipSelector({
  subtotalCents,
  currency = 'USD',
  percents = [15, 18, 20],
  selectedPercent,
  customCents,
  onSelectPercent,
  onNoTip,
  onCustom,
  testID,
}: TipSelectorProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const customSelected = typeof customCents === 'number' && customCents != null;
  const noTipSelected = (selectedPercent === null || selectedPercent === undefined) && !customSelected;

  const renderOption = (
    key: string,
    selected: boolean,
    ariaLabel: string,
    top: string,
    bottom: string | undefined,
    onPress?: () => void
  ): React.ReactElement => (
    <Pressable
      key={key}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      accessibilityLabel={ariaLabel}
      onPress={onPress}
      style={({ pressed }) => ({
        flexGrow: 1,
        flexBasis: 72,
        minHeight: 44,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        borderRadius: tokens.radius.md,
        borderWidth: 1,
        borderColor: selected ? colors.primary : colors.border,
        backgroundColor: selected ? colors.primary : colors.card,
        paddingVertical: tokens.spacing.sm,
        paddingHorizontal: tokens.spacing.sm,
        opacity: pressed && !selected ? 0.92 : 1,
        ...(selected
          ? { shadowColor: colors.primary, shadowOpacity: 0.18, shadowRadius: 8, shadowOffset: { width: 0, height: 3 }, elevation: 2 }
          : null),
      })}
    >
      <Text
        style={{
          color: selected ? colors.onPrimary : colors.onSurface,
          fontSize: tokens.typography.scale.base,
          fontWeight: '800',
          fontVariant: ['tabular-nums'],
        }}
      >
        {top}
      </Text>
      {bottom != null ? (
        <Text
          style={{
            color: selected ? colors.onPrimary : colors.muted,
            fontSize: tokens.typography.scale.xs,
            fontVariant: ['tabular-nums'],
          }}
        >
          {bottom}
        </Text>
      ) : null}
    </Pressable>
  );

  return (
    <View
      accessibilityRole="radiogroup"
      accessibilityLabel="Tip amount"
      testID={testID}
      style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }}
    >
      {renderOption('none', noTipSelected, 'No tip', 'No tip', undefined, onNoTip)}

      {percents.map((pct) => {
        const amount = tipCentsFor(subtotalCents, pct);
        const selected = selectedPercent === pct && !customSelected;
        return renderOption(
          `pct-${pct}`,
          selected,
          `Tip ${pct}%, ${formatMoney(amount, currency)}`,
          `${pct}%`,
          formatMoney(amount, currency),
          () => onSelectPercent?.(pct)
        );
      })}

      {onCustom
        ? renderOption(
            'custom',
            customSelected,
            customSelected ? `Custom tip, ${formatMoney(customCents as number, currency)}` : 'Custom tip',
            'Custom',
            customSelected ? formatMoney(customCents as number, currency) : undefined,
            onCustom
          )
        : null}
    </View>
  );
}
