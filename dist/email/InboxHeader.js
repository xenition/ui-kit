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
exports.InboxHeader = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
/**
 * Top bar for an inbox / mailbox screen — optional back button, the folder
 * title with an unread count, an optional "Syncing…" caption, and a row of
 * trailing icon actions (each a real `<button>`). Rendered as a semantic
 * `<header>` with token-bound surface/border. Data + callbacks only. No literal
 * colors.
 */
exports.InboxHeader = React.forwardRef(function InboxHeader({ title, unreadCount = 0, onBack, actions, syncing = false, className }, ref) {
    const safeActions = actions ?? [];
    return ((0, jsx_runtime_1.jsxs)("header", { ref: ref, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-sm)] border-b border-border bg-surface px-[var(--xen-space-md)] py-[var(--xen-space-sm)]', className), children: [onBack ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Back", onClick: onBack, className: "inline-flex shrink-0 items-center p-[var(--xen-space-xs)] transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2039", size: "2xl", color: "onSurface" }) })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("h1", { className: "truncate text-xl font-bold text-on-surface", children: title }), unreadCount > 0 ? ((0, jsx_runtime_1.jsx)("span", { className: "text-base font-semibold text-muted", children: unreadCount > 999 ? '999+' : String(unreadCount) })) : null] }), syncing ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: "Syncing\u2026" }) : null] }), (0, jsx_runtime_1.jsx)("div", { className: "flex items-center gap-[var(--xen-space-xs)]", children: safeActions.map((a) => ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": a.label, onClick: a.onClick, className: "inline-flex items-center p-[var(--xen-space-xs)] transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: a.glyph, size: "xl", color: "onSurface" }) }, a.id))) })] }));
});
//# sourceMappingURL=InboxHeader.js.map