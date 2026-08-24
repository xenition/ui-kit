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
exports.MultiSelect = MultiSelect;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Multi-select — like the native `Select` but the sheet lets several options be
 * checked. The trigger shows the picked options as token-bound chips (or the
 * `placeholder`); the `Modal` rows show a check on the selected ones. Same
 * `options` data contract; `onChange` reports the whole next `string[]`. No
 * literal colors.
 */
function MultiSelect({ options, value = [], onChange, placeholder = 'Select…', invalid = false, disabled = false, accessibilityLabel, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const [open, setOpen] = React.useState(false);
    const selectedOptions = options.filter((o) => value.includes(o.value));
    const toggle = (v) => {
        const next = value.includes(v) ? value.filter((x) => x !== v) : [...value, v];
        onChange?.(next);
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { disabled, expanded: open }, accessibilityLabel: accessibilityLabel, disabled: disabled, onPress: () => setOpen(true), style: ({ pressed }) => [
                    {
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: tokens.spacing.sm,
                        backgroundColor: colors.surface,
                        borderWidth: 1,
                        borderColor: invalid ? colors.danger : colors.border,
                        borderRadius: tokens.radius.sm,
                        paddingVertical: tokens.spacing.sm,
                        paddingHorizontal: tokens.spacing.md,
                        opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
                    },
                    style,
                ], children: [selectedOptions.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base }, children: placeholder })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }, children: selectedOptions.map((o) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                backgroundColor: colors.accent,
                                borderRadius: tokens.radius.full,
                                paddingVertical: 2,
                                paddingHorizontal: tokens.spacing.sm,
                            }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onAccent, fontSize: tokens.typography.scale.xs }, children: o.label }) }, o.value))) })), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "\u25BE" })] }), (0, jsx_runtime_1.jsx)(react_native_1.Modal, { visible: open, transparent: true, animationType: "fade", onRequestClose: () => setOpen(false), children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, justifyContent: 'center', padding: tokens.spacing.lg }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityLabel: "Close", onPress: () => setOpen(false), style: {
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: tokens.ramps.neutral[950],
                                opacity: 0.5,
                            } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                maxHeight: '70%',
                                backgroundColor: colors.surface,
                                borderColor: colors.border,
                                borderWidth: 1,
                                borderRadius: tokens.radius.lg,
                                overflow: 'hidden',
                            }, children: [(0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { children: options.map((opt) => {
                                        const active = value.includes(opt.value);
                                        return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "checkbox", accessibilityState: { checked: active }, onPress: () => toggle(opt.value), style: ({ pressed }) => ({
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                paddingVertical: tokens.spacing.md,
                                                paddingHorizontal: tokens.spacing.lg,
                                                backgroundColor: pressed ? colors.border : 'transparent',
                                            }), children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                                        color: active ? colors.primary : colors.onSurface,
                                                        fontSize: tokens.typography.scale.base,
                                                        fontWeight: active ? '600' : '400',
                                                    }, children: opt.label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                                        color: active ? colors.primary : colors.muted,
                                                        fontSize: tokens.typography.scale.base,
                                                    }, children: active ? '✓' : '' })] }, opt.value));
                                    }) }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Done", onPress: () => setOpen(false), style: ({ pressed }) => ({
                                        alignItems: 'center',
                                        paddingVertical: tokens.spacing.md,
                                        borderTopWidth: 1,
                                        borderTopColor: colors.border,
                                        opacity: pressed ? 0.7 : 1,
                                    }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                            color: colors.primaryText,
                                            fontSize: tokens.typography.scale.base,
                                            fontWeight: '600',
                                        }, children: "Done" }) })] })] }) })] }));
}
//# sourceMappingURL=MultiSelect.js.map