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
exports.EnergyDashboard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
/** Token opacity of the near-white ink per tone — keeps the whole bar on the brand ramp. */
const TONE_FILL = {
    primary: 'bg-primary-50',
    accent: 'bg-primary-50/70',
    warn: 'bg-primary-50/45',
    success: 'bg-primary-50/25',
};
/**
 * EnergyDashboard — a whole-home energy **hero** for the smart-home module (web
 * parity of the native twin). A brand-gradient ground carries the big near-white
 * usage numeral, a cost + period line, a delta chip (for energy, up = worse, so
 * a rise reads as a warning arrow), an optional solar line, and an optional
 * stacked usage bar with a frosted legend. The bar is one gradient-safe run of
 * the near-white ink at token opacities — every color derives from the brand
 * ramp (gradient `from-primary-500 to-primary-700`, ink `text-primary-50/100`,
 * frosted tiles `bg-primary-50/15` + `border-primary-50/30`) — token-only, no
 * literals, light + dark. Presentational: shaped data, nothing fetches.
 */
exports.EnergyDashboard = React.forwardRef(function EnergyDashboard({ usageLabel, costLabel, period = 'Today', deltaPct, solarLabel, breakdown, className, ...rest }, ref) {
    const hasDelta = typeof deltaPct === 'number' && Number.isFinite(deltaPct);
    const worse = hasDelta && deltaPct > 0;
    const total = (breakdown ?? []).reduce((sum, b) => sum + Math.max(0, b.value), 0);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-500 to-primary-700 p-[var(--xen-space-lg)] overflow-hidden', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-semibold text-primary-100", children: `${period} usage` }), hasDelta ? ((0, jsx_runtime_1.jsxs)("span", { role: "status", "aria-label": `${Math.abs(deltaPct)}% ${worse ? 'more' : 'less'} than the previous period`, className: "inline-flex shrink-0 items-center gap-[var(--xen-space-xs)] rounded-full bg-primary-50/15 border border-primary-50/30 px-[var(--xen-space-md)] py-[var(--xen-space-xs)] text-sm font-semibold text-primary-50", children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: worse ? '▲' : '▼', size: "xs", "aria-hidden": true }), `${Math.abs(deltaPct)}%`] })) : null] }), (0, jsx_runtime_1.jsx)("p", { className: "mt-[var(--xen-space-xs)] text-3xl font-extrabold tracking-tight text-primary-50", children: usageLabel }), costLabel || solarLabel ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-xs)] flex flex-wrap items-center gap-[var(--xen-space-sm)]", children: [costLabel ? (0, jsx_runtime_1.jsx)("span", { className: "text-base font-semibold text-primary-100", children: costLabel }) : null, solarLabel ? ((0, jsx_runtime_1.jsxs)("span", { className: "inline-flex items-center gap-[var(--xen-space-xs)] rounded-full bg-primary-50/15 border border-primary-50/30 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)] text-xs font-semibold text-primary-50", children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2600\uFE0F", size: "xs", "aria-hidden": true }), solarLabel] })) : null] })) : null, breakdown && breakdown.length > 0 && total > 0 ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-lg)]", children: [(0, jsx_runtime_1.jsx)("div", { role: "img", "aria-label": "Usage breakdown", className: "flex h-3 w-full overflow-hidden rounded-full bg-primary-50/15 border border-primary-50/30", children: breakdown.map((b) => {
                            const pct = (Math.max(0, b.value) / total) * 100;
                            if (pct <= 0)
                                return null;
                            return ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('h-full', TONE_FILL[b.tone ?? 'primary']), style: { width: `${pct}%` } }, b.label));
                        }) }), (0, jsx_runtime_1.jsx)("div", { className: "mt-[var(--xen-space-sm)] flex flex-wrap gap-[var(--xen-space-sm)]", children: breakdown.map((b) => {
                            const pct = Math.round((Math.max(0, b.value) / total) * 100);
                            return ((0, jsx_runtime_1.jsxs)("div", { className: "inline-flex items-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)] bg-primary-50/15 border border-primary-50/30 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('h-2.5 w-2.5 rounded-full', TONE_FILL[b.tone ?? 'primary']), "aria-hidden": true }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-primary-50", children: b.label }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-primary-100", children: `${pct}%` })] }, b.label));
                        }) })] })) : null] }));
});
//# sourceMappingURL=EnergyDashboard.js.map