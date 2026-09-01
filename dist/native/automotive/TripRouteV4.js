"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripRouteV4 = TripRouteV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const state_v4_1 = require("../primitives/internal/state-v4");
const v4_depth_1 = require("../../primitives/internal/v4-depth");
const fleet_v4_1 = require("./internal/fleet-v4");
/** How far the map's ground travels from the card toward the brand. */
const MAP_TINT = 0.06;
/** The connector dot's diameter, as a fraction of a marker's. */
const DOT_RATIO = 0.25;
const clamp01 = (n) => Math.max(0, Math.min(1, Number.isFinite(n) ? n : 0));
/**
 * **V4 trip route** — same props as {@link TripRoute} plus `originGlyph`,
 * `destinationGlyph` and `formatRouteLabel`.
 *
 * ## Four changes
 *
 * 1. **The markers use their *paired* ink.** This is the defect that put
 *    `onPair()` in `tone-v4`: the base filled each marker `colors[tone]` and
 *    inked its glyph `colors.onPrimary` regardless, so a `success` origin
 *    marker was a green disc wearing the brand's ink and whether it was
 *    readable depended on the seed. Both sides are `string`, so no type could
 *    catch it.
 * 2. **The marker's size comes off the spacing scale.** `width: 24,
 *    height: 24, marginLeft: -12, marginTop: -12` was four literals that had
 *    to stay in sync and did not scale with the seed; the offset is now
 *    derived from the diameter.
 * 3. **The map has one accessible name** naming both endpoints, rather than
 *    being a decorative box with two unlabelled discs in it.
 * 4. **The ground is a mixed tint**, not a flat neutral, so it reads as a
 *    surface behind the route in both schemes.
 */
function TripRouteV4({ origin, destination, waypoints = [], distance, duration, height = 180, originGlyph = 'A', destinationGlyph = 'B', formatRouteLabel, onPress, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const marker = tokens.spacing.lg * fleet_v4_1.MARKER_STEP;
    const dot = marker * DOT_RATIO;
    const oAt = origin.at ?? { x: 0.2, y: 0.75 };
    const dAt = destination.at ?? { x: 0.8, y: 0.25 };
    const ox = clamp01(oAt.x);
    const oy = clamp01(oAt.y);
    const dx = clamp01(dAt.x);
    const dy = clamp01(dAt.y);
    const dots = Array.from({ length: fleet_v4_1.ROUTE_DOTS }, (_, i) => {
        const t = (i + 1) / (fleet_v4_1.ROUTE_DOTS + 1);
        return { x: ox + (dx - ox) * t, y: oy + (dy - oy) * t };
    });
    const pin = (x, y, glyph, tone, testID) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, style: {
            position: 'absolute',
            left: `${x * 100}%`,
            top: `${y * 100}%`,
            // The offset is half the diameter, derived — not a second literal.
            marginLeft: -marker / 2,
            marginTop: -marker / 2,
            width: marker,
            height: marker,
            borderRadius: tokens.radius.full,
            backgroundColor: (0, fleet_v4_1.toneFill)(theme, tone),
            borderWidth: 2,
            borderColor: colors.card,
            alignItems: 'center',
            justifyContent: 'center',
        }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "bold", style: { color: (0, fleet_v4_1.onPair)(theme, tone) }, children: glyph }) }, testID));
    const label = (formatRouteLabel ?? ((a, b) => `Route from ${a} to ${b}`))(origin.label, destination.label);
    const caption = (0, fleet_v4_1.metaLine)([distance, duration]);
    const map = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: "xen-trip-route", style: {
            height,
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: (0, v4_depth_1.mixToken)(colors.card, colors.primary, MAP_TINT),
            overflow: 'hidden',
        }, children: [dots.map((d, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    position: 'absolute',
                    left: `${d.x * 100}%`,
                    top: `${d.y * 100}%`,
                    marginLeft: -dot / 2,
                    marginTop: -dot / 2,
                    width: dot,
                    height: dot,
                    borderRadius: tokens.radius.full,
                    backgroundColor: colors.primary,
                } }, `dot-${i}`))), waypoints.map((w, i) => w.at
                ? pin(clamp01(w.at.x), clamp01(w.at.y), String(i + 1), 'accent', `xen-route-waypoint-${i}`)
                : null), pin(ox, oy, originGlyph, 'success', 'xen-route-origin'), pin(dx, dy, destinationGlyph, 'primary', 'xen-route-destination')] }));
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: [map, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "onSurface", numberOfLines: 1, children: origin.label }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "onSurface", numberOfLines: 1, children: destination.label }), caption ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", children: caption })) : null] })] }));
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: (0, fleet_v4_1.metaLine)([label, caption]), style: style, children: body }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: (0, fleet_v4_1.metaLine)([label, caption]), onPress: onPress, style: ({ pressed }) => [
            {
                borderRadius: tokens.radius.lg,
                backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard) : 'transparent',
            },
            style,
        ], children: body }));
}
//# sourceMappingURL=TripRouteV4.js.map