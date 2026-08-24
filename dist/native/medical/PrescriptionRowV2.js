"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrescriptionRowV2 = PrescriptionRowV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const motion_1 = require("../primitives/internal/motion");
const elevation_1 = require("../primitives/internal/elevation");
const color_1 = require("../primitives/internal/color");
const STATUS_META = {
    active: { glyph: '●', label: 'Active', color: 'successText' },
    'refill-due': { glyph: '↻', label: 'Refill due', color: 'warnText' },
    paused: { glyph: '⏸', label: 'Paused', color: 'muted' },
    expired: { glyph: '✕', label: 'Expired', color: 'dangerText' },
};
/**
 * PrescriptionRow, redesigned (v2): an **elevated med card**. A rounded, primary-
 * tinted pill-glyph tile anchors the left; the drug name sits large with dose /
 * directions / refills beneath it and a glyph + label status line. When a refill
 * is due, a full-width "Refill" CTA spans the foot. Lifted with a shadow and a
 * fade-in mount — distinct at a glance from v1's flat list row. Same props,
 * token-pure.
 */
function PrescriptionRowV2({ name, dose, frequency, refillsLeft, status = 'active', onRefill, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)();
    const meta = STATUS_META[status];
    const statusColor = colors[meta.color];
    const detailParts = [
        dose,
        frequency,
        refillsLeft != null ? `${refillsLeft} refill${refillsLeft === 1 ? '' : 's'} left` : undefined,
    ].filter(Boolean);
    const a11y = `${name}${dose ? `, ${dose}` : ''}${frequency ? `, ${frequency}` : ''}, ${meta.label}`;
    const card = ((0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { style: [
            {
                backgroundColor: colors.surface,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.md,
                gap: tokens.spacing.md,
                opacity: enter.opacity,
                transform: enter.transform,
                ...(0, elevation_1.shadow)('md', tokens),
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 48,
                            height: 48,
                            borderRadius: tokens.radius.md,
                            backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1),
                            alignItems: 'center',
                            justifyContent: 'center',
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xl }, children: "\uD83D\uDC8A" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 3 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: name }), detailParts.length ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: detailParts.join('  ·  ') })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: statusColor, fontSize: tokens.typography.scale.xs }, children: meta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: statusColor, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: meta.label })] })] })] }), status === 'refill-due' && onRefill ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "soft", tone: "default", onPress: onRefill, children: "Refill" })) : null] }));
    if (!onPress) {
        return (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: a11y, children: card });
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, children: card }));
}
//# sourceMappingURL=PrescriptionRowV2.js.map