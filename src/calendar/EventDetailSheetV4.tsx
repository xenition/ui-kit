import * as React from 'react';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import { ModalV4 } from '../primitives/ModalV4';
import { timeRangeLabel } from './format';
import { eventTone, metaLine, TONE_VAR } from './internal/grid-v4';
import type { EventDetailSheetProps } from './EventDetailSheet';

export interface EventDetailSheetV4Props extends EventDetailSheetProps {
  /** CTA copy. Defaults `'Edit'` / `'Delete'`. */
  editLabel?: string;
  deleteLabel?: string;
  /** Accessible name for the close control. Default `'Close'`. */
  closeLabel?: string;
  /** Announced for an all-day event. Default `'All day'`. */
  allDayLabel?: string;
}

/**
 * **V4 event detail sheet** — the web twin of the native
 * `EventDetailSheetV4`, same props as {@link EventDetailSheet} plus four copy
 * hooks.
 *
 * ## Four changes
 *
 * 1. **The modal variant is `ModalV4`.** The base hand-rolled an overlay, so
 *    it had no scrim, no focus trap, no Escape and no restore — four things
 *    the primitive already does, and the ones that matter most on the surface
 *    that takes a destructive action.
 * 2. **Delete is not the same weight as edit.** A destructive action drawn as
 *    a peer of a routine one is how people delete things by accident.
 * 3. **The event's tone reaches the sheet** as a leading rail, so the sheet
 *    and the block a user clicked read as the same object.
 * 4. **Every field is a labelled row**, announced as a pair.
 *
 * **Renders nothing without an event** (§4.5).
 */
export const EventDetailSheetV4 = React.forwardRef<HTMLDivElement, EventDetailSheetV4Props>(
  function EventDetailSheetV4(
    {
      event,
      description,
      recurrenceLabel,
      timezoneLabel,
      variant = 'card',
      open = true,
      editLabel = 'Edit',
      deleteLabel = 'Delete',
      // `ModalV4` titles its own dismiss; `closeLabel` stays in the props for
      // parity with the native twin and reaches the dialog's name.
      closeLabel = 'Close',
      allDayLabel = 'All day',
      onClose,
      onEdit,
      onDelete,
      className,
    },
    ref
  ) {
    if (!event) return null;

    const tone = eventTone(event.tone);
    const time = event.allDay ? allDayLabel : timeRangeLabel(event.start, event.end);

    const row = (glyph: 'clock' | 'location' | 'refresh' | 'globe', value: string) => (
      <div key={`${glyph}-${value}`} className="flex items-center gap-sm">
        <IconV4 name={glyph} size="sm" className="text-muted-text" />
        <span className="min-w-0 flex-1 text-sm text-on-card">{value}</span>
      </div>
    );

    const body = (
      <div className="flex gap-md">
        <span
          aria-hidden
          className="w-[3px] shrink-0 self-stretch rounded-full"
          style={{ background: TONE_VAR[tone] }}
        />
        <div className="flex min-w-0 flex-1 flex-col gap-sm">
          <div className="flex items-center gap-sm">
            <h3 className="min-w-0 flex-1 font-heading text-lg font-bold text-on-card">
              {event.title}
            </h3>
            {event.allDay ? (
              <BadgeV4 tone={tone} variant="soft" size="sm">
                {allDayLabel}
              </BadgeV4>
            ) : null}
          </div>

          {time ? row('clock', time) : null}
          {event.location ? row('location', event.location) : null}
          {recurrenceLabel ? row('refresh', recurrenceLabel) : null}
          {timezoneLabel ? row('globe', timezoneLabel) : null}

          {description ? <p className="text-sm text-muted-text">{description}</p> : null}

          {onEdit || onDelete ? (
            <div className="mt-sm flex flex-col gap-sm">
              {onEdit ? (
                <ButtonV4
                  variant="primary"
                  size="md"
                  onClick={() => onEdit(event)}
                  aria-label={`${editLabel}, ${event.title}`}
                >
                  {editLabel}
                </ButtonV4>
              ) : null}
              {/* Destructive, quiet, and below — never a peer of edit. */}
              {onDelete ? (
                <ButtonV4
                  variant="ghost"
                  tone="danger"
                  size="md"
                  onClick={() => onDelete(event)}
                  aria-label={`${deleteLabel}, ${event.title}`}
                >
                  {deleteLabel}
                </ButtonV4>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    );

    if (variant === 'modal') {
      return (
        <ModalV4
          open={open}
          onClose={onClose ?? (() => undefined)}
          title={event.title}
          aria-label={metaLine([event.title, time, closeLabel])}
        >
          {body}
        </ModalV4>
      );
    }

    return (
      <CardV4 ref={ref} data-xen-event-detail="" className={className}>
        {body}
      </CardV4>
    );
  }
);
