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
exports.Kanban = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
/**
 * Web parity of the native `Kanban`: a horizontally scrolling board of titled
 * columns, each a vertical stack of cards with a count chip. Non-drag (click a
 * card via `onCardPress`); wire your own DnD layer for reordering. Empty columns
 * show a muted placeholder. All colors/spacing come from the `--xen-*` tokens via
 * Tailwind classes — no literal colors.
 */
exports.Kanban = React.forwardRef(function Kanban({ className, columns, onCardPress, columnWidth = 260, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('flex gap-3 overflow-x-auto', className), ...rest, children: columns.map((column) => ((0, jsx_runtime_1.jsxs)("section", { style: { width: columnWidth, minWidth: columnWidth }, className: "bg-surface flex shrink-0 flex-col gap-2 rounded-[var(--xen-radius-md)] border border-border p-2", children: [(0, jsx_runtime_1.jsxs)("header", { className: "flex items-center justify-between px-1 pb-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold text-on-surface", children: column.title }), (0, jsx_runtime_1.jsx)("span", { className: "inline-flex min-w-5 items-center justify-center rounded-full bg-muted px-1.5 py-0.5 text-xs font-semibold text-surface", children: column.cards.length })] }), column.cards.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "py-6 text-center text-xs text-muted", children: "No cards" })) : (column.cards.map((card) => ((0, jsx_runtime_1.jsxs)("button", { type: "button", onClick: () => onCardPress?.(card, column), className: "bg-surface flex flex-col gap-1 rounded-[var(--xen-radius-sm)] border border-border p-2 text-left transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 text-sm font-semibold text-on-surface", children: card.title }), card.trailing != null ? (0, jsx_runtime_1.jsx)("span", { className: "shrink-0", children: card.trailing }) : null] }), card.description != null ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: card.description })) : null] }, card.id))))] }, column.key))) }));
});
//# sourceMappingURL=Kanban.js.map