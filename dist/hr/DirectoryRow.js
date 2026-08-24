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
exports.DirectoryRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const internal_1 = require("./internal");
/**
 * Dense people-directory row: avatar, name, title / department, and contact meta
 * (email / phone). Presence is conveyed by a glyph + word so it never depends on
 * color alone. `compact` trims to name + title. Optional trailing message
 * affordance renders as a real `<button>`. When `onClick` is set the row becomes
 * a keyboard-operable `role="button"`. All colors are `--xen-*` token classes —
 * no literals. `forwardRef` to the root `<div>`.
 */
exports.DirectoryRow = React.forwardRef(function DirectoryRow({ name, title, department, avatarUrl, email, phone, presence, variant = 'default', onClick, onMessage, className, }, ref) {
    const compact = variant === 'compact';
    const presenceMeta = presence ? internal_1.PRESENCE_META[presence] : undefined;
    const subtitle = [title, department].filter(Boolean).join(' · ');
    const contact = [email, phone].filter(Boolean).join('  ·  ');
    const interactive = onClick != null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? `Open ${name}` : undefined, onClick: interactive ? onClick : undefined, onKeyDown: interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick?.();
                }
            }
            : undefined, className: (0, cn_1.cn)('flex items-center gap-3 rounded-[var(--xen-radius-md)] bg-surface px-3', compact ? 'py-1.5' : 'py-2', interactive && 'cursor-pointer hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: compact ? 'sm' : 'md', name: name, src: avatarUrl }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-base font-semibold text-on-surface", children: name }), subtitle ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm text-muted", children: subtitle }) : null, !compact && contact ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: contact }) : null] }), presenceMeta ? ((0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-1", "aria-label": presenceMeta.label, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('text-xs', internal_1.TONE_TEXT_CLASS[presenceMeta.tone]), children: presenceMeta.glyph }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: presenceMeta.label })] })) : null, onMessage ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `Message ${name}`, onClick: (e) => {
                    e.stopPropagation();
                    onMessage();
                }, className: "shrink-0 pl-2 text-lg text-primary hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\u2709" }) })) : null] }));
});
//# sourceMappingURL=DirectoryRow.js.map