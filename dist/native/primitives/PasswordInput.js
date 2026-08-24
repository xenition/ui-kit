"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordInput = PasswordInput;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Password field — a token-bound `TextInput` with `secureTextEntry` and a
 * show/hide toggle that flips the masking. Background, border, radius, and text
 * come from `useXenitionTheme()`; `invalid` swaps the border to `danger` and the
 * placeholder uses `muted`. No literal colors.
 */
function PasswordInput({ value = '', onChangeText, label, placeholder = 'Password', invalid = false, disabled = false, accessibilityLabel = 'Password', containerStyle, ...rest }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const [visible, setVisible] = React.useState(false);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.xs }, containerStyle], children: [label ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: label })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.sm,
                    backgroundColor: colors.surface,
                    borderWidth: 1,
                    borderColor: invalid ? colors.danger : colors.border,
                    borderRadius: tokens.radius.sm,
                    paddingVertical: tokens.spacing.sm,
                    paddingHorizontal: tokens.spacing.md,
                    opacity: disabled ? 0.5 : 1,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.TextInput, { editable: !disabled, accessibilityLabel: accessibilityLabel, accessibilityState: { disabled }, value: value, onChangeText: onChangeText, placeholder: placeholder, placeholderTextColor: colors.muted, secureTextEntry: !visible, autoCapitalize: "none", autoCorrect: false, style: {
                            flex: 1,
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale.base,
                            padding: 0,
                        }, ...rest }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: visible ? 'Hide password' : 'Show password', accessibilityState: { selected: visible }, disabled: disabled, onPress: () => setVisible((v) => !v), hitSlop: 8, style: ({ pressed }) => ({ opacity: pressed ? 0.6 : 1 }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                color: visible ? colors.primary : colors.muted,
                                fontSize: tokens.typography.scale.sm,
                                fontWeight: '600',
                            }, children: visible ? 'Hide' : 'Show' }) })] })] }));
}
//# sourceMappingURL=PasswordInput.js.map