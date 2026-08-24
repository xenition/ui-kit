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
exports.MessageListRowV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const StarButton_1 = require("./StarButton");
const MailLabelChip_1 = require("./MailLabelChip");
/**
 * MessageListRow — design **V2**. A tappable **card row**: a large sender avatar
 * carrying a corner unread dot, a two-line preview, a trailing timestamp, and a
 * "New" pill for the unread state (alongside bold text + the dot, so state is
 * never color-alone). Floats on a soft shadow and lifts / press-scales on
 * interaction. The `selected` state adds a primary ring + tint. Same props as
 * `MessageListRow`. No literal colors.
 */
exports.MessageListRowV2 = React.forwardRef(function MessageListRowV2({ sender, subject, preview, timestamp, avatarUri, unread = false, starred = false, onToggleStar, hasAttachments = false, threadCount = 1, labels, selected = false, onClick, onLongPress, className, }, ref) {
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
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "button", tabIndex: 0, "aria-label": a11yLabel, "aria-pressed": selected, onClick: activate, onKeyDown: (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                activate();
            }
        }, onContextMenu: onLongPress
            ? (e) => {
                e.preventDefault();
                onLongPress();
            }
            : undefined, className: (0, cn_1.cn)('flex w-full cursor-pointer items-start gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] m-[var(--xen-space-sm)] p-[var(--xen-space-md)] text-left shadow-sm transition duration-200', 'hover:-translate-y-0.5 hover:shadow-md active:scale-[.99]', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', 'motion-reduce:transition-none motion-reduce:hover:transform-none', selected ? 'border border-primary bg-primary/10' : 'bg-surface', className), children: [(0, jsx_runtime_1.jsxs)("span", { className: "relative shrink-0", children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: "lg", src: avatarUri, name: sender }), unread ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-surface bg-primary" })) : null] }), (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('min-w-0 flex-1 truncate text-base text-on-surface', unread ? 'font-bold' : 'font-semibold'), children: sender }), timestamp ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs', unread ? 'font-bold text-primary' : 'font-normal text-muted'), children: timestamp })) : null] }), (0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [hasAttachments ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83D\uDCCE", size: "xs", color: "muted", "aria-label": "Has attachment" }) : null, (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('min-w-0 flex-1 truncate text-sm text-on-surface', unread ? 'font-bold' : 'font-medium'), children: subject }), onToggleStar ? ((0, jsx_runtime_1.jsx)("span", { onClick: (e) => e.stopPropagation(), onKeyDown: (e) => e.stopPropagation(), className: "inline-flex", children: (0, jsx_runtime_1.jsx)(StarButton_1.StarButton, { starred: starred, onToggle: onToggleStar, size: "base" }) })) : starred ? ((0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2605", size: "base", color: "warn", "aria-label": "Starred" })) : null] }), preview ? (0, jsx_runtime_1.jsx)("span", { className: "line-clamp-2 text-sm text-muted", children: preview }) : null, (0, jsx_runtime_1.jsxs)("span", { className: "flex flex-wrap items-center gap-[var(--xen-space-xs)]", children: [unread ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "primary", variant: "soft", size: "sm", children: "New" })) : null, count > 0 ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "neutral", variant: "outline", size: "sm", children: count > 99 ? '99+' : String(count) })) : null, safeLabels.map((l) => ((0, jsx_runtime_1.jsx)(MailLabelChip_1.MailLabelChip, { label: l.label, tone: l.tone ?? 'neutral' }, l.id)))] })] })] }));
});
//# sourceMappingURL=MessageListRowV2.js.map