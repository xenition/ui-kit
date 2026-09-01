import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { BottomSheetV4 } from '../primitives/BottomSheetV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { timeRangeLabel } from '../../calendar/format';
import { eventTone, metaLine, toneFill } from './internal/grid-v4';
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

/** The tone rail down the leading edge. 3px — a bar, not a hairline. */
const RAIL = 3;

/**
 * **V4 event detail sheet** — same props as {@link EventDetailSheet} plus four
 * copy hooks.
 *
 * ## Four changes
 *
 * 1. **The modal variant is `BottomSheetV4`.** The base hand-rolled an
 *    overlay, so it had no scrim, no focus containment, no safe-area inset and
 *    no drag-to-dismiss — four things the sheet primitive already does.
 * 2. **Delete is not the same weight as edit.** A destructive action drawn as
 *    a peer of a routine one is how people delete things by accident; it is
 *    now the quiet `danger` action, below.
 * 3. **The event's tone reaches the sheet** as a leading rail, so the sheet
 *    and the block a user tapped read as the same object.
 * 4. **Every field is a labelled row**, announced as a pair rather than as a
 *    run of loose lines.
 *
 * **Renders nothing without an event** (§4.5).
 */
export function EventDetailSheetV4({
  event,
  description,
  recurrenceLabel,
  timezoneLabel,
  variant = 'card',
  open = true,
  editLabel = 'Edit',
  deleteLabel = 'Delete',
  closeLabel = 'Close',
  allDayLabel = 'All day',
  onClose,
  onEdit,
  onDelete,
  style,
}: EventDetailSheetV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { tokens } = theme;
  if (!event) return null;

  const tone = eventTone(event.tone);
  const time = event.allDay ? allDayLabel : timeRangeLabel(event.start, event.end);

  const row = (glyph: 'clock' | 'location' | 'refresh' | 'globe', value: string) => (
    <View
      key={`${glyph}-${value}`}
      accessible
      accessibilityLabel={value}
      style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}
    >
      <IconV4 name={glyph} size="sm" color="mutedText" />
      <TextV4 size="sm" tone="onCard" style={{ flex: 1 }}>
        {value}
      </TextV4>
    </View>
  );

  const body = (
    <View style={{ flexDirection: 'row', gap: tokens.spacing.md }}>
      <View
        style={{
          width: RAIL,
          alignSelf: 'stretch',
          borderRadius: tokens.radius.full,
          backgroundColor: toneFill(theme, tone),
        }}
      />
      <View style={{ flex: 1, gap: tokens.spacing.sm }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          <TextV4
            accessibilityRole="header"
            face="heading"
            size="lg"
            weight="bold"
            tone="onCard"
            style={{ flex: 1 }}
          >
            {event.title}
          </TextV4>
          {event.allDay ? (
            <BadgeV4 tone={tone} variant="soft" size="sm">
              {allDayLabel}
            </BadgeV4>
          ) : null}
        </View>

        {time ? row('clock', time) : null}
        {event.location ? row('location', event.location) : null}
        {recurrenceLabel ? row('refresh', recurrenceLabel) : null}
        {timezoneLabel ? row('globe', timezoneLabel) : null}

        {description ? (
          <TextV4 size="sm" tone="mutedText">
            {description}
          </TextV4>
        ) : null}

        {onEdit || onDelete ? (
          <View style={{ gap: tokens.spacing.sm, marginTop: tokens.spacing.sm }}>
            {onEdit ? (
              <ButtonV4
                variant="primary"
                size="md"
                onPress={() => onEdit(event)}
                accessibilityLabel={`${editLabel}, ${event.title}`}
              >
                {editLabel}
              </ButtonV4>
            ) : null}
            {/*
              Destructive, and quiet, and below. A delete drawn as a peer of
              edit is how people delete things by accident.
            */}
            {onDelete ? (
              <ButtonV4
                variant="ghost"
                tone="danger"
                size="md"
                onPress={() => onDelete(event)}
                accessibilityLabel={`${deleteLabel}, ${event.title}`}
              >
                {deleteLabel}
              </ButtonV4>
            ) : null}
          </View>
        ) : null}
      </View>
    </View>
  );

  if (variant === 'modal') {
    return (
      <BottomSheetV4
        open={open}
        // `BottomSheet` requires a close handler — a sheet a user cannot
        // dismiss is a trap — so an omitted `onClose` becomes a no-op here
        // rather than a type error at every call site. `closeLabel` is kept in
        // the props for parity with the web twin, which titles its dismiss.
        onClose={onClose ?? (() => undefined)}
        title={event.title}
      >
        {body}
      </BottomSheetV4>
    );
  }

  return <CardV4 style={style}>{body}</CardV4>;
}
