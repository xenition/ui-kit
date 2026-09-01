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
exports.OpenTextResponseV4 = OpenTextResponseV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
/**
 * OpenTextResponse — **V4** "clean form / focus" design. A big, comfortable
 * multiline answer field on a calm `surface`: a `border` hairline that lifts to a
 * soft **primary** ring/border while focused (the single signature accent), an
 * optional label, and a live character counter that turns **danger** once the
 * text meets or exceeds `maxLength`. Generous padding, rounded control, no
 * gradients. Fully controlled (`value`/`onChange`); preserves the multiline
 * `TextInput` a11y (`accessibilityLabel`) and `maxLength` guard. Same
 * props/behavior as {@link OpenTextResponseProps}; token-only colors via
 * `useXenitionTheme()` + `withAlpha` (no literal colors).
 */
function OpenTextResponseV4({ value, onChange, placeholder, label, rows = 4, maxLength, error, disabled = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const [focused, setFocused] = React.useState(false);
    const atLimit = maxLength != null && value.length >= maxLength;
    const invalid = error != null;
    const lineHeight = Math.round(tokens.typography.scale.base * 1.4);
    const borderColor = invalid ? colors.danger : focused ? colors.primary : colors.border;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.xs }, style], children: [label ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: label })) : null, (0, jsx_runtime_1.jsx)(react_native_1.TextInput, { multiline: true, textAlignVertical: "top", editable: !disabled, accessibilityState: { disabled }, accessibilityLabel: label ?? placeholder ?? 'Your answer', value: value, onChangeText: onChange, onFocus: () => setFocused(true), onBlur: () => setFocused(false), placeholder: placeholder, placeholderTextColor: colors.muted, maxLength: maxLength, style: {
                    width: '100%',
                    minHeight: rows * lineHeight + tokens.spacing.md * 2,
                    color: colors.onSurface,
                    // Calm surface; a whisper of primary tint while focused.
                    backgroundColor: focused && !invalid ? (0, color_1.withAlpha)(colors.primary, 0.04) : colors.surface,
                    borderWidth: focused ? 2 : 1,
                    borderColor,
                    borderRadius: tokens.radius.lg,
                    paddingVertical: tokens.spacing.md,
                    paddingHorizontal: tokens.spacing.md,
                    fontSize: tokens.typography.scale.base,
                    opacity: disabled ? 0.5 : 1,
                    // Soft primary focus ring — the single V4 accent.
                    shadowColor: colors.primary,
                    shadowOpacity: focused && !invalid ? 0.25 : 0,
                    shadowRadius: 6,
                    shadowOffset: { width: 0, height: 0 },
                } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, children: [error ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "text", style: { color: colors.danger, fontSize: tokens.typography.scale.sm, fontWeight: '600', flex: 1 }, children: error })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 } })), maxLength != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: {
                            color: atLimit ? colors.danger : colors.muted,
                            fontSize: tokens.typography.scale.xs,
                            fontWeight: atLimit ? '700' : '400',
                        }, children: [value.length, " / ", maxLength] })) : null] })] }));
}
//# sourceMappingURL=OpenTextResponseV4.js.map