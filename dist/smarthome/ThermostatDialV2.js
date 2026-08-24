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
exports.ThermostatDialV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const MODE_VAR = { heat: 'danger', cool: 'primary', auto: 'accent', off: 'muted' };
const MODE_TEXT = { heat: 'text-danger', cool: 'text-primary', auto: 'text-accent', off: 'text-muted' };
const MODE_LABEL = { heat: 'Heat', cool: 'Cool', auto: 'Auto', off: 'Off' };
/**
 * ThermostatDial, redesigned (v2): a **bold progress dial**. The setpoint arc
 * sweeps a thick ring (mode-accented) around a large centered temperature with
 * the ambient reading and mode beneath, flanked by big −/+ controls. A punchier
 * dial than v1 — same arc/token approach. Same props, token-only.
 */
exports.ThermostatDialV2 = React.forwardRef(function ThermostatDialV2({ target, ambient, min = 10, max = 30, step = 0.5, mode = 'heat', unit = '°', size = 200, onTargetChange, offline = false, className, style }, ref) {
    const clampedTarget = Math.min(max, Math.max(min, target));
    const pct = max > min ? (clampedTarget - min) / (max - min) : 0;
    const thickness = 16;
    const r = (size - thickness) / 2;
    const c = 2 * Math.PI * r;
    const accentVar = offline ? 'var(--xen-muted)' : `var(--xen-${MODE_VAR[mode]})`;
    const accentText = offline ? 'text-muted' : MODE_TEXT[mode];
    const bump = (dir) => {
        if (offline || !onTargetChange)
            return;
        onTargetChange(Math.min(max, Math.max(min, clampedTarget + dir * step)));
    };
    const btn = 'flex h-11 w-11 items-center justify-center rounded-full bg-neutral-100 text-on-surface disabled:opacity-50';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-thermostat-dial": "", "aria-label": `Thermostat, ${offline ? 'Offline' : MODE_LABEL[mode]}`, style: style, className: (0, cn_1.cn)('flex items-center gap-4', offline && 'opacity-60', className), children: [(0, jsx_runtime_1.jsx)("button", { type: "button", className: btn, disabled: offline, "aria-label": "Lower target temperature", onClick: () => bump(-1), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u2212", color: "onSurface", size: "xl" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "relative flex items-center justify-center", style: { width: size, height: size }, children: [(0, jsx_runtime_1.jsxs)("svg", { width: size, height: size, viewBox: `0 0 ${size} ${size}`, role: "img", "aria-label": `Setpoint ${clampedTarget}${unit}`, children: [(0, jsx_runtime_1.jsx)("circle", { cx: size / 2, cy: size / 2, r: r, fill: "none", stroke: "var(--xen-border)", strokeWidth: thickness }), (0, jsx_runtime_1.jsx)("circle", { cx: size / 2, cy: size / 2, r: r, fill: "none", stroke: accentVar, strokeWidth: thickness, strokeLinecap: "round", strokeDasharray: `${c * pct} ${c}`, transform: `rotate(-90 ${size / 2} ${size / 2})` })] }), (0, jsx_runtime_1.jsxs)("div", { className: "absolute flex flex-col items-center", children: [(0, jsx_runtime_1.jsxs)("span", { className: "text-4xl font-bold text-on-surface", children: [clampedTarget, unit] }), ambient != null ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: `Now ${ambient}${unit}` }) : null, (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('mt-0.5 text-xs font-semibold', accentText), children: offline ? 'Offline' : MODE_LABEL[mode] })] })] }), (0, jsx_runtime_1.jsx)("button", { type: "button", className: btn, disabled: offline, "aria-label": "Raise target temperature", onClick: () => bump(1), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "+", color: "onSurface", size: "xl" }) })] }));
});
//# sourceMappingURL=ThermostatDialV2.js.map