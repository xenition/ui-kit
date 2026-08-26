import * as React from 'react';
import { Image, Text, View } from 'react-native';
import { Skeleton, useXenitionTheme } from '../primitives';
import { AuthorBylineV3 } from './AuthorBylineV3';
import type { ArticleHeaderProps } from './ArticleHeader';

/** Drop-in replacement for {@link ArticleHeader} — identical props. */
export type ArticleHeaderV3Props = ArticleHeaderProps;

/**
 * ArticleHeader — **left-aligned editorial** alternate design.
 *
 * Text-forward masthead: a category eyebrow led by a short accent rule, a large
 * left-aligned headline, a dek, then a full-width divider and the full byline —
 * with the cover image dropped in last as a figure. Reads like a longform
 * feature opener. Same props as {@link ArticleHeader}, so it is a drop-in swap.
 *
 * Token-pure: the eyebrow rule and label use `colors.accent` / `accentText`,
 * the divider uses `colors.border`. No literal colors.
 * Stays inside its own design line: the byline is {@link AuthorBylineV3}, not
 * the base one, because an app that picks V3 picks it for every surface it sees.
 */
export function ArticleHeaderV3({
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
}: ArticleHeaderV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const titleSize =
    variant === 'hero' ? tokens.typography.scale['3xl'] : tokens.typography.scale['2xl'];

  if (loading) {
    return (
      <View style={[{ gap: tokens.spacing.md }, style]}>
        <Skeleton variant="rect" width={120} height={16} />
        <Skeleton variant="rect" width="92%" height={titleSize * 1.2} />
        <Skeleton variant="rect" width="70%" height={titleSize * 1.2} />
        <Skeleton variant="rect" width="100%" height={1} />
        <Skeleton variant="rect" width={180} height={40} />
        <Skeleton variant="rect" width="100%" height={200} />
      </View>
    );
  }

  const meta = [date, readingTime]
    .filter((p): p is string => !!p && p.length > 0)
    .join('  ·  ');

  return (
    <View style={[{ gap: tokens.spacing.md, alignItems: 'flex-start' }, style]}>
      {category ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          <View style={{ width: 28, height: 3, borderRadius: tokens.radius.full, backgroundColor: colors.accent }} />
          <Text
            style={{
              color: colors.accentText,
              fontSize: tokens.typography.scale.sm,
              fontWeight: '800',
              letterSpacing: 1,
              textTransform: 'uppercase',
            }}
          >
            {category}
          </Text>
        </View>
      ) : null}

      <Text
        accessibilityRole="header"
        style={{
          color: colors.onSurface,
          fontSize: titleSize,
          lineHeight: titleSize * 1.15,
          fontWeight: '800',
          textAlign: 'left',
        }}
      >
        {title}
      </Text>

      {deck ? (
        <Text
          style={{
            color: colors.muted,
            fontSize: tokens.typography.scale.lg,
            lineHeight: tokens.typography.scale.lg * 1.45,
          }}
        >
          {deck}
        </Text>
      ) : null}

      {/* Full-width divider separates the standfirst from the credit block. */}
      <View style={{ alignSelf: 'stretch', height: 1, backgroundColor: colors.border }} />

      {author ? (
        <AuthorBylineV3 author={author} date={date} readingTime={readingTime} variant="full" />
      ) : meta ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{meta}</Text>
      ) : null}

      {coverImageUrl ? (
        <Image
          source={{ uri: coverImageUrl }}
          accessibilityIgnoresInvertColors
          resizeMode="cover"
          style={{
            width: '100%',
            height: variant === 'hero' ? 240 : 200,
            borderRadius: tokens.radius.lg,
            backgroundColor: colors.border,
          }}
        />
      ) : null}
    </View>
  );
}
