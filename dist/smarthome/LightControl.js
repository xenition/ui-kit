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
exports.LightControl = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const Icon_1 = require("../primitives/Icon");
const Switch_1 = require("../primitives/Switch");
const Slider_1 = require("../primitives/Slider");
/**
 * Light controller — an on/off {@link Switch} over brightness and (optional)
 * color-temperature {@link Slider}s. The tinted bulb glyph uses the `warn` slot
 * when lit and `muted` when dark (a text `On`/`Off`/`Offline` label carries the
 * state so it never rests on color alone). Sliders are disabled when the light is
 * off or `offline`, and a warm→cool hint (token `text-warn` / `text-primary`)
 * sits under the color-temp track. Guards keep the brightness readout in
 * `[0,100]`. No literal colors.
 */
exports.LightControl = React.forwardRef(function LightControl({ name, on = false, brightness = 0, colorTemp, offline = false, onToggle, onBrightnessChange, onColorTempChange, className, style }, ref) {
    const disabled = offline || !on;
    const lit = on && !offline;
    const shownBrightness = Math.round(Math.min(Math.max(brightness, 0), 100));
    const statusLabel = offline ? 'Offline' : on ? 'On' : 'Off';
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, style: style, className: (0, cn_1.cn)(lit ? 'shadow-md' : 'shadow-sm', offline && 'opacity-70', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-9 w-9 items-center justify-center rounded-[var(--xen-radius-md)] border bg-surface', lit ? 'border-warn' : 'border-border'), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDCA1", color: lit ? 'warn' : 'muted', size: "lg" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-base font-semibold text-on-surface", children: name }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: statusLabel })] }), (0, jsx_runtime_1.jsx)(Switch_1.Switch, { checked: on, disabled: offline, onCheckedChange: onToggle, "aria-label": `${name} power` })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-md)] flex flex-col gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: "Brightness" }), (0, jsx_runtime_1.jsxs)("span", { className: "text-xs font-semibold text-on-surface", children: [shownBrightness, "%"] })] }), (0, jsx_runtime_1.jsx)(Slider_1.Slider, { value: shownBrightness, min: 0, max: 100, step: 1, disabled: disabled, onChange: (v) => onBrightnessChange?.(v) })] }), colorTemp != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-md)] flex flex-col gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-warn", children: "Warm" }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-primary", children: "Cool" })] }), (0, jsx_runtime_1.jsx)(Slider_1.Slider, { value: Math.min(Math.max(colorTemp, 0), 100), min: 0, max: 100, step: 1, disabled: disabled, onChange: (v) => onColorTempChange?.(v) })] })) : null] }));
});
//# sourceMappingURL=LightControl.js.map