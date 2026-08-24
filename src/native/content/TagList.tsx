import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { Tag, useXenitionTheme } from '../primitives';

export interface TagListProps {
  /** The tag labels to render. */
  tags: string[];
  /** Called with the tag label (and its index) when a tag is pressed. */
  onTagPress?: (tag: string, index: number) => void;
  /** Optional cap; extra tags collapse into a "+N" chip. */
  max?: number;
  /** Text shown when `tags` is empty. Pass `null` to render nothing. */
  emptyLabel?: string | null;
  style?: StyleProp<ViewStyle>;
}

/**
 * A wrapping row of keyword / topic tags for an article — the native mirror of
 * a web tag cloud. Composes the `Tag` primitive; an optional `onTagPress` makes
 * each tag tappable (to open a topic feed). Respects a `max` cap with a "+N"
 * overflow chip and renders an `emptyLabel` when there are no tags. All colors
 * come from `SemanticColors` (via `Tag`); no literal hex.
 */
export function TagList({
  tags,
  onTagPress,
  max,
  emptyLabel = 'No tags',
  style,
}: TagListProps): React.ReactElement | null {
  const { colors, tokens } = useXenitionTheme();

  if (tags.length === 0) {
    if (emptyLabel == null) return null;
    return (
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{emptyLabel}</Text>
    );
  }

  const visible = typeof max === 'number' && max >= 0 ? tags.slice(0, max) : tags;
  const overflow = tags.length - visible.length;

  return (
    <View
      accessibilityRole="list"
      style={[{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }, style]}
    >
      {visible.map((tag, i) =>
        onTagPress ? (
          <Pressable
            key={`${tag}-${i}`}
            accessibilityRole="button"
            accessibilityLabel={`Tag ${tag}`}
            onPress={() => onTagPress(tag, i)}
            hitSlop={4}
          >
            <Tag tone="neutral">{`#${tag}`}</Tag>
          </Pressable>
        ) : (
          <Tag key={`${tag}-${i}`} tone="neutral">{`#${tag}`}</Tag>
        )
      )}
      {overflow > 0 ? <Tag tone="primary">{`+${overflow}`}</Tag> : null}
    </View>
  );
}
