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
exports.FareEstimateV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const CardV4_1 = require("../primitives/CardV4");
const money_1 = require("../commerce/money");
const fleet_v4_1 = require("./internal/fleet-v4");
/**
 * **V4 fare estimate** — the web twin of the native `FareEstimateV4`, same
 * props as {@link FareEstimate} plus `totalLabel`, `formatSurge` and
 * `emptyMessage`.
 *
 * ## Four changes
 *
 * 1. **Every figure is tabular and the column has an edge.** A fare breakdown
 *    is a column of money; with proportional figures there is nothing to scan
 *    down, which is the whole job of the component.
 * 2. **Surge is a labelled chip, not a red total.** A higher price is a
 *    condition, not an error (§35.4) — and colour alone says nothing.
 * 3. **The breakdown is a real `<dl>`**, so a reader hears label/value pairs
 *    rather than a run of loose strings.
 * 4. **An empty estimate says so** rather than rendering a bordered blank.
 */
exports.FareEstimateV4 = React.forwardRef(function FareEstimateV4({ items = [], totalCents, currency = 'USD', surgeMultiplier, distanceLabel, durationLabel, variant = 'detailed', totalLabel = 'Total', formatSurge, emptyMessage = 'No estimate yet.', loading = false, className, ...rest }, ref) {
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-sm', className), ...rest, children: [60, 45, 80].map((w) => ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-3', fleet_v4_1.SKELETON_CLASS), style: { width: `${w}%` } }, w))) }));
    }
    const lines = variant === 'detailed' ? items : [];
    const hasTotal = typeof totalCents === 'number' && Number.isFinite(totalCents);
    const surging = typeof surgeMultiplier === 'number' && surgeMultiplier > 1;
    const caption = (0, fleet_v4_1.metaLine)([distanceLabel, durationLabel]);
    if (!hasTotal && lines.length === 0) {
        return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { ref: ref, className: className, ...rest, children: (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted-text", children: emptyMessage }) }));
    }
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { ref: ref, "data-xen-fare-estimate": "", className: (0, cn_1.cn)('flex flex-col gap-sm', className), ...rest, children: [caption || surging ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 text-xs text-muted-text", children: caption }), surging ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "warn", variant: "soft", size: "sm", children: (formatSurge ?? ((m) => `${m}× surge`))(surgeMultiplier) })) : null] })) : null, lines.length > 0 ? ((0, jsx_runtime_1.jsx)("dl", { className: "flex flex-col gap-sm", children: lines.map((item) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline justify-between gap-md", children: [(0, jsx_runtime_1.jsx)("dt", { className: "shrink text-sm text-muted-text", children: item.label }), (0, jsx_runtime_1.jsx)("dd", { className: "text-sm text-on-card [font-variant-numeric:tabular-nums]", children: (0, money_1.formatMoney)(item.cents, currency) })] }, item.label))) })) : null, hasTotal ? ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex items-baseline justify-between gap-md', lines.length > 0 && 'border-t border-border pt-sm'), children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-semibold text-on-card", children: totalLabel }), (0, jsx_runtime_1.jsx)("span", { className: "font-heading text-xl font-bold text-on-card [font-variant-numeric:tabular-nums]", children: (0, money_1.formatMoney)(totalCents, currency) })] })) : null] }));
});
//# sourceMappingURL=FareEstimateV4.js.map