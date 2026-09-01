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
exports.ThermostatDialV4 = ThermostatDialV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const react_native_svg_1 = __importStar(require("react-native-svg"));
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const MODE_ACCENT = {
    heat: 'warn',
    cool: 'primary',
    auto: 'accent',
    off: 'muted',
};
const MODE_LABEL = {
    heat: 'Heating',
    cool: 'Cooling',
    auto: 'Auto',
    off: 'Off',
};
function polar(cx, cy, r, angle) {
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
}
/**
 * ThermostatDial — **V4** "ambient" design. A calm climate dial: the big target
 * numeral sits centered over an optional ambient reading inside a token-bound SVG
 * dial (drawn with the `react-native-svg` peer). A 270° track (`border`) carries a
 * value arc filled in the mode accent (`heat`→warn, `cool`→primary, `auto`→accent,
 * `off`→muted); when running, the dial disc lights with a soft accent wash so the
 * active mode glows. Framing `+`/`−` `Pressable`s step the target within
 * `[min,max]`, and a text label announces the mode (never color alone).
 * `max`/`min` guard the fraction math against divide-by-zero. `offline` dims the
 * dial and blocks changes. Same props/behavior as {@link ThermostatDialProps};
 * token-only colors via `useXenitionTheme()` (+ `withAlpha`).
 */
function ThermostatDialV4({ target, ambient, min = 10, max = 30, step = 0.5, mode = 'heat', unit = '°', size = 200, onTargetChange, offline = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const accent = offline ? 'muted' : MODE_ACCENT[mode];
    const accentColor = colors[accent];
    const glowing = !offline && mode !== 'off';
    const thickness = Math.max(8, Math.round(size * 0.06));
    const cx = size / 2;
    const cy = size / 2;
    const r = size / 2 - thickness / 2;
    // 270° sweep centered at the bottom: from 135° round to 405° (=45°).
    const startA = (135 * Math.PI) / 180;
    const sweep = (270 * Math.PI) / 180;
    const span = Math.max(max - min, 1);
    const clampedTarget = Math.min(Math.max(target, min), max);
    const frac = (clampedTarget - min) / span;
    const endA = startA + frac * sweep;
    const trackStart = polar(cx, cy, r, startA);
    const trackEnd = polar(cx, cy, r, startA + sweep);
    const valEnd = polar(cx, cy, r, endA);
    const largeTrack = 1; // 270° always > 180°
    const largeVal = endA - startA > Math.PI ? 1 : 0;
    const bump = (dir) => {
        if (offline || !onTargetChange)
            return;
        const next = Math.min(Math.max(clampedTarget + dir * step, min), max);
        onTargetChange(next);
    };
    // Inset diameter for the glowing dial disc that sits inside the arc.
    const discSize = size - thickness * 2 - 8;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "adjustable", accessibilityLabel: `Thermostat, ${offline ? 'Offline' : MODE_LABEL[mode]}`, style: [{ alignItems: 'center', opacity: offline ? 0.6 : 1 }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { width: size, height: size, alignItems: 'center', justifyContent: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "none", style: {
                            position: 'absolute',
                            width: discSize,
                            height: discSize,
                            borderRadius: discSize / 2,
                            backgroundColor: glowing ? (0, color_1.withAlpha)(accentColor, 0.08) : colors.surface,
                            borderWidth: 1,
                            borderColor: glowing ? (0, color_1.withAlpha)(accentColor, 0.4) : colors.border,
                            ...(glowing
                                ? { shadowColor: accentColor, shadowOpacity: 0.18, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 3 }
                                : {}),
                        } }), (0, jsx_runtime_1.jsx)(react_native_svg_1.default, { width: size, height: size, viewBox: `0 0 ${size} ${size}`, children: (0, jsx_runtime_1.jsxs)(react_native_svg_1.G, { children: [(0, jsx_runtime_1.jsx)(react_native_svg_1.Path, { d: `M ${trackStart.x} ${trackStart.y} A ${r} ${r} 0 ${largeTrack} 1 ${trackEnd.x} ${trackEnd.y}`, fill: "none", stroke: colors.border, strokeWidth: thickness, strokeLinecap: "round" }), (0, jsx_runtime_1.jsx)(react_native_svg_1.Path, { d: `M ${trackStart.x} ${trackStart.y} A ${r} ${r} 0 ${largeVal} 1 ${valEnd.x} ${valEnd.y}`, fill: "none", stroke: accentColor, strokeWidth: thickness, strokeLinecap: "round" }), (0, jsx_runtime_1.jsx)(react_native_svg_1.Circle, { cx: valEnd.x, cy: valEnd.y, r: thickness / 2, fill: accentColor })] }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { position: 'absolute', alignItems: 'center' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontFamily: tokens.typography.fontHeading, fontWeight: '700' }, children: [clampedTarget, unit] }), ambient != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: `Now ${ambient}${unit}` })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: accentColor, fontSize: tokens.typography.scale.xs, fontWeight: '600', marginTop: 2 }, children: offline ? 'Offline' : MODE_LABEL[mode] })] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.xl, marginTop: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Lower target temperature", disabled: offline, onPress: () => bump(-1), style: ({ pressed }) => ({
                            width: 44,
                            height: 44,
                            borderRadius: tokens.radius.full,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderWidth: 1,
                            borderColor: colors.border,
                            backgroundColor: colors.surface,
                            opacity: offline ? 0.5 : pressed ? 0.8 : 1,
                        }), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2212", color: "onSurface", size: "xl" }) }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Raise target temperature", disabled: offline, onPress: () => bump(1), style: ({ pressed }) => ({
                            width: 44,
                            height: 44,
                            borderRadius: tokens.radius.full,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderWidth: 1,
                            borderColor: colors.border,
                            backgroundColor: colors.surface,
                            opacity: offline ? 0.5 : pressed ? 0.8 : 1,
                        }), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "+", color: "onSurface", size: "xl" }) })] })] }));
}
//# sourceMappingURL=ThermostatDialV4.js.map