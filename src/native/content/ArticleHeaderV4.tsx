import * as React from 'react';
import { Image, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { SkeletonV4 } from '../primitives/SkeletonV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { AuthorBylineV4 } from './AuthorBylineV4';
import { CategoryChipV4 } from './CategoryChipV4';
import { mediaGround, metaLine } from './internal/reading-v4';
import type { ArticleHeaderProps } from './ArticleHeader';

export interface ArticleHeaderV4Props extends ArticleHeaderProps {
  /** Announced while the masthead is still a skeleton. Default `'Loading article'`. */
  loadingLabel?: string;
}

/**
 * The line box a display headline occupies, as a ratio of its own step.
 *
 * One ratio, so the skeleton is the height of the headline it is standing in
 * for. The web twin wrote `44` and `36` as literals and this twin derived its
 * own number, so the *same* variant drew two different placeholders and the
 * page jumped by a different amount on each platform when the article landed.
 */
const TITLE_LEADING = 1.3;

/**
 * **V4 article masthead** — same props as {@link ArticleHeader} plus
 * `loadingLabel`.
 *
 * ## Four changes
 *
 * 1. **The skeleton is the shape of the headline it replaces.** Both twins now
 *    derive the placeholder's height from the type scale times one shared
 *    leading ratio, instead of one twin measuring and the other guessing.
 * 2. **The loading state says what is loading**, once, politely — the base
 *    showed a silent stack of grey blocks.
 * 3. **The hero and cover placeholders take the shared media ground**, not
 *    `colors.border`, which is the hairline token.
 * 4. **The deck and the meta line take `mutedText`**, the contrast-corrected
 *    slot, rather than the `muted` fill they were set in.
 *
 * **Renders nothing without a title** (§4.5).
 */
export function ArticleHeaderV4({
  title,
  deck,
  category,
  coverImageUrl,
  author,
  date,
  readingTime,
  variant = 'standard',
  loading = false,
  loadingLabel = 'Loading article',
  style,
}: ArticleHeaderV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { tokens } = theme;
  const hero = variant === 'hero';
  const titleSize = hero ? tokens.typography.scale['3xl'] : tokens.typography.scale['2xl'];
  const coverHeight = tokens.spacing['2xl'] * 4 + tokens.spacing.lg;
  const heroHeight = tokens.spacing['2xl'] * 5 + tokens.spacing.md;

  if (loading) {
    return (
      <View
        accessible
        accessibilityLabel={loadingLabel}
        accessibilityLiveRegion="polite"
        style={[{ gap: tokens.spacing.md }, style]}
      >
        <SkeletonV4 variant="rect" width={tokens.spacing['2xl'] * 2} height={tokens.spacing.lg} />
        <SkeletonV4 variant="rect" width="90%" height={titleSize * TITLE_LEADING} />
        <SkeletonV4 variant="rect" width="70%" height={titleSize * TITLE_LEADING} />
        <SkeletonV4 variant="rect" width="100%" height={hero ? heroHeight : coverHeight} />
        <SkeletonV4
          variant="rect"
          width={tokens.spacing['2xl'] * 4}
          height={minTap(tokens.spacing)}
        />
      </View>
    );
  }

  if (!title) return null;

  const meta = metaLine([date, readingTime]);

  const cover = (height: number): React.ReactElement => (
    <Image
      source={{ uri: coverImageUrl as string }}
      accessibilityIgnoresInvertColors
      style={{
        width: '100%',
        height,
        borderRadius: tokens.radius.lg,
        backgroundColor: mediaGround(theme),
      }}
      resizeMode="cover"
    />
  );

  return (
    <View style={[{ gap: tokens.spacing.md }, style]}>
      {coverImageUrl && !hero ? cover(coverHeight) : null}
      {category ? <CategoryChipV4 label={category} variant={hero ? 'solid' : 'soft'} /> : null}
      <TextV4
        accessibilityRole="header"
        size={hero ? '3xl' : '2xl'}
        weight="bold"
        tone="onSurface"
        measure
      >
        {title}
      </TextV4>
      {deck ? (
        <TextV4 size="lg" tone="mutedText" measure>
          {deck}
        </TextV4>
      ) : null}
      {coverImageUrl && hero ? cover(heroHeight) : null}
      {author ? (
        <AuthorBylineV4 author={author} date={date} readingTime={readingTime} variant="full" />
      ) : meta ? (
        <TextV4 size="sm" tone="mutedText">
          {meta}
        </TextV4>
      ) : null}
    </View>
  );
}
