"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlassPanel = GlassPanel;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("./internal/color");
const SURFACE_ALPHA = {
    soft: 0.45,
    regular: 0.65,
    strong: 0.82,
};
/**
 * Translucent surface — the native mirror of the web `GlassPanel`. React
 * Native has no `color-mix()`/`backdrop-filter`, so the frosted look is
 * approximated by an `rgba()` derived from the **`surface` token** at the
 * intensity's alpha (plus a translucent `border` token edge). The color always
 * originates from a theme token — no literal colors. On iOS a
 * `blurRadius`-style backdrop would need a native blur view; this keeps the
 * kit dependency-free and restyle-by-seed.
 */
function GlassPanel({ intensity = 'regular', bordered = true, style, children, ...rest }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
            {
                backgroundColor: (0, color_1.withAlpha)(colors.surface, SURFACE_ALPHA[intensity]),
                borderRadius: tokens.radius.lg,
                ...(bordered
                    ? { borderWidth: 1, borderColor: (0, color_1.withAlpha)(colors.border, 0.6) }
                    : null),
            },
            style,
        ], ...rest, children: children }));
}
//# sourceMappingURL=GlassPanel.js.map