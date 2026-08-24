import * as React from 'react';
import { cn } from '../primitives/cn';
import type { LessonRowProps, LessonStatus } from './LessonRow';

/** Same public contract as {@link LessonRow} — a drop-in alternate design. */
export type LessonRowV2Props = LessonRowProps;

const STATUS_META: Record<LessonStatus, { glyph: string; colorClass: string; a11y: string }> = {
  locked: { glyph: '🔒', colorClass: 'text-muted', a11y: 'locked' },
  available: { glyph: '▷', colorClass: 'text-primary', a11y: 'available' },
  'in-progress': { glyph: '◑', colorClass: 'text-accent', a11y: 'in progress' },
  completed: { glyph: '✓', colorClass: 'text-success', a11y: 'completed' },
};

/**
 * LessonRow, redesigned (v2): an **elevated lesson card**. A numbered disc leads,
 * a tinted status glyph tile marks state, the title sits over a kind·duration
 * meta line, and a chevron hints navigation. Completed rows tint their disc
 * success. Distinct from v1's flat row. Same props, token-only.
 */
export const LessonRowV2 = React.forwardRef<HTMLDivElement, LessonRowV2Props>(function LessonRowV2(
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
  const sub = [kind, durationLabel].filter((s): s is string => !!s);

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
        'flex items-center gap-3 rounded-lg bg-surface p-3 shadow-sm transition-transform',
        interactive && 'cursor-pointer hover:-translate-y-0.5 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0',
        locked && 'opacity-60',
        className
      )}
      {...rest}
    >
      {typeof index === 'number' ? (
        <span
          className={cn(
            'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold',
            done ? 'bg-success/10 text-success' : 'bg-neutral-100 text-on-surface'
          )}
        >
          {index}
        </span>
      ) : null}
      <span className={cn('text-lg', meta.colorClass)} aria-hidden>
        {meta.glyph}
      </span>
      <div className="min-w-0 flex-1">
        <p className={cn('truncate text-sm font-semibold text-on-surface', done && 'text-muted')}>{title}</p>
        {sub.length > 0 ? <p className="truncate text-xs text-muted">{sub.join(' · ')}</p> : null}
      </div>
      {interactive ? <span className="text-muted" aria-hidden>›</span> : null}
    </div>
  );
});
