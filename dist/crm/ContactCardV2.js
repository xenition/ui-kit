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
exports.ContactCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const internal_1 = require("./internal");
/**
 * ContactCard **design V2** — a *centered profile hero*. Where the base is a
 * left-aligned avatar row, V2 stacks a large centered avatar, name and
 * title·company, a centered wrap of tag chips, and a full-width row of quick
 * actions across the footer. Elevated on a token `shadow-md` and lifted on hover.
 * Same props as {@link ContactCard}; empty tag/action arrays render nothing;
 * `loading` shows a skeleton. Token-pure — no literal colors.
 */
exports.ContactCardV2 = React.forwardRef(function ContactCardV2({ name, title, company, avatarUrl, tags, actions, variant = 'default', loading = false, onClick, className, ...rest }, ref) {
    const compact = variant === 'compact';
    const hasTags = !compact && Array.isArray(tags) && tags.length > 0;
    const hasActions = !compact && Array.isArray(actions) && actions.length > 0;
    const interactive = onClick && !loading ? (0, internal_1.activate)(onClick) : {};
    return ((0, jsx_runtime_1.jsx)(primitives_1.Card, { ref: ref, "aria-label": onClick && !loading ? `Contact ${name}` : undefined, className: (0, cn_1.cn)('flex flex-col items-center gap-md rounded-lg text-center shadow-md transition duration-200', 'motion-reduce:transition-none', onClick && !loading && 'cursor-pointer hover:-translate-y-0.5 hover:shadow-lg motion-reduce:hover:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), ...interactive, ...rest, children: loading ? ((0, jsx_runtime_1.jsxs)("div", { "aria-label": "Loading contact", className: "flex flex-col items-center gap-sm self-stretch", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-16 w-16 rounded-full bg-neutral-100" }), (0, jsx_runtime_1.jsx)("div", { className: "h-4 w-[55%] rounded-sm bg-neutral-100" }), (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-[40%] rounded-sm bg-neutral-100" })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: compact ? 'md' : 'xl', name: name, src: avatarUrl }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-col items-center gap-0.5", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-lg font-bold text-on-surface", children: name }), title || company ? ((0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm text-muted", children: [title, company].filter(Boolean).join(' · ') })) : null] }), hasTags ? ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap justify-center gap-xs", children: tags.map((t, i) => ((0, jsx_runtime_1.jsx)(primitives_1.Tag, { tone: "neutral", children: t }, `${t}-${i}`))) })) : null, hasActions ? ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap justify-center gap-sm self-stretch", children: actions.map((a) => ((0, jsx_runtime_1.jsxs)(primitives_1.Button, { variant: "secondary", size: "sm", "aria-label": a.label, onClick: a.onClick, className: "min-w-[96px] flex-1", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: a.glyph }), (0, jsx_runtime_1.jsx)("span", { className: "ml-1", children: a.label })] }, a.key))) })) : null] })) }));
});
//# sourceMappingURL=ContactCardV2.js.map