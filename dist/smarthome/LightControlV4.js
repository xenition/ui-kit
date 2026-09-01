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
exports.LightControlV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const Icon_1 = require("../primitives/Icon");
const Switch_1 = require("../primitives/Switch");
const Slider_1 = require("../primitives/Slider");
/**
 * LightControl — **V4** "ambient" design (web parity of the native V4). The
 * control-panel take on a light: when the bulb is lit the whole card glows — a
 * soft warm-tinted wash (`bg-warn/[0.08]`), a `warn` border, and a glowing bulb
 * disc (`bg-warn/15 border-warn/40`); off/`offline` stay calm `bg-surface`.
 * A big legible brightness {@link Slider} and an optional warm→cool
 * color-temperature row keep the base controls; a text `On`/`Off`/`Offline`
 * label carries the state so it never rests on color alone. Sliders disable when
 * off or `offline`. Guards keep the brightness readout in `[0,100]`. Same
 * props/behavior as {@link LightControlProps}; all colors from `--xen-*` token
 * classes (no literals).
 */
exports.LightControlV4 = React.forwardRef(function LightControlV4({ name, on = false, brightness = 0, colorTemp, offline = false, onToggle, onBrightnessChange, onColorTempChange, className, style }, ref) {
    const disabled = offline || !on;
    const lit = on && !offline;
    const shownBrightness = Math.round(Math.min(Math.max(brightness, 0), 100));
    const statusLabel = offline ? 'Offline' : on ? 'On' : 'Off';
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, style: style, variant: "flat", className: (0, cn_1.cn)('border', lit ? 'border-warn/50 bg-warn/[0.08] shadow-md' : 'border-border bg-surface shadow-sm', offline && 'opacity-70', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-11 w-11 items-center justify-center rounded-[var(--xen-radius-md)] border', lit ? 'border-warn/40 bg-warn/15' : 'border-border bg-on-surface/5'), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDCA1", color: lit ? 'warn' : 'muted', size: "lg" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-base font-bold text-on-surface", children: name }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: statusLabel })] }), (0, jsx_runtime_1.jsx)(Switch_1.Switch, { checked: on, disabled: offline, onCheckedChange: onToggle, "aria-label": `${name} power` })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-md)] flex flex-col gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: "Brightness" }), (0, jsx_runtime_1.jsxs)("span", { className: "text-xs font-semibold text-on-surface", children: [shownBrightness, "%"] })] }), (0, jsx_runtime_1.jsx)(Slider_1.Slider, { value: shownBrightness, min: 0, max: 100, step: 1, disabled: disabled, onChange: (v) => onBrightnessChange?.(v) })] }), colorTemp != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-md)] flex flex-col gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-warn", children: "Warm" }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-primary", children: "Cool" })] }), (0, jsx_runtime_1.jsx)(Slider_1.Slider, { value: Math.min(Math.max(colorTemp, 0), 100), min: 0, max: 100, step: 1, disabled: disabled, onChange: (v) => onColorTempChange?.(v) })] })) : null] }));
});
//# sourceMappingURL=LightControlV4.js.map