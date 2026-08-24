"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListSeparator = ListSeparator;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Hairline row divider for lists — a thin rule in the theme `border` color with
 * an optional leading `inset`, ideal as a `FlatList`'s `ItemSeparatorComponent`.
 * Color and inset trace to the compiled theme; no literal colors.
 */
function ListSeparator({ inset, style, ...rest }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "none", accessible: false, style: [
            {
                height: 1,
                backgroundColor: colors.border,
                marginLeft: inset ? tokens.spacing[inset] : 0,
            },
            style,
        ], ...rest }));
}
//# sourceMappingURL=ListSeparator.js.map