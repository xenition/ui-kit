import * as React from 'react';
import { Image, Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { CardV4 } from '../primitives/CardV4';
import { SkeletonV4 } from '../primitives/SkeletonV4';
import { TextV4 } from '../primitives/TextV4';
import { pressFill } from '../primitives/internal/state-v4';
import { minTap } from '../primitives/internal/chrome-v4';
import { AuthorBylineV4 } from './AuthorBylineV4';
import { CategoryChipV4 } from './CategoryChipV4';
import { mediaGround, metaLine } from './internal/reading-v4';
import type { ArticleCardProps } from './ArticleCard';

export interface ArticleCardV4Props extends ArticleCardProps {
  /** Announced while the card is still a skeleton. Default `'Loading article'`. */
  loadingLabel?: string;
}

/**
 * **V4 article card** — same props as {@link ArticleCard} plus `loadingLabel`.
 *
 * ## Five changes
 *
 * 1. **A loading card cannot be tapped.** The web twin computed its
 *    interactivity before the loading branch and wrapped the skeleton in a
 *    `role="button"` with the live `onClick` still attached, so a reader could
 *    open an article that had not arrived. Both twins now return the inert
 *    skeleton, announced once as `loadingLabel`.
 * 2. **The image placeholder is the shared media ground.** This twin painted
 *    it `colors.border` — a hairline token spent as a fill — while the web
 *    twin painted a raw ramp step that ignored the seed entirely.
 * 3. **Press is a state layer, not a dim.** `opacity: 0.85` lightens the
 *    card's own content, which is the signal M3 spends on *disabled*; the card
 *    now tints its ground and leaves the headline at full strength.
 * 4. **Meta text takes `mutedText`.** `muted` is a fill slot with no contrast
 *    promise; the date and read length were set in it on every variant.
 * 5. **The card composes the V4 chip and byline**, so a feed does not mix two
 *    design lines inside one card.
 *
 * **Renders nothing without an article title** (§4.5).
 */
export function ArticleCardV4({
  article,
  onPress,
  variant = 'standard',
  loading = false,
  loadingLabel = 'Loading article',
  style,
}: ArticleCardV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { tokens } = theme;

  const compact = variant === 'compact';
  const featured = variant === 'featured';
  // 88 and 192/144 off the spacing scale, so a denser seed scales its media too.
  const thumb = minTap(tokens.spacing) * 2;
  const imageHeight = featured ? tokens.spacing['2xl'] * 4 : tokens.spacing['2xl'] * 3;

  if (loading) {
    // Inert, and before any interactivity is computed — the whole point of the
    // fix. A skeleton that answers a tap answers it with an empty article.
    return (
      <CardV4
        accessible
        accessibilityLabel={loadingLabel}
        accessibilityLiveRegion="polite"
        style={style}
      >
        {compact ? (
          <View style={{ flexDirection: 'row', gap: tokens.spacing.md }}>
            <SkeletonV4 variant="rect" width={thumb} height={thumb} />
            <View style={{ flex: 1, gap: tokens.spacing.sm }}>
              <SkeletonV4 variant="rect" width="90%" height={tokens.typography.scale.lg} />
              <SkeletonV4 variant="rect" width="60%" height={tokens.typography.scale.sm} />
            </View>
          </View>
        ) : (
          <View style={{ gap: tokens.spacing.sm }}>
            <SkeletonV4 variant="rect" width="100%" height={imageHeight} />
            <SkeletonV4 variant="rect" width="90%" height={tokens.typography.scale.xl} />
            <SkeletonV4 variant="rect" width="70%" height={tokens.typography.scale.sm} />
          </View>
        )}
      </CardV4>
    );
  }

  if (!article?.title) return null;

  const meta = metaLine([article.date, article.readingTime]);

  const body = compact ? (
    <View style={{ flexDirection: 'row', gap: tokens.spacing.md, alignItems: 'center' }}>
      {article.imageUrl ? (
        <Image
          source={{ uri: article.imageUrl }}
          accessibilityIgnoresInvertColors
          style={{
            width: thumb,
            height: thumb,
            borderRadius: tokens.radius.md,
            backgroundColor: mediaGround(theme),
          }}
          resizeMode="cover"
        />
      ) : null}
      <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs }}>
        {article.category ? <CategoryChipV4 label={article.category} variant="soft" /> : null}
        <TextV4 size="base" weight="bold" tone="onSurface" numberOfLines={3}>
          {article.title}
        </TextV4>
        {meta ? (
          <TextV4 size="xs" tone="mutedText">
            {meta}
          </TextV4>
        ) : null}
      </View>
    </View>
  ) : (
    <View style={{ gap: tokens.spacing.sm }}>
      {article.imageUrl ? (
        <Image
          source={{ uri: article.imageUrl }}
          accessibilityIgnoresInvertColors
          style={{
            width: '100%',
            height: imageHeight,
            borderRadius: tokens.radius.md,
            backgroundColor: mediaGround(theme),
          }}
          resizeMode="cover"
        />
      ) : null}
      {article.category ? <CategoryChipV4 label={article.category} variant="soft" /> : null}
      <TextV4
        size={featured ? 'xl' : 'lg'}
        weight="bold"
        tone="onSurface"
        numberOfLines={featured ? 3 : 2}
      >
        {article.title}
      </TextV4>
      {article.excerpt ? (
        <TextV4 size="sm" tone="mutedText" numberOfLines={featured ? 3 : 2}>
          {article.excerpt}
        </TextV4>
      ) : null}
      {article.author ? (
        <AuthorBylineV4
          author={article.author}
          date={article.date}
          readingTime={article.readingTime}
          variant="compact"
        />
      ) : meta ? (
        <TextV4 size="xs" tone="mutedText">
          {meta}
        </TextV4>
      ) : null}
    </View>
  );

  const content = (pressed: boolean): React.ReactElement => (
    <CardV4 style={[pressed ? { backgroundColor: pressFill(theme) } : null, style]}>{body}</CardV4>
  );

  if (!onPress) return content(false);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={article.title}
      onPress={() => onPress(article)}
      style={{ borderRadius: tokens.radius.lg }}
    >
      {({ pressed }) => content(pressed)}
    </Pressable>
  );
}
