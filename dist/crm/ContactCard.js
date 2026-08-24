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
exports.ContactCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const internal_1 = require("./internal");
/**
 * Profile card for a CRM contact: avatar, name, title, company, tag chips and a
 * row of quick-action pills (call / email / etc — caller-supplied glyph +
 * handler). `compact` hides tags and actions for list rows. Guards empty
 * `tags`/`actions` arrays (renders nothing) and offers a `loading` skeleton.
 * When `onClick` is set the body becomes a `role="button"` div with Enter/Space
 * activation. All colors are `--xen-*` token classes.
 */
exports.ContactCard = React.forwardRef(function ContactCard({ name, title, company, avatarUrl, tags, actions, variant = 'default', loading = false, onClick, className, ...rest }, ref) {
    const compact = variant === 'compact';
    const hasTags = !compact && Array.isArray(tags) && tags.length > 0;
    const hasActions = !compact && Array.isArray(actions) && actions.length > 0;
    const interactive = onClick && !loading ? (0, internal_1.activate)(onClick) : {};
    return ((0, jsx_runtime_1.jsx)(primitives_1.Card, { ref: ref, "aria-label": onClick && !loading ? `Contact ${name}` : undefined, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)]', onClick && !loading && 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), ...interactive, ...rest, children: loading ? ((0, jsx_runtime_1.jsxs)("div", { "aria-label": "Loading contact", className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-10 w-10 rounded-full bg-neutral-100" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-4 w-[60%] rounded-[var(--xen-radius-sm)] bg-neutral-100" }), (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-[40%] rounded-[var(--xen-radius-sm)] bg-neutral-100" })] })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: compact ? 'sm' : 'md', name: name, src: avatarUrl }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate font-bold text-on-surface", children: name }), title || company ? ((0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm text-muted", children: [title, company].filter(Boolean).join(' · ') })) : null] })] }), hasTags ? ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-[var(--xen-space-xs)]", children: tags.map((t, i) => ((0, jsx_runtime_1.jsx)(primitives_1.Tag, { tone: "neutral", children: t }, `${t}-${i}`))) })) : null, hasActions ? ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-[var(--xen-space-xs)]", children: actions.map((a) => ((0, jsx_runtime_1.jsxs)(primitives_1.Button, { variant: "secondary", size: "sm", "aria-label": a.label, onClick: a.onClick, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: a.glyph }), (0, jsx_runtime_1.jsx)("span", { className: "ml-1", children: a.label })] }, a.key))) })) : null] })) }));
});
//# sourceMappingURL=ContactCard.js.map