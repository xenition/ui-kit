import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { shadow } from '../primitives/internal/elevation';
import { usePressScale } from '../primitives/internal/motion';
import { withAlpha } from '../primitives/internal/color';
import type { NoteCardProps } from './NoteCard';

/** Same public contract as {@link NoteCard} — a drop-in alternate design. */
export type NoteCardV2Props = NoteCardProps;

/**
 * NoteCard, redesigned (v2): a **sticky-note card**. A warm-tinted note surface;
 * pinned notes gain a 📌 and a primary top edge. Title, body preview, labels and a
 * timestamp stack inside. Shadowed. Distinct from v1. Same props, token-only.
 */
export function NoteCardV2({ title, body, timestamp, pinned = false, labels, onPress, appearance, style }: NoteCardV2Props): React.ReactElement {
  void appearance;
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();

  return (
    <Animated.View style={{ transform: [{ scale: press.scale }] }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={title}
        onPress={onPress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        disabled={!onPress}
        style={[
          {
            gap: tokens.spacing.xs,
            padding: tokens.spacing.sm,
            borderRadius: tokens.radius.lg,
            backgroundColor: withAlpha(colors.warn, 0.06),
            borderTopWidth: pinned ? 2 : 0,
            borderTopColor: colors.primary,
            ...shadow('sm', tokens),
          },
          style,
        ]}
      >
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
          <Text style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>{title}</Text>
          {pinned ? <Text accessibilityLabel="Pinned">📌</Text> : null}
        </View>
        {body ? <Text numberOfLines={3} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{body}</Text> : null}
        {labels ? <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }}>{labels}</View> : null}
        {timestamp ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{timestamp}</Text> : null}
      </Pressable>
    </Animated.View>
  );
}
