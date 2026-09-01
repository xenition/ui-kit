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
exports.TeamGridV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Avatar_1 = require("../primitives/Avatar");
const COLUMN_CLASSES = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
};
/**
 * TeamGrid — **V4** "showcase" design (web parity of the native V4). A
 * responsive grid of elevated member cards on the page ground (NOT a gradient
 * surface): each card an initials-fallback `avatar`, a bold `name`, a muted
 * `role`, optional `bio`, and a row of soft-primary social chips (each a
 * `≥44px` tap target that brightens on hover). Every `member` field (`name`,
 * `role`, `avatar`, `bio`, `socials`) honored. `columns` drives the breakpoint
 * grid. Same props/behavior as {@link TeamGridProps}; token-only colors, no
 * literals.
 */
exports.TeamGridV4 = React.forwardRef(function TeamGridV4({ members, columns = 3, className, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-team-grid": "", className: (0, cn_1.cn)('grid grid-cols-1 gap-[var(--xen-space-lg)]', COLUMN_CLASSES[columns], className), ...rest, children: members.map((member, index) => ((0, jsx_runtime_1.jsxs)("div", { "data-xen-team-member": "", className: "flex flex-col items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)] text-center text-on-surface shadow-sm", children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: member.avatar, name: member.name, size: "lg" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-heading text-base font-extrabold tracking-tight", children: member.name }), member.role !== undefined ? ((0, jsx_runtime_1.jsx)("p", { className: "text-sm font-medium text-muted", children: member.role })) : null] }), member.bio !== undefined ? ((0, jsx_runtime_1.jsx)("p", { className: "text-sm leading-relaxed text-muted", children: member.bio })) : null, member.socials && member.socials.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-[var(--xen-space-xs)] flex items-center justify-center gap-[var(--xen-space-sm)]", children: member.socials.map((social, i) => ((0, jsx_runtime_1.jsx)("a", { href: social.href, "aria-label": social.label, className: "inline-flex h-11 w-11 items-center justify-center rounded-[var(--xen-radius-full)] bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-on-primary", children: social.icon ?? social.label }, i))) })) : null] }, index))) }));
});
//# sourceMappingURL=TeamGridV4.js.map