"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Icon = Icon;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const icon_names_1 = require("../../primitives/icon-names");
/**
 * Themed icon slot — the native mirror of the web `Icon`.
 *
 * `name` is a **semantic name from the kit's icon set** (`'home'`, `'close'`,
 * `'chevron-right'`, …) resolved through {@link ICON_GLYPHS}; `glyph` is the
 * escape hatch for a one-off the set has no name for. Naming the set is what
 * stops two screens in the same app from using different glyphs for the same
 * idea. An unrecognised `name` falls through and renders as-is, so callers
 * that passed raw emoji through `name` before the set existed still work.
 *
 * **These are unicode symbols and emoji, not a vector icon font.** The kit
 * ships no font: the pixels come from the platform's own emoji/symbol face, so
 * the same name looks different on iOS, Android and the web, and the colour
 * emoji among them ignore `color` entirely. See `icon-names.ts` for the full
 * caveat and which names actually take a tint.
 *
 * `size` reads the compiled `typography.scale` (or a raw number) and `color` is
 * a `SemanticColors` key resolved from the active scheme — so every rendered
 * color traces to a token, never a literal. Decorative by default; pass
 * `accessibilityLabel` to expose it as an `image` to screen readers. This is the
 * reusable icon primitive the other mobile components compose.
 */
function Icon({ glyph, name, size = 'lg', color = 'onSurface', accessibilityLabel, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const fontSize = typeof size === 'number' ? size : tokens.typography.scale[size];
    const decorative = accessibilityLabel == null;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: decorative ? undefined : 'image', accessibilityLabel: accessibilityLabel, accessibilityElementsHidden: decorative, importantForAccessibility: decorative ? 'no-hide-descendants' : 'yes', allowFontScaling: false, style: [{ fontSize, lineHeight: fontSize * 1.1, color: colors[color], textAlign: 'center' }, style], children: glyph ?? (name != null ? (0, icon_names_1.resolveIconGlyph)(name) : '') }));
}
//# sourceMappingURL=Icon.js.map