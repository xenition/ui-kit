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
exports.RetainerBalanceV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
function deriveStatus(balanceCents, low) {
    if (balanceCents <= 0)
        return 'depleted';
    if (balanceCents <= low)
        return 'low';
    return 'healthy';
}
/**
 * RetainerBalance — **V4** "chambers" design (web parity of the native V4). The
 * distinguished, chambers take on a trust / retainer meter: an elevated rounded
 * card with a soft shadow, a big legible **tabular-nums** balance (money carried
 * as integer cents through the shared `formatMoney`), a labelled glyph + word
 * health pill (never color alone), a fill meter against the initial retainer, and
 * a "Replenish" action when funds run low. Status is derived from the balance vs.
 * a low-water threshold unless overridden. Exposes an ARIA `progressbar`. Reuses
 * the base `variant` (`default` / `compact`). All colors from `--xen-*` token
 * classes (no literals).
 */
exports.RetainerBalanceV4 = React.forwardRef(function RetainerBalanceV4({ balanceCents, initialCents, lowThresholdCents = 0, currency = 'USD', status, label, loading = false, variant = 'default', onReplenish, testID, className, ...rest }, ref) {
    const compact = variant === 'compact';
    const resolved = status ?? deriveStatus(balanceCents, lowThresholdCents);
    const statusMeta = internal_1.RETAINER_STATUS_META[resolved];
    const fillClass = (0, internal_1.toneBgClass)(statusMeta.tone);
    const pct = initialCents && initialCents > 0 ? (0, internal_1.clampPct)(Math.round((Math.max(0, balanceCents) / initialCents) * 100)) : undefined;
    const showReplenish = onReplenish && (resolved === 'low' || resolved === 'depleted');
    const shell = 'rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm';
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-testid": testID, "data-xen-retainer-balance": "", "aria-label": "Loading retainer", "aria-busy": "true", className: (0, cn_1.cn)(shell, 'flex flex-col gap-[var(--xen-space-sm)] p-[var(--xen-space-lg)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "h-3 w-2/5 rounded-[var(--xen-radius-sm)] bg-neutral-100" }), (0, jsx_runtime_1.jsx)("div", { className: "h-6 w-3/5 rounded-[var(--xen-radius-sm)] bg-neutral-100" }), (0, jsx_runtime_1.jsx)("div", { className: "h-2 w-full rounded-full bg-neutral-100" })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-testid": testID, "data-xen-retainer-balance": "", className: (0, cn_1.cn)(shell, 'flex flex-col gap-[var(--xen-space-md)]', compact ? 'p-[var(--xen-space-md)]' : 'p-[var(--xen-space-lg)]', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold uppercase tracking-wide text-muted", children: label ?? 'Retainer balance' }), (0, jsx_runtime_1.jsx)("span", { className: "text-3xl font-bold tabular-nums text-on-surface", children: (0, internal_1.formatMoney)(balanceCents, currency) }), !compact && initialCents ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs tabular-nums text-muted", children: ["of ", (0, internal_1.formatMoney)(initialCents, currency), " initial"] })) : null] }), (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: statusMeta, variant: "soft", size: "sm" })] }), pct != null ? ((0, jsx_runtime_1.jsx)("div", { role: "progressbar", "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": pct, "aria-label": `${statusMeta.label}, ${pct}% remaining`, className: "h-2.5 w-full overflow-hidden rounded-full bg-neutral-100", children: (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-full rounded-full', fillClass), style: { width: `${pct}%` } }) })) : null, showReplenish ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "primary", className: "self-start", onClick: onReplenish, children: "Replenish" })) : null] }));
});
//# sourceMappingURL=RetainerBalanceV4.js.map