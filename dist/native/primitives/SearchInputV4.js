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
exports.SearchInputV4 = SearchInputV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const picker_v4_1 = require("./internal/picker-v4");
const state_v4_1 = require("./internal/state-v4");
/**
 * **V4 search field** — the same props as {@link SearchInput}, a different
 * design line.
 *
 * ## It looks like the other fields, and that is the point
 *
 * The base is a pill: `radius.full`, `sm` padding. A pill is a perfectly good
 * search affordance on a toolbar — but a search field is most often a field in
 * a form, sitting under a label and above two `InputV4`s, and there it reads as
 * a foreign object. §16 asks for forms that are minimal, and a form built from
 * three different field shapes is not minimal however few questions it asks.
 *
 * So V4 takes `InputV4`'s treatment exactly: the same `2xl` minimum height, the
 * same `md` radius, and the same brand halo whose space is reserved whether or
 * not it is showing, so focusing never nudges the layout (§36.11). The leading
 * ⌕ is what says "search" — the shape does not have to.
 *
 * ## The clear button is the fix nobody sees
 *
 * The base's ✕ is a bare glyph with 8px of slop: about 24px of target, sitting
 * inside a field, next to the text you are trying to select. Miss it and you
 * put the caret somewhere instead. Here it keeps the same drawn size — a 48px
 * ✕ inside a 48px field would be absurd — but `hitSlopTo` opens its touch area
 * out to the same `tapTarget()` every other V4 control is built on. Small mark,
 * large target, and the layout never notices.
 *
 * It is also announced as "Clear search" and only exists when there is
 * something to clear, so the row does not carry a dead affordance.
 */
function SearchInputV4({ value = '', onChangeText, onClear, placeholder = 'Search…', invalid = false, disabled = false, accessibilityLabel = 'Search', containerStyle, onFocus, onBlur, ...rest }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const [focused, setFocused] = React.useState(false);
    const clear = () => {
        onChangeText?.('');
        onClear?.();
    };
    // The ✕ stays glyph-sized; only its touch area grows.
    const glyph = tokens.spacing.lg;
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [(0, picker_v4_1.ringWrap)(theme, { focused, invalid }), containerStyle], children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, picker_v4_1.fieldSkin)(theme, { focused, invalid, disabled }), children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityElementsHidden: true, importantForAccessibility: "no", style: { color: colors.mutedText, fontSize: tokens.typography.scale.base }, children: "\u2315" }), (0, jsx_runtime_1.jsx)(react_native_1.TextInput, { editable: !disabled, accessibilityLabel: accessibilityLabel, accessibilityState: { disabled }, value: value, onChangeText: onChangeText, onFocus: (e) => {
                        setFocused(true);
                        onFocus?.(e);
                    }, onBlur: (e) => {
                        setFocused(false);
                        onBlur?.(e);
                    }, placeholder: placeholder, placeholderTextColor: colors.mutedText, returnKeyType: "search", style: {
                        flex: 1,
                        color: colors.onSurface,
                        fontFamily: tokens.typography.fontBody,
                        fontSize: tokens.typography.scale.base,
                        padding: 0,
                    }, ...rest }), value.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Clear search", disabled: disabled, onPress: clear, hitSlop: (0, picker_v4_1.hitSlopTo)(theme, glyph), style: ({ pressed }) => ({
                        width: glyph,
                        height: glyph,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: tokens.radius.full,
                        backgroundColor: pressed ? (0, state_v4_1.pressLayer)(theme) : 'transparent',
                    }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.base }, children: "\u2715" }) })) : null] }) }));
}
//# sourceMappingURL=SearchInputV4.js.map