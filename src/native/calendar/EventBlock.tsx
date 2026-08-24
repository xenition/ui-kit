import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { resolveTone, timeRangeLabel, withAlpha } from './format';
import type { CalendarEvent } from './types';

export type EventBlockVariant = 'solid' | 'soft' | 'outline';
export type EventBlockSize = 'sm' | 'md';

export interface EventBlockProps {
  /** The event to render. */
  event: CalendarEvent;
  /** Fill treatment. `soft` (default) tints, `solid` fills, `outline` is a rule. */
  variant?: EventBlockVariant;
  /** Density. `sm` hides the time/subtitle lines. */
  size?: EventBlockSize;
  /** Marks the block as the current selection (announced, not color-alone). */
  selected?: boolean;
  /** Fires when the block is tapped. */
  onPress?: (event: CalendarEvent) => void;
  /** Explicit height (used when positioned inside a `TimeGrid`). */
  height?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * A single event chip/block — the shared visual atom for `WeekView`,
 * `TimeGrid`, `DayAgenda` and `AllDayRow`. A left accent bar keeps the tone
 * legible even in `soft`/`outline` variants (never color-alone), and selection
 * is exposed through `accessibilityState.selected`. Tone resolves to a theme
 * color pair via `resolveTone`; every color traces to a token.
 */
export function EventBlock({
  event,
  variant = 'soft',
  size = 'md',
  selected = false,
  onPress,
  height,
  style,
}: EventBlockProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const { base, on } = resolveTone(colors, event.tone);

  const solid = variant === 'solid';
  const outline = variant === 'outline';
  const bg = solid ? base : outline ? colors.surface : withAlpha(base, 0.16);
  const fg = solid ? on : colors.onSurface;
  const meta = solid ? withAlpha(on, 0.85) : colors.muted;

  const timeText = event.allDay ? 'All day' : timeRangeLabel(event.start, event.end);
  const label = `${event.title}, ${timeText}${event.location ? `, ${event.location}` : ''}`;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ selected }}
      disabled={onPress == null}
      onPress={() => onPress?.(event)}
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          overflow: 'hidden',
          borderRadius: tokens.radius.sm,
          backgroundColor: bg,
          borderWidth: outline || selected ? 1 : 0,
          borderColor: selected ? base : colors.border,
          opacity: pressed ? 0.85 : 1,
          minHeight: height,
        },
        style,
      ]}
    >
      {/* Accent bar — keeps tone perceivable without relying on fill color. */}
      <View style={{ width: tokens.spacing.xs, backgroundColor: base }} />
      <View style={{ flex: 1, padding: size === 'sm' ? tokens.spacing.xs : tokens.spacing.sm }}>
        <Text
          numberOfLines={1}
          style={{
            color: fg,
            fontSize: tokens.typography.scale.sm,
            fontWeight: '700',
          }}
        >
          {event.title}
        </Text>
        {size === 'md' ? (
          <Text numberOfLines={1} style={{ color: meta, fontSize: tokens.typography.scale.xs }}>
            {timeText}
            {event.location ? ` · ${event.location}` : ''}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
}
