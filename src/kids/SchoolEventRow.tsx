import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, Icon } from '../primitives';
import type { BadgeTone } from '../primitives';

/** School-calendar item type. Drives the icon + type chip. */
export type SchoolEventType =
  | 'holiday'
  | 'exam'
  | 'meeting'
  | 'trip'
  | 'activity'
  | 'deadline'
  | 'other';

interface TypeMeta {
  glyph: string;
  label: string;
  tone: BadgeTone;
}

// Native `accent` tone maps to `primary` on web (web Badge has no accent).
const TYPE_META: Record<SchoolEventType, TypeMeta> = {
  holiday: { glyph: '🏖️', label: 'Holiday', tone: 'success' },
  exam: { glyph: '📝', label: 'Exam', tone: 'danger' },
  meeting: { glyph: '👥', label: 'Meeting', tone: 'primary' },
  trip: { glyph: '🚌', label: 'Trip', tone: 'primary' },
  activity: { glyph: '⚽', label: 'Activity', tone: 'primary' },
  deadline: { glyph: '⏳', label: 'Deadline', tone: 'warn' },
  other: { glyph: '🏫', label: 'Event', tone: 'neutral' },
};

export interface SchoolEventRowProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'title'> {
  /** Event title, e.g. "Parent-teacher conference". */
  title: string;
  /** Event type; drives the icon + type chip. */
  type?: SchoolEventType;
  /** Date label, e.g. "Mon, Sep 4". */
  date?: string;
  /** Time label, e.g. "3:00 PM". */
  time?: string;
  /** Location, e.g. "Room 12". */
  location?: string;
  /** Which child this concerns. */
  childName?: string;
  /** Fires when the row is activated. */
  onClick?: () => void;
}

/**
 * A row for a school-calendar item: a type icon, title, a date/time/location
 * line, and a type chip. When `onClick` is set the row is an accessible
 * `role="button"` with keyboard activation. Type is conveyed by glyph + label +
 * chip, not color alone. Token-bound throughout — no literal colors.
 */
export const SchoolEventRow = React.forwardRef<HTMLDivElement, SchoolEventRowProps>(
  function SchoolEventRow(
    { title, type = 'other', date, time, location, childName, onClick, className, ...rest },
    ref
  ) {
    const meta = TYPE_META[type] ?? TYPE_META.other;
    const metaParts = [date, time, location].filter((s): s is string => !!s);
    const interactive = typeof onClick === 'function';
    const a11y = `${meta.label}: ${title}${date ? `, ${date}` : ''}`;
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
      if (interactive && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onClick?.();
      }
    };

    return (
      <div
        ref={ref}
        data-xen-school-event-row=""
        className={cn(
          'flex items-center gap-3 rounded-[var(--xen-radius-md)] border border-border bg-surface px-3 py-2',
          interactive && 'cursor-pointer transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          className
        )}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={a11y}
        onClick={interactive ? () => onClick?.() : undefined}
        onKeyDown={interactive ? handleKeyDown : undefined}
        {...rest}
      >
        <Icon glyph={meta.glyph} size="xl" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-semibold text-on-surface">{title}</p>
          {metaParts.length > 0 ? (
            <p className="truncate text-xs text-muted">{metaParts.join(' · ')}</p>
          ) : null}
          {childName ? <p className="truncate text-xs text-muted">👶 {childName}</p> : null}
        </div>
        <Badge tone={meta.tone}>{meta.label}</Badge>
      </div>
    );
  }
);
