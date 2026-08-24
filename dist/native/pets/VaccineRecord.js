"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VaccineRecord = VaccineRecord;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const STATUS_META = {
    current: { label: 'Up to date', tone: 'success', glyph: '✓', slot: 'success' },
    'due-soon': { label: 'Due soon', tone: 'warn', glyph: '⏳', slot: 'warn' },
    overdue: { label: 'Overdue', tone: 'danger', glyph: '⚠', slot: 'danger' },
    unknown: { label: 'No record', tone: 'neutral', glyph: '?', slot: 'muted' },
};
/**
 * A single immunization line item: vaccine name with a status chip
 * (`current`/`due-soon`/`overdue`), the administered + next-due dates, and an
 * optional "Book booster" action for anything not current. Status is conveyed by
 * an icon + text label (never color alone). Token-only colors.
 */
function VaccineRecord({ name, status, administered, nextDue, administeredBy, lotNumber, renewLabel = 'Book booster', onRenew, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = STATUS_META[status];
    const showRenew = onRenew != null && status !== 'current';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${name} vaccine, ${meta.label}${nextDue ? `, next due ${nextDue}` : ''}`, style: [
            {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderLeftColor: colors[meta.slot],
                borderWidth: 1,
                borderLeftWidth: 4,
                borderRadius: tokens.radius.md,
                padding: tokens.spacing.md,
                gap: tokens.spacing.sm,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: name }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: `${meta.glyph} ${meta.label}` })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.xl }, children: [administered ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "Given" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: administered })] })) : null, nextDue ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "Next due" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: nextDue })] })) : null] }), administeredBy || lotNumber ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [administeredBy, lotNumber ? `Lot ${lotNumber}` : null].filter(Boolean).join(' · ') })) : null, showRenew ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "soft", size: "sm", tone: status === 'overdue' ? 'danger' : 'default', onPress: onRenew, children: renewLabel })) : null] }));
}
//# sourceMappingURL=VaccineRecord.js.map