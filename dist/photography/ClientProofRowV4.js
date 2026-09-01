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
exports.ClientProofRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const DECISION = {
    pending: { label: 'Pending', tone: 'neutral', glyph: '⏳' },
    approved: { label: 'Approved', tone: 'success', glyph: '✅' },
    rejected: { label: 'Rejected', tone: 'danger', glyph: '⛔' },
};
/**
 * ClientProofRow — **V4** "studio" design (web parity of the native V4). The
 * matted proofing row: an elevated clean-surface row whose thumbnail floats
 * inside a thin neutral **mat** (a soft-primary selection ring when picked for a
 * batch), a bold filename, and a labelled decision `Badge` carrying glyph + token
 * tone + label (never color alone). While `pending` the base's approve/reject
 * actions render as trailing `Button`s that stop propagation so they never toggle
 * selection. The row body is a keyboard-operable `checkbox` when `onToggleSelect`
 * is provided (selection carries `aria-checked`, never color alone). Identical
 * props/behavior to {@link ClientProofRowProps}; all colors from `--xen-*`
 * token classes.
 */
exports.ClientProofRowV4 = React.forwardRef(function ClientProofRowV4({ filename, thumbUrl, decision = 'pending', selected = false, onToggleSelect, onApprove, onReject, approveLabel = 'Approve', rejectLabel = 'Reject', className, ...rest }, ref) {
    const meta = DECISION[decision];
    const selectable = typeof onToggleSelect === 'function';
    const body = ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-11 w-11 shrink-0 overflow-hidden rounded-[var(--xen-radius-md)] bg-neutral-100 ring-1 ring-inset ring-border', selected && 'ring-2 ring-accent'), children: thumbUrl ? ((0, jsx_runtime_1.jsx)("img", { src: thumbUrl, alt: "", loading: "lazy", className: "h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex h-full w-full items-center justify-center text-lg text-muted", "aria-hidden": "true", children: "\uD83D\uDDBC" })) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-bold text-on-surface", children: filename }), (0, jsx_runtime_1.jsx)("span", { className: "inline-flex w-fit", children: (0, jsx_runtime_1.jsxs)(primitives_1.Badge, { tone: meta.tone, variant: "soft", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: meta.glyph }), " ", meta.label] }) })] })] }));
    const actions = decision === 'pending' && (onApprove || onReject) ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex shrink-0 gap-[var(--xen-space-xs)]", children: [onReject ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "danger", onClick: (e) => {
                    e.stopPropagation();
                    onReject();
                }, children: rejectLabel })) : null, onApprove ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "primary", onClick: (e) => {
                    e.stopPropagation();
                    onApprove();
                }, children: approveLabel })) : null] })) : null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-client-proof-row": "", className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)] text-on-surface shadow-md', className), ...rest, children: [selectable ? ((0, jsx_runtime_1.jsx)("div", { role: "checkbox", "aria-checked": selected, "aria-label": `${filename}, ${meta.label}`, tabIndex: 0, onClick: onToggleSelect, onKeyDown: (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onToggleSelect?.();
                    }
                }, className: "flex flex-1 cursor-pointer items-center rounded-[var(--xen-radius-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", children: body })) : (body), actions] }));
});
//# sourceMappingURL=ClientProofRowV4.js.map