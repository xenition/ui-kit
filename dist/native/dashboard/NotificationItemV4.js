"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationItemV4 = NotificationItemV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const IconV4_1 = require("../primitives/IconV4");
const StatusDotV4_1 = require("../primitives/StatusDotV4");
const TextV4_1 = require("../primitives/TextV4");
const row_v4_1 = require("./internal/row-v4");
/**
 * The category badge a notification wears when the caller names none.
 *
 * §4.3 retires the bare 8px dot outright and §5 says the dot "becomes a 44
 * tinted circular badge carrying a category `icon`" — so the replacement has to
 * be the *default*, not an opt-in, or every caller that renders a notification
 * today loses its leading treatment and the list's titles go ragged. `bell` is
 * the set's name for "a notification", which is what an unlabelled one is.
 *
 * §4.7's warning against "a list of twenty identical badges" is real and the
 * answer to it is `icon` — a notification list that knows its categories should
 * pass them. A caller that wants the slot genuinely empty passes
 * `leading={null}`; see {@link NotificationItemV4Props.leading}.
 */
const DEFAULT_ICON = 'bell';
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
function NotificationItemV4({ title, body, time, unread = false, onPress, style, icon = DEFAULT_ICON, iconTone = 'primary', leading, selected = false, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const supporting = body !== undefined && body !== '';
    const titled = title.trim() !== '';
    const stamped = time !== undefined && time !== '';
    // §4.5: nothing to show, so show nothing.
    if (!titled && !supporting && !stamped)
        return null;
    const highlighted = unread || selected;
    const container = (0, row_v4_1.rowContainerStyle)(theme, { twoLine: supporting });
    const leadingNode = leading !== undefined ? (leading) : ((0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: icon, color: iconTone, badge: "soft", size: "base" }));
    const label = `${title}${unread ? ', unread' : ''}`;
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [leadingNode != null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, row_v4_1.rowLeadingStyle)(theme), children: leadingNode })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, row_v4_1.rowTextStyle)(theme), children: [titled ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: unread ? 'bold' : 'semibold', tone: "onSurface", numberOfLines: 1, children: title })) : null, supporting ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, children: body })) : null] }), stamped || unread ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
                    (0, row_v4_1.rowTrailingStyle)(theme),
                    // §4.3: a timestamp top-aligns on a two-line row. On a one-line row
                    // there is only one line to align to, so centring is correct and
                    // `flex-start` would push the stamp against the padding.
                    supporting ? { alignSelf: 'flex-start' } : null,
                ], children: [stamped ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: time })) : null, unread ? (0, jsx_runtime_1.jsx)(StatusDotV4_1.StatusDotV4, { tone: "primary", pulse: false }) : null] })) : null] }));
    if (onPress === undefined) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: label, style: [container, { backgroundColor: (0, row_v4_1.rowGround)(theme, { selected: highlighted }) }, style], children: inner }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, onPress: onPress, style: ({ pressed }) => [
            container,
            { backgroundColor: (0, row_v4_1.rowGround)(theme, { pressed, selected: highlighted }) },
            style,
        ], children: inner }));
}
//# sourceMappingURL=NotificationItemV4.js.map