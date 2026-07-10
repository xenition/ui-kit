"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useForm = void 0;
exports.Form = Form;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
// The headless form helper is pure React (no DOM), so it works unchanged on
// native — re-exported here so a mobile app can wire submit/validation without
// a second import from the web entry.
var useForm_1 = require("../../primitives/useForm");
Object.defineProperty(exports, "useForm", { enumerable: true, get: function () { return useForm_1.useForm; } });
/**
 * Themed form container — the native mirror of the web `Form`. RN has no
 * `<form>`, so this is a `<View>` with vertical field spacing; drive
 * submit/validation with the re-exported `useForm` (wire `handleSubmit` to a
 * `Button onPress`) and lay out rows with `Field`. No literal colors.
 */
function Form({ style, children, ...rest }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ gap: tokens.spacing.md }, style], ...rest, children: children }));
}
//# sourceMappingURL=Form.js.map