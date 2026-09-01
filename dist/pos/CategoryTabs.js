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
exports.CategoryTabs = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
/**
 * CategoryTabs — **V4** "register" design. A horizontally-scrolling `tablist`
 * for the product grid: the selected tab fills **solid primary** with
 * on-primary ink; unselected tabs stay calm on `surface`. Each tab is a ≥44px
 * target and may carry a count pill (soft-toned when unselected, on-primary
 * when selected). Presentational only — selection is driven by props and
 * reported via `onSelect`. All colors from `--xen-*` token classes (no
 * literals), dark-mode safe.
 */
exports.CategoryTabs = React.forwardRef(function CategoryTabs({ categories, selectedId, onSelect, testID, className, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "tablist", "aria-label": "Product categories", "aria-orientation": "horizontal", "data-xen-category-tabs": "", "data-testid": testID, className: (0, cn_1.cn)('flex gap-[var(--xen-space-sm)] overflow-x-auto', 'p-[var(--xen-space-xs)]', className), ...rest, children: categories.map((cat) => {
            const selected = cat.id === selectedId;
            return ((0, jsx_runtime_1.jsxs)("button", { type: "button", role: "tab", "aria-selected": selected, onClick: () => onSelect?.(cat.id), tabIndex: selected ? 0 : -1, className: (0, cn_1.cn)('inline-flex min-h-[44px] shrink-0 items-center gap-[var(--xen-space-xs)]', 'rounded-[var(--xen-radius-md)] px-[var(--xen-space-md)] py-[var(--xen-space-sm)]', 'text-sm font-bold transition-all', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', selected
                    ? 'bg-primary text-on-primary shadow-md'
                    : 'bg-surface text-on-surface hover:bg-primary-50 active:scale-[0.98]'), children: [(0, jsx_runtime_1.jsx)("span", { children: cat.label }), typeof cat.count === 'number' ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('inline-flex min-w-[1.25rem] items-center justify-center', 'rounded-full px-1.5 text-xs font-bold tabular-nums', selected ? 'bg-on-primary/20 text-on-primary' : internal_1.TONE_SOFT[cat.tone ?? 'neutral']), children: cat.count })) : null] }, cat.id));
        }) }));
});
//# sourceMappingURL=CategoryTabs.js.map