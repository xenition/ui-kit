"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrescriptionRowV4 = PrescriptionRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const STATUS_META = {
    active: { glyph: '●', label: 'Active', tone: 'success' },
    'refill-due': { glyph: '↻', label: 'Refill due', tone: 'warn' },
    paused: { glyph: '⏸', label: 'Paused', tone: 'neutral' },
    expired: { glyph: '✕', label: 'Expired', tone: 'danger' },
};
/**
 * PrescriptionRow — **V4** "clinic" design. The calm, clinical take on a
 * medication row: an elevated rounded row with a soft shadow, a pill glyph, the
 * drug name, dose · directions · refills, and a status marker (active /
 * refill-due / paused / expired) drawn as a glyph + labelled Badge + token tone,
 * so it never relies on color alone (accessibility + the token contract). A
 * "Refill" action surfaces when a refill is due. Honors the V4 `variant` —
 * `full` (default) and `compact` (a denser single line that hides the secondary
 * detail line) — identical props/behavior to {@link PrescriptionRowProps}.
 * Token-only colors via `useXenitionTheme()`. Web/native parity of the V4 web
 * component. Informational UI only — not a medical device.
 */
function PrescriptionRowV4({ name, dose, frequency, refillsLeft, status = 'active', onRefill, onPress, variant = 'full', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = STATUS_META[status];
    const shell = {
        backgroundColor: colors.card,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: tokens.radius.lg,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    };
    const detailParts = [
        dose,
        frequency,
        refillsLeft != null ? `${refillsLeft} refill${refillsLeft === 1 ? '' : 's'} left` : undefined,
    ].filter(Boolean);
    const a11y = `${name}${dose ? `, ${dose}` : ''}${frequency ? `, ${frequency}` : ''}, ${meta.label}`;
    const statusBadge = ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: `${meta.glyph} ${meta.label}` }));
    const refillBtn = status === 'refill-due' && onRefill ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "soft", tone: "default", onPress: onRefill, children: "Refill" })) : null;
    // ── compact: denser single line ──
    const content = variant === 'compact' ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            shell,
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.md,
                minHeight: 44,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.base }, children: "\uD83D\uDC8A" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: name }), dose ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: dose })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { marginLeft: 'auto', flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [statusBadge, refillBtn] })] })) : ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            shell,
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.md,
                minHeight: 56,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.lg }, children: "\uD83D\uDC8A" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 4 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: name }), detailParts.length ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { alignSelf: 'flex-start', backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1), borderRadius: tokens.radius.sm, paddingHorizontal: tokens.spacing.xs }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: detailParts.join('  ·  ') }) })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row' }, children: statusBadge })] }), refillBtn] }));
    if (!onPress) {
        return (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: a11y, children: content });
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.7 : 1 }), children: content }));
}
//# sourceMappingURL=PrescriptionRowV4.js.map