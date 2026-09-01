import * as React from 'react';
import { Image, Pressable, ScrollView, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { GradientSurface } from './internal/GradientSurface';
import { spotlightGlow, spotlightInk } from './internal/spotlight';

/** One browse category — a genre or mood tile in a {@link CategoryRail}. */
export interface CategoryRailItem {
  /** Stable unique id (used as the list key and passed to `onSelect`). */
  id: string;
  /** Human label rendered on the tile, e.g. `'Chill'`. */
  label: string;
  /** Optional decorative glyph shown when there's no artwork. */
  glyph?: string;
  /** Optional cover artwork URL; replaces the gradient glow when present. */
  artworkUrl?: string;
}

export interface CategoryRailProps {
  /** The browse categories, rendered left→right in a horizontally-scrolling rail. */
  categories: readonly CategoryRailItem[];
  /** Optional header label above the rail. */
  title?: string;
  /** Called with a category `id` when its tile is tapped. */
  onSelect?: (id: string) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * CategoryRail — **V4** "spotlight" design. A horizontally-scrolling rail of
 * rounded browse tiles (genres / moods). Each tile is a gradient-glow cover —
 * the V4 accent→primary wash — or the category artwork when supplied, with the
 * label set in near-white spotlight ink over a legibility scrim. Tiles are
 * ≥44px tap targets. Presentational only; token-only colors via
 * `useXenitionTheme()` and the `spotlight*` helpers (no literal hex).
 * Dark-mode safe.
 */
export function CategoryRail({
  categories,
  title,
  onSelect,
  style,
}: CategoryRailProps): React.ReactElement | null {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const ink = spotlightInk(r);

  if (categories.length === 0) return null;

  return (
    <View accessibilityRole="list" style={[{ gap: tokens.spacing.sm }, style]}>
      {title ? (
        <Text
          style={{
            color: colors.muted,
            fontSize: tokens.typography.scale.xs,
            fontWeight: '700',
            letterSpacing: 0.5,
            textTransform: 'uppercase',
            paddingHorizontal: tokens.spacing.xs,
          }}
        >
          {title}
        </Text>
      ) : null}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: tokens.spacing.md, paddingBottom: tokens.spacing.xs }}
      >
        {categories.map((cat) => {
          const interactive = !!onSelect;
          return (
            <Pressable
              key={cat.id}
              accessibilityRole={interactive ? 'button' : undefined}
              accessibilityLabel={cat.label}
              disabled={!interactive}
              onPress={interactive ? () => onSelect!(cat.id) : undefined}
              style={({ pressed }) => ({ opacity: interactive && pressed ? 0.85 : 1 })}
            >
              <GradientSurface
                colors={spotlightGlow(r)}
                style={{
                  width: 128,
                  height: 96,
                  minWidth: 44,
                  minHeight: 44,
                  borderRadius: tokens.radius.lg,
                  overflow: 'hidden',
                  justifyContent: 'flex-end',
                  padding: tokens.spacing.sm,
                }}
              >
                {cat.artworkUrl ? (
                  <Image
                    source={{ uri: cat.artworkUrl }}
                    accessibilityIgnoresInvertColors
                    resizeMode="cover"
                    style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                  />
                ) : null}

                {/* Legibility scrim so the ink reads on any cover. */}
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: withAlpha(r.primary[700], 0.4),
                  }}
                />

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
                  {cat.glyph ? <Text style={{ color: ink, fontSize: tokens.typography.scale.lg }}>{cat.glyph}</Text> : null}
                  <Text
                    numberOfLines={1}
                    style={{ color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}
                  >
                    {cat.label}
                  </Text>
                </View>
              </GradientSurface>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
