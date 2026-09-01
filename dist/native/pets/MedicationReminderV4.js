"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicationReminderV4 = MedicationReminderV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const FORM_GLYPH = {
    pill: '💊',
    liquid: '🧪',
    injection: '💉',
    topical: '🧴',
    drops: '💧',
    chew: '🦴',
};
const STATE_META = {
    due: { label: 'Due now', tone: 'warn' },
    upcoming: { label: 'Upcoming', tone: 'primary' },
    taken: { label: 'Taken', tone: 'success' },
    missed: { label: 'Missed', tone: 'danger' },
};
/**
 * MedicationReminder — **V4** "companion" design. The warm, friendly take on a
 * dose reminder: an elevated rounded card with a soft shadow, the form glyph in a
 * soft-primary tinted well, a bold title with muted dose/frequency meta, a
 * labelled state Badge, the next-dose time and doses-left rendered as small
 * soft-primary chips, and a rounded "Mark taken" CTA. Same props/behavior as
 * {@link MedicationReminderProps}; every `form` and `state` reads via a glyph +
 * labelled Badge/chip (never color alone). Token-only colors via
 * `useXenitionTheme()`. The `onMarkTaken` action is a tappable control with a
 * ≥44px tap target. Web/native parity.
 */
function MedicationReminderV4({ name, dosage, form = 'pill', frequency, nextDose, state, dosesLeft, markLabel = 'Mark taken', onMarkTaken, style, variant = 'card', }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const stateMeta = STATE_META[state];
    const showMark = onMarkTaken != null && state !== 'taken';
    const title = [name, dosage].filter(Boolean).join(' · ');
    if (variant === 'compact') {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${title}, ${stateMeta.label}${nextDose ? `, next dose ${nextDose}` : ''}`, style: [
                {
                    minHeight: 44,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.sm,
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                    borderWidth: 1,
                    borderRadius: tokens.radius.lg,
                    padding: tokens.spacing.sm,
                    shadowColor: colors.onSurface,
                    shadowOpacity: 0.08,
                    shadowRadius: 12,
                    shadowOffset: { width: 0, height: 6 },
                    elevation: 3,
                },
                style,
            ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: 36,
                        height: 36,
                        borderRadius: tokens.radius.full,
                        backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1),
                        alignItems: 'center',
                        justifyContent: 'center',
                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.lg }, children: FORM_GLYPH[form] }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: name }), dosage ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flexShrink: 1, color: colors.muted, fontSize: tokens.typography.scale.xs }, children: dosage })) : null] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: stateMeta.tone, variant: "soft", size: "sm", children: stateMeta.label }), showMark ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${markLabel}: ${name}`, onPress: onMarkTaken, style: ({ pressed }) => ({
                        width: 44,
                        height: 44,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: tokens.radius.md,
                        borderWidth: 1,
                        borderColor: colors.primary,
                        backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1),
                        opacity: pressed ? 0.7 : 1,
                    }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: "\u2713" }) })) : null] }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${title}, ${stateMeta.label}${nextDose ? `, next dose ${nextDose}` : ''}`, style: [
            {
                backgroundColor: colors.card,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.lg,
                gap: tokens.spacing.sm,
                shadowColor: colors.onSurface,
                shadowOpacity: 0.08,
                shadowRadius: 12,
                shadowOffset: { width: 0, height: 6 },
                elevation: 3,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 44,
                            height: 44,
                            borderRadius: tokens.radius.full,
                            backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1),
                            alignItems: 'center',
                            justifyContent: 'center',
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xl }, children: FORM_GLYPH[form] }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title }), frequency ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: frequency })) : null] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: stateMeta.tone, variant: "soft", size: "sm", children: stateMeta.label })] }), nextDose || dosesLeft != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: tokens.spacing.sm }, children: [nextDose ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1), borderRadius: tokens.radius.full, paddingHorizontal: tokens.spacing.sm, paddingVertical: 2 }, children: (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: ["\u23F0 ", nextDose] }) })) : null, dosesLeft != null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1), borderRadius: tokens.radius.full, paddingHorizontal: tokens.spacing.sm, paddingVertical: 2 }, children: (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: [dosesLeft, " dose", dosesLeft === 1 ? '' : 's', " left"] }) })) : null] })) : null, showMark ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${markLabel}: ${name}`, onPress: onMarkTaken, style: ({ pressed }) => ({
                    alignSelf: 'flex-start',
                    minHeight: 44,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.xs,
                    borderRadius: tokens.radius.md,
                    borderWidth: 1,
                    borderColor: colors.primary,
                    backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1),
                    paddingVertical: tokens.spacing.xs,
                    paddingHorizontal: tokens.spacing.md,
                    opacity: pressed ? 0.7 : 1,
                }), children: (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: ["\u2713 ", markLabel] }) })) : null] }));
}
//# sourceMappingURL=MedicationReminderV4.js.map