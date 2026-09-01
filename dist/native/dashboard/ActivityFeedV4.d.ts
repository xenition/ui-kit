import * as React from 'react';
import type { IconName } from '../../primitives/icon-names';
import type { ActivityFeedProps, ActivityItem } from './ActivityFeed';
/**
 * The tones §4.7 lets a row's leading badge wear — the same four, spelled
 * identically, as `NotificationItemV4` and the web twin. See §4.7: the colour
 * comes from the semantic family the row belongs to, and a badge in
 * `onPrimary` or `muted` is not a decision the brief leaves open.
 */
export type ActivityBadgeTone = 'primary' | 'success' | 'warn' | 'danger';
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
export declare function ActivityFeedV4({ items, title, emptyMessage, action, emptyTitle, emptyIcon, emptyAction, onItemPress, style, }: ActivityFeedV4Props): React.ReactElement;
//# sourceMappingURL=ActivityFeedV4.d.ts.map