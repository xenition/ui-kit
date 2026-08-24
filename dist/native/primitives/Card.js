"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = Card;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Themed surface container — the native mirror of the web `Card`: token-bound
 * background, border, radius, and padding. The default (`outlined`, `lg`
 * padding, `lg` radius) renders exactly as before; `variant`/`padding`/`radius`
 * are additive opt-ins. No literal colors.
 */
function Card({ variant = 'outlined', padding, radius, style, children, ...rest }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const paddingValue = padding === undefined
        ? tokens.spacing.lg
        : padding === 'none'
            ? 0
            : tokens.spacing[padding];
    const radiusValue = radius === undefined ? tokens.radius.lg : tokens.radius[radius];
    const bordered = variant === 'outlined' || variant === 'interactive';
    const raised = variant === 'elevated' || variant === 'interactive';
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
            {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: bordered ? 1 : 0,
                borderRadius: radiusValue,
                padding: paddingValue,
            },
            raised
                ? {
                    shadowColor: colors.onSurface,
                    shadowOpacity: variant === 'elevated' ? 0.14 : 0.08,
                    shadowRadius: variant === 'elevated' ? 12 : 6,
                    shadowOffset: { width: 0, height: variant === 'elevated' ? 4 : 2 },
                    elevation: variant === 'elevated' ? 4 : 2,
                }
                : null,
            style,
        ], ...rest, children: children }));
}
//# sourceMappingURL=Card.js.map