"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressTracker = ProgressTracker;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const charts_1 = require("../charts");
/**
 * Course-completion tracker: a percentage summary (bar or ring) over a set of
 * steps, with an optional per-step checklist. Completion is counted from each
 * `step.completed` flag and guarded against an empty list, which renders a muted
 * empty state instead. Token-only colors.
 */
function ProgressTracker({ steps, variant = 'bar', title = 'Your progress', emptyLabel = 'No modules yet', showList = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (steps.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: emptyLabel, style: [
                {
                    padding: tokens.spacing.lg,
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                    borderWidth: 1,
                    borderRadius: tokens.radius.lg,
                },
                style,
            ], children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: emptyLabel }) }));
    }
    const done = steps.filter((s) => s.completed).length;
    const pct = Math.round((done / steps.length) * 100);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${title}: ${done} of ${steps.length} complete, ${pct}%`, style: [
            {
                gap: tokens.spacing.md,
                padding: tokens.spacing.lg,
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title }), variant === 'ring' ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { alignItems: 'center' }, children: (0, jsx_runtime_1.jsx)(charts_1.ProgressRing, { value: done, max: steps.length, size: 100, color: "primary" }) })) : ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 4 }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: done, max: steps.length, tone: "primary" }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [done, " of ", steps.length, " complete (", pct, "%)"] })] })), showList ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: steps.map((step) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: step.completed ? colors.success : colors.muted, fontSize: tokens.typography.scale.sm }, children: step.completed ? '✓' : '○' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                                flex: 1,
                                color: step.completed ? colors.onSurface : colors.muted,
                                fontSize: tokens.typography.scale.sm,
                            }, children: step.label })] }, step.id))) })) : null] }));
}
//# sourceMappingURL=ProgressTracker.js.map