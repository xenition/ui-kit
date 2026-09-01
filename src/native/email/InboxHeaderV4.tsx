import * as React from 'react';
import { Pressable, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressLayer } from '../primitives/internal/state-v4';
import { spokenLine } from './internal/mail-v4';
import type { InboxHeaderProps } from './InboxHeader';

export interface InboxHeaderV4Props extends InboxHeaderProps {
  /** Turn `unreadCount` into the words a reader hears. Default `'42 unread'`. */
  formatUnread?: (count: number) => string;
  /** The syncing caption. Default `'Syncing…'`. */
  syncingLabel?: string;
}

/** Above this the numeral shows `999+` rather than a number nobody reads. */
const COUNT_CAP = 999;

/**
 * **V4 inbox header** — same props as {@link InboxHeader} plus `formatUnread`
 * and `syncingLabel`.
 *
 * ## Four changes
 *
 * 1. **The count says what it counts.** A reader heard "Inbox" and then "42",
 *    with nothing between them to say what 42 was. The title and the numeral
 *    are now one accessible name — "Inbox, 42 unread" — with the numeral
 *    itself drawn tabular so it does not shift as it counts down.
 * 2. **Syncing is announced.** The caption appeared and disappeared silently;
 *    it is a polite live region now, and `polite` rather than `assertive`
 *    because a background refresh is not worth interrupting a sentence for.
 * 3. **The heading role sits on the heading.** The base put
 *    `accessibilityRole="header"` on the whole bar, back button and actions
 *    included, so the row of icons was part of the heading. It sits on the
 *    title group — the same element the web twin marks up — and the bar itself
 *    is just a bar.
 * 4. **Every button clears 44** and answers a press with M3's state layer.
 *    `padding: spacing.xs` around a glyph plus `hitSlop={8}` is roughly 28
 *    points of real target, and `opacity: 0.6` reads as unavailable.
 */
export function InboxHeaderV4({
  title,
  unreadCount = 0,
  onBack,
  actions,
  syncing = false,
  formatUnread = (n) => `${n} unread`,
  syncingLabel = 'Syncing…',
  style,
}: InboxHeaderV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!title) return null;

  const safeActions = actions ?? [];
  const tap = minTap(tokens.spacing);
  const count = unreadCount > 0 ? unreadCount : 0;

  const tapStyle = ({ pressed }: { pressed: boolean }): ViewStyle => ({
    width: tap,
    height: tap,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: tokens.radius.full,
    backgroundColor: pressed ? pressLayer(theme) : 'transparent',
  });

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.md,
          paddingVertical: tokens.spacing.sm,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          backgroundColor: colors.surface,
        },
        style,
      ]}
    >
      {onBack ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Back"
          onPress={onBack}
          style={tapStyle}
        >
          <IconV4 glyph="‹" size="2xl" color="onSurface" />
        </Pressable>
      ) : null}

      <View style={{ flex: 1, minWidth: 0 }}>
        <View
          accessible
          accessibilityRole="header"
          accessibilityLabel={spokenLine([title, count > 0 ? formatUnread(count) : null])}
          style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}
        >
          <TextV4 size="xl" weight="bold" tone="onSurface" numberOfLines={1}>
            {title}
          </TextV4>
          {count > 0 ? (
            <TextV4 size="base" weight="semibold" tone="mutedText" numeric="tabular">
              {count > COUNT_CAP ? `${COUNT_CAP}+` : String(count)}
            </TextV4>
          ) : null}
        </View>
        {syncing ? (
          <TextV4 size="xs" tone="mutedText" accessibilityLiveRegion="polite">
            {syncingLabel}
          </TextV4>
        ) : null}
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
        {safeActions.map((a) => (
          <Pressable
            key={a.id}
            accessibilityRole="button"
            accessibilityLabel={a.label}
            onPress={a.onPress}
            style={tapStyle}
          >
            <IconV4 glyph={a.glyph} size="xl" color="onSurface" />
          </Pressable>
        ))}
      </View>
    </View>
  );
}
