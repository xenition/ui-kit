"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Avatar = Avatar;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const DIAMETER = { sm: 32, md: 40, lg: 56 };
const FONT = { sm: 'xs', md: 'sm', lg: 'lg' };
function initials(name) {
    if (!name)
        return '?';
    const parts = name.trim().split(/\s+/).slice(0, 2);
    return parts.map((w) => w[0]?.toUpperCase() ?? '').join('') || '?';
}
/**
 * User avatar — the native mirror of the web `Avatar`: image with an initials
 * fallback, bound to the theme tokens. No literal colors.
 */
function Avatar({ src, name, size = 'md', style }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const d = DIAMETER[size];
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
            {
                width: d,
                height: d,
                borderRadius: d / 2,
                overflow: 'hidden',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.primary,
            },
            style,
        ], children: src ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: src }, style: { width: d, height: d }, resizeMode: "cover" })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                color: colors.onPrimary,
                fontSize: tokens.typography.scale[FONT[size]],
                fontWeight: '500',
            }, children: initials(name) })) }));
}
//# sourceMappingURL=Avatar.js.map