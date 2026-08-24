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
exports.Popover = Popover;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Themed popover — the native mirror of the web `Popover`. RN has no anchored
 * DOM portal, so the panel opens in a `Modal` over a translucent backdrop
 * instead of floating next to the trigger. `align` shifts the panel left /
 * center / right within the overlay but does not anchor to the trigger's
 * on-screen position (native simplification). No literal colors.
 */
function Popover({ trigger, children, align = 'start', open, onOpenChange, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const [internalOpen, setInternalOpen] = React.useState(false);
    const isControlled = open !== undefined;
    const isOpen = isControlled ? open : internalOpen;
    const setOpen = (next) => {
        if (!isControlled)
            setInternalOpen(next);
        onOpenChange?.(next);
    };
    const alignItems = align === 'end' ? 'flex-end' : align === 'center' ? 'center' : 'flex-start';
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { onPress: () => setOpen(!isOpen), children: trigger }), (0, jsx_runtime_1.jsx)(react_native_1.Modal, { visible: isOpen, transparent: true, animationType: "fade", onRequestClose: () => setOpen(false), children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, justifyContent: 'center', alignItems, padding: tokens.spacing.lg }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityLabel: "Close", onPress: () => setOpen(false), style: {
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: colors.onSurface,
                                opacity: 0.5,
                            } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityViewIsModal: true, style: [
                                {
                                    minWidth: 192,
                                    maxWidth: '100%',
                                    backgroundColor: colors.surface,
                                    borderColor: colors.border,
                                    borderWidth: 1,
                                    borderRadius: tokens.radius.md,
                                    padding: tokens.spacing.sm,
                                },
                                style,
                            ], children: children })] }) })] }));
}
//# sourceMappingURL=Popover.js.map