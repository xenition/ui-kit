"use strict";
/**
 * The one row recipe shared by the **V4 dashboard row family** on the web —
 * `ListRowV4`, `SettingsRowV4`, `NotificationItemV4` and each row of
 * `ActivityFeedV4`.
 *
 * These four are the same object wearing four labels: a leading slot, a title,
 * a supporting line, a trailing readout and an affordance. A user scrolling a
 * settings screen into a notification list should not be able to tell that two
 * different components drew them. Today they can: a measured read of the four
 * sources found **three different horizontal paddings** (`px-md`, `px-lg`,
 * `px-md`+`gap-sm`), **two different min-heights** (`min-h-[56px]`,
 * `min-h-[48px]`), **two different press feedbacks** (`hover:bg-neutral-100`
 * and `hover:opacity-80`), **three different leading treatments** (an avatar,
 * nothing, an 8px dot) and **two different unread grounds**. That is four
 * components, not one family.
 *
 * So the values that decide whether two rows look like the same family are
 * decided **once**, here, exactly as `internal/field-v4.ts` decides them once
 * for the eleven V4 form controls. `row-v4.ts` is to the row line what
 * `field-v4.ts` is to the form line, and the two files are deliberately the
 * same shape: exported constants, one injected sheet with a `*_STYLE_ID`, and
 * small pure helpers.
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
 *     also happens to be the size `ButtonV4`, the nav line and the picker line
 *     already land on, so a row's avatar, a tab and a page number are one size
 *     rather than three that are nearly the same. It is imported from
 *     {@link MIN_TAP} rather than retyped, so there is still exactly one 44.
 *   - **Three-line 88 is absent.** Nothing in the family has a third line, and
 *     a height nobody uses is a height that drifts.
 *
 * ## Why every value is composed and none is typed
 *
 * 56 and 72 land exactly on the kit's own spacing scale — `2xl + sm` and
 * `2xl + lg` — which is the whole reason M3's list metric was adoptable here at
 * all. Composing them rather than writing `56px` means a seed that re-scales
 * its rhythm re-scales the rows with it, and a `sharp`/dense seed does not
 * leave the row family stranded at a size the rest of the product left behind.
 * Brief §1 forbids the literal outright; `min-h-[56px]` and `min-h-[48px]` in
 * the current sources are named there as violations to remove.
 *
 * ## Why the sheet
 *
 * Same reason as `field-v4.ts`, `nav-v4.ts` and the V4 surfaces: the values are
 * `var()` and `calc()` expressions, and a CSSOM that does not parse custom
 * properties (jsdom, and SSR extractors built on one) drops such a declaration
 * from an inline `style` outright, silently leaving the row unstyled. In a
 * sheet the declaration is never parsed by that layer — it is a string handed
 * to the browser.
 *
 * ## What is deliberately NOT here
 *
 * **Depth.** Brief §4.6: rows carry no shadow, and anything already inside a
 * card carries none either. A row lives in a card; nesting a shadow in a shadow
 * is the tell §4.2 is trying to remove.
 *
 * **A ground.** Brief §4.3: the row's ground is transparent and the
 * *container* owns the card, so a `SettingsSectionV4` is one white card with
 * rows in it rather than a stack of little cards with gaps showing the page
 * through. See {@link rowGroundClass}.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROW_V4_CSS = exports.ROW_V4_TRAILING_CLASS = exports.ROW_V4_TEXT_CLASS = exports.ROW_V4_LEADING_CLASS = exports.ROW_V4_BASE_CLASS = exports.ROW_V4_METRICS = exports.ROW_MOTION = exports.V4_STATE_STYLE_ID = exports.V4_STATE_CSS = exports.ROW_V4_STYLE_ID = void 0;
exports.rowHeightClass = rowHeightClass;
exports.rowGroundClass = rowGroundClass;
exports.rowStateVars = rowStateVars;
exports.rowSeparatorClass = rowSeparatorClass;
exports.rowEdgeClass = rowEdgeClass;
const nav_v4_1 = require("../../primitives/internal/nav-v4");
const v4_motion_1 = require("../../primitives/internal/v4-motion");
const v4_state_1 = require("../../primitives/internal/v4-state");
Object.defineProperty(exports, "V4_STATE_CSS", { enumerable: true, get: function () { return v4_state_1.V4_STATE_CSS; } });
Object.defineProperty(exports, "V4_STATE_STYLE_ID", { enumerable: true, get: function () { return v4_state_1.V4_STATE_STYLE_ID; } });
/** The `<style>` id every V4 row injects its sheet from. Idempotent. */
exports.ROW_V4_STYLE_ID = 'xen-v4-dashboard-row-styles';
/**
 * How long a row takes to acknowledge a pointer, in ms.
 *
 * M3's `quick`, 100ms — the same duration `V4_STATE_CSS` transitions its own
 * `background-color` over, because the row's feedback IS that layer and a
 * second duration here would put the row's ground and the row's state layer on
 * two different clocks. Exported so a row that animates anything else (a
 * disclosure chevron turning) turns on the same beat.
 */
exports.ROW_MOTION = v4_motion_1.V4_MOTION.quick;
/**
 * Every metric in the row family, as CSS length expressions.
 *
 * The native twin, `src/native/dashboard/internal/row-v4.ts`, exports the same
 * seven keys as resolved numbers off `useXenitionTheme()`. They are the same
 * seven ideas in the same order in both files, so a change to one is an
 * obviously incomplete change until the other moves too — which is the only
 * mechanism that has ever kept twins from drifting.
 */
exports.ROW_V4_METRICS = {
    /**
     * **56** — a row with a title and nothing under it. `2xl + sm`.
     *
     * M3 list one-line container height. A title at `base` sits on roughly 24
     * points of line box, so 56 is that plus a comfortable 16 of breathing room,
     * and it clears the 44 tap floor with room to spare — which matters, because
     * a settings row is a target a thumb hits while scrolling.
     */
    oneLine: 'calc(var(--xen-space-2xl) + var(--xen-space-sm))',
    /**
     * **72** — a row that also carries a supporting line. `2xl + lg`.
     *
     * M3 list two-line container height. Note it is 16 taller than the one-line
     * row, not 20 or 24: the supporting line is `sm`, and the row absorbs it by
     * growing exactly one `md` step. Rows of both kinds in one list therefore
     * stay on the same vertical rhythm instead of drifting off it.
     */
    twoLine: 'calc(var(--xen-space-2xl) + var(--xen-space-lg))',
    /**
     * **16** — the gutter between the row's edge and its content. `md`.
     *
     * M3 list leading/trailing space, and brief §4.1's "row horizontal padding".
     * It is `md` and not `lg` because the row sits *inside* a card that is
     * already inset by `lg`; paying the page gutter twice pushes every row's
     * text into a narrow channel down the middle of the card.
     */
    padX: 'var(--xen-space-md)',
    /**
     * **16** — leading slot to text. `md`.
     *
     * The same step as {@link ROW_V4_METRICS.padX} on purpose: the gap left of
     * the avatar and the gap right of it are one rhythm, so the leading slot
     * reads as sitting in a gutter rather than as being crowded against the text.
     */
    gap: 'var(--xen-space-md)',
    /**
     * **4** — title to supporting line. `xs`.
     *
     * Brief §4.1. `gap-0.5` and `gap: 2` are what the four current sources use
     * for this and they are literals; both become `xs`. Small on purpose — the
     * two lines are one thought, and anything larger reads as two separate rows.
     */
    textGap: 'var(--xen-space-xs)',
    /**
     * **44** — the leading slot, square.
     *
     * The HIG tap-target floor and the house §4.7 badge size, imported from the
     * nav line's {@link MIN_TAP} (`2xl - xs`) rather than typed, so the kit still
     * has exactly one 44 and a re-scaled seed moves it everywhere at once. Above
     * M3's 40 avatar deliberately — see the module doc.
     */
    leading: nav_v4_1.MIN_TAP,
    /**
     * **60** — where a separator starts on a row that has a leading slot.
     * `44 + md`.
     *
     * Brief §4.4. A rule that runs under the avatar cuts the leading slot in
     * half and makes the list read as a table; a rule that starts where the
     * *text* starts reads as a break between two rows, which is what it is. It is
     * derived from {@link ROW_V4_METRICS.leading} and
     * {@link ROW_V4_METRICS.gap}, never measured, so it cannot fall out of step
     * with the slot it is clearing.
     */
    separatorInset: `calc(${nav_v4_1.MIN_TAP} + var(--xen-space-md))`,
};
/**
 * The row's own skin: full width, one flex line, `md` gutters, transparent.
 *
 * `min-h` rather than `h`, so a row whose title wraps on a narrow phone grows
 * instead of clipping — the height is a *floor*, which is what M3 means by a
 * container height and what the tap floor requires. `py-sm` only does anything
 * once the content has grown past that floor; below it the min-height governs
 * and the content is centred.
 *
 * No ground, no border, no radius, no shadow. All four belong to the container
 * (brief §4.2, §4.3, §4.6). A row that paints its own card is the bug this
 * whole pass exists to remove.
 */
exports.ROW_V4_BASE_CLASS = [
    'flex w-full items-center text-left',
    'gap-md px-md py-sm',
    'bg-transparent border-0',
].join(' ');
/**
 * The min-height for a row, given whether it carries a supporting line.
 *
 * One function rather than two constants at the call sites, because the choice
 * is a *fact about the content* — "is there a second line" — and every row in
 * the family answers it the same way. Tailwind arbitrary values take underscores
 * where the expression has spaces.
 */
function rowHeightClass(twoLine) {
    return twoLine
        ? 'min-h-[calc(var(--xen-space-2xl)_+_var(--xen-space-lg))]'
        : 'min-h-[calc(var(--xen-space-2xl)_+_var(--xen-space-sm))]';
}
/**
 * The leading slot: a fixed 44 square that never shrinks.
 *
 * Fixed on both axes so a list of twenty rows has its titles on one vertical
 * line whether a given row holds an avatar, a tinted badge or nothing at all —
 * a ragged left edge is the single most visible way a row family stops looking
 * like one. `shrink-0` because flex will otherwise steal from the avatar to pay
 * for a long title, which is exactly backwards.
 */
exports.ROW_V4_LEADING_CLASS = [
    'flex shrink-0 items-center justify-center',
    'h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]',
    'w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]',
].join(' ');
/**
 * The text column: title over supporting line, `xs` apart.
 *
 * `min-w-0` is load-bearing and easy to lose — without it a flex child refuses
 * to shrink below its content width and `truncate` on the title silently stops
 * working, pushing the trailing readout off the row instead of ellipsising.
 */
exports.ROW_V4_TEXT_CLASS = 'flex min-w-0 flex-1 flex-col gap-xs text-left';
/**
 * The trailing column: value or timestamp, then the affordance.
 *
 * `shrink-0` so the affordance is never squeezed out by a long title — the
 * chevron is what tells the user the row navigates (HIG), and a chevron that
 * disappears on a narrow screen turns a navigable row into a dead one. A
 * two-line row whose timestamp should top-align adds `self-start` at the call
 * site; that is a per-row content decision, not a family metric.
 */
exports.ROW_V4_TRAILING_CLASS = 'flex shrink-0 items-center gap-sm';
/**
 * The row's ground.
 *
 * Transparent by default, because the container owns the card (brief §4.3).
 *
 * `selected` is the one exception, and it is one token rather than the two
 * different unread grounds the family carries today (`bg-neutral-100` on the
 * web `NotificationItem`, a hand-mixed `primary` at 12% on the native twin).
 * `--xen-selected` is the compiler's slot for exactly this — "the container
 * behind a selected or hovered row" — and it ships with `--xen-on-selected`
 * beside it, so the row's text keeps a guaranteed contrast pair instead of
 * inheriting `on-surface` onto a tint nobody checked it against. It covers both
 * senses the family needs: a persistently highlighted navigation row (HIG) and
 * an unread notification.
 */
function rowGroundClass(selected = false) {
    return selected ? 'bg-selected text-on-selected' : 'bg-transparent';
}
/**
 * The element-scoped custom properties that make a row's state layer **opaque**.
 *
 * Spread onto `style` alongside a `data-xen-v4-state` attribute — those two
 * together are the row's entire press and hover feedback, and brief §4.3 says
 * "and nothing else": every `hover:bg-neutral-100`, `hover:opacity-80` and
 * `opacity: pressed ? 0.7 : 1` in the family is deleted, not translated.
 *
 * Why opaque, when `V4_STATE_CSS`'s default translucent layer is the more
 * general answer: a row's title and supporting line carry a *measured* contrast
 * promise against the fill they are drawn on. A translucent layer makes that
 * promise depend on whatever happens to be behind the row — the card today, a
 * tinted section tomorrow — so the guarantee stops being checkable. Naming the
 * pair the row actually wears keeps it checkable. This is the same trade the
 * native twin makes with `stateMix(card, onCard, 'pressed')`; the two twins
 * mix the identical pair at the identical M3 opacity.
 *
 * `card`/`on-card` and not `surface`/`on-surface`: a row lives in a card, and
 * `--xen-card` is the token that was split out precisely so a raised surface
 * reads as raised in both schemes. A row on a bare page passes its own pair.
 */
function rowStateVars(ground = 'var(--xen-card)', ink = 'var(--xen-on-card)') {
    return (0, v4_state_1.stateGroundVars)(ground, ink);
}
/**
 * A separator between two rows, optionally inset to clear the leading slot.
 *
 * Brief §4.4: 1px `--xen-border` and nothing else — never two weights, never a
 * tinted rule, and only *inside* a grouped container. Between free-standing
 * blocks the answer is space, not a rule.
 *
 * `inset` is the row's own question, not the separator's: a list whose rows
 * have a 44 leading slot insets, a list of plain rows runs flush. Passing the
 * flag rather than exposing the number keeps the two cases from being spelled
 * differently in four components.
 */
function rowSeparatorClass(inset = false) {
    return inset
        ? 'xen-v4-row-separator xen-v4-row-separator--leading'
        : 'xen-v4-row-separator';
}
/**
 * A hairline along a row's own bottom edge.
 *
 * `rowSeparatorClass` paints a **standalone element** — `height: 1px` and a
 * `background-color` — which is right when a list renders a real rule between
 * two rows, as `TxListV4` does. Put those same classes on the row itself and
 * they fight it: the row is handed a 1px height and, worse, the border colour
 * as its own background, so every row in the list draws in `--xen-border`
 * instead of its ground.
 *
 * Eight components did exactly that. This is the shape they wanted — a
 * pseudo-element on the row, so the row keeps its ground and its height.
 *
 * There is no inset variant, deliberately. An edge belongs to the row and
 * cannot be inset without a child element, and the native twin has no
 * pseudo-elements at all; making one twin capable of something the other is
 * not is how the two halves drift. A list that wants an inset rule renders a
 * real separator element and calls `rowSeparatorClass(true)`.
 */
function rowEdgeClass() {
    return 'xen-v4-row-edge';
}
/**
 * Everything the row family paints that a Tailwind class bound to a token
 * cannot say.
 *
 * Two rules, and both of them earn their place:
 *
 * 1. **The opaque state ground, as a fallback.** The selector is
 *    `[data-xen-v4-row][data-xen-v4-state]` — two attributes, so its
 *    specificity (0-2-0) beats `V4_STATE_CSS`'s `[data-xen-v4-state]` (0-1-0)
 *    no matter which of the two sheets the document happened to inject first.
 *    Injection order is not something four separate components should have to
 *    agree on. {@link rowStateVars} remains the precise spelling for a row on a
 *    ground other than the card, and being inline it still wins over both.
 *
 * 2. **The separator.** A 1px rule whose inset is `calc()` over two custom
 *    properties, which is not expressible as a class bound to a token.
 *    `margin-inline-start` rather than `margin-left`, so the inset clears the
 *    leading slot in a right-to-left locale too — where the leading slot is on
 *    the right, and a `margin-left` would inset from the wrong end and leave
 *    the rule running under the avatar it was drawn to clear.
 *
 * The separator is a `background`, not a `border`: a border on a zero-height
 * element is subject to the same collapsing rules a border anywhere is, and a
 * 1px background box is one declaration that behaves identically in a flex
 * column, a grid and a list.
 */
exports.ROW_V4_CSS = `
[data-xen-v4-row][data-xen-v4-state] {
  --xen-v4-state-ground: var(--xen-card);
  --xen-v4-state-ink: var(--xen-on-card);
}
.xen-v4-row-separator {
  height: 1px; /* a hairline — the one bare number brief §1 allows */
  border: 0;
  background-color: var(--xen-border);
}
.xen-v4-row-separator--leading {
  margin-inline-start: ${exports.ROW_V4_METRICS.separatorInset};
}
.xen-v4-row-edge {
  position: relative;
}
.xen-v4-row-edge::after {
  content: '';
  position: absolute;
  inset-inline: 0;
  bottom: 0;
  height: 1px;
  background-color: var(--xen-border);
}
`;
//# sourceMappingURL=row-v4.js.map