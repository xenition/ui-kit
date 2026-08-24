"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Section = Section;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * A titled content block: an optional `title`/`subtitle` header followed by its
 * children, separated by a token-bound `spacing` gap. Type sizes, colors, and
 * spacing all trace to the compiled theme; no literal colors.
 */
function Section({ title, subtitle, spacing = 'md', style, children, ...rest }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const hasHeader = Boolean(title || subtitle);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing[spacing] }, style], ...rest, children: [hasHeader ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [title ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: {
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale.lg,
                            fontWeight: '600',
                        }, children: title })) : null, subtitle ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: subtitle })) : null] })) : null, children] }));
}
//# sourceMappingURL=Section.js.map