import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { usePressScale } from '../primitives/internal/motion';
import type { NoteCardProps } from './NoteCard';

/** Drop-in for {@link NoteCardProps} — same props, the V4 "flow" design. */
export type NoteCardV4Props = NoteCardProps;

/**
 * NoteCard — **V4** "flow" design. The focused-workspace take on a sticky
 * note: a clean, softly-elevated {@link Card} with a legible title and a
 * clamped body preview. When `pinned`, a soft **primary** wash + a left accent
 * edge lift the note and a pin marker appears. One primary accent, generous
 * whitespace. Same props/behavior as {@link NoteCardProps}; token-only colors
 * via `useXenitionTheme()`.
 */
export function NoteCardV4({
  title,
  body,
  timestamp,
  pinned = false,
  labels,
  onPress,
  style,
}: NoteCardV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();

  const inner = (
    <Card
      style={{
        gap: tokens.spacing.sm,
        borderRadius: tokens.radius.lg,
        borderLeftWidth: pinned ? 3 : 1,
        borderLeftColor: pinned ? colors.primary : colors.border,
        backgroundColor: pinned ? withAlpha(colors.primary, 0.06) : colors.surface,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
        {pinned ? (
          <Text accessibilityLabel="Pinned" style={{ color: colors.primaryText, fontSize: tokens.typography.scale.sm }}>
            📌
          </Text>
        ) : null}
        <Text
          numberOfLines={1}
          style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
        >
          {title}
        </Text>
      </View>

      {body ? (
        <Text numberOfLines={3} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
          {body}
        </Text>
      ) : null}

      {labels ? <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }}>{labels}</View> : null}

      {timestamp ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{timestamp}</Text>
      ) : null}
    </Card>
  );

  if (onPress) {
    return (
      <Animated.View style={{ transform: [{ scale: press.scale }] }}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={title}
          onPress={onPress}
          onPressIn={press.onPressIn}
          onPressOut={press.onPressOut}
          style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }, style]}
        >
          {inner}
        </Pressable>
      </Animated.View>
    );
  }
  return <View style={style}>{inner}</View>;
}
