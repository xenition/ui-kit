import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { Button } from '../primitives/Button';
import { Modal } from '../primitives/Modal';
import { Icon } from '../primitives/Icon';
import { toneClasses, timeRangeLabel, weekdayLabel, monthLongLabel } from './format';
import type { CalendarEvent } from './types';

export interface EventDetailSheetProps {
  /** The event to detail. When null the sheet renders nothing. */
  event: CalendarEvent | null;
  /** Optional long description body. */
  description?: string;
  /** Optional recurrence summary line (e.g. "Weekly on Monday"). */
  recurrenceLabel?: string;
  /** Optional timezone caption line. */
  timezoneLabel?: string;
  /**
   * `card` (default) renders inline; `modal` wraps the body in the `Modal`
   * primitive controlled by `open`/`onClose`.
   */
  variant?: 'card' | 'modal';
  /** Modal visibility (modal variant). */
  open?: boolean;
  /** Fires when the sheet requests to close. */
  onClose?: () => void;
  /** Shows an Edit action button when provided. */
  onEdit?: (event: CalendarEvent) => void;
  /** Shows a Delete action button (danger tone) when provided. */
  onDelete?: (event: CalendarEvent) => void;
  className?: string;
}

/**
 * An event detail sheet — the tap-target destination from any calendar surface.
 * Shows a tone bar + title, a formatted date/time line, location, description
 * and optional recurrence/timezone captions, plus Edit/Delete actions. Renders
 * inline (`card`) or inside the `Modal` primitive (`modal`). Token colors only.
 */
export function EventDetailSheet({
  event,
  description,
  recurrenceLabel,
  timezoneLabel,
  variant = 'card',
  open = true,
  onClose,
  onEdit,
  onDelete,
  className,
}: EventDetailSheetProps): React.ReactElement | null {
  if (event == null) return null;

  const tone = toneClasses(event.tone);
  const dateLine = `${weekdayLabel(event.start)}, ${monthLongLabel(event.start)} ${event.start.getDate()}`;
  const timeLine = event.allDay ? 'All day' : timeRangeLabel(event.start, event.end);

  const metaRow = (glyph: string, text: string, key: string): React.ReactElement => (
    <div key={key} className="mt-1 flex items-center">
      <Icon glyph={glyph} size="sm" color="muted" />
      <span className="ml-2 text-sm text-on-surface">{text}</span>
    </div>
  );

  const body = (
    <div className={className}>
      <div className="flex items-start">
        <span
          aria-hidden="true"
          className={cn('mr-2 w-1 shrink-0 self-stretch rounded-full', tone.accentBg)}
          style={{ minHeight: 28 }}
        />
        <h3 className="min-w-0 flex-1 text-xl font-extrabold text-on-surface">{event.title}</h3>
      </div>

      <div className="mt-2">
        {metaRow('🕑', `${dateLine} · ${timeLine}`, 'time')}
        {event.location ? metaRow('📍', event.location, 'loc') : null}
        {recurrenceLabel ? metaRow('🔁', recurrenceLabel, 'rec') : null}
        {timezoneLabel ? metaRow('🌐', timezoneLabel, 'tz') : null}
      </div>

      {description ? (
        <p className="mt-3 text-sm leading-relaxed text-muted">{description}</p>
      ) : null}

      {onEdit || onDelete || onClose ? (
        <div className="mt-4 flex items-center gap-2">
          {onEdit ? (
            <Button variant="primary" size="sm" onClick={() => onEdit(event)}>
              Edit
            </Button>
          ) : null}
          {onDelete ? (
            <Button variant="danger" size="sm" onClick={() => onDelete(event)}>
              Delete
            </Button>
          ) : null}
          <span className="flex-1" />
          {onClose ? (
            <Button variant="ghost" size="sm" onClick={onClose}>
              Close
            </Button>
          ) : null}
        </div>
      ) : null}
    </div>
  );

  if (variant === 'modal') {
    return (
      <Modal open={open} onClose={onClose ?? (() => undefined)}>
        {body}
      </Modal>
    );
  }

  return <Card>{body}</Card>;
}
