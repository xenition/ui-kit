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
exports.SplitButton = SplitButton;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * A primary action fused to a caret that toggles an inline menu of secondary
 * actions. `primary` fills with `colors.primary`; `secondary` is outlined. The
 * menu drops in below the button (no portal/modal). All colors, radii and
 * spacing come from the compiled theme tokens via `useXenitionTheme()` — no
 * literal colors.
 */
function SplitButton({ label, onPress, actions, variant = 'primary', disabled = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const [open, setOpen] = React.useState(false);
    const filled = variant === 'primary';
    const bg = filled ? colors.primary : 'transparent';
    const fg = filled ? colors.onPrimary : colors.primary;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: style, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignSelf: 'flex-start',
                    borderRadius: tokens.radius.md,
                    borderWidth: filled ? 0 : 1,
                    borderColor: colors.primary,
                    overflow: 'hidden',
                    opacity: disabled ? 0.5 : 1,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { disabled }, disabled: disabled, onPress: onPress, style: {
                            backgroundColor: bg,
                            paddingHorizontal: tokens.spacing.lg,
                            paddingVertical: tokens.spacing.sm,
                        }, children: typeof label === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: fg, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: label })) : (label) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 1, backgroundColor: filled ? colors.onPrimary : colors.primary, opacity: 0.4 } }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "More actions", accessibilityState: { disabled, expanded: open }, disabled: disabled, onPress: () => setOpen((o) => !o), style: {
                            backgroundColor: bg,
                            paddingHorizontal: tokens.spacing.sm,
                            paddingVertical: tokens.spacing.sm,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: fg, fontSize: tokens.typography.scale.xs, transform: [{ rotate: open ? '180deg' : '0deg' }] }, children: "\u25BE" }) })] }), open ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    marginTop: tokens.spacing.xs,
                    alignSelf: 'flex-start',
                    minWidth: 160,
                    borderWidth: 1,
                    borderColor: colors.border,
                    borderRadius: tokens.radius.md,
                    backgroundColor: colors.surface,
                    paddingVertical: tokens.spacing.xs,
                }, children: actions.map((action) => {
                    const color = action.disabled
                        ? colors.muted
                        : action.destructive
                            ? colors.danger
                            : colors.onSurface;
                    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { disabled: action.disabled }, disabled: action.disabled, onPress: () => {
                            setOpen(false);
                            action.onPress?.();
                        }, style: { paddingHorizontal: tokens.spacing.md, paddingVertical: tokens.spacing.sm }, children: typeof action.label === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color, fontSize: tokens.typography.scale.sm }, children: action.label })) : (action.label) }, action.key));
                }) })) : null] }));
}
//# sourceMappingURL=SplitButton.js.map