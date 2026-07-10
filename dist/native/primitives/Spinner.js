"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Spinner = Spinner;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const DIAMETER = { sm: 16, md: 24, lg: 32 };
/**
 * Themed loading spinner — the native mirror of the web `Spinner`. An
 * `ActivityIndicator` tinted with the primary token. No literal colors.
 */
function Spinner({ size = 'md', style }) {
    const { colors } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.ActivityIndicator, { accessibilityRole: "progressbar", accessibilityLabel: "Loading", color: colors.primary, size: DIAMETER[size], style: style }));
}
//# sourceMappingURL=Spinner.js.map