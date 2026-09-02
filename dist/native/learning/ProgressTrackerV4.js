"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressTrackerV4 = ProgressTrackerV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const primitives_1 = require("../primitives");
const charts_1 = require("../charts");
/**
 * ProgressTracker — **V4** "campus" design (native twin of the web V4). An
 * elevated rounded card with a soft shadow holding a course-completion summary (a
 * bar or a circular ring) with a big legible **tabular-nums** percentage, and an
 * optional per-step checklist. Guards an empty list with a muted empty state.
 * Reuses the base `variant` (`bar` / `ring`). Token-only colors via
 * `useXenitionTheme()`.
 */
function ProgressTrackerV4({ steps, variant = 'bar', title = 'Your progress', emptyLabel = 'No modules yet', showList = false, style }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const shell = {
        padding: tokens.spacing.lg,
        backgroundColor: colors.card,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: tokens.radius.lg,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    };
    if (steps.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: emptyLabel, style: [shell, style], children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: emptyLabel }) }));
    }
    const done = steps.filter((s) => s.completed).length;
    const pct = Math.round((done / steps.length) * 100);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${title}: ${done} of ${steps.length} complete, ${pct}%`, style: [shell, { gap: tokens.spacing.md }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.lg, fontWeight: '700', fontVariant: ['tabular-nums'] }, children: [pct, "%"] })] }), variant === 'ring' ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { alignItems: 'center' }, children: (0, jsx_runtime_1.jsx)(charts_1.ProgressRing, { value: done, max: steps.length, size: 100, color: "primary" }) })) : ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 4 }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: done, max: steps.length, tone: "primary" }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontVariant: ['tabular-nums'] }, children: [done, " of ", steps.length, " complete (", pct, "%)"] })] })), showList ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: steps.map((step) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: step.completed ? (0, color_1.withAlpha)(colors.success, 0.12) : (0, color_1.withAlpha)(colors.onSurface, 0.06) }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: step.completed ? colors.success : colors.muted, fontSize: tokens.typography.scale.xs }, children: step.completed ? '✓' : '○' }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: step.completed ? colors.onSurface : colors.muted, fontSize: tokens.typography.scale.sm }, children: step.label })] }, step.id))) })) : null] }));
}
//# sourceMappingURL=ProgressTrackerV4.js.map