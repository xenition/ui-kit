import * as React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { Skeleton, useXenitionTheme } from '../primitives';
import type { ArticleCardProps } from './ArticleCard';

/** Drop-in replacement for {@link ArticleCard} — identical props. */
export type ArticleCardV3Props = ArticleCardProps;

/**
 * ArticleCard — **minimal, text-first** alternate design.
 *
 * No card surface and no big image: a thin top rule, a colored category
 * eyebrow, the headline, a muted excerpt, and a small square thumbnail tucked
 * to the right. Reads like an index / digest entry rather than a hero card.
 * Same props as {@link ArticleCard}, so it is a drop-in swap.
 *
 * Token-pure: the rule is `colors.border`, the eyebrow is `colors.primaryText`,
 * body text is `onSurface` / `muted`. No literal colors.
 */
export function ArticleCardV3({
  article,
  onPress,
  variant = 'standard',
  loading = false,
  style,
}: ArticleCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const thumb = variant === 'featured' ? 72 : 56;

  if (loading) {
    return (
      <View style={[{ paddingVertical: tokens.spacing.md, gap: tokens.spacing.sm }, style]}>
        <View style={{ height: 1, backgroundColor: colors.border }} />
        <View style={{ flexDirection: 'row', gap: tokens.spacing.md }}>
          <View style={{ flex: 1, gap: tokens.spacing.sm }}>
            <Skeleton variant="rect" width="40%" height={12} />
            <Skeleton variant="rect" width="92%" height={18} />
            <Skeleton variant="rect" width="70%" height={14} />
          </View>
          <Skeleton variant="rect" width={thumb} height={thumb} />
        </View>
      </View>
    );
  }

  const meta = [article.author?.name, article.date, article.readingTime]
    .filter((p): p is string => !!p && p.length > 0)
    .join('  ·  ');

  const inner = (
    <View style={[{ paddingVertical: tokens.spacing.md, gap: tokens.spacing.sm }, style]}>
      {/* Thin top rule — the whole design leans on this hairline for structure. */}
      <View style={{ height: 1, backgroundColor: colors.border }} />

      <View style={{ flexDirection: 'row', gap: tokens.spacing.md, alignItems: 'flex-start' }}>
        <View style={{ flex: 1, gap: tokens.spacing.xs }}>
          {article.category ? (
            <Text
              style={{
                color: colors.primaryText,
                fontSize: tokens.typography.scale.xs,
                fontWeight: '800',
                letterSpacing: 0.8,
                textTransform: 'uppercase',
              }}
            >
              {article.category}
            </Text>
          ) : null}

          <Text
            numberOfLines={variant === 'featured' ? 4 : 3}
            style={{
              color: colors.onSurface,
              fontSize:
                variant === 'featured' ? tokens.typography.scale.lg : tokens.typography.scale.base,
              lineHeight:
                (variant === 'featured'
                  ? tokens.typography.scale.lg
                  : tokens.typography.scale.base) * 1.3,
              fontWeight: '700',
            }}
          >
            {article.title}
          </Text>

          {article.excerpt ? (
            <Text
              numberOfLines={2}
              style={{
                color: colors.muted,
                fontSize: tokens.typography.scale.sm,
                lineHeight: tokens.typography.scale.sm * 1.4,
              }}
            >
              {article.excerpt}
            </Text>
          ) : null}

          {meta ? (
            <Text
              numberOfLines={1}
              style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}
            >
              {meta}
            </Text>
          ) : null}
        </View>

        {article.imageUrl ? (
          <Image
            source={{ uri: article.imageUrl }}
            accessibilityIgnoresInvertColors
            resizeMode="cover"
            style={{
              width: thumb,
              height: thumb,
              borderRadius: tokens.radius.sm,
              backgroundColor: colors.border,
            }}
          />
        ) : null}
      </View>
    </View>
  );

  if (!onPress) return inner;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={article.title}
      onPress={() => onPress(article)}
      style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
    >
      {inner}
    </Pressable>
  );
}
