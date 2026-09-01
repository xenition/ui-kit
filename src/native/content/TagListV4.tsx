import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TagV4 } from '../primitives/TagV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import type { TagListProps } from './TagList';

export interface TagListV4Props extends TagListProps {
  /** A tag's accessible name. Default ``(label) => `Tag ${label}` ``. */
  formatTagLabel?: (label: string) => string;
  /** What the `+N` chip announces. Default ``(count) => `${count} more tags` ``. */
  formatOverflow?: (count: number) => string;
}

/**
 * **V4 tag list** — same props as {@link TagList} plus `formatTagLabel` and
 * `formatOverflow`.
 *
 * ## Four changes
 *
 * 1. **The empty branch keeps the caller's props.** The populated branch
 *    applied `style` (and, on the web twin, every `id`, `data-*` and handler
 *    the caller passed) and the empty branch dropped them — so a tag row
 *    silently lost its identity exactly when there was nothing in it, which is
 *    also when a test or a layout is most likely to be looking for it.
 * 2. **A list has list items.** The tags hung directly off a `role="list"` as
 *    bare buttons; each is now one announced child of the list.
 * 3. **A tappable tag clears 44.** They were about 20px — the chip stays
 *    exactly as small, and only the touch area grows.
 * 4. **The `+N` chip says what the N are.** It was an unfocusable chip reading
 *    "+3" with nothing to say which three.
 */
export function TagListV4({
  tags,
  onTagPress,
  max,
  emptyLabel = 'No tags',
  formatTagLabel = (label: string) => `Tag ${label}`,
  formatOverflow = (count: number) => `${count} more tags`,
  style,
}: TagListV4Props): React.ReactElement | null {
  const { tokens } = useXenitionTheme();

  if (tags.length === 0) {
    if (emptyLabel == null) return null;
    // `style` survives the empty branch — see change 1.
    return (
      <View style={style}>
        <TextV4 size="sm" tone="mutedText">
          {emptyLabel}
        </TextV4>
      </View>
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
            accessibilityLabel={formatTagLabel(tag)}
            onPress={() => onTagPress(tag, i)}
            // The chip keeps its size; the target grows around it.
            style={{ justifyContent: 'center', minHeight: minTap(tokens.spacing) }}
          >
            <TagV4 tone="neutral">{`#${tag}`}</TagV4>
          </Pressable>
        ) : (
          <View key={`${tag}-${i}`} accessible accessibilityRole="text" accessibilityLabel={tag}>
            <TagV4 tone="neutral">{`#${tag}`}</TagV4>
          </View>
        )
      )}
      {overflow > 0 ? (
        <View accessible accessibilityRole="text" accessibilityLabel={formatOverflow(overflow)}>
          <TagV4 tone="primary">{`+${overflow}`}</TagV4>
        </View>
      ) : null}
    </View>
  );
}
