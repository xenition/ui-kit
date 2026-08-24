"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Icon = Icon;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Themed icon slot — the kit ships no icon font, so `Icon` renders a
 * caller-supplied `glyph`/`name` (emoji or unicode symbol) as a sized, colored
 * `Text`. `size` reads the compiled `typography.scale` (or a raw number) and
 * `color` is a `SemanticColors` key resolved from the active scheme — so every
 * rendered color traces to a token, never a literal. Decorative by default;
 * pass `accessibilityLabel` to expose it as an `image` to screen readers. This
 * is the reusable icon primitive the other mobile components compose.
 */
function Icon({ glyph, name, size = 'lg', color = 'onSurface', accessibilityLabel, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const fontSize = typeof size === 'number' ? size : tokens.typography.scale[size];
    const decorative = accessibilityLabel == null;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: decorative ? undefined : 'image', accessibilityLabel: accessibilityLabel, accessibilityElementsHidden: decorative, importantForAccessibility: decorative ? 'no-hide-descendants' : 'yes', allowFontScaling: false, style: [{ fontSize, lineHeight: fontSize * 1.1, color: colors[color], textAlign: 'center' }, style], children: glyph ?? name ?? '' }));
}
//# sourceMappingURL=Icon.js.map