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
exports.RetainerBalanceV3 = void 0;
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
 * RetainerBalance, redesigned (v3): a **compact trust row**. The matter label over
 * the balance, an inline status word, and a small Replenish when low — hairline-
 * bordered for a matter list. The opposite of v2's card. Same props, token-only.
 */
exports.RetainerBalanceV3 = React.forwardRef(function RetainerBalanceV3({ balanceCents, initialCents, lowThresholdCents = 0, currency = 'USD', status, label, loading = false, variant, onReplenish, testID, className, ...rest }, ref) {
    void variant;
    void initialCents;
    if (loading) {
        return (0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-retainer-balance": "", "data-testid": testID, "aria-label": "Loading retainer", className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-2.5', className), ...rest, children: (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-2/5 animate-pulse rounded-sm bg-neutral-100" }) });
    }
    const st = status ?? derive(balanceCents, lowThresholdCents);
    const showReplenish = onReplenish && (st === 'low' || st === 'depleted');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-retainer-balance": "", "data-testid": testID, className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-2.5', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [label ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: label }) : null, (0, jsx_runtime_1.jsx)("p", { className: "text-lg font-bold text-on-surface", children: (0, commerce_1.formatMoney)(balanceCents, currency) })] }), (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.RETAINER_STATUS_META[st], variant: "inline", size: "sm" }), showReplenish ? (0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "ghost", onClick: onReplenish, children: "Replenish" }) : null] }));
});
//# sourceMappingURL=RetainerBalanceV3.js.map