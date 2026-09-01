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
exports.ChatHeaderV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const AvatarV4_1 = require("../primitives/AvatarV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const PresenceDotV4_1 = require("./PresenceDotV4");
const thread_v4_1 = require("./internal/thread-v4");
/**
 * **V4 chat header** — the web twin of the native `ChatHeaderV4`, same props
 * as {@link ChatHeader} plus `backLabel` and `typingLabel`.
 *
 * ## Four changes
 *
 * 1. **Presence is a word.** A green dot beside a name is the whole status,
 *    and it said nothing to a screen reader and nothing to a colour-blind
 *    user. It now reads "Online" under the title.
 * 2. **Typing *replaces* the subtitle.** The base stacked a typing line under
 *    it, so the header grew a row and the messages below jumped — on a live
 *    signal that toggles every few seconds.
 * 3. **Every action has a name and clears 44.** `ChatHeaderAction` has always
 *    carried a `label`; the base never rendered it.
 * 4. **Back is a real control**, not a glyph with a tap handler.
 */
exports.ChatHeaderV4 = React.forwardRef(function ChatHeaderV4({ title, subtitle, avatarUri, presence, typing = false, onBack, onPressTitle, actions, backLabel = 'Back', typingLabel = 'Typing…', className, ...rest }, ref) {
    if (!title)
        return null;
    // Typing replaces the subtitle rather than stacking under it, so the header
    // keeps one height while a live signal flickers.
    const presenceWord = presence ? thread_v4_1.PRESENCE_META[presence].label : undefined;
    const line = typing ? typingLabel : (subtitle ?? presenceWord);
    const identity = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { size: "sm", src: avatarUri, name: title, alt: "" }), (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-col text-left", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-semibold text-on-surface", children: title }), line != null && ((0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-xs", children: [presence && !typing && (0, jsx_runtime_1.jsx)(PresenceDotV4_1.PresenceDotV4, { status: presence, scale: "sm" }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted-text", children: line })] }))] })] }));
    return ((0, jsx_runtime_1.jsxs)("header", { ref: ref, "data-xen-chat-header": "", className: (0, cn_1.cn)('flex items-center gap-sm border-b border-border bg-surface px-md py-sm', className), ...rest, children: [onBack && ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": backLabel, onClick: onBack, "data-xen-v4-chrome": "on-surface", className: (0, cn_1.cn)('inline-flex aspect-square shrink-0 items-center justify-center rounded-full text-lg text-on-surface', chrome_v4_1.MIN_TAP_CLASS), children: "\u2039" })), onPressTitle ? ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onPressTitle, "data-xen-v4-chrome": "on-surface", className: (0, cn_1.cn)('flex min-w-0 flex-1 items-center gap-sm rounded-[var(--xen-radius-md)] px-xs', chrome_v4_1.MIN_TAP_CLASS), children: identity })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex min-w-0 flex-1 items-center gap-sm px-xs", children: identity })), actions && actions.length > 0 && ((0, jsx_runtime_1.jsx)("div", { className: "flex shrink-0 items-center gap-xs", children: actions.map((action) => ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": action.label, onClick: action.onClick, "data-xen-v4-chrome": "on-surface", className: (0, cn_1.cn)('inline-flex aspect-square items-center justify-center rounded-full text-base text-on-surface', chrome_v4_1.MIN_TAP_CLASS), children: action.glyph }, action.id))) }))] }));
});
//# sourceMappingURL=ChatHeaderV4.js.map