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
exports.MessageGroupV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const ReadReceipt_1 = require("./ReadReceipt");
/**
 * MessageGroup — **tailed bubbles** variant (iMessage feel). Rather than the v1
 * stack of uniform rounded `ChatBubble`s, this draws its own bubbles where the
 * *last* bubble in the run grows a directional tail (a squared-off bottom
 * corner) toward the author's side, and the group's avatar sits inline beside
 * the run. Outgoing bubbles use the primary fill; incoming use a bordered
 * surface fill. Same props as `MessageGroup`. No literal colors.
 */
exports.MessageGroupV2 = React.forwardRef(function MessageGroupV2({ side = 'them', messages, authorName, avatarUri, showAvatar, receipt, className, ...rest }, ref) {
    const me = side === 'me';
    const withAvatar = showAvatar ?? !me;
    const lastIndex = messages.length - 1;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-live": me ? 'off' : 'polite', className: (0, cn_1.cn)('flex items-end gap-2', me ? 'justify-end' : 'justify-start', className), ...rest, children: [withAvatar && !me ? (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: "sm", src: avatarUri, name: authorName }) : null, (0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex min-w-0 max-w-[78%] flex-col gap-1', me ? 'items-end' : 'items-start'), children: [authorName && !me ? ((0, jsx_runtime_1.jsx)("span", { className: "ml-2 text-xs font-bold text-accent", children: authorName })) : null, messages.map((msg, i) => {
                        const isLast = i === lastIndex;
                        // The tail is a single squared-off bottom corner on the last bubble,
                        // pointing toward the speaker's edge — the iMessage silhouette.
                        return ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('rounded-lg px-4 py-2', me ? 'bg-primary text-on-primary' : 'border border-border bg-surface text-on-surface', isLast && (me ? 'rounded-br-sm' : 'rounded-bl-sm')), children: [(0, jsx_runtime_1.jsx)("span", { className: "block whitespace-pre-wrap break-words text-base", children: msg.text }), isLast && msg.time ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('mt-0.5 block text-right text-xs', me ? 'text-on-primary opacity-80' : 'text-muted'), children: msg.time })) : null] }, msg.id));
                    }), me && receipt ? (0, jsx_runtime_1.jsx)(ReadReceipt_1.ReadReceipt, { status: receipt }) : null] })] }));
});
//# sourceMappingURL=MessageGroupV2.js.map