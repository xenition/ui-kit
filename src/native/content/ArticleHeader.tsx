import * as React from 'react';
import { Image, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { Skeleton, useXenitionTheme } from '../primitives';
import { AuthorByline } from './AuthorByline';
import { CategoryChip } from './CategoryChip';
import type { ContentAuthor } from './types';

export type ArticleHeaderVariant = 'standard' | 'hero';

export interface ArticleHeaderProps {
  /** Headline. */
  title: string;
  /** Optional dek / standfirst under the title. */
  deck?: string;
  /** Section / category label (rendered as a `CategoryChip`). */
  category?: string;
  /** Cover / hero image URL. */
  coverImageUrl?: string;
  /** Credited author (rendered as an `AuthorByline`). */
  author?: ContentAuthor;
  /** Human-readable publish date. */
  date?: string;
  /** Human-readable read length. */
  readingTime?: string;
  /**
   * - `standard` — cover image above stacked title/byline (default).
   * - `hero`     — larger display title, category eyebrow on top.
   */
  variant?: ArticleHeaderVariant;
  /** Show a placeholder skeleton instead of content. */
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * The masthead of an article page — category eyebrow, headline, dek, cover
 * image, and author byline. Composes `CategoryChip` + `AuthorByline` and reads
 * every color from `SemanticColors`. Two variants (`standard` / `hero`) and a
 * `loading` skeleton state. No literal hex.
 */
export function ArticleHeader({
  title,
  deck,
  category,
  coverImageUrl,
  author,
  date,
  readingTime,
  variant = 'standard',
  loading = false,
  style,
}: ArticleHeaderProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const hero = variant === 'hero';
  const titleSize = hero ? tokens.typography.scale['3xl'] : tokens.typography.scale['2xl'];

  if (loading) {
    return (
      <View style={[{ gap: tokens.spacing.md }, style]}>
        <Skeleton variant="rect" width={100} height={20} />
        <Skeleton variant="rect" width="90%" height={titleSize * 1.3} />
        <Skeleton variant="rect" width="70%" height={titleSize * 1.3} />
        <Skeleton variant="rect" width="100%" height={200} />
        <Skeleton variant="rect" width={180} height={40} />
      </View>
    );
  }

  const cover =
    coverImageUrl && !hero ? (
      <Image
        source={{ uri: coverImageUrl }}
        accessibilityIgnoresInvertColors
        style={{ width: '100%', height: 220, borderRadius: tokens.radius.lg, backgroundColor: colors.border }}
        resizeMode="cover"
      />
    ) : null;

  const heroCover =
    coverImageUrl && hero ? (
      <Image
        source={{ uri: coverImageUrl }}
        accessibilityIgnoresInvertColors
        style={{ width: '100%', height: 260, borderRadius: tokens.radius.lg, backgroundColor: colors.border }}
        resizeMode="cover"
      />
    ) : null;

  return (
    <View style={[{ gap: tokens.spacing.md }, style]}>
      {cover}
      {category ? <CategoryChip label={category} variant={hero ? 'solid' : 'soft'} /> : null}
      <Text
        accessibilityRole="header"
        style={{
          color: colors.onSurface,
          fontSize: titleSize,
          lineHeight: titleSize * 1.2,
          fontWeight: '800',
        }}
      >
        {title}
      </Text>
      {deck ? (
        <Text
          style={{
            color: colors.muted,
            fontSize: tokens.typography.scale.lg,
            lineHeight: tokens.typography.scale.lg * 1.4,
          }}
        >
          {deck}
        </Text>
      ) : null}
      {heroCover}
      {author ? (
        <AuthorByline author={author} date={date} readingTime={readingTime} variant="full" />
      ) : date || readingTime ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
          {[date, readingTime].filter(Boolean).join('  ·  ')}
        </Text>
      ) : null}
    </View>
  );
}
