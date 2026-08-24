"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Progress = Progress;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const HEIGHT = { sm: 6, md: 10 };
/**
 * Linear progress bar — the native mirror of the web `Progress`. A token-styled
 * track with a colored fill sized to `value/max` (clamped to [0, max]). The
 * fill color keys off the tone (`warn`→accent, since there is no warning slot in
 * the primitive token whitelist). The web `Progress` is bar-only — there is no
 * circular variant to simplify away. No literal colors.
 */
function Progress({ value, max = 100, tone = 'primary', size = 'md', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const fill = {
        primary: colors.primary,
        success: colors.success,
        warn: colors.accent,
        danger: colors.danger,
    };
    const pct = Math.max(0, Math.min(100, max > 0 ? (value / max) * 100 : 0));
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityValue: { min: 0, max, now: value }, style: [
            {
                width: '100%',
                height: HEIGHT[size],
                borderRadius: tokens.radius.full,
                backgroundColor: colors.border,
                overflow: 'hidden',
            },
            style,
        ], children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                height: '100%',
                width: `${pct}%`,
                borderRadius: tokens.radius.full,
                backgroundColor: fill[tone],
            } }) }));
}
//# sourceMappingURL=Progress.js.map