import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { pressOver } from '../primitives/internal/state-v4';
import { timeRangeLabel } from '../../calendar/format';
import { blockGround, eventTone, metaLine, onPair, toneFill, toneInk } from './internal/grid-v4';
import type { EventBlockProps } from './EventBlock';

export interface EventBlockV4Props extends EventBlockProps {
  /** Show the time range under the title. Default `true` above `minBlock`. */
  showTime?: boolean;
  /** Announced for an all-day event. Default `'All day'`. */
  allDayLabel?: string;
}

/** The tone rail down a soft or outlined block. 3px — a bar, not a hairline. */
const RAIL = 3;

/**
 * **V4 event block** — same props as {@link EventBlock} plus `showTime` and
 * `allDayLabel`.
 *
 * ## Four changes
 *
 * 1. **A solid block uses its tone's *paired* ink.** The base inked every
 *    solid variant `onPrimary` regardless of the event's tone, so a `success`
 *    event was a green block wearing the brand's ink.
 * 2. **The soft variant gains a rail**, so an event's tone survives greyscale
 *    and CVD — a 16%-tint ground alone does not.
 * 3. **A short block drops its time rather than clipping it.** The base laid
 *    out title and time unconditionally, so a 15-minute event rendered two
 *    lines into a box with room for one.
 * 4. **The block is one announced object** — "Standup, 9:00–9:15, Room 2" —
 *    rather than three loose text nodes.
 *
 * **Renders nothing without an event title** (§4.5).
 */
export function EventBlockV4({
  event,
  variant = 'soft',
  size = 'md',
  selected = false,
  showTime,
  allDayLabel = 'All day',
  onPress,
  height,
  style,
}: EventBlockV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!event?.title) return null;

  const tone = eventTone(event.tone);
  const solid = variant === 'solid';
  const fill = solid ? toneFill(theme, tone) : blockGround(theme, tone);
  // `onPair()`, not `onPrimary`: the compiler guarantees each fill's own ink.
  const ink = solid ? onPair(theme, tone) : colors.onCard;

  const time = event.allDay ? allDayLabel : timeRangeLabel(event.start, event.end);
  // A 15-minute block has room for one line. Clipping the time is worse than
  // dropping it, and the accessible name still carries it either way.
  const room = height == null || height >= tokens.spacing['2xl'];
  const withTime = (showTime ?? true) && room;

  const body = (pressed: boolean): React.ReactElement => (
    <View
      style={[
        {
          flexDirection: 'row',
          gap: tokens.spacing.xs,
          overflow: 'hidden',
          height,
          borderRadius: tokens.radius.sm,
          borderWidth: variant === 'outline' ? 1 : 0,
          borderColor: toneFill(theme, tone),
          backgroundColor: pressed ? pressOver(theme, fill, ink) : fill,
          paddingVertical: size === 'sm' ? tokens.spacing.xs / 2 : tokens.spacing.xs,
          paddingHorizontal: tokens.spacing.xs,
          // A selected block gains a ring, not a different fill, so it does
          // not change tone when it is chosen.
          borderTopWidth: selected ? 2 : variant === 'outline' ? 1 : 0,
        },
        style,
      ]}
    >
      {!solid ? (
        <View
          style={{
            width: RAIL,
            alignSelf: 'stretch',
            borderRadius: tokens.radius.full,
            backgroundColor: toneFill(theme, tone),
          }}
        />
      ) : null}
      <View style={{ flex: 1, minWidth: 0 }}>
        <TextV4
          size={size === 'sm' ? 'xs' : 'sm'}
          weight="semibold"
          numberOfLines={1}
          style={{ color: ink }}
        >
          {event.title}
        </TextV4>
        {withTime && time ? (
          <TextV4
            size="xs"
            numeric="tabular"
            numberOfLines={1}
            style={{ color: solid ? ink : toneInk(theme, tone) }}
          >
            {time}
          </TextV4>
        ) : null}
      </View>
    </View>
  );

  const name = metaLine([event.title, time, event.location, event.subtitle]);

  if (!onPress) {
    return (
      <View accessible accessibilityLabel={name} accessibilityState={{ selected }}>
        {body(false)}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={name}
      accessibilityState={{ selected }}
      onPress={() => onPress(event)}
    >
      {({ pressed }) => body(pressed)}
    </Pressable>
  );
}
