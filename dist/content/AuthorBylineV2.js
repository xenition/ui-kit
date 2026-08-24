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
exports.AuthorBylineV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Avatar_1 = require("../primitives/Avatar");
/** Joins the non-empty meta fragments with a middot separator. */
function metaLine(parts) {
    return parts.filter((p) => !!p && p.length > 0).join('  ·  ');
}
/**
 * AuthorByline — **enclosed author chip** alternate design (web / React DOM).
 *
 * The credit sits inside a soft primary-tinted rounded card: avatar, then a
 * "Written by" label over the name, with role and date/read-time on a meta line.
 * A contained attribution block versus the base bare row. Same props as
 * {@link AuthorByline}, so it is a drop-in swap.
 *
 * Token-pure: the fill/border are `bg-primary/10` / `border-primary/20`, the
 * label is `text-primary`. No literal colors.
 */
exports.AuthorBylineV2 = React.forwardRef(function AuthorBylineV2({ author, date, readingTime, variant = 'full', className, ...rest }, ref) {
    const meta = metaLine([date, readingTime]);
    const compact = variant === 'compact';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": `By ${author.name}${author.role ? `, ${author.role}` : ''}${meta ? `, ${meta}` : ''}`, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-primary/20 bg-primary/10 px-[var(--xen-space-md)] py-[var(--xen-space-sm)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: author.avatarUrl, name: author.name, size: compact ? 'sm' : 'md' }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0", children: [!compact ? ((0, jsx_runtime_1.jsx)("p", { className: "text-xs font-extrabold uppercase tracking-wide text-primary", children: "Written by" })) : null, (0, jsx_runtime_1.jsx)("p", { className: "truncate text-base font-bold text-on-surface", children: author.name }), author.role || meta ? ((0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: [author.role, meta].filter(Boolean).join('  ·  ') })) : null] })] }));
});
//# sourceMappingURL=AuthorBylineV2.js.map