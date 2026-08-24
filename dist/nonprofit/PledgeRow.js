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
exports.PledgeRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Badge_1 = require("../primitives/Badge");
const Avatar_1 = require("../primitives/Avatar");
const Button_1 = require("../primitives/Button");
const internal_1 = require("./internal");
const STATUS = {
    pending: { tone: 'warn', label: 'Pending' },
    fulfilled: { tone: 'success', label: 'Fulfilled' },
    overdue: { tone: 'danger', label: 'Overdue' },
    declined: { tone: 'neutral', label: 'Declined' },
};
/**
 * Web parity of the native `PledgeRow`: a single pledge in a campaign ledger —
 * donor avatar + name, the pledged amount (integer cents → `formatMoney`), a
 * status badge, and — for still-open pledges — a "Mark fulfilled" action button.
 * Status is carried by both the badge text and the row `aria-label`, never color
 * alone. When `onClick` is set the row is a `role="button"` target with keyboard
 * activation; the fulfill button stops propagation so it does not also open the
 * row. All colors come from the `--xen-*` token classes — no literal colors.
 */
exports.PledgeRow = React.forwardRef(function PledgeRow({ donorName, avatarUrl, amountCents, currency = 'USD', status = 'pending', dueLabel, onFulfill, onClick, loading = false, className, ...rest }, ref) {
    const meta = STATUS[status];
    const open = status === 'pending' || status === 'overdue';
    const label = `${donorName}, ${(0, internal_1.formatMoney)(amountCents, currency)} pledge, ${meta.label}`;
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { name: donorName, src: avatarUrl, size: "sm" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-semibold text-on-surface", children: donorName }), (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: meta.tone, children: meta.label })] }), dueLabel ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: dueLabel }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: (0, internal_1.formatMoney)(amountCents, currency) }), open && onFulfill ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", variant: "secondary", disabled: loading, onClick: (e) => {
                            e.stopPropagation();
                            onFulfill();
                        }, children: "Mark fulfilled" })) : null] })] }));
    const rowClass = 'flex items-center gap-md rounded-md bg-surface px-md py-sm';
    if (onClick) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "button", tabIndex: 0, "aria-label": label, onClick: onClick, onKeyDown: (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick();
                }
            }, className: (0, cn_1.cn)(rowClass, 'cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...rest, children: inner }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "aria-label": label, className: (0, cn_1.cn)(rowClass, className), ...rest, children: inner }));
});
//# sourceMappingURL=PledgeRow.js.map