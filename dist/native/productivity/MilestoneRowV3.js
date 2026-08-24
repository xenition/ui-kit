"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MilestoneRowV3 = MilestoneRowV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const DueDatePill_1 = require("./DueDatePill");
/**
 * MilestoneRow, redesigned (v3): a **dense milestone line**. A reached ✓ (or flag),
 * the title with a thin progress bar, and the target-date pill on the right — a
 * hairline row for a roadmap list. The opposite of v2's card. Same props,
 * token-only.
 */
function MilestoneRowV3({ title, reached = false, progress, dateLabel, dateTone, appearance, style }) {
    void appearance;
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const pct = typeof progress === 'number' ? Math.max(0, Math.min(100, progress)) : reached ? 100 : 0;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.sm,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: reached ? colors.successText : colors.muted }, children: reached ? '✓' : '🏁' }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                            color: reached ? colors.muted : colors.onSurface,
                            fontSize: tokens.typography.scale.sm,
                            textDecorationLine: reached ? 'line-through' : 'none',
                        }, children: title }), (0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: pct, tone: reached ? 'success' : 'primary', size: "sm" })] }), dateLabel ? (0, jsx_runtime_1.jsx)(DueDatePill_1.DueDatePill, { label: dateLabel, tone: dateTone }) : null] }));
}
//# sourceMappingURL=MilestoneRowV3.js.map