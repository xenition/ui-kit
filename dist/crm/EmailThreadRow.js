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
exports.EmailThreadRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const internal_1 = require("./internal");
/**
 * Inbox-style row for an email thread tied to a contact / deal: sender avatar,
 * subject, snippet, timestamp and a message-count badge. Unread threads read as
 * a bold subject plus a leading primary dot **and** an "Unread" a11y hint (not
 * color alone) over a `bg-primary-50` token wash. Guards `messageCount` (badge
 * only when > 1). When `onClick` is set the row is a `role="button"` div. All
 * colors are `--xen-*` token classes.
 */
exports.EmailThreadRow = React.forwardRef(function EmailThreadRow({ subject, from, snippet, avatarUrl, timestamp, unread = false, messageCount, hasAttachment = false, onClick, className, ...rest }, ref) {
    const showCount = messageCount != null && messageCount > 1;
    const interactive = onClick ? (0, internal_1.activate)(onClick) : {};
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": `${unread ? 'Unread, ' : ''}${from}: ${subject}`, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] px-[var(--xen-space-sm)] py-[var(--xen-space-sm)]', unread ? 'bg-primary-50' : 'bg-surface', onClick && 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), ...interactive, ...rest, children: [unread ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "h-2 w-2 shrink-0 rounded-full bg-primary" })) : ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "w-2 shrink-0" })), (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: "sm", name: from, src: avatarUrl }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('min-w-0 flex-1 truncate text-sm text-on-surface', unread ? 'font-bold' : 'font-semibold'), children: from }), timestamp ? (0, jsx_runtime_1.jsx)("span", { className: "shrink-0 text-xs text-muted", children: timestamp }) : null] }), (0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('truncate text-sm', unread ? 'font-semibold text-on-surface' : 'text-muted'), children: subject }), snippet ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: snippet }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-0.5", children: [hasAttachment ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-sm text-muted", children: "\uD83D\uDCCE" })) : null, showCount ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "neutral", children: `${messageCount}` }) : null] })] }));
});
//# sourceMappingURL=EmailThreadRow.js.map