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
exports.Lightbox = Lightbox;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const useReducedMotion_1 = require("../primitives/internal/useReducedMotion");
const color_1 = require("../primitives/internal/color");
// Horizontal swipe distance (px) that commits to a prev/next navigation.
const SWIPE_THRESHOLD = 60;
/**
 * Fullscreen overlay media viewer — the native mirror of the web `Lightbox`.
 * A transparent RN `Modal` (`animationType` fade, dropped to `none` under the
 * OS "Reduce Motion" setting) with a token-styled backdrop derived from the
 * darkest neutral token, prev/next `Pressable` controls, and horizontal swipe
 * navigation via `PanResponder` (RN core — no extra gesture dependency). The
 * Android hardware back button routes through `onRequestClose` → `onClose`.
 * Renders nothing when `index` is `null` or out of range. Presentational — the
 * parent owns `index` and the prev/next handlers.
 */
function Lightbox({ items, index, onClose, onPrev, onNext, loop = false, label = 'Media viewer', closeLabel = 'Close', prevLabel = 'Previous', nextLabel = 'Next', }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const reduced = (0, useReducedMotion_1.useReducedMotion)();
    const open = index !== null && index >= 0 && index < items.length;
    const hasPrev = open && (loop || index > 0);
    const hasNext = open && (loop || index < items.length - 1);
    // Latest handlers/flags read by the PanResponder without re-creating it.
    const nav = React.useRef({ onPrev, onNext, hasPrev, hasNext });
    nav.current = { onPrev, onNext, hasPrev, hasNext };
    const panResponder = React.useMemo(() => react_native_1.PanResponder.create({
        onMoveShouldSetPanResponder: (_evt, g) => Math.abs(g.dx) > 12 && Math.abs(g.dx) > Math.abs(g.dy),
        onPanResponderRelease: (_evt, g) => {
            const n = nav.current;
            if (g.dx <= -SWIPE_THRESHOLD && n.hasNext)
                n.onNext?.();
            else if (g.dx >= SWIPE_THRESHOLD && n.hasPrev)
                n.onPrev?.();
        },
    }), []);
    if (!open)
        return null;
    const item = items[index];
    const controlStyle = {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: tokens.radius.full,
        backgroundColor: colors.surface,
    };
    const controlText = { color: colors.onSurface, fontSize: tokens.typography.scale.lg };
    return ((0, jsx_runtime_1.jsx)(react_native_1.Modal, { visible: true, transparent: true, animationType: reduced ? 'none' : 'fade', onRequestClose: onClose, accessibilityViewIsModal: true, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "none", accessibilityLabel: label, style: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                padding: tokens.spacing.lg,
                backgroundColor: (0, color_1.withAlpha)(tokens.ramps.neutral[950], 0.88),
            }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityLabel: `${closeLabel} backdrop`, onPress: onClose, style: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 } }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: closeLabel, onPress: onClose, style: {
                        position: 'absolute',
                        right: tokens.spacing.lg,
                        top: tokens.spacing.lg,
                        ...controlStyle,
                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: controlText, children: "\u00D7" }) }), hasPrev ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: prevLabel, onPress: onPrev, style: { position: 'absolute', left: tokens.spacing.lg, top: '45%', ...controlStyle }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: controlText, children: "\u2039" }) })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { ...panResponder.panHandlers, style: { alignItems: 'center', gap: tokens.spacing.sm, maxWidth: '100%' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: item.url }, accessible: true, accessibilityLabel: item.alt ?? item.caption ?? '', resizeMode: "contain", style: {
                                width: 320,
                                height: 320,
                                maxWidth: '100%',
                                borderRadius: tokens.radius.md,
                            } }), item.caption ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                textAlign: 'center',
                                color: tokens.ramps.neutral[50],
                                fontSize: tokens.typography.scale.sm,
                            }, children: item.caption })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.Text, { testID: "xen-lightbox-counter", style: { color: tokens.ramps.neutral[50], fontSize: tokens.typography.scale.xs }, children: [index + 1, " / ", items.length] })] }), hasNext ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: nextLabel, onPress: onNext, style: { position: 'absolute', right: tokens.spacing.lg, top: '45%', ...controlStyle }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: controlText, children: "\u203A" }) })) : null] }) }));
}
//# sourceMappingURL=Lightbox.js.map