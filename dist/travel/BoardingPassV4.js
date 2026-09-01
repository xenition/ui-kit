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
exports.BoardingPassV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * BoardingPass — **V4** "journey" design (web parity of the native V4). The
 * signature of the boarding-pass line: a saturated brand-gradient header band
 * carrying the airline/flight and the from→gradient-plane-disc→to route in
 * near-white ink (the FlightCardV4 rail motif), the gate/seat/zone/boarding
 * fields as frosted glass tiles, then a dashed perforated tear line — notched at
 * both edges — dividing the header from a stub bearing a token-drawn barcode and
 * the passenger name / confirmation code. Same props/behavior as
 * {@link BoardingPassProps}; all colors from `--xen-*` token classes and gradient
 * utilities (no literal colors); dark-mode safe.
 */
exports.BoardingPassV4 = React.forwardRef(function BoardingPassV4({ passenger, from, to, flight, gate, seat, zone, boardingTime, extraFields = [], barcode, className, ...rest }, ref) {
    const fields = [
        gate ? { label: 'Gate', value: gate } : null,
        seat ? { label: 'Seat', value: seat } : null,
        zone ? { label: 'Zone', value: zone } : null,
        boardingTime ? { label: 'Boarding', value: boardingTime } : null,
        ...extraFields,
    ].filter((f) => f != null);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-boarding-pass": "", "aria-label": `Boarding pass for ${passenger}, ${from} to ${to}, flight ${flight}`, className: (0, cn_1.cn)('overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface shadow-lg', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-md)] bg-gradient-to-br from-primary-500 to-primary-700 p-[var(--xen-space-lg)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold tracking-[2px] text-primary-100", children: "BOARDING PASS" }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-primary-50", children: flight })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-3xl font-extrabold text-primary-50", children: from }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 items-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-0.5 flex-1 rounded-full bg-primary-50/40" }), (0, jsx_runtime_1.jsx)("span", { className: "mx-1.5 flex h-[26px] w-[26px] items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary-400 to-primary-700 text-sm leading-none text-primary-50", children: "\u2708" }), (0, jsx_runtime_1.jsx)("div", { className: "h-0.5 flex-1 rounded-full bg-primary-50/40" })] }), (0, jsx_runtime_1.jsx)("span", { className: "text-3xl font-extrabold text-primary-50", children: to })] }), fields.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-[var(--xen-space-sm)]", children: fields.map((f, i) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-[64px] flex-1 flex-col gap-[2px] rounded-[var(--xen-radius-md)] border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-primary-100", children: f.label }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-primary-50", children: f.value })] }, `${f.label}-${i}`))) })) : null] }), (0, jsx_runtime_1.jsxs)("div", { "aria-hidden": "true", className: "relative h-0 border-t border-dashed border-border", children: [(0, jsx_runtime_1.jsx)("span", { className: "absolute left-0 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-surface" }), (0, jsx_runtime_1.jsx)("span", { className: "absolute right-0 top-0 h-3 w-3 translate-x-1/2 -translate-y-1/2 rounded-full bg-surface" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-md)] p-[var(--xen-space-lg)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[2px]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: "Passenger" }), (0, jsx_runtime_1.jsx)("span", { className: "text-base font-semibold text-on-surface", children: passenger })] }), barcode ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-[2px]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: "Confirmation" }), (0, jsx_runtime_1.jsx)("span", { className: "text-base font-semibold tracking-[2px] text-on-surface", children: barcode })] })) : null] }), (0, jsx_runtime_1.jsx)("div", { "aria-hidden": "true", className: "flex h-11 items-stretch gap-[2px]", children: Array.from({ length: 40 }, (_, i) => ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)(i % 3 === 0 ? 'flex-[2]' : 'flex-1', i % 2 === 0 ? 'bg-on-surface' : 'bg-border') }, i))) })] })] }));
});
//# sourceMappingURL=BoardingPassV4.js.map