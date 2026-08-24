"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Watermark = Watermark;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Watermark — tiles faint, diagonally-rotated repeating text across its
 * children as a non-interactive overlay (`pointerEvents="none"`). The text is
 * the `muted` token at low opacity so it stays a pure theme color; the overlay
 * never intercepts touches. Useful for "confidential" / ownership marks over
 * documents or previews. No literal colors.
 */
function Watermark({ text, children, count = 24, style }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const tiles = Array.from({ length: Math.max(1, count) });
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ position: 'relative', overflow: 'hidden' }, style], children: [children, (0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "none", accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: [
                    react_native_1.StyleSheet.absoluteFillObject,
                    {
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        alignContent: 'center',
                        justifyContent: 'center',
                        opacity: 0.08,
                        transform: [{ rotate: '-30deg' }, { scale: 1.4 }],
                    },
                ], children: tiles.map((_, i) => ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                        color: colors.muted,
                        fontSize: tokens.typography.scale.sm,
                        fontWeight: '700',
                        paddingHorizontal: tokens.spacing.lg,
                        paddingVertical: tokens.spacing.md,
                    }, children: text }, i))) })] }));
}
//# sourceMappingURL=Watermark.js.map