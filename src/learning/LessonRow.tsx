import * as React from 'react';
import { cn } from '../primitives/cn';

/** Lesson lifecycle state — drives the leading indicator and interactivity. */
export type LessonStatus = 'locked' | 'available' | 'in-progress' | 'completed';

interface StatusMeta {
  glyph: string;
  /** Token `text-*` class for the glyph tone. */
  colorClass: string;
  a11y: string;
}

const STATUS_META: Record<LessonStatus, StatusMeta> = {
  locked: { glyph: '🔒', colorClass: 'text-muted', a11y: 'locked' },
  available: { glyph: '▷', colorClass: 'text-primary', a11y: 'available' },
  'in-progress': { glyph: '◑', colorClass: 'text-accent', a11y: 'in progress' },
  completed: { glyph: '✓', colorClass: 'text-success', a11y: 'completed' },
};

export interface LessonRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Lesson title. */
  title: string;
  /** Optional 1-based index shown before the title. */
  index?: number;
  /** Duration label, e.g. "12 min". */
  durationLabel?: string;
  /** Lifecycle state; `locked` disables interaction. */
  status?: LessonStatus;
  /** Content type hint, e.g. "Video", "Reading", "Quiz". */
  kind?: string;
  /** Fires on click (suppressed when `locked`). */
  onSelect?: () => void;
}

/**
 * A single lesson row for a course/module list: a status indicator (glyph +
 * semantic tone, never color alone), an optional index, title, content-kind and
 * duration meta, and a chevron affordance. `locked` rows are non-interactive and
 * announced as such. Interactive rows are a `role="button"` element with
 * Enter/Space keyboard activation. Token-only colors (`--xen-*`).
 */
export const LessonRow = React.forwardRef<HTMLDivElement, LessonRowProps>(function LessonRow(
  { title, index, durationLabel, status = 'available', kind, onSelect, className, ...rest },
  ref
) {
  const meta = STATUS_META[status];
  const locked = status === 'locked';
  const interactive = !!onSelect && !locked;
  const a11yLabel = `${title}, ${meta.a11y}${durationLabel ? `, ${durationLabel}` : ''}`;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (!interactive) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect?.();
    }
  };

  return (
    <div
      ref={ref}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={a11yLabel}
      onClick={interactive ? onSelect : undefined}
      onKeyDown={handleKeyDown}
      className={cn(
        'flex items-center gap-3 rounded-[var(--xen-radius-md)] bg-surface px-3 py-3',
        locked && 'opacity-60',
        interactive && 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        className
      )}
      {...rest}
    >
      <span aria-hidden="true" className={cn('text-base', meta.colorClass)}>
        {meta.glyph}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate text-base font-semibold text-on-surface">
          {index != null ? `${index}. ` : ''}
          {title}
        </span>
        {kind || durationLabel ? (
          <span className="text-xs text-muted">{[kind, durationLabel].filter(Boolean).join(' · ')}</span>
        ) : null}
      </div>
      {interactive ? (
        <span aria-hidden="true" className="text-base text-muted">
          ›
        </span>
      ) : null}
    </div>
  );
});
