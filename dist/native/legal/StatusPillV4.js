"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusPillV4 = StatusPillV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const internal_1 = require("./internal");
/**
 * StatusPill — **V4** "chambers" design (native twin of the web V4). The
 * distinguished, chambers take on the shared status indicator: a rounded
 * **glyph + word** pill so state is never carried by color alone. The `soft`
 * variant reads as a tone-tinted well with a hairline ring; `solid` fills;
 * `inline` drops the chrome for dense rows. Keeps the base `variant`
 * (`soft` / `inline` / `solid`) and `size` (`sm` / `md`). Color resolves from a
 * compiled token (or a token-tinted `withAlpha`), never a literal.
 */
function StatusPillV4({ meta, variant = 'soft', size = 'md', style }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const tint = (0, internal_1.toneColor)(colors, meta.tone);
    const textKey = size === 'sm' ? 'xs' : 'sm';
    const solid = variant === 'solid';
    const inline = variant === 'inline';
    const bg = solid ? tint : inline ? 'transparent' : (0, color_1.withAlpha)(tint, 0.12);
    const fg = solid ? colors[(0, internal_1.onToneSlot)(meta.tone)] : tint;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: meta.label, style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'flex-start',
                gap: tokens.spacing.xs / 2,
                backgroundColor: bg,
                borderRadius: tokens.radius.full,
                borderWidth: !solid && !inline ? 1 : 0,
                borderColor: !solid && !inline ? (0, color_1.withAlpha)(tint, 0.24) : 'transparent',
                paddingVertical: inline ? 0 : size === 'sm' ? 2 : 3,
                paddingHorizontal: inline ? 0 : tokens.spacing.sm,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: fg, fontSize: tokens.typography.scale[textKey], lineHeight: tokens.typography.scale[textKey] * 1.2 }, children: meta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: fg, fontSize: tokens.typography.scale[textKey], fontWeight: '700' }, children: meta.label })] }));
}
//# sourceMappingURL=StatusPillV4.js.map