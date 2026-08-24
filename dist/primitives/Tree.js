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
exports.Tree = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
/**
 * Web parity of the native `Tree`: an expandable/collapsible hierarchy. Uses the
 * real ARIA `tree`/`treeitem`/`group` roles (valid on web, unlike RN). Nodes with
 * `children` show a rotating caret and toggle inline; the selected row highlights
 * with the `primary` token. All colors/radii/spacing come from the `--xen-*`
 * tokens via Tailwind classes — no literal colors.
 */
exports.Tree = React.forwardRef(function Tree({ className, data, defaultExpanded = [], selectedId, onSelect, ...rest }, ref) {
    const [expanded, setExpanded] = React.useState(defaultExpanded);
    const toggle = (id) => setExpanded((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    const renderNodes = (nodes, depth) => nodes.map((node) => {
        const hasChildren = (node.children?.length ?? 0) > 0;
        const isOpen = expanded.includes(node.id);
        const isSelected = selectedId != null && node.id === selectedId;
        return ((0, jsx_runtime_1.jsxs)("li", { role: "none", children: [(0, jsx_runtime_1.jsxs)("div", { role: "treeitem", tabIndex: 0, "aria-expanded": hasChildren ? isOpen : undefined, "aria-selected": isSelected, onClick: () => {
                        if (hasChildren)
                            toggle(node.id);
                        onSelect?.(node);
                    }, onKeyDown: (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            if (hasChildren)
                                toggle(node.id);
                            onSelect?.(node);
                        }
                        else if (e.key === 'ArrowRight' && hasChildren && !isOpen) {
                            toggle(node.id);
                        }
                        else if (e.key === 'ArrowLeft' && hasChildren && isOpen) {
                            toggle(node.id);
                        }
                    }, style: { paddingLeft: `calc(0.5rem + ${depth} * 1rem)` }, className: (0, cn_1.cn)('flex cursor-pointer select-none items-center gap-1.5 rounded-[var(--xen-radius-sm)] py-1.5 pr-2 text-sm transition-colors', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', isSelected
                        ? 'bg-primary text-on-primary font-semibold'
                        : 'text-on-surface hover:bg-neutral-100'), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('inline-block w-3 shrink-0 text-xs transition-transform', isSelected ? 'text-on-primary' : 'text-muted', isOpen && 'rotate-90'), children: hasChildren ? '▸' : '' }), (0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate", children: node.label })] }), hasChildren && isOpen ? ((0, jsx_runtime_1.jsx)("ul", { role: "group", className: "m-0 list-none p-0", children: renderNodes(node.children ?? [], depth + 1) })) : null] }, node.id));
    });
    return ((0, jsx_runtime_1.jsx)("ul", { ref: ref, role: "tree", className: (0, cn_1.cn)('m-0 list-none p-0', className), ...rest, children: renderNodes(data, 0) }));
});
//# sourceMappingURL=Tree.js.map