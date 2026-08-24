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
exports.LightControlV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Switch_1 = require("../primitives/Switch");
const Slider_1 = require("../primitives/Slider");
/**
 * LightControl, redesigned (v2): an **elevated lighting panel**. A header pairs
 * the name with the on/off Switch; a large brightness slider shows a big percent
 * read-out, and a warm↔cool color-temperature slider sits below when provided.
 * Distinct from v1. Same props, token-only.
 */
exports.LightControlV2 = React.forwardRef(function LightControlV2({ name, on = false, brightness = 0, colorTemp, offline = false, onToggle, onBrightnessChange, onColorTempChange, className, style }, ref) {
    const controlsDisabled = offline || !on;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-light-control": "", style: style, className: (0, cn_1.cn)('flex flex-col gap-3 rounded-lg bg-surface p-md shadow-sm', offline && 'opacity-60', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xl", "aria-hidden": true, children: "\uD83D\uDCA1" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm font-bold text-on-surface", children: name })] }), (0, jsx_runtime_1.jsx)(Switch_1.Switch, { checked: on, disabled: offline, "aria-label": `Toggle ${name}`, onCheckedChange: (next) => onToggle?.(next) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: "Brightness" }), (0, jsx_runtime_1.jsxs)("span", { className: "text-lg font-bold text-on-surface", children: [Math.round(brightness), "%"] })] }), (0, jsx_runtime_1.jsx)(Slider_1.Slider, { value: brightness, min: 0, max: 100, disabled: controlsDisabled, onChange: (v) => onBrightnessChange?.(v) })] }), typeof colorTemp === 'number' ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between text-xs text-muted", children: [(0, jsx_runtime_1.jsx)("span", { children: "Warm" }), (0, jsx_runtime_1.jsx)("span", { children: "Cool" })] }), (0, jsx_runtime_1.jsx)(Slider_1.Slider, { value: colorTemp, min: 0, max: 100, disabled: controlsDisabled, onChange: (v) => onColorTempChange?.(v) })] })) : null] }));
});
//# sourceMappingURL=LightControlV2.js.map