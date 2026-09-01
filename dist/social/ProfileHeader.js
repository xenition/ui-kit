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
exports.ProfileHeader = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Avatar_1 = require("../primitives/Avatar");
/**
 * ProfileHeader — the profile-page hero for the social V4 "feed" line, and one of
 * the module's gradient identity moments. A brand-gradient cover (optionally over
 * a `coverUrl`) carries a large overlapping avatar, the name with a primary
 * verified tick, `@handle` + `bio` in near-white ink, a row of frosted stat tiles
 * (posts / followers / following), and a single CTA — "Edit profile" in `owner`
 * mode, otherwise a Follow / Following toggle. Every color derives from the brand
 * ramp via `--xen-*` classes + gradient utilities (no literals); dark-mode safe.
 */
exports.ProfileHeader = React.forwardRef(function ProfileHeader({ name, handle, avatarUrl, verified = false, bio, stats, coverUrl, owner = false, following = false, onFollow, onEditProfile, className, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('relative overflow-hidden rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-500 to-primary-700 p-[var(--xen-space-lg)]', className), ...rest, children: [coverUrl ? ((0, jsx_runtime_1.jsx)("img", { src: coverUrl, alt: "", "aria-hidden": "true", loading: "lazy", className: "pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30" })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "relative flex flex-col gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-end justify-between gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "rounded-full ring-4 ring-primary-50/40", children: (0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: avatarUrl, name: name, size: "xl" }) }), owner ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Edit profile", onClick: onEditProfile, className: "min-h-[44px] rounded-[var(--xen-radius-md)] border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-lg)] text-sm font-bold text-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: "Edit profile" })) : ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-pressed": following, "aria-label": following ? 'Following' : 'Follow', onClick: onFollow, className: (0, cn_1.cn)('min-h-[44px] rounded-[var(--xen-radius-md)] px-[var(--xen-space-lg)] text-sm font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', following
                                    ? 'border border-primary-50/30 bg-primary-50/15 text-primary-50'
                                    : 'bg-on-primary text-primary'), children: following ? 'Following' : 'Follow' }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("h2", { className: "truncate text-2xl font-extrabold text-primary-50", children: name }), verified ? ((0, jsx_runtime_1.jsx)("span", { "aria-label": "Verified", className: "text-lg text-primary-100", children: "\u2713" })) : null] }), handle ? (0, jsx_runtime_1.jsxs)("p", { className: "truncate text-sm font-semibold text-primary-100", children: ["@", handle] }) : null, bio ? (0, jsx_runtime_1.jsx)("p", { className: "text-sm leading-relaxed text-primary-100", children: bio }) : null] }), stats && stats.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-[var(--xen-space-sm)]", children: stats.map((stat) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 basis-24 flex-col items-center rounded-[var(--xen-radius-md)] border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-md)] py-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-lg font-extrabold text-primary-50", children: stat.value }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-primary-100", children: stat.label })] }, stat.label))) })) : null] })] }));
});
//# sourceMappingURL=ProfileHeader.js.map