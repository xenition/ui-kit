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
exports.ContextMenu = ContextMenu;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Long-press context menu — wraps `children` in a `Pressable` whose
 * `onLongPress` opens a centered, token-bound action list in a `Modal` over a
 * translucent `onSurface` scrim (RN has no anchored DOM portal). Distinct from
 * `Menu` (tap-to-open) by the long-press gesture. Selecting an action fires
 * `onSelect` and dismisses. Danger actions use the `danger` token. No literals.
 */
function ContextMenu({ actions, children, accessibilityLabel }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const [open, setOpen] = React.useState(false);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: accessibilityLabel ?? 'Open context menu', accessibilityHint: "Long press for actions", onLongPress: () => setOpen(true), delayLongPress: 350, children: children }), (0, jsx_runtime_1.jsx)(react_native_1.Modal, { visible: open, transparent: true, animationType: "fade", onRequestClose: () => setOpen(false), children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: tokens.spacing.lg }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityLabel: "Close", onPress: () => setOpen(false), style: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: colors.onSurface, opacity: 0.5 } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "menu", style: {
                                minWidth: 200,
                                maxHeight: '70%',
                                backgroundColor: colors.surface,
                                borderColor: colors.border,
                                borderWidth: 1,
                                borderRadius: tokens.radius.md,
                                overflow: 'hidden',
                            }, children: (0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { children: actions.map((action, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "menuitem", accessibilityState: { disabled: action.disabled }, disabled: action.disabled, onPress: () => {
                                        action.onSelect?.();
                                        setOpen(false);
                                    }, style: ({ pressed }) => ({
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        gap: tokens.spacing.sm,
                                        paddingVertical: tokens.spacing.md,
                                        paddingHorizontal: tokens.spacing.lg,
                                        opacity: action.disabled ? 0.5 : 1,
                                        backgroundColor: pressed ? colors.border : colors.surface,
                                    }), children: [action.icon != null ? (0, jsx_runtime_1.jsx)(react_native_1.View, { children: action.icon }) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                                fontSize: tokens.typography.scale.base,
                                                color: action.danger ? colors.danger : colors.onSurface,
                                            }, children: action.label })] }, i))) }) })] }) })] }));
}
//# sourceMappingURL=ContextMenu.js.map