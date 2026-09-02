"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarrierBadgeV4 = CarrierBadgeV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const internal_1 = require("./internal");
/**
 * CarrierBadge — **V4** "dispatch" design (native twin of the web V4). The
 * confident, operations-desk take on the carrier identity chip: a rounded pill
 * with the carrier glyph tucked in its own tone-tinted well, the carrier name,
 * and an optional service level — so the carrier is never conveyed by color
 * alone. Keeps the base `variant` (`soft` / `solid` / `outline`) and `size`
 * (`sm` / `md`) props. Colors resolve from the carrier's tone token (or a
 * `withAlpha` tint of it); no literal colors.
 */
function CarrierBadgeV4({ carrier = 'generic', name, service, variant = 'soft', size = 'md', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = internal_1.CARRIER_META[carrier] ?? internal_1.CARRIER_META.generic;
    const accent = (0, internal_1.toneColor)(colors, meta.tone);
    const label = name ?? meta.label;
    let bg = 'transparent';
    let fg = accent;
    let borderWidth = 0;
    let borderColor = 'transparent';
    let wellBg = (0, internal_1.withAlpha)(accent, 0.18);
    let wellFg = accent;
    if (variant === 'soft') {
        bg = (0, internal_1.withAlpha)(accent, 0.14);
    }
    else if (variant === 'solid') {
        bg = accent;
        fg = colors.surface;
        wellBg = (0, internal_1.withAlpha)(colors.surface, 0.22);
        wellFg = colors.surface;
    }
    else {
        borderWidth = 1;
        borderColor = accent;
    }
    const textSize = size === 'sm' ? tokens.typography.scale.xs : tokens.typography.scale.sm;
    const wellSize = size === 'sm' ? 16 : 20;
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
                paddingVertical: 2,
                paddingLeft: 2,
                paddingRight: tokens.spacing.sm,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: wellSize, height: wellSize, borderRadius: tokens.radius.full, alignItems: 'center', justifyContent: 'center', backgroundColor: wellBg }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: textSize, color: wellFg }, children: meta.glyph }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: textSize, color: fg, fontWeight: '700' }, children: label }), service ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, color: variant === 'solid' ? fg : colors.muted }, children: `· ${service}` })) : null] }));
}
//# sourceMappingURL=CarrierBadgeV4.js.map