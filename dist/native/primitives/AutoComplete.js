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
exports.AutoComplete = AutoComplete;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Inline autocomplete — a token-bound `TextInput` with a filtered suggestion
 * list that drops in beneath it as you type (no `Modal`, unlike `Combobox`).
 * Filters `options` by label substring, caps at `maxResults`, and reports the
 * text via `onChange` and the chosen row via `onSelect`. Border flips to
 * `danger` when `invalid`. No literal colors.
 */
function AutoComplete({ options, value = '', onChange, onSelect, placeholder = 'Type to search…', maxResults = 6, invalid = false, disabled = false, accessibilityLabel = 'Autocomplete', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const [focused, setFocused] = React.useState(false);
    const matches = React.useMemo(() => {
        const q = value.trim().toLowerCase();
        if (!q)
            return [];
        return options.filter((o) => o.label.toLowerCase().includes(q)).slice(0, maxResults);
    }, [options, value, maxResults]);
    const showList = focused && matches.length > 0;
    const choose = (opt) => {
        onChange?.(opt.label);
        onSelect?.(opt);
        setFocused(false);
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ width: '100%' }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.TextInput, { editable: !disabled, accessibilityLabel: accessibilityLabel, accessibilityState: { disabled, expanded: showList }, value: value, onChangeText: onChange, onFocus: () => setFocused(true), onBlur: () => setFocused(false), placeholder: placeholder, placeholderTextColor: colors.muted, autoCorrect: false, style: {
                    width: '100%',
                    color: colors.onSurface,
                    backgroundColor: colors.surface,
                    borderWidth: 1,
                    borderColor: invalid ? colors.danger : colors.border,
                    borderRadius: tokens.radius.sm,
                    paddingVertical: tokens.spacing.sm,
                    paddingHorizontal: tokens.spacing.md,
                    fontSize: tokens.typography.scale.base,
                    opacity: disabled ? 0.5 : 1,
                } }), showList ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: "Suggestions", style: {
                    marginTop: tokens.spacing.xs,
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                    borderWidth: 1,
                    borderRadius: tokens.radius.md,
                    overflow: 'hidden',
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { keyboardShouldPersistTaps: "handled", style: { maxHeight: 220 }, children: matches.map((opt) => ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "menuitem", onPress: () => choose(opt), style: ({ pressed }) => ({
                            paddingVertical: tokens.spacing.md,
                            paddingHorizontal: tokens.spacing.lg,
                            backgroundColor: pressed ? colors.border : 'transparent',
                        }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base }, children: opt.label }) }, opt.value))) }) })) : null] }));
}
//# sourceMappingURL=AutoComplete.js.map