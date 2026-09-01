import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme, EmptyState } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { AmenityGridProps } from './AmenityGrid';

/** Drop-in for {@link AmenityGridProps} — same props, the V4 "listing" design. */
export type AmenityGridV4Props = AmenityGridProps;

/**
 * AmenityGrid — **V4** "listing" design. The image-forward, editorial take on the
 * amenity grid: each amenity is a soft-primary tinted glyph disc above an airy
 * label, wrapping responsively into a clean grid. ONE accent = primary; unavailable
 * amenities read muted with a struck label and a dashed disc. Same props/behavior
 * as {@link AmenityGridProps}; `columns` sets the layout width and an empty list
 * degrades to the shared `EmptyState`. Token-only colors via `useXenitionTheme()`;
 * each tile carries an a11y label.
 */
export function AmenityGridV4({
  amenities,
  columns = 2,
  emptyLabel = 'No amenities listed',
  style,
}: AmenityGridV4Props): React.ReactElement {
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
                alignItems: 'center',
                gap: tokens.spacing.sm,
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surface,
                paddingVertical: tokens.spacing.md,
                paddingHorizontal: tokens.spacing.sm,
                opacity: available ? 1 : 0.6,
              }}
            >
              {/* Soft-primary tinted glyph disc. */}
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: tokens.radius.full,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: available ? withAlpha(colors.primary, 0.1) : 'transparent',
                  borderWidth: available ? 0 : 1,
                  borderColor: colors.border,
                  borderStyle: available ? 'solid' : 'dashed',
                }}
              >
                <Text style={{ color: available ? colors.onSurface : colors.muted, fontSize: tokens.typography.scale.base }}>
                  {a.glyph ?? (available ? '✓' : '—')}
                </Text>
              </View>
              <Text
                numberOfLines={1}
                style={{
                  color: available ? colors.onSurface : colors.muted,
                  fontSize: tokens.typography.scale.sm,
                  fontWeight: '500',
                  textAlign: 'center',
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
