"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = Text;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const WEIGHT_VALUE = {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
};
/*
  Line height is a ratio of the resolved font size, never a px literal, so it
  rides the theme's type scale the way the font size does. Body copy gets air;
  display sizes tighten, because a 1.5 ratio on a 3xl headline reads as two
  disconnected lines. The web twin maps these same ratios onto Tailwind's
  `leading-*` classes — keep the two tables in step.
*/
const LEADING_RATIO = {
    xs: 1.5,
    sm: 1.5,
    base: 1.5,
    lg: 1.375,
    xl: 1.25,
    '2xl': 1.25,
    '3xl': 1.25,
};
/**
 * Themed text — **the** way to render text in a Xenition app, and the native
 * mirror of the web `Text`.
 *
 * Before this existed every screen imported React Native's own `Text` and
 * hand-assembled `{ fontSize: tokens.typography.scale.lg, color: colors.muted }`
 * inline. That block was the single most repeated code in a generated app and
 * the place a literal `fontSize: 15` eventually crept in. `Text` takes the
 * scale step and the semantic slot as *props* — `size` and `tone` — so there
 * is nothing left to hand-assemble and nothing to get wrong.
 *
 * **A raw `fontSize` (or a literal `color`) in an app is a bug.** If a size or
 * a colour you need is missing here, the fix is a token, not a literal: reach
 * for the next `size`, or add the slot to the theme compiler.
 *
 * Renders RN's `Text` underneath and forwards the rest of its props, so
 * `numberOfLines`, `onPress`, `selectable`, `ellipsizeMode`, `accessibilityRole`
 * and friends work exactly as they always did. `style` is for layout only.
 */
function Text({ size = 'base', tone = 'onSurface', weight = 'regular', align = 'auto', numberOfLines, style, children, ...rest }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const fontSize = tokens.typography.scale[size];
    return ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: numberOfLines, style: [
            {
                color: colors[tone],
                fontSize,
                lineHeight: fontSize * LEADING_RATIO[size],
                fontWeight: WEIGHT_VALUE[weight],
                textAlign: align,
            },
            style,
        ], ...rest, children: children }));
}
//# sourceMappingURL=Text.js.map