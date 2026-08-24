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
exports.MessageGroup = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const ReadReceipt_1 = require("./ReadReceipt");
/**
 * A run of consecutive messages from a single author, rendered as stacked
 * primitive `ChatBubble`s with a shared avatar + name header. Outgoing groups
 * can show a `ReadReceipt` on the last bubble. Incoming (`them`) groups are a
 * polite live region so new messages are announced. No literal colors.
 */
exports.MessageGroup = React.forwardRef(function MessageGroup({ side = 'them', messages, authorName, avatarUri, showAvatar, receipt, className, ...rest }, ref) {
    const me = side === 'me';
    const withAvatar = showAvatar ?? !me;
    const lastIndex = messages.length - 1;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-live": me ? 'off' : 'polite', className: (0, cn_1.cn)('flex gap-2', me ? 'justify-end' : 'justify-start', className), ...rest, children: [withAvatar && !me ? (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: "sm", src: avatarUri, name: authorName }) : null, (0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex min-w-0 flex-col gap-1', me ? 'items-end' : 'items-start'), children: [authorName && !me ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-muted", children: authorName })) : null, messages.map((msg, i) => ((0, jsx_runtime_1.jsx)(primitives_1.ChatBubble, { side: side, meta: i === lastIndex && msg.time ? msg.time : undefined, children: msg.text }, msg.id))), me && receipt ? (0, jsx_runtime_1.jsx)(ReadReceipt_1.ReadReceipt, { status: receipt }) : null] })] }));
});
//# sourceMappingURL=MessageGroup.js.map