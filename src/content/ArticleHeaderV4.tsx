import * as React from 'react';
import { cn } from '../primitives/cn';
import { SkeletonV4 } from '../primitives/SkeletonV4';
import type { ArticleHeaderProps } from './ArticleHeader';
import { AuthorBylineV4 } from './AuthorBylineV4';
import { CategoryChipV4 } from './CategoryChipV4';
import { MEDIA_GROUND_CLASS, metaLine, TONE_INK } from './internal/reading-v4';

export interface ArticleHeaderV4Props extends ArticleHeaderProps {
  /**
   * The busy name announced while the placeholder is up. Default
   * `'Loading article'`.
   */
  loadingLabel?: string;
}

/**
 * The headline's line box as a multiple of its type step — the `leading-tight`
 * the `<h1>` below is actually set in.
 *
 * Named once, and named the same on both twins, because the type scale alone
 * does not settle the placeholder: it gives the glyph size, not the box the
 * glyph sits in. Web typed `44` and `36` while native computed
 * `titleSize * 1.3`, so one variant drew two different skeletons and neither
 * web bar matched the headline that replaced it. Change this number here and
 * the native twin has to move with it.
 */
const TITLE_LEADING = 1.3;

/** The headline placeholder, per variant: the type step times {@link TITLE_LEADING}. */
const TITLE_SKELETON = {
  standard: `h-[calc(var(--xen-text-2xl)_*_${TITLE_LEADING})]`,
  hero: `h-[calc(var(--xen-text-3xl)_*_${TITLE_LEADING})]`,
} as const;

/** Cover heights from the spacing scale — 224 standard, 256 hero. */
const COVER_HEIGHT = {
  standard: 'h-[calc(var(--xen-space-2xl)_*_4_+_var(--xen-space-xl))]',
  hero: 'h-[calc(var(--xen-space-2xl)_*_5_+_var(--xen-space-md))]',
} as const;

/**
 * **V4 article header** — the web twin of the native `ArticleHeaderV4`, same
 * props as {@link ArticleHeader} plus `loadingLabel`.
 *
 * ## Four changes
 *
 * 1. **The skeleton title is the size of the title.** Web typed `44`/`36`
 *    while native derived `titleSize * 1.3`, so one variant drew two different
 *    placeholders and neither web bar matched the headline it stood in for.
 *    Both twins now derive it from the type scale.
 * 2. **The hero placeholder is the shared media ground**, not `bg-neutral-100`
 *    (a raw ramp step that ignores the seed) on web and `colors.border` (a
 *    hairline token spent as a fill) on native.
 * 3. **The deck and the meta line take `mutedText`**, the contrast-corrected
 *    ink slot, where the base inked them with the `muted` fill.
 * 4. **Loading announces itself.** The base drew five grey bars in silence;
 *    the placeholder is now a polite `status` named by `loadingLabel`.
 */
export const ArticleHeaderV4 = React.forwardRef<HTMLElement, ArticleHeaderV4Props>(
  function ArticleHeaderV4(
    {
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
      className,
      ...rest
    },
    ref
  ) {
    const hero = variant === 'hero';
    const key = hero ? 'hero' : 'standard';

    if (loading) {
      return (
        <header
          ref={ref}
          role="status"
          aria-busy="true"
          aria-label={loadingLabel}
          className={cn('flex flex-col gap-md', className)}
          {...rest}
        >
          <SkeletonV4 variant="rect" width="30%" className="h-[var(--xen-text-lg)]" />
          <SkeletonV4 variant="rect" width="90%" className={TITLE_SKELETON[key]} />
          <SkeletonV4 variant="rect" width="70%" className={TITLE_SKELETON[key]} />
          <SkeletonV4 variant="rect" width="100%" className={COVER_HEIGHT[key]} />
          <SkeletonV4 variant="rect" width="45%" className="h-[calc(var(--xen-space-xl)_+_var(--xen-space-sm))]" />
        </header>
      );
    }

    const cover = coverImageUrl ? (
      <img
        src={coverImageUrl}
        alt=""
        loading="lazy"
        className={cn(
          'w-full rounded-[var(--xen-radius-lg)] object-cover',
          MEDIA_GROUND_CLASS,
          COVER_HEIGHT[key]
        )}
      />
    ) : null;

    const meta = metaLine([date, readingTime]);

    return (
      <header ref={ref} className={cn('flex flex-col gap-md', className)} {...rest}>
        {/* `standard` leads with the cover; `hero` leads with the headline and
            drops the cover in under the deck. Same image, two reading orders. */}
        {hero ? null : cover}
        {category ? (
          <CategoryChipV4 label={category} variant={hero ? 'solid' : 'soft'} />
        ) : null}
        <h1
          className={cn('font-bold leading-tight text-on-surface', hero ? 'text-3xl' : 'text-2xl')}
        >
          {title}
        </h1>
        {deck ? <p className={cn('text-lg leading-relaxed', TONE_INK.muted)}>{deck}</p> : null}
        {hero ? cover : null}
        {author ? (
          <AuthorBylineV4 author={author} date={date} readingTime={readingTime} variant="full" />
        ) : meta ? (
          <p className={cn('text-sm', TONE_INK.muted)}>{meta}</p>
        ) : null}
      </header>
    );
  }
);
