"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateSeparator = DateSeparator;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const appearance_1 = require("../primitives/internal/appearance");
/**
 * Centered date chip that breaks a message stream into day sections. Announced
 * as a header for screen-reader navigation. No literal colors — the pill fill
 * and text come from semantic tokens.
 */
function DateSeparator({ label, appearance = 'classic', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "header", style: [{ alignItems: 'center', paddingVertical: tokens.spacing.sm }, style], children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                // Appearance FIRST (fill/border/elevation); classic == surface + hairline border.
                ...(0, appearance_1.appearanceStyle)(appearance, colors, tokens),
                borderRadius: tokens.radius.full,
                paddingVertical: 2,
                paddingHorizontal: tokens.spacing.md,
            }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '500' }, children: label }) }) }));
}
//# sourceMappingURL=DateSeparator.js.map