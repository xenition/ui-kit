import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, Badge, PriceTag } from '../primitives';
import { appearanceStyle, type Appearance } from '../primitives/internal/appearance';

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
  /**
   * Surface treatment (visual diversity). Default `'classic'` — the original
   * borderless row. Any other value wraps the row in that surface (with
   * padding + radius) so it can stand alone as a card-like tile.
   */
  appearance?: Appearance;
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
  appearance = 'classic',
  style,
}: BaggageRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = KIND[kind];
  const title = label ?? meta.label;
  // 'classic' keeps the historical borderless row byte-for-byte; any other
  // appearance opts into a standalone surface with matching padding + radius.
  const surface = appearance === 'classic' ? null : appearanceStyle(appearance, colors, tokens);

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
        surface,
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          paddingVertical: tokens.spacing.sm,
        },
        surface
          ? { paddingHorizontal: tokens.spacing.md, borderRadius: tokens.radius.md }
          : null,
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
