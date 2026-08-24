import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Switch } from '../primitives';
import { formatPrice } from './internal/format';

/** Fire when the price crosses above / below the target. */
export type AlertCondition = 'above' | 'below';

export interface PriceAlertRowProps {
  /** Asset symbol the alert watches (e.g. `BTC`). */
  symbol: string;
  /** Trigger direction. */
  condition: AlertCondition;
  /** Target price in fiat major units. */
  targetPrice: number;
  /** Optional current price, shown for context. */
  currentPrice?: number;
  /** Fiat symbol (default `$`). */
  currencySymbol?: string;
  /** Fraction digits for prices (default `2`). */
  decimals?: number;
  /** Whether the alert is armed. */
  enabled?: boolean;
  /** Fires with the next enabled state when the switch is toggled. */
  onToggle?: (enabled: boolean) => void;
  style?: StyleProp<ViewStyle>;
}

const CONDITION_META: Record<AlertCondition, { label: string; glyph: string; slot: keyof SemanticColors }> = {
  above: { label: 'Above', glyph: '▲', slot: 'success' },
  below: { label: 'Below', glyph: '▼', slot: 'danger' },
};

/**
 * One configurable price alert: the watched symbol, a condition line (glyph +
 * `Above`/`Below` label, so direction is not color-only) with the target
 * price, an optional current-price context line, and a {@link Switch} to arm
 * or disarm it. Prices are fixed-precision — no float drift. The whole row's
 * opacity drops while disabled to reinforce the state beyond the switch alone.
 */
export function PriceAlertRow({
  symbol,
  condition,
  targetPrice,
  currentPrice,
  currencySymbol = '$',
  decimals = 2,
  enabled = false,
  onToggle,
  style,
}: PriceAlertRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = CONDITION_META[condition];

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          paddingVertical: tokens.spacing.sm,
          opacity: enabled ? 1 : 0.6,
        },
        style,
      ]}
    >
      <View style={{ flex: 1, gap: 2 }}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
          {symbol}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Text style={{ color: colors[meta.slot], fontSize: tokens.typography.scale.sm }}>{meta.glyph}</Text>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{meta.label}</Text>
          <Text
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600', fontVariant: ['tabular-nums'] }}
          >
            {formatPrice(targetPrice, { symbol: currencySymbol, decimals })}
          </Text>
        </View>
        {currentPrice != null ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontVariant: ['tabular-nums'] }}>
            {`Now ${formatPrice(currentPrice, { symbol: currencySymbol, decimals })}`}
          </Text>
        ) : null}
      </View>

      <Switch
        checked={enabled}
        onCheckedChange={onToggle}
        accessibilityLabel={`${symbol} alert ${meta.label.toLowerCase()} ${formatPrice(targetPrice, { symbol: currencySymbol, decimals })}`}
      />
    </View>
  );
}
