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
exports.Poll = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * A click-to-vote poll with three states: open (clickable options), voted, and
 * closed. Once voted or closed each option becomes a labeled percentage bar,
 * the viewer's pick is tinted primary, and the leading option is emphasized.
 * Guards an all-zero tally. Web parity of the native `Poll`; token-only,
 * `role="radiogroup"`/`role="radio"` semantics.
 */
exports.Poll = React.forwardRef(function Poll({ question, options, votedOptionId, closed = false, onVote, meta, className, ...rest }, ref) {
    const total = options.reduce((sum, o) => sum + (o.votes ?? 0), 0);
    const showResults = closed || votedOptionId != null;
    const leadVotes = options.reduce((max, o) => Math.max(max, o.votes ?? 0), 0);
    const derivedMeta = meta ?? `${total.toLocaleString()} ${total === 1 ? 'vote' : 'votes'}${closed ? ' · Final' : ''}`;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "radiogroup", "aria-label": question, className: (0, cn_1.cn)('flex flex-col gap-sm rounded-lg border border-border bg-surface p-md', className), ...rest, children: [(0, jsx_runtime_1.jsx)("p", { className: "text-base font-bold text-on-surface", children: question }), options.map((o) => {
                const votes = o.votes ?? 0;
                const pct = total > 0 ? Math.round((votes / total) * 100) : 0;
                const selected = votedOptionId === o.id;
                const leading = showResults && votes === leadVotes && leadVotes > 0;
                if (showResults) {
                    return ((0, jsx_runtime_1.jsxs)("div", { role: "radio", "aria-checked": selected, "aria-label": `${o.label}, ${pct}%`, className: (0, cn_1.cn)('relative overflow-hidden rounded-md border', selected ? 'border-primary' : 'border-border'), children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('absolute inset-y-0 left-0', selected ? 'bg-primary opacity-20' : 'bg-neutral-100'), style: { width: `${pct}%` }, "aria-hidden": "true" }), (0, jsx_runtime_1.jsxs)("div", { className: "relative flex items-center justify-between px-md py-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm text-on-surface', leading ? 'font-bold' : 'font-medium'), children: selected ? `✓ ${o.label}` : o.label }), (0, jsx_runtime_1.jsxs)("span", { className: "text-sm font-bold text-on-surface", children: [pct, "%"] })] })] }, o.id));
                }
                return ((0, jsx_runtime_1.jsx)("button", { type: "button", role: "radio", "aria-checked": false, "aria-label": o.label, disabled: !onVote, onClick: onVote ? () => onVote(o.id) : undefined, className: (0, cn_1.cn)('rounded-md border border-primary bg-surface px-md py-sm text-center text-sm font-semibold text-primary transition-colors', 'hover:bg-primary hover:text-on-primary', 'disabled:pointer-events-none'), children: o.label }, o.id));
            }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: derivedMeta })] }));
});
//# sourceMappingURL=Poll.js.map