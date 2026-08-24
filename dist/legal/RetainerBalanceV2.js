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
exports.RetainerBalanceV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
function derive(balance, low) {
    if (balance <= 0)
        return 'depleted';
    if (low > 0 && balance <= low)
        return 'low';
    return 'healthy';
}
/**
 * RetainerBalance, redesigned (v2): an **elevated trust card**. The matter label
 * and a status pill head a big balance figure, a fill meter against the initial
 * retainer, and a Replenish CTA when low/depleted. Distinct from v1. Same props,
 * token-only.
 */
exports.RetainerBalanceV2 = React.forwardRef(function RetainerBalanceV2({ balanceCents, initialCents, lowThresholdCents = 0, currency = 'USD', status, label, loading = false, variant, onReplenish, testID, className, ...rest }, ref) {
    void variant;
    if (loading) {
        return (0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-retainer-balance": "", "data-testid": testID, "aria-label": "Loading retainer", className: (0, cn_1.cn)('h-28 animate-pulse rounded-lg bg-neutral-100', className), ...rest });
    }
    const st = status ?? derive(balanceCents, lowThresholdCents);
    const pct = typeof initialCents === 'number' && initialCents > 0 ? (0, internal_1.clampPct)((balanceCents / initialCents) * 100) : null;
    const showReplenish = onReplenish && (st === 'low' || st === 'depleted');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-retainer-balance": "", "data-testid": testID, className: (0, cn_1.cn)('flex flex-col gap-3 rounded-lg bg-surface p-md shadow-sm', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [label ? (0, jsx_runtime_1.jsx)("p", { className: "text-sm font-semibold text-on-surface", children: label }) : (0, jsx_runtime_1.jsx)("span", {}), (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.RETAINER_STATUS_META[st], size: "sm" })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-3xl font-bold text-on-surface", children: (0, commerce_1.formatMoney)(balanceCents, currency) }), typeof initialCents === 'number' ? (0, jsx_runtime_1.jsxs)("p", { className: "text-xs text-muted", children: ["of ", (0, commerce_1.formatMoney)(initialCents, currency), " initial"] }) : null] }), pct !== null ? ((0, jsx_runtime_1.jsx)("div", { className: "h-2 w-full overflow-hidden rounded-full bg-neutral-100", role: "progressbar", "aria-valuenow": Math.round(pct), "aria-valuemin": 0, "aria-valuemax": 100, children: (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-full rounded-full', st === 'depleted' ? 'bg-danger' : st === 'low' ? 'bg-warn' : 'bg-success'), style: { width: `${pct}%` } }) })) : null, showReplenish ? (0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "md", variant: "primary", className: "w-full", onClick: onReplenish, children: "Replenish" }) : null] }));
});
//# sourceMappingURL=RetainerBalanceV2.js.map