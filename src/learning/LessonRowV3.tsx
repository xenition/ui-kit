import * as React from 'react';
import { cn } from '../primitives/cn';
import type { LessonRowProps, LessonStatus } from './LessonRow';

/** Same public contract as {@link LessonRow} — a drop-in alternate design. */
export type LessonRowV3Props = LessonRowProps;

const STATUS_META: Record<LessonStatus, { glyph: string; colorClass: string; a11y: string }> = {
  locked: { glyph: '🔒', colorClass: 'text-muted', a11y: 'locked' },
  available: { glyph: '▷', colorClass: 'text-primary', a11y: 'available' },
  'in-progress': { glyph: '◑', colorClass: 'text-accent', a11y: 'in progress' },
  completed: { glyph: '✓', colorClass: 'text-success', a11y: 'completed' },
};

/**
 * LessonRow, redesigned (v3): a **syllabus line**. The 1-based index leads as a
 * monospace-tabular number, the status glyph and title share one line, and the
 * duration/kind hug the right — hairline-separated for a tight table of contents.
 * The opposite of v2's elevated card. Same props, token-only.
 */
export const LessonRowV3 = React.forwardRef<HTMLDivElement, LessonRowV3Props>(function LessonRowV3(
  { title, index, durationLabel, status = 'available', kind, onSelect, className, ...rest },
  ref
) {
  const meta = STATUS_META[status];
  const locked = status === 'locked';
  const done = status === 'completed';
  const interactive = typeof onSelect === 'function' && !locked;
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (interactive && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onSelect?.();
    }
  };
  const right = [kind, durationLabel].filter((s): s is string => !!s).join(' · ');

  return (
    <div
      ref={ref}
      data-xen-lesson-row=""
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={`${typeof index === 'number' ? `Lesson ${index}, ` : ''}${title}, ${meta.a11y}`}
      aria-disabled={locked || undefined}
      onClick={interactive ? () => onSelect?.() : undefined}
      onKeyDown={interactive ? handleKeyDown : undefined}
      className={cn(
        'flex items-center gap-2.5 border-b border-border py-2',
        interactive && 'cursor-pointer transition-colors hover:bg-neutral-50',
        locked && 'opacity-60',
        className
      )}
      {...rest}
    >
      {typeof index === 'number' ? (
        <span className="w-6 shrink-0 text-right text-xs tabular-nums text-muted">{index}</span>
      ) : null}
      <span className={cn('text-sm', meta.colorClass)} aria-hidden>
        {meta.glyph}
      </span>
      <p className={cn('min-w-0 flex-1 truncate text-sm text-on-surface', done && 'text-muted')}>{title}</p>
      {right ? <span className="shrink-0 text-xs text-muted">{right}</span> : null}
    </div>
  );
});
