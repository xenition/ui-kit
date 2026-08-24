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
exports.Tooltip = Tooltip;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Themed tooltip — the native mirror of the web `Tooltip`. Native has no hover,
 * so the tip is revealed by press / long-press on the trigger instead of
 * mouse-enter, and shows as a centered `Modal` bubble rather than a bubble
 * anchored to `side` (native simplification — `side` is kept for prop parity
 * only). The bubble uses the inverted `onSurface`/`surface` token pair. No
 * literal colors.
 */
function Tooltip({ label, side = 'top', children }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const [open, setOpen] = React.useState(false);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { onPress: () => setOpen((o) => !o), onLongPress: () => setOpen(true), children: children }), (0, jsx_runtime_1.jsx)(react_native_1.Modal, { visible: open, transparent: true, animationType: "fade", onRequestClose: () => setOpen(false), children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: tokens.spacing.lg }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityLabel: "Close", onPress: () => setOpen(false), style: {
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: colors.onSurface,
                                opacity: 0.5,
                            } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "text", style: {
                                backgroundColor: colors.onSurface,
                                borderRadius: tokens.radius.sm,
                                paddingVertical: tokens.spacing.xs,
                                paddingHorizontal: tokens.spacing.sm,
                            }, children: typeof label === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, color: colors.surface }, children: label })) : (label) })] }) })] }));
}
//# sourceMappingURL=Tooltip.js.map