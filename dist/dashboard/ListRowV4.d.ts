import * as React from 'react';
import type { IconName } from '../primitives/icon-names';
import type { ListRowProps } from './ListRow';
/**
 * The tones §4.7 lets a row's leading badge wear.
 *
 * Deliberately four and not the ten `IconColor` offers: §4.7 says the colour
 * "comes from the semantic family the row belongs to — `primary` by default,
 * `success` for positive money, `warn` / `danger` only when the row genuinely
 * is a warning". A row badge in `onPrimary` or `muted` is not a decision the
 * brief leaves open, so the type does not offer it. The same four, spelled
 * identically, are the native twin's union.
 */
export type RowBadgeTone = 'primary' | 'success' | 'warn' | 'danger';
export interface ListRowV4Props extends ListRowProps {
    /**
     * A named glyph for the leading slot, drawn as §4.3's **tinted circular
     * badge** (`IconV4 badge="soft"`, which is already the §4.7 44 circle).
     *
     * This is the "a kind of thing" half of the leading slot — the half the base
     * row had no way to express, so callers who were not showing a person either
     * turned the avatar off and left a ragged left edge, or hand-rolled a dot.
     * `leading` still wins over it, and it still wins over the avatar, so the
     * precedence reads exactly as the anatomy does: an explicit slot, then a
     * kind, then a person.
     */
    icon?: IconName;
    /** Semantic family of the {@link ListRowV4Props.icon} badge. Default `'primary'`. */
    iconTone?: RowBadgeTone;
    /**
     * Draw the trailing chevron. Defaults to **`true` when `onClick` is set** and
     * `false` otherwise.
     *
     * HIG is unambiguous that a chevron means *navigation*, so the default is
     * derived from whether the row navigates rather than being a decoration a
     * caller opts into. Pass `false` on a row whose `onClick` selects or toggles
     * rather than pushing a screen; pass `true` on a row wrapped in a link the
     * component cannot see.
     */
    chevron?: boolean;
    /**
     * Paint the §4.3 `selected` ground — the one exception to the row's
     * transparent ground, for a persistently highlighted navigation row.
     * Default `false`.
     */
    selected?: boolean;
}
/**
 * **V4 list row** — the canonical member of the V4 row family, and the row the
 * other three follow.
 *
 * Everything structural comes from `internal/row-v4.ts`; this file decides
 * *content* and nothing else. That is the whole point of the pass: the base
 * row, `SettingsRow`, `NotificationItem` and `ActivityFeed` were four
 * components with three paddings, two min-heights, two press feedbacks and
 * three leading treatments between them, and a user scrolling from a people
 * list into a settings screen could see the seam. Not one metric is typed
 * here.
 *
 * What changes against the base row:
 *
 * 1. **The metric is the family's.** `min-h-[56px]` — a literal brief §1 names
 *    outright — becomes {@link rowHeightClass}, which is 56 composed as
 *    `2xl + sm` for a row with a title alone and 72 as `2xl + lg` for one that
 *    also carries `meta`. A re-scaled seed now re-scales the row.
 *
 *    The height turns on *the supporting line* and nothing else, which is what
 *    `rowHeightClass` documents and what §4.3's table says. §5's SettingsRow
 *    note also sends a row with a leading slot to 72; that is not adopted,
 *    because it would leave a settings row wearing a badge at 72 while a people
 *    row wearing an avatar sat at 56, which is the exact family seam §4.3 is
 *    closing. A 44 leading slot grows the row past 56 on its own anyway — the
 *    metric is a `min-height`, a floor rather than a size.
 *
 * 2. **The leading slot is a real slot.** A fixed 44 square
 *    ({@link ROW_V4_LEADING_CLASS}) holding an `AvatarV4` for a person or an
 *    `IconV4 badge="soft"` for a kind of thing — never a bare dot (§4.3). It is
 *    fixed on both axes so twenty rows put their titles on one vertical line
 *    whichever of the three a given row happens to hold.
 *
 * 3. **Text is typeset, not styled.** Title `TextV4 size="base"
 *    weight="semibold" tone="onSurface"`, supporting line `size="sm"
 *    tone="mutedText"`. `mutedText`, not `muted`: `muted` is a *fill*, and
 *    using it as an ink is the bug the shadcn pass closed and this module kept.
 *
 * 4. **The chevron exists.** The base row had no navigation affordance at all,
 *    so a row that pushed a screen and a row that did nothing looked identical.
 *
 * 5. **Press is the state layer.** `hover:bg-neutral-100` is deleted, not
 *    translated. The row carries `data-xen-v4-state` and the opaque
 *    `card`/`on-card` pair from {@link rowStateVars}, so the layer tints the
 *    container and leaves the title at full strength — a dimmed row reads as
 *    *disabled* (M3 spends 0.38 on exactly that), which is what
 *    `hover:opacity-*` was accidentally saying.
 *
 * 6. **The ground is transparent.** The container owns the card, so a list of
 *    these is one card with rows in it rather than a stack of little cards.
 *
 * Renders `null` when there is nothing to show (§4.5): no title, no supporting
 * line, no leading slot, no action. A row with an empty title is a blank 56px
 * band in the middle of a list, and a blank box is the one thing §4.5 forbids.
 * A default avatar does not count as content — it would be a monogram of
 * nothing.
 */
export declare const ListRowV4: React.ForwardRefExoticComponent<ListRowV4Props & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=ListRowV4.d.ts.map