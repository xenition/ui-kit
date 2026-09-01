import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Icon, Badge, Button } from '../primitives';
import { formatMoney, withAlpha } from './internal/format';
import { GradientSurface } from './internal/GradientSurface';
import { brandDisc, brandInk } from './internal/brand';
import type { RatePlanCardProps, RatePlanVariant } from './RatePlanCard';

/** Drop-in for {@link RatePlanCardProps} — same props, a different design. */
export type RatePlanCardV4Props = RatePlanCardProps;

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

/**
 * RatePlanCard — **V4** design. A clean, elevated rate-plan card: the
 * rate-structure glyph in the signature brand-gradient disc, a per-unit price
 * headline (integer cents via `formatMoney`, so it never drifts), an optional
 * feature list, and a select action. The `selected` state stays conveyed by a
 * badge + label + an accent ring (never color alone) and the CTA becomes inert.
 * Same props/variants as {@link RatePlanCardProps}; token-only colors.
 */
export function RatePlanCardV4({
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
}: RatePlanCardV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const vd = VARIANT[variant] ?? VARIANT.fixed;
  const rate = Math.max(0, Math.trunc(rateCents || 0));
  const rows = Array.isArray(features) ? features : [];

  const cardStyle = {
    backgroundColor: colors.card,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.lg,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.1,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  } as const;

  const card = (
    <View
      style={[
        cardStyle,
        selected
          ? { borderWidth: 2, borderColor: colors.primary, backgroundColor: withAlpha(colors.primary, 0.06) }
          : null,
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        <GradientSurface
          colors={brandDisc(r)}
          style={{ width: 48, height: 48, borderRadius: tokens.radius.md, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
        >
          <Icon glyph={vd.glyph} size="xl" accessibilityLabel={vd.label} style={{ color: brandInk(r) }} />
        </GradientSurface>
        <View style={{ flex: 1, gap: 2 }}>
          <Text
            numberOfLines={1}
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}
          >
            {name}
          </Text>
          <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs }}>
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
        <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.sm }}>/{unit}</Text>
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
    </View>
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
