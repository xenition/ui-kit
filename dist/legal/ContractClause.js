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
exports.ContractClause = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * A single contract clause: section number, heading, and (when expanded) body,
 * with negotiation-status and risk pills (each a glyph + word so state never
 * rests on color alone). A flagged / high-risk clause gets a token-tinted left
 * rail for scannability. When `onToggle` + `body` are set the clause is an
 * accessible `role="button"` with `aria-expanded`. All colors are `--xen-*`
 * token classes — no literals.
 */
exports.ContractClause = React.forwardRef(function ContractClause({ number, title, body, status, risk, expanded = false, variant = 'default', onToggle, testID, className, ...rest }, ref) {
    const compact = variant === 'compact';
    // Risk / flag drives a token-tinted accent rail; default rail is the border.
    const railTone = risk === 'high' || status === 'flagged'
        ? 'danger'
        : risk === 'medium' || status === 'negotiate'
            ? 'warn'
            : status === 'agreed'
                ? 'success'
                : 'neutral';
    const railClass = railTone === 'neutral' ? 'bg-border' : (0, internal_1.toneBgClass)(railTone);
    const interactive = Boolean(onToggle) && Boolean(body);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-testid": testID, role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-expanded": interactive ? expanded : undefined, "aria-label": interactive ? `${expanded ? 'Collapse' : 'Expand'} clause ${title}` : undefined, onClick: interactive ? () => onToggle?.(!expanded) : undefined, onKeyDown: interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
                    e.preventDefault();
                    onToggle?.(!expanded);
                }
            }
            : undefined, className: (0, cn_1.cn)('flex gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border border-border bg-surface px-[var(--xen-space-sm)] py-[var(--xen-space-sm)]', interactive && 'cursor-pointer hover:bg-neutral-100', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('w-[3px] shrink-0 rounded-full', railClass) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [number ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold text-muted", children: number })) : null, (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm font-semibold text-on-surface', compact && !expanded && 'truncate'), children: title })] }), status ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.CLAUSE_STATUS_META[status], size: "sm" }) : null] }), risk ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.CLAUSE_RISK_META[risk], variant: "inline", size: "sm" }) : null, expanded && body ? ((0, jsx_runtime_1.jsx)("p", { className: "text-xs leading-relaxed text-on-surface", children: body })) : null] })] }));
});
//# sourceMappingURL=ContractClause.js.map