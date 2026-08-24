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
exports.BeforeAfter = BeforeAfter;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const clamp = (n) => Math.max(0, Math.min(100, n));
/**
 * A before/after image comparison built from plain styled `View`s + `Image`
 * (no gesture library). `variant="split"` overlays the "after" image clipped to
 * `position`% width with a divider and −/+ nudge buttons; `variant="toggle"`
 * swaps between the two full images on tap. Missing images render a token-tinted
 * placeholder. Divider/labels use `withAlpha` tints — token-only colors.
 */
function BeforeAfter({ beforeUrl, afterUrl, position = 50, variant = 'split', height = 220, beforeLabel = 'Before', afterLabel = 'After', onPositionChange, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const [showAfter, setShowAfter] = React.useState(false);
    const pos = clamp(position);
    const placeholder = (label) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.12) }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: label }) }));
    const tag = (label, side) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
            position: 'absolute',
            bottom: tokens.spacing.sm,
            [side]: tokens.spacing.sm,
            borderRadius: tokens.radius.sm,
            paddingHorizontal: tokens.spacing.sm,
            paddingVertical: 2,
            backgroundColor: (0, color_1.withAlpha)(colors.onSurface, 0.55),
        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.surface, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: label }) }));
    if (variant === 'toggle') {
        const label = showAfter ? afterLabel : beforeLabel;
        const url = showAfter ? afterUrl : beforeUrl;
        return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Showing ${label}. Tap to compare.`, onPress: () => setShowAfter((v) => !v), style: [
                { height, borderRadius: tokens.radius.lg, overflow: 'hidden', borderWidth: 1, borderColor: colors.border },
                style,
            ], children: [url ? (0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: url }, resizeMode: "cover", style: { flex: 1 } }) : placeholder(label), tag(label, 'left')] }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `Before and after comparison, ${pos}% after`, style: [
            { height, borderRadius: tokens.radius.lg, overflow: 'hidden', borderWidth: 1, borderColor: colors.border },
            style,
        ], children: [beforeUrl ? (0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: beforeUrl }, resizeMode: "cover", style: { ...absoluteFill } }) : placeholder(beforeLabel), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { ...absoluteFill, width: `${pos}%`, overflow: 'hidden' }, children: afterUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: afterUrl }, resizeMode: "cover", style: { height, width: '100%' } })) : (placeholder(afterLabel)) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', top: 0, bottom: 0, left: `${pos}%`, width: 2, backgroundColor: colors.surface } }), tag(beforeLabel, 'right'), tag(afterLabel, 'left'), onPositionChange ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { position: 'absolute', top: tokens.spacing.sm, right: tokens.spacing.sm, flexDirection: 'row', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(NudgeButton, { label: "Show less after", glyph: "\u2212", onPress: () => onPositionChange(clamp(pos - 10)) }), (0, jsx_runtime_1.jsx)(NudgeButton, { label: "Show more after", glyph: "+", onPress: () => onPositionChange(clamp(pos + 10)) })] })) : null] }));
}
const absoluteFill = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 };
function NudgeButton({ label, glyph, onPress }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, onPress: onPress, style: ({ pressed }) => ({
            width: 28,
            height: 28,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: tokens.radius.full,
            backgroundColor: (0, color_1.withAlpha)(colors.onSurface, 0.55),
            opacity: pressed ? 0.8 : 1,
        }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.surface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: glyph }) }));
}
//# sourceMappingURL=BeforeAfter.js.map