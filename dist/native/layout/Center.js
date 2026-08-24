"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Center = Center;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
/**
 * Centers its children on both axes. Optionally fills the parent so the
 * centering happens across all available space. Pure layout — no theme colors,
 * so nothing to token-bind beyond the shared numeric flex values.
 */
function Center({ fill = false, style, children, ...rest }) {
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
            {
                alignItems: 'center',
                justifyContent: 'center',
                flex: fill ? 1 : undefined,
            },
            style,
        ], ...rest, children: children }));
}
//# sourceMappingURL=Center.js.map