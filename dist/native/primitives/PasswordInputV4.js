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
exports.PasswordInputV4 = PasswordInputV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const field_v4_1 = require("./internal/field-v4");
const state_v4_1 = require("./internal/state-v4");
/**
 * **V4 password field** — the same props as {@link PasswordInput}, a different
 * design line.
 *
 * The reveal toggle is the whole design problem here. It is a word, and a word
 * is a small target sitting inside a field the user is trying to type into —
 * which is why the base's toggle, at `hitSlop={8}`, is easy to miss and easier
 * to hit by accident. V4 gives it a `hitSlop` derived from the control's own
 * height, so it reaches a full touch target without growing the label and
 * pushing the field around it (§30).
 *
 * The rest is the shared field language:
 *
 * - `2xl` tall, `md` radius, `md` horizontal padding from `fieldMetrics`, so a
 *   password sits under an email field in a sign-up form and shares its edge
 *   (§13). The base's `radius.sm` box was visibly a different component.
 * - The same brand halo `InputV4` paints, around the whole shell — the toggle
 *   is part of the control, not a button beside it — with its space reserved
 *   whether or not it is showing (§36.11).
 * - The label sits above at `sm`, medium weight, matching `InputV4` exactly.
 *
 * The toggle says **Show** / **Hide** rather than carrying an eye icon: §47
 * asks for copy that says what happens, an eye with a slash through it is two
 * different meanings depending on which product you last used, and the state is
 * then in a word rather than only in an icon's decoration (§46). It is tinted
 * `primaryText` when revealed — the contrast-safe text form the compiler
 * measured against `surface`, not the vivid `primary` slot, which is for fills.
 *
 * No gradient, no glass, no shadow: §16 asks that forms stay minimal.
 */
function PasswordInputV4({ value = '', onChangeText, label, placeholder = 'Password', invalid = false, disabled = false, accessibilityLabel = 'Password', containerStyle, ...rest }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const metrics = (0, field_v4_1.fieldMetrics)(theme);
    const [visible, setVisible] = React.useState(false);
    const [focused, setFocused] = React.useState(false);
    const accent = (0, field_v4_1.fieldAccent)(theme, invalid);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: metrics.gap }, containerStyle], children: [label ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.sm,
                    fontFamily: tokens.typography.fontBody,
                    fontWeight: '500',
                }, children: label })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, field_v4_1.haloStyle)(theme, { showing: focused, accent }), children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: metrics.inner,
                        minHeight: metrics.height,
                        paddingHorizontal: metrics.padX,
                        borderRadius: metrics.radius,
                        backgroundColor: colors.surface,
                        opacity: disabled ? theme.state.disabledContent : 1,
                        ...(0, field_v4_1.fieldBorder)(theme, { invalid, focused }),
                    }, children: [(0, jsx_runtime_1.jsx)(react_native_1.TextInput, { editable: !disabled, accessibilityLabel: accessibilityLabel, accessibilityState: { disabled }, value: value, onChangeText: onChangeText, onFocus: () => setFocused(true), onBlur: () => setFocused(false), placeholder: placeholder, placeholderTextColor: colors.mutedText, secureTextEntry: !visible, autoCapitalize: "none", autoCorrect: false, style: {
                                flex: 1,
                                color: colors.onSurface,
                                fontSize: tokens.typography.scale.base,
                                fontFamily: tokens.typography.fontBody,
                                padding: 0,
                            }, ...rest }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: visible ? 'Hide password' : 'Show password', accessibilityState: { selected: visible, disabled }, disabled: disabled, 
                            // A word is a small target. This is the slop that turns it into a
                            // real one, derived from the control's own height rather than picked.
                            hitSlop: metrics.gap + metrics.ring, onPress: () => setVisible((v) => !v), style: ({ pressed }) => ({
                                borderRadius: tokens.radius.sm,
                                backgroundColor: pressed ? (0, state_v4_1.pressLayer)(theme) : 'transparent',
                            }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                    color: visible ? colors.primaryText : colors.mutedText,
                                    fontSize: tokens.typography.scale.sm,
                                    fontFamily: tokens.typography.fontBody,
                                    fontWeight: '600',
                                }, children: visible ? 'Hide' : 'Show' }) })] }) })] }));
}
//# sourceMappingURL=PasswordInputV4.js.map