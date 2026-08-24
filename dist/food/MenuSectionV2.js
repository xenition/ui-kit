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
exports.MenuSectionV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const isEmptyChildren = (children) => React.Children.toArray(children).length === 0;
/**
 * MenuSection, alternate design **V2** — a *panelled banner* group. The whole
 * section is wrapped in an elevated surface card; the heading sits in a soft
 * primary-tinted banner strip across the top (title, description, and the
 * `aside` slot as a right-hand chip), with the items grouped inside below. The
 * empty state is a soft-tinted inset panel rather than a plain box. This reads
 * as a bold, contained category card — the opposite of the flat base. Same
 * props as the base; token-only.
 */
exports.MenuSectionV2 = React.forwardRef(function MenuSectionV2({ title, description, aside, children, emptyLabel = 'No items yet', emptyState, className, ...rest }, ref) {
    const empty = isEmptyChildren(children);
    return ((0, jsx_runtime_1.jsxs)("section", { ref: ref, className: (0, cn_1.cn)('overflow-hidden rounded-[var(--xen-radius-lg)] bg-surface shadow-md', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-[var(--xen-space-sm)] bg-primary/10 px-[var(--xen-space-lg)] py-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-heading text-lg font-extrabold text-primary", children: title }), description ? (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: description }) : null] }), aside ? (0, jsx_runtime_1.jsx)("div", { className: "shrink-0", children: aside }) : null] }), (0, jsx_runtime_1.jsx)("div", { className: "p-[var(--xen-space-lg)]", children: empty ? (emptyState ?? ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center rounded-[var(--xen-radius-md)] bg-primary/5 px-[var(--xen-space-lg)] py-[var(--xen-space-xl)] text-center text-sm text-muted", children: emptyLabel }))) : ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-[var(--xen-space-sm)]", children: children })) })] }));
});
//# sourceMappingURL=MenuSectionV2.js.map