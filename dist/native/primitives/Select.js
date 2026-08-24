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
exports.Select = Select;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Themed select — the native mirror of the web `Select`. RN has no `<select>`,
 * so this is a token-bound `Pressable` that opens a `Modal` option sheet. Pass
 * choices as `options` data (not `<option>` children) and drive it with the
 * `value` / `onValueChange` contract. No literal colors.
 */
function Select({ options, value, onValueChange, placeholder = 'Select…', invalid = false, disabled = false, accessibilityLabel, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const [open, setOpen] = React.useState(false);
    const selected = options.find((o) => o.value === value);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { disabled, expanded: open }, accessibilityLabel: accessibilityLabel, disabled: disabled, onPress: () => setOpen(true), style: ({ pressed }) => [
                    {
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: colors.surface,
                        borderWidth: 1,
                        borderColor: invalid ? colors.danger : colors.border,
                        borderRadius: tokens.radius.sm,
                        paddingVertical: tokens.spacing.sm,
                        paddingHorizontal: tokens.spacing.md,
                        opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
                    },
                    style,
                ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: selected ? colors.onSurface : colors.muted,
                            fontSize: tokens.typography.scale.base,
                        }, children: selected ? selected.label : placeholder }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "\u25BE" })] }), (0, jsx_runtime_1.jsx)(react_native_1.Modal, { visible: open, transparent: true, animationType: "fade", onRequestClose: () => setOpen(false), children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, justifyContent: 'center', padding: tokens.spacing.lg }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityLabel: "Close", onPress: () => setOpen(false), style: {
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: tokens.ramps.neutral[950],
                                opacity: 0.5,
                            } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                maxHeight: '70%',
                                backgroundColor: colors.surface,
                                borderColor: colors.border,
                                borderWidth: 1,
                                borderRadius: tokens.radius.lg,
                                overflow: 'hidden',
                            }, children: (0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { children: options.map((opt) => {
                                    const active = opt.value === value;
                                    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "menuitem", accessibilityState: { selected: active }, onPress: () => {
                                            onValueChange?.(opt.value);
                                            setOpen(false);
                                        }, style: ({ pressed }) => ({
                                            paddingVertical: tokens.spacing.md,
                                            paddingHorizontal: tokens.spacing.lg,
                                            backgroundColor: pressed ? colors.border : 'transparent',
                                        }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                                color: active ? colors.primary : colors.onSurface,
                                                fontSize: tokens.typography.scale.base,
                                                fontWeight: active ? '600' : '400',
                                            }, children: opt.label }) }, opt.value));
                                }) }) })] }) })] }));
}
//# sourceMappingURL=Select.js.map