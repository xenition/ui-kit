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
exports.ReviewCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const AvatarV4_1 = require("../primitives/AvatarV4");
const BadgeV4_1 = require("../primitives/BadgeV4");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const RatingV4_1 = require("../primitives/RatingV4");
const salon_v4_1 = require("./internal/salon-v4");
/**
 * **V4 review card** — the web twin of the native `ReviewCardV4`, same props
 * as {@link ReviewCard} plus `verifiedLabel` and `replyLabel`.
 *
 * ## Four changes
 *
 * 1. **The rating carries its number**, and the card is one announced object
 *    rather than three loose fragments.
 * 2. **The reply is attributed.** An indented paragraph under a review does
 *    not say who wrote it, and the reply is the *business* answering a
 *    customer.
 * 3. **`verified` is a chip with a word**, not a bare checkmark glyph.
 * 4. **The review is a real `<blockquote>` with a `<cite>`**, which is what a
 *    quoted opinion with an attributed author actually is.
 *
 * **Renders nothing without an `author`** (§4.5).
 */
exports.ReviewCardV4 = React.forwardRef(function ReviewCardV4({ author, rating, text, date, service, avatarUrl, verified = false, variant = 'default', reply, verifiedLabel = 'Verified visit', replyLabel = 'Reply from the salon', className, ...rest }, ref) {
    if (!author)
        return null;
    const compact = variant === 'compact';
    const caption = (0, salon_v4_1.metaLine)([service, date]);
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { ref: ref, "data-xen-review-card": "", "aria-label": (0, salon_v4_1.metaLine)([
            author,
            typeof rating === 'number' ? `rated ${rating}` : null,
            verified ? verifiedLabel : null,
            caption,
        ]), className: (0, cn_1.cn)('flex flex-col gap-sm', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-sm", children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: avatarUrl, name: author, size: compact ? 'xs' : 'sm' }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-sm", children: [(0, jsx_runtime_1.jsx)("cite", { className: "truncate text-sm font-semibold not-italic text-on-card", children: author }), verified ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "success", variant: "soft", size: "sm", children: verifiedLabel })) : null] }), caption ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted-text", children: caption }) : null] }), (0, jsx_runtime_1.jsx)(RatingV4_1.RatingV4, { value: rating, size: "sm", showValue: true })] }), text ? ((0, jsx_runtime_1.jsx)("blockquote", { className: (0, cn_1.cn)('text-sm text-on-card', compact && 'line-clamp-3'), children: text })) : null, reply ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-0.5 rounded-[var(--xen-radius-md)] border-l-2 border-primary bg-selected p-sm", children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-xs text-xs font-semibold text-muted-text", children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "send", size: "xs", className: "text-primary-text" }), replyLabel] }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-on-selected", children: reply })] })) : null] }));
});
//# sourceMappingURL=ReviewCardV4.js.map