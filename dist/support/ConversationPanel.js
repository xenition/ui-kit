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
exports.ConversationPanel = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Button_1 = require("../primitives/Button");
const commerce_1 = require("../commerce");
function bubbleSpec(m) {
    if (m.internal) {
        return { role: 'Internal note', align: 'self-end', cls: 'border border-warn bg-neutral-100' };
    }
    if (m.author === 'agent')
        return { role: 'Agent', align: 'self-end', cls: 'bg-primary-50' };
    if (m.author === 'system')
        return { role: 'System', align: 'self-center', cls: 'bg-neutral-100' };
    return { role: 'Customer', align: 'self-start', cls: 'border border-border bg-surface' };
}
/**
 * A support-ticket conversation thread with an inline reply composer. Renders
 * customer / agent / system / internal-note bubbles (aligned + tinted by author,
 * with the author role in text so it's not color-only), plus a textarea and a
 * "Reply" button that reports the trimmed draft via `onReply`. Handles the
 * `loading` and empty-thread (`EmptyState`) states. The composer can be
 * controlled (`replyValue` + `onChangeReply`) or uncontrolled. Token colors only.
 */
exports.ConversationPanel = React.forwardRef(function ConversationPanel({ messages, loading = false, emptyText = 'No messages yet.', replyValue, onChangeReply, onReply, sendLabel = 'Reply', hideComposer = false, disabled = false, className, ...rest }, ref) {
    const controlled = replyValue !== undefined;
    const [draft, setDraft] = React.useState('');
    const text = controlled ? replyValue : draft;
    const setText = (next) => {
        if (!controlled)
            setDraft(next);
        onChangeReply?.(next);
    };
    const submit = () => {
        const trimmed = text.trim();
        if (!trimmed)
            return;
        onReply?.(trimmed);
        if (!controlled)
            setDraft('');
    };
    let body;
    if (loading) {
        body = ((0, jsx_runtime_1.jsx)("div", { "aria-label": "Loading conversation", "aria-busy": "true", className: "flex animate-pulse flex-col gap-2 p-4", children: [0, 1, 2].map((i) => ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('h-10 rounded-[var(--xen-radius-md)] bg-neutral-100', i % 2 === 0 ? 'w-[60%] self-start' : 'w-[75%] self-end') }, i))) }));
    }
    else if (messages.length === 0) {
        body = (0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { title: emptyText, className: "border-0" });
    }
    else {
        body = ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-2 overflow-y-auto p-3", children: messages.map((m) => {
                const spec = bubbleSpec(m);
                return ((0, jsx_runtime_1.jsxs)("div", { "aria-label": `${spec.role}${m.authorName ? ` ${m.authorName}` : ''}: ${m.body}`, className: (0, cn_1.cn)('rounded-[var(--xen-radius-md)] px-3 py-2', spec.align, spec.cls, m.author === 'system' ? 'max-w-[90%]' : 'max-w-[82%]'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "mb-0.5 flex gap-1 text-xs font-semibold text-muted", children: [(0, jsx_runtime_1.jsxs)("span", { children: [m.internal ? '🔒 ' : '', m.authorName ?? spec.role] }), m.timeLabel ? (0, jsx_runtime_1.jsx)("span", { className: "font-normal", children: m.timeLabel }) : null] }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-on-surface", children: m.body })] }, m.id));
            }) }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "flex-1", children: body }), hideComposer ? null : ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-end gap-2 border-t border-border p-2", children: [(0, jsx_runtime_1.jsx)("textarea", { "aria-label": "Reply message", value: text, onChange: (e) => setText(e.target.value), disabled: disabled, placeholder: "Write a reply\u2026", rows: 2, className: "max-h-[120px] min-h-[40px] flex-1 rounded-[var(--xen-radius-md)] border border-border bg-surface px-2 py-1 text-sm text-on-surface placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 disabled:opacity-50" }), (0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", onClick: submit, disabled: disabled || text.trim().length === 0, children: sendLabel })] }))] }));
});
//# sourceMappingURL=ConversationPanel.js.map