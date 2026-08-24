import * as React from 'react';
import { Pressable, Text, TextInput, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Button } from '../primitives';
import { formatToken } from './internal/format';

/** A token that can sit on either side of the swap. */
export interface SwapToken {
  symbol: string;
  /** Fraction digits used when displaying this token's amount (default 4). */
  decimals?: number;
}

/** The controlled value bag emitted by {@link SwapForm}. */
export interface SwapValues {
  fromSymbol: string;
  toSymbol: string;
  /** Amount of the `from` token, parsed from the input (float). */
  fromAmount: number;
}

export interface SwapFormProps {
  /** The token being sold. */
  from: SwapToken;
  /** The token being bought. */
  to: SwapToken;
  /** Controlled `from` amount (major token units). */
  fromAmount?: number;
  /** Price: how many `to` per 1 `from`. `toAmount = fromAmount * rate`. */
  rate?: number;
  /** Fires on every amount edit with the merged {@link SwapValues}. */
  onChange?: (values: SwapValues) => void;
  /** Fires when the swap-direction control is pressed. */
  onFlip?: () => void;
  /** Fires on a valid submit with the merged {@link SwapValues}. */
  onSubmit?: (values: SwapValues) => void;
  /** Submit label (default `Swap`). */
  submitLabel?: string;
  /** Submit loading state. */
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

/** Parse a user-typed amount to a non-negative float; blank/garbage → 0. */
function parseAmount(text: string): number {
  const cleaned = text.replace(/[^0-9.]/g, '');
  const n = Number.parseFloat(cleaned);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

/**
 * A controlled token-swap panel: an editable `from` amount, a flip control, a
 * derived (read-only) `to` amount computed as `fromAmount * rate` with stable
 * fixed-precision formatting (no float drift on screen), and the effective
 * rate line. Submit is blocked until the amount is positive and the two tokens
 * differ. Token-bound throughout; every edit emits the full {@link SwapValues}.
 */
export function SwapForm({
  from,
  to,
  fromAmount = 0,
  rate,
  onChange,
  onFlip,
  onSubmit,
  submitLabel = 'Swap',
  loading = false,
  style,
}: SwapFormProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const toAmount = rate != null ? fromAmount * rate : undefined;
  const sameToken = from.symbol === to.symbol;
  const canSubmit = fromAmount > 0 && !sameToken;

  const emit = (amount: number): void => {
    onChange?.({ fromSymbol: from.symbol, toSymbol: to.symbol, fromAmount: amount });
  };

  const panelStyle: ViewStyle = {
    gap: tokens.spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: tokens.radius.md,
    backgroundColor: tokens.ramps.neutral[100],
    padding: tokens.spacing.md,
  };

  return (
    <View style={[{ gap: tokens.spacing.sm }, style]}>
      <View style={panelStyle}>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
          You pay
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          <TextInput
            accessibilityLabel="Pay amount"
            keyboardType="decimal-pad"
            value={fromAmount === 0 ? '' : String(fromAmount)}
            placeholder="0.0"
            placeholderTextColor={colors.muted}
            onChangeText={(t) => emit(parseAmount(t))}
            style={{
              flex: 1,
              color: colors.onSurface,
              fontSize: tokens.typography.scale.xl,
              fontWeight: '700',
              padding: 0,
            }}
          />
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
            {from.symbol}
          </Text>
        </View>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Flip swap direction"
        onPress={onFlip}
        disabled={!onFlip}
        style={({ pressed }) => ({
          alignSelf: 'center',
          width: 32,
          height: 32,
          borderRadius: tokens.radius.full,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: pressed ? 0.7 : 1,
        })}
      >
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base }}>⇅</Text>
      </Pressable>

      <View style={panelStyle}>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
          You receive
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          <Text
            accessibilityLabel="Receive amount"
            style={{ flex: 1, color: toAmount != null ? colors.onSurface : colors.muted, fontSize: tokens.typography.scale.xl, fontWeight: '700', fontVariant: ['tabular-nums'] }}
          >
            {toAmount != null ? formatToken(toAmount, { decimals: to.decimals ?? 4 }) : '—'}
          </Text>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
            {to.symbol}
          </Text>
        </View>
      </View>

      {rate != null ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontVariant: ['tabular-nums'] }}>
          {`1 ${from.symbol} ≈ ${formatToken(rate, { decimals: to.decimals ?? 4 })} ${to.symbol}`}
        </Text>
      ) : null}

      {sameToken ? (
        <Text style={{ color: colors.danger, fontSize: tokens.typography.scale.xs }}>
          Choose two different tokens.
        </Text>
      ) : null}

      <Button
        onPress={() => onSubmit?.({ fromSymbol: from.symbol, toSymbol: to.symbol, fromAmount })}
        disabled={!canSubmit}
        loading={loading}
      >
        {submitLabel}
      </Button>
    </View>
  );
}
