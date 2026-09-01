import * as React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import type { QuickRepliesProps } from './QuickReplies';

export interface QuickRepliesV4Props extends QuickRepliesProps {
  /**
   * Wrap the chips instead of scrolling them. Default `true`.
   *
   * §7 is explicit: chips wrap and are never clipped, because a user cannot
   * choose what they cannot see. The base scrolled them horizontally, so the
   * last reply was off-screen with nothing saying so.
   */
  wrap?: boolean;
  /** Accessible name for the group. Default `'Quick replies'`. */
  groupLabel?: string;
}

/**
 * **V4 quick replies** — same props as {@link QuickReplies} plus `wrap` and
 * `groupLabel`.
 *
 * ## Three changes
 *
 * 1. **The chips wrap.** See `wrap` — the base scrolled them, so the last
 *    reply was off-screen with no affordance saying it existed.
 * 2. **Every chip clears 44** and presses with a state layer over its own
 *    fill, not an opacity on its label.
 * 3. **The set is announced as one group**, so a reader hears "Quick replies,
 *    3 items" instead of three unrelated buttons.
 *
 * **Renders nothing for an empty list** (§4.5).
 */
export function QuickRepliesV4({
  replies,
  wrap = true,
  groupLabel = 'Quick replies',
  onSelect,
  style,
}: QuickRepliesV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;

  const list = replies?.filter((r) => r?.label) ?? [];
  if (list.length === 0) return null;

  const tap = minTap(tokens.spacing);

  const chips = list.map((reply) => (
    <Pressable
      key={reply.id}
      accessibilityRole="button"
      accessibilityLabel={reply.label}
      onPress={() => onSelect?.(reply.id)}
      style={({ pressed }) => ({
        minHeight: tap,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: tokens.radius.full,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: pressed ? pressOver(theme, colors.card, colors.onCard) : colors.card,
        paddingHorizontal: tokens.spacing.md,
      })}
    >
      <TextV4 size="sm" weight="semibold" tone="onCard">
        {reply.label}
      </TextV4>
    </Pressable>
  ));

  if (!wrap) {
    return (
      <ScrollView
        horizontal
        accessibilityRole="list"
        accessibilityLabel={groupLabel}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: tokens.spacing.sm }}
        style={style}
      >
        {chips}
      </ScrollView>
    );
  }

  return (
    <View
      accessibilityRole="list"
      accessibilityLabel={groupLabel}
      style={[{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, style]}
    >
      {chips}
    </View>
  );
}
