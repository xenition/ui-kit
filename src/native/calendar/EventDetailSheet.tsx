import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card } from '../primitives/Card';
import { Button } from '../primitives/Button';
import { Modal } from '../primitives/Modal';
import { Icon } from '../primitives/Icon';
import { resolveTone, timeRangeLabel, weekdayLabel, monthLongLabel } from './format';
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
  style?: StyleProp<ViewStyle>;
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
  style,
}: EventDetailSheetProps): React.ReactElement | null {
  const { colors, tokens } = useXenitionTheme();
  if (event == null) return null;

  const { base } = resolveTone(colors, event.tone);
  const dateLine = `${weekdayLabel(event.start)}, ${monthLongLabel(event.start)} ${event.start.getDate()}`;
  const timeLine = event.allDay ? 'All day' : timeRangeLabel(event.start, event.end);

  const metaRow = (glyph: string, text: string, key: string): React.ReactElement => (
    <View key={key} style={{ flexDirection: 'row', alignItems: 'center', marginTop: tokens.spacing.xs }}>
      <Icon glyph={glyph} size="sm" color="muted" />
      <Text style={{ marginLeft: tokens.spacing.sm, color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>
        {text}
      </Text>
    </View>
  );

  const body = (
    <View accessibilityRole="none" style={style}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <View
          style={{
            width: tokens.spacing.xs,
            alignSelf: 'stretch',
            minHeight: tokens.spacing.xl,
            borderRadius: tokens.radius.full,
            backgroundColor: base,
            marginRight: tokens.spacing.sm,
          }}
        />
        <Text style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '800' }}>
          {event.title}
        </Text>
      </View>

      <View style={{ marginTop: tokens.spacing.sm }}>
        {metaRow('🕑', `${dateLine} · ${timeLine}`, 'time')}
        {event.location ? metaRow('📍', event.location, 'loc') : null}
        {recurrenceLabel ? metaRow('🔁', recurrenceLabel, 'rec') : null}
        {timezoneLabel ? metaRow('🌐', timezoneLabel, 'tz') : null}
      </View>

      {description ? (
        <Text style={{ marginTop: tokens.spacing.md, color: colors.muted, fontSize: tokens.typography.scale.sm, lineHeight: tokens.typography.scale.sm * 1.5 }}>
          {description}
        </Text>
      ) : null}

      {onEdit || onDelete || onClose ? (
        <View style={{ flexDirection: 'row', gap: tokens.spacing.sm, marginTop: tokens.spacing.lg }}>
          {onEdit ? (
            <Button variant="primary" size="sm" onPress={() => onEdit(event)}>
              Edit
            </Button>
          ) : null}
          {onDelete ? (
            <Button variant="outline" size="sm" tone="danger" onPress={() => onDelete(event)}>
              Delete
            </Button>
          ) : null}
          <View style={{ flex: 1 }} />
          {onClose ? (
            <Button variant="ghost" size="sm" onPress={onClose}>
              Close
            </Button>
          ) : null}
        </View>
      ) : null}
    </View>
  );

  if (variant === 'modal') {
    return (
      <Modal open={open} onClose={onClose ?? (() => undefined)}>
        {body}
      </Modal>
    );
  }

  return <Card variant="elevated">{body}</Card>;
}
