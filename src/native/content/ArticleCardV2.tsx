import * as React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { Skeleton, useXenitionTheme } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { shadow } from '../primitives/internal/elevation';
import type { ArticleCardProps } from './ArticleCard';

/** Drop-in replacement for {@link ArticleCard} — identical props. */
export type ArticleCardV2Props = ArticleCardProps;

/**
 * ArticleCard — **magazine full-bleed** alternate design.
 *
 * Where the v1 card stacks image → text on a bordered surface, this variant
 * fills the whole card with the cover image and overlays a bottom gradient
 * scrim with the category, headline, and byline reversed out in near-white.
 * Same props as {@link ArticleCard}, so it is a drop-in swap.
 *
 * Token-pure: the scrim is `withAlpha(ramps.neutral[900], …)` and the reversed
 * text is `ramps.neutral[50]` — both real compiled-theme hexes, never literals.
 * When no cover image is supplied it degrades to a soft-tinted panel with the
 * normal on-surface text so the headline stays legible.
 */
export function ArticleCardV2({
  article,
  onPress,
  variant = 'standard',
  loading = false,
  style,
}: ArticleCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const height = variant === 'featured' ? 288 : variant === 'compact' ? 168 : 224;
  const radius = tokens.radius.lg;
  const ink = tokens.ramps.neutral[50] ?? colors.surface;
  const inkSoft = withAlpha(ink, 0.82);
  const scrimHex = tokens.ramps.neutral[900] ?? tokens.ramps.neutral[800] ?? colors.onSurface;

  if (loading) {
    return (
      <View style={[{ borderRadius: radius, overflow: 'hidden' }, style]}>
        <Skeleton variant="rect" width="100%" height={height} />
      </View>
    );
  }

  const meta = [article.author?.name, article.date, article.readingTime]
    .filter((p): p is string => !!p && p.length > 0)
    .join('  ·  ');

  const hasImage = !!article.imageUrl;
  const titleSize =
    variant === 'featured' ? tokens.typography.scale.xl : tokens.typography.scale.lg;

  const overlaid = (
    <View
      style={[
        {
          height,
          borderRadius: radius,
          overflow: 'hidden',
          justifyContent: 'flex-end',
          backgroundColor: hasImage ? colors.border : withAlpha(colors.primary, 0.08),
          borderWidth: hasImage ? 0 : 1,
          borderColor: colors.border,
          ...shadow('md', tokens),
        },
        style,
      ]}
    >
      {hasImage ? (
        <Image
          source={{ uri: article.imageUrl }}
          accessibilityIgnoresInvertColors
          resizeMode="cover"
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }}
        />
      ) : null}

      {/* Bottom gradient scrim — three stacked bands fake a gradient (RN has none). */}
      {hasImage ? (
        <>
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: height * 0.7,
              backgroundColor: withAlpha(scrimHex, 0.28),
            }}
          />
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: height * 0.45,
              backgroundColor: withAlpha(scrimHex, 0.42),
            }}
          />
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: height * 0.24,
              backgroundColor: withAlpha(scrimHex, 0.5),
            }}
          />
        </>
      ) : null}

      <View style={{ padding: tokens.spacing.lg, gap: tokens.spacing.xs }}>
        {article.category ? (
          <View
            style={{
              alignSelf: 'flex-start',
              backgroundColor: colors.accent,
              borderRadius: tokens.radius.sm,
              paddingHorizontal: tokens.spacing.sm,
              paddingVertical: 2,
            }}
          >
            <Text
              style={{
                color: colors.onAccent,
                fontSize: tokens.typography.scale.xs,
                fontWeight: '800',
                letterSpacing: 0.6,
                textTransform: 'uppercase',
              }}
            >
              {article.category}
            </Text>
          </View>
        ) : null}

        <Text
          numberOfLines={variant === 'compact' ? 2 : 3}
          style={{
            color: hasImage ? ink : colors.onSurface,
            fontSize: titleSize,
            lineHeight: titleSize * 1.2,
            fontWeight: '800',
          }}
        >
          {article.title}
        </Text>

        {meta ? (
          <Text
            numberOfLines={1}
            style={{
              color: hasImage ? inkSoft : colors.muted,
              fontSize: tokens.typography.scale.xs,
              fontWeight: '600',
            }}
          >
            {meta}
          </Text>
        ) : null}
      </View>
    </View>
  );

  if (!onPress) return overlaid;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={article.title}
      onPress={() => onPress(article)}
      style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
    >
      {overlaid}
    </Pressable>
  );
}
