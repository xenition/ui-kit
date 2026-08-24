import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives';
import type { CourseCardProps } from './CourseCard';

/** Same public contract as {@link CourseCard} — a drop-in alternate design. */
export type CourseCardV3Props = CourseCardProps;

const LEVEL_LABEL = { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' } as const;

/**
 * CourseCard, redesigned (v3): a **compact catalog row**. A small square glyph/
 * thumbnail tile leads, the title sits over a single middot-joined meta line,
 * and the price + a quiet CTA hug the right edge. A thin progress underline shows
 * when in progress. Borderless list-friendly — the opposite of v2's hero card.
 * Same props, token-only.
 */
export const CourseCardV3 = React.forwardRef<HTMLDivElement, CourseCardV3Props>(function CourseCardV3(
  { title, instructor, thumbnail, glyph = '📚', level, category, lessonCount, durationLabel, rating, ratingCount, progress, price, ctaLabel, onCtaClick, className, ...rest },
  ref
) {
  void ratingCount;
  const inProgress = typeof progress === 'number';
  const cta = ctaLabel ?? (inProgress ? 'Continue' : 'Enroll');
  const meta = [
    instructor,
    level ? LEVEL_LABEL[level] : category,
    typeof lessonCount === 'number' ? `${lessonCount} lessons` : durationLabel,
    typeof rating === 'number' ? `★ ${rating.toFixed(1)}` : null,
  ].filter((s): s is string => !!s);

  return (
    <div
      ref={ref}
      data-xen-course-card=""
      className={cn('flex items-center gap-3 border-b border-border py-3', className)}
      {...rest}
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md bg-neutral-100 text-xl">
        {thumbnail ? <img src={thumbnail} alt="" className="h-full w-full object-cover" /> : glyph}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-on-surface">{title}</p>
        {meta.length > 0 ? <p className="truncate text-xs text-muted">{meta.join(' · ')}</p> : null}
        {inProgress ? (
          <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-neutral-100">
            <div className="h-full rounded-full bg-primary" style={{ width: `${Math.max(0, Math.min(100, progress))}%` }} />
          </div>
        ) : null}
      </div>
      <div className="flex flex-col items-end gap-1">
        {price ? <span className="text-xs font-bold text-on-surface">{price}</span> : null}
        {onCtaClick ? (
          <Button size="sm" variant="ghost" onClick={onCtaClick}>
            {cta}
          </Button>
        ) : null}
      </div>
    </div>
  );
});
