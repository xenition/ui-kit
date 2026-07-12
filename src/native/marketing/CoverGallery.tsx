import * as React from 'react';
import { Image, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { GenerativeCover } from '../commerce/GenerativeCover';

export interface CoverGalleryItem {
  /** Stable seed for this plate's generative composition. */
  seed: string | number;
  /**
   * Real image URL. When set, an `Image` is drawn instead of the seeded
   * {@link GenerativeCover} plate.
   */
  imageUrl?: string;
  /** Accessible label for the plate. */
  label?: string;
  /** Caption rendered under the plate (title of the piece / work). */
  caption?: string;
  /** Small secondary line under the caption (medium, year, artist, …). */
  meta?: string;
  /** When set, the whole tile is pressable (native equivalent of the web `href`). */
  onPress?: () => void;
}

export interface CoverGalleryProps {
  /** The plates to render. */
  items: CoverGalleryItem[];
  /** Column count (native wraps into rows of this width; default 3). */
  columns?: 2 | 3 | 4;
  /** width / height aspect ratio of every plate (default 1 — square). */
  aspect?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * A gallery of seeded {@link GenerativeCover} plates (or real images) with
 * captions — the native mirror of the web `CoverGallery`. The web CSS-grid
 * breakpoints become a flex-wrap row with `flexBasis` columns; each tile
 * optionally becomes a `Pressable` (native's `href`). The native
 * `GenerativeCover` has a simpler seed/label contract, so the web `form`/`ink`/
 * `paper` per-plate role overrides are dropped. Token-only — no literal colors.
 */
export function CoverGallery({
  items,
  columns = 3,
  aspect = 1,
  style,
}: CoverGalleryProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const basis = `${100 / columns}%` as ViewStyle['flexBasis'];

  return (
    <View
      testID="xen-cover-gallery"
      style={[
        { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.lg },
        style,
      ]}
    >
      {items.map((item, index) => {
        const seed = String(item.seed);
        const label =
          item.label ?? (typeof item.caption === 'string' ? item.caption : undefined);

        const plate = (
          <View
            style={{
              aspectRatio: aspect,
              width: '100%',
              overflow: 'hidden',
              borderRadius: tokens.radius.md,
              backgroundColor: tokens.ramps.neutral[100],
            }}
          >
            {item.imageUrl ? (
              <Image
                source={{ uri: item.imageUrl }}
                accessible
                accessibilityLabel={label}
                resizeMode="cover"
                style={{ width: '100%', height: '100%' }}
              />
            ) : (
              <GenerativeCover seed={seed} label={label} style={{ width: '100%', height: '100%' }} />
            )}
          </View>
        );

        const caption =
          item.caption !== undefined || item.meta !== undefined ? (
            <View style={{ gap: tokens.spacing.xs }}>
              {item.caption !== undefined ? (
                <Text
                  style={{
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.base,
                    fontWeight: '600',
                  }}
                >
                  {item.caption}
                </Text>
              ) : null}
              {item.meta !== undefined ? (
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
                  {item.meta}
                </Text>
              ) : null}
            </View>
          ) : null;

        const tile = (
          <View style={{ gap: tokens.spacing.sm }}>
            {plate}
            {caption}
          </View>
        );

        return (
          <View key={index} style={{ flexGrow: 1, flexBasis: basis, minWidth: 120 }}>
            {item.onPress ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={label ?? 'View'}
                onPress={item.onPress}
                style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
              >
                {tile}
              </Pressable>
            ) : (
              tile
            )}
          </View>
        );
      })}
    </View>
  );
}
