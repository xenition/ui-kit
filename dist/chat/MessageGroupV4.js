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
exports.MessageGroupV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const AvatarV4_1 = require("../primitives/AvatarV4");
const ChatBubbleV4_1 = require("../primitives/ChatBubbleV4");
const ReadReceiptV4_1 = require("./ReadReceiptV4");
/**
 * **V4 message group** — the web twin of the native `MessageGroupV4`, same
 * props as {@link MessageGroup} plus `onRetry` and `retryLabel`.
 *
 * ## Four changes
 *
 * 1. **A failed send can be retried**, through the receipt.
 * 2. **The group is one labelled list**, so a reader hears "Ada, 3 messages"
 *    and can step through them, rather than meeting a wall of bubbles with no
 *    author attached to any of them.
 * 3. **The avatar column is reserved even when the avatar is hidden**, so
 *    consecutive groups from the same author stay on one left edge instead of
 *    stepping in and out.
 * 4. **Renders nothing for an empty `messages`** (§4.5) — the base drew an
 *    avatar and a receipt attached to no message at all.
 */
exports.MessageGroupV4 = React.forwardRef(function MessageGroupV4({ side = 'them', messages, authorName, avatarUri, showAvatar = true, receipt, onRetry, retryLabel, className, ...rest }, ref) {
    const list = messages?.filter((m) => m?.id != null) ?? [];
    if (list.length === 0)
        return null;
    const me = side === 'me';
    const groupName = authorName
        ? `${authorName}, ${list.length} ${list.length === 1 ? 'message' : 'messages'}`
        : undefined;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex w-full gap-sm', me ? 'flex-row-reverse' : 'flex-row', className), ...rest, children: [!me && (
            // Reserved even when hidden, so consecutive groups keep one edge.
            (0, jsx_runtime_1.jsx)("div", { className: "w-8 shrink-0", children: showAvatar && (0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { size: "sm", src: avatarUri, name: authorName, alt: "" }) })), (0, jsx_runtime_1.jsx)("ul", { "aria-label": groupName, className: (0, cn_1.cn)('flex min-w-0 flex-1 flex-col gap-xs', me ? 'items-end' : 'items-start'), children: list.map((message, index) => ((0, jsx_runtime_1.jsx)("li", { className: (0, cn_1.cn)('flex w-full', me ? 'justify-end' : 'justify-start'), children: (0, jsx_runtime_1.jsx)(ChatBubbleV4_1.ChatBubbleV4, { side: side, meta: index === 0 && authorName && !me
                            ? authorName
                            : index === list.length - 1
                                ? message.time
                                : undefined, children: message.text }) }, message.id))) }), me && receipt != null && ((0, jsx_runtime_1.jsx)("div", { className: "flex shrink-0 items-end pb-xs", children: (0, jsx_runtime_1.jsx)(ReadReceiptV4_1.ReadReceiptV4, { status: receipt, onRetry: onRetry, retryLabel: retryLabel }) }))] }));
});
//# sourceMappingURL=MessageGroupV4.js.map