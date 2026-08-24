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
exports.BoardColumn = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const TaskRow_1 = require("./TaskRow");
/**
 * A single Kanban column — the vertical half of a board: a header with a title
 * and count chip, a stack of {@link TaskRow} cards (each toggleable), an optional
 * "+ Add" footer, and a muted empty placeholder. Web parity of the native
 * `BoardColumn` (`onCardPress` → `onCardClick`). Guards a missing array. No
 * literal colors.
 */
exports.BoardColumn = React.forwardRef(function BoardColumn({ title, cards, onToggleCard, onCardClick, onAddCard, width = 280, className }, ref) {
    const items = Array.isArray(cards) ? cards : [];
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": `${title} column, ${items.length} cards`, style: { width }, className: (0, cn_1.cn)('flex flex-col gap-2 rounded-[var(--xen-radius-md)] border border-border bg-surface p-2', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between px-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold text-on-surface", children: title }), (0, jsx_runtime_1.jsx)("span", { className: "inline-flex min-w-5 items-center justify-center rounded-full bg-muted px-1.5 py-0.5 text-xs font-semibold text-surface", children: items.length })] }), items.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "py-6 text-center text-xs text-muted", children: "No cards" })) : (items.map((c) => ((0, jsx_runtime_1.jsx)(TaskRow_1.TaskRow, { title: c.title, done: c.done, variant: c.dueLabel ? 'dated' : 'priority', priority: c.priority ?? 'low', dueLabel: c.dueLabel, dueTone: c.dueTone, onToggle: (next) => onToggleCard?.(c.id, next), onClick: onCardClick ? () => onCardClick(c.id) : undefined, className: "border border-border" }, c.id)))), onAddCard ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Add card", onClick: onAddCard, className: "py-1 text-center text-sm font-semibold text-primary transition-opacity hover:opacity-70", children: "+ Add" })) : null] }));
});
//# sourceMappingURL=BoardColumn.js.map