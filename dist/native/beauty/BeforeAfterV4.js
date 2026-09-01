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
exports.BeforeAfterV4 = BeforeAfterV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const color_1 = require("../primitives/internal/color");
const salon_v4_1 = require("./internal/salon-v4");
const clamp = (n) => Math.max(0, Math.min(100, Number.isFinite(n) ? n : 50));
/**
 * **V4 before / after** — same props as {@link BeforeAfter} plus `draggable`,
 * `step`, `lessLabel`, `moreLabel` and `placeholderLabel`.
 *
 * ## The change this component exists for
 *
 * **The base could not be slid.** `variant="split"` drew a divider at
 * `position` and offered two −/+ buttons that stepped 10% at a time. There was
 * no drag. A before/after comparison is *the* gesture-first control in a
 * beauty app, and it shipped as a pair of nudge buttons.
 *
 * V4 adds a real drag — a `PanResponder` on a grab area wide enough for a
 * thumb, over a divider still drawn as a hairline — and **keeps the nudge
 * buttons**. They are the switch-control and assistive path, and trading one
 * group of users for another is not an upgrade.
 *
 * ## Three more
 *
 * 1. **The divider reports itself as a slider** with a real value, so a
 *    screen reader says "50 percent after" and an assistive pointer can move
 *    it.
 * 2. **The placeholder is `colors.muted`**, not a translucent wash of it that
 *    borrows whatever is behind the panel.
 * 3. **The tag chips use the scrim colour**, which is dark in both schemes —
 *    the base mixed `onSurface`, which inverts, so on a dark page the labels
 *    were dark text on a near-white chip over a photograph.
 */
function BeforeAfterV4({ beforeUrl, afterUrl, position = 50, variant = 'split', height = 220, beforeLabel = 'Before', afterLabel = 'After', draggable = true, step = 10, lessLabel = 'Show less after', moreLabel = 'Show more after', placeholderLabel, onPositionChange, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const [showAfter, setShowAfter] = React.useState(false);
    const [width, setWidth] = React.useState(0);
    const pos = clamp(position);
    // The responder reads the latest values without being rebuilt each render.
    const live = React.useRef({ width, onPositionChange });
    live.current = { width, onPositionChange };
    const panResponder = React.useMemo(() => react_native_1.PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_e, g) => Math.abs(g.dx) > salon_v4_1.DRAG_SLOP,
        onPanResponderMove: (e) => {
            const { width: w, onPositionChange: cb } = live.current;
            if (!w || !cb)
                return;
            cb(clamp((e.nativeEvent.locationX / w) * 100));
        },
    }), []);
    const placeholder = (label) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.muted,
        }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "onSurface", children: placeholderLabel ?? label }) }));
    const tag = (label, side) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
            position: 'absolute',
            bottom: tokens.spacing.sm,
            [side]: tokens.spacing.sm,
            borderRadius: tokens.radius.sm,
            paddingHorizontal: tokens.spacing.sm,
            paddingVertical: tokens.spacing.xs / 2,
            // The shadow colour does not invert with the scheme; `onSurface` does,
            // so the base's chip turned near-white on a dark page.
            backgroundColor: (0, color_1.withAlpha)(theme.elevation.sheet.color, 0.6),
        }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "bold", style: { color: tokens.ramps.neutral[50] }, children: label }) }));
    if (variant === 'toggle') {
        const label = showAfter ? afterLabel : beforeLabel;
        const url = showAfter ? afterUrl : beforeUrl;
        return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Showing ${label}. Tap to compare.`, onPress: () => setShowAfter((v) => !v), style: [
                {
                    height,
                    borderRadius: tokens.radius.lg,
                    overflow: 'hidden',
                    borderWidth: 1,
                    borderColor: colors.border,
                },
                style,
            ], children: [url ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: url }, resizeMode: "cover", style: { flex: 1 } })) : (placeholder(label)), tag(label, 'left')] }));
    }
    const handle = tokens.spacing.md * salon_v4_1.HANDLE_STEP;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { onLayout: (e) => setWidth(e.nativeEvent.layout.width), accessibilityRole: "adjustable", accessibilityLabel: `${beforeLabel} and ${afterLabel} comparison`, accessibilityValue: { min: 0, max: 100, now: Math.round(pos) }, accessibilityActions: [{ name: 'increment' }, { name: 'decrement' }], onAccessibilityAction: (e) => {
                    if (!onPositionChange)
                        return;
                    if (e.nativeEvent.actionName === 'increment')
                        onPositionChange(clamp(pos + step));
                    if (e.nativeEvent.actionName === 'decrement')
                        onPositionChange(clamp(pos - step));
                }, style: {
                    height,
                    borderRadius: tokens.radius.lg,
                    overflow: 'hidden',
                    borderWidth: 1,
                    borderColor: colors.border,
                }, ...(draggable && onPositionChange ? panResponder.panHandlers : {}), children: [beforeUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: beforeUrl }, resizeMode: "cover", style: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 } })) : (placeholder(beforeLabel)), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            bottom: 0,
                            width: `${pos}%`,
                            overflow: 'hidden',
                        }, children: afterUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: afterUrl }, resizeMode: "cover", style: { height, width: '100%' } })) : (placeholder(afterLabel)) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { pointerEvents: "none", style: {
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            left: `${pos}%`,
                            marginLeft: -handle / 2,
                            width: handle,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', top: 0, bottom: 0, width: 1, backgroundColor: colors.surface } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    width: handle,
                                    height: handle,
                                    borderRadius: tokens.radius.full,
                                    backgroundColor: colors.surface,
                                    borderWidth: 1,
                                    borderColor: colors.border,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }, children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "sort", size: "xs", color: "onSurface" }) })] }), tag(beforeLabel, 'right'), tag(afterLabel, 'left')] }), onPositionChange ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm, justifyContent: 'center' }, children: [
                    { label: lessLabel, glyph: '−', to: clamp(pos - step) },
                    { label: moreLabel, glyph: '+', to: clamp(pos + step) },
                ].map((b) => ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: b.label, onPress: () => onPositionChange(b.to), style: {
                        width: (0, chrome_v4_1.minTap)(tokens.spacing),
                        height: (0, chrome_v4_1.minTap)(tokens.spacing),
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: tokens.radius.full,
                        borderWidth: 1,
                        borderColor: colors.border,
                        backgroundColor: colors.card,
                    }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onCard", children: b.glyph }) }, b.label))) })) : null] }));
}
//# sourceMappingURL=BeforeAfterV4.js.map