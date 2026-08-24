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
exports.BoardingPass = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * Web parity of the native `BoardingPass`: a boarding pass — passenger, the
 * from→to route, flight, and a grid of gate/seat/zone/boarding fields, capped by
 * a token-styled barcode placeholder (no barcode dependency; the `barcode`
 * string is shown beneath it). Token-only colors.
 */
exports.BoardingPass = React.forwardRef(function BoardingPass({ passenger, from, to, flight, gate, seat, zone, boardingTime, extraFields = [], barcode, className, ...rest }, ref) {
    const fields = [
        gate ? { label: 'Gate', value: gate } : null,
        seat ? { label: 'Seat', value: seat } : null,
        zone ? { label: 'Zone', value: zone } : null,
        boardingTime ? { label: 'Boarding', value: boardingTime } : null,
        ...extraFields,
    ].filter((f) => f != null);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-boarding-pass": "", "aria-label": `Boarding pass for ${passenger}, ${from} to ${to}, flight ${flight}`, className: (0, cn_1.cn)('overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "bg-primary p-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-on-primary", children: "BOARDING PASS" }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-xs)] flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-2xl font-bold text-on-primary", children: from }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-lg text-on-primary", children: "\u2708" }), (0, jsx_runtime_1.jsx)("span", { className: "text-2xl font-bold text-on-primary", children: to })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-md)] p-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[2px]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: "Passenger" }), (0, jsx_runtime_1.jsx)("span", { className: "text-base font-semibold text-on-surface", children: passenger })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-[2px]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: "Flight" }), (0, jsx_runtime_1.jsx)("span", { className: "text-base font-semibold text-on-surface", children: flight })] })] }), fields.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-[var(--xen-space-md)]", children: fields.map((f, i) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-[64px] flex-col gap-[2px]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: f.label }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-on-surface", children: f.value })] }, `${f.label}-${i}`))) })) : null, (0, jsx_runtime_1.jsx)("div", { "aria-hidden": "true", className: "flex h-11 items-stretch gap-[2px]", children: Array.from({ length: 32 }, (_, i) => ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)(i % 3 === 0 ? 'flex-[2]' : 'flex-1', i % 2 === 0 ? 'bg-on-surface' : 'bg-surface') }, i))) }), barcode ? ((0, jsx_runtime_1.jsx)("span", { className: "text-center text-xs tracking-[2px] text-muted", children: barcode })) : null] })] }));
});
//# sourceMappingURL=BoardingPass.js.map