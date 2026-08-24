import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, Icon, EmptyState } from '../primitives';

/** One amenity entry. `available: false` renders a struck, muted "not offered" tile. */
export interface Amenity {
  /** Human label (e.g. "In-unit laundry"). */
  label: string;
  /** Optional leading glyph/emoji. */
  glyph?: string;
  /** Availability; defaults to `true`. */
  available?: boolean;
}

export interface AmenityGridProps {
  /** Amenities to display. Empty renders the shared `EmptyState`. */
  amenities: Amenity[];
  /** Number of columns (default 2). */
  columns?: number;
  /** Empty-state headline. */
  emptyLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A wrapping grid of property amenities — each a token-styled tile with an
 * optional glyph, a check/dash availability marker, and a struck label when the
 * amenity is not offered. Presentational only (data in, nothing fetches);
 * degrades to the shared `EmptyState` when `amenities` is empty. `columns`
 * controls the layout width. Token-only colors and a11y labels per tile.
 */
export function AmenityGrid({
  amenities,
  columns = 2,
  emptyLabel = 'No amenities listed',
  style,
}: AmenityGridProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (amenities.length === 0) {
    return <EmptyState title={emptyLabel} description="Amenity details will appear here." style={style} />;
  }

  const cols = Math.max(1, columns);
  const basis = `${100 / cols}%` as `${number}%`;

  return (
    <View
      accessibilityRole="list"
      style={[{ flexDirection: 'row', flexWrap: 'wrap', margin: -tokens.spacing.xs }, style]}
    >
      {amenities.map((a, i) => {
        const available = a.available !== false;
        return (
          <View key={`${a.label}-${i}`} style={{ width: basis, padding: tokens.spacing.xs }}>
            <View
              accessibilityRole="text"
              accessibilityLabel={`${a.label}, ${available ? 'available' : 'not available'}`}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                borderRadius: tokens.radius.md,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surface,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.md,
                opacity: available ? 1 : 0.6,
              }}
            >
              {a.glyph ? <Icon glyph={a.glyph} size="base" color={available ? 'onSurface' : 'muted'} /> : null}
              <Icon
                glyph={available ? '✓' : '—'}
                size="sm"
                color={available ? 'success' : 'muted'}
              />
              <Text
                numberOfLines={1}
                style={{
                  flex: 1,
                  color: available ? colors.onSurface : colors.muted,
                  fontSize: tokens.typography.scale.sm,
                  textDecorationLine: available ? 'none' : 'line-through',
                }}
              >
                {a.label}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}
