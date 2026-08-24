import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Card, Icon, Badge, Button } from '../primitives';
import { formatMoney, type MoneyFormatter, withAlpha } from './internal/format';

/** Rate structure family — an ordered, non-color signal via glyph + label. */
export type RatePlanVariant = 'fixed' | 'variable' | 'time-of-use' | 'tiered' | 'green';

interface VariantDescriptor {
  label: string;
  glyph: string;
}

const VARIANT: Record<RatePlanVariant, VariantDescriptor> = {
  fixed: { label: 'Fixed rate', glyph: '🔒' },
  variable: { label: 'Variable', glyph: '📈' },
  'time-of-use': { label: 'Time-of-use', glyph: '⏱️' },
  tiered: { label: 'Tiered', glyph: '📊' },
  green: { label: '100% renewable', glyph: '🌱' },
};

export interface RatePlanCardProps {
  /** Plan name (e.g. "SimpleSave 12"). */
  name: string;
  /** Rate structure — drives the glyph + label (default `fixed`). */
  variant?: RatePlanVariant;
  /**
   * Price per metered unit in integer **cents** (e.g. 1299 → "$12.99"). Kept as
   * cents so the printed rate never drifts.
   */
  rateCents: number;
  /** Unit the rate is charged per (e.g. "kWh"). */
  unit: string;
  /** Contract term / cadence label (e.g. "12-month term"). */
  term?: string;
  /** Bullet list of plan features. */
  features?: string[];
  /** Marks the plan as the current/selected one (adds a badge + accent ring). */
  selected?: boolean;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Override the cents → string formatter (locale control). */
  formatMoney?: MoneyFormatter;
  /** Select button label (default "Choose plan"). Hidden when no `onSelect`. */
  selectLabel?: string;
  /** Fires when the plan is chosen. */
  onSelect?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A selectable rate-plan card: a per-unit price headline (integer cents via
 * `formatMoney`, so it never drifts), a rate-structure glyph + label, an optional
 * feature list, and a select action. The `selected` state is conveyed by **a
 * badge + label + an accent ring** (never color alone). The select `Button`
 * renders only when `onSelect` is supplied. Every color traces to a
 * `SemanticColors` slot or a `ramps`-derived tint — no literals.
 */
export function RatePlanCard({
  name,
  variant = 'fixed',
  rateCents,
  unit,
  term,
  features,
  selected = false,
  currency = 'USD',
  formatMoney: format = formatMoney,
  selectLabel = 'Choose plan',
  onSelect,
  style,
}: RatePlanCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const vd = VARIANT[variant] ?? VARIANT.fixed;
  const rate = Math.max(0, Math.trunc(rateCents || 0));
  const rows = Array.isArray(features) ? features : [];

  const card = (
    <Card
      variant={selected ? 'elevated' : 'outlined'}
      style={[
        selected
          ? { borderWidth: 2, borderColor: colors.primary, backgroundColor: withAlpha(colors.primary, 0.06) }
          : null,
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <Icon glyph={vd.glyph} size="lg" accessibilityLabel={vd.label} />
        <View style={{ flex: 1, gap: 2 }}>
          <Text
            numberOfLines={1}
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}
          >
            {name}
          </Text>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {vd.label}
            {term != null ? ` · ${term}` : ''}
          </Text>
        </View>
        {selected ? (
          <Badge tone="primary" variant="soft" size="sm">
            {'✓ Current'}
          </Badge>
        ) : null}
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs, marginTop: tokens.spacing.md }}>
        <Text style={{ color: colors.primary, fontSize: tokens.typography.scale['2xl'], fontWeight: '700' }}>
          {format(rate, currency)}
        </Text>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>/{unit}</Text>
      </View>

      {rows.length > 0 ? (
        <View style={{ marginTop: tokens.spacing.md, gap: tokens.spacing.xs }}>
          {rows.map((f, i) => (
            <View key={`${f}-${i}`} style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
              <Icon glyph="✓" size="sm" color="success" accessibilityLabel="included" />
              <Text style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>{f}</Text>
            </View>
          ))}
        </View>
      ) : null}

      {onSelect != null ? (
        <Button
          variant={selected ? 'outline' : 'primary'}
          onPress={onSelect}
          disabled={selected}
          style={{ marginTop: tokens.spacing.md }}
        >
          {selected ? 'Current plan' : selectLabel}
        </Button>
      ) : null}
    </Card>
  );

  // Already the current plan → the card is inert (re-selecting is a no-op).
  if (!onSelect || selected) return card;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={`${name}, ${vd.label}, ${format(rate, currency)} per ${unit}${selected ? ', current plan' : ''}`}
      onPress={onSelect}
      style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
    >
      {card}
    </Pressable>
  );
}
