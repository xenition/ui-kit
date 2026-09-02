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
exports.SignatureRequestV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * SignatureRequest — **V4** "chambers" design (web parity of the native V4). The
 * distinguished, chambers take on an e-signature request: an elevated rounded
 * card with a soft shadow, a signature glyph + document title, a sent / due meta
 * line, a labelled glyph + word lifecycle pill (never color alone), and the
 * signer (avatar + role) in a soft-primary well. A `draft` shows a "Request
 * signature" button; an in-flight request (`sent` / `viewed`) shows "Sign" /
 * "Remind"; terminal states hide actions. When `onClick` is set the card is a
 * keyboard-activable `role="button"`. Reuses the base `variant`
 * (`default` / `compact`). All colors from `--xen-*` token classes (no literals).
 */
exports.SignatureRequestV4 = React.forwardRef(function SignatureRequestV4({ document, signer, signerRole, signerAvatarUrl, status = 'draft', sentDate, dueDate, variant = 'default', onRequest, onRemind, onSign, onClick, testID, className, ...rest }, ref) {
    const compact = variant === 'compact';
    const isDraft = status === 'draft';
    const awaiting = status === 'sent' || status === 'viewed';
    const interactive = Boolean(onClick);
    const meta = [sentDate ? `Sent ${sentDate}` : undefined, dueDate ? `Due ${dueDate}` : undefined].filter(Boolean).join(' · ');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-testid": testID, "data-xen-signature-request": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? `Signature request: ${document}` : undefined, onClick: interactive ? onClick : undefined, onKeyDown: interactive ? (0, internal_1.activateOnKey)(onClick) : undefined, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm', compact ? 'p-[var(--xen-space-md)]' : 'p-[var(--xen-space-lg)]', interactive && 'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] bg-primary/10 text-lg leading-none", children: "\u270D" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-bold text-on-surface", children: document }), meta ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: meta }) : null] }), (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.SIGNATURE_STATUS_META[status], variant: "soft", size: "sm" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] bg-primary/5 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: "sm", name: signer, src: signerAvatarUrl }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs font-semibold text-on-surface", children: signer }), signerRole ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: signerRole }) : null] })] }), isDraft && onRequest ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "primary", className: "self-start", onClick: (e) => {
                    e.stopPropagation();
                    onRequest();
                }, children: "Request signature" })) : awaiting && (onSign || onRemind) ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-[var(--xen-space-xs)]", children: [onSign ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "primary", onClick: (e) => {
                            e.stopPropagation();
                            onSign();
                        }, children: "Sign" })) : null, onRemind ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "outline", onClick: (e) => {
                            e.stopPropagation();
                            onRemind();
                        }, children: "Remind" })) : null] })) : null] }));
});
//# sourceMappingURL=SignatureRequestV4.js.map