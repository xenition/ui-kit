import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, Rating, Progress, Button } from '../primitives';

/** Difficulty level — drives the level tag tone + label. */
export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';

interface LevelMeta {
  label: string;
  tone: 'success' | 'warn' | 'danger';
}

const LEVEL_META: Record<CourseLevel, LevelMeta> = {
  beginner: { label: 'Beginner', tone: 'success' },
  intermediate: { label: 'Intermediate', tone: 'warn' },
  advanced: { label: 'Advanced', tone: 'danger' },
};

export interface CourseCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Course title. */
  title: string;
  /** Instructor / author name. */
  instructor?: string;
  /** Remote thumbnail image URL. */
  thumbnail?: string;
  /** Emoji/glyph shown when there's no thumbnail. */
  glyph?: string;
  /** Difficulty; sets the level tag. */
  level?: CourseLevel;
  /** Short subject / category label. */
  category?: string;
  /** Number of lessons in the course. */
  lessonCount?: number;
  /** Human duration label, e.g. "4h 30m". */
  durationLabel?: string;
  /** Average rating (0–5). */
  rating?: number;
  /** Number of ratings, shown next to the stars. */
  ratingCount?: number;
  /** Enrollment progress 0–100. When set, the card reads as "in progress". */
  progress?: number;
  /** Price label, e.g. "$49" or "Free". */
  price?: string;
  /** CTA label; defaults to "Continue" when `progress` is set, else "Enroll". */
  ctaLabel?: string;
  /** Fires when the CTA is clicked. */
  onCtaClick?: () => void;
}

/**
 * A course summary card: thumbnail (or glyph fallback), level + category tags,
 * title, instructor, a lessons / duration / rating stat strip, an optional
 * progress bar, price, and a single dominant CTA. `progress` flips the card into
 * an "in progress" state (Continue). Token-only colors (`--xen-*`).
 */
export const CourseCard = React.forwardRef<HTMLDivElement, CourseCardProps>(function CourseCard(
  {
    title,
    instructor,
    thumbnail,
    glyph = '📚',
    level,
    category,
    lessonCount,
    durationLabel,
    rating,
    ratingCount,
    progress,
    price,
    ctaLabel,
    onCtaClick,
    className,
    ...rest
  },
  ref
) {
  const levelMeta: LevelMeta | undefined = level ? LEVEL_META[level] : undefined;
  const inProgress = progress != null;
  const label = ctaLabel ?? (inProgress ? 'Continue' : 'Enroll');

  return (
    <div
      ref={ref}
      aria-label={`Course: ${title}${instructor ? `, by ${instructor}` : ''}`}
      className={cn(
        'overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface',
        className
      )}
      {...rest}
    >
      <div className="flex h-32 items-center justify-center bg-accent">
        {thumbnail ? (
          <img src={thumbnail} alt="" className="h-full w-full object-cover" />
        ) : (
          <span className="text-3xl" aria-hidden="true">
            {glyph}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2 p-[var(--xen-space-lg)]">
        {levelMeta || category ? (
          <div className="flex gap-1">
            {levelMeta ? <Badge tone={levelMeta.tone}>{levelMeta.label}</Badge> : null}
            {category ? <Badge tone="neutral">{category}</Badge> : null}
          </div>
        ) : null}

        <h3 className="line-clamp-2 text-lg font-bold text-on-surface">{title}</h3>
        {instructor ? <p className="truncate text-sm text-muted">{instructor}</p> : null}

        {rating != null ? (
          <div className="flex items-center gap-1">
            <Rating value={rating} size="sm" showValue />
            {ratingCount != null ? <span className="text-xs text-muted">({ratingCount})</span> : null}
          </div>
        ) : null}

        {lessonCount != null || durationLabel ? (
          <div className="flex gap-4">
            {lessonCount != null ? <span className="text-xs text-muted">{lessonCount} lessons</span> : null}
            {durationLabel ? <span className="text-xs text-muted">{durationLabel}</span> : null}
          </div>
        ) : null}

        {inProgress ? (
          <div className="flex flex-col gap-1">
            <Progress value={progress} tone="primary" size="sm" />
            <span className="text-xs text-muted">{Math.round(progress)}% complete</span>
          </div>
        ) : null}

        <div className="mt-1 flex items-center justify-between">
          {price ? <span className="text-lg font-bold text-on-surface">{price}</span> : <span />}
          {onCtaClick ? (
            <Button size="sm" onClick={onCtaClick} aria-label={`${label}: ${title}`}>
              {label}
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
});
