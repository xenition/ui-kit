"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RideStatusBarV2 = RideStatusBarV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const elevation_1 = require("../primitives/internal/elevation");
/** Canonical stage order + glyph + human label. */
const STAGES = [
    { key: 'requested', label: 'Requested', glyph: '🔍' },
    { key: 'arriving', label: 'Arriving', glyph: '🚗' },
    { key: 'in-trip', label: 'In trip', glyph: '🧭' },
    { key: 'completed', label: 'Completed', glyph: '🏁' },
];
function RideStatusBarV2({ stage, detail, cancelled = false, style }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const activeIndex = Math.max(0, STAGES.findIndex((s) => s.key === stage));
    const surface = {
        borderRadius: tokens.radius.lg,
        backgroundColor: colors.surface,
        padding: tokens.spacing.lg,
        gap: tokens.spacing.md,
        ...(0, elevation_1.shadow)('md', tokens),
    };
    if (cancelled) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: "Ride cancelled", style: [
                surface,
                {
                    gap: tokens.spacing.sm,
                    backgroundColor: (0, color_1.withAlpha)(colors.danger, 0.1),
                },
                style,
            ], children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 40,
                            height: 40,
                            borderRadius: tokens.radius.full,
                            backgroundColor: (0, color_1.withAlpha)(colors.danger, 0.18),
                            alignItems: 'center',
                            justifyContent: 'center',
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.lg, color: colors.danger, fontWeight: '800' }, children: "\u2715" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.danger, fontSize: tokens.typography.scale.base, fontWeight: '800' }, children: "Cancelled" }), detail ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: detail }) : null] })] }) }));
    }
    const current = STAGES[activeIndex] ?? STAGES[0];
    const pct = ((activeIndex + 1) / STAGES.length) * 100;
    const a11y = `Ride status: ${current.label}, step ${activeIndex + 1} of ${STAGES.length}${detail ? `, ${detail}` : ''}`;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: a11y, style: [surface, style], children: [(0, jsx_runtime_1.jsx)(primitives_2.Progress, { value: pct, tone: "primary", size: "md" }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: STAGES.map((s, i) => {
                    const done = i < activeIndex;
                    const active = i === activeIndex;
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    width: 40,
                                    height: 40,
                                    borderRadius: tokens.radius.full,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: done ? colors.primary : active ? (0, color_1.withAlpha)(colors.primary, 0.16) : (0, color_1.withAlpha)(colors.muted, 0.14),
                                    borderWidth: active ? 2 : 0,
                                    borderColor: colors.primary,
                                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.base, color: done ? colors.onPrimary : colors.onSurface, fontWeight: '800' }, children: done ? '✓' : s.glyph }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                                    fontSize: tokens.typography.scale.xs,
                                    fontWeight: active ? '800' : '500',
                                    color: active ? colors.onSurface : colors.muted,
                                }, children: s.label })] }, s.key));
                }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.sm,
                    backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1),
                    borderRadius: tokens.radius.md,
                    paddingVertical: tokens.spacing.sm,
                    paddingHorizontal: tokens.spacing.md,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 36,
                            height: 36,
                            borderRadius: tokens.radius.full,
                            backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.18),
                            alignItems: 'center',
                            justifyContent: 'center',
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.lg }, children: current.glyph }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '800' }, children: current.label }), detail ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: detail }) : null] })] })] }));
}
//# sourceMappingURL=RideStatusBarV2.js.map