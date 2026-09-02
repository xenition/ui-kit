import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, Rating, Progress, Button } from '../primitives';
import type { CourseCardProps, CourseLevel } from './CourseCard';

/** V4 layout choices for the "campus" design. */
export type CourseCardLayout = 'full' | 'compact';

/** Drop-in for {@link CourseCardProps} — same props, the V4 "campus" design. */
export interface CourseCardV4Props extends CourseCardProps {
  /** V4 layout: `full` (card, default) or `compact` (dense single row). */
  variant?: CourseCardLayout;
}

const LEVEL_META: Record<CourseLevel, { label: string; tone: 'success' | 'warn' | 'danger' }> = {
  beginner: { label: 'Beginner', tone: 'success' },
  intermediate: { label: 'Intermediate', tone: 'warn' },
  advanced: { label: 'Advanced', tone: 'danger' },
};

/**
 * CourseCard — **V4** "campus" design (web parity of the native V4). The bright,
 * modern learning-platform take on a course: an elevated rounded card with a soft
 * shadow, a soft-primary media well (thumbnail or glyph), level + category
 * badges, the title + instructor, a rating, a lessons · duration stat strip, an
 * optional progress bar with a **tabular-nums** percentage, price, and one
 * dominant CTA (Continue when in progress, else Enroll). Honors the V4 `variant`
 * — `full` (card, default) and `compact` (a dense single row). All colors from
 * `--xen-*` token classes (no literals).
 */
export const CourseCardV4 = React.forwardRef<HTMLDivElement, CourseCardV4Props>(function CourseCardV4(
  { title, instructor, thumbnail, glyph = '📚', level, category, lessonCount, durationLabel, rating, ratingCount, progress, price, ctaLabel, onCtaClick, variant = 'full', className, ...rest },
  ref
) {
  const levelMeta = level ? LEVEL_META[level] : undefined;
  const inProgress = progress != null;
  const label = ctaLabel ?? (inProgress ? 'Continue' : 'Enroll');
  const shell = 'rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm';
  const cta = onCtaClick ? (
    <Button size="sm" onClick={onCtaClick} aria-label={`${label}: ${title}`}>{label}</Button>
  ) : null;

  // ── compact: dense single row ──
  if (variant === 'compact') {
    return (
      <div
        ref={ref}
        data-xen-course-card=""
        aria-label={`Course: ${title}${instructor ? `, by ${instructor}` : ''}`}
        className={cn(shell, 'flex items-center gap-[var(--xen-space-sm)] p-[var(--xen-space-sm)]', className)}
        {...rest}
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-[var(--xen-radius-md)] bg-primary/10 text-xl">
          {thumbnail ? <img src={thumbnail} alt="" className="h-full w-full object-cover" /> : <span aria-hidden="true">{glyph}</span>}
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate text-sm font-bold text-on-surface">{title}</span>
          {instructor ? <span className="truncate text-xs text-muted">{instructor}</span> : null}
        </div>
        {levelMeta ? <Badge tone={levelMeta.tone} variant="soft">{levelMeta.label}</Badge> : null}
        {cta}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      data-xen-course-card=""
      aria-label={`Course: ${title}${instructor ? `, by ${instructor}` : ''}`}
      className={cn(shell, 'overflow-hidden', className)}
      {...rest}
    >
      <div className="flex h-32 items-center justify-center bg-primary/10">
        {thumbnail ? (
          <img src={thumbnail} alt="" className="h-full w-full object-cover" />
        ) : (
          <span className="text-4xl" aria-hidden="true">{glyph}</span>
        )}
      </div>

      <div className="flex flex-col gap-2 p-[var(--xen-space-lg)]">
        {levelMeta || category ? (
          <div className="flex gap-1">
            {levelMeta ? <Badge tone={levelMeta.tone} variant="soft">{levelMeta.label}</Badge> : null}
            {category ? <Badge tone="neutral" variant="soft">{category}</Badge> : null}
          </div>
        ) : null}

        <h3 className="line-clamp-2 text-lg font-bold text-on-surface">{title}</h3>
        {instructor ? <p className="truncate text-sm text-muted">{instructor}</p> : null}

        {rating != null ? (
          <div className="flex items-center gap-1">
            <Rating value={rating} size="sm" showValue />
            {ratingCount != null ? <span className="text-xs tabular-nums text-muted">({ratingCount})</span> : null}
          </div>
        ) : null}

        {lessonCount != null || durationLabel ? (
          <div className="flex flex-wrap items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] bg-primary/5 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]">
            {lessonCount != null ? <span className="text-xs tabular-nums text-muted">📘 {lessonCount} lessons</span> : null}
            {durationLabel ? <span className="text-xs tabular-nums text-muted">⏱ {durationLabel}</span> : null}
          </div>
        ) : null}

        {inProgress ? (
          <div className="flex flex-col gap-1">
            <Progress value={progress} tone="primary" size="sm" />
            <span className="text-xs tabular-nums text-muted">{Math.round(progress)}% complete</span>
          </div>
        ) : null}

        <div className="mt-1 flex items-center justify-between">
          {price ? <span className="text-lg font-bold tabular-nums text-on-surface">{price}</span> : <span />}
          {cta}
        </div>
      </div>
    </div>
  );
});
