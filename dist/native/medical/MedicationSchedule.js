"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicationSchedule = MedicationSchedule;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * A daily medication schedule: a timeline of doses each with its time, drug,
 * dose text, and a taken checkbox. A missed/overdue dose is flagged with a
 * glyph + label + warn color (never color alone). Renders loading and empty
 * states. Informational UI only — not a medical device. Token-only colors.
 */
function MedicationSchedule({ doses, title, onToggleTaken, loading = false, emptyLabel = 'No medications scheduled', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const shell = (children) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.sm }, style], children: [title ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: title })) : null, children] }));
    if (loading) {
        return shell((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: "Loading schedule", style: { gap: tokens.spacing.sm }, children: [0, 1, 2].map((i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 52, borderRadius: tokens.radius.md, backgroundColor: tokens.ramps.neutral[100] } }, i))) }));
    }
    if (doses.length === 0) {
        return shell((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: emptyLabel }));
    }
    return shell((0, jsx_runtime_1.jsx)(react_native_1.View, { children: doses.map((d) => {
            const taken = d.taken ?? false;
            const missed = !taken && (d.missed ?? false);
            const a11y = `${d.time}, ${d.name}${d.dose ? ` ${d.dose}` : ''}, ${taken ? 'taken' : missed ? 'missed' : 'not taken'}`;
            return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "checkbox", accessibilityState: { checked: taken }, accessibilityLabel: a11y, onPress: onToggleTaken ? () => onToggleTaken(d.id, !taken) : undefined, style: ({ pressed }) => ({
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.md,
                    paddingVertical: tokens.spacing.sm,
                    paddingHorizontal: tokens.spacing.sm,
                    minHeight: 52,
                    opacity: pressed ? 0.7 : 1,
                }), children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 52, alignItems: 'center' }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: d.time }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: {
                                    color: taken ? colors.muted : colors.onSurface,
                                    fontSize: tokens.typography.scale.base,
                                    fontWeight: '600',
                                    textDecorationLine: taken ? 'line-through' : 'none',
                                }, children: [d.name, d.dose ? (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontWeight: '500' }, children: ["  ", d.dose] }) : null] }), missed ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: colors.warn, fontSize: tokens.typography.scale.xs }, children: "\u26A0" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.warn, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: "Missed" })] })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 26,
                            height: 26,
                            borderRadius: tokens.radius.full,
                            borderWidth: 2,
                            borderColor: taken ? colors.success : colors.border,
                            backgroundColor: taken ? colors.success : colors.surface,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }, children: taken ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: colors.onSuccess, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: "\u2713" })) : null })] }, d.id));
        }) }));
}
//# sourceMappingURL=MedicationSchedule.js.map