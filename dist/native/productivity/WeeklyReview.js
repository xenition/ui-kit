"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeeklyReview = WeeklyReview;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const GradientSurface_1 = require("./internal/GradientSurface");
const flow_1 = require("./internal/flow");
/**
 * WeeklyReview — the weekly stats / streak hero for the productivity V4 "flow"
 * line. A brand-gradient panel that closes the week: a big near-white
 * **completed** numeral, a 7-bar mini chart of per-day completions (bars in
 * near-white opacity steps), a streak flame tile, an optional focus-hours tile,
 * and an optional "Share" CTA. Presentational — shaped data + a callback, nothing
 * fetches. Every color derives from the brand ramp via `GradientSurface` +
 * `flow*(tokens.ramps)` (bar steps via `withAlpha` on the near-white ink) — no
 * literals, light + dark.
 */
function WeeklyReview({ completed, streakDays, perDay, focusHours, onShare, style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    const r = tokens.ramps;
    const ink = (0, flow_1.flowInk)(r);
    const inkSoft = (0, flow_1.flowInkSoft)(r);
    const tile = (0, flow_1.flowTile)(r);
    const border = (0, flow_1.flowBorder)(r);
    const total = Math.max(0, Math.trunc(completed || 0));
    const bars = perDay ?? [];
    const max = bars.reduce((m, d) => Math.max(m, d.count), 0);
    const Tile = ({ glyph, label, value }) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flex: 1,
            minWidth: 0,
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.sm,
            borderRadius: tokens.radius.md,
            backgroundColor: tile,
            borderWidth: 1,
            borderColor: border,
            paddingHorizontal: tokens.spacing.md,
            paddingVertical: tokens.spacing.sm,
        }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: glyph, size: "lg" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: ink, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: value }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: label })] })] }));
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ borderRadius: tokens.radius.lg }, style], children: (0, jsx_runtime_1.jsxs)(GradientSurface_1.GradientSurface, { colors: (0, flow_1.flowGradient)(r), style: { borderRadius: tokens.radius.lg, padding: tokens.spacing.lg, overflow: 'hidden', gap: tokens.spacing.lg }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: "This week" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityLabel: `${total} ${total === 1 ? 'task' : 'tasks'} completed this week`, allowFontScaling: false, style: { color: ink, fontSize: tokens.typography.scale['3xl'] * 1.15, fontWeight: '800', letterSpacing: -1 }, children: total }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: total === 1 ? 'task completed' : 'tasks completed' })] }), onShare ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Share weekly review", onPress: onShare, style: ({ pressed }) => ({
                                width: 44,
                                height: 44,
                                borderRadius: tokens.radius.full,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: tile,
                                borderWidth: 1,
                                borderColor: border,
                                opacity: pressed ? 0.85 : 1,
                            }), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2197", size: "lg" }) })) : null] }), bars.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: `Completed per day: ${bars.map((d) => `${d.label} ${d.count}`).join(', ')}`, style: { flexDirection: 'row', alignItems: 'flex-end', gap: tokens.spacing.sm, height: 96 }, children: bars.map((d, i) => {
                        const ratio = max > 0 ? d.count / max : 0;
                        // Near-white opacity steps: taller bars read brighter.
                        const step = ratio >= 0.75 ? 0.9 : ratio >= 0.5 ? 0.7 : ratio >= 0.25 ? 0.5 : 0.3;
                        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, width: '100%', justifyContent: 'flex-end' }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                            width: '100%',
                                            height: `${Math.max(6, ratio * 100)}%`,
                                            borderRadius: tokens.radius.sm,
                                            backgroundColor: (0, color_1.withAlpha)(ink, step),
                                        } }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: d.label })] }, `${d.label}-${i}`));
                    }) })) : null, streakDays != null || focusHours ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [streakDays != null ? ((0, jsx_runtime_1.jsx)(Tile, { glyph: "\uD83D\uDD25", label: "Day streak", value: String(Math.max(0, Math.trunc(streakDays))) })) : null, focusHours ? (0, jsx_runtime_1.jsx)(Tile, { glyph: "\u23F1\uFE0F", label: "Focus time", value: focusHours }) : null] })) : null] }) }));
}
//# sourceMappingURL=WeeklyReview.js.map