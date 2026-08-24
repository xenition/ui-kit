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
exports.ThermostatDialV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const MODE_TEXT = { heat: 'text-danger', cool: 'text-primary', auto: 'text-accent', off: 'text-muted' };
const MODE_LABEL = { heat: 'Heat', cool: 'Cool', auto: 'Auto', off: 'Off' };
/**
 * ThermostatDial, redesigned (v3): a **compact stepper row**. No dial — a −/+ pair
 * flanks the large setpoint, with the mode + ambient reading beneath, sized for a
 * device list row. The minimal counterpart to v2's dial. Same props (`size` is
 * accepted for parity), token-only.
 */
exports.ThermostatDialV3 = React.forwardRef(function ThermostatDialV3({ target, ambient, min = 10, max = 30, step = 0.5, mode = 'heat', unit = '°', size, onTargetChange, offline = false, className, style }, ref) {
    void size;
    const clampedTarget = Math.min(max, Math.max(min, target));
    const accentText = offline ? 'text-muted' : MODE_TEXT[mode];
    const bump = (dir) => {
        if (offline || !onTargetChange)
            return;
        onTargetChange(Math.min(max, Math.max(min, clampedTarget + dir * step)));
    };
    const btn = 'flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-xl text-on-surface disabled:opacity-50';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-thermostat-dial": "", "aria-label": `Thermostat, ${offline ? 'Offline' : MODE_LABEL[mode]}`, style: style, className: (0, cn_1.cn)('flex items-center justify-between gap-3 border-b border-border py-2.5', offline && 'opacity-60', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "min-w-0", children: [(0, jsx_runtime_1.jsxs)("p", { className: "text-2xl font-bold text-on-surface", children: [clampedTarget, unit] }), (0, jsx_runtime_1.jsxs)("p", { className: (0, cn_1.cn)('text-xs font-semibold', accentText), children: [offline ? 'Offline' : MODE_LABEL[mode], ambient != null ? (0, jsx_runtime_1.jsxs)("span", { className: "font-normal text-muted", children: [" \u00B7 Now ", ambient, unit] }) : null] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", className: btn, disabled: offline, "aria-label": "Lower target temperature", onClick: () => bump(-1), children: "\u2212" }), (0, jsx_runtime_1.jsx)("button", { type: "button", className: btn, disabled: offline, "aria-label": "Raise target temperature", onClick: () => bump(1), children: "+" })] })] }));
});
//# sourceMappingURL=ThermostatDialV3.js.map