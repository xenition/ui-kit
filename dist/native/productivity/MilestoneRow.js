"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MilestoneRow = MilestoneRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const appearance_1 = require("../primitives/internal/appearance");
const DueDatePill_1 = require("./DueDatePill");
/**
 * A milestone line: a status marker (filled **success** when reached), the title,
 * an optional target {@link DueDatePill}, and an optional {@link Progress} bar.
 * The marker and progress recolor to success once reached. No literal colors.
 */
function MilestoneRow({ title, reached = false, progress, dateLabel, dateTone = 'upcoming', appearance = 'classic', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const pct = typeof progress === 'number' ? Math.max(0, Math.min(100, progress)) : undefined;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            appearance === 'classic' ? null : (0, appearance_1.appearanceStyle)(appearance, colors, tokens),
            {
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.sm,
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
//# sourceMappingURL=MilestoneRow.js.map