import * as React from 'react';
import type { IconName } from '../../primitives/icon-names';
import type { NotificationItemProps } from './NotificationItem';
/**
 * The tones §4.7 lets a row's leading badge wear.
 *
 * Deliberately four and not every slot the native `IconV4` accepts: §4.7 says
 * the colour "comes from the semantic family the row belongs to — `primary` by
 * default, `success` for positive money, `warn` / `danger` only when the row
 * genuinely is a warning". The same four, spelled identically, are the web
 * twin's union.
 */
export type NotificationBadgeTone = 'primary' | 'success' | 'warn' | 'danger';
export interface NotificationItemV4Props extends NotificationItemProps {
    /**
     * A named glyph for the leading slot, drawn as §4.3's **tinted circular
     * badge** (`IconV4 badge="soft"`, which is already the §4.7 44 circle).
     *
     * This is the notification's *category* — a message, a payment, a warning —
     * and it is what replaces the `8 × 8` dot the base row painted. Defaults to
     * `'bell'`.
     */
    icon?: IconName;
    /** Semantic family of the {@link NotificationItemV4Props.icon} badge. Default `'primary'`. */
    iconTone?: NotificationBadgeTone;
    /**
     * Take over the 44 leading slot entirely — an `AvatarV4` when the
     * notification is *from a person*, which is the other half of §4.3's leading
     * anatomy and the half a category glyph cannot express.
     *
     * Tested with `!== undefined` rather than `??`, so `leading={null}` is a
     * meaningful answer: it means **no leading slot at all**, which is §4.3's
     * third option and §4.7's escape from a homogeneous list of identical
     * badges. `leading={undefined}` (the default) still gets the badge.
     */
    leading?: React.ReactNode;
    /**
     * Paint the §4.3 `selected` ground independently of `unread` — for a
     * notification that is the one currently open in a detail pane. Default
     * `false`.
     *
     * `unread` already paints the same ground, so this is the *second* sense the
     * one token covers rather than a second tint.
     */
    selected?: boolean;
}
/**
 * **V4 notification row** — the notification member of the V4 row family.
 *
 * Every metric and state recipe comes from `internal/row-v4.ts`; this file
 * decides *content* and nothing else. That is the point of the pass: the base
 * row, `ListRow`, `SettingsRow` and `ActivityFeed` were four components with
 * three paddings, two min-heights, two press feedbacks and three leading
 * treatments between them, and a user scrolling from a people list into a
 * notification list could see the seam. Not one metric is typed here.
 *
 * What changes against the base row:
 *
 * 1. **The dot becomes a badge.** The base painted a `width: 8, height: 8` dot
 *    with a `marginTop: 6` — three literals brief §1 names outright — as its
 *    entire leading treatment. §4.3 retires the bare dot: the leading slot is
 *    the family's fixed 44 square ({@link rowLeadingStyle}) holding an
 *    `IconV4 badge="soft"` for a category, or the caller's own `leading` node
 *    for a person.
 *
 * 2. **The unread ground is the compiler's `selected` pair.** The hand-mixed
 *    `primary` at 12% goes: {@link rowGround} paints `colors.selected` with
 *    `onSelected` beside it, so the title keeps a *guaranteed* contrast pair
 *    rather than inheriting `onSurface` onto a tint nobody measured. 12% was
 *    also the *pressed* state-layer opacity, so a decorative tint and a press
 *    were indistinguishable; they no longer are. One token now covers both
 *    senses the family needs: an unread notification and a persistently
 *    highlighted row.
 *
 * 3. **Unread is said three ways, none of them a colour on the title.** A bold
 *    title, the `selected` ground, and a trailing `StatusDotV4` — a *state*
 *    mark, which §4.7 says is exactly what a dot is for, at the trailing edge
 *    where §4.3's anatomy puts an affordance. The accessible name still carries
 *    ", unread" for a reader that sees none of the three.
 *
 * 4. **Text is typeset, not styled.** Title `TextV4 size="base"
 *    weight="semibold"` (`bold` while unread) `tone="onSurface"`, body
 *    `size="sm" tone="mutedText"`, timestamp `size="xs" tone="mutedText"`.
 *    `mutedText`, not `muted`: the base used `colors.muted` — a *fill* — as its
 *    text colour throughout, which is the exact bug the shadcn pass closed.
 *
 * 5. **The timestamp top-aligns on a two-line row** (§4.3). It is a stamp on
 *    the row's first line, not a value centred against a paragraph — centred,
 *    it drifts below the title exactly when the body arrives and the list's
 *    right edge goes ragged.
 *
 * 6. **Press is the state layer.** `opacity: pressed ? 0.7 : 1` is deleted, not
 *    translated. {@link rowGround} returns the opaque `card`/`onCard` mix at
 *    M3's pressed opacity, so the layer tints the container and leaves the
 *    title at full strength — dimming the *content* is what M3 spends 0.38 on
 *    to mean **disabled**, which is what the old opacity was accidentally
 *    saying.
 *
 * 7. **The ground is otherwise transparent and the radius is gone.** The base
 *    painted its own `radius.md` card on `colors.surface`, so a notification
 *    list was a stack of little cards with the page showing through the gaps.
 *    §4.3: the *container* owns the card.
 *
 * Renders `null` when there is nothing to show (§4.5) — no title, no body, no
 * timestamp. A row with an empty title is a blank 56pt band in the middle of a
 * list, and a blank box is the one thing §4.5 forbids. A default badge does not
 * count as content: a bell over nothing is not a notification.
 */
export declare function NotificationItemV4({ title, body, time, unread, onPress, style, icon, iconTone, leading, selected, }: NotificationItemV4Props): React.ReactElement | null;
//# sourceMappingURL=NotificationItemV4.d.ts.map