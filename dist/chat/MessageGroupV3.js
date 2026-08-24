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
exports.MessageGroupV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const ReadReceipt_1 = require("./ReadReceipt");
/**
 * MessageGroup — **flat channel row** variant (Slack feel). No bubbles and no
 * side-alignment: every group is a left-aligned block with the avatar in a
 * gutter, a bold sender name + time header, and the messages as plain flat text
 * lines. A thin vertical **sender rule** runs down the left edge — primary for
 * your own messages, a hairline border for others — so authorship reads without
 * color-filled bubbles. Same props as `MessageGroup`. No literal colors.
 */
exports.MessageGroupV3 = React.forwardRef(function MessageGroupV3({ side = 'them', messages, authorName, avatarUri, showAvatar, receipt, className, ...rest }, ref) {
    const me = side === 'me';
    const withAvatar = showAvatar ?? true;
    const lastIndex = messages.length - 1;
    const displayName = authorName ?? (me ? 'You' : undefined);
    const lastTime = messages[lastIndex]?.time;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-live": me ? 'off' : 'polite', className: (0, cn_1.cn)('flex items-start gap-2 border-l-2 py-1 pl-2', me ? 'border-l-primary' : 'border-l-border', className), ...rest, children: [withAvatar ? (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: "sm", src: avatarUri, name: displayName }) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-baseline gap-2", children: [displayName ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm font-bold', me ? 'text-primary' : 'text-on-surface'), children: displayName })) : null, lastTime ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: lastTime }) : null] }), messages.map((msg) => ((0, jsx_runtime_1.jsx)("p", { className: "whitespace-pre-wrap break-words text-base leading-snug text-on-surface", children: msg.text }, msg.id))), me && receipt ? (0, jsx_runtime_1.jsx)(ReadReceipt_1.ReadReceipt, { status: receipt }) : null] })] }));
});
//# sourceMappingURL=MessageGroupV3.js.map