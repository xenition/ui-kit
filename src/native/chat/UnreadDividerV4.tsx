import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import type { UnreadDividerProps } from './UnreadDivider';

export interface UnreadDividerV4Props extends UnreadDividerProps {
  /** Build the label from the count. Default `'3 unread messages'`. */
  formatCount?: (count: number) => string;
}

/**
 * **V4 unread divider** — same props as {@link UnreadDivider} plus
 * `formatCount`.
 *
 * ## Three changes
 *
 * 1. **The count reaches the label.** The base took `count` and drew it beside
 *    a fixed `'Unread'`, so a reader heard the word and the number as two
 *    fragments. It is now one sentence, and the sentence is a prop.
 * 2. **It is announced once, politely.** A divider that arrives mid-thread is
 *    a landmark, not an alert.
 * 3. **The rule takes `danger`, the label its corrected ink** — the base put
 *    the fill slot on the text.
 */
export function UnreadDividerV4({
  label = 'Unread',
  count,
  formatCount,
  style,
}: UnreadDividerV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const text =
    typeof count === 'number' && count > 0
      ? (formatCount ??
          ((n: number) => `${n} unread ${n === 1 ? 'message' : 'messages'}`))(count)
      : label;

  return (
    <View
      accessible
      accessibilityRole="text"
      accessibilityLabel={text}
      style={[
        { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm },
        style,
      ]}
    >
      <View style={{ flex: 1, height: 1, backgroundColor: colors.danger }} />
      <TextV4 size="xs" weight="bold" tone="dangerText">
        {text}
      </TextV4>
      <View style={{ flex: 1, height: 1, backgroundColor: colors.danger }} />
    </View>
  );
}
