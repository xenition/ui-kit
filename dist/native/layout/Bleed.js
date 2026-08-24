"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bleed = Bleed;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * The inverse of `Inset`: applies token-bound *negative* margins so content can
 * break out of a padded parent (full-bleed images, edge-to-edge rows). Margins
 * trace to the compiled spacing scale; no literal colors.
 */
function Bleed({ space = 'md', horizontal, vertical, style, children, ...rest }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
            {
                marginHorizontal: -tokens.spacing[horizontal ?? space],
                marginVertical: -tokens.spacing[vertical ?? space],
            },
            style,
        ], ...rest, children: children }));
}
//# sourceMappingURL=Bleed.js.map