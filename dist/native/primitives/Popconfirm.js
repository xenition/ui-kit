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
exports.Popconfirm = Popconfirm;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Themed confirmation bubble — the native mirror of the web `Popconfirm`. RN
 * has no anchored DOM portal, so the confirm bubble opens in a centered `Modal`
 * over a translucent backdrop rather than floating next to the trigger (native
 * simplification). Mirrors the web `onConfirm` / `confirmLabel` / `cancelLabel`
 * contract. No literal colors.
 */
function Popconfirm({ trigger, message, onConfirm, onCancel, confirmLabel = 'Confirm', cancelLabel = 'Cancel', }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const [open, setOpen] = React.useState(false);
    const cancel = () => {
        onCancel?.();
        setOpen(false);
    };
    /*
      The trigger IS the button. Popconfirm does not wrap it in one.
  
      On native the deepest `Pressable` under the finger wins the touch responder,
      and it wins it whether or not it has an `onPress` of its own. So wrapping the
      trigger in Popconfirm's own `Pressable` only ever worked while the trigger was
      inert: pass the obvious thing — a kit `<Button>`, which is a `Pressable` — and
      the Button claims the responder, the wrapper's `onPress` never fires, and the
      confirm bubble never opens. Every destructive action in an app built on this
      kit was silently a no-op, and apps had to neutralise their own triggers with
      `<View pointerEvents="none">` to get the tap back — which then made the
      trigger's `disabled` cosmetic, because the wrapper opened the dialog anyway.
      The kit's own test hid all of it for one reason: it passed a bare `<Text>`.
  
      Cloning the trigger and injecting `onPress` fixes it at the root. There is one
      pressable instead of two nested ones, so there is no responder to lose; a
      `disabled` trigger stays disabled, because the press dies in the trigger's own
      `Pressable`, which is what `disabled` means; and the `<button>`-inside-a-
      `<button>` nesting the old wrapper was careful to avoid under react-native-web
      cannot arise at all now, because there is no wrapper left to be a button.
  
      Anything the trigger already does on press runs first, then the bubble opens.
      A non-element trigger (a bare string) has nothing to clone onto — and nothing
      that could steal the responder either — so it keeps the transparent wrapper.
    */
    const renderedTrigger = React.isValidElement(trigger) ? (React.cloneElement(trigger, {
        onPress: (event) => {
            trigger.props.onPress?.(event);
            setOpen(true);
        },
    })) : ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { onPress: () => setOpen(true), children: trigger }));
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [renderedTrigger, (0, jsx_runtime_1.jsx)(react_native_1.Modal, { visible: open, transparent: true, animationType: "fade", onRequestClose: cancel, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: tokens.spacing.lg }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityLabel: "Close", onPress: cancel, style: {
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: colors.onSurface,
                                opacity: 0.5,
                            } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "alert", style: {
                                width: 240,
                                maxWidth: '100%',
                                backgroundColor: colors.surface,
                                borderColor: colors.border,
                                borderWidth: 1,
                                borderRadius: tokens.radius.md,
                                padding: tokens.spacing.md,
                            }, children: [typeof message === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.sm, color: colors.onSurface, marginBottom: tokens.spacing.md }, children: message })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginBottom: tokens.spacing.md }, children: message })), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'flex-end', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", onPress: cancel, style: {
                                                borderRadius: tokens.radius.sm,
                                                paddingVertical: tokens.spacing.xs,
                                                paddingHorizontal: tokens.spacing.sm,
                                            }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, color: colors.muted }, children: cancelLabel }) }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", onPress: () => {
                                                onConfirm();
                                                setOpen(false);
                                            }, style: {
                                                backgroundColor: colors.danger,
                                                borderRadius: tokens.radius.sm,
                                                paddingVertical: tokens.spacing.xs,
                                                paddingHorizontal: tokens.spacing.sm,
                                            }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, color: colors.onPrimary }, children: confirmLabel }) })] })] })] }) })] }));
}
//# sourceMappingURL=Popconfirm.js.map