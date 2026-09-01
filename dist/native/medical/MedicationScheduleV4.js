"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicationScheduleV4 = MedicationScheduleV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const STATUS_META = {
    taken: { glyph: '✓', label: 'Taken', tone: 'success' },
    missed: { glyph: '⚠', label: 'Missed', tone: 'warn' },
    pending: { glyph: '○', label: 'Pending', tone: 'muted' },
};
/**
 * MedicationSchedule — **V4** "clinic" design. The calm, clinical take on a
 * daily schedule: an elevated rounded card with a soft shadow wrapping a
 * timeline of doses. Each dose row shows a big legible time, the drug + dose
 * text, a labelled status marker (glyph + label + token tone, never color
 * alone), and a taken checkbox affordance (≥44px tap target) wired to
 * `onToggleTaken`. A taken dose reads success glyph + "Taken" + a checked
 * control; a missed/overdue dose flags with a warn glyph + "Missed". Renders
 * loading and empty states. Identical props/behavior to
 * {@link MedicationScheduleProps}. Token-only colors via `useXenitionTheme()`.
 * Informational UI only — not a medical device.
 */
function MedicationScheduleV4({ doses, title, onToggleTaken, loading = false, emptyLabel = 'No medications scheduled', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const shell = {
        backgroundColor: colors.card,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.md,
        gap: tokens.spacing.sm,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    };
    const wrap = (children) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [shell, style], children: [title ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: title })) : null, children] }));
    if (loading) {
        return wrap((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: "Loading schedule", style: { gap: tokens.spacing.sm }, children: [0, 1, 2].map((i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 52, borderRadius: tokens.radius.md, backgroundColor: tokens.ramps.neutral[100] } }, i))) }));
    }
    if (doses.length === 0) {
        return wrap((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: emptyLabel }));
    }
    return wrap((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: doses.map((d) => {
            const taken = d.taken ?? false;
            const missed = !taken && (d.missed ?? false);
            const status = taken ? 'taken' : missed ? 'missed' : 'pending';
            const meta = STATUS_META[status];
            const toneColor = colors[meta.tone];
            const a11y = `${d.time}, ${d.name}${d.dose ? ` ${d.dose}` : ''}, ${meta.label}`;
            return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "checkbox", accessibilityState: { checked: taken }, accessibilityLabel: a11y, onPress: onToggleTaken ? () => onToggleTaken(d.id, !taken) : undefined, style: ({ pressed }) => ({
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.md,
                    paddingVertical: tokens.spacing.sm,
                    paddingHorizontal: tokens.spacing.sm,
                    minHeight: 44,
                    borderRadius: tokens.radius.md,
                    backgroundColor: taken ? (0, color_1.withAlpha)(colors.primary, 0.1) : 'transparent',
                    opacity: pressed ? 0.75 : 1,
                }), children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 52, alignItems: 'center' }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: d.time }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: {
                                    color: taken ? colors.muted : colors.onSurface,
                                    fontSize: tokens.typography.scale.base,
                                    fontWeight: '600',
                                    textDecorationLine: taken ? 'line-through' : 'none',
                                }, children: [d.name, d.dose ? (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontWeight: '500' }, children: ["  ", d.dose] }) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: meta.glyph, size: "xs", style: { color: toneColor } }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: toneColor, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: meta.label })] })] }), (0, jsx_runtime_1.jsx)(primitives_1.Checkbox, { checked: taken, accessibilityLabel: taken ? 'Mark as not taken' : 'Mark as taken', onCheckedChange: onToggleTaken ? (next) => onToggleTaken(d.id, next) : undefined })] }, d.id));
        }) }));
}
//# sourceMappingURL=MedicationScheduleV4.js.map