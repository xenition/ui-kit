"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicationReminder = MedicationReminder;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const FORM_GLYPH = {
    pill: '💊',
    liquid: '🧪',
    injection: '💉',
    topical: '🧴',
    drops: '💧',
    chew: '🦴',
};
const STATE_META = {
    due: { label: 'Due now', tone: 'warn', slot: 'warn' },
    upcoming: { label: 'Upcoming', tone: 'primary', slot: 'primary' },
    taken: { label: 'Taken', tone: 'success', slot: 'success' },
    missed: { label: 'Missed', tone: 'danger', slot: 'danger' },
};
/**
 * A medication dose reminder: form icon, name + dosage, frequency, the next-dose
 * time, and a state chip. Actionable states (`due`/`upcoming`/`missed`) expose a
 * tappable "Mark taken" control. State reads via a labelled chip + left accent
 * (never color alone). Token-only colors.
 */
function MedicationReminder({ name, dosage, form = 'pill', frequency, nextDose, state, dosesLeft, markLabel = 'Mark taken', onMarkTaken, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const stateMeta = STATE_META[state];
    const showMark = onMarkTaken != null && state !== 'taken';
    const title = [name, dosage].filter(Boolean).join(' · ');
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${title}, ${stateMeta.label}${nextDose ? `, next dose ${nextDose}` : ''}`, style: [
            {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderLeftColor: colors[stateMeta.slot],
                borderWidth: 1,
                borderLeftWidth: 4,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.md,
                gap: tokens.spacing.sm,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xl }, children: FORM_GLYPH[form] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title }), frequency ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: frequency })) : null] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: stateMeta.tone, variant: "soft", size: "sm", children: stateMeta.label })] }), nextDose || dosesLeft != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, children: [nextDose ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: ["\u23F0 ", nextDose] })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, {})), dosesLeft != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [dosesLeft, " dose", dosesLeft === 1 ? '' : 's', " left"] })) : null] })) : null, showMark ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${markLabel}: ${name}`, onPress: onMarkTaken, style: ({ pressed }) => ({
                    alignSelf: 'flex-start',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.xs,
                    borderRadius: tokens.radius.md,
                    borderWidth: 1,
                    borderColor: colors[stateMeta.slot],
                    paddingVertical: tokens.spacing.xs,
                    paddingHorizontal: tokens.spacing.md,
                    opacity: pressed ? 0.7 : 1,
                }), children: (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors[stateMeta.slot], fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: ["\u2713 ", markLabel] }) })) : null] }));
}
//# sourceMappingURL=MedicationReminder.js.map