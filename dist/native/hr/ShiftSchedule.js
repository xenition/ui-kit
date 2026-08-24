"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShiftSchedule = ShiftSchedule;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * A shift roster for a day (or period): a header date and a list of shift rows,
 * each showing time range, role / location, assignee, and a scheduling-status
 * pill (open → warn, confirmed → success — glyph + word, never color alone).
 * Open (unassigned) shifts are tinted and labelled. Renders a token-styled
 * empty state when there are no shifts. All colors are theme tokens — no
 * literals.
 */
function ShiftSchedule({ shifts, dateLabel, variant = 'default', onSelectShift, emptyLabel = 'No shifts scheduled', testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const compact = variant === 'compact';
    if (shifts.length === 0) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: testID, style: style, children: [dateLabel ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700', marginBottom: tokens.spacing.sm }, children: dateLabel })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: emptyLabel, children: (0, jsx_runtime_1.jsx)(primitives_1.EmptyState, { title: emptyLabel, description: "Shifts you add will appear here." }) })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { variant: "outlined", padding: compact ? 'sm' : 'md', style: [{ gap: tokens.spacing.sm }, style], testID: testID, children: [dateLabel ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: dateLabel })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: shifts.map((shift) => {
                    const meta = internal_1.SHIFT_STATUS_META[shift.status ?? (shift.assignee ? 'scheduled' : 'open')];
                    const isOpen = !shift.assignee;
                    const row = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.sm,
                            paddingVertical: tokens.spacing.xs,
                            paddingHorizontal: tokens.spacing.sm,
                            borderRadius: tokens.radius.md,
                            backgroundColor: isOpen ? (0, color_1.withAlpha)((0, internal_1.toneColor)(colors, meta.tone), 0.08) : 'transparent',
                        }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { width: 96 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: [shift.start, "\u2013", shift.end] }), shift.role ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: shift.role })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: isOpen ? colors.muted : colors.onSurface, fontSize: tokens.typography.scale.sm }, children: shift.assignee ?? 'Unassigned' }), !compact && shift.location ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: shift.location })) : null] }), (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: meta, size: "sm" })] }));
                    return onSelectShift ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Shift ${shift.start} to ${shift.end}, ${meta.label}`, onPress: () => onSelectShift(shift), children: row }, shift.id)) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { children: row }, shift.id));
                }) })] }));
}
//# sourceMappingURL=ShiftSchedule.js.map