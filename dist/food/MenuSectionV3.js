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
exports.MenuSectionV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const isEmptyChildren = (children) => React.Children.toArray(children).length === 0;
/**
 * MenuSection, alternate design **V3** — a *minimal editorial* group. The title
 * is a compact heading followed by a hairline rule that runs to the edge, with
 * the `aside` slot tucked at the far right of that rule; the optional
 * description sits under it. Items follow, tightly stacked. The empty state is a
 * single quiet italic line, not a boxed panel. Line-based and understated — the
 * opposite of V2's contained banner. Same props as the base; token-only.
 */
exports.MenuSectionV3 = React.forwardRef(function MenuSectionV3({ title, description, aside, children, emptyLabel = 'No items yet', emptyState, className, ...rest }, ref) {
    const empty = isEmptyChildren(children);
    return ((0, jsx_runtime_1.jsxs)("section", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)]', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-heading text-base font-extrabold uppercase tracking-wide text-on-surface", children: title }), (0, jsx_runtime_1.jsx)("span", { className: "h-px flex-1 bg-border", "aria-hidden": "true" }), aside ? (0, jsx_runtime_1.jsx)("div", { className: "shrink-0", children: aside }) : null] }), description ? (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: description }) : null, empty ? (emptyState ?? (0, jsx_runtime_1.jsx)("p", { className: "text-sm italic text-muted", children: emptyLabel })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-[var(--xen-space-xs)]", children: children }))] }));
});
//# sourceMappingURL=MenuSectionV3.js.map