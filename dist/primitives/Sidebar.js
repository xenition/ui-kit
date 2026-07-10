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
exports.Sidebar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
const ROW_BASE = 'flex w-full items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] px-[var(--xen-space-md)] py-[var(--xen-space-sm)] text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300';
function SidebarRow({ item }) {
    const className = (0, cn_1.cn)(ROW_BASE, item.active
        ? 'bg-primary-50 text-primary'
        : 'text-on-surface hover:bg-neutral-100');
    const icon = item.icon !== undefined ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "inline-flex h-5 w-5 items-center justify-center", children: item.icon })) : null;
    if (item.href !== undefined) {
        return ((0, jsx_runtime_1.jsxs)("a", { href: item.href, "aria-current": item.active ? 'page' : undefined, onClick: item.onSelect, className: className, children: [icon, (0, jsx_runtime_1.jsx)("span", { className: "truncate", children: item.label })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-current": item.active ? 'page' : undefined, onClick: item.onSelect, className: (0, cn_1.cn)(ROW_BASE, 'text-left', item.active ? 'bg-primary-50 text-primary' : 'text-on-surface hover:bg-neutral-100'), children: [icon, (0, jsx_runtime_1.jsx)("span", { className: "truncate", children: item.label })] }));
}
/**
 * Vertical nav rail: a `brand` slot on top, one or more groups of token-styled
 * nav rows with an active state, and an optional `footer`. Pass either a flat
 * `items` array or grouped `groups`. Rows with an `href` render as links,
 * otherwise as buttons; both call `onSelect`. All colors come from `--xen-*`
 * tokens — no literal colors.
 */
exports.Sidebar = React.forwardRef(function Sidebar({ brand, items, groups, footer, className, ...rest }, ref) {
    const resolvedGroups = groups ?? (items ? [{ items }] : []);
    return ((0, jsx_runtime_1.jsxs)("nav", { ref: ref, "aria-label": "Sidebar", className: (0, cn_1.cn)('flex h-full flex-col gap-[var(--xen-space-md)] border-r border-border bg-surface text-on-surface', 'px-[var(--xen-space-md)] py-[var(--xen-space-lg)]', className), ...rest, children: [brand !== undefined ? ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center px-[var(--xen-space-sm)]", children: brand })) : null, (0, jsx_runtime_1.jsx)("div", { className: "flex flex-1 flex-col gap-[var(--xen-space-lg)] overflow-y-auto", children: resolvedGroups.map((group, gi) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-xs)]", children: [group.label !== undefined ? ((0, jsx_runtime_1.jsx)("div", { className: "px-[var(--xen-space-md)] pb-[var(--xen-space-xs)] text-xs font-semibold uppercase tracking-wide text-muted", children: group.label })) : null, group.items.map((item, ii) => ((0, jsx_runtime_1.jsx)(SidebarRow, { item: item }, ii)))] }, gi))) }), footer !== undefined ? ((0, jsx_runtime_1.jsx)("div", { className: "border-t border-border pt-[var(--xen-space-md)]", children: footer })) : null] }));
});
//# sourceMappingURL=Sidebar.js.map