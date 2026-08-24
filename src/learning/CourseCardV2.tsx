import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, Button, Progress } from '../primitives';
import type { CourseCardProps } from './CourseCard';

/** Same public contract as {@link CourseCard} — a drop-in alternate design. */
export type CourseCardV2Props = CourseCardProps;

const LEVEL_LABEL = { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' } as const;

/**
 * CourseCard, redesigned (v2): a **media-hero course card**. The thumbnail fills
 * a wide top banner with the level tag and price floating over a scrim; title,
 * instructor, meta, an optional progress bar, and a full-width CTA sit on the
 * surface below. Elevated with a hover lift. Same props as {@link CourseCard},
 * token-only.
 */
export const CourseCardV2 = React.forwardRef<HTMLDivElement, CourseCardV2Props>(function CourseCardV2(
  { title, instructor, thumbnail, glyph = '📚', level, category, lessonCount, durationLabel, rating, ratingCount, progress, price, ctaLabel, onCtaClick, className, ...rest },
  ref
) {
  const inProgress = typeof progress === 'number';
  const cta = ctaLabel ?? (inProgress ? 'Continue' : 'Enroll');
  const meta = [
    category,
    typeof lessonCount === 'number' ? `${lessonCount} lessons` : null,
    durationLabel,
    typeof rating === 'number' ? `★ ${rating.toFixed(1)}${typeof ratingCount === 'number' ? ` (${ratingCount})` : ''}` : null,
  ].filter((s): s is string => !!s);

  return (
    <div
      ref={ref}
      data-xen-course-card=""
      className={cn(
        'flex flex-col overflow-hidden rounded-lg bg-surface shadow-md transition-transform hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0',
        className
      )}
      {...rest}
    >
      <div className="relative h-32 bg-neutral-100">
        {thumbnail ? (
          <img src={thumbnail} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-4xl">{glyph}</div>
        )}
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-2">
          {level ? <Badge tone="primary">{LEVEL_LABEL[level]}</Badge> : <span />}
          {price ? (
            <span className="rounded-full bg-surface/90 px-2 py-0.5 text-xs font-bold text-on-surface">{price}</span>
          ) : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-md">
        <div>
          <p className="text-base font-bold text-on-surface">{title}</p>
          {instructor ? <p className="text-xs text-muted">{instructor}</p> : null}
        </div>
        {meta.length > 0 ? <p className="text-xs text-muted">{meta.join(' · ')}</p> : null}
        {inProgress ? (
          <div className="flex items-center gap-2">
            <Progress value={progress} tone="primary" size="sm" className="flex-1" />
            <span className="text-xs font-semibold text-muted">{progress}%</span>
          </div>
        ) : null}
        {onCtaClick ? (
          <Button size="md" variant="primary" className="mt-1 w-full" onClick={onCtaClick}>
            {cta}
          </Button>
        ) : null}
      </div>
    </div>
  );
});
