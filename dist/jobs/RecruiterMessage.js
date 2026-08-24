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
exports.RecruiterMessage = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const primitives_1 = require("../primitives");
const cn_1 = require("../primitives/cn");
const format_1 = require("./format");
/**
 * An inbox row for a recruiter message: sender avatar, name + company, a
 * one-line preview, sent age, and an unread state. Unread is signalled by BOTH
 * a token dot and bold text (never color alone) and announced in the accessible
 * label. Data + callbacks only; tokens only.
 */
exports.RecruiterMessage = React.forwardRef(function RecruiterMessage({ message, onClick, onReply, className, ...rest }, ref) {
    const sent = (0, format_1.formatRelative)(message.sentAt);
    const unread = !!message.unread;
    const interactive = onClick != null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-recruiter-message": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": `${unread ? 'Unread. ' : ''}Message from ${message.senderName}${message.company ? ` at ${message.company}` : ''}`, onClick: interactive ? () => onClick(message) : undefined, onKeyDown: interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick(message);
                }
            }
            : undefined, className: (0, cn_1.cn)('flex items-start gap-md border-b border-border bg-surface px-md py-md', interactive && 'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: message.senderAvatarUrl, name: message.senderName, size: "md" }), unread ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", "data-xen-unread-dot": "", className: "absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-surface bg-primary" })) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between gap-sm", children: [(0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('flex-1 truncate text-sm text-on-surface', unread ? 'font-bold' : 'font-semibold'), children: [message.senderName, message.company ? ((0, jsx_runtime_1.jsx)("span", { className: "font-normal text-muted", children: `  ·  ${message.company}` })) : null] }), sent ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: sent }) : null] }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('line-clamp-2 text-sm', unread ? 'font-medium text-on-surface' : 'font-normal text-muted'), children: message.preview }), onReply ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `Reply to ${message.senderName}`, onClick: (e) => {
                            e.stopPropagation();
                            onReply(message);
                        }, className: "mt-xs self-start text-xs font-semibold text-primary", children: "Reply" })) : null] })] }));
});
//# sourceMappingURL=RecruiterMessage.js.map