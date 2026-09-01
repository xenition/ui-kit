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
exports.ThermostatDialV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
/** Mode → the CSS-var token slot used for the value arc / label / tint. */
const MODE_VAR = {
    heat: 'warn',
    cool: 'primary',
    auto: 'accent',
    off: 'muted',
};
/** Mode → the `text-*` token class for the label. */
const MODE_TEXT = {
    heat: 'text-warn',
    cool: 'text-primary',
    auto: 'text-accent',
    off: 'text-muted',
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
 * ThermostatDial — **V4** "ambient" design (web parity of the native V4). A calm
 * climate dial: the big target numeral sits centered over an optional ambient
 * reading inside a token-bound, dependency-free inline `<svg>` dial. A 270° track
 * (`var(--xen-border)`) carries a value arc filled in the mode accent
 * (`heat`→warn, `cool`→primary, `auto`→accent, `off`→muted); when running, the
 * dial disc lights with a soft accent wash so the active mode glows. Framing
 * `+`/`−` buttons step the target within `[min,max]`, and a text label announces
 * the mode (never color alone). `span` guards the fraction math against
 * divide-by-zero. `offline` dims the dial and blocks changes. Same props/behavior
 * as {@link ThermostatDialProps}; all colors from `--xen-*` tokens (no literals).
 */
exports.ThermostatDialV4 = React.forwardRef(function ThermostatDialV4({ target, ambient, min = 10, max = 30, step = 0.5, mode = 'heat', unit = '°', size = 200, onTargetChange, offline = false, className, style }, ref) {
    const modeVar = MODE_VAR[mode];
    const accentVar = offline ? 'var(--xen-muted)' : `var(--xen-${modeVar})`;
    const accentText = offline ? 'text-muted' : MODE_TEXT[mode];
    const glowing = !offline && mode !== 'off';
    const thickness = Math.max(8, Math.round(size * 0.06));
    const cx = size / 2;
    const cy = size / 2;
    const r = size / 2 - thickness / 2;
    // 270° sweep centered at the bottom: from 135° round to 405° (=45°).
    const startA = (135 * Math.PI) / 180;
    const sweep = (270 * Math.PI) / 180;
    const span = Math.max(max - min, 1); // guard divide-by-zero
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
    const btnClass = 'flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface transition-colors hover:bg-neutral-100 disabled:pointer-events-none disabled:opacity-50';
    // Inset diameter for the glowing dial disc that sits inside the arc.
    const discSize = size - thickness * 2 - 8;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, style: style, role: "group", "aria-label": `Thermostat, ${offline ? 'Offline' : MODE_LABEL[mode]}`, className: (0, cn_1.cn)('flex flex-col items-center', offline && 'opacity-60', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative flex items-center justify-center", style: { width: size, height: size }, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('absolute rounded-full', glowing ? 'shadow-md' : ''), style: {
                            width: discSize,
                            height: discSize,
                            backgroundColor: glowing ? `color-mix(in srgb, ${accentVar} 8%, transparent)` : 'var(--xen-surface)',
                            border: `1px solid ${glowing ? `color-mix(in srgb, ${accentVar} 40%, transparent)` : 'var(--xen-border)'}`,
                        } }), (0, jsx_runtime_1.jsxs)("svg", { width: size, height: size, viewBox: `0 0 ${size} ${size}`, role: "img", "aria-label": `Setpoint ${clampedTarget}${unit}`, className: "relative", children: [(0, jsx_runtime_1.jsx)("path", { d: `M ${trackStart.x} ${trackStart.y} A ${r} ${r} 0 ${largeTrack} 1 ${trackEnd.x} ${trackEnd.y}`, fill: "none", stroke: "var(--xen-border)", strokeWidth: thickness, strokeLinecap: "round" }), (0, jsx_runtime_1.jsx)("path", { d: `M ${trackStart.x} ${trackStart.y} A ${r} ${r} 0 ${largeVal} 1 ${valEnd.x} ${valEnd.y}`, fill: "none", stroke: accentVar, strokeWidth: thickness, strokeLinecap: "round" }), (0, jsx_runtime_1.jsx)("circle", { cx: valEnd.x, cy: valEnd.y, r: thickness / 2, fill: accentVar })] }), (0, jsx_runtime_1.jsxs)("div", { className: "absolute flex flex-col items-center", children: [(0, jsx_runtime_1.jsxs)("span", { className: "font-heading text-3xl font-bold text-on-surface", children: [clampedTarget, unit] }), ambient != null ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: `Now ${ambient}${unit}` }) : null, (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('mt-0.5 text-xs font-semibold', accentText), children: offline ? 'Offline' : MODE_LABEL[mode] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-md)] flex gap-[var(--xen-space-xl)]", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", className: btnClass, disabled: offline, "aria-label": "Lower target temperature", onClick: () => bump(-1), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u2212", color: "onSurface", size: "xl" }) }), (0, jsx_runtime_1.jsx)("button", { type: "button", className: btnClass, disabled: offline, "aria-label": "Raise target temperature", onClick: () => bump(1), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "+", color: "onSurface", size: "xl" }) })] })] }));
});
//# sourceMappingURL=ThermostatDialV4.js.map