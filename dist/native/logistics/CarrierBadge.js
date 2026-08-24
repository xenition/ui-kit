"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarrierBadge = CarrierBadge;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const internal_1 = require("./internal");
/**
 * Compact carrier identity chip — a glyph + carrier name (+ optional service
 * level), so the carrier is never conveyed by color alone. Colors resolve from
 * the carrier's tone token (or a `withAlpha` tint of it); no literal colors.
 * Reused by `ShipmentCard`, `PackageRow`, `ManifestRow` and `DockSchedule`.
 */
function CarrierBadge({ carrier = 'generic', name, service, variant = 'soft', size = 'md', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = internal_1.CARRIER_META[carrier] ?? internal_1.CARRIER_META.generic;
    const accent = (0, internal_1.toneColor)(colors, meta.tone);
    const label = name ?? meta.label;
    let bg = 'transparent';
    let fg = accent;
    let borderWidth = 0;
    let borderColor = 'transparent';
    if (variant === 'soft') {
        bg = (0, internal_1.withAlpha)(accent, 0.14);
    }
    else if (variant === 'solid') {
        bg = accent;
        fg = colors.surface;
    }
    else {
        borderWidth = 1;
        borderColor = accent;
    }
    const textSize = size === 'sm' ? tokens.typography.scale.xs : tokens.typography.scale.sm;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: `Carrier ${label}${service ? `, ${service}` : ''}`, style: [
            {
                alignSelf: 'flex-start',
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.xs,
                backgroundColor: bg,
                borderWidth,
                borderColor,
                borderRadius: tokens.radius.full,
                paddingVertical: size === 'sm' ? 2 : 3,
                paddingHorizontal: tokens.spacing.sm,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: textSize, color: fg }, children: meta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: textSize, color: fg, fontWeight: '700' }, children: label }), service ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, color: variant === 'solid' ? fg : colors.muted }, children: `· ${service}` })) : null] }));
}
//# sourceMappingURL=CarrierBadge.js.map