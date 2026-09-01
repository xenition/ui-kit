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
exports.RecurringGiftRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Badge_1 = require("../primitives/Badge");
const Icon_1 = require("../primitives/Icon");
const Button_1 = require("../primitives/Button");
const internal_1 = require("./internal");
const FREQ = {
    weekly: { label: '/week', glyph: '📅' },
    monthly: { label: '/month', glyph: '🗓️' },
    quarterly: { label: '/quarter', glyph: '📆' },
    yearly: { label: '/year', glyph: '🎂' },
};
const STATUS = {
    active: { tone: 'success', label: 'Active', glyph: '🔁' },
    paused: { tone: 'warn', label: 'Paused', glyph: '⏸️' },
    canceled: { tone: 'neutral', label: 'Canceled', glyph: '🚫' },
};
/**
 * RecurringGiftRow — **V4** "rally" design (web parity of the native V4). An
 * elevated, rounded managed recurring-gift row on a clean surface (no gradient):
 * a leading cadence glyph in a soft-primary well, the bold per-cycle amount
 * (integer cents → `formatMoney`) with its cadence suffix, a glyph + labelled
 * status {@link Badge} (never color alone), a frequency chip, the supported fund,
 * a next-charge hint, and pause / resume / cancel controls appropriate to the
 * status. Honors every `frequency` (weekly/monthly/quarterly/yearly) and
 * `status` (active/paused/canceled). Identical props/behavior to
 * {@link RecurringGiftRowProps}. All colors from `--xen-*` token classes (no
 * literals).
 */
exports.RecurringGiftRowV4 = React.forwardRef(function RecurringGiftRowV4({ amountCents, currency = 'USD', frequency, fund, nextChargeLabel, status = 'active', onPause, onResume, onCancel, loading = false, className, ...rest }, ref) {
    const freq = FREQ[frequency];
    const statusMeta = STATUS[status];
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": `${(0, internal_1.formatMoney)(amountCents, currency)} ${freq.label} recurring gift, ${statusMeta.label}`, className: (0, cn_1.cn)('flex flex-col gap-sm rounded-lg border border-border bg-surface text-on-surface shadow-md p-md', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-md", children: [(0, jsx_runtime_1.jsx)("span", { className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: freq.glyph, size: "lg", "aria-hidden": true }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 items-baseline gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-lg font-extrabold text-on-surface", children: (0, internal_1.formatMoney)(amountCents, currency) }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: freq.label })] }), (0, jsx_runtime_1.jsxs)(Badge_1.Badge, { tone: statusMeta.tone, variant: "soft", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: statusMeta.glyph, size: "xs", "aria-hidden": true }), statusMeta.label] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-sm", children: [(0, jsx_runtime_1.jsxs)("span", { className: "inline-flex items-center gap-xs rounded-full bg-primary/10 px-sm py-px text-sm text-primary", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: freq.glyph, size: "xs", "aria-hidden": true }), `Every ${freq.label.replace('/', '')}`] }), fund ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-on-surface", children: fund }) : null] }), nextChargeLabel && status === 'active' ? ((0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: nextChargeLabel })) : null, status !== 'canceled' ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-sm", children: [status === 'active' ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", variant: "outline", disabled: loading, onClick: onPause, children: "Pause" })) : ((0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", variant: "primary", disabled: loading, onClick: onResume, children: "Resume" })), onCancel ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", variant: "ghost", disabled: loading, onClick: onCancel, children: "Cancel" })) : null] })) : null] }));
});
//# sourceMappingURL=RecurringGiftRowV4.js.map