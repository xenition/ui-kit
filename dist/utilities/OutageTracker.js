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
exports.OutageTracker = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const format_1 = require("./internal/format");
const status_1 = require("./internal/status");
const DEFAULT_STEPS = [
    { label: 'Reported', done: true },
    { label: 'Crew dispatched', current: true },
    { label: 'Power restored' },
];
/**
 * A clean-card outage progress timeline (web parity). The event state (active →
 * danger, scheduled → warn, resolved → success) is conveyed by **glyph + heading
 * + a tint that traces to a semantic token** — never color alone — over a soft
 * tinted header strip. A vertical timeline traces the restoration: a completed
 * step is a filled dot with a connector, the current step is ringed, and pending
 * steps are `border`-colored. The estimated restoration is shown for
 * active/scheduled events and suppressed once resolved. Token-bound throughout.
 */
exports.OutageTracker = React.forwardRef(function OutageTracker({ state = 'active', area, eta, steps = DEFAULT_STEPS, onDetails, className, ...rest }, ref) {
    const od = (0, status_1.outageState)(state);
    const showEta = eta != null && state !== 'resolved';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": `${od.heading}${area != null ? `, ${area}` : ''}`, className: (0, cn_1.cn)('rounded-[var(--xen-radius-lg)] bg-surface border border-border shadow-lg p-5', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex items-start gap-[var(--xen-space-md)] rounded-[var(--xen-radius-md)] p-[var(--xen-space-md)]', format_1.DISC_TINT[od.color]), children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: od.glyph, size: "xl", color: od.color, "aria-label": od.label }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: od.heading }), area != null ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: area }) : null, showEta ? ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('mt-0.5 text-sm font-semibold', format_1.TEXT_TINT[od.color]), children: ["Estimated restoration: ", eta] })) : null] })] }), (0, jsx_runtime_1.jsx)("div", { className: "mt-[var(--xen-space-lg)] flex flex-col", children: steps.map((step, i) => {
                    const last = i === steps.length - 1;
                    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex w-4 flex-col items-center", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('h-3.5 w-3.5 shrink-0 rounded-full border-2', step.done
                                            ? (0, cn_1.cn)('border-transparent', format_1.SOLID_TINT[od.color])
                                            : step.current
                                                ? (0, cn_1.cn)('bg-surface border-[3px]', format_1.BORDER_TINT[od.color])
                                                : 'bg-surface border-border') }), !last ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('w-0.5 flex-1 min-h-[var(--xen-space-lg)]', step.done ? format_1.SOLID_TINT[od.color] : 'bg-border') })) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex flex-1 flex-col gap-0.5', last ? 'pb-0' : 'pb-[var(--xen-space-lg)]'), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm text-on-surface', step.current ? 'font-bold' : 'font-semibold'), children: step.label }), step.time != null ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: step.time }) : null] })] }, `${step.label}-${i}`));
                }) }), onDetails != null ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "outline", onClick: onDetails, className: "mt-[var(--xen-space-md)]", children: "View details" })) : null] }));
});
//# sourceMappingURL=OutageTracker.js.map