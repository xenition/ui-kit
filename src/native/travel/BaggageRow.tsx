import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, Badge, PriceTag } from '../primitives';

/** The category of baggage. */
export type BaggageKind = 'cabin' | 'personal' | 'checked';

export interface BaggageRowProps {
  /** Baggage category (selects a default glyph + label). */
  kind?: BaggageKind;
  /** Override the row title. */
  label?: string;
  /** Allowance detail, e.g. `'1 × 23 kg'` or `'55 × 40 × 20 cm'`. */
  allowance?: string;
  /** Whether the allowance is included in the fare. */
  included?: boolean;
  /** Extra price in integer minor units (cents) when not included. */
  priceCents?: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  style?: StyleProp<ViewStyle>;
}

const KIND: Record<BaggageKind, { glyph: string; label: string }> = {
  personal: { glyph: '👜', label: 'Personal item' },
  cabin: { glyph: '🧳', label: 'Cabin bag' },
  checked: { glyph: '🧳', label: 'Checked bag' },
};

/**
 * A single baggage-allowance line — a kind glyph, the title, the allowance
 * detail, and a trailing status: an "Included" badge or a fare add-on price.
 * `included` drives both the badge text and the announcement (never
 * color-alone). Token-only colors.
 */
export function BaggageRow({
  kind = 'cabin',
  label,
  allowance,
  included = false,
  priceCents,
  currency = 'USD',
  style,
}: BaggageRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = KIND[kind];
  const title = label ?? meta.label;

  const trailing = included ? (
    <Badge tone="success">Included</Badge>
  ) : typeof priceCents === 'number' ? (
    <PriceTag cents={priceCents} currency={currency} size="sm" />
  ) : (
    <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Not available</Text>
  );

  return (
    <View
      accessible
      accessibilityLabel={`${title}${allowance ? `, ${allowance}` : ''}, ${included ? 'included' : 'extra'}`}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          paddingVertical: tokens.spacing.sm,
        },
        style,
      ]}
    >
      <Text style={{ fontSize: tokens.typography.scale.lg, color: colors.onSurface }}>{meta.glyph}</Text>
      <View style={{ flex: 1, gap: 2 }}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
          {title}
        </Text>
        {allowance ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{allowance}</Text>
        ) : null}
      </View>
      {trailing}
    </View>
  );
}
