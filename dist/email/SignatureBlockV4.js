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
exports.SignatureBlockV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const AvatarV4_1 = require("../primitives/AvatarV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const mail_v4_1 = require("./internal/mail-v4");
/**
 * **V4 signature block** — same props as {@link SignatureBlock} plus
 * `onContactPress`.
 *
 * ## Four changes
 *
 * 1. **A contact line either works or stops pretending to.** Every line was
 *    painted in the brand colour — the universal "this is a link" — with no
 *    `href`, no handler and no handler in the type at all. Clicking an email
 *    address in a signature did nothing, on both twins, forever.
 *    `onContactPress` makes them real buttons that clear 44; without it they
 *    are drawn as the plain text they are.
 * 2. **The brand colour is the `primaryText` slot.** `text-primary` is the
 *    *fill*: the pairing it carries is for ink drawn on top of it, not for a
 *    14px line drawn in it on a white card.
 * 3. **The avatar is pinned to one shape** so the web block and the native
 *    block are the same object — the shape was left to each twin's default.
 * 4. **The rule beside the block stops being a literal.** `border-l-[3px]`
 *    was a typed width in a kit with no typed widths anywhere else.
 */
exports.SignatureBlockV4 = React.forwardRef(function SignatureBlockV4({ name, title, company, avatarUri, contacts, tagline, onContactPress, className }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const safeContacts = contacts ?? [];
    const roleLine = (0, tone_v4_1.metaLine)([title, company]);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex gap-md border-l-2 border-primary py-md pl-md', className), children: [avatarUri || name ? ((0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { size: "lg", shape: "circle", src: avatarUri, name: name, alt: "" })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: name }), roleLine ? (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm', mail_v4_1.TONE_INK.muted), children: roleLine }) : null, safeContacts.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-xs flex flex-col", children: safeContacts.map((contact) => onContactPress ? ((0, jsx_runtime_1.jsxs)("button", { type: "button", onClick: () => onContactPress(contact), "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)('var(--xen-surface)', 'var(--xen-on-surface)'), className: (0, cn_1.cn)('flex items-center gap-xs self-start rounded-[var(--xen-radius-sm)] pr-xs text-left', chrome_v4_1.MIN_TAP_CLASS, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: [contact.glyph ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('text-xs leading-none', mail_v4_1.TONE_INK.muted), children: contact.glyph })) : null, (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('truncate text-sm font-semibold underline', mail_v4_1.TONE_INK.primary), children: contact.value })] }, contact.id)) : ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-xs", children: [contact.glyph ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('text-xs leading-none', mail_v4_1.TONE_INK.muted), children: contact.glyph })) : null, (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm text-on-surface", children: contact.value })] }, contact.id))) })) : null, tagline ? (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('mt-xs text-xs', mail_v4_1.TONE_INK.muted), children: tagline }) : null] })] }));
});
//# sourceMappingURL=SignatureBlockV4.js.map