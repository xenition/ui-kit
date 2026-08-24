import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card } from '../primitives';

export interface NoteCardProps {
  /** Note title / heading. */
  title: string;
  /** Body preview text (clamped to a few lines). */
  body?: string;
  /** Pre-formatted timestamp (e.g. `'2h ago'`). */
  timestamp?: string;
  /** Shows a pin marker and a primary accent edge. */
  pinned?: boolean;
  /** Optional trailing slot — e.g. a row of {@link LabelChip}s. */
  labels?: React.ReactNode;
  /** Fires when the card is pressed. */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A note preview built on the primitive {@link Card}: title, a clamped body,
 * a footer timestamp, an optional pin marker (primary), and a labels slot. When
 * `pinned`, a left accent edge in the primary token highlights it. No literals.
 */
export function NoteCard({
  title,
  body,
  timestamp,
  pinned = false,
  labels,
  onPress,
  style,
}: NoteCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const inner = (
    <Card
      style={{
        gap: tokens.spacing.sm,
        borderLeftWidth: pinned ? 3 : 1,
        borderLeftColor: pinned ? colors.primary : colors.border,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
        {pinned ? (
          <Text accessibilityLabel="Pinned" style={{ color: colors.primary, fontSize: tokens.typography.scale.sm }}>
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
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={title}
        onPress={onPress}
        style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }, style]}
      >
        {inner}
      </Pressable>
    );
  }
  return <View style={style}>{inner}</View>;
}
