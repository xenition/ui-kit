"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MilestoneRowV4 = MilestoneRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const DueDatePill_1 = require("./DueDatePill");
/**
 * MilestoneRow — **V4** "flow" design. The focused-workspace take on a
 * milestone line, laid out on a subtle timeline rail: a status marker
 * (**success** glow when reached, else muted), a legible title, an optional
 * target {@link DueDatePill}, and a **primary** progress hint. Reaching a
 * milestone settles the row into a soft-success glow. Same props/behavior as
 * {@link MilestoneRowProps}; token-only colors via `useXenitionTheme()`.
 */
function MilestoneRowV4({ title, reached = false, progress, dateLabel, dateTone = 'upcoming', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const pct = typeof progress === 'number' ? Math.max(0, Math.min(100, progress)) : undefined;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: tokens.spacing.md,
                padding: tokens.spacing.sm,
                borderRadius: tokens.radius.lg,
                backgroundColor: reached ? (0, color_1.withAlpha)(colors.success, 0.08) : colors.surface,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: reached ? 'Milestone reached' : 'Milestone pending', style: {
                    width: 16,
                    height: 16,
                    marginTop: 2,
                    borderRadius: tokens.radius.full,
                    borderWidth: 2,
                    borderColor: reached ? colors.success : colors.border,
                    backgroundColor: reached ? colors.success : colors.surface,
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: reached ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSuccess, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: "\u2713" })) : null }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: tokens.spacing.sm,
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                    flex: 1,
                                    color: reached ? colors.muted : colors.onSurface,
                                    fontSize: tokens.typography.scale.sm,
                                    fontWeight: '600',
                                }, children: title }), dateLabel ? (0, jsx_runtime_1.jsx)(DueDatePill_1.DueDatePill, { label: dateLabel, tone: dateTone }) : null] }), pct != null ? (0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: pct, tone: reached ? 'success' : 'primary', size: "sm" }) : null] })] }));
}
//# sourceMappingURL=MilestoneRowV4.js.map