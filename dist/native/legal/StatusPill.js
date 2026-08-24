"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusPill = StatusPill;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const internal_1 = require("./internal");
/**
 * Reusable status indicator for the legal module — renders a {@link StatusMeta}
 * as a **glyph + word** pill so state is never conveyed by color alone. Color
 * always resolves from a compiled token via {@link toneColor} (or a token-tinted
 * `withAlpha`), never a literal. `inline` drops the pill chrome for use inside a
 * dense row. Not domain-specific; every legal block composes it.
 */
function StatusPill({ meta, variant = 'soft', size = 'md', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const tint = (0, internal_1.toneColor)(colors, meta.tone);
    const textKey = size === 'sm' ? 'xs' : 'sm';
    const solid = variant === 'solid';
    const inline = variant === 'inline';
    const bg = solid ? tint : inline ? 'transparent' : (0, color_1.withAlpha)(tint, 0.14);
    const fg = solid ? colors[(0, internal_1.onToneSlot)(meta.tone)] : tint;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: meta.label, style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'flex-start',
                gap: tokens.spacing.xs / 2,
                backgroundColor: bg,
                borderRadius: tokens.radius.full,
                paddingVertical: inline ? 0 : size === 'sm' ? 1 : 2,
                paddingHorizontal: inline ? 0 : tokens.spacing.xs,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: {
                    color: fg,
                    fontSize: tokens.typography.scale[textKey],
                    lineHeight: tokens.typography.scale[textKey] * 1.2,
                }, children: meta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: fg, fontSize: tokens.typography.scale[textKey], fontWeight: '600' }, children: meta.label })] }));
}
//# sourceMappingURL=StatusPill.js.map