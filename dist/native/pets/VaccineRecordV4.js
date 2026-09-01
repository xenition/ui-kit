"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VaccineRecordV4 = VaccineRecordV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const STATUS_META = {
    current: { label: 'Up to date', tone: 'success', glyph: '✓' },
    'due-soon': { label: 'Due soon', tone: 'warn', glyph: '⏳' },
    overdue: { label: 'Overdue', tone: 'danger', glyph: '⚠' },
    unknown: { label: 'No record', tone: 'neutral', glyph: '?' },
};
/**
 * VaccineRecord — **V4** "companion" design. The warm, friendly take on an
 * immunization line item: an elevated rounded card with a soft shadow, the status
 * glyph in a soft-primary tinted well, a bold vaccine name, a labelled status
 * Badge, the given/next-due dates and vet/lot meta shown as small soft-primary
 * chips, and a rounded "Book booster" CTA for anything not current. Same
 * props/behavior as {@link VaccineRecordProps}; every `status` reads via a glyph +
 * labelled Badge (never color alone). Token-only colors via `useXenitionTheme()`.
 * Web/native parity.
 */
function VaccineRecordV4({ name, status, administered, nextDue, administeredBy, lotNumber, renewLabel = 'Book booster', onRenew, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = STATUS_META[status];
    const showRenew = onRenew != null && status !== 'current';
    const footer = [administeredBy, lotNumber ? `Lot ${lotNumber}` : null].filter(Boolean).join(' · ');
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${name} vaccine, ${meta.label}${nextDue ? `, next due ${nextDue}` : ''}`, style: [
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
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xl }, children: meta.glyph }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: name }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: `${meta.glyph} ${meta.label}` })] }), administered || nextDue ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: tokens.spacing.sm }, children: [administered ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1), borderRadius: tokens.radius.full, paddingHorizontal: tokens.spacing.sm, paddingVertical: 2 }, children: (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: ["Given \u00B7 ", administered] }) })) : null, nextDue ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1), borderRadius: tokens.radius.full, paddingHorizontal: tokens.spacing.sm, paddingVertical: 2 }, children: (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: ["Next due \u00B7 ", nextDue] }) })) : null] })) : null, footer ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: footer })) : null, showRenew ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "soft", size: "sm", tone: status === 'overdue' ? 'danger' : 'default', onPress: onRenew, children: renewLabel })) : null] }));
}
//# sourceMappingURL=VaccineRecordV4.js.map