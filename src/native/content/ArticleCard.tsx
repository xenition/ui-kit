import * as React from 'react';
import { Image, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { Card, Skeleton, useXenitionTheme } from '../primitives';
import { AuthorByline } from './AuthorByline';
import { CategoryChip } from './CategoryChip';
import type { ArticleSummary } from './types';

export type ArticleCardVariant = 'standard' | 'featured' | 'compact';

export interface ArticleCardProps {
  /** The article to render. */
  article: ArticleSummary;
  /** Called when the card is tapped (open the article). */
  onPress?: (article: ArticleSummary) => void;
  /**
   * - `standard` — image on top, title + excerpt + byline (default).
   * - `featured` — larger image, big headline, for the top of a feed.
   * - `compact`  — horizontal row (thumbnail left, text right), for lists.
   */
  variant?: ArticleCardVariant;
  /** Show a placeholder skeleton instead of content. */
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * A feed card for one article — the native mirror of a web article card.
 * Composes `Card`, `CategoryChip`, and `AuthorByline`; every color comes from
 * `SemanticColors`. Three variants: `standard` (image-top), `featured` (large
 * hero headline), and `compact` (horizontal list row). Supports a `loading`
 * skeleton and fires `onPress(article)` when tapped. No literal hex.
 */
export function ArticleCard({
  article,
  onPress,
  variant = 'standard',
  loading = false,
  style,
}: ArticleCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (loading) {
    return (
      <Card style={style}>
        {variant === 'compact' ? (
          <View style={{ flexDirection: 'row', gap: tokens.spacing.md }}>
            <Skeleton variant="rect" width={88} height={88} />
            <View style={{ flex: 1, gap: tokens.spacing.sm }}>
              <Skeleton variant="rect" width="90%" height={18} />
              <Skeleton variant="rect" width="60%" height={14} />
            </View>
          </View>
        ) : (
          <View style={{ gap: tokens.spacing.sm }}>
            <Skeleton variant="rect" width="100%" height={variant === 'featured' ? 200 : 150} />
            <Skeleton variant="rect" width="90%" height={20} />
            <Skeleton variant="rect" width="70%" height={14} />
          </View>
        )}
      </Card>
    );
  }

  const compact = variant === 'compact';
  const featured = variant === 'featured';
  const titleSize = featured ? tokens.typography.scale.xl : tokens.typography.scale.lg;
  const imageHeight = featured ? 200 : 160;

  const body = compact ? (
    <View style={{ flexDirection: 'row', gap: tokens.spacing.md, alignItems: 'center' }}>
      {article.imageUrl ? (
        <Image
          source={{ uri: article.imageUrl }}
          accessibilityIgnoresInvertColors
          style={{ width: 88, height: 88, borderRadius: tokens.radius.md, backgroundColor: colors.border }}
          resizeMode="cover"
        />
      ) : null}
      <View style={{ flex: 1, gap: tokens.spacing.xs }}>
        {article.category ? <CategoryChip label={article.category} variant="soft" /> : null}
        <Text
          numberOfLines={3}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700', lineHeight: tokens.typography.scale.base * 1.25 }}
        >
          {article.title}
        </Text>
        {article.readingTime || article.date ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {[article.date, article.readingTime].filter(Boolean).join('  ·  ')}
          </Text>
        ) : null}
      </View>
    </View>
  ) : (
    <View style={{ gap: tokens.spacing.sm }}>
      {article.imageUrl ? (
        <Image
          source={{ uri: article.imageUrl }}
          accessibilityIgnoresInvertColors
          style={{ width: '100%', height: imageHeight, borderRadius: tokens.radius.md, backgroundColor: colors.border }}
          resizeMode="cover"
        />
      ) : null}
      {article.category ? <CategoryChip label={article.category} variant="soft" /> : null}
      <Text
        numberOfLines={featured ? 3 : 2}
        style={{ color: colors.onSurface, fontSize: titleSize, fontWeight: '800', lineHeight: titleSize * 1.2 }}
      >
        {article.title}
      </Text>
      {article.excerpt ? (
        <Text
          numberOfLines={featured ? 3 : 2}
          style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, lineHeight: tokens.typography.scale.sm * 1.4 }}
        >
          {article.excerpt}
        </Text>
      ) : null}
      {article.author ? (
        <AuthorByline
          author={article.author}
          date={article.date}
          readingTime={article.readingTime}
          variant="compact"
        />
      ) : article.date || article.readingTime ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          {[article.date, article.readingTime].filter(Boolean).join('  ·  ')}
        </Text>
      ) : null}
    </View>
  );

  const content = <Card style={style}>{body}</Card>;

  if (!onPress) return content;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={article.title}
      onPress={() => onPress(article)}
      style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
    >
      {content}
    </Pressable>
  );
}
