"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SegmentedV4 = SegmentedV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const v4_depth_1 = require("../../primitives/internal/v4-depth");
const nav_v4_1 = require("./internal/nav-v4");
const surface_v4_1 = require("./internal/surface-v4");
const state_v4_1 = require("./internal/state-v4");
/**
 * **V4 segmented control** — same props as {@link Segmented}, a different
 * design line.
 *
 * ## One thumb, and it travels
 *
 * The base control repainted a background on whichever segment was selected:
 * the fill blinked out here and in there, two events for one change. V4 has a
 * single thumb that **slides** — §36.5, continuity of position, and the reason
 * this control feels like a physical switch rather than a row of buttons that
 * happen to share a box. `useMovingIndicator` measures the row and drives it;
 * Reduce Motion snaps it into place instead (§36.10), and it stays hidden
 * until it has a real position so the first paint never shows it flying in
 * from the left edge.
 *
 * ## Why this one is allowed to be a pill
 *
 * `design.md` §8 lists "excessive pill-shaped controls" among the tells of
 * generic AI UI. A segmented control is the exception the word *excessive* is
 * there for: the capsule is not decoration applied to a control, it IS the
 * control — the shape is how a user recognises "pick exactly one of these"
 * before reading a single label (§32). It still defers to the seed: `radius.full`
 * is 0 on a `sharp` brand, so a sharp app gets a sharp switch rather than the
 * capsule being smuggled in over the top of a design decision.
 *
 * ## Depth
 *
 * The thumb is `surface` over a rail mixed from `border`, carrying
 * `elevation.card` — the smallest of the three, because it has lifted by
 * exactly the height of a thumb. There is no hairline on it: a raised card
 * keeps its border because a shadow alone dissolves on a same-colour page, and
 * a thumb never has that problem, because the rail underneath is a different
 * colour by construction. A `depth: 'flat'` seed zeroes the shadow with no
 * branch in this file, and the rail-against-thumb contrast still carries the
 * state.
 *
 * ## Reach
 *
 * Each segment is a full 44pt target composed from the spacing scale. The base
 * control was `spacing.xs` of padding around a 14pt label — around 22pt, half
 * a target, on the control people tap most often per screen.
 */
function SegmentedV4({ options, value, onChange, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens, elevation } = theme;
    const activeIndex = options.findIndex((o) => o.value === value);
    const indicator = (0, nav_v4_1.useMovingIndicator)(activeIndex);
    const pad = tokens.spacing.xs;
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "tablist", style: [
            {
                alignSelf: 'flex-start',
                backgroundColor: (0, v4_depth_1.mixToken)(colors.surface, colors.border, nav_v4_1.RAIL_MIX),
                borderRadius: tokens.radius.full,
                padding: pad,
            },
            style,
        ], children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', position: 'relative' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Animated.View
                // Decorative: each segment already announces its own selected state,
                // and saying it twice is noise in a screen reader.
                , { 
                    // Decorative: each segment already announces its own selected state,
                    // and saying it twice is noise in a screen reader.
                    accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", pointerEvents: "none", style: [
                        {
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            left: indicator.left,
                            width: indicator.width,
                            backgroundColor: colors.surface,
                            borderRadius: tokens.radius.full,
                            opacity: indicator.measured && activeIndex >= 0 ? 1 : 0,
                        },
                        (0, surface_v4_1.elevationStyle)(elevation.card),
                    ] }), options.map((option, index) => {
                    const active = option.value === value;
                    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "tab", accessibilityState: { selected: active }, onLayout: indicator.onItemLayout(index), onPress: () => onChange(option.value), style: ({ pressed }) => ({
                            minHeight: (0, nav_v4_1.minTap)(tokens.spacing),
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingHorizontal: tokens.spacing.lg,
                            borderRadius: tokens.radius.full,
                            // Nothing at rest: the travelling thumb is the whole
                            // selected state, and a second fill under it would read as
                            // two selections. A press adds M3's layer and takes it away
                            // again.
                            backgroundColor: pressed ? (0, state_v4_1.pressLayer)(theme) : undefined,
                        }), children: typeof option.label === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                                // `onSurface` on the thumb, `muted` on the rail — the same
                                // pair the thumb's own fill is guaranteed against.
                                color: active ? colors.onSurface : colors.mutedText,
                                fontSize: tokens.typography.scale.sm,
                                fontFamily: tokens.typography.fontBody,
                                fontWeight: active ? '600' : '500',
                            }, children: option.label })) : (option.label) }, option.value));
                })] }) }));
}
//# sourceMappingURL=SegmentedV4.js.map