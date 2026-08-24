import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';

/** A single amenity. */
export interface Amenity {
  /** Leading glyph/emoji, e.g. `'📶'`. */
  glyph?: string;
  /** Amenity name. */
  label: string;
  /** Whether the property offers it (default `true`). */
  available?: boolean;
}

/** Layout for the amenity list. */
export type AmenityRowVariant = 'wrap' | 'list';

export interface AmenityRowProps {
  /** Amenities to display. */
  amenities: readonly Amenity[];
  /** `wrap` = inline chips; `list` = one stacked row each with a status glyph. */
  variant?: AmenityRowVariant;
  style?: StyleProp<ViewStyle>;
}

/**
 * A property's amenities — either inline chips (`wrap`) or a stacked list.
 * Unavailable amenities are muted, struck, and carry a `✕` (available carry a
 * `✓`), so availability never depends on color alone. Renders an empty hint
 * when the list is empty. Token-only colors.
 */
export function AmenityRow({ amenities, variant = 'wrap', style }: AmenityRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (amenities.length === 0) {
    return (
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>No amenities listed.</Text>
    );
  }

  if (variant === 'list') {
    return (
      <View style={[{ gap: tokens.spacing.xs }, style]}>
        {amenities.map((a, i) => {
          const available = a.available !== false;
          return (
            <View
              key={`${a.label}-${i}`}
              accessible
              accessibilityLabel={`${a.label}, ${available ? 'available' : 'unavailable'}`}
              style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}
            >
              <Text style={{ color: available ? colors.successText : colors.muted, fontSize: tokens.typography.scale.sm }}>
                {available ? '✓' : '✕'}
              </Text>
              {a.glyph ? (
                <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>{a.glyph}</Text>
              ) : null}
              <Text
                style={{
                  color: available ? colors.onSurface : colors.muted,
                  fontSize: tokens.typography.scale.sm,
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
              paddingHorizontal: tokens.spacing.sm,
              opacity: available ? 1 : 0.6,
            }}
          >
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs }}>
              {a.glyph ?? (available ? '✓' : '✕')}
            </Text>
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
