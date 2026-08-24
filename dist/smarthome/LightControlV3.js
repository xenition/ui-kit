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
exports.LightControlV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Switch_1 = require("../primitives/Switch");
const Slider_1 = require("../primitives/Slider");
/**
 * LightControl, redesigned (v3): a **compact light row**. The name + on/off Switch
 * on one line, with an inline brightness slider and a small percent read-out
 * beneath — the color-temperature control is folded away. A dense list row vs.
 * v2's panel. Same props, token-only.
 */
exports.LightControlV3 = React.forwardRef(function LightControlV3({ name, on = false, brightness = 0, colorTemp, offline = false, onToggle, onBrightnessChange, onColorTempChange, className, style }, ref) {
    void colorTemp;
    void onColorTempChange;
    const controlsDisabled = offline || !on;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-light-control": "", style: style, className: (0, cn_1.cn)('flex flex-col gap-1.5 border-b border-border py-2.5', offline && 'opacity-60', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, children: "\uD83D\uDCA1" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm font-medium text-on-surface", children: name })] }), (0, jsx_runtime_1.jsx)(Switch_1.Switch, { checked: on, disabled: offline, "aria-label": `Toggle ${name}`, onCheckedChange: (next) => onToggle?.(next) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "min-w-0 flex-1", children: (0, jsx_runtime_1.jsx)(Slider_1.Slider, { value: brightness, min: 0, max: 100, disabled: controlsDisabled, onChange: (v) => onBrightnessChange?.(v) }) }), (0, jsx_runtime_1.jsxs)("span", { className: "w-9 shrink-0 text-right text-xs font-semibold text-muted", children: [Math.round(brightness), "%"] })] })] }));
});
//# sourceMappingURL=LightControlV3.js.map