import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme, Badge, PriceTag } from '../primitives';
import { GradientSurface } from './internal/GradientSurface';
import { journeyDisc, journeyInk } from './internal/journey';
import type { BaggageRowProps, BaggageKind } from './BaggageRow';

/** Drop-in for {@link BaggageRowProps} — same props, the V4 "journey" design. */
export type BaggageRowV4Props = BaggageRowProps;

const KIND: Record<BaggageKind, { glyph: string; label: string }> = {
  personal: { glyph: '👜', label: 'Personal item' },
  cabin: { glyph: '🧳', label: 'Cabin bag' },
  checked: { glyph: '🧳', label: 'Checked bag' },
};

/**
 * BaggageRow — **V4** "journey" design. The boarding-pass take on a
 * baggage-allowance line: the baggage-kind glyph sits in a small brand-gradient
 * disc (the signature V4 touch), followed by the title and the allowance detail,
 * then a trailing status — an "Included" success badge when the allowance is in
 * the fare, otherwise the fare add-on price via `PriceTag` (or a muted "Not
 * available"). `included` drives both the badge text and the announcement, so
 * meaning never rides on color alone. Same props/behavior as
 * {@link BaggageRowProps}; token-only colors via `useXenitionTheme()`.
 */
export function BaggageRowV4({
  kind = 'cabin',
  label,
  allowance,
  included = false,
  priceCents,
  currency = 'USD',
  style,
}: BaggageRowV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
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
      <GradientSurface
        colors={journeyDisc(r)}
        style={{
          width: 48,
          height: 48,
          borderRadius: tokens.radius.md,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <Text style={{ color: journeyInk(r), fontSize: tokens.typography.scale.lg }}>{meta.glyph}</Text>
      </GradientSurface>
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
