"use strict";
/**
 * The one row recipe shared by the **V4 dashboard row family** on native —
 * `ListRowV4`, `SettingsRowV4`, `NotificationItemV4` and each row of
 * `ActivityFeedV4`.
 *
 * These four are the same object wearing four labels: a leading slot, a title,
 * a supporting line, a trailing readout and an affordance. A user scrolling a
 * settings screen into a notification list should not be able to tell that two
 * different components drew them. Today they can: a measured read of the four
 * native sources found **three different paddings**, **two different
 * min-heights** (`minHeight: 56`, `minHeight: 48` — both literals), **two
 * different press feedbacks** (`opacity: pressed ? 0.7 : 1` and nothing at
 * all), **three different leading treatments** (an avatar, nothing, an
 * `8 × 8` dot with a `marginTop: 6`) and **two different unread grounds**.
 * That is four components, not one family.
 *
 * So the values that decide whether two rows look like the same family are
 * decided **once**, here, exactly as `internal/field-v4.ts` decides them once
 * for the eleven V4 form controls. `row-v4.ts` is to the row line what
 * `field-v4.ts` is to the form line, and the two files are deliberately the
 * same shape: a metrics interface read off the theme, plus small pure helpers
 * that return `ViewStyle`s. Nothing in this file is picked — every value comes
 * from `useXenitionTheme()`.
 *
 * ## Where the numbers come from
 *
 * Material Design 3's list-item tokens, read off the compiled token file the
 * kit's earlier M3 work already cites — `material-components/material-web`,
 * `tokens/versions/v0_192/_md-comp-list.scss`: **one-line container 56,
 * two-line 72, three-line 88, leading and trailing space 16, leading icon 24,
 * leading avatar 40**. Apple's HIG gives no row metrics at all and says so
 * explicitly, so M3 is the source and HIG contributes the *anatomy* — a small
 * image at the leading end, a chevron meaning navigation and nothing else.
 *
 * Two deliberate departures from M3, both upward:
 *
 *   - The **leading slot is 44, not M3's 40 avatar.** 40 does not clear the HIG
 *     tap floor and the house badge spec (§8 / brief §4.7) is a 44 circle. 44
 *     is also the size `ButtonV4`, the nav line and the picker line already
 *     land on, so a row's avatar, a tab and a page number are one size rather
 *     than three that are nearly the same. It is read from the nav line's
 *     {@link minTap} rather than retyped, so there is still exactly one 44 in
 *     the kit.
 *   - **Three-line 88 is absent.** Nothing in the family has a third line, and
 *     a height nobody uses is a height that drifts.
 *
 * ## Why every value is composed and none is typed
 *
 * 56 and 72 land exactly on the kit's own spacing scale — `2xl + sm` and
 * `2xl + lg` — which is the whole reason M3's list metric was adoptable here at
 * all. Composing them rather than writing `56` means a seed that re-scales its
 * rhythm re-scales the rows with it, and a dense seed does not leave the row
 * family stranded at a size the rest of the product left behind. Brief §1
 * forbids the literal outright and names `minHeight: 56` / `minHeight: 48` in
 * these very sources as violations to remove.
 *
 * The **web twin, `src/dashboard/internal/row-v4.ts`, expresses the identical
 * seven metrics** as `calc()` expressions over the same scale steps, in the
 * same order. Same ideas, two spellings, because one platform composes in
 * JavaScript and the other in CSS and neither can read the other's.
 *
 * ## What is deliberately NOT here
 *
 * **Depth.** Brief §4.6: rows carry no shadow, and anything already inside a
 * card carries none either. A row lives in a card; nesting a shadow in a shadow
 * is the tell §4.2 is trying to remove.
 *
 * **A ground.** Brief §4.3: the row's ground is transparent and the
 * *container* owns the card, so a `SettingsSectionV4` is one card with rows in
 * it rather than a stack of little cards with gaps showing the page through.
 * See {@link rowGround}.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROW_MOTION = void 0;
exports.rowMetrics = rowMetrics;
exports.rowContainerStyle = rowContainerStyle;
exports.rowLeadingStyle = rowLeadingStyle;
exports.rowTextStyle = rowTextStyle;
exports.rowTrailingStyle = rowTrailingStyle;
exports.rowPressFill = rowPressFill;
exports.rowGround = rowGround;
exports.rowEdgeStyle = rowEdgeStyle;
exports.rowSeparatorStyle = rowSeparatorStyle;
const nav_v4_1 = require("../../primitives/internal/nav-v4");
const motion_v4_1 = require("../../primitives/internal/motion-v4");
const state_v4_1 = require("../../primitives/internal/state-v4");
/**
 * How long a row takes to acknowledge a touch, in ms.
 *
 * M3's `quick`, 100ms — the same duration the web twin's state-layer sheet
 * transitions its `background-color` over, so a pressed row settles on the same
 * beat on both platforms. A `Pressable` swapping its fill needs no animation at
 * all; this is here for a row that animates something else (a disclosure
 * chevron turning, a checkmark arriving) so it does not pick a fourth duration.
 */
exports.ROW_MOTION = motion_v4_1.V4_MOTION.quick;
/**
 * Read the shared row metrics off the theme.
 *
 * The single entry point — every other helper in this file goes through it, so
 * there is one place a row metric is computed and no way for a component to
 * half-adopt the recipe.
 */
function rowMetrics(theme) {
    const { spacing } = theme.tokens;
    const leading = (0, nav_v4_1.minTap)(spacing);
    return {
        oneLine: spacing['2xl'] + spacing.sm,
        twoLine: spacing['2xl'] + spacing.lg,
        padX: spacing.md,
        gap: spacing.md,
        textGap: spacing.xs,
        leading,
        separatorInset: leading + spacing.md,
    };
}
/**
 * The row's own box: one flex line, `md` gutters, transparent, no depth.
 *
 * `minHeight` rather than `height`, so a row whose title wraps on a narrow
 * phone grows instead of clipping — the height is a *floor*, which is what M3
 * means by a container height and what the tap floor requires. The vertical
 * padding only does anything once the content has grown past that floor; below
 * it the min-height governs and `alignItems: 'center'` centres the content.
 *
 * No background, no border, no radius, no shadow. All four belong to the
 * container (brief §4.2, §4.3, §4.6). A row that paints its own card is the bug
 * this whole pass exists to remove; the native `NotificationItem` paints one
 * today, radius and all.
 */
function rowContainerStyle(theme, options = {}) {
    const { oneLine, twoLine, padX, gap } = rowMetrics(theme);
    return {
        flexDirection: 'row',
        alignItems: 'center',
        gap,
        paddingHorizontal: padX,
        paddingVertical: theme.tokens.spacing.sm,
        minHeight: options.twoLine === true ? twoLine : oneLine,
        backgroundColor: 'transparent',
    };
}
/**
 * The leading slot: a fixed 44 square that never shrinks.
 *
 * Fixed on both axes so a list of twenty rows has its titles on one vertical
 * line whether a given row holds an avatar, a tinted badge or nothing at all —
 * a ragged left edge is the single most visible way a row family stops looking
 * like one. `flexShrink: 0` because flex will otherwise steal from the avatar
 * to pay for a long title, which is exactly backwards.
 */
function rowLeadingStyle(theme) {
    const { leading } = rowMetrics(theme);
    return {
        width: leading,
        height: leading,
        flexShrink: 0,
        alignItems: 'center',
        justifyContent: 'center',
    };
}
/**
 * The text column: title over supporting line, `xs` apart.
 *
 * `minWidth: 0` is load-bearing and easy to lose — without it a flex child
 * refuses to shrink below its content width and `numberOfLines={1}` stops
 * ellipsising, pushing the trailing readout off the edge of the row instead.
 */
function rowTextStyle(theme) {
    return { flex: 1, minWidth: 0, gap: rowMetrics(theme).textGap };
}
/**
 * The trailing column: value or timestamp, then the affordance.
 *
 * `flexShrink: 0` so the affordance is never squeezed out by a long title — the
 * chevron is what tells the user the row navigates (HIG), and a chevron that
 * disappears on a narrow screen turns a navigable row into a dead one. A
 * two-line row whose timestamp should top-align adds `alignSelf: 'flex-start'`
 * at the call site; that is a per-row content decision, not a family metric.
 */
function rowTrailingStyle(theme) {
    return {
        flexDirection: 'row',
        alignItems: 'center',
        flexShrink: 0,
        gap: theme.tokens.spacing.sm,
    };
}
/**
 * The pressed state layer for a row, as an **opaque** hex.
 *
 * `stateMix(colors.card, colors.onCard, 'pressed')` — M3's pressed opacity
 * (0.12, `_md-sys-state.scss` v0_192) of the row's own ink, flattened against
 * the fill the row is drawn on. Reached through the native adapter
 * {@link pressOver} so the opacity comes from the resolved `theme.state` rather
 * than a compile-time copy of it.
 *
 * Why opaque, when the translucent `rgba()` flavour (`pressLayer`) is the more general
 * answer: a row's title and supporting line carry a *measured* contrast promise
 * against the fill they are drawn on. A translucent layer makes that promise
 * depend on whatever happens to be behind the row — the card today, a tinted
 * section tomorrow — so the guarantee stops being checkable. Naming the pair the
 * row actually wears keeps it checkable, and it is the identical pair the web
 * twin hands to `stateGroundVars`.
 *
 * `card`/`onCard` and not `surface`/`onSurface`: a row lives in a card, and
 * `card` is the token that was split out precisely so a raised surface reads as
 * raised in both schemes. A row on a bare page passes its own pair.
 *
 * This replaces `opacity: pressed ? 0.7 : 1` outright, and the replacement is
 * not cosmetic. Dimming fades the row's own *content*, which is the signal M3
 * spends 0.38 on to mean **disabled** — so a pressed row and a dead row looked
 * alike. A state layer tints the container and leaves the content at full
 * strength.
 */
function rowPressFill(theme, ground = theme.colors.card, ink = theme.colors.onCard) {
    return (0, state_v4_1.pressOver)(theme, ground, ink);
}
/**
 * The row's ground, for whichever of the three states it is in.
 *
 * Transparent by default, because the container owns the card (brief §4.3).
 *
 * `selected` is the one exception, and it is one token rather than the two
 * different unread grounds the family carries today (`bg-neutral-100` on the
 * web `NotificationItem`, a hand-mixed `primary` at 12% on this twin).
 * `colors.selected` is the compiler's slot for exactly this — "the container
 * behind a selected or hovered row" — and it ships with `onSelected` beside it,
 * so the row's text keeps a guaranteed contrast pair instead of inheriting
 * `onSurface` onto a tint nobody checked it against. It covers both senses the
 * family needs: a persistently highlighted navigation row (HIG) and an unread
 * notification.
 *
 * `pressed` wins over `selected` while the finger is down, because the press is
 * the answer to "did it hear me" and that question is more urgent than "which
 * one is chosen" for the ~100ms it is being asked.
 */
function rowGround(theme, options = {}) {
    if (options.pressed === true) {
        return options.selected === true
            ? rowPressFill(theme, theme.colors.selected, theme.colors.onSelected)
            : rowPressFill(theme);
    }
    if (options.selected === true)
        return theme.colors.selected;
    return 'transparent';
}
/**
 * A separator between two rows, optionally inset to clear the leading slot.
 *
 * Brief §4.4: 1px `colors.border` and nothing else — never two weights, never a
 * tinted rule, and only *inside* a grouped container. Between free-standing
 * blocks the answer is space, not a rule.
 *
 * `inset` is the row's own question, not the separator's: a list whose rows have
 * a 44 leading slot insets, a list of plain rows runs flush. Passing the flag
 * rather than exposing the number keeps the two cases from being spelled
 * differently in four components.
 *
 * `marginStart` rather than `marginLeft`, so the inset clears the leading slot
 * in a right-to-left locale too — where the leading slot is on the right, and a
 * `marginLeft` would inset from the wrong end and leave the rule running under
 * the avatar it was drawn to clear.
 *
 * A `height` and a `backgroundColor` rather than a `borderBottomWidth`: a rule
 * is an object between two rows, not an edge belonging to one of them, and the
 * border spelling makes the last row of a list a special case at every call
 * site.
 */
/**
 * A hairline along a row's own bottom edge.
 *
 * {@link rowSeparatorStyle} describes a **standalone element** — a `height`
 * and a `backgroundColor`, which is right when a list renders a real rule
 * between two rows. Spread that same object into the row's own style and it
 * fights the row: the row is handed the border colour as its **background**,
 * so every row in the list draws in `colors.border` instead of its ground.
 *
 * Eight components did exactly that. This is the shape they wanted.
 *
 * There is no inset variant, deliberately — see the web twin's
 * `rowEdgeClass`: an edge belongs to the row and cannot be inset without a
 * child element, and making one twin capable of something the other is not is
 * how the two halves drift.
 */
function rowEdgeStyle(theme) {
    return {
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    };
}
function rowSeparatorStyle(theme, options = {}) {
    return {
        // A hairline. The one bare number brief §1 allows, and the same 1 the web
        // twin's sheet writes — a separator is a geometric minimum, not a step on
        // the spacing scale, and scaling it with the seed would thicken every rule
        // in the product.
        height: 1,
        backgroundColor: theme.colors.border,
        marginStart: options.inset === true ? rowMetrics(theme).separatorInset : 0,
    };
}
//# sourceMappingURL=row-v4.js.map