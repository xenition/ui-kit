"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeBlock = CodeBlock;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Monospace code surface with an optional header (language label + copy button)
 * and an optional line-number gutter. Horizontally scrollable for long lines.
 * `fontFamily: 'monospace'` is a font family, not a color. All colors, radii and
 * spacing come from the compiled theme tokens via `useXenitionTheme()` — no
 * literal colors.
 */
function CodeBlock({ code, language, lineNumbers = true, onCopy, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const lines = code.replace(/\n$/, '').split('\n');
    const showHeader = language != null || onCopy != null;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: tokens.radius.md,
                backgroundColor: colors.surface,
                overflow: 'hidden',
            },
            style,
        ], children: [showHeader ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: tokens.spacing.md,
                    paddingVertical: tokens.spacing.sm,
                    borderBottomWidth: 1,
                    borderColor: colors.border,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: language ?? '' }), onCopy != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Copy code", onPress: () => onCopy(code), style: { paddingHorizontal: tokens.spacing.sm, paddingVertical: tokens.spacing.xs }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: "Copy" }) })) : null] })) : null, (0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', padding: tokens.spacing.md }, children: [lineNumbers ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginRight: tokens.spacing.md, alignItems: 'flex-end' }, children: lines.map((_, i) => ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                    color: colors.muted,
                                    fontFamily: 'monospace',
                                    fontSize: tokens.typography.scale.sm,
                                    lineHeight: tokens.typography.scale.sm * 1.5,
                                }, children: i + 1 }, i))) })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { children: lines.map((line, i) => ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                    color: colors.onSurface,
                                    fontFamily: 'monospace',
                                    fontSize: tokens.typography.scale.sm,
                                    lineHeight: tokens.typography.scale.sm * 1.5,
                                }, children: line.length > 0 ? line : ' ' }, i))) })] }) })] }));
}
//# sourceMappingURL=CodeBlock.js.map