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
exports.EmailThreadV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
const StarButton_1 = require("./StarButton");
const AttachmentChip_1 = require("./AttachmentChip");
const MailLabelChip_1 = require("./MailLabelChip");
/**
 * EmailThread — design **V3**. A **flat, quoted-style conversation**: each
 * message hangs off a colored vertical **sender rail** (like a quote block)
 * instead of a card, with no elevation — a calm, document-like read. The rail
 * tint alternates primary / accent per message so adjacent replies read
 * distinctly, and dims to a neutral hairline when the message is collapsed. Each
 * message is a `role="button"` toggle (body + attachments when open, snippet when
 * closed). Handles loading and empty states. Same props as `EmailThread`. No
 * literal colors.
 */
exports.EmailThreadV3 = React.forwardRef(function EmailThreadV3({ subject, messages, labels, expandedIds, onToggleMessage, onToggleStar, onPressAttachment, loading = false, className }, ref) {
    const safeMessages = messages ?? [];
    const safeLabels = labels ?? [];
    const lastId = safeMessages.length > 0 ? safeMessages[safeMessages.length - 1].id : undefined;
    const expanded = new Set(expandedIds ?? (lastId ? [lastId] : []));
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "status", "aria-label": "Loading messages", className: (0, cn_1.cn)('flex items-center justify-center bg-surface p-[var(--xen-space-xl)]', className), children: (0, jsx_runtime_1.jsx)(primitives_1.Spinner, {}) }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('bg-surface', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-sm)] px-[var(--xen-space-md)] py-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-xl font-bold text-on-surface", children: subject }), safeLabels.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-[var(--xen-space-xs)]", children: safeLabels.map((l) => ((0, jsx_runtime_1.jsx)(MailLabelChip_1.MailLabelChip, { label: l.label, tone: l.tone ?? 'neutral' }, l.id))) })) : null] }), safeMessages.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "p-[var(--xen-space-xl)]", children: (0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { title: "No messages", description: "This conversation is empty." }) })) : (safeMessages.map((m, i) => {
                const isOpen = expanded.has(m.id);
                const atts = m.attachments ?? [];
                // Alternate the rail tint per message so adjacent replies read distinctly.
                const railColor = !isOpen ? 'border-l-border' : i % 2 === 0 ? 'border-l-primary' : 'border-l-accent';
                return ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('mx-[var(--xen-space-md)] my-[var(--xen-space-xs)] border-l-4 pl-[var(--xen-space-md)] transition-colors duration-200', railColor), children: [(0, jsx_runtime_1.jsxs)("div", { role: "button", tabIndex: 0, "aria-label": `${isOpen ? 'Collapse' : 'Expand'} message from ${m.sender}`, "aria-expanded": isOpen, onClick: () => onToggleMessage?.(m.id), onKeyDown: (e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    onToggleMessage?.(m.id);
                                }
                            }, className: "flex cursor-pointer items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-sm)] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: "sm", src: m.avatarUri, name: m.sender }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("div", { className: "truncate text-sm font-bold text-on-surface", children: m.sender }), !isOpen ? (0, jsx_runtime_1.jsx)("div", { className: "truncate text-xs text-muted", children: m.body }) : null] }), m.timestamp ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: m.timestamp }) : null, (0, jsx_runtime_1.jsx)(StarButton_1.StarButton, { starred: m.starred ?? false, onToggle: onToggleStar ? (s) => onToggleStar(m.id, s) : undefined, size: "sm" })] }), isOpen ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-sm)] flex flex-col gap-[var(--xen-space-sm)] pb-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-base leading-relaxed text-on-surface", children: m.body }), atts.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-[var(--xen-space-xs)]", children: atts.map((a) => ((0, jsx_runtime_1.jsx)(AttachmentChip_1.AttachmentChip, { name: a.name, kind: a.kind ?? 'file', size: a.size, onClick: onPressAttachment ? () => onPressAttachment(m.id, a.id) : undefined }, a.id))) })) : null] })) : null] }, m.id));
            }))] }));
});
//# sourceMappingURL=EmailThreadV3.js.map