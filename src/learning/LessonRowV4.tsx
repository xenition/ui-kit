import * as React from 'react';
import { cn } from '../primitives/cn';
import type { LessonRowProps, LessonStatus } from './LessonRow';

/** V4 layout choices for the "campus" design. */
export type LessonRowLayout = 'full' | 'compact';

/** Drop-in for {@link LessonRowProps} — same props, the V4 "campus" design. */
export interface LessonRowV4Props extends LessonRowProps {
  /** V4 layout: `full` (default) or `compact` (denser single line). */
  variant?: LessonRowLayout;
}

const STATUS_META: Record<LessonStatus, { glyph: string; text: string; well: string; a11y: string }> = {
  locked: { glyph: '🔒', text: 'text-muted', well: 'bg-neutral-100', a11y: 'locked' },
  available: { glyph: '▷', text: 'text-primary', well: 'bg-primary/10', a11y: 'available' },
  'in-progress': { glyph: '◑', text: 'text-accent', well: 'bg-accent/10', a11y: 'in progress' },
  completed: { glyph: '✓', text: 'text-success', well: 'bg-success/10', a11y: 'completed' },
};

/**
 * LessonRow — **V4** "campus" design (web parity of the native V4). An elevated
 * rounded row with a soft shadow, a status glyph tucked in a tone-tinted well
 * (glyph + tone, never color alone), an optional index, the title, a content-kind
 * · duration meta line, and a chevron affordance. `locked` rows are
 * non-interactive and announced as such; interactive rows are a keyboard-operable
 * `role="button"`. Honors the V4 `variant` — `full` (default) and `compact` (a
 * denser single line that hides the meta). All colors from `--xen-*` token
 * classes (no literals).
 */
export const LessonRowV4 = React.forwardRef<HTMLDivElement, LessonRowV4Props>(function LessonRowV4(
  { title, index, durationLabel, status = 'available', kind, variant = 'full', onSelect, className, ...rest },
  ref
) {
  const meta = STATUS_META[status];
  const locked = status === 'locked';
  const interactive = !!onSelect && !locked;
  const compact = variant === 'compact';
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
      data-xen-lesson-row=""
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={a11yLabel}
      onClick={interactive ? onSelect : undefined}
      onKeyDown={handleKeyDown}
      className={cn(
        'flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm px-[var(--xen-space-md)]',
        compact ? 'min-h-[44px] py-[var(--xen-space-sm)]' : 'min-h-[56px] py-[var(--xen-space-sm)]',
        locked && 'opacity-60',
        interactive && 'cursor-pointer transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        className
      )}
      {...rest}
    >
      <span className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-base', meta.well, meta.text)}>
        <span aria-hidden="true">{meta.glyph}</span>
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate text-base font-semibold text-on-surface">
          {index != null ? `${index}. ` : ''}
          {title}
        </span>
        {!compact && (kind || durationLabel) ? (
          <span className="truncate text-xs text-muted">{[kind, durationLabel].filter(Boolean).join(' · ')}</span>
        ) : null}
      </div>
      {interactive ? <span aria-hidden="true" className="text-base text-muted">›</span> : null}
    </div>
  );
});
