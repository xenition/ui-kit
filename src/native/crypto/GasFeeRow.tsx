import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { MoneyAmount } from '../finance/MoneyAmount';
import { formatToken } from './internal/format';

/** Relative confirmation speed of a fee tier. */
export type GasSpeed = 'slow' | 'average' | 'fast';

export interface GasFeeRowProps {
  /** Fee tier — drives the label, glyph, and accent slot. */
  speed: GasSpeed;
  /** Gas price in gwei. */
  gwei: number;
  /** Estimated total cost in integer **cents** (fiat). */
  costCents?: number;
  /** ISO 4217 currency for the cost (default `USD`). */
  currency?: string;
  /** Human ETA (e.g. `~30s`, `~2m`). */
  eta?: string;
  /** Whether this tier is the selected one. */
  selected?: boolean;
  /** Fires with the `speed` when the row is pressed (selectable list). */
  onSelect?: (speed: GasSpeed) => void;
  style?: StyleProp<ViewStyle>;
}

const SPEED_META: Record<GasSpeed, { label: string; glyph: string; slot: keyof SemanticColors }> = {
  slow: { label: 'Slow', glyph: '🐢', slot: 'muted' },
  average: { label: 'Average', glyph: '🚶', slot: 'primary' },
  fast: { label: 'Fast', glyph: '⚡', slot: 'success' },
};

/**
 * One selectable gas-fee tier: a glyph + speed label (so the tier is not
 * distinguished by color alone), the gwei price, an optional ETA, and a fiat
 * cost estimate (via {@link MoneyAmount} — no float drift). When `selected` the
 * row gains a primary-ramp tint and an accessibility `selected` state.
 */
export function GasFeeRow({
  speed,
  gwei,
  costCents,
  currency = 'USD',
  eta,
  selected = false,
  onSelect,
  style,
}: GasFeeRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = SPEED_META[speed];

  const body = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.sm,
          borderRadius: tokens.radius.md,
          borderWidth: 1,
          borderColor: selected ? colors.primary : colors.border,
          backgroundColor: selected ? tokens.ramps.primary[100] : colors.surface,
        },
        style,
      ]}
    >
      <Text style={{ fontSize: tokens.typography.scale.lg }}>{meta.glyph}</Text>
      <View style={{ flex: 1, gap: 2 }}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
          {meta.label}
        </Text>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontVariant: ['tabular-nums'] }}>
          {formatToken(gwei, { decimals: 2, symbol: 'gwei' })}
          {eta != null ? ` · ${eta}` : ''}
        </Text>
      </View>
      {costCents != null ? (
        <MoneyAmount cents={costCents} currency={currency} tone="neutral" size="sm" />
      ) : null}
    </View>
  );

  if (!onSelect) return body;
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      accessibilityLabel={`${meta.label} gas`}
      onPress={() => onSelect(speed)}
      style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
    >
      {body}
    </Pressable>
  );
}
