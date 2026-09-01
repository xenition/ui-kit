import * as React from 'react';
import { Image, Pressable, Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { GenerativeCover } from '../commerce/GenerativeCover';
import type { CoverGalleryProps } from './CoverGallery';

/** Drop-in for {@link CoverGalleryProps} — same props, the V4 "showcase" design. */
export type CoverGalleryV4Props = CoverGalleryProps;

/**
 * CoverGallery — **V4** "showcase" design (native mirror of the web V4). An
 * elevated wall of floating rounded plates on the page ground (NO gradient): each
 * plate is a seeded {@link GenerativeCover} (or a real `imageUrl` `Image`) set in
 * an elevated card (`colors.card` + border + soft shadow), captions read as bold
 * tight-tracked headings, and `meta` becomes a soft-primary chip. The web CSS-grid
 * breakpoints become a flex-wrap row of `flexBasis` columns; each tile optionally
 * becomes a `Pressable` (native's `href`). As on the native base, the per-plate
 * web `form`/`ink`/`paper` role overrides are dropped (the native `GenerativeCover`
 * has a simpler seed/label contract). Honors every native base field
 * (`items`/`columns`/`aspect`); token-only colors, no literals.
 */
export function CoverGalleryV4({
  items,
  columns = 3,
  aspect = 1,
  style,
}: CoverGalleryV4Props): React.ReactElement {
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
              borderRadius: tokens.radius.lg,
              borderWidth: 1,
              borderColor: colors.border,
              backgroundColor: withAlpha(colors.primary, 0.06),
              shadowColor: colors.onSurface,
              shadowOpacity: 0.06,
              shadowRadius: 10,
              shadowOffset: { width: 0, height: 4 },
              elevation: 2,
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
            <View style={{ alignItems: 'flex-start', gap: tokens.spacing.xs }}>
              {item.caption !== undefined ? (
                <Text
                  style={{
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.lg,
                    fontWeight: '800',
                    letterSpacing: -0.3,
                  }}
                >
                  {item.caption}
                </Text>
              ) : null}
              {item.meta !== undefined ? (
                <View
                  style={{
                    borderRadius: tokens.radius.full,
                    backgroundColor: withAlpha(colors.primary, 0.1),
                    paddingHorizontal: tokens.spacing.sm,
                    paddingVertical: 2,
                  }}
                >
                  <Text
                    style={{
                      color: colors.primary,
                      fontSize: tokens.typography.scale.xs,
                      fontWeight: '500',
                    }}
                  >
                    {item.meta}
                  </Text>
                </View>
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
