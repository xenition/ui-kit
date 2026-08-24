"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripRoute = TripRoute;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const clamp01 = (n) => (Number.isFinite(n) ? (n < 0 ? 0 : n > 1 ? 1 : n) : 0.5);
/** Inlined absolute-fill (avoids a StyleSheet import for one rule). */
const ABSOLUTE_FILL = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 };
/**
 * A trip's origin→destination route rendered as a STATIC, dependency-free styled
 * placeholder — NOT a live map. It draws a token-tinted frame with faux grid
 * tiles, a dashed connecting line, and labelled A/B (plus numbered waypoint)
 * markers; there is intentionally no `react-native-maps`/`MapView` import, so it
 * renders in any environment. Endpoints are text-labelled, not color-coded
 * alone. Colors come from semantic tokens and `withAlpha` tints — no literal
 * colors. Wire a real map behind `onPress` when needed.
 */
function TripRoute({ origin, destination, waypoints = [], distance, duration, height = 180, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const oAt = origin.at ?? { x: 0.2, y: 0.75 };
    const dAt = destination.at ?? { x: 0.8, y: 0.25 };
    const ox = clamp01(oAt.x);
    const oy = clamp01(oAt.y);
    const dx = clamp01(dAt.x);
    const dy = clamp01(dAt.y);
    // Dashed connector as a run of small dots between origin and destination.
    const DOTS = 7;
    const dots = Array.from({ length: DOTS }, (_, i) => {
        const t = (i + 1) / (DOTS + 1);
        return { x: ox + (dx - ox) * t, y: oy + (dy - oy) * t };
    });
    const marker = (x, y, glyph, tone, testID) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, style: {
            position: 'absolute',
            left: `${x * 100}%`,
            top: `${y * 100}%`,
            marginLeft: -12,
            marginTop: -12,
            width: 24,
            height: 24,
            borderRadius: tokens.radius.full,
            backgroundColor: colors[tone],
            borderWidth: 2,
            borderColor: colors.surface,
            alignItems: 'center',
            justifyContent: 'center',
        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onPrimary, fontSize: tokens.typography.scale.xs, fontWeight: '800' }, children: glyph }) }, `${glyph}-${testID ?? ''}`));
    const frame = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: "xen-trip-route", style: [
            {
                height,
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.08),
                overflow: 'hidden',
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: { ...ABSOLUTE_FILL }, children: [[0.25, 0.5, 0.75].map((f) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', left: 0, right: 0, top: `${f * 100}%`, height: 1, backgroundColor: (0, color_1.withAlpha)(colors.border, 0.7) } }, `h-${f}`))), [0.25, 0.5, 0.75].map((f) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', top: 0, bottom: 0, left: `${f * 100}%`, width: 1, backgroundColor: (0, color_1.withAlpha)(colors.border, 0.7) } }, `v-${f}`)))] }), dots.map((p, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: {
                    position: 'absolute',
                    left: `${p.x * 100}%`,
                    top: `${p.y * 100}%`,
                    marginLeft: -3,
                    marginTop: -3,
                    width: 6,
                    height: 6,
                    borderRadius: tokens.radius.full,
                    backgroundColor: colors.primary,
                } }, `dot-${i}`))), waypoints.map((w, i) => {
                const wx = clamp01(w.at?.x ?? 0.5);
                const wy = clamp01(w.at?.y ?? 0.5);
                return marker(wx, wy, String(i + 1), 'accent', `xen-trip-waypoint-${i}`);
            }), marker(ox, oy, 'A', 'primary', 'xen-trip-origin'), marker(dx, dy, 'B', 'success', 'xen-trip-destination'), distance || duration ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    position: 'absolute',
                    top: tokens.spacing.sm,
                    right: tokens.spacing.sm,
                    flexDirection: 'row',
                    gap: tokens.spacing.sm,
                    backgroundColor: colors.surface,
                    borderWidth: 1,
                    borderColor: colors.border,
                    borderRadius: tokens.radius.sm,
                    paddingVertical: tokens.spacing.xs,
                    paddingHorizontal: tokens.spacing.sm,
                }, children: [distance ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: distance })) : null, duration ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: duration })) : null] })) : null] }));
    const legend = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.md, marginTop: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: ["A \u00B7 ", origin.label] }), origin.address ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: origin.address })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: ["B \u00B7 ", destination.label] }), destination.address ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: destination.address })) : null] })] }));
    const a11y = `Route from ${origin.label}${origin.address ? ` ${origin.address}` : ''} to ${destination.label}${destination.address ? ` ${destination.address}` : ''}${distance ? `, ${distance}` : ''}${duration ? `, ${duration}` : ''}`;
    const content = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [frame, legend] }));
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityRole: "image", accessibilityLabel: a11y, children: content }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Open map. ${a11y}`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.92 : 1 }), children: content }));
}
//# sourceMappingURL=TripRoute.js.map