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
exports.MessageBubble = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Avatar_1 = require("../primitives/Avatar");
// Delivery status → glyph + label. `failed` is the only danger-toned hint.
const STATUS_TEXT = {
    sending: 'Sending…',
    sent: '✓ Sent',
    failed: '⚠ Failed to send',
};
/**
 * MessageBubble — **V4** "calm console" chat bubble. A single message in an
 * agent↔customer thread. Agent messages align right on a soft-primary tint
 * bubble; customer messages align left on a bordered surface bubble — one accent
 * = primary, no second color. Comfortable rounded padding, a muted sender label,
 * an optional avatar, an optional muted timestamp, and an optional delivery hint
 * (`sending`/`sent`/`failed`, the last in danger). The whole row is announced as
 * "{author} said: {body}". Presentational only. All colors from `--xen-*` token
 * classes (no literal hex). Dark-mode safe.
 */
exports.MessageBubble = React.forwardRef(function MessageBubble({ author, body, time, side = 'customer', avatarUrl, status, className, ...rest }, ref) {
    const isAgent = side === 'agent';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "group", "aria-label": `${author} said: ${body}`, className: (0, cn_1.cn)('flex w-full gap-2', isAgent ? 'flex-row-reverse' : 'flex-row', className), ...rest, children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { size: "sm", name: author, src: avatarUrl, "aria-hidden": "true" }), (0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex min-w-0 max-w-[80%] flex-col gap-1', isAgent ? 'items-end' : 'items-start'), children: [(0, jsx_runtime_1.jsx)("span", { className: "px-1 text-xs font-medium text-muted", children: author }), (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('rounded-[var(--xen-radius-lg)] px-3 py-2 text-sm leading-relaxed', isAgent
                            ? 'bg-primary/10 text-on-surface rounded-tr-[var(--xen-radius-sm)]'
                            : 'border border-border bg-surface text-on-surface rounded-tl-[var(--xen-radius-sm)]'), children: body }), (0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex items-center gap-2 px-1', isAgent ? 'flex-row-reverse' : 'flex-row'), children: [time ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: time }) : null, status ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs', status === 'failed' ? 'font-bold text-danger' : 'text-muted'), children: STATUS_TEXT[status] })) : null] })] })] }));
});
//# sourceMappingURL=MessageBubble.js.map