import * as React from 'react';
import { Image, Text, View } from 'react-native';
import { Skeleton, useXenitionTheme } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { AuthorByline } from './AuthorByline';
import type { ArticleHeaderProps } from './ArticleHeader';

/** Drop-in replacement for {@link ArticleHeader} — identical props. */
export type ArticleHeaderV2Props = ArticleHeaderProps;

/**
 * ArticleHeader — **centered hero** alternate design.
 *
 * A big display title, category eyebrow, and dek are centered *over* a
 * full-bleed cover image darkened by a gradient scrim, with the byline centered
 * beneath. Cinematic masthead rather than the v1 stacked layout. Same props as
 * {@link ArticleHeader}, so it is a drop-in swap.
 *
 * Token-pure: scrim is `withAlpha(ramps.neutral[900], …)`, reversed text is
 * `ramps.neutral[50]`. With no cover image it degrades to a centered header on
 * the normal surface with on-surface text.
 */
export function ArticleHeaderV2({
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
}: ArticleHeaderV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const titleSize =
    variant === 'hero' ? tokens.typography.scale['3xl'] : tokens.typography.scale['2xl'];
  const ink = tokens.ramps.neutral[50] ?? colors.surface;
  const inkSoft = withAlpha(ink, 0.85);
  const scrimHex = tokens.ramps.neutral[900] ?? tokens.ramps.neutral[800] ?? colors.onSurface;
  const hasCover = !!coverImageUrl;
  const minHeight = variant === 'hero' ? 360 : 300;

  if (loading) {
    return (
      <View style={[{ borderRadius: tokens.radius.lg, overflow: 'hidden' }, style]}>
        <Skeleton variant="rect" width="100%" height={minHeight} />
      </View>
    );
  }

  const meta = [date, readingTime]
    .filter((p): p is string => !!p && p.length > 0)
    .join('  ·  ');

  return (
    <View
      style={[
        {
          minHeight,
          borderRadius: tokens.radius.lg,
          overflow: 'hidden',
          justifyContent: 'center',
          alignItems: 'center',
          padding: tokens.spacing.xl,
          gap: tokens.spacing.md,
          backgroundColor: hasCover ? colors.border : colors.surface,
          borderWidth: hasCover ? 0 : 1,
          borderColor: colors.border,
        },
        style,
      ]}
    >
      {hasCover ? (
        <>
          <Image
            source={{ uri: coverImageUrl }}
            accessibilityIgnoresInvertColors
            resizeMode="cover"
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }}
          />
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: withAlpha(scrimHex, 0.5),
            }}
          />
        </>
      ) : null}

      {category ? (
        <Text
          style={{
            color: hasCover ? inkSoft : colors.primaryText,
            fontSize: tokens.typography.scale.sm,
            fontWeight: '800',
            letterSpacing: 1.2,
            textTransform: 'uppercase',
            textAlign: 'center',
          }}
        >
          {category}
        </Text>
      ) : null}

      <Text
        accessibilityRole="header"
        style={{
          color: hasCover ? ink : colors.onSurface,
          fontSize: titleSize,
          lineHeight: titleSize * 1.15,
          fontWeight: '800',
          textAlign: 'center',
        }}
      >
        {title}
      </Text>

      {deck ? (
        <Text
          style={{
            color: hasCover ? inkSoft : colors.muted,
            fontSize: tokens.typography.scale.lg,
            lineHeight: tokens.typography.scale.lg * 1.4,
            textAlign: 'center',
          }}
        >
          {deck}
        </Text>
      ) : null}

      {author ? (
        hasCover ? (
          // Reversed-out inline credit so it stays legible over the scrim.
          <Text
            style={{
              color: inkSoft,
              fontSize: tokens.typography.scale.sm,
              fontWeight: '600',
              textAlign: 'center',
            }}
          >
            {[author.name, meta].filter(Boolean).join('  ·  ')}
          </Text>
        ) : (
          <AuthorByline author={author} date={date} readingTime={readingTime} variant="compact" />
        )
      ) : meta ? (
        <Text
          style={{
            color: hasCover ? inkSoft : colors.muted,
            fontSize: tokens.typography.scale.sm,
            textAlign: 'center',
          }}
        >
          {meta}
        </Text>
      ) : null}
    </View>
  );
}
