"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Label = Label;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/** Themed form label — the native mirror of the web `Label`. No literal colors. */
function Label({ required = false, style, children, ...rest }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: [
            { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '500' },
            style,
        ], ...rest, children: [children, required ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.dangerText, marginLeft: 2 }, children: "*" }) : null] }));
}
//# sourceMappingURL=Label.js.map