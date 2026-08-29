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
exports.MessageListV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
/**
 * `MessageList`, V4 — the same props, and a thread that reads as one
 * conversation.
 *
 * ## Rhythm
 *
 * The base separates messages by `gap-3` on the web and `spacing.md` on native
 * — two different numbers, neither of them a token on the web, for the same
 * idea. V4 uses `sm` on both.
 *
 * Tighter is the design decision, not just the smaller number: a bubble already
 * carries its own padding, so the visible space between two turns is the gap
 * *plus* two paddings. At the base's spacing that reads as a column of separate
 * blocks; at `sm` it reads as one conversation with turns in it, which is what
 * a thread is (§9 — let spacing say the structure).
 *
 * The viewport takes `lg` of padding, off the scale rather than `p-4`.
 *
 * ## No ground
 *
 * The list paints nothing. It is the page the bubbles are on, and a chat
 * viewport that fills itself with `surface` puts a second surface behind
 * bubbles that are already `surface` — §11's container that has not earned
 * itself, and §8's nesting. Whatever the screen behind it is stays visible.
 *
 * ## Two behaviours worth naming
 *
 * `role="log"` — the ARIA role for a running transcript. A screen reader
 * announces new entries politely as they arrive, which is what a chat is for;
 * without it a message that appears while the reader is elsewhere on the page
 * simply never happened (§37, §46). The native twin has no equivalent role and
 * says so rather than inventing one.
 *
 * `overscroll-contain` — scrolling past the top of a thread stops at the top of
 * the thread instead of scrolling the page behind it. Chain-scrolling out of a
 * conversation while reading it is the kind of motion §36.11 asks components
 * not to introduce.
 */
exports.MessageListV4 = React.forwardRef(function MessageListV4({ className, children, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, 
        // The ARIA role for a running transcript: new turns are announced as
        // they arrive rather than silently appearing.
        role: "log", "data-xen-v4-message-list": "", className: (0, cn_1.cn)('flex flex-1 flex-col gap-sm overflow-y-auto overscroll-contain p-lg', className), ...rest, children: children }));
});
//# sourceMappingURL=MessageListV4.js.map