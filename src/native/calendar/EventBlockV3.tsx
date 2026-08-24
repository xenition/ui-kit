import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { resolveTone, timeRangeLabel } from './format';
import type { EventBlockProps } from './EventBlock';

/** Same public contract as {@link EventBlock} — a drop-in alternate design. */
export type EventBlockV3Props = EventBlockProps;

/**
 * EventBlock, redesigned (v3): an **outline block** — no fill, a hairline
 * border, and a small tone dot before the title. The airy, line-based look
 * reads as a lightweight list item rather than a filled chip. Selection thickens
 * the border and is announced via a11y (never color-alone). Same props,
 * token-pure.
 */
export function EventBlockV3({
  event,
  variant = 'outline',
  size = 'md',
  selected = false,
  onPress,
  height,
  style,
}: EventBlockV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const { base } = resolveTone(colors, event.tone);

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
          alignItems: 'center',
          gap: tokens.spacing.sm,
          borderRadius: tokens.radius.md,
          backgroundColor: colors.surface,
          borderWidth: selected ? 1.5 : 1,
          borderColor: selected ? base : colors.border,
          paddingVertical: size === 'sm' ? tokens.spacing.xs : tokens.spacing.sm,
          paddingHorizontal: size === 'sm' ? tokens.spacing.sm : tokens.spacing.md,
          opacity: pressed ? 0.85 : 1,
          minHeight: height,
        },
        style,
      ]}
    >
      {/* Tone dot — the sole color cue, backed by the label + a11y state. */}
      <View
        style={{
          width: tokens.spacing.sm,
          height: tokens.spacing.sm,
          borderRadius: tokens.radius.full,
          backgroundColor: base,
        }}
      />
      <View style={{ flex: 1 }}>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}
        >
          {event.title}
        </Text>
        {size === 'md' ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {timeText}
            {event.location ? ` · ${event.location}` : ''}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
}
