import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { GradientSurface } from './internal/GradientSurface';
import { journeyDisc, journeyInk } from './internal/journey';
import type { AmenityRowProps } from './AmenityRow';

/** Drop-in for {@link AmenityRowProps} — same props, the V4 "journey" design. */
export type AmenityRowV4Props = AmenityRowProps;

/**
 * AmenityRow — **V4** "journey" design. The boarding-pass take on a property's
 * amenities: each amenity leads with a small brand-gradient glyph disc (the
 * signature V4 touch), the name, and a trailing availability indicator — a `✓`
 * in the success tone when offered, a muted `✕` (with the label struck) when
 * not, so availability never rides on color alone. Honors `variant` — `list`
 * stacks one disc-led row each; `wrap` lays the discs out as inline chips.
 * Renders an empty hint when the list is empty. Same props/behavior as
 * {@link AmenityRowProps}; token-only colors via `useXenitionTheme()`.
 */
export function AmenityRowV4({ amenities, variant = 'wrap', style }: AmenityRowV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;

  if (amenities.length === 0) {
    return (
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>No amenities listed.</Text>
    );
  }

  if (variant === 'list') {
    return (
      <View style={[{ gap: tokens.spacing.sm }, style]}>
        {amenities.map((a, i) => {
          const available = a.available !== false;
          return (
            <View
              key={`${a.label}-${i}`}
              accessible
              accessibilityLabel={`${a.label}, ${available ? 'available' : 'unavailable'}`}
              style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}
            >
              <GradientSurface
                colors={journeyDisc(r)}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  opacity: available ? 1 : 0.6,
                }}
              >
                <Text style={{ color: journeyInk(r), fontSize: tokens.typography.scale.sm }}>
                  {a.glyph ?? (available ? '✓' : '✕')}
                </Text>
              </GradientSurface>
              <Text
                style={{
                  flex: 1,
                  color: available ? colors.onSurface : colors.muted,
                  fontSize: tokens.typography.scale.sm,
                  textDecorationLine: available ? 'none' : 'line-through',
                }}
              >
                {a.label}
              </Text>
              <Text style={{ color: available ? colors.successText : colors.muted, fontSize: tokens.typography.scale.sm }}>
                {available ? '✓' : '✕'}
              </Text>
            </View>
          );
        })}
      </View>
    );
  }

  return (
    <View style={[{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, style]}>
      {amenities.map((a, i) => {
        const available = a.available !== false;
        return (
          <View
            key={`${a.label}-${i}`}
            accessible
            accessibilityLabel={`${a.label}, ${available ? 'available' : 'unavailable'}`}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: tokens.spacing.xs,
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: tokens.radius.full,
              paddingVertical: tokens.spacing.xs,
              paddingLeft: tokens.spacing.xs,
              paddingRight: tokens.spacing.sm,
              opacity: available ? 1 : 0.6,
            }}
          >
            <GradientSurface
              colors={journeyDisc(r)}
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              <Text style={{ color: journeyInk(r), fontSize: tokens.typography.scale.xs }}>
                {a.glyph ?? (available ? '✓' : '✕')}
              </Text>
            </GradientSurface>
            <Text
              style={{
                color: available ? colors.onSurface : colors.muted,
                fontSize: tokens.typography.scale.xs,
                textDecorationLine: available ? 'none' : 'line-through',
              }}
            >
              {a.label}
            </Text>
          </View>
        );
      })}
    </View>
  );
}
