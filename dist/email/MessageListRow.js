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
exports.MessageListRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const StarButton_1 = require("./StarButton");
const MailLabelChip_1 = require("./MailLabelChip");
/**
 * One row in a mail list — avatar, sender, subject, preview snippet, timestamp,
 * plus star / attachment / thread-count / label affordances. The row is an
 * interactive `role="button"` element (keyboard-operable via Enter/Space); the
 * star lives in its own real `<button>` and stops propagation. The `unread`
 * variant bolds the sender+subject, shows a leading accent dot, and spells out
 * "unread" in the accessible label so the state is never color-alone. Data +
 * callbacks only; every color from token classes. No literal colors.
 */
exports.MessageListRow = React.forwardRef(function MessageListRow({ sender, subject, preview, timestamp, avatarUri, unread = false, starred = false, onToggleStar, hasAttachments = false, threadCount = 1, labels, selected = false, onClick, onLongPress, className, }, ref) {
    const safeLabels = labels ?? [];
    const count = threadCount > 1 ? threadCount : 0;
    const a11yLabel = [
        unread ? 'Unread' : 'Read',
        `from ${sender}`,
        subject,
        hasAttachments ? 'has attachment' : undefined,
        starred ? 'starred' : undefined,
        timestamp,
    ]
        .filter(Boolean)
        .join(', ');
    const activate = () => onClick?.();
    const onKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            activate();
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "button", tabIndex: 0, "aria-label": a11yLabel, "aria-pressed": selected, onClick: activate, onKeyDown: onKeyDown, onContextMenu: onLongPress
            ? (e) => {
                e.preventDefault();
                onLongPress();
            }
            : undefined, className: (0, cn_1.cn)('flex w-full cursor-pointer items-start gap-[var(--xen-space-md)] px-[var(--xen-space-md)] py-[var(--xen-space-sm)] text-left transition-colors', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', selected ? 'bg-neutral-100' : 'bg-surface hover:bg-neutral-100', className), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('mt-[var(--xen-space-sm)] inline-block h-2 w-2 shrink-0 rounded-full', unread ? 'bg-primary' : 'bg-transparent') }), (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: "md", src: avatarUri, name: sender }), (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('min-w-0 flex-1 truncate text-base text-on-surface', unread ? 'font-bold' : 'font-medium'), children: sender }), count > 0 ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-muted", children: count > 99 ? '99+' : String(count) })) : null, timestamp ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs', unread ? 'font-bold text-primary' : 'font-normal text-muted'), children: timestamp })) : null] }), (0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [hasAttachments ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83D\uDCCE", size: "xs", color: "muted", "aria-label": "Has attachment" }) : null, (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('min-w-0 flex-1 truncate text-sm text-on-surface', unread ? 'font-semibold' : 'font-normal'), children: subject }), onToggleStar ? ((0, jsx_runtime_1.jsx)("span", { onClick: (e) => e.stopPropagation(), onKeyDown: (e) => e.stopPropagation(), className: "inline-flex", children: (0, jsx_runtime_1.jsx)(StarButton_1.StarButton, { starred: starred, onToggle: onToggleStar, size: "base" }) })) : starred ? ((0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2605", size: "base", color: "warn", "aria-label": "Starred" })) : null] }), preview ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm text-muted", children: preview }) : null, safeLabels.length > 0 ? ((0, jsx_runtime_1.jsx)("span", { className: "mt-0.5 flex flex-wrap gap-[var(--xen-space-xs)]", children: safeLabels.map((l) => ((0, jsx_runtime_1.jsx)(MailLabelChip_1.MailLabelChip, { label: l.label, tone: l.tone ?? 'neutral' }, l.id))) })) : null] })] }));
});
//# sourceMappingURL=MessageListRow.js.map