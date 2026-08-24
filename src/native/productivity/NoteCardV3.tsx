import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { NoteCardProps } from './NoteCard';

/** Same public contract as {@link NoteCard} — a drop-in alternate design. */
export type NoteCardV3Props = NoteCardProps;

/**
 * NoteCard, redesigned (v3): a **dense note line**. A pin dot (when pinned), the
 * title over a body-preview·timestamp subtitle, and labels folded in — a hairline
 * row for a notes list. The opposite of v2's sticky note. Same props, token-only.
 */
export function NoteCardV3({ title, body, timestamp, pinned = false, labels, onPress, appearance, style }: NoteCardV3Props): React.ReactElement {
  void appearance;
  const { colors, tokens } = useXenitionTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      onPress={onPress}
      disabled={!onPress}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.sm,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          borderLeftWidth: pinned ? 2 : 0,
          borderLeftColor: colors.primary,
          paddingLeft: pinned ? tokens.spacing.sm : 0,
        },
        style,
      ]}
    >
      {pinned ? <Text accessibilityLabel="Pinned" style={{ fontSize: tokens.typography.scale.xs }}>📌</Text> : null}
      <View style={{ flex: 1, gap: 2 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>{title}</Text>
        {body ? <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{body}</Text> : null}
        {labels ? <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }}>{labels}</View> : null}
      </View>
      {timestamp ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{timestamp}</Text> : null}
    </Pressable>
  );
}
