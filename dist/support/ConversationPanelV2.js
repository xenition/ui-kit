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
exports.ConversationPanelV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Button_1 = require("../primitives/Button");
const commerce_1 = require("../commerce");
/**
 * ConversationPanel, redesigned (v2): a **chat-bubble thread**. Agent replies sit
 * right in primary bubbles, customer messages left in bordered surface bubbles,
 * system lines center as quiet notes, and internal notes tint warn. A rounded
 * composer with a send button anchors the foot. Distinct from v1. Same props,
 * token-only.
 */
exports.ConversationPanelV2 = React.forwardRef(function ConversationPanelV2({ messages, loading = false, emptyText = 'No messages yet', replyValue, onChangeReply, onReply, sendLabel = 'Reply', hideComposer = false, disabled = false, className, ...rest }, ref) {
    const [local, setLocal] = React.useState('');
    const draft = replyValue ?? local;
    const setDraft = (v) => {
        if (replyValue === undefined)
            setLocal(v);
        onChangeReply?.(v);
    };
    const send = () => {
        const t = draft.trim();
        if (!t)
            return;
        onReply?.(t);
        if (replyValue === undefined)
            setLocal('');
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-conversation-panel": "", className: (0, cn_1.cn)('flex flex-col gap-3', className), ...rest, children: [loading ? ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", "aria-busy": "true", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-10 w-2/3 animate-pulse rounded-lg bg-neutral-100" }), (0, jsx_runtime_1.jsx)("div", { className: "ml-auto h-10 w-1/2 animate-pulse rounded-lg bg-neutral-100" })] })) : messages.length === 0 ? ((0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { icon: (0, jsx_runtime_1.jsx)("span", { className: "text-3xl", children: "\uD83D\uDCAC" }), title: emptyText })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-2", children: messages.map((m) => {
                    if (m.author === 'system') {
                        return (0, jsx_runtime_1.jsx)("p", { className: "mx-auto text-xs text-muted", children: m.body }, m.id);
                    }
                    const isAgent = m.author === 'agent';
                    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex flex-col', isAgent ? 'items-end' : 'items-start'), children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('max-w-[80%] rounded-2xl px-3 py-2 text-sm', m.internal ? 'bg-warn/10 text-on-surface' : isAgent ? 'bg-primary text-on-primary' : 'border border-border bg-surface text-on-surface'), children: m.body }), (0, jsx_runtime_1.jsx)("span", { className: "mt-0.5 text-[10px] text-muted", children: [m.authorName, m.timeLabel, m.internal ? 'internal' : null].filter(Boolean).join(' · ') })] }, m.id));
                }) })), !hideComposer ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5", children: [(0, jsx_runtime_1.jsx)("input", { type: "text", value: draft, disabled: disabled, onChange: (e) => setDraft(e.target.value), onKeyDown: (e) => { if (e.key === 'Enter') {
                            e.preventDefault();
                            send();
                        } }, placeholder: "Type a reply\u2026", "aria-label": "Reply", className: "min-w-0 flex-1 bg-transparent text-sm text-on-surface outline-none placeholder:text-muted" }), (0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", variant: "primary", disabled: disabled || !draft.trim(), onClick: send, children: sendLabel })] })) : null] }));
});
//# sourceMappingURL=ConversationPanelV2.js.map