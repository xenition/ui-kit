import * as React from 'react';
import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { CardV4 } from '../primitives/CardV4';
import { EmptyStateV4 } from '../primitives/EmptyStateV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import type { IconName } from '../../primitives/icon-names';
import { ListSeparatorV4 } from '../layout/ListSeparatorV4';
import type { ActivityFeedProps, ActivityItem } from './ActivityFeed';
import {
  rowContainerStyle,
  rowGround,
  rowLeadingStyle,
  rowTextStyle,
  rowTrailingStyle,
} from './internal/row-v4';

/**
 * The tones §4.7 lets a row's leading badge wear — the same four, spelled
 * identically, as `NotificationItemV4` and the web twin. See §4.7: the colour
 * comes from the semantic family the row belongs to, and a badge in
 * `onPrimary` or `muted` is not a decision the brief leaves open.
 */
export type ActivityBadgeTone = 'primary' | 'success' | 'warn' | 'danger';

/**
 * The badge an activity wears when the caller names no `icon`.
 *
 * §4.3 retires the bare `8 × 8` dot and §5 says the dot "becomes a 44 tinted
 * circular badge" — so the replacement is the *default*, not an opt-in, or
 * every feed rendered today loses its leading treatment and the list's titles
 * go ragged. `bolt` is the set's name for "something happened", which is what
 * an unclassified activity is. A feed that knows its event types should pass
 * `icon` per item — §4.7 is right that twenty identical badges are noise, and
 * the per-item `icon` is the answer to it.
 */
const DEFAULT_ICON: IconName = 'bolt';

/** An activity, plus §5's two additions: a category badge and its tone. */
export interface ActivityItemV4 extends ActivityItem {
  /**
   * A named glyph for the row's 44 leading slot, drawn as §4.3's **tinted
   * circular badge** (`IconV4 badge="soft"`). Defaults to `'bolt'`.
   */
  icon?: IconName;
  /** Semantic family of this row's badge. Default `'primary'`. */
  tone?: ActivityBadgeTone;
}

export interface ActivityFeedV4Props extends Omit<ActivityFeedProps, 'items'> {
  items: ActivityItemV4[];
  /**
   * Trailing slot beside the heading — a "See all" link. §5: the heading
   * adopts the `Section` header anatomy, and that anatomy has an action.
   */
  action?: React.ReactNode;
  /** Headline for the empty state. Default `'No activity yet'`. */
  emptyTitle?: string;
  /** Illustration slot for the empty state — §4.5's tinted badge, or anything. */
  emptyIcon?: React.ReactNode;
  /** The one CTA §4.5 allows an empty state. */
  emptyAction?: React.ReactNode;
  /**
   * Make each row activate. When set, a row becomes a `Pressable` carrying the
   * family's state layer; when unset the feed is a read-only log and the rows
   * are inert, exactly as today. The web twin spells this `onItemClick` —
   * the established `onClick` / `onPress` split the row family already uses.
   */
  onItemPress?: (item: ActivityItemV4) => void;
}

/**
 * **V4 activity feed** — a list of V4 rows in one grouped container.
 *
 * Every metric and state recipe comes from `internal/row-v4.ts`; this file
 * decides *content* and *grouping* and nothing else.
 *
 * What changes against the base feed:
 *
 * 1. **Each entry is a row of the family.** The base laid out its own flex box
 *    with a `gap: 2` and a `marginTop: 6` dot — literals brief §1 names
 *    outright — so a feed entry and a settings row shared nothing but a
 *    resemblance. Now they share {@link rowContainerStyle}, the 44 leading
 *    slot and the state layer.
 *
 * 2. **The dot becomes a badge.** §4.3 is explicit that a bare `8 × 8` dot is
 *    not a leading treatment. Each row gets `IconV4 badge="soft"` — the §4.7
 *    44 circle — from the item's own `icon`/`tone`.
 *
 * 3. **One container, with inset separators.** §4.3: the row's ground is
 *    transparent and the *container* owns the card, so the feed is one
 *    `CardV4` (`padding="none"`, so rows run flush to its edge and clip to
 *    `radius.lg`) with `ListSeparatorV4 inset="leading"` between rows — §4.4's
 *    rule, starting where the titles start so the list reads as a list rather
 *    than as a table cut through the middle of its badges. That inset
 *    separator is what §5 asks the vertical rail for — "what makes a feed read
 *    as one list rather than fragments" — expressed with the primitive the row
 *    family already shares instead of a second kind of rule; §4.4 allows one
 *    weight of separator and no more.
 *
 * 4. **The empty state is the V4 primitive.** The base composed `EmptyState`,
 *    which was already right in kind; §4.5 asks for `EmptyStateV4`, and the
 *    `icon` and `action` slots it exposes come with it.
 *
 * 5. **Text is typeset, not styled.** Title `TextV4 size="base"
 *    weight="semibold" tone="onSurface"`, meta `size="sm" tone="mutedText"`,
 *    timestamp `size="xs" tone="mutedText"` top-aligned on a two-line row
 *    (§4.3). `mutedText`, not `muted` — the base used `colors.muted`, a *fill*,
 *    as its text colour throughout.
 *
 * 6. **Press, when a row acts, is the state layer** and never an opacity.
 *
 * 7. **The heading-to-body gap is `md`.** §4.1's step between a card header and
 *    its body; the base's `sm` read as a caption stuck to the list.
 *
 * `items: []` renders `EmptyStateV4` and never a blank bordered box (§4.5) —
 * with or without a heading, and with no CTA unless the caller supplies one.
 */
export function ActivityFeedV4({
  items,
  title,
  emptyMessage = 'Activity will appear here as things happen.',
  action,
  emptyTitle = 'No activity yet',
  emptyIcon,
  emptyAction,
  onItemPress,
  style,
}: ActivityFeedV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { spacing } = theme.tokens;

  const heading = title !== undefined && title !== '';
  const hasHeader = heading || action != null;

  return (
    <View style={[{ gap: spacing.md }, style]}>
      {hasHeader ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: spacing.md,
          }}
        >
          {heading ? (
            <TextV4
              accessibilityRole="header"
              size="lg"
              weight="bold"
              tone="onSurface"
              style={{ flex: 1, minWidth: 0 }}
            >
              {title}
            </TextV4>
          ) : null}
          {action != null ? <View style={{ flexShrink: 0 }}>{action}</View> : null}
        </View>
      ) : null}
      {items.length === 0 ? (
        <EmptyStateV4
          title={emptyTitle}
          description={emptyMessage}
          icon={emptyIcon}
          action={emptyAction}
        />
      ) : (
        // The container owns the card (§4.3), the rows do not. `padding="none"`
        // plus `overflow: 'hidden'` is what lets a row run flush to the card
        // edge and still clip to its radius.
        //
        // `colors.card` over the top because `CardV4` still paints
        // `colors.surface` — §4.2's "most visible bug in the dashboard module",
        // the page colour used for a raised surface. It is not decoration here:
        // the row's state layer mixes `card` with `onCard`
        // ({@link rowGround}), so a pressed row on a `surface` container would
        // tint towards a fill it is not sitting on.
        <CardV4
          accessibilityRole="list"
          padding="none"
          radius="lg"
          style={{ overflow: 'hidden', backgroundColor: theme.colors.card }}
        >
          {items.map((item, index) => (
            <React.Fragment key={item.id}>
              {/*
                A rule between rows, never above the first — a list of one draws
                no separator at all, which is also §4.4's answer for a list too
                short to need grouping.
              */}
              {index > 0 ? <ListSeparatorV4 inset="leading" /> : null}
              <ActivityRow item={item} onItemPress={onItemPress} />
            </React.Fragment>
          ))}
        </CardV4>
      )}
    </View>
  );
}

/**
 * One entry, drawn as a member of the row family.
 *
 * Kept local rather than exported: it is the feed's row, and a second exported
 * row component is exactly the drift §4.3 is closing. Everything structural is
 * `row-v4`'s.
 */
function ActivityRow({
  item,
  onItemPress,
}: {
  item: ActivityItemV4;
  onItemPress?: (item: ActivityItemV4) => void;
}): React.ReactElement {
  const theme = useXenitionTheme();

  const supporting = item.meta !== undefined && item.meta !== '';
  const stamped = item.time !== undefined && item.time !== '';
  const container = rowContainerStyle(theme, { twoLine: supporting });
  const label = `${item.title}${supporting ? `, ${item.meta}` : ''}${
    stamped ? `, ${item.time}` : ''
  }`;

  const inner = (
    <>
      <View style={rowLeadingStyle(theme)}>
        <IconV4
          name={item.icon ?? DEFAULT_ICON}
          color={item.tone ?? 'primary'}
          badge="soft"
          size="base"
        />
      </View>
      <View style={rowTextStyle(theme)}>
        <TextV4 size="base" weight="semibold" tone="onSurface" numberOfLines={1}>
          {item.title}
        </TextV4>
        {supporting ? (
          <TextV4 size="sm" tone="mutedText" numberOfLines={1}>
            {item.meta}
          </TextV4>
        ) : null}
      </View>
      {stamped ? (
        <View
          style={[
            rowTrailingStyle(theme),
            // §4.3: a timestamp top-aligns on a two-line row.
            supporting ? { alignSelf: 'flex-start' } : null,
          ]}
        >
          <TextV4 size="xs" tone="mutedText">
            {item.time}
          </TextV4>
        </View>
      ) : null}
    </>
  );

  if (onItemPress === undefined) {
    return (
      <View
        accessibilityRole="text"
        accessibilityLabel={label}
        style={[container, { backgroundColor: rowGround(theme) }]}
      >
        {inner}
      </View>
    );
  }
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={() => onItemPress(item)}
      style={({ pressed }): StyleProp<ViewStyle> => [
        container,
        { backgroundColor: rowGround(theme, { pressed }) },
      ]}
    >
      {inner}
    </Pressable>
  );
}
