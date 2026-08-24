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
exports.TagInput = TagInput;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Free-text token input — type and submit (return) to add a chip; press a chip's
 * ✕ (or backspace on the empty field) to remove one. Selected tokens render as
 * token-bound chips; the wrapper border flips to `danger` when `invalid`. All
 * colors, radii, and spacing come from `useXenitionTheme()`. No literal colors.
 */
function TagInput({ value = [], onChange, placeholder = 'Add a tag…', dedupe = true, invalid = false, disabled = false, accessibilityLabel = 'Add a tag', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const [draft, setDraft] = React.useState('');
    const add = () => {
        const t = draft.trim();
        if (!t)
            return;
        if (dedupe && value.some((v) => v.toLowerCase() === t.toLowerCase())) {
            setDraft('');
            return;
        }
        onChange?.([...value, t]);
        setDraft('');
    };
    const removeAt = (index) => {
        onChange?.(value.filter((_, i) => i !== index));
    };
    const onKeyPress = (e) => {
        if (e.nativeEvent.key === 'Backspace' && draft.length === 0 && value.length > 0) {
            removeAt(value.length - 1);
        }
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: tokens.spacing.xs,
                backgroundColor: colors.surface,
                borderWidth: 1,
                borderColor: invalid ? colors.danger : colors.border,
                borderRadius: tokens.radius.sm,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.md,
                opacity: disabled ? 0.5 : 1,
            },
            style,
        ], children: [value.map((tag, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.xs,
                    backgroundColor: colors.accent,
                    borderRadius: tokens.radius.full,
                    paddingVertical: 2,
                    paddingHorizontal: tokens.spacing.sm,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onAccent, fontSize: tokens.typography.scale.xs }, children: tag }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Remove ${tag}`, disabled: disabled, onPress: () => removeAt(i), hitSlop: 6, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onAccent, fontSize: tokens.typography.scale.xs }, children: "\u2715" }) })] }, `${tag}-${i}`))), (0, jsx_runtime_1.jsx)(react_native_1.TextInput, { editable: !disabled, accessibilityLabel: accessibilityLabel, value: draft, onChangeText: setDraft, onSubmitEditing: add, onKeyPress: onKeyPress, blurOnSubmit: false, placeholder: value.length === 0 ? placeholder : '', placeholderTextColor: colors.muted, returnKeyType: "done", style: {
                    flexGrow: 1,
                    minWidth: 80,
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.base,
                    padding: 0,
                } })] }));
}
//# sourceMappingURL=TagInput.js.map