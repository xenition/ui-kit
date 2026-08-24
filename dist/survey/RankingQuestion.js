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
exports.RankingQuestion = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
/**
 * A ranking / ordering question — items shown in their current rank with a rank
 * number and up/down controls that reorder the list. Emits the full next id
 * order on every move; the move buttons disable at the ends and are labelled
 * ("Move X up") so the action is never icon-only for screen readers. Resolves a
 * complete order even when `value` is partial or stale. Empty items render a
 * muted {@link EmptyState}. No literal colors.
 */
exports.RankingQuestion = React.forwardRef(function RankingQuestion({ items, value, onChange, 'aria-label': ariaLabel = 'Ranking', disabled = false, className }, ref) {
    const byId = React.useMemo(() => new Map(items.map((it) => [it.id, it])), [items]);
    // Build a complete, valid order: known-valid ids from `value`, then any
    // items not yet referenced (keeps the control usable if `value` is partial).
    const orderedIds = React.useMemo(() => {
        const seen = new Set();
        const out = [];
        for (const id of value) {
            if (byId.has(id) && !seen.has(id)) {
                seen.add(id);
                out.push(id);
            }
        }
        for (const it of items) {
            if (!seen.has(it.id))
                out.push(it.id);
        }
        return out;
    }, [value, items, byId]);
    const move = (index, dir) => {
        const target = index + dir;
        if (target < 0 || target >= orderedIds.length)
            return;
        const next = orderedIds.slice();
        const a = next[index];
        const b = next[target];
        if (a === undefined || b === undefined)
            return;
        next[index] = b;
        next[target] = a;
        onChange(next);
    };
    if (items.length === 0) {
        return (0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { ref: ref, title: "Nothing to rank.", className: className });
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "list", "aria-label": ariaLabel, className: (0, cn_1.cn)('flex flex-col gap-sm', className), children: orderedIds.map((id, index) => {
            const item = byId.get(id);
            if (!item)
                return null;
            const isFirst = index === 0;
            const isLast = index === orderedIds.length - 1;
            return ((0, jsx_runtime_1.jsxs)("div", { role: "listitem", "aria-label": `Rank ${index + 1}: ${item.label}`, className: (0, cn_1.cn)('flex items-center gap-sm rounded-md border border-border bg-surface px-md py-sm', disabled && 'opacity-50'), children: [(0, jsx_runtime_1.jsx)("span", { className: "flex h-[26px] w-[26px] items-center justify-center rounded-full bg-primary text-sm font-bold text-on-primary", children: index + 1 }), item.icon ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: item.icon, size: "base", color: "onSurface" }) : null, (0, jsx_runtime_1.jsx)("span", { className: "flex-1 text-base font-semibold text-on-surface", children: item.label }), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `Move ${item.label} up`, disabled: disabled || isFirst, onClick: () => move(index, -1), className: (0, cn_1.cn)('p-xs', isFirst ? 'opacity-30' : 'opacity-100', 'disabled:pointer-events-none'), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u25B2", size: "sm", color: "onSurface" }) }), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `Move ${item.label} down`, disabled: disabled || isLast, onClick: () => move(index, 1), className: (0, cn_1.cn)('p-xs', isLast ? 'opacity-30' : 'opacity-100', 'disabled:pointer-events-none'), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u25BC", size: "sm", color: "onSurface" }) })] }, id));
        }) }));
});
//# sourceMappingURL=RankingQuestion.js.map