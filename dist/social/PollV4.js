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
exports.PollV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * Poll — **V4** "feed" design (web parity of the native V4). Clean and airy with
 * a single primary accent: before voting, big (≥44px) tappable option rows;
 * after voting or when `closed`, each row becomes a soft-primary fill bar showing
 * the `%`, with the viewer's pick and the leading option emphasized in primary.
 * Keeps the total-votes + expiry caption and guards an all-zero tally. Same
 * props/behavior as {@link PollProps}; token-only, `role="radiogroup"`/
 * `role="radio"` semantics.
 */
exports.PollV4 = React.forwardRef(function PollV4({ question, options, votedOptionId, closed = false, onVote, meta, className, ...rest }, ref) {
    const total = options.reduce((sum, o) => sum + (o.votes ?? 0), 0);
    const showResults = closed || votedOptionId != null;
    const leadVotes = options.reduce((max, o) => Math.max(max, o.votes ?? 0), 0);
    const derivedMeta = meta ?? `${total.toLocaleString()} ${total === 1 ? 'vote' : 'votes'}${closed ? ' · Final' : ''}`;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "radiogroup", "aria-label": question, className: (0, cn_1.cn)('flex flex-col gap-sm rounded-[var(--xen-radius-lg)] border border-border bg-surface p-lg', className), ...rest, children: [(0, jsx_runtime_1.jsx)("p", { className: "text-base font-bold text-on-surface", children: question }), options.map((o) => {
                const votes = o.votes ?? 0;
                const pct = total > 0 ? Math.round((votes / total) * 100) : 0;
                const selected = votedOptionId === o.id;
                const leading = showResults && votes === leadVotes && leadVotes > 0;
                if (showResults) {
                    return ((0, jsx_runtime_1.jsxs)("div", { role: "radio", "aria-checked": selected, "aria-label": `${o.label}, ${pct}%`, className: (0, cn_1.cn)('relative flex min-h-[44px] items-center overflow-hidden rounded-full border', selected || leading ? 'border-primary' : 'border-border'), children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('absolute inset-y-0 left-0', selected || leading ? 'bg-primary/20' : 'bg-primary/10'), style: { width: `${pct}%` }, "aria-hidden": "true" }), (0, jsx_runtime_1.jsxs)("div", { className: "relative flex w-full items-center justify-between px-md py-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm', selected || leading ? 'font-bold text-primary' : 'font-medium text-on-surface'), children: selected ? `✓ ${o.label}` : o.label }), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('text-sm font-bold', selected || leading ? 'text-primary' : 'text-on-surface'), children: [pct, "%"] })] })] }, o.id));
                }
                return ((0, jsx_runtime_1.jsx)("button", { type: "button", role: "radio", "aria-checked": false, "aria-label": o.label, disabled: !onVote, onClick: onVote ? () => onVote(o.id) : undefined, className: (0, cn_1.cn)('flex min-h-[44px] items-center justify-center rounded-full bg-primary/10 px-md py-sm text-center text-sm font-semibold text-primary transition-colors', 'hover:bg-primary hover:text-on-primary', 'disabled:pointer-events-none'), children: o.label }, o.id));
            }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: derivedMeta })] }));
});
//# sourceMappingURL=PollV4.js.map