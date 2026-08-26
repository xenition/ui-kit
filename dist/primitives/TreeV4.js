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
exports.TreeV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("./cn");
const v4_data_1 = require("./internal/v4-data");
/**
 * **V4 tree** — the web twin of the native `TreeV4`, same props as
 * {@link Tree}, a different design line.
 *
 * A tree's whole job is to make a hierarchy visible, and the base fills the
 * selected row edge-to-edge with solid `bg-primary`. That answers "which one"
 * and destroys the answer to "where am I": the indentation, the caret and the
 * label all vanish under a brand bar, and on a deep tree the bar is the
 * loudest thing on the screen — §35.6 asks that colour create hierarchy rather
 * than noise, and §35.5 that accents stay rare.
 *
 * Four changes:
 *
 * 1. **Selection tints, it does not repaint.** 12% `--xen-primary` mixed into
 *    `--xen-surface`, the label in `text-primary-text` semibold. The row still
 *    reads as chosen at a glance and the structure it sits in survives. The
 *    rule wins over hover, because pointing at the chosen row must not
 *    un-choose it.
 * 2. **The indent matches its twin.** The base stepped by a literal `1rem`
 *    while native stepped by `spacing.lg`, so the same tree was a different
 *    shape on the two platforms. Both step by `--xen-space-lg` now, and §9
 *    makes indentation the one thing a tree cannot get wrong.
 * 3. **Hover comes off the right neutral.** `hover:bg-neutral-100` is the
 *    light-oriented ramp — under `[data-theme="dark"]` it mirrors and paints a
 *    pale slab across a dark row. The shared V4 row sheet mixes
 *    `--xen-on-surface` into `--xen-surface` instead, which inverts by
 *    construction.
 * 4. **The focus ring is a token, not a ramp step.** `ring-primary-300` was
 *    picked off the scale; `ring-ring` is the semantic slot, so a focus
 *    ring stays visible when the brand hue moves.
 *
 * Rows take the same `xl + xs` height the V4 tables use, so the data-display
 * line has one rhythm. **No guide lines and no depth**: vertical guides are the
 * obvious "premium" addition and they are ink per level for something 24px of
 * indentation already says (§7, §9), and a tree row that casts a shadow is a
 * card in a stack of cards (§8).
 */
exports.TreeV4 = React.forwardRef(function TreeV4({ className, data, defaultExpanded = [], selectedId, onSelect, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(v4_data_1.V4_ROW_STYLE_ID, v4_data_1.V4_ROW_CSS);
    const [expanded, setExpanded] = React.useState(defaultExpanded);
    const toggle = (id) => setExpanded((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    const renderNodes = (nodes, depth) => nodes.map((node) => {
        const hasChildren = (node.children?.length ?? 0) > 0;
        const isOpen = expanded.includes(node.id);
        const isSelected = selectedId != null && node.id === selectedId;
        return ((0, jsx_runtime_1.jsxs)("li", { role: "none", children: [(0, jsx_runtime_1.jsxs)("div", { role: "treeitem", tabIndex: 0, "data-xen-v4-row": "", "data-interactive": "true", "data-selected": isSelected ? 'true' : 'false', "aria-expanded": hasChildren ? isOpen : undefined, "aria-selected": isSelected, onClick: () => {
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
                    }, 
                    // Indentation is the hierarchy (§9) — one `lg` step per level, the
                    // same step the native twin takes. The depth rides in as a custom
                    // property so the padding stays a single token expression in the
                    // class list rather than a hand-built inline string per row.
                    style: { '--xen-v4-depth': depth }, className: (0, cn_1.cn)('flex select-none items-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-sm)]', 'pl-[calc(var(--xen-space-sm)_+_var(--xen-v4-depth,0)_*_var(--xen-space-lg))]', 'min-h-[calc(var(--xen-space-xl)_+_var(--xen-space-xs))] py-[var(--xen-space-sm)] pr-[var(--xen-space-sm)] text-sm transition-colors', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', isSelected ? 'font-semibold text-primary-text' : 'text-on-surface'), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('inline-block w-md shrink-0 text-xs transition-transform', isSelected ? 'text-primary-text' : 'text-muted-text', isOpen && 'rotate-90'), children: hasChildren ? '▸' : '' }), (0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate", children: node.label })] }), hasChildren && isOpen ? ((0, jsx_runtime_1.jsx)("ul", { role: "group", className: "m-0 list-none p-0", children: renderNodes(node.children ?? [], depth + 1) })) : null] }, node.id));
    });
    return ((0, jsx_runtime_1.jsx)("ul", { ref: ref, role: "tree", className: (0, cn_1.cn)('m-0 list-none p-0', className), ...rest, children: renderNodes(data, 0) }));
});
//# sourceMappingURL=TreeV4.js.map