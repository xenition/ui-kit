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
exports.PledgeRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Badge_1 = require("../primitives/Badge");
const Avatar_1 = require("../primitives/Avatar");
const Icon_1 = require("../primitives/Icon");
const Button_1 = require("../primitives/Button");
const internal_1 = require("./internal");
const STATUS = {
    pending: { tone: 'warn', label: 'Pending', glyph: '⏳' },
    fulfilled: { tone: 'success', label: 'Fulfilled', glyph: '✅' },
    overdue: { tone: 'danger', label: 'Overdue', glyph: '⚠️' },
    declined: { tone: 'neutral', label: 'Declined', glyph: '🚫' },
};
/**
 * PledgeRow — **V4** "rally" design (web parity of the native V4). An elevated,
 * rounded pledge-ledger row on a clean surface (no gradient): a leading donor
 * avatar in a soft-primary well, a bold donor name with a glyph + labelled
 * status {@link Badge} (never color alone), an optional due-date chip, a
 * trailing bold pledged amount (integer cents → `formatMoney`), and — for
 * still-open (pending/overdue) pledges — a "Mark fulfilled" action that stops
 * propagation so it does not also open the row. When `onClick` is set the whole
 * row is a keyboard-activatable `role="button"`. Identical props/behavior to
 * {@link PledgeRowProps}. All colors from `--xen-*` token classes (no literals).
 */
exports.PledgeRowV4 = React.forwardRef(function PledgeRowV4({ donorName, avatarUrl, amountCents, currency = 'USD', status = 'pending', dueLabel, onFulfill, onClick, loading = false, className, ...rest }, ref) {
    const meta = STATUS[status];
    const open = status === 'pending' || status === 'overdue';
    const label = `${donorName}, ${(0, internal_1.formatMoney)(amountCents, currency)} pledge, ${meta.label}`;
    const container = 'flex items-center gap-md rounded-lg border border-border bg-surface text-on-surface shadow-md px-md py-sm';
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10", children: (0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { name: donorName, src: avatarUrl, size: "sm" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: donorName }), (0, jsx_runtime_1.jsxs)(Badge_1.Badge, { tone: meta.tone, variant: "soft", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: meta.glyph, size: "xs", "aria-hidden": true }), meta.label] })] }), dueLabel ? ((0, jsx_runtime_1.jsxs)("span", { className: "inline-flex w-fit items-center gap-xs rounded-full bg-primary/10 px-sm py-px text-sm text-primary", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDCC5", size: "xs", "aria-hidden": true }), dueLabel] })) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: (0, internal_1.formatMoney)(amountCents, currency) }), open && onFulfill ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", variant: "secondary", disabled: loading, onClick: (e) => {
                            e.stopPropagation();
                            onFulfill();
                        }, children: "Mark fulfilled" })) : null] })] }));
    if (onClick) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "button", tabIndex: 0, "aria-label": label, onClick: onClick, onKeyDown: (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick();
                }
            }, className: (0, cn_1.cn)(container, 'cursor-pointer text-left transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), ...rest, children: inner }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "aria-label": label, className: (0, cn_1.cn)(container, className), ...rest, children: inner }));
});
//# sourceMappingURL=PledgeRowV4.js.map