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
exports.AuthorBylineV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const AvatarV4_1 = require("../primitives/AvatarV4");
const reading_v4_1 = require("./internal/reading-v4");
/**
 * **V4 author byline** — the web twin of the native `AuthorBylineV4`, same
 * props as {@link AuthorByline} plus `formatByline`.
 *
 * ## Three changes
 *
 * 1. **The byline's name finally lands.** The base hung `aria-label` on a
 *    roleless `<div>`, where ARIA says it is ignored — so where native read one
 *    labelled stop, web read the avatar, the name, the role and the meta line
 *    as separate fragments and left the reader to reassemble the credit. The
 *    container is now a `group`, a role that takes a name, and the name is one
 *    comma-joined line built with `spokenLine`.
 * 2. **The avatar is decorative and says so.** It repeats the name it sits
 *    beside; `aria-hidden` keeps it out of the reading order.
 * 3. **`'By '` is a prop**, and the role and meta lines take `mutedText` — the
 *    contrast-corrected ink — rather than the `muted` fill slot.
 */
exports.AuthorBylineV4 = React.forwardRef(function AuthorBylineV4({ author, date, readingTime, variant = 'full', formatByline = (name) => `By ${name}`, className, ...rest }, ref) {
    if (!author?.name)
        return null;
    // The visible meta line keeps its middle dot; the spoken one takes commas.
    const meta = (0, reading_v4_1.metaLine)([date, readingTime]);
    const credit = formatByline(author.name);
    if (variant === 'compact') {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "group", "aria-label": (0, reading_v4_1.spokenLine)([credit, date, readingTime]), className: (0, cn_1.cn)('flex items-center gap-sm', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, children: (0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: author.avatarUrl, name: author.name, alt: "", size: "sm" }) }), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('truncate text-sm', reading_v4_1.TONE_INK.muted), children: [(0, jsx_runtime_1.jsx)("span", { className: "font-semibold text-on-surface", children: author.name }), meta ? `  ·  ${meta}` : ''] })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "group", "aria-label": (0, reading_v4_1.spokenLine)([credit, author.role, date, readingTime]), className: (0, cn_1.cn)('flex items-center gap-md', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, children: (0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: author.avatarUrl, name: author.name, alt: "", size: "md" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-base font-semibold text-on-surface", children: author.name }), author.role ? ((0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('truncate text-xs', reading_v4_1.TONE_INK.muted), children: author.role })) : null, meta ? (0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('truncate text-xs', reading_v4_1.TONE_INK.muted), children: meta }) : null] })] }));
});
//# sourceMappingURL=AuthorBylineV4.js.map