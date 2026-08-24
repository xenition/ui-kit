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
exports.AuthorBylineV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Avatar_1 = require("../primitives/Avatar");
/** Joins the non-empty meta fragments with a middot separator. */
function metaLine(parts) {
    return parts.filter((p) => !!p && p.length > 0).join('  ·  ');
}
/**
 * AuthorByline — **centered stacked** alternate design (web / React DOM).
 *
 * A vertically centered credit: the avatar sits on top, the name below it, then
 * the role, then a middot-joined date/read-time line — the layout you see under
 * a centered article title or at the end of a feature. Same props as
 * {@link AuthorByline}, so it is a drop-in swap.
 *
 * Token-pure: name is `text-on-surface`, role/meta are `text-muted`. No literal
 * colors.
 */
exports.AuthorBylineV3 = React.forwardRef(function AuthorBylineV3({ author, date, readingTime, variant = 'full', className, ...rest }, ref) {
    const meta = metaLine([date, readingTime]);
    const compact = variant === 'compact';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": `By ${author.name}${author.role ? `, ${author.role}` : ''}${meta ? `, ${meta}` : ''}`, className: (0, cn_1.cn)('flex flex-col items-center gap-[var(--xen-space-xs)] text-center', className), ...rest, children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: author.avatarUrl, name: author.name, size: compact ? 'md' : 'lg' }), (0, jsx_runtime_1.jsx)("p", { className: "truncate text-base font-bold text-on-surface", children: author.name }), author.role ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm text-muted", children: author.role }) : null, meta ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: meta }) : null] }));
});
//# sourceMappingURL=AuthorBylineV3.js.map