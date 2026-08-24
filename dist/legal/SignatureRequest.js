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
exports.SignatureRequest = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * An e-signature request: the document, the signer (avatar + role), and a
 * lifecycle pill (glyph + word so state never rests on color alone). A `draft`
 * shows a "Request signature" button (`onRequest`); an in-flight request
 * (`sent` / `viewed`) shows "Sign" / "Remind". Terminal states hide actions.
 * When `onClick` is set the card is an accessible `role="button"`. All colors
 * are `--xen-*` token classes — no literals.
 */
exports.SignatureRequest = React.forwardRef(function SignatureRequest({ document, signer, signerRole, signerAvatarUrl, status = 'draft', sentDate, dueDate, variant = 'default', onRequest, onRemind, onSign, onClick, testID, className, ...rest }, ref) {
    const compact = variant === 'compact';
    const isDraft = status === 'draft';
    const awaiting = status === 'sent' || status === 'viewed';
    const interactive = Boolean(onClick);
    const meta = [
        sentDate ? `Sent ${sentDate}` : undefined,
        dueDate ? `Due ${dueDate}` : undefined,
    ]
        .filter(Boolean)
        .join(' · ');
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { ref: ref, "data-testid": testID, role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? `Signature request: ${document}` : undefined, onClick: interactive ? onClick : undefined, onKeyDown: interactive ? (0, internal_1.activateOnKey)(onClick) : undefined, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)]', compact && 'p-[var(--xen-space-md)]', interactive && 'cursor-pointer', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-lg leading-none", children: "\u270D" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-bold text-on-surface", children: document }), meta ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: meta }) : null] }), (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.SIGNATURE_STATUS_META[status], size: "sm" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: "sm", name: signer, src: signerAvatarUrl }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs font-semibold text-on-surface", children: signer }), signerRole ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: signerRole }) : null] })] }), isDraft && onRequest ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "primary", className: "self-start", onClick: (e) => {
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
//# sourceMappingURL=SignatureRequest.js.map