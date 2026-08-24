"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrescriptionRow = PrescriptionRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const STATUS_META = {
    active: { glyph: '●', label: 'Active', color: 'success' },
    'refill-due': { glyph: '↻', label: 'Refill due', color: 'warn' },
    paused: { glyph: '⏸', label: 'Paused', color: 'muted' },
    expired: { glyph: '✕', label: 'Expired', color: 'danger' },
};
/**
 * A medication list row for a prescription / pharmacy screen: drug name, dose,
 * directions, refills remaining, and a status marker (active / refill-due /
 * paused / expired) drawn as a glyph + label so it never relies on color alone.
 * A "Refill" action surfaces when a refill is due. Informational UI only — not
 * a medical device. Token-only colors.
 */
function PrescriptionRow({ name, dose, frequency, refillsLeft, status = 'active', onRefill, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = STATUS_META[status];
    const statusColor = colors[meta.color];
    const detailParts = [
        dose,
        frequency,
        refillsLeft != null ? `${refillsLeft} refill${refillsLeft === 1 ? '' : 's'} left` : undefined,
    ].filter(Boolean);
    const a11y = `${name}${dose ? `, ${dose}` : ''}${frequency ? `, ${frequency}` : ''}, ${meta.label}`;
    const content = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.md,
                minHeight: 56,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.lg }, children: "\uD83D\uDC8A" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: name }), detailParts.length ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: detailParts.join('  ·  ') })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: statusColor, fontSize: tokens.typography.scale.xs }, children: meta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: statusColor, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: meta.label })] })] }), status === 'refill-due' && onRefill ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "soft", tone: "default", onPress: onRefill, children: "Refill" })) : null] }));
    if (!onPress) {
        return (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: a11y, children: content });
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.7 : 1 }), children: content }));
}
//# sourceMappingURL=PrescriptionRow.js.map