import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { CardV4 } from '../primitives/CardV4';
import { SkeletonV4 } from '../primitives/SkeletonV4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import type { ArticleCardProps } from './ArticleCard';
import { AuthorBylineV4 } from './AuthorBylineV4';
import { CategoryChipV4 } from './CategoryChipV4';
import { MEDIA_GROUND_CLASS, metaLine, spokenLine, TONE_INK } from './internal/reading-v4';

export interface ArticleCardV4Props extends ArticleCardProps {
  /**
   * The busy name announced while the placeholder is up. Default
   * `'Loading article'`.
   */
  loadingLabel?: string;
}

/**
 * Hero heights, composed from the spacing scale rather than typed: `160` and
 * `200` at the kit's own rhythm, so a re-scaled seed moves them with it.
 */
const IMAGE_HEIGHT = {
  standard: 'h-[calc(var(--xen-space-2xl)_*_3_+_var(--xen-space-md))]',
  featured: 'h-[calc(var(--xen-space-2xl)_*_4_+_var(--xen-space-sm))]',
} as const;

/** The compact thumbnail — 88 square, as `2xl + xl + sm`. */
const THUMB_CLASS = [
  'h-[calc(var(--xen-space-2xl)_+_var(--xen-space-xl)_+_var(--xen-space-sm))]',
  'w-[calc(var(--xen-space-2xl)_+_var(--xen-space-xl)_+_var(--xen-space-sm))]',
].join(' ');

/**
 * **V4 article card** — the web twin of the native `ArticleCardV4`, same props
 * as {@link ArticleCard} plus `loadingLabel`.
 *
 * ## Five changes
 *
 * 1. **A loading card can no longer be clicked.** The base computed
 *    `interactive` above the loading branch and still hung `role="button"`,
 *    `aria-label` and `onClick` around the skeleton, so a user could tap a
 *    placeholder and open an article that had not arrived. The loading branch
 *    now returns first, inert, named by `loadingLabel` as a polite `status`.
 * 2. **The activation is a real `<button>`**, not a `div` carrying
 *    `role="button"`, `tabIndex` and a hand-written Enter/Space handler. It is
 *    laid over the card rather than wrapped around it, because the body holds
 *    a heading, a paragraph and a byline — block content that is invalid
 *    inside a button and that a wrapping label would swallow.
 * 3. **The image placeholder is the shared media ground.** Web painted
 *    `bg-neutral-100`, a raw ramp step that ignores the seed; native painted
 *    `colors.border`, a hairline token spent as a fill.
 * 4. **Press and hover are the M3 state layer**, not `hover:opacity-90` —
 *    dimming a card is how the kit says *disabled*.
 * 5. **Meta text takes `mutedText`**, the contrast-corrected ink, never the
 *    `muted` fill slot.
 */
export const ArticleCardV4 = React.forwardRef<HTMLDivElement, ArticleCardV4Props>(
  function ArticleCardV4(
    {
      article,
      onClick,
      variant = 'standard',
      loading = false,
      loadingLabel = 'Loading article',
      className,
      ...rest
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    const compact = variant === 'compact';
    const featured = variant === 'featured';
    const imageHeight = IMAGE_HEIGHT[featured ? 'featured' : 'standard'];

    /*
      This branch returns FIRST, and that is the whole point of it. The base
      decided the card was interactive before it decided the card was still
      loading, so the skeleton kept the handler.
    */
    if (loading) {
      return (
        <CardV4
          ref={ref}
          role="status"
          aria-busy="true"
          aria-label={loadingLabel}
          className={className}
          {...rest}
        >
          {compact ? (
            <div className="flex gap-md">
              <SkeletonV4 variant="rect" className={cn('shrink-0', THUMB_CLASS)} />
              <div className="flex min-w-0 flex-1 flex-col gap-sm">
                <SkeletonV4 variant="rect" width="90%" className="h-[var(--xen-text-lg)]" />
                <SkeletonV4 variant="rect" width="60%" className="h-[var(--xen-text-sm)]" />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-sm">
              <SkeletonV4 variant="rect" width="100%" className={imageHeight} />
              <SkeletonV4 variant="rect" width="90%" className="h-[var(--xen-text-xl)]" />
              <SkeletonV4 variant="rect" width="70%" className="h-[var(--xen-text-sm)]" />
            </div>
          )}
        </CardV4>
      );
    }

    /*
      After the loading branch, never before it. `RelatedArticles` draws its
      placeholders as `{ id, title: '' }`, so a guard hoisted above the branch
      would blank the whole skeleton grid — the state the guard exists to make
      look right.
    */
    if (!article?.title) return null;

    const meta = metaLine([article.date, article.readingTime]);

    const body = compact ? (
      <div className="flex items-center gap-md">
        {article.imageUrl ? (
          <img
            src={article.imageUrl}
            alt=""
            loading="lazy"
            className={cn(
              'shrink-0 rounded-[var(--xen-radius-md)] object-cover',
              MEDIA_GROUND_CLASS,
              THUMB_CLASS
            )}
          />
        ) : null}
        <div className="flex min-w-0 flex-1 flex-col gap-xs">
          {article.category ? <CategoryChipV4 label={article.category} variant="soft" /> : null}
          <h3 className="line-clamp-3 text-base font-bold leading-snug text-on-surface">
            {article.title}
          </h3>
          {meta ? <p className={cn('text-xs', TONE_INK.muted)}>{meta}</p> : null}
        </div>
      </div>
    ) : (
      <div className="flex flex-col gap-sm">
        {article.imageUrl ? (
          <img
            src={article.imageUrl}
            alt=""
            loading="lazy"
            className={cn(
              'w-full rounded-[var(--xen-radius-md)] object-cover',
              MEDIA_GROUND_CLASS,
              imageHeight
            )}
          />
        ) : null}
        {article.category ? <CategoryChipV4 label={article.category} variant="soft" /> : null}
        <h3
          className={cn(
            'font-bold leading-tight text-on-surface',
            featured ? 'line-clamp-3 text-xl' : 'line-clamp-2 text-lg'
          )}
        >
          {article.title}
        </h3>
        {article.excerpt ? (
          <p
            className={cn(
              'text-sm leading-relaxed',
              TONE_INK.muted,
              featured ? 'line-clamp-3' : 'line-clamp-2'
            )}
          >
            {article.excerpt}
          </p>
        ) : null}
        {article.author ? (
          <AuthorBylineV4
            author={article.author}
            date={article.date}
            readingTime={article.readingTime}
            variant="compact"
          />
        ) : meta ? (
          <p className={cn('text-xs', TONE_INK.muted)}>{meta}</p>
        ) : null}
      </div>
    );

    if (!onClick) {
      return (
        <CardV4 ref={ref} className={className} {...rest}>
          {body}
        </CardV4>
      );
    }

    /*
      The card's hover and press live on the CARD, and its activation lives on
      a button laid over it. Wrapping the body in the button instead would put
      an `<h3>`, a `<p>` and the byline's own group inside a `<button>` — block
      content a button may not contain, and a name that would replace all three.
    */
    return (
      <CardV4
        ref={ref}
        data-xen-v4-state=""
        style={stateGroundVars('var(--xen-surface)', 'var(--xen-on-surface)') as React.CSSProperties}
        className={cn('relative', className)}
        {...rest}
      >
        {body}
        <button
          type="button"
          aria-label={spokenLine([
            article.title,
            article.category,
            article.author?.name,
            article.date,
            article.readingTime,
          ])}
          onClick={() => onClick(article)}
          className={cn(
            'absolute inset-0 bg-transparent',
            'rounded-[var(--xen-radius-lg)]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
          )}
        />
      </CardV4>
    );
  }
);
