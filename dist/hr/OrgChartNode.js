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
exports.OrgChartNode = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
/**
 * A single node in a reporting hierarchy: avatar, name, title, and an optional
 * direct-report count. `depth` indents the node with a token-bound rail so a
 * flat list reads as a tree; `expandable` adds a disclosure toggle. `highlighted`
 * tints the surface for the focused person. Managers are flagged by an "N
 * reports" count (a word, not color). All colors are `--xen-*` token classes —
 * no literals. `forwardRef` to the root `<div>`.
 */
exports.OrgChartNode = React.forwardRef(function OrgChartNode({ name, title, avatarUrl, department, directReports = 0, depth = 0, expandable = false, expanded = false, variant = 'default', onToggle, onClick, className, }, ref) {
    const compact = variant === 'compact';
    const highlighted = variant === 'highlighted';
    const level = Math.max(0, Math.floor(depth));
    const isManager = directReports > 0;
    const interactive = onClick != null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex items-stretch', className), children: [level > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "flex justify-end", style: { width: level * 24 }, "aria-hidden": "true", children: (0, jsx_runtime_1.jsx)("div", { className: "w-px bg-border" }) })) : null, (0, jsx_runtime_1.jsx)("div", { className: "min-w-0 flex-1", children: (0, jsx_runtime_1.jsxs)(primitives_1.Card, { role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? `Org node ${name}` : undefined, onClick: interactive ? onClick : undefined, onKeyDown: interactive
                        ? (e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                onClick?.();
                            }
                        }
                        : undefined, className: (0, cn_1.cn)('flex items-center gap-3', highlighted && 'border-primary bg-primary-50', interactive && 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'), children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: compact ? 'sm' : 'md', name: name, src: avatarUrl }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-base font-bold text-on-surface", children: name }), title ? ((0, jsx_runtime_1.jsxs)("p", { className: "truncate text-sm text-muted", children: [title, department ? ` · ${department}` : ''] })) : null] }), isManager ? ((0, jsx_runtime_1.jsxs)("span", { className: "shrink-0 text-xs font-semibold text-muted", children: [directReports, " report", directReports === 1 ? '' : 's'] })) : null, expandable ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `${expanded ? 'Collapse' : 'Expand'} ${name}`, "aria-expanded": expanded, onClick: (e) => {
                                e.stopPropagation();
                                onToggle?.(!expanded);
                            }, className: "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-[var(--xen-radius-sm)] text-on-surface hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: expanded ? '▾' : '▸' }) })) : null] }) })] }));
});
//# sourceMappingURL=OrgChartNode.js.map