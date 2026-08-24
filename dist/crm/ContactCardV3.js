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
exports.ContactCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const internal_1 = require("./internal");
/**
 * ContactCard **design V3** — a *compact directory row*: a small avatar, the
 * name with title·company beneath, and (when present) the first tag as a trailing
 * muted chip. No card surface, no action pills — the densest possible list item
 * for an A–Z contacts index. Same props as {@link ContactCard}; a `loading`
 * skeleton is supported. Token-pure — no literal colors.
 */
exports.ContactCardV3 = React.forwardRef(function ContactCardV3({ name, title, company, avatarUrl, tags, loading = false, onClick, className, ...rest }, ref) {
    const trailingTag = Array.isArray(tags) && tags.length > 0 ? tags[0] : undefined;
    const interactive = onClick && !loading ? (0, internal_1.activate)(onClick) : {};
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "aria-label": onClick && !loading ? `Contact ${name}` : undefined, className: (0, cn_1.cn)('flex items-center gap-sm px-sm py-sm transition duration-200 motion-reduce:transition-none', onClick && !loading && 'cursor-pointer hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), ...interactive, ...rest, children: loading ? ((0, jsx_runtime_1.jsxs)("div", { "aria-label": "Loading contact", className: "flex flex-1 items-center gap-sm", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-8 w-8 rounded-full bg-neutral-100" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-3 w-[55%] rounded-sm bg-neutral-100" }), (0, jsx_runtime_1.jsx)("div", { className: "h-2 w-[35%] rounded-sm bg-neutral-100" })] })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: "sm", name: name, src: avatarUrl }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-semibold text-on-surface", children: name }), title || company ? ((0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: [title, company].filter(Boolean).join(' · ') })) : null] }), trailingTag ? ((0, jsx_runtime_1.jsx)("span", { className: "shrink-0 truncate rounded-full bg-neutral-100 px-xs py-0.5 text-xs font-semibold text-muted", children: trailingTag })) : null] })) }));
});
//# sourceMappingURL=ContactCardV3.js.map