import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { usePressScale } from '../primitives/internal/motion';
import { resolveTone, timeRangeLabel, withAlpha } from './format';
import type { EventTone } from './types';
import type { EventBlockProps } from './EventBlock';

/** Same public contract as {@link EventBlock} — a drop-in alternate design. */
export type EventBlockV2Props = EventBlockProps;

/** A tone → contrast-safe *Text slot, so tone-colored labels stay legible. */
function toneText(colors: SemanticColors, tone: EventTone = 'primary'): string {
  switch (tone) {
    case 'accent':
      return colors.accentText;
    case 'success':
      return colors.successText;
    case 'warn':
      return colors.warnText;
    case 'danger':
      return colors.dangerText;
    case 'neutral':
      return colors.muted;
    case 'primary':
    default:
      return colors.primaryText;
  }
}

/**
 * EventBlock, redesigned (v2): a **filled, tone-tinted block** with a thick
 * left accent rail and the time set as its own leading column. The tint fills
 * the whole block (never color-alone — the rail + bold title + a11y state carry
 * the tone), and a press-scale spring gives it tap feedback. Distinct at a
 * glance from v1's flat chip. Same props, token-pure.
 */
export function EventBlockV2({
  event,
  variant = 'soft',
  size = 'md',
  selected = false,
  onPress,
  height,
  style,
}: EventBlockV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const { base } = resolveTone(colors, event.tone);
  const press = usePressScale(0.98);

  const timeText = event.allDay ? 'All day' : timeRangeLabel(event.start, event.end);
  const label = `${event.title}, ${timeText}${event.location ? `, ${event.location}` : ''}`;
  const startText = event.allDay ? 'All day' : timeRangeLabel(event.start);

  return (
    <Animated.View style={{ transform: [{ scale: press.scale }] }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityState={{ selected }}
        disabled={onPress == null}
        onPress={() => onPress?.(event)}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        style={[
          {
            flexDirection: 'row',
            overflow: 'hidden',
            alignItems: 'stretch',
            borderRadius: tokens.radius.md,
            backgroundColor: withAlpha(base, 0.16),
            borderWidth: selected ? 1.5 : 0,
            borderColor: base,
            minHeight: height,
          },
          style,
        ]}
      >
        {/* Thick tone rail — perceivable without relying on the fill color. */}
        <View style={{ width: tokens.spacing.sm, backgroundColor: base }} />
        <View
          style={{
            paddingVertical: size === 'sm' ? tokens.spacing.xs : tokens.spacing.sm,
            paddingHorizontal: size === 'sm' ? tokens.spacing.sm : tokens.spacing.md,
            justifyContent: 'center',
            gap: 2,
            flex: 1,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
            <Text
              style={{
                color: toneText(colors, event.tone),
                fontSize: tokens.typography.scale.xs,
                fontWeight: '800',
              }}
            >
              {startText}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                flex: 1,
                color: colors.onSurface,
                fontSize: tokens.typography.scale.sm,
                fontWeight: '700',
              }}
            >
              {event.title}
            </Text>
          </View>
          {size === 'md' && event.location ? (
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {event.location}
            </Text>
          ) : null}
        </View>
      </Pressable>
    </Animated.View>
  );
}
