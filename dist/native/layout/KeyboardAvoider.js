"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyboardAvoider = KeyboardAvoider;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
/**
 * Wraps `KeyboardAvoidingView` with the platform-correct `behavior` (`padding`
 * on iOS, `height` on Android) so content lifts above the on-screen keyboard.
 * Pure layout — no theme colors; callers can still override `behavior`/`style`.
 */
function KeyboardAvoider({ behavior, style, children, ...rest }) {
    return ((0, jsx_runtime_1.jsx)(react_native_1.KeyboardAvoidingView, { behavior: behavior ?? (react_native_1.Platform.OS === 'ios' ? 'padding' : 'height'), style: [{ flex: 1 }, style], ...rest, children: children }));
}
//# sourceMappingURL=KeyboardAvoider.js.map