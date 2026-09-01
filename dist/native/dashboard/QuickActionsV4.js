"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuickActionsV4 = QuickActionsV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const GridV4_1 = require("../layout/GridV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const nav_v4_1 = require("../primitives/internal/nav-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const surface_v4_1 = require("../primitives/internal/surface-v4");
const theme_1 = require("../theme");
/**
 * **V4 quick actions** — the shortcut launcher on a dashboard home, on the V4
 * design line. Same props as {@link QuickActions} plus `minItemWidth`, two
 * additive fields on each action (`iconName`, `tone`), and the exact twin of
 * the web `QuickActionsV4`.
 *
 * ## It is a row of soft badges, not an admin toolbar
 *
 * §3 describes what this product actually looks like — *warm, generous, airy
 * consumer mobile; white cards floating on the warm ground; glyphs sit in soft
 * tinted circular badges* — and the base component was the opposite of it: a
 * bordered box the same colour as the page, an unstyled glyph slot, and a
 * `spacing.sm` gutter that packed the tiles tight enough to read as a control
 * strip. §5 asks for the whole tile:
 *
 * - **Ground `colors.card`, not `colors.surface`.** §4.2 calls this *"the most
 *   visible bug in the dashboard module today"* — the card slot was split out
 *   in the shadcn pass so a raised surface reads as raised in both schemes,
 *   and this module never adopted it. The ink moves with it, to `onCard`.
 * - **`radius.lg`, no border, `elevation.card`.** §4.2's recipe is a hairline
 *   *or* a soft shadow, never a heavy border and a shadow together; a tile
 *   floating on the warm page takes the shadow, and it is the seed's shadow —
 *   inert on a `depth: 'flat'` brand with no branch here.
 * - **The glyph moves into a 44 tinted circular badge** — `IconV4
 *   badge="soft"`, §4.7's categorical badge, which is exactly what a quick
 *   action is: a *kind of thing* you can go and do.
 * - **Gutter `spacing.md`**, up from `sm`. §4.1's grid gutter, and §3's "when
 *   in doubt, more space".
 *
 * ## Reach, state and disabled
 *
 * Every tile clears the 44 floor through {@link minTap} (`spacing['2xl'] -
 * spacing.xs`, composed rather than typed). Press is the **state layer** over
 * the tile's own opaque `card`/`onCard` pair — the base carried
 * `opacity: pressed ? 0.8 : 1`, which fades the tile's *content*, which is the
 * signal M3 spends `0.38` on to mean **disabled**, so a pressed tile and a
 * dead tile looked alike. `disabled` now takes that 0.38 from
 * `state.disabledContent` rather than the base's round-number `0.5`.
 *
 * ## Structure
 *
 * The grid is `GridV4`, so `columns` and the new `minItemWidth` are the
 * module's one answer to how many tracks fit rather than the base's
 * `flexBasis: ${Math.floor(100 / columns) - 2}%` — a magic percentage §5 calls
 * out by name in the neighbouring `KpiRow`.
 *
 * `actions: []` renders **nothing** (§4.5). A launcher with nothing to launch
 * is not a heading over a blank box.
 */
function QuickActionsV4({ actions, title, columns = 3, minItemWidth, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens, state, elevation } = theme;
    // §4.5 — nothing to launch, nothing to draw. Not even the heading: a title
    // over a blank box is the bordered-empty-box §4.5 rules out, with a label.
    if (actions.length === 0)
        return null;
    // The HIG floor, composed from the spacing scale rather than typed as 44.
    const tapFloor = (0, nav_v4_1.minTap)(tokens.spacing);
    const pressedGround = (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.md }, style], children: [title ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", weight: "bold", tone: "onSurface", children: title })) : null, (0, jsx_runtime_1.jsx)(GridV4_1.GridV4, { columns: columns, gap: "md", minItemWidth: minItemWidth, children: actions.map((action) => {
                    const glyph = typeof action.icon === 'string' ? action.icon : undefined;
                    const badged = glyph !== undefined || action.iconName !== undefined;
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: action.label, accessibilityState: { disabled: !!action.disabled }, disabled: action.disabled, onPress: action.onPress, style: ({ pressed }) => [
                            {
                                minHeight: tapFloor,
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: tokens.spacing.sm,
                                padding: tokens.spacing.md,
                                borderRadius: tokens.radius.lg,
                                backgroundColor: pressed ? pressedGround : colors.card,
                                // M3 disables CONTENT at 0.38 — the token, not a round number.
                                opacity: action.disabled ? state.disabledContent : 1,
                            },
                            (0, surface_v4_1.elevationStyle)(elevation.card),
                        ], children: [badged ? ((0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: glyph, name: action.iconName, badge: "soft", color: action.tone ?? 'primary' })) : action.icon ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { children: action.icon })) : null, (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "onCard", numberOfLines: 1, children: action.label })] }, action.key));
                }) })] }));
}
//# sourceMappingURL=QuickActionsV4.js.map