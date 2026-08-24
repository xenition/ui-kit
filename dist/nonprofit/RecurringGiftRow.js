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
exports.RecurringGiftRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Badge_1 = require("../primitives/Badge");
const Icon_1 = require("../primitives/Icon");
const Button_1 = require("../primitives/Button");
const internal_1 = require("./internal");
const FREQ_LABEL = {
    weekly: '/week',
    monthly: '/month',
    quarterly: '/quarter',
    yearly: '/year',
};
const STATUS_TONE = {
    active: 'success',
    paused: 'warn',
    canceled: 'neutral',
};
/**
 * Web parity of the native `RecurringGiftRow`: a managed recurring-gift row —
 * the per-cycle amount (integer cents → `formatMoney`) with its cadence suffix,
 * the supported fund, a next-charge hint, a status badge, and pause / resume /
 * cancel controls appropriate to the status. Status is carried by badge text +
 * the row `aria-label`, not color alone. All colors come from the `--xen-*`
 * token classes — no literal colors.
 */
exports.RecurringGiftRow = React.forwardRef(function RecurringGiftRow({ amountCents, currency = 'USD', frequency, fund, nextChargeLabel, status = 'active', onPause, onResume, onCancel, loading = false, className, ...rest }, ref) {
    const statusLabel = status.charAt(0).toUpperCase() + status.slice(1);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": `${(0, internal_1.formatMoney)(amountCents, currency)} ${FREQ_LABEL[frequency]} recurring gift, ${statusLabel}`, className: (0, cn_1.cn)('flex flex-col gap-sm rounded-md border border-border bg-surface p-md', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-sm", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDD01", size: "base", color: "muted" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 items-baseline gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-lg font-extrabold text-on-surface", children: (0, internal_1.formatMoney)(amountCents, currency) }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: FREQ_LABEL[frequency] })] }), (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: STATUS_TONE[status], children: statusLabel })] }), fund ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-on-surface", children: fund }) : null, nextChargeLabel && status === 'active' ? ((0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: nextChargeLabel })) : null, status !== 'canceled' ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-sm", children: [status === 'active' ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", variant: "outline", disabled: loading, onClick: onPause, children: "Pause" })) : ((0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", variant: "primary", disabled: loading, onClick: onResume, children: "Resume" })), onCancel ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", variant: "ghost", disabled: loading, onClick: onCancel, children: "Cancel" })) : null] })) : null] }));
});
//# sourceMappingURL=RecurringGiftRow.js.map