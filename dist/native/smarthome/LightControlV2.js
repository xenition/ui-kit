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
exports.LightControlV2 = LightControlV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const react_native_svg_1 = __importStar(require("react-native-svg"));
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
/**
 * LightControl — alternate design **V2**: a card built around a circular
 * **brightness ring** (SVG). The ring fills to the current brightness in the
 * `warn` slot when lit (`muted` when off/offline) with the percentage large in
 * its center; below sits a warm→cool color-temp {@link Slider} (shown only when
 * `colorTemp` is provided). A header row keeps the bulb glyph, name, a text
 * `On`/`Off`/`Offline` status (never color-alone), and the power {@link Switch}.
 * Drop-in replacement for `LightControl` — same props. Ring circumference math is
 * guarded and brightness is clamped to `[0,100]`.
 */
function LightControlV2({ name, on = false, brightness = 0, colorTemp, offline = false, onToggle, onBrightnessChange, onColorTempChange, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const lit = on && !offline;
    const disabled = offline || !on;
    const shownBrightness = Math.round(Math.min(Math.max(brightness, 0), 100));
    const statusLabel = offline ? 'Offline' : on ? 'On' : 'Off';
    const ringColor = lit ? colors.warn : colors.muted;
    const warmTint = tokens.ramps.accent[300];
    const coolTint = tokens.ramps.accent[600];
    const size = 132;
    const stroke = 12;
    const radius = size / 2 - stroke / 2;
    const circumference = Math.max(2 * Math.PI * radius, 1);
    const dash = (shownBrightness / 100) * circumference;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.md,
                backgroundColor: colors.surface,
                borderWidth: 1,
                borderColor: lit ? (0, color_1.withAlpha)(colors.warn, 0.35) : colors.border,
                opacity: offline ? 0.7 : 1,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 36,
                            height: 36,
                            borderRadius: tokens.radius.md,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: lit ? (0, color_1.withAlpha)(colors.warn, 0.14) : colors.surface,
                            borderWidth: 1,
                            borderColor: lit ? colors.warn : colors.border,
                        }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83D\uDCA1", color: lit ? 'warn' : 'muted', size: "lg" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: name }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: statusLabel })] }), (0, jsx_runtime_1.jsx)(primitives_1.Switch, { checked: on, disabled: offline, onCheckedChange: onToggle, accessibilityLabel: `${name} power` })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', marginTop: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { width: size, height: size, alignItems: 'center', justifyContent: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_svg_1.default, { width: size, height: size, viewBox: `0 0 ${size} ${size}`, children: (0, jsx_runtime_1.jsxs)(react_native_svg_1.G, { rotation: -90, originX: size / 2, originY: size / 2, children: [(0, jsx_runtime_1.jsx)(react_native_svg_1.Circle, { cx: size / 2, cy: size / 2, r: radius, fill: "none", stroke: colors.border, strokeWidth: stroke }), (0, jsx_runtime_1.jsx)(react_native_svg_1.Circle, { cx: size / 2, cy: size / 2, r: radius, fill: "none", stroke: ringColor, strokeWidth: stroke, strokeLinecap: "round", strokeDasharray: `${dash} ${circumference}` })] }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { position: 'absolute', alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '700' }, children: `${shownBrightness}%` }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "Brightness" })] })] }), (0, jsx_runtime_1.jsx)(primitives_1.Slider, { value: shownBrightness, min: 0, max: 100, step: 1, disabled: disabled, onValueChange: onBrightnessChange, style: { alignSelf: 'stretch', marginTop: tokens.spacing.sm } })] }), colorTemp != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { marginTop: tokens.spacing.md, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: warmTint, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: "Warm" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: coolTint, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: "Cool" })] }), (0, jsx_runtime_1.jsx)(primitives_1.Slider, { value: Math.min(Math.max(colorTemp, 0), 100), min: 0, max: 100, step: 1, disabled: disabled, onValueChange: onColorTempChange })] })) : null] }));
}
//# sourceMappingURL=LightControlV2.js.map