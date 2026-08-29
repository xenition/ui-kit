"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidebarV4 = SidebarV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const v4_state_1 = require("../../primitives/internal/v4-state");
const v4_data_1 = require("../../primitives/internal/v4-data");
const v4_depth_1 = require("../../primitives/internal/v4-depth");
const chrome_v4_1 = require("./internal/chrome-v4");
/**
 * `Sidebar`, V4 — the same props, and a rail that answers "where am I?".
 *
 * ## No shadow, and that is the point
 *
 * A persistent nav rail is **not** a layer. It is attached to the edge of the
 * page and separated by a hairline, and §11 asks that a container earn its
 * existence rather than draw a box because that looks modern. So this component
 * spends no `elevation` at all: the only V4 primitive in the chrome family that
 * deliberately does not.
 *
 * The rail genuinely does become a layer in one situation — slid in over the
 * page on a phone — and that is `AppShellV4`'s job, because the drawer is the
 * thing that is floating, not the sidebar inside it. Putting the shadow here
 * would make the persistent rail cast one onto the content beside it, which is
 * a shadow with nothing to fall from.
 *
 * ## Saying where the user is
 *
 * §29 gives navigation one job above every other: the user should always know
 * where they are, and §32 asks that they recognise it rather than recall it. The
 * base fills the current row solid `primary` — which wins the "which one"
 * question and loses the icon, the label and the group structure under a brand
 * bar, exactly what §35.6 calls colour as noise rather than hierarchy.
 *
 * V4 uses three quieter signals instead: a brand **tint** at 12% composited
 * into `surface`, the contrast-corrected `primaryText` for the label, and a
 * leading rail in `primary`. The tint is composited rather than laid on with
 * alpha, so the row owns its colour instead of borrowing whatever it sits on;
 * the rail survives for a user who cannot separate the tint from the surface at
 * all. Selection also reaches the accessibility layer, not just the pixels.
 *
 * The tint mixes the **scheme-resolved** `primary` into the scheme-resolved
 * `surface`, never `tokens.ramps.primary[50]` — the ramps carry the light
 * orientation in both schemes, so that step is the palest one on a dark page
 * too.
 *
 * Group headings move from `muted` to `mutedText`: `muted` is a decorative slot
 * with no contrast promise, and a section heading is text.
 *
 * ## Feedback
 *
 * Press is the M3 state layer — the row's own content colour over its own
 * ground, at `state.pressed`. Every row clears 44pt, composed from the spacing
 * scale; the base's `paddingVertical: sm` put it around 34.
 */
function SidebarV4({ brand, items, groups, footer, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const resolvedGroups = groups ?? (items ? [{ items }] : []);
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    /** The current row's ground: brand, composited into the surface it sits on. */
    const activeGround = (0, v4_depth_1.mixToken)(colors.surface, colors.primary, v4_data_1.SELECT_MIX);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flex: 1,
                backgroundColor: colors.surface,
                borderRightWidth: 1,
                borderColor: colors.border,
                paddingHorizontal: tokens.spacing.sm,
                paddingVertical: tokens.spacing.lg,
            },
            style,
        ], children: [brand != null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { paddingHorizontal: tokens.spacing.sm, marginBottom: tokens.spacing.md }, children: typeof brand === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                        color: colors.onSurface,
                        fontFamily: tokens.typography.fontHeading,
                        fontSize: tokens.typography.scale.lg,
                        fontWeight: '700',
                    }, children: brand })) : (brand) })) : null, (0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { style: { flex: 1 }, contentContainerStyle: { gap: tokens.spacing.lg }, children: resolvedGroups.map((group, gi) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [group.label != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                // `mutedText`, not `muted`: this is text, and `muted` carries
                                // no contrast promise.
                                color: colors.mutedText,
                                fontFamily: tokens.typography.fontBody,
                                fontSize: tokens.typography.scale.xs,
                                fontWeight: '600',
                                textTransform: 'uppercase',
                                paddingHorizontal: tokens.spacing.md,
                                paddingBottom: tokens.spacing.xs,
                            }, children: group.label })) : null, group.items.map((item, ii) => {
                            const active = item.active === true;
                            return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: item.label, accessibilityState: { selected: active }, onPress: item.onSelect, style: ({ pressed }) => ({
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: tokens.spacing.sm,
                                    minHeight: tap,
                                    borderRadius: tokens.radius.md,
                                    paddingHorizontal: tokens.spacing.md,
                                    overflow: 'hidden',
                                    backgroundColor: pressed
                                        ? (0, v4_state_1.stateMix)(active ? activeGround : colors.surface, active ? colors.primary : colors.onSurface, 'pressed', theme.state)
                                        : active
                                            ? activeGround
                                            : 'transparent',
                                }), children: [active ? ((0, jsx_runtime_1.jsx)(react_native_1.View
                                    // The signal that survives when the tint does not: a user
                                    // who cannot separate a 12% brand wash from the surface
                                    // can still see an edge marker.
                                    , { 
                                        // The signal that survives when the tint does not: a user
                                        // who cannot separate a 12% brand wash from the surface
                                        // can still see an edge marker.
                                        style: {
                                            position: 'absolute',
                                            left: 0,
                                            top: tokens.spacing.sm,
                                            bottom: tokens.spacing.sm,
                                            width: 2,
                                            borderRadius: tokens.radius.full,
                                            backgroundColor: colors.primary,
                                        } })) : null, item.icon != null ? (0, jsx_runtime_1.jsx)(react_native_1.View, { children: item.icon }) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                                            // `primaryText`, the contrast-corrected brand ink — the
                                            // plain `primary` slot is a FILL colour.
                                            color: active ? colors.primaryText : colors.onSurface,
                                            fontFamily: tokens.typography.fontBody,
                                            fontSize: tokens.typography.scale.sm,
                                            fontWeight: active ? '600' : '500',
                                        }, children: item.label })] }, ii));
                        })] }, gi))) }), footer != null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    borderTopWidth: 1,
                    borderColor: colors.border,
                    paddingTop: tokens.spacing.md,
                }, children: footer })) : null] }));
}
//# sourceMappingURL=SidebarV4.js.map