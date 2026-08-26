"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BottomNavV4 = BottomNavV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const react_native_safe_area_context_1 = require("react-native-safe-area-context");
const theme_1 = require("../theme");
const glass_1 = require("../../theme/glass");
const v4_depth_1 = require("../../primitives/internal/v4-depth");
const nav_v4_1 = require("./internal/nav-v4");
const surface_v4_1 = require("./internal/surface-v4");
const state_v4_1 = require("./internal/state-v4");
/** How much primary the active indicator carries. A ground, not a fill. */
const INDICATOR_MIX = 0.14;
/**
 * **V4 bottom navigation** — same props as {@link BottomNav}, a different
 * design line.
 *
 * ## The selected state is a shape, not just a colour
 *
 * The base bar said "you are here" with one channel: the label went from
 * `muted` to `primary`. That is the weakest possible answer to §29's question,
 * and it fails twice over — `colors.primary` is a FILL slot with no contrast
 * promise as text, and a colour-only signal is invisible to a good share of
 * readers.
 *
 * V4 says it three ways. A **contained fill** sits behind the active icon —
 * `primary` composited OPAQUELY into `surface` at 14%, so it is a real colour
 * rather than a translucent one borrowing whatever is behind the bar. The
 * label moves to `primaryText`, the compiler's brand hue walked until it
 * clears AA. And the weight goes to 600. Any one of the three read on its own
 * is enough to answer the question (§32).
 *
 * The fill is the one place this component is allowed a capsule. §8 bans
 * *excessive* pill-shaped controls; here the pill is the smallest shape that
 * can hold an icon without looking like a button, and it defers to the seed —
 * `radius.full` is 0 on a `sharp` brand, so a sharp app gets a sharp indicator.
 *
 * ## Why the bar has a shadow, and why it points up
 *
 * A bottom bar genuinely floats above scrolling content, so `elevation.sheet`
 * is layer order made visible rather than decoration. Its `offsetY` is
 * NEGATIVE — the compiler built it for a sheet rising from the bottom edge —
 * which is exactly the direction a bottom bar's shadow has to fall: onto the
 * content passing underneath it, not onto the home indicator below. A
 * `depth: 'flat'` seed zeroes it with no branch in this file, and the top
 * hairline still separates the bar from the page.
 *
 * Glass is the one thing that must be asked for, because the compiler never
 * neutralises it: at `depth: 'glass'` the bar becomes translucent and its
 * hairline switches to the glass edge, which is the only treatment where
 * content scrolling under a nav bar is a feature rather than a smear.
 *
 * ## Reach and safe areas
 *
 * Every cell clears 44pt above the inset, composed from the spacing scale, and
 * the device's bottom inset is added on top so the bar clears the home
 * indicator rather than sitting under it (§30).
 */
function BottomNavV4({ items, active, onChange, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    // Needs a `SafeAreaProvider` above it (Expo default).
    const insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    const glassy = theme.depth === 'glass';
    const skin = glassy ? (0, glass_1.composeGlass)(theme.glass, colors.surface, 'regular') : null;
    const indicatorFill = (0, v4_depth_1.mixToken)(colors.surface, colors.primary, INDICATOR_MIX);
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "tablist", style: [
            {
                flexDirection: 'row',
                backgroundColor: skin === null ? colors.surface : skin.backgroundColor,
                borderTopWidth: 1,
                borderTopColor: skin === null ? colors.border : skin.borderColor,
                paddingTop: tokens.spacing.xs,
                paddingBottom: tokens.spacing.xs + insets.bottom,
            },
            (0, surface_v4_1.elevationStyle)(theme.elevation.sheet),
            style,
        ], children: items.map((item) => {
            const selected = item.key === active;
            return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "tab", accessibilityState: { selected }, accessibilityLabel: item.label, onPress: () => onChange(item.key), style: ({ pressed }) => ({
                    flex: 1,
                    minHeight: (0, nav_v4_1.minTap)(tokens.spacing),
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: tokens.spacing.xs / 2,
                    backgroundColor: pressed ? (0, state_v4_1.pressLayer)(theme) : 'transparent',
                }), children: [item.icon != null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            minWidth: tokens.spacing.xl,
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingHorizontal: tokens.spacing.sm,
                            paddingVertical: tokens.spacing.xs / 2,
                            borderRadius: tokens.radius.full,
                            backgroundColor: selected ? indicatorFill : 'transparent',
                        }, children: item.icon })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                            fontSize: tokens.typography.scale.xs,
                            fontFamily: tokens.typography.fontBody,
                            fontWeight: selected ? '600' : '500',
                            // `primaryText`, not `primary`: the base used the FILL slot as
                            // text, which carries no contrast promise on a surface.
                            color: selected ? colors.primaryText : colors.mutedText,
                        }, children: item.label })] }, item.key));
        }) }));
}
//# sourceMappingURL=BottomNavV4.js.map